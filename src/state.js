// Sort/filter state + derivation. Stateless helpers that take the game list
// and state object and return a new sorted/filtered list.

export const createInitialState = () => ({
  sortKey: "valuePerHour",
  sortDir: "asc",
  search: "",
  genre: "",
  platforms: new Set(), // empty = all platforms
  tab: "all",           // all | new | indie | aaa
});

// Tab predicates — each returns true if the game belongs in that tab.
// "new" = released in the last 3 calendar years.
// "indie" = price <= $20 (stand-in for small-dev priced titles).
// "aaa"   = price >= $40 (full-price AAA releases).
const THIS_YEAR = new Date().getFullYear();
export const TAB_FILTERS = {
  all: () => true,
  new: (g) => g.releaseYear >= THIS_YEAR - 2,
  indie: (g) => g.price <= 20,
  aaa: (g) => g.price >= 40,
};

// Derived value for each game (kept out of the data file so it stays source).
const computed = (game) => ({
  ...game,
  valuePerHour: game.price / game.hoursAvg,
});

export function getAllPlatforms(games) {
  const set = new Set();
  games.forEach((g) => g.platforms.forEach((p) => set.add(p)));
  // Preferred display order first, then any extras alphabetically.
  const preferred = ["PC", "PS5", "PS4", "Xbox Series X|S", "Xbox One", "Switch"];
  const extras = [...set].filter((p) => !preferred.includes(p)).sort();
  return [...preferred.filter((p) => set.has(p)), ...extras];
}

export function getAllGenres(games) {
  return [...new Set(games.map((g) => g.genre))].sort();
}

export function applyFiltersAndSort(games, state) {
  const q = state.search.trim().toLowerCase();
  const tabPredicate = TAB_FILTERS[state.tab] || TAB_FILTERS.all;

  const filtered = games.filter((g) => {
    if (!tabPredicate(g)) return false;
    if (q && !g.title.toLowerCase().includes(q)) return false;
    if (state.genre && g.genre !== state.genre) return false;
    if (state.platforms.size > 0) {
      const hasAny = g.platforms.some((p) => state.platforms.has(p));
      if (!hasAny) return false;
    }
    return true;
  });

  const withComputed = filtered.map(computed);

  const dir = state.sortDir === "asc" ? 1 : -1;
  const key = state.sortKey;

  withComputed.sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === "number" && typeof bv === "number") {
      return (av - bv) * dir;
    }
    return String(av).localeCompare(String(bv)) * dir;
  });

  return withComputed;
}

export function toggleSort(state, key) {
  if (state.sortKey === key) {
    state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
  } else {
    state.sortKey = key;
    // Numeric columns default to ascending for price/value (best first),
    // descending for scores/hours (highest first). Title/genre default asc.
    const descFirst = new Set(["metacritic", "hoursAvg"]);
    state.sortDir = descFirst.has(key) ? "desc" : "asc";
  }
}

export function togglePlatform(state, platform) {
  if (state.platforms.has(platform)) state.platforms.delete(platform);
  else state.platforms.add(platform);
}

export function resetFilters(state) {
  state.search = "";
  state.genre = "";
  state.platforms.clear();
}
