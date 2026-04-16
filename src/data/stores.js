// Storefront metadata — single source of truth.
// To add/remove a storefront, update this list AND the `affiliates` object
// on each game in ./games.js.
export const STORES = [
  { id: "amazon",      label: "Amazon",      short: "Amazon",   color: "#FF9900", textColor: "#111" },
  { id: "steam",       label: "Steam",       short: "Steam",    color: "#1B2838", textColor: "#fff" },
  { id: "epic",        label: "Epic Games",  short: "Epic",     color: "#2A2A2A", textColor: "#fff" },
  { id: "gog",         label: "GOG.com",     short: "GOG",      color: "#86328A", textColor: "#fff" },
  { id: "playstation", label: "PS Store",    short: "PS",       color: "#0070D1", textColor: "#fff" },
  { id: "xbox",        label: "Xbox Store",  short: "Xbox",     color: "#107C10", textColor: "#fff" },
];
