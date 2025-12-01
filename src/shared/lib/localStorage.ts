const STORAGE_PREFIX = {
  BUNDLE_ITEM: 'bundle-',
  ROOM_BUNDLE: 'room-',
  LANGUAGE: 'i18nextLng',
} as const;

export const localStorageKeys = {
  getBundleItemKey: (bundleName: string, itemName: string) =>
    `${STORAGE_PREFIX.BUNDLE_ITEM}${bundleName}-item-${itemName}`,
  getRoomBundleKey: (roomName: string, bundleName: string) =>
    `${STORAGE_PREFIX.ROOM_BUNDLE}${roomName}-bundle-${bundleName}`,
  getLanguageKey: () => STORAGE_PREFIX.LANGUAGE,
} as const;

export const localStorageUtils = {
  getItem: (key: string): boolean => localStorage.getItem(key) === 'true',
  setItem: (key: string, value: boolean): void => {
    localStorage.setItem(key, value.toString());
  },
  clear: (): void => {
    localStorage.clear();
  },
  getLanguage: (): string | null => {
    return localStorage.getItem(STORAGE_PREFIX.LANGUAGE);
  },
  setLanguage: (lang: string): void => {
    localStorage.setItem(STORAGE_PREFIX.LANGUAGE, lang);
  },
  getAllKeys: (prefix: string): string[] => {
    return Object.keys(localStorage).filter((key) => key.startsWith(prefix));
  },
  getCompletedCount: (prefix: string): number => {
    return Object.entries(localStorage).filter(
      ([key, value]) => key.startsWith(prefix) && value === 'true'
    ).length;
  },
} as const;
