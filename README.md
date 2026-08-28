# WTC Montana Construction

Source for the [WTC Montana LLC Construction](https://www.wtcmontanaconstruction.com) website — a general contractor site for the Bitterroot Valley, Montana, rebuilt from the ground up as a fast, static, framework-free site with a set of custom-built construction calculators.

**Live site:** https://www.wtcmontanaconstruction.com

## Overview

A multi-page business site (services, portfolio, about, contact) plus a library of free jobsite calculators built from scratch — no calculator libraries or frameworks, just HTML/CSS/vanilla JS. The goal was a site that's genuinely fast, works well on a phone at a jobsite, and gives visitors real tools instead of a static brochure.

## Calculators

- **Rafter Calculator** — roof rafter length, angles, and cut layout from pitch and run.
- **Stair Calculator** — rise/run/tread layout with a live SVG diagram that redraws itself as inputs change, including dimension callouts and a printable single-page cut sheet.
- **Hip & Valley Sheathing Angle Calculator** — computes the sheet-cutting angle where two roof planes meet, from each plane's pitch. Uses the roof-plane-intersection dihedral-angle formula and shows exactly where to strike the cut line on a 4x8 sheet.
- **Concrete Calculator** — cubic yards for slabs/flatwork, plus a round-form (Sonotube) pier calculator with bagged-mix estimates.
- **Spacing Calculator** — a 6-scenario wizard (equal-gap decking, decking with overhang, min-rip against a wall, baluster max-gap spacing, rafter-tail layout, tight-pack with center rip) instead of one generic form trying to cover every use case.
- **Just for Fun** — a probability/decision-tree calculator, a decision-scale calculator, and a Wordle helper (a from-scratch port of a constraint-satisfaction Wordle solver, with a click-to-cycle color-tile UI).

## Tech

- Plain HTML/CSS/JS, no build step, no frameworks.
- `gen_site.py` — a Python static-site generator used to keep shared markup (header/footer/nav) consistent across pages during larger rebuilds.
- Deployed on **Cloudflare Workers** (static assets) via Git integration — every push to `master` triggers an automatic rebuild and deploy.
- Custom domain + DNS managed through Cloudflare, registrar at Squarespace Domains.

## Project structure

```
├── index.html, about.html, contact.html, portfolio.html, tools.html, fun-tools.html
├── services/            service pages (new build, remodels, foundations, etc.)
├── portfolio/            individual project pages
├── calculators/          all the calculator tools
├── assets/                images, logo, fonts
├── css/style.css          shared stylesheet
├── gen_site.py            static site generator
└── sitemap.xml, robots.txt
```

## Local development

No build step — clone the repo and open any `.html` file, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

Connected to Cloudflare Workers via Git integration. Pushing to `master` triggers an automatic build and deploy — no manual upload step.
