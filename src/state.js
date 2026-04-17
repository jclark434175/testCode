// Category metadata — one active at a time, mirrors the selfdefense.guru
// "Shop by Category" grid. Each game has a `category` field (see games.js).
export const CATEGORIES = [
  { id: "action",    emoji: "\u{1F5E1}",  label: "Action" },      // 🗡 crossed sword
  { id: "shooters",  emoji: "\u{1F52B}",  label: "Shooters" },    // 🔫
  { id: "open-world",emoji: "\u{1F5FA}",  label: "Open World" },  // 🗺
  { id: "rpg",       emoji: "\u{1F4D6}",  label: "RPG" },         // 📖
  { id: "indie",     emoji: "\u{1F48E}",  label: "Indie" },       // 💎
  { id: "puzzle",    emoji: "\u{1F9E9}",  label: "Puzzle" },      // 🧩
  { id: "all",       emoji: "\u{2B50}",   label: "All Games" },   // ⭐
];

export const createInitialState = () => ({
  sortKey: "valuePerHour", // valuePerHour | metacritic | price-low | price-high | hoursAvg
  category: "all",
});

const computed = (game) => ({
  ...game,
  valuePerHour: game.price / game.hoursAvg,
});

const SORT_FNS = {
  valuePerHour: (a, b) => a.valuePerHour - b.valuePerHour,
  metacritic:   (a, b) => b.metacritic - a.metacritic,
  "price-low":  (a, b) => a.price - b.price,
  "price-high": (a, b) => b.price - a.price,
  hoursAvg:     (a, b) => b.hoursAvg - a.hoursAvg,
};

export function applyCategoryAndSort(games, state) {
  const filtered = state.category === "all"
    ? games
    : games.filter((g) => g.category === state.category);

  const withComputed = filtered.map(computed);
  const sortFn = SORT_FNS[state.sortKey] || SORT_FNS.valuePerHour;
  withComputed.sort(sortFn);
  return withComputed;
}
