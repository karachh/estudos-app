import { useMemo } from 'react'
import type { Topic } from '../core/db'
import type { World } from '../core/modules'
import type { Progress } from '../core/queries'
import { MAP_H, MAP_W } from '../core/terrain'
import { sumProgress } from '../core/queries'

// Painel de cada tema no lugar do mapa de orientação: eva = favo de hexágonos (painel de sincronia),
// office = mural de papel pardo com retícula colorida, cosmos = céu de estrelas sobre o mar de nuvens. Os tópicos continuam clicáveis em qualquer ordem.

type Props = {
  world: World
  seed: number
  title: string
  moduleId: string
  topics: Topic[]
  byTopic: Map<number, Progress>
  lit: number | null
  onLight: (id: number | null) => void
}

const ratio = (p?: Progress) => (p && p.total > 0 ? p.done / p.total : 0)

// Fundos dos cartões do Trabalho, nas cores dos retratos do pôster de The Office
const OFFICE_TONES = ['#7fa8c9', '#f2b82e', '#e7837a', '#ec8a3f', '#e6cf9f']

// Posições das estrelas no céu (parte de cima do painel): grade com desvio sorteado pela semente, para o
// mesmo grupo sempre desenhar o mesmo céu e as estrelas nunca se encostarem
function skySpots(n: number, seed: number): [number, number][] {
  const cols = Math.max(1, Math.ceil(Math.sqrt((n * (MAP_W - 60)) / (MAP_H * 0.55))))
  const rows = Math.max(1, Math.ceil(n / cols))
  const cw = (MAP_W - 60) / cols
  const ch = (MAP_H * 0.58) / rows
  return Array.from({ length: n }, (_, i) => {
    const r = Math.floor(i / cols)
    const c = i % cols
    const jx = (((i * 73 + seed * 31) % 17) / 17 - 0.5) * cw * 0.5
    const jy = (((i * 41 + seed * 19) % 13) / 13 - 0.5) * ch * 0.5
    return [30 + cw * (c + 0.5) + jx + (r % 2 ? cw * 0.18 : 0), 44 + ch * (r + 0.5) + jy]
  })
}

// Cordilheira escura em primeiro plano, como na foto de referência
const RIDGE = 'M0 300V262L22 252 46 258 78 238 104 250 134 228 160 244 196 232 228 248 262 226 292 240 326 222 356 238 380 230 400 240V300Z'

