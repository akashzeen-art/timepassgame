import { gamesData } from './gamesData';

const A = '/assets/';

/** Map raw game entry to UI card shape */
function toGameCard(game, id) {
  return {
    id,
    name: game.name,
    img: game.thumbnail_url,
    game_url: game.game_url,
    categories: game.categories,
  };
}

function findByName(name) {
  return gamesData.find((g) => g.name === name);
}

function pickByNames(names) {
  return names
    .map((name) => findByName(name))
    .filter(Boolean)
    .map((game, i) => toGameCard(game, i + 1));
}

function filterByCategory(category) {
  return gamesData
    .filter((g) => g.categories.includes(category))
    .map((game, i) => toGameCard(game, i + 1));
}

// All 147 games
export const allGames = gamesData.map((game, i) => toGameCard(game, i + 1));

export const featuredGames = [
  { id: 1, img: `${A}801cc464-2008-4c13-9e5e-a7dd415cbf68.png`, video: 'https://cdn.timepass.games/videos/b5fc6533-5c9e-49fa-a71e-410b79f5bdc5.mp4', plays: '222.4K' },
  { id: 2, img: `${A}664edc12-3bab-4db4-a00c-9a08e8e01751.webp`, video: 'https://cdn.simpleviralgames.com/videos/b2072a1a-9a66-409d-b0ba-c0ca1c909ba2.mp4', plays: '215.4K' },
  { id: 3, img: `${A}03c0ef45-e414-4d1a-a0e2-affd2dce9df1.png`, video: 'https://cdn.simpleviralgames.com/videos/bfe322fd-fd02-4607-88ad-78a761a8a304.mp4', plays: '2.8M' },
  { id: 4, img: `${A}11c5c0db-c80c-443d-bf34-7c496bdab0f1.png`, video: 'https://cdn.simpleviralgames.com/videos/e2598b71-7b17-4b9d-ab59-fe2c631e1671.mp4', plays: '194.8K' },
  { id: 5, img: `${A}7de09a14-a390-489e-9aad-6d04130c2e2b.png`, video: 'https://cdn.simpleviralgames.com/videos/2c24fb35-6737-41c3-ad13-bf5552eb5888.mp4', plays: '207.6K' },
  { id: 6, img: `${A}3852b867-a219-4517-b7b0-f13500001535.png`, video: 'https://cdn.simpleviralgames.com/videos/bf36002c-d69e-41cb-a18c-25eab3d8c222.mp4', plays: '118.6K' },
];

export const recommendedGames = pickByNames([
  'Traffic Tap Puzzle',
  'Zero 21',
  'Free Birds',
  'Slide',
  'Plane Shooter',
  'Number Snakes',
  'Word Search 2',
  'Water Sort 2',
  'Bottle Flip',
  '2048',
]);

export const newReleases = pickByNames([
  'Little Panda',
  'Cut Grass',
  'Helix Jump',
  'Colour Road',
  'Zombie Crusher',
  'Pixel Brick Breaker',
  'Sling Tomb',
  'Sum of N',
  'Space Shooter',
  'Bubble Up',
  'Fruitmas',
  'Bottle Flip Raphael',
  'Mine Rusher',
]);

export const vipGames = pickByNames([
  'Word Clues',
  'Bottle Flip',
  'Car Out',
  'Sling Tomb',
  'Knots',
  'Colour Switch',
  'Dunk Hit',
  'Carrot Run',
  'Fruitmas',
  'Out Of Lava',
]);

const top10FromData = filterByCategory('Top 10 Games');
// Pad to 10 with popular games if fewer than 10 tagged
const top10PadNames = ['Watermelon Fruit 2048', 'Word Clues', 'Cut Grass', 'Color Panic', 'Word Game'];
const top10Names = new Set(top10FromData.map((g) => g.name));
top10PadNames.forEach((name) => {
  if (top10FromData.length < 10 && !top10Names.has(name)) {
    const game = findByName(name);
    if (game) {
      top10FromData.push(toGameCard(game, top10FromData.length + 1));
      top10Names.add(name);
    }
  }
});

export const top10Games = top10FromData.slice(0, 10).map((game, i) => ({
  ...game,
  rank: `${A}${i + 1}.svg`,
}));

export const multiplayerGames = [
  { id: 1, img: `${A}0ca0aa54-c928-4032-8cfe-d56f78c35210.webp`, name: 'Tambola' },
  { id: 2, img: `${A}500b1e89-d9c9-49d2-9eac-327740bc7538.webp`, name: 'Snake And Ladder' },
  { id: 3, img: `${A}943b18c3-79d9-44cf-bb66-9ea30d91caa1.webp`, name: 'Speed Ludo' },
  { id: 4, img: `${A}3e678577-f089-4ee2-a5a3-92954787196a.webp`, name: 'Sheep Fight' },
];

export const brainGames = filterByCategory('Puzzle');

export const soothingGames = pickByNames([
  'Summer Maze',
  'Pop Us 3D',
  'Xmas Tiles',
  'Pixel Match',
  'Kids Alphabet',
  'House Painter',
  'Color Cannon',
  'Colour Strings',
  'Fantasy Forest',
  'Connect Merge',
  'Stack',
  'Word Clues',
  'Bubble Up',
]);

export const leaderboardGames = pickByNames([
  'Color Panic',
  'Bubbo Bubbo',
  'Puzzling Portion',
  'Cut Grass',
  'Collect Em All',
  'Pinball Master',
  'Monster Rush',
  'Box Size',
  'Balloons Creator',
  'Bubble Pet Saga',
  'Boat Rush',
  '2048 Balls',
  'Rise Up',
  'Colour Switch',
  'Colour Road',
  'Dunk Hit',
  'Stack Bounce',
  'Nuts and Bolts',
  'Carrot Run',
  'Ultimate Sudoku',
]);

export const quickBreakGames = filterByCategory('Easy to Play');

export const arcadeGames = filterByCategory('Arcade');

export const actionGames = filterByCategory('Action');

export const sportsGames = pickByNames([
  'Dribble King',
  'Soccer Free Kick',
  'Basketball Challenge',
  'Dunk Line',
  'Archery',
  'Golf Field',
]);

export const sideNavItems = [
  { icon: `${A}all-games.svg`, label: 'All Games' },
  { icon: `${A}new-release.svg`, label: 'New Releases' },
  { icon: `${A}top-10-games.svg`, label: 'Top 10 Games' },
  { icon: `${A}premium-game.svg`, label: 'Premium Games' },
  { icon: `${A}games-with-leaderboard.svg`, label: 'Leaderboard Games' },
  { icon: `${A}brain.svg`, label: 'Train your Brain' },
  { icon: `${A}soothing.svg`, label: 'Soothing' },
  { icon: `${A}quick-break.svg`, label: 'Quick Break at Work' },
  { icon: `${A}sports.svg`, label: 'Sports' },
  { icon: `${A}multiplayer.svg`, label: 'Multiplayer' },
];

export { gamesData };
