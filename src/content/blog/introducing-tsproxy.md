---
title: "Introducing tsproxy: A Search Proxy Framework for Typesense"
description: "I built tsproxy, an open-source proxy layer for Typesense with caching, rate limiting, an ingestion queue, and InstantSearch-compatible React components."
date: 2026-04-06
tags: ["typesense", "open-source", "search", "react"]
---

If you've ever shipped a search experience powered by Typesense, you know the drill: you need to hide your API key, add caching so you're not hammering Typesense on every keystroke, rate-limit public endpoints, and somehow make it all work with InstantSearch on the frontend. Every project ends up reinventing the same middleware.

I got tired of doing this, so I built **tsproxy**. It's an open-source search proxy framework that sits between your frontend and Typesense. It gives you caching, rate limiting, an ingestion queue, and a set of headless React components, all wired together through a single config file.

## Why a Proxy?

Typesense has a search-only API key, but there are things it can't do alone. You might want to:

- **Cache responses** so repeated queries don't hit Typesense at all
- **Rate-limit by IP** to protect against abuse on public endpoints
- **Queue ingestion** with concurrency limits and retries instead of writing directly
- **Transform documents** on the way in (computing fields, normalizing data)
- **Add synonyms and curations** managed through config rather than Typesense's dashboard
- **Track analytics** like clicks, conversions, and popular queries

tsproxy handles all of this. The proxy is a HonoJS server that exposes an InstantSearch-compatible multi-search endpoint, so your frontend doesn't know it's talking to a proxy instead of Algolia.

## The Stack

tsproxy is a monorepo with four packages:

**@tsproxy/api** is the HonoJS proxy server. It handles search (with LRU caching and per-IP rate limiting), ingestion (BullMQ queue with Redis, or an in-memory fallback), synonyms, curations, query suggestions, and analytics. It transforms Typesense responses into the Algolia format that InstantSearch expects.

**@tsproxy/js** is a tiny `searchClient` adapter that implements Algolia's `search()` interface. You point it at your proxy URL and pass it to InstantSearch. Works with any framework.

**@tsproxy/react** provides headless React components built on top of react-instantsearch. Every sub-element is overridable via a BaseUI-style `overrides` prop. It includes `SearchProvider`, `NoResults`, `HitsSkeleton`, and an `Autocomplete` component that calls the suggestions endpoint.

**@tsproxy/cli** is the command-line tool. `tsproxy init` scaffolds a project, `tsproxy dev` runs the proxy in dev mode, `tsproxy generate` introspects your Typesense schema and generates a config, `tsproxy migrate --apply` syncs synonyms and curations, and `tsproxy seed` populates test data.

## Config-Driven

Everything is defined in a `tsproxy.config.ts` file using `defineConfig`. Collections, searchable fields, facets, sorting, synonyms, curations, rate limits, cache TTLs: it's all in one place. When you run `tsproxy migrate --apply`, the CLI reads this config and syncs it to Typesense.

If you already have collections in Typesense, `tsproxy generate` will introspect the schema and produce a config file for you.

## What It Looks Like

A minimal setup:

```bash
npx @tsproxy/cli init
docker compose up -d   # Redis for the queue
npx tsproxy dev
```

On the frontend, swap out your Algolia client:

```ts
import { createSearchClient } from "@tsproxy/js";

const searchClient = createSearchClient({
  url: "http://localhost:3001",
});
```

Then use it with InstantSearch as usual, or use the headless React components from `@tsproxy/react`.

## Current State

tsproxy just hit v0.1.0. The core features are stable: search proxying with caching and rate limiting, the ingestion queue, synonyms, curations, geo search, group-by, query suggestions, analytics, SSR support, and URL sync all work. The CLI covers the full workflow from scaffolding to production.

It's still early and APIs may shift between minor versions, but it's solid enough to build on.

## Links

- [Documentation](https://tsproxy.akshit.io)
- [GitHub](https://github.com/akshitkrnagpal/tsproxy)
- [npm](https://www.npmjs.com/org/tsproxy)

If you're using Typesense and want a production-ready proxy layer without reinventing the wheel, give tsproxy a try. Issues and PRs are welcome.
