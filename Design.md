# DESIGN.md — REdesign Interior & Build (Design System & Agent Instructions)

## 1. Project Overview & References
- **Project Name:** REdesign Interior & Build (Company Profile & Interactive Spatial Experience)
- **Primary Aesthetic & Motion Reference:** `https://www.era-residence.com/` (by Thefirstthelast — warm Mediterranean/contemporary architectural editorial, "by day / by night" lighting toggle, large typographic metrics, drag-to-explore panoramic canvas, and pinned narrative scroll).
- **Secondary Interactive Reference:** `https://www.3d-discovery.fr/en` (contextual spatial hotspots and room-level material specification inspection).

---

## 2. Brand DNA & Three-Layer Design Tokens
Encoded CSS variables for `:root`:
- `--bg-parchment`: `#F2ECE4` (Primary Warm Editorial Bone/Parchment canvas — matches ERA Residence sunlit stone feel)
- `--bg-alabaster`: `#FAF7F2` (Elevated surface / card inner core)
- `--bg-navy`: `#1E2638` (Deep Architectural Navy — used for high-contrast architectural chapters and night-mode ambiance transitions)
- `--text-ink`: `#181E29` (Deep Carbon Navy — primary typography on light surfaces, never `#000000`)
- `--text-muted`: `#5C5A54` (Warm Stone Gray — body copy, max 65ch, `leading-relaxed`)
- `--text-bone`: `#F2ECE4` (Primary text on Deep Navy sections)
- `--accent-gold`: `#E5B85B` (Warm Ochre Sun Disc — SINGLE brand accent `< 80%` saturation. Used for signature offset circles behind main headings, active lighting toggles, and spatial hotspot pins)
- `--border-subtle`: `rgba(30, 38, 56, 0.12)` (Light mode hairline) / `rgba(242, 236, 228, 0.12)` (Dark mode hairline)

---

## 3. Typographic System
- **Editorial Display (H1, H2, Pull Quotes):** `Instrument Serif`, `Playfair Display`, or `Cormorant Garamond` (tight tracking `-0.03em`, line-height `1.02`, mixing regular and italic words like ERA Residence: *"A space by day / by night to return to"*).
- **Structural Sans (Body & UI):** `Plus Jakarta Sans` or `Satoshi` (`Inter`, `Roboto`, and `Arial` are STRICTLY BANNED).
- **Architectural Telemetry (`@industrial-brutalist-ui`):** `JetBrains Mono` (`11px`, uppercase, `tracking-[0.08em]`) used strictly for architectural index numbers (`01`, `02`), floor area dimensions (`48 — 120 m²`), and material specification codes.

---

## 4. Section-by-Section Architecture (AIDA + ERA Residence Flow)
Wrap page in `<main className="overflow-x-hidden w-full max-w-full bg-[var(--bg-parchment)] text-[var(--text-ink)]">` with `py-32 md:py-48` macro-whitespace between chapters.

### [Navigation] ERA-Style Minimalist Split Header & Slide-Over Drawer
- Top bar (`fixed top-0 inset-x-0 z-40 px-6 md:px-12 py-6 flex items-center justify-between`):
  - Left: Minimalist `"Menu"` trigger button + architectural floorplan square SVG icon.
  - Center: **REdesign** (*Interior & Build*) signature gold/navy typographic emblem.
  - Right: `"Explore Spaces"` quick-jump button + `"Book a Call"` primary pill CTA (Button-in-Button architecture with nested circular `ArrowUpRight` icon).
- Clicking `"Menu"` opens a smooth full-height glassmorphic/navy architectural drawer (`#1E2638`) with staggered link reveals and studio contact details.

### [Section 1 — ATTENTION] Hero with Interactive "By Day / By Night" Ambience Switcher
- **Viewport:** `min-h-[100dvh]` (never `h-screen`).
- **Headline (2–3 Line Iron Rule, `max-w-6xl`):** Large editorial serif with inline pill-shaped micro-imagery and ERA-style italic contrast: *"Spaces crafted [inline-pill-image] for living — by day and by night."*
- **Interactive "By Day / By Night" Toggle:** Tactile pill switcher (`[ By Day ☀ ]` / `[ By Night ☾ ]`) that smoothly crossfades the hero architectural interior canvas between sunlit open-plan living and warm cove-lit evening ambiance.
- **Contextual 3D Discovery Pins:** 3 subtle gold (`#E5B85B`) `+` hotspot nodes revealing bespoke furniture and material specs on click.

