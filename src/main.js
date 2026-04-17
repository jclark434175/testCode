import { GAMES } from "./data/games.js";
import {
  renderRows,
  renderPlatformChips,
  renderGenreOptions,
  updateSortIndicators,
} from "./render.js";
import {
  createInitialState,
  getAllPlatforms,
  getAllGenres,
  applyFiltersAndSort,
  toggleSort,
  togglePlatform,
  resetFilters,
} from "./state.js";

const state = createInitialState();

const tbody = document.getElementById("games-tbody");
const thead = document.querySelector("#games-table thead");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("search");
const genreSelect = document.getElementById("genre-filter");
const platformChips = document.getElementById("platform-chips");
const resetBtn = document.getElementById("reset-filters");
const tabBar = document.querySelector(".tabs");

const allPlatforms = getAllPlatforms(GAMES);
const allGenres = getAllGenres(GAMES);

function rerender() {
  const rows = applyFiltersAndSort(GAMES, state);
  tbody.innerHTML = renderRows(rows);
  emptyState.hidden = rows.length !== 0;
  platformChips.innerHTML = renderPlatformChips(allPlatforms, state.platforms);
  genreSelect.innerHTML = renderGenreOptions(allGenres, state.genre);
  updateSortIndicators(thead, state.sortKey, state.sortDir);
}

// Sortable column headers
thead.addEventListener("click", (e) => {
  const th = e.target.closest("th.sortable");
  if (!th) return;
  toggleSort(state, th.dataset.sort);
  rerender();
});

// Search
searchInput.addEventListener("input", (e) => {
  state.search = e.target.value;
  rerender();
});

// Genre dropdown
genreSelect.addEventListener("change", (e) => {
  state.genre = e.target.value;
  rerender();
});

// Platform chips (event delegation — chips are re-rendered each update)
platformChips.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  togglePlatform(state, chip.dataset.platform);
  rerender();
});

// Tabs
tabBar.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  state.tab = tab.dataset.tab;
  tabBar.querySelectorAll(".tab").forEach((t) => {
    const active = t === tab;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", active);
  });
  rerender();
});

// Reset
resetBtn.addEventListener("click", () => {
  resetFilters(state);
  searchInput.value = "";
  rerender();
});

rerender();