export function ThemeBoard(props: Props) {
  const { world, seed, title, moduleId, topics, byTopic, lit, onLight } = props
  const spots = useMemo(() => (world === 'eva' || world === 'office' ? [] : skySpots(topics.length, seed)), [world, topics.length, seed])
  const total = sumProgress(topics.map((t) => byTopic.get(t.id)))
  const pct = total.total ? Math.round((total.done / total.total) * 100) : 0

  const link = (t: Topic, i: number, children: React.ReactNode) => {
    const p = byTopic.get(t.id) ?? { done: 0, total: 0 }
    return (
      <a
        key={t.id}
        href={`#/${moduleId}/t/${t.id}`}
        className={`tb-node ${lit === t.id ? 'lit' : ''}`}
        aria-label={`${i + 1}. ${t.title}: ${p.done} de ${p.total}`}
        onMouseEnter={() => onLight(t.id)}
        onMouseLeave={() => onLight(null)}
        onFocus={() => onLight(t.id)}
        onBlur={() => onLight(null)}
      >
        {children}
      </a>
    )
  }

  let body: React.ReactNode = null

  if (world === 'eva') {
    // Maior raio de hexágono em que todos os tópicos cabem
    const n = topics.length
    let R = 34
    let cols = 1
    for (; R > 12; R -= 2) {
      const dx = R * Math.sqrt(3)
      cols = Math.max(1, Math.floor((MAP_W - 24 - dx / 2) / dx))
      const rows = Math.ceil(n / cols)
      if (R * 2 + (rows - 1) * R * 1.5 <= MAP_H - 44) break
    }
    const dx = R * Math.sqrt(3)
    const rows = Math.ceil(n / cols)
    const used = Math.min(n, cols)
    const x0 = (MAP_W - (used * dx + (rows > 1 ? dx / 2 : 0))) / 2 + dx / 2
    const y0 = 34 + R + Math.max(0, (MAP_H - 44 - (R * 2 + (rows - 1) * R * 1.5)) / 2)
    const hex = (r: number) =>
      Array.from({ length: 6 }, (_, k) => {
        const a = (Math.PI / 3) * k + Math.PI / 6
        return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`
      }).join(' ')
    body = (
      <>
        <text x="14" y="22" className="tb-label">
          SYNC RATE
        </text>
        <text x={MAP_W - 14} y="22" textAnchor="end" className="tb-label tb-label-hot">
          {String(pct).padStart(3, '0')}%
        </text>
        <line x1="14" x2={MAP_W - 14} y1="30" y2="30" className="tb-rule" />
        {topics.map((t, i) => {
          const r = Math.floor(i / cols)
          const c = i % cols
          const x = x0 + c * dx + (r % 2 ? dx / 2 : 0)
          const y = y0 + r * R * 1.5
          const k = ratio(byTopic.get(t.id))
          const clip = `eva-c-${seed}-${t.id}`
          return link(
            t,
            i,
            <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <clipPath id={clip}>
                <polygon points={hex(R - 3)} />
              </clipPath>
              <polygon points={hex(R - 1.5)} className="tb-cell" />
              {k > 0 && (
                <rect x={-R} y={R - 3 - (R - 3) * 2 * k} width={R * 2} height={R * 2} className="tb-fill" clipPath={`url(#${clip})`} />
              )}
              <polygon points={hex(R - 1.5)} className="tb-edge" />
              <text y={R * 0.17} textAnchor="middle" className="tb-num" style={{ fontSize: R * 0.5 }}>
                {i + 1}
              </text>
            </g>,
          )
        })}
      </>
    )
  } else if (world === 'office') {
    const n = Math.max(1, topics.length)
    const cols = Math.max(1, Math.ceil(Math.sqrt((n * (MAP_W - 24)) / (MAP_H - 44))))
    const rows = Math.ceil(n / cols)
    const S = Math.min(64, (MAP_W - 24) / cols, (MAP_H - 44) / rows)
    const x0 = (MAP_W - cols * S) / 2
    const y0 = 36 + (MAP_H - 44 - rows * S) / 2
    body = (
      <>
        <text x="14" y="22" className="tb-label">
          SCRANTON · PAPER CO.
        </text>
        <text x={MAP_W - 14} y="22" textAnchor="end" className="tb-label tb-label-hot">
          {total.done}/{total.total}
        </text>
        <line x1="14" x2={MAP_W - 14} y1="30" y2="30" className="tb-rule" />
        {topics.map((t, i) => {
          const x = x0 + (i % cols) * S
          const y = y0 + Math.floor(i / cols) * S
          const k = ratio(byTopic.get(t.id))
          const lit9 = k >= 1 ? 9 : k > 0 ? Math.ceil(k * 9) : 0
          const g = S - 10
          const tone = OFFICE_TONES[i % OFFICE_TONES.length]
          return link(
            t,
            i,
            <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <rect x="3" y="3" width={S - 6} height={S - 6} className="tb-cell" style={{ fill: tone }} />
              {Array.from({ length: 9 }, (_, j) => (
                <circle
                  key={j}
                  cx={5 + (j % 3) * (g / 3) + g / 6}
                  cy={5 + Math.floor(j / 3) * (g / 3) + g / 6}
                  r={g / 7.5}
                  className={j < lit9 ? 'tb-fill' : 'tb-off'}
                />
              ))}
              <rect x="3" y="3" width={S - 6} height={S - 6} className="tb-edge" />
              <text x="6" y={S - 6} className="tb-num tb-num-tag" style={{ fontSize: Math.max(9, S * 0.2) }}>
                {String(i + 1).padStart(2, '0')}
              </text>
            </g>,
          )
        })}
      </>
    )
  } else {
    // cosmos: céu estrelado sobre o mar de nuvens; cada tópico é uma estrela que ganha a cruz de luz ao avançar
    body = (
      <>
        <defs>
          <radialGradient id={`cos-sun-${seed}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffd9a0" />
            <stop offset="0.35" stopColor="#ee5a35" />
            <stop offset="1" stopColor="#ee5a35" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`cos-sea-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0b890" stopOpacity="0.55" />
            <stop offset="1" stopColor="#5a6a8c" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {Array.from({ length: 34 }, (_, k) => (
          <circle
            key={`s${k}`}
            cx={((k * 97 + seed * 13) % (MAP_W - 20)) + 10}
            cy={((k * 61 + seed * 7) % (MAP_H * 0.62)) + 8}
            r={k % 5 === 0 ? 1.5 : 0.8}
            className="tb-star"
            style={{ animationDelay: `${(k % 7) * 0.6}s` }}
          />
        ))}
        <circle cx={MAP_W * 0.5} cy={MAP_H * 0.8} r="46" fill={`url(#cos-sun-${seed})`} className="tb-sun" />
        <circle cx={MAP_W * 0.5} cy={MAP_H * 0.8} r="15" className="tb-sundisc" />
        <rect x="0" y={MAP_H * 0.72} width={MAP_W} height={MAP_H * 0.28} fill={`url(#cos-sea-${seed})`} className="tb-sea" />
        <path className="tb-drift" d={`M-30 ${MAP_H * 0.77}Q40 ${MAP_H * 0.74} 100 ${MAP_H * 0.77}T220 ${MAP_H * 0.77}T340 ${MAP_H * 0.77}T460 ${MAP_H * 0.77}`} />
        <path className="tb-drift tb-drift-2" d={`M-30 ${MAP_H * 0.83}Q50 ${MAP_H * 0.8} 120 ${MAP_H * 0.83}T250 ${MAP_H * 0.83}T380 ${MAP_H * 0.83}T500 ${MAP_H * 0.83}`} />
        <path d={RIDGE} className="tb-ridge" />
        {topics.map((t, i) => {
          const [x, y] = spots[i] ?? [0, 0]
          const k = ratio(byTopic.get(t.id))
          const arm = 7 + 20 * k
          return link(
            t,
            i,
            <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <circle r="22" fill="transparent" />
              <g className="tb-twinkle" style={{ animationDelay: `${(i * 1.3) % 5}s` }}>
                {k > 0 && (
                  <>
                    <line x1={-arm} x2={arm} className="tb-ray" />
                    <line y1={-arm} y2={arm} className="tb-ray" />
                  </>
                )}
                <circle r={k >= 1 ? 4.2 : k > 0 ? 3.2 : 2.4} className={k > 0 ? 'tb-fill' : 'tb-cell tb-dim'} />
                {k > 0 && <circle r={k >= 1 ? 8 : 6} className="tb-halo" />}
                {k === 0 && <circle r="6" className="tb-edge tb-dashed" />}
              </g>
              <text x="0" y="-12" textAnchor="middle" className="tb-num">
                {i + 1}
              </text>
            </g>,
          )
        })}
      </>
    )
  }

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className={`map-sheet tb tb-${world} block h-auto w-full`} aria-label={`Painel de ${title}`}>
      {body}
    </svg>
  )
}
