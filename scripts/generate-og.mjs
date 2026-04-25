import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const here = dirname(fileURLToPath(import.meta.url))
const fontsDir = join(here, 'fonts')

const [serifItalic, sansBold, sansMedium] = await Promise.all([
  readFile(join(fontsDir, 'InstrumentSerif-Italic.ttf')),
  readFile(join(fontsDir, 'DMSans-Bold.ttf')),
  readFile(join(fontsDir, 'DMSans-Medium.ttf')),
])

const avatarUrl = 'https://avatars.githubusercontent.com/u/15872348?size=512'
const avatarRes = await fetch(avatarUrl)
if (!avatarRes.ok) throw new Error(`avatar fetch failed: ${avatarRes.status}`)
const avatarType = avatarRes.headers.get('content-type') ?? 'image/jpeg'
const avatarBytes = Buffer.from(await avatarRes.arrayBuffer())
const avatarDataUrl = `data:${avatarType};base64,${avatarBytes.toString('base64')}`

const PAPER = '#0a0a0b'
const INK = '#e8e6e3'
const MUTED = '#8a8a8a'
const ACCENT = '#e85d4c'
const COOL = '#4a90d9'

const el = (type, props) => ({ type, props })

const tree = el('div', {
  style: {
    width: '1200px',
    height: '630px',
    background: PAPER,
    color: INK,
    fontFamily: 'DM Sans',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  children: [
    el('div', {
      style: {
        position: 'absolute',
        top: '-180px',
        right: '-160px',
        width: '720px',
        height: '720px',
        borderRadius: '720px',
        background: ACCENT,
        opacity: 0.16,
        filter: 'blur(120px)',
      },
    }),
    el('div', {
      style: {
        position: 'absolute',
        bottom: '-160px',
        left: '-120px',
        width: '560px',
        height: '560px',
        borderRadius: '560px',
        background: COOL,
        opacity: 0.1,
        filter: 'blur(120px)',
      },
    }),
    el('div', {
      style: {
        position: 'absolute',
        top: '56px',
        left: '64px',
        right: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: MUTED,
        fontSize: '20px',
        letterSpacing: '6px',
        textTransform: 'uppercase',
      },
      children: [
        el('span', { children: 'Portfolio' }),
        el('span', { style: { color: INK, letterSpacing: '2px' }, children: 'akshit.io' }),
      ],
    }),
    el('div', {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '64px',
        padding: '0 96px',
      },
      children: [
        el('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '300px',
            height: '300px',
            borderRadius: '300px',
            border: `2px solid ${ACCENT}33`,
            padding: '12px',
            flexShrink: 0,
          },
          children: [
            el('img', {
              src: avatarDataUrl,
              width: 276,
              height: 276,
              style: {
                width: '276px',
                height: '276px',
                borderRadius: '276px',
                objectFit: 'cover',
              },
            }),
          ],
        }),
        el('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flex: 1,
          },
          children: [
            el('div', {
              style: {
                fontFamily: 'Instrument Serif',
                fontStyle: 'italic',
                fontSize: '108px',
                lineHeight: 0.96,
                letterSpacing: '-2px',
                color: INK,
              },
              children: 'Akshit Kr Nagpal',
            }),
            el('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '28px',
                color: ACCENT,
                fontSize: '20px',
                fontWeight: 500,
                letterSpacing: '6px',
                textTransform: 'uppercase',
              },
              children: [
                el('div', { style: { width: '40px', height: '2px', background: ACCENT } }),
                el('span', { children: 'Software Engineer' }),
              ],
            }),
            el('div', {
              style: {
                marginTop: '28px',
                color: MUTED,
                fontSize: '24px',
                fontWeight: 500,
                lineHeight: 1.4,
                maxWidth: '600px',
              },
              children: 'Full-stack engineer. Building developer tools, open source, and AI products.',
            }),
          ],
        }),
      ],
    }),
    el('div', {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, transparent 0%, ${ACCENT} 50%, transparent 100%)`,
      },
    }),
  ],
})

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Instrument Serif', data: serifItalic, weight: 400, style: 'italic' },
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
