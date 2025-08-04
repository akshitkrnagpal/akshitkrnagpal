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
- **Framework**: Astro 5.x with TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.x with Vite plugin integration
- **Interactive elements**: Alpine.js (loaded via CDN)
- **Icons**: simple-icons-astro package for social media icons
- **Analytics**: Ahrefs Analytics integration
- **Build**: Astro's built-in build system with sitemap generation

### Project Structure
- `src/layouts/Layout.astro` - Main layout component with meta tags, analytics, and global styles
- `src/pages/index.astro` - Homepage with personal info and work experience section
- `src/components/simple-icons/` - Social media icon components (GitHub, LinkedIn, X)
- `src/styles/global.css` - Global CSS imports (primarily Tailwind)
- `astro.config.mjs` - Astro configuration with Tailwind and sitemap integrations

### Key Patterns

**Astro Components**: Components use the `.astro` extension with frontmatter (---) for imports and logic, followed by template markup.

**Interactive Elements**: Uses Alpine.js for client-side interactivity (expandable work experience cards). Alpine directives like `x-data`, `x-show`, and `@click` handle state and interactions.

**Icon System**: Custom wrapper components around simple-icons-astro that extend a base layout component for consistent styling and accessibility.

**Styling Approach**: 
- Inline Tailwind classes for styling
- Custom CSS classes for specific design tokens (colors like `#222`, `#444`)
- Responsive design with mobile-first approach

**SEO & Performance**:
- Comprehensive meta tags in Layout.astro
- Sitemap generation via @astrojs/sitemap
- Optimized images and semantic HTML
- Canonical domain configuration (akshit.io)

### Content Management
Work experience data is hardcoded in the main page component with Alpine.js for expand/collapse functionality. Each job includes title, duration, tech stack tags, and detailed descriptions.

### Deployment Configuration
- Site URL configured as "https://akshit.io"
- Static site generation with dist/ output
- Sitemap automatically generated for SEO