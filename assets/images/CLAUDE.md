# Photo Folder Notes

This file is shared context between the site owner and Claude for the portfolio
photo folders in `assets/images/`. The owner adds a description before handing off
a batch of photos; Claude adds takeaways/naming notes after processing. Keep this
updated so a fresh Claude session (no chat history) can pick up where things left
off.

Naming convention: descriptive-kebab-case.jpg, prefixed with a short project slug.
Images are resized to a max dimension of ~1400px and compressed (JPEG quality ~78)
for fast page loads.

---

## Site Re-stylization (2026-08-27)

With all photo folders processed, the whole site was re-stylized to use real
project photos and match the color scheme from the live Squarespace site
(https://www.wtcmontanaconstruction.com/). Summary of what changed, for a future
session with no chat history:

- **Palette**: switched from the old rust/charcoal placeholder scheme to navy
  `#253551` + cream `#e0e0db` (matches the live site's computed colors, extracted
  via DOM inspection since screenshot access wasn't available), plus a small
  gold/rust accent (`#b9863f`) for buttons and highlights. Defined in
  `css/style.css` under `:root`.
- **Logo**: a `C:\dev\website\Logos` folder holds several logo concepts (circular
  sawblade-emblem SVGs, a Rye-font wordmark). Cross-referenced the live site's
  actual `<img>` src filename against this folder and confirmed
  `Screenshot 2026-05-14 055623.png` is the real, in-production logo — a plain
  "WTC MONTANA LLC" wordmark in the Rye Google Font, black text. Inverted it to
  white-on-transparent (`assets/logo/wtc-montana-logo-white.png`) for the navy
  header/footer; kept the original black version too
  (`assets/logo/wtc-montana-logo-black.png`) in case it's needed on a light
  background. Built a favicon (`assets/logo/favicon-*.png`) from the circular
  sawblade-emblem SVG (`wtc-logo-b.svg` in the Logos folder) since it reads better
  as a small icon than the wide wordmark.
- **Font**: the logo font is Google Font "Rye". Self-hosted the actual
  `Rye-Regular.ttf` file (from `Logos/Rye/`) at `assets/fonts/Rye-Regular.ttf`
  via `@font-face` in the CSS, rather than linking Google Fonts CDN — more
  reliable and no external dependency. Used for all headings (h1/h2/hero/CTA),
  not body text.
- **Homepage hero fixed**: the old hero used `assets/images/Old/new-build-project.jpg`,
  which is actually the 409 S 4th "before" photo (very bright sky/pale siding) —
  correctly flagged as inappropriate since the white "Building America..."
  headline text was getting lost against it. Replaced the hero image with
  `Sunset-Bench/sunset-bench-house-hero-completed-twilight-exterior-1.jpg` (a
  striking twilight shot) and, more importantly, fixed the underlying bug: the
  hero text now sits inside a `.hero-panel` — a semi-opaque navy card behind the
  heading/subhead — so contrast is guaranteed regardless of which photo is used
  behind it. If the hero photo changes again in the future, this won't break.
- **Portfolio rebuilt**: `portfolio.html` is now a real index of 7 project cards,
  each linking to a full detail page under `portfolio/` (own file per project:
  `409-s-4th-exterior-remodel.html`, `sunset-bench-custom-home.html`,
  `three-centered-arch-porch.html`, `kitchen-addition.html`,
  `forged-handrail.html`, `masonry-concrete.html`, `tile-work.html`). Each detail
  page has a photo-hero banner, a story pulled from the notes below, and a curated
  gallery (roughly 10-14 photos per project, not the full folder — folders like
  Sunset-Bench have 100+ photos and dumping all of them would bloat page weight;
  picked the story-arc highlights instead). The `Old/` placeholder folder is no
  longer referenced anywhere on the site but was left in place, untouched, in case
  it's wanted later.
- **Copy rewritten**: about, all 5 services pages, and the homepage "What We Do" /
  "Recent Projects" sections got real copy tied to actual completed work (e.g.
  Drafting & Design references the arch-porch geometry story, New Build references
  the Sunset Bench reclaimed-wood build). Contact page and every "free quote" CTA
  site-wide changed to "Let's Talk" since free quotes aren't offered except for
  straightforward jobs, and the contact page now says so explicitly instead of
  promising a free quote.
- **sitemap.xml** updated with the new `/portfolio/*.html` URLs.
- QA'd with a local Python HTTP server + Playwright screenshots (desktop and
  mobile) before delivery — no build step, output is flat static HTML/CSS, no
  `build.py` involved. All files were delivered via SendUserFile and written back
  into `C:\dev\website\new-site\wtc-montana-website\` in place.
- Not done in this pass: `services/*.html` still link out generically rather than
  linking to specific portfolio projects for every service (only 3 of 5 have a
  project cross-link); calculators/tools.html untouched (out of scope, already
  working); no changes made to `robots.txt` or the Search Console verification
  file.

---

## 409 (409 S 4th St)

**Owner's notes:** Full exterior remodel / curb appeal update. First photo is the
before picture, IMG_2622 is an after photo. Address is fine to make public.

**Claude's notes (2026-08-27):** Done — all 31 photos processed and renamed with
the `409-s-4th-` prefix. Story arc visible in the photos: original house (before) ->
roof torn off and reframed with new dormers -> new sheathing/house wrap -> new
shingle roof -> rigid foam insulation board over full exterior -> finished stucco
exterior with dark trim. IMG_2583 had a "Crop" UI overlay baked in (screenshot
artifact) — cropped the top ~115px to remove it cleanly, kept the photo.
Status: **complete**, wired into the portfolio page (2026-08-27 re-stylization).

---

## Forged (hand-forged handrail)

**Owner's notes:** Hand forged hand rail.

**Claude's notes (2026-08-27):** Done -- new project, new folder. All 39 photos
processed and renamed with the `forged-handrail-` prefix. Clean single-arc story,
EXIF dates May 12-29, 2026, no ambiguity needing a check-in: raw steel stock staged
in the yard -> shop/forge setup -> forge fire lit, bars heating -> hand-forging
individual scroll sections, tapering and bending bar stock -> scroll pattern
chalked out on a board as a template -> scroll sections ground/finished -> full
rail assembled and dry-fit outdoors on a deck -> baluster spacing checked with a
tape measure -> "before" shots of the bare brick porch steps (no rail) -> mounting
bracket test-fit against a brick porch post -> more forge/heating work, a
bending jig set up on a vertical stand, a red-hot joint being welded/joined in the
vise -> full assembled rail shape dry-fit laid out on the lawn to match the actual
stair run -> installed on the brick porch steps -> finished shots with the scroll
finial detail, sunflower pots on the pillars, and two "view from the top of the
porch looking out" framing shots. 2 .MP4 video files in the source folder
(IMG_3594, IMG_3728) were skipped, stills only, per established convention. NOTE:
new project folder, no rename involved -- created fresh as `Forged` in both
assets/images and (already matching) the source `Website Photos\Forged` folder.
There's also a leftover `iCloud Photos.zip` transfer file in that source folder --
harmless, not touched.
Status: **complete**, wired into the portfolio page (2026-08-27 re-stylization).

---

## Three Centered Arch Porch (folder renamed from the client's surname)

**Owner's notes:** This client has a keen eye for detail and wanted something
really cool. He had the idea for the three-centered arch himself, and the plans
and all the details were hand-drawn (see the CAD drawing and hand-derived eave
geometry already discussed -- "Site Content Ideas" below). Client liked the
high-detail finish. It was a curb appeal upgrade as well.

**Claude's notes (2026-08-27):** Done -- all 34 photos processed and renamed with
the `three-centered-arch-porch-` prefix. Long build, EXIF October 2025 - March
2026: new sidewalk poured -> old (plain gable) entry porch demo'd -> new roof
framing goes up, with the three-centered arch shape visible taking form in the
truss/rafter framing -> roof sheathed -> columns framed in -> the curved wood
soffit itself built (the actual construction of the hand-worked arch geometry) ->
siding and white trim wrapped on -> a long stretch of cornice/column capital
detail shots -> multiple "looking straight up into the underside of the arch"
hero shots at different finish stages (raw wood framing, then trimmed, then fully
finished with the red door below) -> finished exterior shots across the winter ->
a few final detail shots in March (scaffolding/roof work and a side exterior view
-- likely finishing touches on the same broader curb-appeal upgrade rather than a
separate job, kept generic since it wasn't called out specifically). Also
included: a screenshot of a neighbor's public social-media post praising the
"gracious entry being added to this home in Hamilton" -- nice social-proof
material, named `three-centered-arch-porch-social-media-praise.jpg`, worth
considering as a testimonial callout on the site later. NOTE: the *source* folder
under `Website Photos\` still uses the original client-surname folder name (could
not be renamed on that device path — permission denied) -- harmless since it's
just raw material, but worth knowing if a future session goes looking for it and
doesn't find a matching name; check the `Website Photos` folder listing directly.
25 .MOV live-photo videos in the source folder were skipped, stills only, per
established convention.
Status: **complete**, wired into the portfolio page (2026-08-27 re-stylization).

---

## Kitchen Addition (folder renamed from the client's surname, formerly "Kitchen Bump")

**Owner's notes:** Start-to-finish kitchen addition.

**Claude's notes (2026-08-27):** Done — all 25 photos processed and renamed with
the `kitchen-addition-` prefix. Clean, unambiguous chronological sequence (EXIF
dates June 17 - July 22, 2025), no corrections needed: footing excavation ->
foundation wall forms + rebar built and braced -> concrete poured -> forms
stripped -> sill plate on the new foundation wall -> floor joists -> subfloor
framed and sheathed -> wall framing with roof trusses/rafters up (tied into the
existing house roofline, which has solar panels) -> exterior wall sheathing ->
decorative timber-frame-style knee brackets built into the gable entry
(`kitchen-addition-gable-bracket-*`) -> house wrap (HomeGuard) with window and
door openings framed in, ready for siding. Sequence stops at house wrap — no
interior/cabinet photos in this batch, so the story is the shell/addition build,
not the finished kitchen interior. 12 .MOV live-photo video files in the source
folder were skipped (stills only, per established convention). Folder renamed to
`Kitchen-Addition` in assets/images. NOTE: the *source* folder under
`Website Photos\` still uses the original client-surname folder name (permission
denied on renaming that device path, same limitation as the other folders) --
check the `Website Photos` folder listing directly if a future session needs it.
There's also a leftover `iCloud Photos (1).zip` transfer file sitting in that
source folder -- harmless, just raw material, not touched.
Status: **complete**, wired into the portfolio page (2026-08-27 re-stylization).

---

## Masonry

**Owner's notes:** Mostly about the chimney at 409 (409 S 4th St). An HVAC
installer ran the furnace exhaust directly into the unlined masonry chimney. This
is documented for SEO/educational purposes — natural gas exhaust is acidic, and
combined with moisture and freeze-thaw cycles it destroys an unlined chimney over
time, which is exactly what happened here. The rest of the batch is the rebuild:
new masonry chimney, stainless steel liner installed (not shown in photos), cast
concrete chimney caps, and a wood stove installed on a stone hearth. Corrections
to Claude's first grouping pass: IMG_0193/IMG_0208 are the 409 porch foundation
(not a separate job). IMG_0332/IMG_0333 are chimney cap casting. IMG_0411 and
similar are the water table being built on 409. The timber-frame barn sequence
doesn't belong in this folder — moved to `Other`. IMG_2222/IMG_2230 are stucco
work on 409. Everything else unclaimed is just general cement/concrete work done
over the years, not tied to a specific named client. IMG_0584 (a joke photo, not
work-related) was tossed, not used. IMG_1158 is a cozy shot of the finished wood
stove hearth and brick, not a stray photo.

**Claude's notes (2026-08-27):** Done — 45 photos processed into this folder.
Story arc: the pre-placed damage photo
(`409-s-4th-unlined-masonry-crumbling-from-natural-gas.jpg`) -> porch foundation
work (`409-s-4th-porch-foundation-*`) -> chimney rebuild
(`409-s-4th-chimney-rebuild-flue-liner.jpg`) -> cast concrete chimney caps
(`409-s-4th-chimney-cap-*`) -> finished chimney on the roofline
(`409-s-4th-chimney-finished-*`) -> masonry water table detail under the windows
(`409-s-4th-masonry-water-table-*`) -> stucco prep and application
(`409-s-4th-stucco-*`) -> interior hearth/brick surround going in for the wood
stove (`409-s-4th-hearth-*`, `409-s-4th-wood-stove-brick-surround-*`) -> finished,
installed wood stove (`409-s-4th-wood-stove-installed.jpg`,
`409-s-4th-wood-stove-lit-fire.jpg`, `409-s-4th-wood-stove-hearth-cozy.jpg`, etc.).
The remaining 20 unclaimed flatwork/footing/sidewalk/driveway photos were named
generically as general concrete work, no client prefix (`concrete-driveway-*`,
`concrete-sidewalk-*`, `concrete-footing-form-rebar.jpg`,
`concrete-foundation-stem-wall-form.jpg`, `concrete-decorative-scored-*`, etc.)
since these are just examples of cement work, not individually identified jobs.
The timber-frame barn sequence (13 photos: joinery/shaping shots, framing
progress, finished barn exterior, plus two barn concrete-floor-pour photos that
shared the same barn) was moved to `Other` with generic `timber-frame-*` names,
unprefixed since there's no project name for it yet. IMG_0584 was excluded
entirely (not processed, not delivered — a personal joke photo, not for the site).
Status: **complete**, wired into the portfolio page (2026-08-27 re-stylization).

---

## Sunset Bench (folder renamed from the client's surname -- Sunset Bench is the road name)

**Owner's notes:** New custom shabby chic build on Sunset Bench road. Most of the
wood is from Brazil -- Peroba rosa, Peroba decompo (spelling unconfirmed). Built a
small guest cabin first, then a full house. All wood is reclaimed, ~200 years old,
cut by hand in a saw pit (not circular/band saw) and brushed to keep that look.
Most hardware is also old/reclaimed. The 5 "PHOTO-2026-05-15-..." images are
realtor photos -- the owner has since sold and moved -- and are marked as hero
shots.

**Claude's notes (2026-08-27):** Done -- all 113 photos processed and renamed with
the `sunset-bench-` prefix. Two build phases confirmed by EXIF date:
2015-2016 = guest cabin (`sunset-bench-cabin-*`: truss raising, reclaimed flooring,
finished exterior with rust-metal roof). 2017-2018+ = the main house
(`sunset-bench-house-*`: framing, dark board-and-batten siding, tons of
beam/hardware/corbel detail shots, custom trestle table + the actual Sunset Bench
built in the shop, finished exterior, and 5 twilight/kitchen realtor photos marked
`sunset-bench-house-hero-*`). IMG_4201 was a mid-house-build revisit of the cabin,
not a new structure. IMG_4404/4405 are the new house's porch. The handcrafted
bench (originally `665D016F-...`) is the literal Sunset Bench itself and is named
`sunset-bench-house-hero-handcrafted-bench.jpg`. Folder renamed to `Sunset-Bench`
in assets/images. NOTE: the *source* folder under `Website Photos\` still uses the
original client-surname folder name (permission denied on renaming that device
path) -- check the `Website Photos` folder listing directly if a future session
goes looking for it and doesn't find a matching name.
Status: **complete**, wired into the portfolio page (2026-08-27 re-stylization).

---

## Tile

Two separate stories share this folder, distinguished by filename prefix:
`tile-remodel-*` (2024 bathroom remodel) and `tile-upgrade-*` (2026 kitchen floor
redo).

**Owner's notes:** tile_upgrade -- the customer wanted it redone because the other
contractor didn't have very straight grout lines and it bothered him. The other
tile job (plain "tile") was a remodel.

**Claude's notes (2026-08-27):** Done -- 32 photos total processed. `tile-remodel-`
(14 photos, EXIF March-May 2024): full bathroom remodel start to finish -- old
wood-lath wall and tub demo -> debris cleared -> cement board/waterproofing
membrane going up around the tub -> a black-and-white mosaic accent panel and hex
floor tile with a Greek-key border going in -> white subway tile on the walls ->
finished bathroom with fixtures, and a close-up of the finished mosaic floor
pattern. `tile-upgrade-` (18 photos, EXIF June 2026, tight ~10-day window): a
kitchen floor tear-out and redo -- old tile demo'd and cleared -> subfloor exposed
-> orange uncoupling membrane (Ditra-style) installed -> new tile set over the
membrane room by room -> two closeups of a laser level line snapped across the
threshold/transition strip, checking the new install for straightness (nice tie-in
to why this job existed) -> finished tile floor and kitchen, including the
countertop and two full-kitchen wide shots. 12 .MOV live-photo videos in the
tile_upgrade source folder were skipped, stills only, per established convention.
No renames needed -- both source folders (`tile`, `tile_upgrade`) already matched
what was needed; everything landed in the existing `Tile` destination folder.
Status: **complete**, wired into the portfolio page (2026-08-27 re-stylization).

---

## Other

**Owner's notes:** Catch-all folder for photos that don't fit a specific project
category.

**Claude's notes (2026-08-27):** Added 13 photos here from the Masonry batch — a
timber-frame barn build confirmed not to belong in Masonry. Sequence:
joinery/brace shaping on sawhorses, gable/entry framing going up, brace and eave
joint details, finished barn exterior, and two photos of the barn's concrete floor
being poured/finished (same barn, so grouped with the rest). Named generically as
`timber-frame-*` with no client prefix since there's no project name for this one
yet — ask the owner if they want to identify/rename this job later.

---

## Site Content Ideas

Draft copy/content for later use on the site (not wired in anywhere yet).

### Fun fact: The Three-Centered Arch

Used on the "Three Centered Arch Porch" project (Hamilton, MT).

> That graceful, flattened arch over the porch isn't a simple semicircle -- it's
> a three-centered arch, sometimes called a "basket-handle arch" for its
> resemblance to the curve of a woven basket handle. Instead of one radius, it's
> built from three separate circular arcs (a wide, shallow one in the middle and
> two tighter ones at the springs) that blend together smoothly. Architects have
> leaned on this trick since the Renaissance because it gets you the elegant,
> low-profile curve of an ellipse using nothing but a compass and straightedge --
> no need to draw a true ellipse, which is far harder to lay out by hand. It
> became a signature of Federal and Georgian doorways and windows in early
> American architecture, which is part of why it still feels so at home on a
> historic Montana porch. Getting the arcs to actually meet tangent to each
> other -- no visible kink where one curve hands off to the next -- takes the
> same kind of trig you'd use to fit a smooth curved eave return into a sloped
> roofline: similar triangles, a little Pythagorean-triple cleverness, and a
> steady hand with the story pole.

**Claude's notes (2026-08-27):** The radius for a curved eave/soffit return
tangent to a 9/12 roof pitch was worked out by hand (photo of the derivation is
in the chat, not saved as a file yet) -- verified the math end to end, no errors.
Could be worth a short "how we build this stuff" blog post pairing that
derivation with the three-centered arch drawing (dated 2025-08-05, sheet A-06)
and the finished eave photo. Ask the owner if they want that written up as a
full post later.
