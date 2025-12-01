import database from '../../../database.json';

import type { Database } from '../types';

export const appData: Database = database as Database;

// Memoize rooms to avoid recalculating on every call
let cachedRooms: Database['bundles'][0]['rooms'] | null = null;

export const getAllRooms = (): Database['bundles'][0]['rooms'] => {
  if (cachedRooms === null) {
    cachedRooms = appData.bundles.flatMap((category) => category.rooms);
  }
  return cachedRooms;
};
