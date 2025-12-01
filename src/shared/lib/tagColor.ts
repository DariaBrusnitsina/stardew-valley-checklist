/**
 * Function to determine tag color based on its content
 * @param tag - tag string
 * @returns color name (blue, purple, pink, green, orange, red, yellow, teal, brown,
 * indigo, gray)
 */
export const getTagColor = (tag: string): string => {
  const lowerTag = tag.toLowerCase();

  // Seasons and time of day - yellow
  if (
    lowerTag.includes('spring') ||
    lowerTag.includes('summer') ||
    lowerTag.includes('fall') ||
    lowerTag.includes('winter') ||
    lowerTag === 'spring' ||
    lowerTag === 'summer' ||
    lowerTag === 'fall' ||
    lowerTag === 'winter' ||
    lowerTag.includes('all seasons') ||
    lowerTag.includes('am') ||
    lowerTag.includes('pm') ||
    lowerTag.includes('midnight') ||
    lowerTag.includes('any time') ||
    lowerTag.includes('anytime') ||
    lowerTag.includes('sunny') ||
    lowerTag.includes('raining') ||
    lowerTag.includes('weather') ||
    lowerTag.includes('flower dance') ||
    lowerTag === '12pm – 2am' ||
    lowerTag === '12pm – 4pm' ||
    lowerTag === '4pm – 2am' ||
    lowerTag === '6am – 2pm' ||
    lowerTag === '6am – 7pm' ||
    lowerTag === '6am – 8pm' ||
    lowerTag === '6am – midnight' ||
    lowerTag === '6pm – 2am' ||
    lowerTag === '9am – 2am'
  ) {
    return 'yellow';
  }

  // Foraging tags - orange
  if (
    lowerTag.includes('foraging') ||
    lowerTag.includes('farm cave') ||
    lowerTag.includes('secret woods') ||
    lowerTag.includes('beach foraging') ||
    lowerTag.includes('desert foraging') ||
    lowerTag.includes('winter foraging') ||
    lowerTag.includes('summer foraging') ||
    lowerTag.includes('fall foraging') ||
    lowerTag.includes('spring foraging') ||
    lowerTag.includes('foraging beach farm') ||
    lowerTag.includes('foraging mines') ||
    lowerTag.includes('foraging prehistoric floors') ||
    lowerTag.includes('foraging floors') ||
    lowerTag.includes('forest farm map')
  ) {
    return 'orange';
  }

  // Crops and Farming tags - green
  if (
    lowerTag.includes('crops') ||
    lowerTag.includes('farming') ||
    lowerTag.includes('trees') ||
    lowerTag.includes('apple trees') ||
    lowerTag.includes('apricot trees') ||
    lowerTag.includes('orange trees') ||
    lowerTag.includes('peach trees') ||
    lowerTag.includes('pomegranate trees') ||
    lowerTag.includes('cherry trees') ||
    lowerTag.includes('maple tree') ||
    lowerTag.includes('oak tree') ||
    lowerTag.includes('pine tree') ||
    lowerTag.includes('mushroom tree') ||
    lowerTag.includes('palm tree') ||
    lowerTag.includes('mahogany trees') ||
    lowerTag.includes('wheat') ||
    lowerTag.includes('grass') ||
    lowerTag.includes('wheat harvesting') ||
    lowerTag.includes('down green rain trees')
  ) {
    return 'green';
  }

  // Dangerous enemies and combat tags - red
  if (
    lowerTag.includes('serpents') ||
    lowerTag.includes('shadow brutes') ||
    lowerTag.includes('shadow shamans') ||
    lowerTag.includes('metal heads') ||
    lowerTag.includes('squid kids') ||
    lowerTag.includes('mummies') ||
    lowerTag.includes('haunted skull') ||
    lowerTag.includes('ghosts') ||
    lowerTag.includes('purple slimes')
  ) {
    return 'red';
  }

  // Mines and Mining tags - purple
  if (
    lowerTag.includes('mines') ||
    lowerTag.includes('mining') ||
    lowerTag.includes('geode') ||
    lowerTag.includes('frozen geodes') ||
    lowerTag.includes('magma geodes') ||
    lowerTag.includes('omni geodes') ||
    lowerTag.includes('skull cavern') ||
    lowerTag.includes('floors') ||
    lowerTag.includes('aquamarine nodes') ||
    lowerTag.includes('boxes') ||
    lowerTag.includes('slimes') ||
    lowerTag.includes('bats') ||
    lowerTag.includes('blue slimes') ||
    lowerTag.includes('dust sprites') ||
    lowerTag.includes('duggies') ||
    lowerTag.includes('rock crabs') ||
    lowerTag.includes('lava crabs') ||
    lowerTag.includes('iridium bats') ||
    lowerTag.includes('ponds mines floors') ||
    lowerTag.includes('prehistoric floors')
  ) {
    return 'purple';
  }

  // Fishing and water bodies - teal
  if (
    lowerTag.includes('fishing') ||
    lowerTag.includes('ocean') ||
    lowerTag.includes('river') ||
    lowerTag.includes('rivers') ||
    lowerTag.includes('lake') ||
    lowerTag.includes('crab pot') ||
    lowerTag.includes('crab pots') ||
    lowerTag.includes('pond') ||
    lowerTag.includes('ponds') ||
    lowerTag.includes('mountain lake') ||
    lowerTag.includes('cindersap forest pond') ||
    lowerTag.includes("witch's swamp") ||
    lowerTag.includes('sewer') ||
    lowerTag.includes('treasure chests') ||
    lowerTag.includes('freshwater') ||
    lowerTag.includes('sturgeon')
  ) {
    return 'teal';
  }

  // Wood, soil, materials - brown
  if (
    lowerTag.includes('wood') ||
    lowerTag.includes('branches') ||
    lowerTag.includes('logs') ||
    lowerTag.includes('stumps') ||
    lowerTag.includes('soil') ||
    lowerTag.includes('stones') ||
    lowerTag.includes('stone') ||
    lowerTag.includes('hardwood') ||
    lowerTag.includes('axe') ||
    lowerTag.includes('pickaxe') ||
    lowerTag.includes('large stumps') ||
    lowerTag.includes('artifact spots')
  ) {
    return 'brown';
  }

  // Special places and locations - indigo
  if (
    lowerTag.includes('ginger island') ||
    lowerTag.includes('desert') ||
    lowerTag.includes('forest farm') ||
    lowerTag.includes('beach farm') ||
    lowerTag.includes('beach') ||
    lowerTag.includes('carpenter') ||
    lowerTag.includes("marnie's ranch") ||
    lowerTag.includes('pierre') ||
    lowerTag.includes('traveling cart') ||
    lowerTag.includes('desert trader') ||
    lowerTag.includes('krobus') ||
    lowerTag.includes('after wood fix bridge right side beach') ||
    lowerTag.includes('oasis') ||
    lowerTag.includes('cindersap forest')
  ) {
    return 'indigo';
  }

  // Cooking and Artisan tags - pink
  if (
    lowerTag.includes('cooking') ||
    lowerTag.includes('cheese') ||
    lowerTag.includes('honey') ||
    lowerTag.includes('jelly') ||
    lowerTag.includes('wine') ||
    lowerTag.includes('cask') ||
    lowerTag.includes('preserves jar') ||
    lowerTag.includes('mayonnaise machine') ||
    lowerTag.includes('oil maker') ||
    lowerTag.includes('loom') ||
    lowerTag.includes('keg') ||
    lowerTag.includes('cheese press') ||
    lowerTag.includes('bee house') ||
    lowerTag.includes('truffles') ||
    lowerTag.includes('caviar') ||
    lowerTag.includes('preserves jar product') ||
    lowerTag.includes('truffles oil maker')
  ) {
    return 'pink';
  }

  // Animals - blue
  if (
    lowerTag.includes('cows') ||
    lowerTag.includes('goats') ||
    lowerTag.includes('sheep') ||
    lowerTag.includes('pigs') ||
    lowerTag.includes('rabbits') ||
    lowerTag.includes('ducks') ||
    lowerTag.includes('chickens') ||
    lowerTag.includes('brown chickens') ||
    lowerTag.includes('white chickens')
  ) {
    return 'blue';
  }

  // Quality and special conditions - gray
  if (
    lowerTag.includes('gold quality') ||
    lowerTag.includes('silver quality') ||
    lowerTag.includes('iridium quality') ||
    lowerTag.includes('recipe') ||
    lowerTag.includes('transmute') ||
    lowerTag.includes('gift') ||
    lowerTag.includes('random') ||
    lowerTag.includes('soggy newspaper') ||
    lowerTag.includes('furnace')
  ) {
    return 'gray';
  }

  // Default - blue
  return 'blue';
};
