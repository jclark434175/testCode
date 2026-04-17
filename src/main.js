import { GAMES } from "./data/games.js";
import { renderProductCards, renderCategoryCards } from "./render.js";
import {
  createInitialState,
  applyCategoryAndSort,
} from "./state.js";

const state = createInitialState();

const productGrid = document.getElementById("product-grid");
const categoryGrid = document.getElementById("category-grid");
const sortSelect = document.getElementById("sort-select");
const emptyState = document.getElementById("empty-state");
const lastUpdated = document.getElementById("last-updated");

function rerender() {
  const games = applyCategoryAndSort(GAMES, state);
  productGrid.innerHTML = renderProductCards(games);
  emptyState.hidden = games.length !== 0;
  categoryGrid.innerHTML = renderCategoryCards(state.category);
}

// Category cards (event delegation — cards re-render on change)
categoryGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".category-card");
  if (!card) return;
  state.category = card.dataset.category;
  rerender();
  document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
});

// Sort select
sortSelect.addEventListener("change", (e) => {
  state.sortKey = e.target.value;
  rerender();
});

// Footer category shortcuts
document.querySelectorAll('.footer-col a[data-category]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    state.category = a.dataset.category;
    rerender();
    document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Last-updated stamp
const fmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric", month: "short", day: "numeric",
});
lastUpdated.textContent = `Last updated ${fmt.format(new Date())} · ${GAMES.length} games ranked`;

rerender();
