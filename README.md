# Groma

A public room that teaches Terraform. The first page runs from a root module through the graph, plan, and state. Checks are graded in the browser. The plan reveals the proposal that configuration would produce. This site does not run Terraform and does not apply a change.

The product name is Groma.

## Layout

- `src/app` — the short lessons, the language, vision, architecture, releases
- `content/lessons.ts` — the first page
- `docs` — vision and architecture, rendered in summary on those pages
- `public/hero-bg.svg` — a survey grid

## Local checks

```sh
npm install
npm run dev
```

`npm run build` writes a static site to `out/`. A local build does not set `BASE_PATH`.

## Deploy

`npm run build` writes a static site to `out/`. GitHub Pages serves that export from `main` through `.github/workflows/pages.yml`. The workflow sets `BASE_PATH=/Groma` so styles and the grid load at https://jmaret.github.io/Groma/.

## Docs

A change under `src/` or `content/` also updates `docs/VISION_AND_REQUIREMENTS.md`, `docs/ARCHITECTURE_AND_DESIGN.md`, and `CHANGELOG.md`. The vision and architecture pages render the Summary of those files. The releases page renders the changelog. The architecture pictures and the Mermaid diagrams change together.
