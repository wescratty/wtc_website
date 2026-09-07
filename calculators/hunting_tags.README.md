# MT Hunting Tag Tracker

A personal field-reference tool for southwest Montana deer & elk hunting districts — pick a district, pick a tag/opportunity, and see whether it's open right now, based on the tags and licenses you say you hold. Built to answer "wait, can I shoot a cow elk here today?" from a phone in the field, with no cell service required once it's loaded.

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
- **District → Tag dropdowns**: pick one of the 13 districts, then one of that district's deer/elk opportunities. Each dropdown option is prefixed with a live status icon (✅ good to hunt now, ⏳ not open, 🔒 need the license/tag, 🏹 need Bow and Arrow License, 🚫 not eligible).
- **District Map button**: opens a reference map (Region 2/3 hunting district boundaries) in a dismissible overlay — for finding a district on the ground, not a legal source. Image lives at `../assets/hunting/district-map-region2-3.png`.
- **Detail panel**: shows the season windows, restrictions, issuing method, a "do you have this tag?" checkbox for separately-purchased Deer B/Elk B tags and permits, and a collapsible definitions section for terms like "Antlered Buck" or "Brow-tined" (sourced from the regs' own definitions page). Checking "I have this tag" also turns on that district (and any other district the same B-tag/permit code is valid in) in the Field Card's district filter, so confirming a tag immediately shows its effect on the Field Card instead of leaving the hunter to separately discover and flip on the district filter themselves. Unchecking a tag does *not* remove the district from the filter — a hunter might still hold other tags there.
- **Field Card**: only the tags the hunter holds AND is eligible for AND are open right now (`overallState() === "good"`) — everything else is simply not shown, on purpose, for a clean glance. Shown by default (`fieldCardOpen = true`) and re-rendered live on every profile/tag change, so confirming a tag shows its effect immediately instead of requiring a separate "Show" click; the toggle button still lets the hunter collapse it out of the way. No caption, no color coding, just the animal icon; tap one to jump to its full detail. If nothing you hold is currently in season, the section says so instead of showing an empty grid. The full option list for a district is still one click away in the Tag / Opportunity dropdown — Field Card is deliberately not the comprehensive view. Has a Print button (see "Icons" below for the print-specific caption).

  **Same-opportunity dedup**: the regs sometimes list one opportunity (e.g. "Either-sex Whitetail Deer") as two rows with different land/phase scope — a "private land, full season" row and a narrower-season "no restriction" row that happens to cover more ground while it's open. Both are real, separately-modeled tags, but when both are simultaneously "good" they render as two visually-identical icons with nothing to tell them apart. `renderFieldCard()` collapses this: only for "included with license" rows (never separately held, so showing one is enough) sharing the same `icon`, it keeps the first and drops the rest. Deer B/Elk B tags and permits are *never* collapsed this way, even if they share an icon — each is a distinct physical tag, and hiding one would hide that the hunter can take an animal under each. The Tag/Opportunity dropdown has the equivalent problem in the same rows and fixes it differently: `renderTagOptions()`/`tagDisambiguator()` appends a short `[private land]`/`[archery]`-style hint, but only to "General License" options with a colliding label — a Deer B/Elk B option's own code already tells it apart, so it's never hinted.
- **Disclaimer gate**: blocks the whole page until the hunter checks an acknowledgment that this is a personal reference, not the regulations, and they're responsible for double-checking everything. Remembered per browser/device (`localStorage`), so it only shows once.

## Icons

Each tag/opportunity shows a real Montana FWP identification-guide illustration (`tagIconImg()` / `ICON_IMG` in the script) — plain white background, square, no color coding, no text baked in. The image itself is the signal: antlers visible = antlered-only, no antlers = antlerless-only, two animals together = either-sex. Files live at `../assets/hunting/icons/<iconKey>.png`, one per `tag.icon` value: `wtdBuck`/`wtdEither`/`wtdDoe`/`mdBuck`/`mdEither`/`mdDoe`/`elkBull`/`elkEither`/`elkCow` (the 9 in active use) plus **`elkSpike`, reserved but not wired to any current tag** — trimmed and padded to a consistent 320×320 square. Background-removal and resize steps are in the session history if the source images (`C:\dev\website\new-site\fwp_screen shots\`) ever need reprocessing; watch for source screenshots with a non-white (e.g. light gray-blue) background baked in — a naive "pad with white" pass doesn't clean those, the near-background color has to be detected and replaced first, or the pad shows through as a visible tint.

### `elkSpike` — reserved, not yet used

Montana's elk regs have a third bull category beyond antlered/brow-tined: **Spike Bull** ("antlers that do not branch, or if branched, the branch is less than 4 inches long"). None of this app's 13 districts currently have a Spike Bull-only tag (it shows up in HDs like 339/343, which aren't in the data), so `elkSpike` isn't referenced by `ICON_IMG` lookups from any tag today. **Do not** use it as a stand-in for `elkBull`/`elkEither` on "Brow-tined Bull" tags — a spike, by definition, does *not* satisfy a brow-tine requirement, so that swap would make the icon wrong, not just imprecise. If a future district needs a genuine Spike Bull tag, set that tag's `icon` to `"elkSpike"` directly; the image is already trimmed, resized, and precached, so no other wiring is needed.

In the **detail panel**, a locked tag (not held, not eligible, or missing the Bow and Arrow License for an archery-only window) renders desaturated via a CSS `grayscale` filter on the `<img>`. In the **Field Card**, locked tags don't render at all rather than showing grayed-out (see above) — so the grayscale treatment only ever appears in the detail panel now.

Field Card buttons carry no visible caption on screen (by design), but each has a `.ht-fc-print-label` div that's hidden on screen and shown only under `@media print`, so a printed sheet — which can't be tapped for detail — still identifies each tag by code and label.

### Caveat flags (⚠️)

The icon-only design can't show every legal nuance — a "buck" or "bull" image can't distinguish an unrestricted tag from one with a real qualifier the state's own regs care about. `tagCaveats(tag)` in the script flags three cases by pattern-matching the tag's `label`/`restriction` text:

- **Brow-tined bull required** (label contains "Brow-tined") — MT's regs define this as a specific anatomical qualifier (a point ≥4" on the lower half of a main beam), not just "any antlered bull." This is the common case for most Region 2 general elk licenses; Region 3's "Either-sex Elk" wording does *not* carry this restriction, which is exactly why the label text is preserved verbatim from each region's own regs rather than normalized.
- **Antler-point-restricted permit** (restriction matches `/\d+\s*points?\s*(or fewer|or less|maximum|max)/i`) — e.g. HD 270-51's "3 points or fewer on one side."
- **Limited weapon types** (restriction mentions "shotgun" or "traditional handgun") — tags valid for a specific weapon set narrower than a normal season, distinct from the Bow and Arrow License gate.

A flagged tag gets a small ⚠️ badge in the corner of its icon (`caveatCornerHTML()`, both in the Field Card and the detail panel's icon box — carries a `title` tooltip, but that's a desktop-hover bonus only, not load-bearing, since tapping the button already opens the full detail popup). In the detail panel, the same mark also appears inline on whichever specific line triggered it (`caveatInlineHTML()`, no tooltip) — the headline for a label-based flag, the Restrictions line for a restriction-based one. **The actual reason is always plain visible text, never hidden behind hover** — title tooltips don't work on touch, so nothing important can depend on one. For a restriction-based flag the restriction text itself already is the visible reason; for a label-based flag (no nearby explanatory text otherwise) `renderDetail()` adds a dedicated `.ht-caveat-note` callout right under the headline. Adding a new caveat category is one more block in `tagCaveats()` — no changes needed elsewhere.

## Data source & scope

Hand-transcribed from the **2026 Montana Deer, Elk & Antelope regulations** (FWP), covering hunting districts **211, 240, 250, 260, 261, 262, 270** (Bitterroot Valley / Region 2) and **302, 319, 321, 329, 331, 340** (Big Hole / Beaverhead / Region 3). Definitions (Antlered Buck, Antlerless, Brow-tined, Either-sex, etc.) are from page 9 of that same document.

Region 3 districts share several multi-district B-tags (`003-00`, `399-00`, etc., "valid in all Region 3 HDs") — these are entered as the same `code` + `species` on each district they apply to, so the app's existing cross-district propagation (confirm once, it marks everywhere that code is valid) picks them up automatically.

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

`hunting-tags-sw.js` precaches an explicit allowlist of same-origin paths (the page itself, `style.css`, the Rye font, the logo/favicons, the district map image, all 9 icon images) on first load, then serves them cache-first so the page works with zero connectivity afterward — closed tab, airplane mode, phone restart, etc. It deliberately does **not** touch any request outside that allowlist, so it can't affect the other calculator pages sharing the same `/calculators/` service worker scope.

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
