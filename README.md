# AfriPulse 🌍

A research and comparison intelligence dashboard covering all 59 African countries.
Built as a production-grade Vue 3 application mirroring the architecture of real-world
African economic data platforms.

🔗 **Live Demo:** [https://afripulse-rust.vercel.app](https://afripulse-rust.vercel.app)

---

## Overview

AfriPulse gives researchers, analysts, and curious minds a fast, clean interface to
explore African countries by geography, population, languages, currencies, regional
blocs, and economic indicators. It is not a tutorial project — it is a shippable
portfolio product built with the same tools and patterns used in production Vue 3 teams.

---

## Features

### ✅ Live (Week 1)
- Country listing for all 54 African nations sourced from the REST Countries API
- Live search with reactive filtering by country name
- Subregion sidebar navigation with active state highlighting
- Pinia store managing global state — selected region, search query, filtered results
- Country detail page with full metadata — flag, capital, population, languages, currencies
- Vue Router 4 navigation with dynamic route segments
- Full TypeScript interfaces across components, stores, and API responses
- Tailwind CSS throughout — dark mode, responsive grid, utility-first styling

### 🚧 In Progress (Week 2)
- Multi-country comparison tool
- 10-year GDP time-series charts via World Bank Indicators API (Chart.js)
- Pinia-persisted favourites and watchlist
- Suspense + async components for deferred data loading
- Responsive grid and dark mode refinements

### 📅 Planned (Weeks 3–4)
- Cmd+K command palette (Teleport + provide/inject)
- Reactive SVG choropleth map of Africa
- Virtualised list with v-memo and IntersectionObserver
- Vitest unit tests for composables and stores
- EN/FR internationalisation with vue-i18n
- PWA support via vite-plugin-pwa

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API) |
| Language | TypeScript |
| State Management | Pinia |
| Routing | Vue Router 4 |
| Styling | Tailwind CSS v3 |
| Charts | Chart.js |
| Build Tool | Vite |
| Testing | Vitest |
| Deployment | Vercel |

---

## Data Sources

- **REST Countries API** — `restcountries.com/v3.1` — geography, population, languages,
  currencies, flags, regional blocs
- **World Bank Indicators API** — `api.worldbank.org/v2` — GDP, GDP per capita,
  inflation, trade balance (10-year time series)

---

## Architecture Decisions

**Composition API exclusively** — no Options API. All component logic is written with
`setup()`, `ref`, `computed`, `watch`, and custom composables. This mirrors how
production Vue 3 teams write code today.

**Pinia over Vuex** — stores are structured as composable-style setup stores, keeping
state, getters, and actions colocated and fully typed.

**Composables for data fetching** — API calls are abstracted into reusable composables
rather than living inside components, keeping components focused purely on presentation.

**Tailwind as the sole styling method** — no scoped style blocks, no CSS modules.
Dark mode via Tailwind's class strategy with `dark:` variants throughout.

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/yomiblack/afripulse.git
cd afripulse

# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test
```

---

## Project Status

This project is actively in development. Features are being added weekly.
The live demo reflects the current deployed state.

---

## Author

**Abayomi Adeleke**
[LinkedIn](https://www.linkedin.com/in/abayomi-adeleke-8975a483/) · [GitHub](https://github.com/yomiblack)