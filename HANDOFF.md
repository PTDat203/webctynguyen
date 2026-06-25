# IBS Holdings Website — Handoff / Project Notes

> **Đọc nhanh (VI):** Đây là website một-trang giới thiệu công ty **IBS** (ngành triển lãm / sự kiện), làm bằng **Astro + Tailwind**, đã deploy demo ở **https://ibsmaster-demo.web.app** và đẩy code lên **https://github.com/PTDat203/webctynguyen**. File này tóm tắt mọi thứ đã làm cho AI/developer tiếp theo.

This document is the source of truth for the project state as of the handoff. Written for the next AI agent or developer.

---

## 1. What this project is

A **single-page marketing website** for **CÔNG TY TNHH KINH DOANH DỊCH VỤ QUỐC TẾ IBS** (English: *IBS Holdings – International Business Services Co., Ltd.*), a Vietnamese **exhibition / trade-fair / event** company.

- All site copy was extracted from the source brochure **`IBS HỒ SƠ NĂNG LỰC.pdf`** (13 pages, Canva export) which lives in the repo root.
- Design reference requested by the client: **rims.com.cn** (same industry) → a **one-page vertical-scroll** site.
- Aesthetic direction (client): **minimal / Rolex-like** — few words, big imagery, generous whitespace, sharp corners.
- Primary language **Vietnamese**; English is scaffolded for later (not built).

---

## 2. Tech stack

| Item | Value |
|---|---|
| Framework | **Astro 7.0.2** (static output) |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` (NOT the old `@astrojs/tailwind`) — tokens defined in CSS with `@theme` |
| Fonts | self-hosted `@fontsource/be-vietnam-pro` (display) + `@fontsource/inter` (body) |
| Sitemap | `@astrojs/sitemap` |
| Types | TypeScript strict + `@astrojs/check` |
| Interactivity | **vanilla `<script>` in components** — NO React/Preact, near-zero JS |
| Runtime | Node v24.14.1, npm 11.11.0 (Windows 11) |

**Commands:**
```bash
npm install
npm run dev      # Astro 7 runs the dev server as a DAEMON → prints "http://localhost:4321 (pid ...)"
                 #   stop:   npx astro dev stop
                 #   status: npx astro dev status
npm run build    # → dist/  (also generates sitemap-index.xml; optimizes images to WebP)
npm run preview
npm run check    # astro check — currently 0 errors / 0 warnings
```

---

## 3. Decisions already locked with the client

1. **Astro + Tailwind** (not WordPress/Next).
2. **One single long-scrolling page** with anchor nav (Trang chủ / Giới thiệu / Dịch vụ / Dự án / Liên hệ). Not multi-page.
3. **Vietnamese first**, English later (i18n scaffold in `astro.config.mjs`: `defaultLocale: 'vi'`, `prefixDefaultLocale: false`, EN reserved at `/en`).
4. **Minimal aesthetic** (few words; service bullet-lists were intentionally dropped from the homepage).
5. **Color palette = brand blue (from the IBS logo) + warm gold.**
6. **Real IBS logo** used in header + footer + favicon.
7. **Images are temporary** — currently free Pexels demo photos. The client **will provide original Canva / HD photos** to swap in.

---

## 4. Design system — `src/styles/global.css`

Tokens are declared in `@theme {}` (Tailwind v4), so utilities like `bg-navy`, `text-gold` are auto-generated.

| Token | Hex | Use |
|---|---|---|
| `navy` | `#0c3a75` | dark sections (footer, ribbon, why-IBS, contact), headings |
| `indigo` | `#1a5ba6` | gradients |
| `sky` | `#2e86d6` | bright blue accent / focus ring |
| `skylight` | `#80bbdf` | light blue |
| `gold` | `#e0a82e` | primary accent: CTAs, overlines, slogan |
| `amber` | `#f2c94c` | gold hover / highlight |
| `ink` `#15181e`, `slate` `#5b6472`, `mist` `#e6e9ef`, `paper` `#f6f8fb` | neutrals |

