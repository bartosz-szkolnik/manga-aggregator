import { verifyAccess } from '@auth/utils';
import { AddMangaToDatabaseDialog } from '../add-manga-to-database';
import { fetchProfile } from '@lib/profile/data';

export async function AddMangaButtonIfAllowed() {
  const { profile } = await fetchProfile();

  if (!profile || !verifyAccess(profile).includes('add')) {
    return null;
  }

  return <AddMangaToDatabaseDialog className="ml-auto mr-4" />;
}
