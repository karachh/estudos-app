// Terreno de mapa de orientação gerado a partir de uma semente (o id do grupo):
// o mesmo grupo sempre desenha o mesmo mapa, e os controles nunca mudam de lugar.

export const MAP_W = 400
export const MAP_H = 300
export const START = { x: 34, y: MAP_H - 34 }

type Pt = [number, number]

function rng(seed: number) {
  let a = seed >>> 0 || 1
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const f = (n: number) => n.toFixed(1)

// Curva fechada suave passando pelos pontos (Catmull-Rom convertido em Bézier).
function closed(pts: Pt[]) {
  const n = pts.length
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [pts[(i - 1 + n) % n], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]]
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`
  }
  return d + 'Z'
}

function open(pts: Pt[]) {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const [p1, p2] = [pts[i], pts[i + 1]]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`
  }
  return d
}

function blob(cx: number, cy: number, r: number, noise: number[], squash = 0.78): Pt[] {
  return noise.map((k, i) => {
    const a = (i / noise.length) * Math.PI * 2
    return [cx + Math.cos(a) * r * (1 + k), cy + Math.sin(a) * r * (1 + k) * squash]
  })
}

export interface Terrain {
  contours: { d: string; index: boolean }[]
  thickets: string[]
  openLand: string[]
  marsh: string[]
  trail: string
}

export function terrain(seed: number): Terrain {
  const r = rng(seed * 2654435761)
  const between = (a: number, b: number) => a + r() * (b - a)
  const noise = (n: number, amp: number) => Array.from({ length: n }, () => between(-amp, amp))

  // Colinas: anéis concêntricos que compartilham o mesmo ruído, para se encaixarem como curvas de nível.
  const contours: Terrain['contours'] = []
  const hills = 2 + Math.floor(r() * 2)
  for (let h = 0; h < hills; h++) {
    const cx = between(60, MAP_W - 60)
    const cy = between(50, MAP_H - 50)
    const shape = noise(10, 0.22)
    const rings = 4 + Math.floor(r() * 4)
    const step = between(15, 22)
    for (let i = 1; i <= rings; i++) {
      const drift = shape.map((k, j) => k * (1 + i * 0.12) + Math.sin(j + i) * 0.03)
      contours.push({ d: closed(blob(cx, cy, step * i, drift, 0.72)), index: i % 5 === 0 })
    }
  }

  const make = (count: number, rMin: number, rMax: number, amp: number) =>
    Array.from({ length: count }, () =>
      closed(blob(between(20, MAP_W - 20), between(20, MAP_H - 20), between(rMin, rMax), noise(8, amp))),
    )

  const y0 = between(40, MAP_H - 40)
  const trail = open(
    Array.from({ length: 5 }, (_, i): Pt => [(-10 + (i * (MAP_W + 20)) / 4), y0 + between(-60, 60)]),
  )

  return {
    contours,
    thickets: make(2 + Math.floor(r() * 2), 26, 58, 0.38),
    openLand: make(1 + Math.floor(r() * 2), 24, 48, 0.32),
    marsh: make(r() < 0.6 ? 1 : 0, 18, 34, 0.3),
    trail,
  }
}

// Espalha os controles pelo mapa sem sobrepor (amostragem por dardos com semente).
export function placeControls(count: number, seed: number): Pt[] {
  const r = rng(seed * 40503 + 7)
  const pts: Pt[] = []
  const margin = 30
  let minDist = 62
  for (let i = 0; i < count; i++) {
    let placed = false
    for (let tries = 0; tries < 400 && !placed; tries++) {
      const p: Pt = [margin + r() * (MAP_W - margin * 2), margin + r() * (MAP_H - margin * 2)]
      const far = (q: Pt, d: number) => Math.hypot(p[0] - q[0], p[1] - q[1]) >= d
      if (pts.every((q) => far(q, minDist)) && far([START.x, START.y], 48)) {
        pts.push(p)
        placed = true
      }
      if (tries % 100 === 99) minDist *= 0.9
    }
    if (!placed) pts.push([margin + r() * (MAP_W - margin * 2), margin + r() * (MAP_H - margin * 2)])
  }
  return pts
}
