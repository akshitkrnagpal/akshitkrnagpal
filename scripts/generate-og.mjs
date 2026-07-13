import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const here = dirname(fileURLToPath(import.meta.url))
const fontsDir = join(here, 'fonts')

const [sansBold, sansMedium] = await Promise.all([
  readFile(join(fontsDir, 'DMSans-Bold.ttf')),
  readFile(join(fontsDir, 'DMSans-Medium.ttf')),
])

const avatarUrl = 'https://avatars.githubusercontent.com/u/15872348?size=512'
const avatarRes = await fetch(avatarUrl)
if (!avatarRes.ok) throw new Error(`avatar fetch failed: ${avatarRes.status}`)
const avatarType = avatarRes.headers.get('content-type') ?? 'image/jpeg'
const avatarBytes = Buffer.from(await avatarRes.arrayBuffer())
const avatarDataUrl = `data:${avatarType};base64,${avatarBytes.toString('base64')}`

const BG = '#090d0f'
const SURFACE = '#0d1316'
const LINE = '#263238'
const TEXT = '#edf3f1'
const MUTED = '#95a3a5'
const DIM = '#68777a'
const ACCENT = '#7df9c2'

const el = (type, props) => ({ type, props })

const gridLines = [
  ...Array.from({ length: 12 }, (_, index) =>
    el('div', {
      style: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${index * 100}px`,
        width: '1px',
        background: LINE,
        opacity: 0.18,
      },
    }),
  ),
  ...Array.from({ length: 7 }, (_, index) =>
    el('div', {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: `${index * 100}px`,
        height: '1px',
        background: LINE,
        opacity: 0.18,
      },
    }),
  ),
]

const tree = el('div', {
  style: {
    width: '1200px',
    height: '630px',
    background: BG,
    color: TEXT,
    fontFamily: 'Console',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  children: [
    ...gridLines,
    el('div', {
      style: {
        height: '72px',
        margin: '38px 46px 0',
        border: `1px solid ${LINE}`,
        background: SURFACE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        fontSize: '16px',
        fontWeight: 700,
        letterSpacing: '3px',
        textTransform: 'uppercase',
      },
      children: [
        el('div', {
          style: { display: 'flex', alignItems: 'center', gap: '14px' },
          children: [
            el('div', {
              style: {
                width: '10px',
                height: '10px',
                borderRadius: '10px',
                background: ACCENT,
                boxShadow: `0 0 18px ${ACCENT}`,
              },
            }),
            el('span', { children: 'AKSHIT.IO / PORTFOLIO' }),
          ],
        }),
        el('span', { style: { color: ACCENT }, children: '[ SYSTEM ONLINE ]' }),
      ],
    }),
    el('div', {
      style: {
        flex: 1,
        margin: '0 46px 38px',
        borderLeft: `1px solid ${LINE}`,
        borderRight: `1px solid ${LINE}`,
        borderBottom: `1px solid ${LINE}`,
        display: 'flex',
        flexDirection: 'row',
        background: `${BG}E8`,
      },
      children: [
        el('div', {
          style: {
            width: '730px',
            padding: '54px 50px',
            borderRight: `1px solid ${LINE}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
          children: [
            el('div', {
              style: {
                color: ACCENT,
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase',
              },
              children: '> IDENTITY / 001',
            }),
            el('div', {
              style: {
                marginTop: '25px',
                fontSize: '78px',
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: '-4px',
                textTransform: 'uppercase',
              },
              children: 'Akshit Kr Nagpal',
            }),
            el('div', {
              style: {
                marginTop: '25px',
                color: ACCENT,
                fontSize: '19px',
                fontWeight: 500,
                letterSpacing: '2px',
              },
              children: 'const role = “Software Engineer”;',
            }),
            el('div', {
              style: {
                marginTop: '23px',
                maxWidth: '610px',
                color: MUTED,
                fontSize: '21px',
                fontWeight: 500,
                lineHeight: 1.45,
              },
              children: 'Indie hacker and full-stack engineer building developer tools, side projects, clean code, and great UX.',
            }),
          ],
        }),
        el('div', {
          style: {
            flex: 1,
            padding: '34px',
            display: 'flex',
            flexDirection: 'column',
          },
          children: [
            el('div', {
              style: {
                color: DIM,
                fontSize: '13px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              },
              children: 'PROFILE.SYS',
            }),
            el('div', {
              style: {
                position: 'relative',
                marginTop: '20px',
                width: '280px',
                height: '280px',
                border: `1px solid ${LINE}`,
                display: 'flex',
                overflow: 'hidden',
              },
              children: [
                el('img', {
                  src: avatarDataUrl,
                  width: 280,
                  height: 280,
                  style: {
                    width: '280px',
                    height: '280px',
                    objectFit: 'cover',
                  },
                }),
                el('div', {
                  style: {
                    position: 'absolute',
                    left: '12px',
                    bottom: '12px',
                    color: ACCENT,
                    border: `1px solid ${ACCENT}`,
                    background: `${BG}DD`,
                    padding: '7px 10px',
                    fontSize: '12px',
                    letterSpacing: '2px',
                  },
                  children: 'READY',
                }),
              ],
            }),
            el('div', {
              style: {
                marginTop: '18px',
                border: `1px solid ${LINE}`,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 14px',
                color: DIM,
                fontSize: '12px',
                letterSpacing: '2px',
              },
              children: [
                el('span', { children: 'MODE' }),
                el('span', { style: { color: MUTED }, children: 'FULL-STACK' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Console', data: sansBold, weight: 700, style: 'normal' },
    { name: 'Console', data: sansMedium, weight: 500, style: 'normal' },
  ],
})

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  .render()
  .asPng()

const outPath = join(here, '..', 'public', 'og.png')
await writeFile(outPath, png)
console.log(`wrote ${outPath} (${png.length} bytes)`)