- Fonts: `--font-display` = Be Vietnam Pro, `--font-sans` = Inter.
- **Heading `line-height: 1.25`** — important for Vietnamese stacked diacritics (Ễ, Ã, Ệ) so they don't overlap. Do NOT tighten below ~1.2.
- Reusable classes: `.container-ibs` (max-w 1240px), `.overline` (gold uppercase label), `.btn` / `.btn-primary` (gold) / `.btn-outline` (white border) / `.btn-outline-navy`, `.link-arrow` (uppercase + arrow), `.reveal` (scroll-in fade/slide).
- `prefers-reduced-motion` disables animations globally.

---

## 5. Project structure

```
astro.config.mjs        # site=https://ibsmaster.com, i18n (vi default), sitemap, tailwind vite plugin
firebase.json           # Firebase Hosting config (public: "dist", cleanUrls, cache headers)
.firebaserc             # default project: ibsmaster-demo
package.json
tsconfig.json           # extends astro/tsconfigs/strict
IBS HỒ SƠ NĂNG LỰC.pdf  # source content brochure (committed)
HANDOFF.md              # this file

public/
  favicon.png           # cropped from the real logo (icon + IBS)
  favicon.svg           # old placeholder (no longer linked)
  robots.txt            # references sitemap

src/
  pages/
    index.astro         # THE single page — composes all sections in order
    404.astro
  layouts/
    BaseLayout.astro    # <html> shell, <Seo>, <Header>, <Footer>, BACK-TO-TOP button + script, reveal-on-scroll script
  components/
    Header.astro        # light/white sticky header, real logo, anchor nav, scrollspy, mobile drawer, hotline, "Nhận tư vấn" CTA
    Footer.astro        # navy footer, logo in a white badge, services/links/contact columns
    Hero.astro          # full-bleed image bg + navy overlay, overline, H1 (gold "TRIỂN LÃM"), subline, 2 CTAs, scroll chevron
    RibbonSlogan.astro  # navy band, gold slogan "CHI PHÍ TỐI THIỂU · HIỆU QUẢ TỐI ĐA"
    About.astro         # intro paragraph + 3 cards (Tầm nhìn / Sứ mệnh / Giá trị cốt lõi) + image + "ONE STOP" badge
    StatsBar.astro      # navy band, 4 animated count-up stats (PLACEHOLDER numbers)
    Services.astro      # 3-column CARD GRID of the 5 services (image + number + icon + title + tagline + "Tìm hiểu thêm")
    WhyIBS.astro        # navy band, 4 value props (Chi phí tối thiểu / Hiệu quả tối đa / Trọn gói / Đông Nam Á)
    Projects.astro      # white section, filter tabs + image grid + click-to-open LIGHTBOX
    Contact.astro       # navy section, contact info + Google Maps iframe + Web3Forms form
    SectionHeader.astro # shared: overline + h2 + gold divider + intro
    Icon.astro          # inline SVG line-icon set, used as <Icon name="..." />
    Seo.astro           # <title>/meta/OG/canonical + JSON-LD LocalBusiness
    TopBar.astro        # ⚠ UNUSED (removed from layout) — safe to delete
    LogoWall.astro      # ⚠ UNUSED (removed from page) — partner-logo grid placeholder, re-add when real logos exist
  data/
    site.ts             # ALL copy & data (company, nav, values, stats, services, whyIbs, processSteps, projects)
    images.ts           # imports src/assets images → serviceImages (by Service.id) + projectImages (by Project.title) + heroImage + aboutImage
  styles/
    global.css          # Tailwind v4 import + @theme tokens + base + component classes
  assets/
    hero.jpg about.jpg service-*.jpg proj-*.jpg   # 15 Pexels DEMO images (royalty-free)
    logo-ibs.png        # horizontal logo lockup used in header + footer
    logo-ibs-stacked.png
    logo/               # ORIGINAL client logo files (FullLogo_NoBuffer.png, "Ngang tách nền .png", etc.) — all blue-on-transparent
```

**Page order in `index.astro`:** Hero → RibbonSlogan → About → StatsBar → Services → WhyIBS → Projects → Contact (Header & Footer come from BaseLayout).