### [Section 2 — INTEREST] "Three Reasons to Choose REdesign" (GSAP Pinned Narrative)
- Left side pins the editorial heading with the signature offset Warm Ochre Gold circle (`#E5B85B`) behind the title; right side scrolls through 3 monumental cards with exact Company Profile Milestone copy:
  1. **`01` — 10 Years of Craftsmanship:** *"With a decade of dedication, REdesign Interior & Build has established itself as a leader in custom furniture, blending creativity with precision to meet the unique needs of each client."*
  2. **`02` — Trusted by Renowned Brands:** *"We are proud to have partnered with top-tier clients, including 'Duck King Group' and 'Tomoro Coffee', delivering bespoke furniture solutions that elevate their spaces and enhance customer experiences."*
  3. **`03` — Innovative Designs, Superior Quality:** *"Our passion for craftsmanship and attention to detail has allowed us to consistently push the boundaries of interior design and furniture making, ensuring that every piece reflects our commitment to excellence."*

### [Section 3 — INTEREST] About & Our 4 Core Expertise Pillars (Deep Navy Chapter)
- **Theme Shift:** Full-bleed Deep Architectural Navy (`#1E2638`) with `#F2ECE4` bone text.
- **Editorial Intro:** *"At REdesign Interior & Build, we bring ideas to life with innovative interior design and build solutions. Our commitment to quality and customer satisfaction drives us to deliver exceptional results in every project. Whether residential or commercial, we transform spaces to enhance functionality and aesthetic appeal."*
- **4 Core Expertise Pillars:** *Design Consultation*, *Interior Designing*, *Custom Furniture & Build*, *Repair & Maintenance*.

### [Section 4 — DESIRE] "Drag to Explore" Spatial Typologies & Project Specs
- Horizontal draggable showcase + specification comparator for 3 signature project typologies:
  1. *Private Residences & Living Spaces* (`Scope: Full Turnkey | Area: 85 — 240 m²`).
  2. *Commercial & Hospitality Flagships* (`Clients: Duck King Group, Tomoro Coffee`).
  3. *Executive Studies & Master Suites* (`Scope: Custom Joinery & Soft Furnishing`).

### [Section 5 — DESIRE] Our 8 Specialized Services (Interactive Studio Matrix + Gapless Bento)
- Gapless Bento Grid (`grid-flow-dense`, `md:grid-cols-12`) covering all **8 Official Services**:
  1. *Custom Furniture* (`md:col-span-6 md:row-span-2`)
  2. *Civil Work* (`md:col-span-6`)
  3. *Wall Decor* (`md:col-span-3`)
  4. *Ceiling Solutions* (`md:col-span-3`)
  5. *Flooring* (`md:col-span-4`)
  6. *Lighting* (`md:col-span-4`)
  7. *Fabric & Upholstery* (`md:col-span-4`)
  8. *Blinds & Window Treatments* (`md:col-span-12`)

### [Section 6 — DESIRE] "Crafted to Endure" — Materiality & Hardware Specifications
- Interactive **Material & Finish Spec Sheet** toggling between *Natural Timber & Veneers*, *Architectural Stone & Flooring*, *Recessed Cove Lighting*, and *Custom Upholstery Fabrics* with blueprint micro-telemetry.

### [Section 7 — ACTION] "Let's Work Together!" — Consultation Booking & Studio Location
- **Header:** Editorial serif **"LET'S WORK TOGETHER !"** with Warm Ochre Gold circle motif.
- **Official Studio Credentials:**
  - **Phone / WhatsApp:** `+628 21-383-383-56`
  - **Email:** `main.redesign@gmail.com`
  - **Workshop & Office:** `Ruko Maggiore Grande Blok H56, Gading Serpong, Pagedangan, Kab. Tangerang, Banten 15332`
- **ERA-Style "Book a Call" Interactive Form:** Inputs for Name, Email, Phone, Project Category, Area (`m²`), and Message with full interactive loading/success state cycle.
- **Right Side:** Asymmetric 4-photo architectural mosaic with hover zoom physics.

---

## 5. Negative Constraints (Anti-Slop & Guardrails)
- **NO EMOJIS** anywhere in code, markup, or UI elements. Use `@phosphor-icons/react` with consistent stroke width.
- **NO PURE BLACK (`#000000`)** and **NO neon purple/blue AI glow shadows**.
- **NO generic 3-column equal card layouts** without architectural asymmetry.
- **Reduced Motion Safety:** Gate all GSAP ScrollTrigger pinning/scrubbing inside `gsap.matchMedia()` respecting `(prefers-reduced-motion: no-preference)`.
- **Mobile Responsiveness:** Strict single-column collapse on viewports `< 768px` with zero horizontal overflow (`overflow-x-hidden`).