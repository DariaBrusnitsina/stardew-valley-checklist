export const getItemIcon = (itemName: string): string => {
  return itemName.split('&')[0].replaceAll(' ', '_');
};