---

## 6. Content & data — everything is in `src/data/site.ts`

Edit copy there, not in components. Key facts baked in:

- `company.tagline = "Triển lãm thương hiệu"` (client changed this from "hàng hiệu" → "thương hiệu").
- Brand marks: `IBS`, `"ONE STOP SERVICES"`, slogan `CHI PHÍ TỐI THIỂU · HIỆU QUẢ TỐI ĐA`.
- Address: **41A Lý Thái Tổ, phường Hoàn Kiếm, TP. Hà Nội**.
- Hotline: **+84 833 588 169** (Phòng Thương hiệu). `company.email` is **empty** (gap).
- Website/domain: **ibsmaster.com**. Facebook URL is set.
- **5 services** (each has `id, no, icon, title, tagline, points[]`). NOTE: the `points[]` arrays are **no longer rendered** on the homepage (minimal direction) — only `tagline` shows. They're kept for future detail pages.
- **8 projects** (title + category: Concert / Hội nghị / Triển lãm / B2B): Đông Fest, Những thành phố mơ màng, Concert "Sao nhập ngũ", Diễn đàn doanh nghiệp, Hội thảo chuyên biệt, Hội nghị xúc tiến thương mại, Lễ ra mắt sản phẩm, Gian hàng triển lãm.
- **`stats[]` numbers are PLACEHOLDERS** (10+ years, 200+ projects, 50,000+ m², 300+ partners) — replace with real figures.

---

## 7. Images

- 15 demo images are from **Pexels** (free, commercial-use OK, no attribution required), downloaded into `src/assets/`.
- They are wired through **`src/data/images.ts`**:
  - `serviceImages` keyed by **`Service.id`** (e.g. `'thi-cong-gian-hang'`).
  - `projectImages` keyed by **`Project.title`** (exact string match — keep keys in sync with `site.ts`).
- Astro `<Image>` auto-optimizes them to responsive WebP at build.
- **To swap in the client's real photos:** drop new files into `src/assets/` and either reuse the same filenames or update the imports in `images.ts`. (Client said they have original Canva / HD assets.)
- **Logo:** originals in `src/assets/logo/` are all blue-on-transparent (no white version). `logo-ibs.png` (horizontal lockup) is used in the header (on white) and footer (inside a white badge, because blue logo on dark needs a light backing). `public/favicon.png` was cropped from `FullLogo_NoBuffer.png`.

---

## 8. Interactivity (all vanilla JS, in component `<script>` blocks)

- **Header:** shadow on scroll, mobile hamburger drawer, scrollspy (gold underline on active section).
- **StatsBar:** IntersectionObserver count-up.
- **Projects:** category filter tabs + lightbox (open on card click, close on ✕ / backdrop / Esc).
- **BaseLayout:** **back-to-top** button (appears after 400px scroll, smooth-scrolls to top) + reveal-on-scroll observer adding `.is-visible` to `.reveal` elements.
- **Page loader:** stays visible for at least 1.5 seconds and then waits longer if the page load is still in progress.
- All guard `prefers-reduced-motion`.

---

## 9. Deployment

