# Portfolio — Mateo Reyes Uribe

A single-page portfolio and résumé: a fixed profile card on the left, the
profile, expertise, experience and project sections in the middle, and social
links on the right.

It is **100% frontend**. There is no server, no database and no forms —
contact is handled with `mailto:` and `tel:` links and social profiles. All
content lives in typed data files under `src/data/`, so updating the portfolio
means editing those files and redeploying.

## Stack

| Tool | What it does |
| --- | --- |
| [Next.js 16](https://nextjs.org) (App Router) | Framework and static generation |
| [React 19](https://react.dev) | UI |
| [TypeScript](https://www.typescriptlang.org) (strict mode) | Typing for data and props |
| [Tailwind CSS 3.4](https://tailwindcss.com) | Styling, 100% utility-based |
| [Framer Motion](https://www.framer.com/motion/) | Entrance animations, modals and menu |
| [lucide-react](https://lucide.dev) | UI icons |
| [react-icons](https://react-icons.github.io/react-icons/) | Social brand logos |

> Tailwind is pinned to 3.4 on purpose. Version 4 replaces the config file with
> the `@theme` directive in CSS, and this project defines its design system in
> `tailwind.config.ts`.

## Running it locally

Requires **Node.js 20 or newer**.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint across the project |

## Folder structure

Components follow **Atomic Design**: each level is composed only of pieces from
the levels below it, so complexity grows in one direction and nothing at the
bottom depends on anything above.

```
src/
├── app/                  App Router routes
│   ├── layout.tsx        Root: language, font, hydration
│   ├── page.tsx          The portfolio page
│   ├── globals.css       Colour variables, base styles, custom utilities
│   └── probe-*/          Temporary test benches from each build phase
├── components/
│   ├── atoms/            Indivisible pieces, no business logic
│   ├── molecules/        Small combinations of atoms
│   ├── organisms/        Full sections, wired to the data
│   └── templates/        Page structure
├── data/                 All editable content, typed
├── hooks/                Reusable React logic
├── lib/                  Stateless helpers
└── types/                Shared types
```

### The levels, concretely

- **`atoms/`** — `Avatar`, `Button`, `Divider`, `Eyebrow`, `IconBadge`,
  `ProgressBar`, `SectionHeading`, `SocialIconLink` and `Tag`. They know
  nothing about the portfolio: everything arrives through props.
- **`molecules/`** — `InfoRow`, `SkillItem`, `ExtraSkillItem`, `KnowledgeCard`,
  `ExperienceItem`, `PortfolioCard`, `ProjectImage` and `Modal`. They combine
  atoms and still never import data.
- **`organisms/`** — `ProfilePanel`, `LeftSidebar`, `RightSidebar`,
  `MobileHeader`, `HeroSection`, `KnowledgeSection`, `ExperienceSection`,
  `PortfolioSection` and `Footer`. This is where `src/data/` gets read and
  where state lives (which modal is open, for instance).
- **`templates/`** — `MainLayout` places the three columns and decides what
  collapses on narrow screens.

### The other folders

- **`data/`** — `profile.ts` (personal details, languages, stack, soft skills
  and social links), `knowledge.ts`, `experience.ts` and `portfolio.ts`.
- **`hooks/`** — `useDialogBehavior`, which holds the accessible behaviour of
  every dialog: focus trapping, `Esc` to close, focus returned to whatever
  opened it, and a scroll lock on the background. Both the modal and the
  mobile menu use it.
- **`lib/`** — `utils.ts` with the `cn()` helper (`clsx` plus `tailwind-merge`),
  `icons.ts` with the explicit icon registry, and `motion.ts` with the shared
  animation variants.
- **`types/`** — the shape of the data. Add a field here and TypeScript will
  tell you exactly which files under `src/data/` need updating.

## Design system

The direction is **editorial**: light background, strong typographic
hierarchy, numbered section labels in small caps and generous spacing.

The palette is duplicated on purpose: as CSS variables in
`src/app/globals.css`, so it can be used from plain CSS, and as hex values in
`tailwind.config.ts`, so opacity modifiers work (`bg-accent/10`).

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#0B0D10` | Headings |
| `ink-soft` | `#1C1F26` | Body copy |
| `ink-mute` | `#454A55` | Labels and tertiary text |
| `muted` | `#5D6473` | Supporting text |
| `line` | `#E4E6EB` | Visible borders |
| `line-soft` | `#F0F1F4` | Separators and progress tracks |
| `surface` | `#FFFFFF` | Card background |
| `bg` | `#E9ECF2` | Page background |
| `accent` | `#4F46E5` | The only brand colour: CTAs, links, progress, hover |
| `accent-deep` | `#4338CA` | Gradients of the accent only |
| `accent-soft` | `#EEF2FF` | Tag and icon backgrounds |
| `success` | `#147235` | "Available" status |

The neutral ramp is long on purpose: with only four greys, a heading, a label
and a supporting line all end up weighing the same and the interface reads
flat. Indigo remains the only brand colour — anywhere that looks like more
colour is a gradient or an opacity of that same tone. The page background is a
clearly perceptible grey rather than off-white, so the white cards actually
float on it.

Conventions: `rounded-xl` on cards, `rounded-full` on avatars, tags and
circular icons, `rounded-md` on buttons, and `shadow-sm` at rest moving to
`shadow-md` on hover, always with a transition.

Typography is tokenised too. The large sizes (`text-display`, `text-title`,
`text-lead`) use `clamp()` instead of a chain of breakpoint variants, so they
grow continuously with the viewport rather than jumping at each breakpoint.
Headings carry `tracking-tightest` or `tracking-tighter`, because at 68px
Inter's default tracking leaves the text loose.

Layout measurements (column widths, max content width, carousel card sizes)
are tokens as well, declared in the `LAYOUT` constant in `tailwind.config.ts`,
so the three-column grid and the components can never drift apart.

`globals.css` also defines five custom utilities Tailwind doesn't ship:
`scrollbar-none` (hides the scrollbar without disabling scrolling),
`surface-grid` (the faint background grid), `accent-glow` (the radial accent
halo behind the header), `rule-fade` (a rule that fades out) and
`text-gradient-accent` (gradient text, for the section numbers).

## Accessibility

- Every image has descriptive alternative text and every icon-only button has
  an `aria-label`.
- All text contrast meets WCAG AA (4.5:1), verified pair by pair. The
  "available" green was darkened twice for exactly this reason.
- The visible focus ring comes from a global `:focus-visible` rule in
  `globals.css`, so no component has to remember it.
- Dialogs trap focus, close on `Esc` and return focus to whatever opened them.
- Animations respect `prefers-reduced-motion`, both the CSS ones and the
  Framer Motion ones, which run in JavaScript and would otherwise ignore it.

## Making it yours

1. Edit `src/data/profile.ts` with your name, role, contact details, bio,
   languages, stack and social links.
2. Fill in `src/data/knowledge.ts`, `src/data/experience.ts` and
   `src/data/portfolio.ts`.
3. Put your photo at `public/images/avatar.jpg` and the project screenshots in
   `public/images/portfolio/`, using the filenames the `imageUrl` fields
   point at. Until a screenshot exists, `ProjectImage` shows a placeholder
   instead of a broken image, and swaps itself out as soon as the file is
   there.
4. Update the title and description in `src/app/layout.tsx`.

Icons in `src/data/` are referenced by name and resolved from the registry in
`src/lib/icons.ts`. To use a new one, add it in two places in that file: the
`import` and the `LUCIDE_ICONS` object. Forget one and TypeScript flags the
error on the data itself instead of leaving a blank space in the UI.

## Deploying to Vercel

The project is static: `npm run build` produces prerendered HTML, with no
server functions and no environment variables.

1. Push the repository to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repository.
3. Vercel detects Next.js and fills in the configuration itself. Nothing needs
   changing:
   - Framework: **Next.js**
   - Build command: `npm run build`
   - Output directory: handled by the Next adapter
   - Install command: `npm install`
4. Hit **Deploy**.

From then on every push to the main branch ships to production, and every
branch gets its own preview.

One thing to keep in mind: the year in the footer is computed at build time,
not per visit, because the page is static. If a new year arrives without a
deploy, the footer will keep showing the previous one until the next build.

### Before going live

- Add the real images; until then the project cards show a placeholder.
- Tune the percentages in `programmingSkills` — they are the one value in
  `src/data/` that is an estimate rather than something taken from the résumé.
- Decide whether the phone number should be public. It is on the résumé, so it
  is assumed intentional, but removing that row from `ProfilePanel` is a
  one-line change.
- Delete the `src/app/probe-*` routes: they are development test benches and
  are not part of the site.
