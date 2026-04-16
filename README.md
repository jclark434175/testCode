# Best Value Games

A static, single-page site that ranks top video games by **$ / hour of
gameplay** — modeled on [bestvaluegpu.com](https://bestvaluegpu.com/) but for
games. Every row has affiliate buy buttons for six storefronts (Amazon, Steam,
Epic, GOG, PS Store, Xbox Store) that light up as you drop real affiliate URLs
into the data file.

## Run locally

Requires Node 18+.

```bash
npm install
npm run dev
```

Then open <http://localhost:5173>.

Other scripts:

- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built bundle locally

## Adding affiliate links

All game data lives in [`src/data/games.js`](src/data/games.js). Each game has
an `affiliates` object keyed by storefront id:

```js
{
  id: "elden-ring",
  title: "Elden Ring",
  // ...
  affiliates: {
    amazon:      "https://www.amazon.com/...?tag=YOUR_TAG",
    steam:       "https://store.steampowered.com/app/...",
    epic:        "",
    gog:         "",
    playstation: "",
    xbox:        "",
  },
}
```

- Buttons with a non-empty URL render as **active** links
  (`target="_blank" rel="sponsored noopener noreferrer"`).
- Buttons left as empty strings render as **greyed-out, disabled placeholders**
  so the layout stays stable.

Changes hot-reload via Vite — no rebuild needed while `npm run dev` is running.

## Adding or removing storefronts

Edit [`src/data/stores.js`](src/data/stores.js) — it's the single source of
truth for which storefronts get a button column. If you add a new store, also
add a matching key to the `affiliates` object on each game in `games.js`.

## Adding more games

Append new entries to the `GAMES` array in
[`src/data/games.js`](src/data/games.js). Required fields:

| Field         | Type     | Notes                                          |
|---------------|----------|------------------------------------------------|
| `id`          | string   | Unique kebab-case slug                         |
| `title`       | string   |                                                |
| `releaseYear` | number   |                                                |
| `genre`       | string   | Used in the genre filter dropdown              |
| `platforms`   | string[] | e.g. `["PC","PS5","Switch"]`                   |
| `metacritic`  | number   | 0–100                                          |
| `price`       | number   | USD                                            |
| `hoursAvg`    | number   | Representative average playtime                |
| `affiliates`  | object   | One key per storefront in `stores.js`          |

The page computes `$/hour = price / hoursAvg` automatically; no need to store
the derived value.

## Project structure

```
index.html               # Table skeleton + toolbar
src/
├── main.js              # Wires render + events
├── render.js            # Pure HTML render helpers
├── state.js             # Sort/filter state and derivation
├── styles.css           # All styling
└── data/
    ├── stores.js        # Storefront metadata
    └── games.js         # Game list (edit me!)
```

## Disclosure

This repo includes an **affiliate disclosure** in the site footer. Keep it in
place when you go live — it's required by the FTC in the US and by most
storefront affiliate programs.
