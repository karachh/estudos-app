import { useMemo } from 'react'
import type { Topic } from '../core/db'
import type { World } from '../core/modules'
import type { Progress } from '../core/queries'
import { MAP_H, MAP_W, placeControls } from '../core/terrain'
import { sumProgress } from '../core/queries'

// Painel de cada tema no lugar do mapa de orientação: eva = favo de hexágonos (painel de sincronia),
// office = mural de papel pardo com retícula colorida, psico = céu de olhos que piscam. Os tópicos continuam clicáveis em qualquer ordem.

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

export function ThemeBoard(props: Props) {
  const { world, seed, title, moduleId, topics, byTopic, lit, onLight } = props
  const spots = useMemo(() => (world === 'psico' ? placeControls(topics.length, seed) : []), [world, topics.length, seed])
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
    body = (
      <>
        {[1, 2, 3].map((k) => (
          <ellipse key={k} cx={MAP_W / 2} cy={MAP_H * 0.9} rx={70 * k + 30} ry={22 * k + 10} className="tb-ring" />
        ))}
        {/* céu estrelado do pôster */}
        {Array.from({ length: 26 }, (_, k) => (
          <circle
            key={`s${k}`}
            cx={((k * 97 + seed * 13) % (MAP_W - 20)) + 10}
            cy={((k * 61 + seed * 7) % (MAP_H * 0.7)) + 8}
            r={k % 5 === 0 ? 1.6 : 0.9}
            className="tb-star"
            style={{ animationDelay: `${(k % 7) * 0.6}s` }}
          />
        ))}
        {topics.map((t, i) => {
          const [x, y] = spots[i] ?? [0, 0]
          const k = ratio(byTopic.get(t.id))
          const iris = k > 0 ? 4 + 8 * k : 3
          return link(
            t,
            i,
            <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <circle r="24" fill="transparent" />
              <g className="tb-blink" style={{ animationDelay: `${(i * 1.7) % 6}s` }}>
                <path d="M-22 0Q0-21 22 0Q0 21-22 0Z" className="tb-cell tb-eye" />
                <circle r={iris} className="tb-fill" />
                <circle r={Math.max(1.8, iris * 0.38)} className="tb-pupil" />
              </g>
              <text x="0" y="-16" textAnchor="middle" className="tb-num">
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
