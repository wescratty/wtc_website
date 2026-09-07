# MT Hunting Tag Tracker

A personal field-reference tool for Bitterroot Valley deer & elk hunting districts — pick a district, pick a tag/opportunity, and see whether it's open right now, based on the tags and licenses you say you hold. Built to answer "wait, can I shoot a cow elk here today?" from a phone in the field, with no cell service required once it's loaded.

**Status: not yet linked from the live site.** It isn't referenced from `fun-tools.html`, `tools.html`, or any nav — it's only reachable by knowing the direct URL. Wire it in (see "Going live" below) whenever it's ready.

## Files

| File | Purpose |
|---|---|
| `hunting_tags.html` | The entire app — markup, styles, data, and logic in one file. |
| `hunting-tags.webmanifest` | Web app manifest ("Add to Home Screen" support). |
| `hunting-tags-sw.js` | Service worker — precaches the app shell so it works fully offline after the first load. |
| `hunting_tags.README.md` | This file. |

## How it works

- **Hunter Profile** (top of page): age, PTHFV holder, Bow and Arrow License, and whether they hold a General Deer/Elk License. Saved to `localStorage`, so it's a one-time setup.
- **District → Tag dropdowns**: pick one of the 6 districts, then one of that district's deer/elk opportunities. Each dropdown option is prefixed with a live status icon (✅ good to hunt now, ⏳ not open, 🔒 need the license/tag, 🏹 need Bow and Arrow License, 🚫 not eligible).
- **Detail panel**: shows the season windows, restrictions, issuing method, a "do you have this tag?" checkbox for separately-purchased Deer B/Elk B tags and permits, and a collapsible definitions section for terms like "Antlered Buck" or "Brow-tined" (sourced from the regs' own definitions page).
- **Field Card**: a rollup of every tag/license the hunter actually holds and is eligible for, across whichever districts they choose to show (via the "Districts shown" filter), sorted open-now-first. Has a Print button.
- **Disclaimer gate**: blocks the whole page until the hunter checks an acknowledgment that this is a personal reference, not the regulations, and they're responsible for double-checking everything. Remembered per browser/device (`localStorage`), so it only shows once.

## Badge icons

Each tag/opportunity renders as a tattoo-flash-style seal (`tagBadgeSvg()` in the script): a bold ring, a field color pulled from the real animal (cream/white whitetail, gray mule deer, brown elk), curved border text carrying the actual tag language (e.g. "Antlered Buck" / "White-tail"), and a center mark — **Y** for antlered/buck/bull-only tags (forks like an antler), **X** for antlerless-only, **X/Y** for either-sex. A locked tag (not held, not eligible, or missing the Bow and Arrow License for an archery-only window) renders desaturated via a CSS `grayscale` filter on the `<svg>` itself.

The top/bottom text is derived from `tag.label` and `tag.icon` at render time (see `badgeTopText`/`badgeSpeciesStyle`/`badgeIconKind`), not hand-authored per tag — so a label change in the data updates its badge automatically. Font is Rye (already loaded site-wide via `style.css`'s `@font-face`, and precached by the service worker for offline use).

## Data source & scope

Hand-transcribed from the **2026 Montana Deer, Elk & Antelope regulations** (FWP), covering only hunting districts **240, 250, 260, 261, 262, and 270** (Bitterroot Valley). Definitions (Antlered Buck, Antlerless, Brow-tined, Either-sex, etc.) are from page 9 of that same document.

A few entries in the data are flagged inline as "confirm current details" where the source PDF's table layout was genuinely ambiguous (multi-line wrapped cells in a dense table) rather than guessed with false confidence — search the district data for that phrase if auditing.

**This is not an authoritative legal source.** The disclaimer gate and the persistent privacy note both say so; keep that framing if this ever gets promoted to a linked, public-facing tool.

### Updating for a new season

All season dates live as named constants near the top of the `<script>` block in `hunting_tags.html` (`P_ARCH`, `P_GEN`, `P_MUZZ`, `P_LATE`, etc.) — one edit to a constant updates every tag that references it. District-specific exceptions (e.g. HD 260's archery-district general season, HD 262's short buck-permit window) have their own named constants for the same reason. The `DISTRICTS` object below that holds each district's tag list, referencing those phase constants plus per-tag `restriction`, `issue`, and optional `eligibility` fields.

When the new year's regs come out:
1. Re-verify every phase constant's dates.
2. Walk each district's tag list for anything that changed (new B-license codes, quota changes, retired permits).
3. Bump `CACHE_NAME` in `hunting-tags-sw.js` (e.g. `hunting-tags-v1` → `hunting-tags-v2`) — otherwise returning visitors with a signal stay stuck on last year's cached copy.

## Storage / privacy

Everything is `localStorage`, scoped to whichever browser/device it's opened on — nothing is sent to a server. Keys in use:

- `wtc-hunting-tags-v1` — confirmed Deer B/Elk B tags and permits, per district.
- `wtc-hunting-profile-v1` — age, PTHFV, Bow and Arrow License, General Deer/Elk License.
- `wtc-hunting-distfilter-v1` — which districts the Field Card shows.
- `wtc-hunting-disclaimer-accepted-v1` — whether the gate has been accepted on this browser.

Because it's per-browser, filling it out on a PC does **not** carry over to a phone — the page itself says this in the privacy note, but it's worth remembering when testing.

## Offline support

`hunting-tags-sw.js` precaches an explicit allowlist of same-origin paths (the page itself, `style.css`, the Rye font, the logo/favicons) on first load, then serves them cache-first so the page works with zero connectivity afterward — closed tab, airplane mode, phone restart, etc. It deliberately does **not** touch any request outside that allowlist, so it can't affect the other calculator pages sharing the same `/calculators/` service worker scope.

Note: service worker registration could not be verified inside this repo's automated preview tooling (it blocks SW registration entirely, confirmed with a trivial throwaway test worker) — it needs a real-browser test (phone or desktop) after deploy: load with a signal, then reload in airplane mode.

## Local development

Same as the rest of the site — no build step:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/calculators/hunting_tags.html`. A plain `file://` open works for a quick look, but the service worker and manifest only function over `http(s)://`.

## Going live

When ready to make it discoverable:
1. Add a card to `fun-tools.html`'s grid linking to `calculators/hunting_tags.html` (it was there briefly during development — see git history for the exact markup).
2. Update `README.md`'s "Just for Fun" bullet list to mention it, if that list is meant to stay current.
