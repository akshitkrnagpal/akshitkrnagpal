// A tiny canvas confetti cannon. No dependencies, one shared canvas.

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  spin: number;
  size: number;
  color: string;
  emoji?: string;
  life: number;
}

const colors = ["#ff5b35", "#ffc93c", "#3d5afe", "#1fbf87", "#ff7ac6", "#8e6cff"];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;
let pieces: Piece[] = [];
let frame = 0;

function ensureCanvas() {
  if (canvas && context) return context;
  canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "100",
  });
  document.body.append(canvas);
  context = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", resize);
  return context;
}

function resize() {
  if (!canvas || !context) return;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function tick() {
  if (!context) return;
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  pieces = pieces.filter((piece) => piece.life > 0 && piece.y < window.innerHeight + 40);
  for (const piece of pieces) {
    piece.vy += 0.32;
    piece.vx *= 0.985;
    piece.vy *= 0.985;
    piece.x += piece.vx;
    piece.y += piece.vy;
    piece.rotation += piece.spin;
    piece.life -= 1;

    context.save();
    context.globalAlpha = Math.min(1, piece.life / 40);
    context.translate(piece.x, piece.y);
    context.rotate(piece.rotation);
    if (piece.emoji) {
      context.font = `${piece.size * 2.2}px system-ui, sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(piece.emoji, 0, 0);
    } else {
      context.fillStyle = piece.color;
      context.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
    }
    context.restore();
  }

  frame = pieces.length ? requestAnimationFrame(tick) : 0;
}

export interface ConfettiOptions {
  count?: number;
  /** Spread in radians around straight up. */
  spread?: number;
  power?: number;
  emoji?: string[];
}

/** Fire confetti from a viewport point (defaults to the bottom center). */
export function confetti(
  x = window.innerWidth / 2,
  y = window.innerHeight,
  { count = 120, spread = Math.PI / 2.2, power = 16, emoji = [] }: ConfettiOptions = {},
) {
  if (reducedMotion.matches) return;
  ensureCanvas();

  for (let i = 0; i < count; i += 1) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * spread * 2;
    const speed = power * (0.45 + Math.random() * 0.75);
    pieces.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.4,
      size: 7 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: emoji.length && Math.random() < 0.3 ? emoji[Math.floor(Math.random() * emoji.length)] : undefined,
      life: 140 + Math.random() * 80,
    });
  }

  if (!frame) frame = requestAnimationFrame(tick);
}

/** A big celebration: three cannons across the bottom of the screen. */
export function party(emoji: string[] = ["🎉", "✨", "🚀"]) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  confetti(width * 0.1, height, { count: 90, spread: Math.PI / 6, power: 22, emoji });
  confetti(width * 0.5, height, { count: 110, spread: Math.PI / 5, power: 24, emoji });
  confetti(width * 0.9, height, { count: 90, spread: Math.PI / 6, power: 22, emoji });
}
