import { Profile } from '@lib/types/manga.types';

type Permission = 'read' | 'write' | 'delete' | 'add' | 'write-own' | 'read-own';

const ROLE_PERMISSIONS = {
  admin: ['read', 'read-own', 'write', 'delete', 'add'] as Permission[],
  editor: ['read', 'read-own', 'write', 'add'] as Permission[],
  viewer: ['read', 'read-own', 'write-own', 'add'] as Permission[],
  guest: ['read'] as Permission[],
};

export function verifyAccess(user?: Profile | null) {
  if (!user) {
    return ROLE_PERMISSIONS['guest'];
  }

  const permissions = ROLE_PERMISSIONS[user.role] || ROLE_PERMISSIONS['guest'];
  return permissions;
}
