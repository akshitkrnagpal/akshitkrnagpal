import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const here = dirname(fileURLToPath(import.meta.url))
const fontsDir = join(here, 'fonts')

const [display, hand, sansBold, sansMedium] = await Promise.all([
  readFile(join(fontsDir, 'BricolageGrotesque-ExtraBold.ttf')),
  readFile(join(fontsDir, 'Caveat-SemiBold.ttf')),
  readFile(join(fontsDir, 'DMSans-Bold.ttf')),
  readFile(join(fontsDir, 'DMSans-Medium.ttf')),
])

const avatarUrl = 'https://avatars.githubusercontent.com/u/15872348?size=512'
const avatarRes = await fetch(avatarUrl)
if (!avatarRes.ok) throw new Error(`avatar fetch failed: ${avatarRes.status}`)
const avatarType = avatarRes.headers.get('content-type') ?? 'image/jpeg'
const avatarBytes = Buffer.from(await avatarRes.arrayBuffer())
const avatarDataUrl = `data:${avatarType};base64,${avatarBytes.toString('base64')}`

// Same palette as the light theme in src/layouts/Layout.astro.
const PAPER = '#fdf6e9'
const INK = '#16130f'
const MUTED = '#6a6257'
const RED = '#ff5b35'
const YELLOW = '#ffc93c'
const BLUE = '#3d5afe'
const GREEN = '#1fbf87'
const PINK = '#ff7ac6'

const el = (type, props) => ({ type, props })

const sticker = (text, style) =>
  el('div', {
    style: {
      position: 'absolute',
      display: 'flex',
      border: `3px solid ${INK}`,
      boxShadow: `4px 4px 0 ${INK}`,
      fontFamily: 'Bricolage Grotesque',
      fontSize: '26px',
      color: INK,
      ...style,
    },
    children: text,
  })

const tapeNames = ['PromptLens', 'OfferKit', 'HookBell', 'ZenSEO', 'EdgePush', 'TypesenseKit', 'Zoppy', 'Fast36']

const tree = el('div', {
  style: {
    width: '1200px',
    height: '630px',
    background: PAPER,
    color: INK,
    fontFamily: 'DM Sans',
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
  },
  children: [
    // Copy
    el('div', {
      style: {
        position: 'absolute',
        top: '64px',
        left: '72px',
        width: '640px',
        display: 'flex',
        flexDirection: 'column',
      },
      children: [
        el('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            gap: '12px',
            padding: '8px 20px 8px 16px',
            border: `3px solid ${INK}`,
            borderRadius: '999px',
            background: '#ffffff',
            fontSize: '22px',
            fontWeight: 700,
          },
          children: [
            el('div', { style: { width: '14px', height: '14px', borderRadius: '14px', background: GREEN } }),
            el('span', { children: 'akshit.io' }),
          ],
        }),
        el('div', {
          style: {
            marginTop: '30px',
            fontFamily: 'Bricolage Grotesque',
            fontSize: '92px',
            lineHeight: 0.98,
            letterSpacing: '-3px',
          },
          children: 'Akshit Kr Nagpal',
        }),
        el('div', {
          style: { display: 'flex', alignItems: 'center', gap: '22px', marginTop: '22px' },
          children: [
            el('span', {
              style: { fontFamily: 'Bricolage Grotesque', fontSize: '64px', letterSpacing: '-2px' },
              children: 'I make',
            }),
            el('div', {
              style: {
                display: 'flex',
                padding: '0 18px 6px',
                border: `4px solid ${INK}`,
                borderRadius: '14px',
                background: YELLOW,
                boxShadow: `6px 6px 0 ${INK}`,
                fontFamily: 'Bricolage Grotesque',
                fontSize: '64px',
                letterSpacing: '-2px',
                transform: 'rotate(-3deg)',
              },
              children: 'AI agents',
            }),
          ],
        }),
        el('div', {
          style: {
            marginTop: '30px',
            color: MUTED,
            fontSize: '26px',
            fontWeight: 500,
            lineHeight: 1.4,
            maxWidth: '560px',
          },
          children: 'Senior full-stack engineer, now building AI agents, evals, and developer tools.',
        }),
      ],
    }),
    // Polaroid
    el('div', {
      style: {
        position: 'absolute',
        top: '70px',
        right: '56px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '14px 14px 6px',
        border: `3px solid ${INK}`,
        borderRadius: '8px',
        background: '#fffdf8',
        boxShadow: `8px 8px 0 ${INK}`,
        transform: 'rotate(4deg)',
      },
      children: [
        el('img', {
          src: avatarDataUrl,
          width: 256,
          height: 256,
          style: { width: '256px', height: '256px', objectFit: 'cover', border: `3px solid ${INK}` },
        }),
        el('div', {
          style: { fontFamily: 'Caveat', fontSize: '34px', color: INK, padding: '4px 0 0' },
          children: 'me, mid-deploy',
        }),
      ],
    }),
    sticker('TypeScript', {
      top: '40px',
      right: '40px',
      padding: '8px 18px',
      borderRadius: '10px',
      background: BLUE,
      color: '#ffffff',
      transform: 'rotate(10deg)',
    }),
    sticker('Swift', {
      top: '262px',
      right: '312px',
      padding: '6px 22px',
      borderRadius: '999px',
      background: PINK,
      transform: 'rotate(-9deg)',
    }),
    sticker('evals', {
      top: '332px',
      right: '28px',
      padding: '6px 22px',
      borderRadius: '999px',
      background: GREEN,
      transform: 'rotate(7deg)',
    }),
    sticker('open source', {
      top: '400px',
      right: '250px',
      padding: '6px 22px',
      borderRadius: '999px',
      background: RED,
      transform: 'rotate(-6deg)',
    }),
    // Tape
    el('div', {
      style: {
        position: 'absolute',
        left: '-40px',
        bottom: '38px',
        width: '1280px',
        display: 'flex',
        alignItems: 'center',
        gap: '28px',
        padding: '12px 0 12px 40px',
        borderTop: `3px solid ${INK}`,
        borderBottom: `3px solid ${INK}`,
        background: YELLOW,
        fontFamily: 'Bricolage Grotesque',
        fontSize: '30px',
        transform: 'rotate(-2deg)',
      },
      children: tapeNames.flatMap((name) => [
        el('span', { style: { flexShrink: 0 }, children: name.toUpperCase() }),
        el('div', { style: { flexShrink: 0, width: '12px', height: '12px', borderRadius: '12px', background: INK } }),
      ]),
    }),
  ],
})

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Bricolage Grotesque', data: display, weight: 400, style: 'normal' },
    { name: 'Caveat', data: hand, weight: 400, style: 'normal' },
    { name: 'DM Sans', data: sansBold, weight: 700, style: 'normal' },
    { name: 'DM Sans', data: sansMedium, weight: 500, style: 'normal' },
  ],
})

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  .render()
  .asPng()

const outPath = join(here, '..', 'public', 'og.png')
await writeFile(outPath, png)
console.log(`wrote ${outPath} (${png.length} bytes)`)
