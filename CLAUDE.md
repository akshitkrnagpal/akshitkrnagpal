# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` or `npm run dev`
- **Build for production**: `pnpm build` or `npm run build`
- **Preview production build**: `pnpm preview` or `npm run preview`
- **Package manager**: This project uses `pnpm` (preferred) but npm also works

## Architecture Overview

This is an Astro-based personal portfolio website with the following key architectural patterns:

### Tech Stack
- **Framework**: Astro with TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.x via the Vite plugin, plus scoped `<style>` blocks
- **Images**: `astro:assets` (sharp) for project previews in `src/assets/projects/`
- **Page transitions**: native cross-document view transitions (`@view-transition` in `global.css`)
- **Analytics**: Ahrefs Analytics

### Project Structure
- `src/layouts/Layout.astro` - Meta tags, theme bootstrap, color tokens, entrance animations
- `src/pages/index.astro` - Hero plus the first three featured projects
- `src/pages/projects.astro` - All featured projects plus a compact list of smaller ones
- `src/data/projects.ts` - Single source of project data (`featured` with preview images, `more` as rows)
- `src/components/ProjectCard.astro` - Preview card shared by both pages
- `src/components/ThemeToggle.astro` - Floating light/dark toggle with radial view transition
- `scripts/generate-og.mjs` - Generates `public/og.png`

### Key Patterns
- Colors come from CSS variables (`--color-ink`, `--color-paper`, `--color-muted`, `--color-border`, ...) defined in `Layout.astro` for light and dark themes.
- Elements sharing a `view-transition-name` (avatar, `preview-<slug>`) morph between pages.
- To add a project, add an entry to `src/data/projects.ts`; featured ones need a 1200x630 preview image in `src/assets/projects/`.

### Deployment Configuration
- Site URL configured as "https://akshit.io"
- Static site generation with dist/ output
- Sitemap automatically generated for SEO