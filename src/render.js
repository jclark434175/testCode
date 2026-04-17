// Pure render helpers — each returns an HTML string.

import { STORES } from "./data/stores.js";
import { CATEGORIES } from "./state.js";

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

const formatMoney = (n) => `$${n.toFixed(2)}`;
const formatValue = (n) => `$${n.toFixed(2)}`;

function tileColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return `hsl(${Math.abs(h) % 360}, 55%, 40%)`;
}

function ratingClass(score) {
  if (score >= 90) return "";
  if (score >= 75) return "mid";
  return "low";
}

function renderProductImage(game) {
  if (game.image) {
    const letter = escapeHtml(game.title.charAt(0).toUpperCase());
    const bg = tileColor(game.title);
    return `<img
      src="${escapeHtml(game.image)}"
      alt="${escapeHtml(game.title)} cover"
      loading="lazy"
      onerror="this.outerHTML='<div class=\\'image-fallback\\' style=\\'background:${bg}\\'>${letter}</div>'"
    />`;
  }
  const letter = escapeHtml(game.title.charAt(0).toUpperCase());
  return `<div class="image-fallback" style="background:${tileColor(game.title)}">${letter}</div>`;
}

function renderPlatforms(platforms) {
  return platforms
    .map((p) => `<span class="platform-badge">${escapeHtml(p)}</span>`)
    .join("");
}

function renderBuyButtons(game) {
  return STORES.map((store) => {
    const url = game.affiliates?.[store.id] || "";
    const style = `--store-bg:${store.color};--store-fg:${store.textColor}`;
    if (url) {
      return `<a
        class="buy-btn"
        style="${style}"
        href="${escapeHtml(url)}"
        target="_blank"
        rel="sponsored noopener noreferrer"
        aria-label="Buy ${escapeHtml(game.title)} on ${escapeHtml(store.label)}"
      >${escapeHtml(store.short)}</a>`;
    }
    return `<span
      class="buy-btn disabled"
      style="${style}"
      title="Affiliate link not set for ${escapeHtml(store.label)}"
      aria-disabled="true"
    >${escapeHtml(store.short)}</span>`;
  }).join("");
}

export function renderProductCards(games) {
  if (games.length === 0) return "";
  return games
    .map((game, i) => {
      const valuePerHour = game.price / game.hoursAvg;
      return `<article class="product-card" data-id="${escapeHtml(game.id)}">
        <div class="product-image">
          <span class="product-rank">#${i + 1}</span>
          <span class="product-rating ${ratingClass(game.metacritic)}" title="Metacritic score">${game.metacritic}</span>
          ${renderProductImage(game)}
        </div>
        <div class="product-body">
          <div class="product-genre">${escapeHtml(game.genre)}</div>
          <h3 class="product-title">${escapeHtml(game.title)}</h3>
          <span class="product-year">${game.releaseYear}</span>
          <div class="product-platforms">${renderPlatforms(game.platforms)}</div>
          <div class="product-metrics">
            <div class="metric">
              <span class="metric-label">Price</span>
              <span class="metric-value">${formatMoney(game.price)}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Hours</span>
              <span class="metric-value">${game.hoursAvg}</span>
            </div>
            <div class="metric">
              <span class="metric-label">$ / Hour</span>
              <span class="metric-value success">${formatValue(valuePerHour)}</span>
            </div>
          </div>
          <div class="buy-btn-group">${renderBuyButtons(game)}</div>
        </div>
      </article>`;
    })
    .join("");
}

export function renderCategoryCards(activeCategory) {
  return CATEGORIES
    .map((cat) => {
      const active = cat.id === activeCategory;
      return `<button
        type="button"
        class="category-card${active ? " active" : ""}"
        data-category="${escapeHtml(cat.id)}"
        aria-pressed="${active}"
      >
        <span class="cat-emoji" aria-hidden="true">${cat.emoji}</span>
        <span class="cat-name">${escapeHtml(cat.label)}</span>
      </button>`;
    })
    .join("");
}
