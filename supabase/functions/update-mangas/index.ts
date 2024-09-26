import { sendSuccessResponse, type SupabaseBrowserClient, serveHandler, isTruthy } from '../_shared/common.ts';
import type { Json, Tables } from '../_shared/database.types.ts';
import { isBefore, sub } from 'npm:date-fns';

type MangaDexChapterResponse = {
  result: 'ok';
  response: 'collection';
  data: {
    id: string;
    type: 'chapter';
    attributes: {
      volume: null;
      chapter: string;
      title: string | null;
      translatedLanguage: string;
      externalUrl: string | null;
      publishAt: string;
      readableAt: string;
      createdAt: string;
      updatedAt: string;
      pages: number;
      version: number;
    };
  }[];
};

type Manga = Tables<'manga'>;
type MangasToUpdate = { mangaId: string; data: MangaDexChapterResponse['data'] }[];

Deno.serve(
  serveHandler(async client => {
    console.info('Starting the manga update process...');

    const mangaIds = await getMangaIds(client);
    const mangaDexIds = await getMangaDexIds(client, mangaIds);
    const mangasToUpdate = await retrieveNewChaptersFromMangaDex(mangaDexIds);

    await insertNewChapterData(client, mangasToUpdate);
    await sheduleCommonNotifications(client, mangasToUpdate);
    await scheduleSingularNotifications(client, mangasToUpdate);
    console.info('Finished the manga update process...');

    return sendSuccessResponse('Mangas updated.');
  }),
);

/////////////////////
// Logic functions //
/////////////////////

async function getMangaIds(client: SupabaseBrowserClient) {
  console.info('Retrieving manga ids from database...');

  const { data, error } = await client.from('profile_manga').select('manga(*)').eq('is_following', true);
  if (error) {
    throw error;
  }

  const mangas = data.flatMap(row => row.manga ?? []);
  const mangaIds = checkWhichMangasShouldBeChecked(mangas);
  return Array.from(new Set(mangaIds));
}

async function getMangaDexIds(client: SupabaseBrowserClient, mangaIds: string[]) {
  console.info('Retrieving mangadex ids from manga ids...');

  const idRetriever = async (id: string) => await client.from('manga').select('mangadex_id').eq('id', id).single();
  const mangaDexIds = await Promise.all(mangaIds.map(idRetriever));

  if (mangaDexIds.some(({ error }) => error)) {
    throw mangaDexIds.find(({ error }) => error)!.error;
  }

  return mangaDexIds.map(({ data }) => data!.mangadex_id);
}

async function retrieveNewChaptersFromMangaDex(mangaDexIds: string[]): Promise<MangasToUpdate> {
  console.info('Retrieving new chapters from mangadex...');

  const mangasToUpdate = await Promise.all(
    mangaDexIds.map(async id => {
      console.info(`Retrieving new chapter for manga of id ${id}`);
      const data = await getLatestMangaChapter(id);
      return data.length ? { mangaId: id, data } : null;
    }),
  );

  return mangasToUpdate.filter(isTruthy);
}

async function insertNewChapterData(client: SupabaseBrowserClient, mangasToUpdate: MangasToUpdate) {
  console.info('Inserting new chapter data into database...');

  // prettier-ignore
  for (const { mangaId, data: [latestChapter] } of mangasToUpdate) {
    if (!latestChapter) {
      return;
    }

    const { error, data } = await client
      .from('manga')
      .update({ 
        latest_chapter: latestChapter.attributes.chapter, 
        last_time_checked: new Date().toISOString(),
      })
      .eq('mangadex_id', mangaId)
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    {
      const { error } = await client.from('profile_manga').update({ is_updated: true }).eq('manga_id', data.id);
      if (error) {
        throw error;
      }
    }
  }
}

async function sheduleCommonNotifications(client: SupabaseBrowserClient, mangasToUpdate: MangasToUpdate) {
  console.info('Inserting notifications to database to send later...');

  const profiles = await Promise.all(
    mangasToUpdate.map(async ({ mangaId, data: [latestChapter] }) => {
      const { data, error } = await client
        .from('manga')
        .select('profile_manga(latest_chapter_read, is_following, profile(id, subscriptions))')
        .eq('mangadex_id', mangaId)
        .single();

      if (error) {
        throw error;
      }

      return data.profile_manga
        .filter(({ is_following, latest_chapter_read }) => {
          if (!is_following) {
            return false;
          }

          return Number(latest_chapter_read) < Number(latestChapter.attributes.chapter);
        })
        .flatMap(({ profile }) => (profile ? profile : []));
    }),
  );

  return Promise.all(
    removeDuplicates(profiles.flat()).map(profile => {
      const subs = profile?.subscriptions as Json[];
      return insertCommonNotification(client, subs ?? []);
    }),
  );
}

function scheduleSingularNotifications(client: SupabaseBrowserClient, mangasToUpdate: MangasToUpdate) {
  console.info('Inserting singular notifications to database to send later...');

  return Promise.all(
    mangasToUpdate.map(async ({ mangaId, data: [latestChapter] }) => {
      const { data, error } = await client
        .from('manga')
        .select('title, profile_manga(latest_chapter_read, is_following, is_favorite, profile(subscriptions))')
        .eq('mangadex_id', mangaId)
        .single();

      if (error) {
        throw error;
      }

      const { title, profile_manga } = data;
      return Promise.all(
        profile_manga
          .filter(({ is_following, latest_chapter_read, is_favorite }) => {
            return is_following && is_favorite && latest_chapter_read !== latestChapter.attributes.chapter;
          })
          .map(({ profile }) => {
            const subs = profile?.subscriptions as Json[];
            return insertSingularNotifications(client, subs ?? [], title, mangaId);
          }),
      );
    }),
  );
}

//////////////////////
// Helper functions //
//////////////////////

function checkWhichMangasShouldBeChecked(mangas: Manga[]) {
  const mangasToUpdate = mangas.filter(({ check_every_number, check_every_period, last_time_checked }) => {
    return isBefore(new Date(last_time_checked), sub(new Date(), { [check_every_period]: Number(check_every_number) }));
  });

  return mangasToUpdate.map(manga => manga.id);
}

async function getLatestMangaChapter(mangaId: string) {
  const resp = await fetch(getUrl(mangaId));
  const data = await resp.json();
  return data.data as MangaDexChapterResponse['data'];
}

function getUrl(mangaId: string) {
  const params = new URLSearchParams({
    limit: '1',
    manga: mangaId,
    'translatedLanguage[]': 'en',
    'order[createdAt]': 'desc',
  });

  return `https://api.mangadex.org/chapter?${params}`;
}

function insertCommonNotification(client: SupabaseBrowserClient, subscriptions: Array<Json>) {
  return Promise.all(
    subscriptions.map(async sub => {
      const { error, data } = await client.from('notifications').insert({
        subscription: sub,
        data: { type: 'common' },
      });

      if (error) {
        throw error;
      }

      return data;
    }),
  );
}

function insertSingularNotifications(
  client: SupabaseBrowserClient,
  subscriptions: Array<Json>,
  title: string,
  mangaId: string,
) {
  return Promise.all(
    subscriptions.map(async sub => {
      // TODO: check if can use upsert, batched
      const { error, data } = await client.from('notifications').insert({
        subscription: sub,
        data: { type: 'singular', mangaName: title, mangaId: mangaId },
      });

      if (error) {
        throw error;
      }

      return data;
    }),
  );
}

function removeDuplicates<T extends { id: string }>(profiles: T[]): T[] {
  return Object.values(Object.fromEntries(profiles.map(item => [item.id, item])));
}
