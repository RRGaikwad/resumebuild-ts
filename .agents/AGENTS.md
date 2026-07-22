# Resume Builder PWA - AI Agent Context

## Project Architecture & Tech Stack
- **Framework:** React 19, Vite, TypeScript
- **Styling:** Tailwind CSS v4, `tailwind-merge`, `clsx`
- **State Management:** `zustand`
- **Routing:** `react-router-dom`
- **PWA Integration:** `vite-plugin-pwa` with `registerType: 'autoUpdate'`. Service worker handles offline functionality.

## Design System (Linear / Framer / Apple HIG Quality)

### Color Palette (STRICT — do NOT deviate)
| Token | Hex |
|---|---|
| Background | `#F8FAFC` |
| Sidebar | `#0F172A` |
| Cards | `#FFFFFF` |
| Primary | `#2563EB` |
| Primary Hover | `#1D4ED8` |
| Border | `#E5E7EB` |
| Text Primary | `#111827` |
| Text Secondary | `#6B7280` |
| Text Muted | `#9CA3AF` |
| Success | `#16A34A` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |

### Typography (Inter font — always use explicit pixel sizes)
| Usage | Size | Weight |
|---|---|---|
| Page Heading | 40px | 700 |
| Section Title | 18px | 600 |
| Body | 15px | 400 |
| Small / Labels | 13px | 500 |
| Micro | 12px | 600 (uppercase + 1px letter-spacing for section labels) |

### Spacing System (8px grid — strict)
- Section gap: `gap-[32px]` / `space-y-8`
- Card internal padding: `p-[24px]`
- Card gap: `gap-[24px]`
- Content max-width: `max-w-[1320px]`
- Sidebar width: `w-[260px]`
- Top Navigation height: `h-[72px]`

### Component Classes
- **Cards:** Use `.saas-card` class (`bg-white rounded-[20px] border border-[#E5E7EB] p-[24px] shadow-sm`). Add `.saas-card-hover` for interactive cards.
- **Buttons:** Use `.premium-btn-primary` (44px height, `#2563EB` bg, 12px radius) or `.premium-btn-secondary`.
- **NO glassmorphism, NO neumorphism, NO thick borders, NO unnecessary gradients.**
- **Cards should feel floating** — very subtle shadow only.

### Animation Rules
- Card hover: `hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(17,24,39,0.06)]`
- Button hover: `hover:scale-[1.02]`
- All transitions: `duration-200 ease-in-out`

## Layout Architecture

### AppShell (`src/components/Layout/AppShell.tsx`)
- **Desktop:** Dark navy sidebar (260px) + white top header (72px) + scrollable main content (max-w-[1320px]).
- **Mobile:** Top header + scrollable content + fixed `BottomNav` (hidden on `md` breakpoint).
- **Sidebar active state:** `bg-[#2563EB] text-white rounded-[16px]`.
- **Sidebar inactive:** `text-white hover:bg-white/10 rounded-[16px]`.
- **Section labels:** `text-[12px] uppercase tracking-[1px] text-[#6B7280]`.
- **Header:** Contains dynamic PWA "Install App" button (via `beforeinstallprompt`), interactive Notifications dropdown, functional Global Search with dropdown overlay, and a clickable user avatar that opens `AccountModal`.
- **Navigation:** Unified single-flow form approach. Separate sidebar links for Personal Info, Experience, Education, and Skills have been removed. User navigates through `/templates` ➔ `/form` (Unified Editor) ➔ `/preview`.

### Dashboard (`/` route → `src/pages/Dashboard.tsx`)
- Hero greeting (40px bold), subtitle (18px semibold muted).
- 4 `StatCard` components in a grid (`h-[130px]` each).
- 2-column grid below: left = My Resumes + Recommended Tools; right = Resume Strength + Recent Activity.
- Resume rows are `h-[72px]` each inside `ResumeListItem.tsx`.

### Routes & Flow
| Path | Component | Purpose |
|---|---|---|
| `/auth` | `AuthPage.tsx` | Premium auth screen with Google + Email options |
| `/` | `Dashboard.tsx` | Main hub with stats, recent resumes, and live Firebase sync |
| `/templates` | `TemplateSelection.tsx` | Entry point for creation. Shows available templates (e.g., ATS Professional) |
| `/form` | `FormPage.tsx` | Unified multi-step editor. Replaces separate sidebar routing. |
| `/preview` | `PreviewPage.tsx` | Final review and export functionality (handles html2canvas/jsPDF directly without modals to prevent rendering bugs) |

## Workflow Rules
- Any changes to `index.html` or `vite.config.ts` must maintain PWA compatibility.
- New pages must be integrated into the `AppShell` layout.
- **Always** update this file after making significant architectural or design system changes.
- Prioritize mobile-first responsiveness (BottomNav on mobile, sidebar on `md+`).
- Run `npm run build` to verify no TypeScript or Vite errors after major changes.

## Recent Fixes
- **Search Bar**: Updated Global Search in `AppShell.tsx` to dynamically filter search options (pages, templates, editors) based on the user's query. Filtering uses case-insensitive matching on both the title and the result type label.
- **Export Functionality (PDF & JPG) — Root Cause Fix**: The original `html2canvas` exports failed silently because:
  1. `ATSProfessionalTemplate.tsx` used **`react-icons` SVG components** (`FiMail`, `FiPhone`, etc.) — `html2canvas` cannot render SVG elements and silently skips them, corrupting the canvas.
  2. The Google Fonts `@import` in `index.css` is loaded externally — `html2canvas` cannot resolve external fonts.
  - **Fix applied to `ATSProfessionalTemplate.tsx`**: Removed all `react-icons` imports. Replaced with plain **Unicode text characters** (✉, ✆, ⊙, etc.) and converted all styles to **inline `style={{}}` props** (no Tailwind classes) so `html2canvas` can read them directly.
  - **Fix applied to `PreviewPage.tsx`**: The element is **cloned offscreen** into a fixed wrapper appended to `document.body` before capture, ensuring no scroll clipping or layout instability affects the canvas. The download link is also explicitly appended/removed from `document.body` to guarantee the browser triggers the download. Multi-page PDF support added — resumes taller than A4 are sliced into multiple pages automatically.

## Architecture Rules (Anti-Regression)
- **NEVER use `react-icons` SVG components inside any resume template** — they break `html2canvas` export. Use Unicode characters or text only.
- **NEVER use Tailwind CSS classes for layout inside resume templates** — use `style={{}}` inline styles so `html2canvas` can read computed values.
- **Always test PDF + JPG export after any changes to a template component.**

