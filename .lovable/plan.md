## Rebrand to WhatsReply — WhatsApp AI Auto-Reply

A complete visual + copy rebrand. The workflow (extension → AI drafts replies → review/auto-send → dashboard with flagged items, usage, pairing) stays identical. Only the surface changes.

---

### 1. Design system overhaul (WhatsApp-inspired green)

**`src/index.css`** — replace the multi-color brand palette with a focused WhatsApp-inspired green system:
- `--primary`: WhatsApp green `142 70% 45%` (≈ #25D366)
- `--accent`: deep teal-green `170 75% 35%` (≈ #128C7E, classic WhatsApp dark green)
- Light, friendly background (keep light mode), softer neutrals with a slight green tint
- Replace `--hero-gradient` with a green→teal→emerald sweep
- Replace `--color-red/blue/yellow/green` brand tokens with semantic ones: `--chat-bubble-out` (#DCF8C6 light green), `--chat-bubble-in` (white), `--chat-bg` (warm cream/beige like WhatsApp wallpaper), `--check-blue` (read receipt blue #34B7F1)
- Add chat-themed utility: `.chat-bubble-tail` (CSS pseudo-element forming the WhatsApp bubble tail)

**`tailwind.config.ts`** — update the `brand-*` color aliases to the new chat tokens (`chat-out`, `chat-in`, `chat-bg`, `check-blue`, `wa-green`, `wa-teal`). Keep keyframes; add a `bubble-pop` keyframe (scale 0.8→1 with slight overshoot) for incoming messages.

**`index.html`** — update `<title>`, meta description, OG tags from "Send Smart" / Gmail copy to "WhatsReply — AI Auto-Reply for WhatsApp".

---

### 2. New hero animation: `AnimatedChat`

Replace `src/components/landing/AnimatedInbox.tsx` with a new `AnimatedChat.tsx` (and update the import in `HeroSection.tsx`):
- WhatsApp-style chat thread on a cream/beige doodle background
- Incoming gray bubble (left, contact name + message) pops in
- "AI is typing…" indicator in WhatsApp green
- Outgoing green bubble (right) types out the AI reply with a blinking caret
- Single → double gray check → double blue check (read) animation on the outgoing bubble
- Top header strip mimics WhatsApp: avatar circle, contact name, "online" indicator
- Bottom status: "WhatsReply — Auto-replying" with green pulse dot and a counter ("X replies sent today")
- Cycles through 4 realistic WhatsApp scenarios (customer asking hours, price quote, booking, support question)

---

### 3. Copy rewrite — every Gmail/email reference becomes WhatsApp/message

**Landing page sections** (rewrite headlines, subcopy, feature labels, button text):
- `HeroSection.tsx` — headline: "Your WhatsApp replies itself. Intelligently." Badge: "WhatsApp AI Auto-Reply". CTA: "Get WhatsReply".
- `Navbar.tsx` — brand name "WhatsReply", update nav labels
- `HowItWorksSection.tsx` — steps reframed around WhatsApp Web (install extension → connect WhatsApp Web → AI drafts replies from your business context → review or auto-send)
- `ProductModesSection.tsx` — Review Mode / Auto Mode copy adapted to WhatsApp messages
- `BenefitsSection.tsx` — benefits framed around WhatsApp (24/7 customer chat, never miss a lead, multi-language, etc.)
- `InstallSection.tsx` — install instructions referring to WhatsApp Web
- `CustomizationSection.tsx` — business context tuned for chat (tone, response length, business hours auto-replies)
- `PricingSection.tsx` — replace "X emails/month" with "X messages/month"
- `FinalCTASection.tsx` — CTA copy
- `Footer.tsx` — tagline "WhatsApp AI auto-reply extension"

Swap `Mail` lucide icons for `MessageCircle` / `MessageSquare` throughout.

**Dashboard** (same components, new wording):
- `DashboardHeader.tsx`, `DashboardHero.tsx` — "WhatsReply" branding, "messages" instead of "emails"
- `FlaggedReviewSection.tsx`, `FlaggedEmailCard.tsx` — rename UI labels to "Flagged messages" (keep file names + DB schema untouched to avoid breaking the backend)
- `SendSmartUsageCard.tsx` + `useSendSmartUsage.ts` — UI labels become "WhatsReply usage" / "messages replied" (keep hook name + endpoints)
- `AccountStatusCard.tsx`, `DownloadInstallSection.tsx`, `TestingSection.tsx`, `HelpSection.tsx`, `SettingsOverview.tsx`, `UsageCard.tsx` — UI text only
- `ConnectExtension.tsx` — pairing copy mentions "WhatsApp Web extension"

**Auth** (`src/pages/Auth.tsx`) — page title, marketing copy, any "email assistant" wording → WhatsApp framing (form fields stay, including the email/password inputs themselves, since auth still uses email).

**`TopNav.tsx`** — brand text "WhatsReply".

---

### 4. What stays the same

- All routes, file names, component names, hooks, contexts
- Supabase schema, edge functions (`pair-create`, `pair-redeem`), RLS, auth flow
- Database column names (e.g. `flagged_emails` table) — only display labels change
- The extension download URL and pairing workflow
- Logo asset (`@/assets/logo.png`) — kept as-is for now; you can swap it later by uploading a new image

---

### Out of scope (ask if you want these too)

- Replacing the `logo.png` asset itself — say the word and upload a new logo
- Renaming database tables/columns (would require a migration; current names are internal only)
- Renaming the edge functions or the `useSendSmartUsage` hook (purely cosmetic; would touch many imports)

Once approved, I'll execute the full rebrand in one pass.