# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` or `npm run dev`
- **Build for production**: `pnpm build` or `npm run build`
- **Preview production build**: `pnpm preview` or `npm run preview`
- **Package manager**: This project uses `pnpm` (preferred) but npm also works
- **Refresh project previews**: `pnpm refresh:previews`, also run automatically by `pnpm build`

## Architecture Overview

This is an Astro-based personal portfolio website with the following key architectural patterns:

### Tech Stack
- **Framework**: Astro with TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.x via the Vite plugin, plus scoped `<style>` blocks
- **Images**: `astro:assets` (sharp) for project previews in `src/assets/projects/`
- **Analytics**: Ahrefs Analytics

### Project Structure
- `src/layouts/Layout.astro` - Meta tags, theme bootstrap, color and font tokens, entrance and scroll-reveal animations
- `src/pages/index.astro` - The whole site: composes the sections below, plus the scroll reveal, card tilt, and Konami-code party mode scripts
- `src/components/Nav.astro` - Floating pill nav (pairs with the floating `ThemeToggle.astro`)
- `src/components/Hero.astro` - Headline with the rotating "I make ___" word and the draggable sticker playground (click the polaroid for confetti)
- `src/components/Marquee.astro` - Crossing tapes that scroll project names
- `src/components/Stats.astro` - Count-up stat tiles derived from the project data
- `src/components/ProjectCard.astro` - Featured project card with browser-chrome preview frame
- `src/components/Terminal.astro` - "Junk drawer" list of smaller projects inside an interactive fake shell (`help` lists commands)
- `src/components/Footer.astro` - Contact call to action and fine print
- `src/data/projects.ts` - Single source of project data (`featured` with preview images, `more` as rows)
- `src/data/socials.ts` - Bio, avatar, social links, and the pop color cycle
- `src/scripts/confetti.ts` - Dependency-free canvas confetti
- `src/components/ThemeToggle.astro` - Floating light/dark toggle with radial view transition
- `scripts/generate-og.mjs` - Generates `public/og.png` in the same sticker style

### Key Patterns
- Colors come from CSS variables in `Layout.astro`: `--color-ink`, `--color-paper`, `--color-muted`, `--color-card`, `--color-line` (chunky borders and hard shadows), plus `--pop-*` accents. Text on a pop color uses `--on-pop`, except blue, which uses `--on-blue`.
- The look is playful and sticker-like: 2px `--color-line` borders, hard offset shadows, slight rotations, and Bricolage Grotesque / Caveat / JetBrains Mono for display, handwritten, and terminal text.
- All motion respects `prefers-reduced-motion`.
- To add a project, add an entry to `src/data/projects.ts`; featured ones need a 1200x630 preview image in `src/assets/projects/`. The marquee, stats, and terminal pick it up automatically.
- Featured product URLs live in `src/data/project-urls.json`. Before each build, `scripts/fetch-project-previews.mjs` reads each product's `og:image`, downloads it, and saves a PNG in the ignored `src/assets/projects/generated/` directory. Astro optimizes these into local images with content hashes in their filenames. Fetches have a 15-second timeout; failures use the last downloaded image if available, otherwise the checked-in preview. Development uses saved previews; run `pnpm refresh:previews` before starting the dev server to refresh them.

### Deployment Configuration
- Site URL configured as "https://akshit.io"
- Static site generation with dist/ output
- Sitemap automatically generated for SEO
