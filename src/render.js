// Pure render helpers. Each returns an HTML string; the DOM write happens in
// main.js so this module stays easy to reason about and test.

import { STORES } from "./data/stores.js";

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

const formatMoney = (n) => `$${n.toFixed(2)}`;
const formatValue = (n) => `$${n.toFixed(2)}/hr`;

function renderPlatformBadges(platforms) {
  return platforms
    .map(
      (p) =>
        `<span class="platform-badge" data-platform="${escapeHtml(p)}">${escapeHtml(p)}</span>`
    )
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

export function renderRows(games) {
  if (games.length === 0) return "";
  return games
    .map((game, i) => {
      const valuePerHour = game.price / game.hoursAvg;
      return `<tr data-id="${escapeHtml(game.id)}">
        <td class="col-rank" data-label="Rank">#${i + 1}</td>
        <td class="col-title" data-label="Title">
          <div class="title-cell">
            <span class="title">${escapeHtml(game.title)}</span>
            <span class="year">${game.releaseYear}</span>
          </div>
        </td>
        <td class="col-platforms" data-label="Platforms">${renderPlatformBadges(game.platforms)}</td>
        <td class="col-genre" data-label="Genre">${escapeHtml(game.genre)}</td>
        <td class="num" data-label="Metacritic">${game.metacritic}</td>
        <td class="num" data-label="Avg hours">${game.hoursAvg}</td>
        <td class="num" data-label="Price">${formatMoney(game.price)}</td>
        <td class="num strong" data-label="$ / hour">${formatValue(valuePerHour)}</td>
        <td class="col-buy" data-label="Buy at">
          <div class="buy-btn-group">${renderBuyButtons(game)}</div>
        </td>
      </tr>`;
    })
    .join("");
}

export function renderPlatformChips(allPlatforms, activePlatforms) {
  return allPlatforms
    .map((p) => {
      const active = activePlatforms.has(p);
      return `<button
        type="button"
        class="chip${active ? " active" : ""}"
        data-platform="${escapeHtml(p)}"
        aria-pressed="${active}"
      >${escapeHtml(p)}</button>`;
    })
    .join("");
}

export function renderGenreOptions(allGenres, activeGenre) {
  const options = [
    `<option value=""${activeGenre === "" ? " selected" : ""}>All genres</option>`,
    ...allGenres.map(
      (g) =>
        `<option value="${escapeHtml(g)}"${
          activeGenre === g ? " selected" : ""
        }>${escapeHtml(g)}</option>`
    ),
  ];
  return options.join("");
}

export function updateSortIndicators(thead, sortKey, sortDir) {
  thead.querySelectorAll("th.sortable").forEach((th) => {
    th.classList.remove("sort-asc", "sort-desc");
    if (th.dataset.sort === sortKey) {
      th.classList.add(sortDir === "asc" ? "sort-asc" : "sort-desc");
    }
  });
}