- **Firebase Hosting**, project **`ibsmaster-demo`** (created via CLI under Google account **phamtiendatynym.2003@gmail.com**; intentionally separate from the user's other Firebase apps).
- **Live demo:** **https://ibsmaster-demo.web.app** (also `https://ibsmaster-demo.firebaseapp.com`).
- Config: `firebase.json` (`public: "dist"`) + `.firebaserc` (default project).
- **Redeploy:**
  ```bash
  npm run build
  firebase deploy --only hosting
  ```
- Firebase CLI v15.20.0 is installed globally and logged in. `gh` CLI is NOT installed.
- **Long-term:** connect the real domain **ibsmaster.com** (not done). Cloudflare Pages is an alternative host that was discussed.

---

## 10. Git

- Remote: **https://github.com/PTDat203/webctynguyen** — branch **`main`** (initial commit pushed, 58 files).
- `.gitignore` excludes: `node_modules/`, `dist/`, `.firebase/`, `.astro/`, `.claude/settings.local.json`.
- Git identity on this machine: `PTDat203` / `140678628+PTDat203@users.noreply.github.com`. HTTPS push works via cached Git Credential Manager.

---

## 11. OUTSTANDING TODOs / content gaps (what the next agent should do)

| # | Item | Where |
|---|---|---|
| 1 | **Swap demo images → real IBS Canva/HD photos** | `src/assets/` (keep filenames) |
| 2 | **Contact form is NOT functional** — set a real **Web3Forms access key** (replace `YOUR_WEB3FORMS_ACCESS_KEY`) and ideally add AJAX so it shows an inline success message instead of navigating to a JSON page | `src/components/Contact.astro` |
| 3 | **Real stat numbers** (currently placeholders) | `src/data/site.ts` → `stats` |
| 4 | **Company email** (empty) — needed for footer/contact + JSON-LD | `src/data/site.ts` → `company.email`, then `Seo.astro` |
| 5 | **OG share image** — `Seo.astro` points to `/og/ibs-og.jpg` which does not exist; add a 1200×630 image to `public/og/` | `public/og/`, `src/components/Seo.astro` |
| 6 | **Partner/client logos** — `LogoWall.astro` exists but is removed from the page; re-add with real logos | `src/components/LogoWall.astro`, `index.astro` |
| 7 | **English version** — i18n is scaffolded but not built (`/en` route, `ui.ts` dictionary, language toggle) | `astro.config.mjs` (already set), new `src/i18n/` + EN content |
| 8 | **Connect domain ibsmaster.com** to Firebase (or move to Cloudflare Pages) | Firebase console / DNS |
| 9 | Optional: Team section, "Hội viên IBS" membership details (no content yet) | — |

---

## 12. Known quirks / gotchas

- **Astro 7 dev server is a daemon** — `npm run dev` returns immediately with a pid; use `npx astro dev stop` / `npx astro dev status`.
- **Tailwind v4** — no `tailwind.config.js`; colors/fonts are in `global.css` `@theme`. Adding a color token there auto-creates `bg-*`/`text-*` utilities.
- **Vietnamese diacritics + tight line-height = overlapping glyphs.** Keep heading `line-height ≥ 1.2`. Use `whitespace-nowrap` to keep phrases like "TRIỂN LÃM" on one line (see Hero.astro).
- `TopBar.astro` and `LogoWall.astro` are **unused** (not imported). Delete or repurpose.
- The source PDF is a flattened Canva export; its text was recovered with a one-off custom Python ToUnicode parser (poppler/pdf libs are not installed on this machine). That script is not in the repo — the extracted copy already lives in `site.ts`.
- `.claude/settings.local.json` holds local permission allowlist (gitignored) — not part of the app.

---

## 13. Chronological summary of work done

1. Analyzed the PDF (extracted all 13 pages of Vietnamese copy) and the rims.com.cn reference; wrote a plan.
2. Scaffolded Astro + Tailwind v4 project; built design system + layout shell.
3. Built the full one-page site (all sections) with SEO (JSON-LD, sitemap, robots) and vanilla-JS interactivity.
4. Deployed to Firebase Hosting (`ibsmaster-demo`).
5. Sourced + integrated 15 royalty-free Pexels images (optimized to WebP).
6. **Redesign pass:** switched palette to brand **blue + gold**, added the **real logo** (header/footer/favicon), removed the top bar, made it more minimal/Rolex-like, converted services to a card grid, slimmed copy, removed the placeholder logo wall.
7. Hero polish: visible overline, `"TRIỂN LÃM"` uppercase+gold kept on one line, fixed Vietnamese line-height overlap, changed tagline to "Triển lãm thương hiệu".
8. Slogan ribbon: made it a navy band with gold text (reduced the amount of yellow per client feedback).
9. Added a **back-to-top** button.
10. Added a generous permission allowlist in `.claude/settings.local.json`.
11. (Abandoned) a hero background video — client decided not to; **no video code was added**.
12. Initialized git, committed, pushed to **github.com/PTDat203/webctynguyen**.
