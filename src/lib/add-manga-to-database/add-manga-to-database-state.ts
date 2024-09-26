import { MangaDexChapterAttributes } from '@lib/types/mangadex-chapter.types';
import { MangaAttributes } from '@lib/types/mangadex.types';
import { ErrorType } from '@utils/types';
import { ZodIssue } from 'zod';

export type MangaIdState = {
  type: 'MANGA_ID';
  error: ErrorType | ZodIssue[] | null;
};

export type MangaDataState = {
  type: 'MANGA_DATA';
  error: ErrorType | ZodIssue[] | null;
  data: {
    mangaId: string;
    mangaAttributes: MangaAttributes;
    mangaCover: string;
    mangaLatestChapter: MangaDexChapterAttributes;
  };
};

export type MangaDataCloseModalState = {
  type: 'MANGA_DATA_CLOSE_MODAL';
};

export type ProfileMangaDataState = {
  type: 'PROFILE_MANGA_DATA';
  error: ErrorType | ZodIssue[] | null;
  data: {
    addedMangaId: string;
    mangaLatestChapter: MangaDexChapterAttributes;
    mangaStatus: MangaAttributes['status'];
  };
};

export type ProfileMangaDataSuccessState = {
  type: 'PROFILE_MANGA_DATA_SUCCESS';
  error: ErrorType | ZodIssue[] | null;
};

export type ErrorState = {
  type: 'ERROR';
  error: ErrorType;
};

export type AddMangaToDatabaseState = MangaIdState | MangaDataState | ProfileMangaDataState;
export type WithoutAppErrors<T extends AddMangaToDatabaseState> = {
  [K in keyof T]: K extends 'error' ? Exclude<T[K], ErrorType> : T[K];
};

export function matchState<TState extends AddMangaToDatabaseState['type']>(
  state: { type: string },
  ...expected: TState[]
): state is { type: TState } {
  return expected.includes(state.type as TState);
}
