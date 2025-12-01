export const APP_NAME = 'Stardew Valley Checklist';

export const ROOM_NAMES = [
  'Crafts_Room',
  'Pantry',
  'Fish_Tank',
  'Boiler_Room',
  'Bulletin_Board',
  'Vault',
  'Abandoned_JojaMart',
] as const;

export type RoomName = (typeof ROOM_NAMES)[number];
