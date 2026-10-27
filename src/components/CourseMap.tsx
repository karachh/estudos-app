import { useMemo, type CSSProperties } from 'react'
import type { Topic } from '../core/db'
import type { Progress } from '../core/queries'
import { MAP_H, MAP_W, START, placeControls, terrain } from '../core/terrain'
import { pie } from '../core/geometry'

// Mapa de uma prova por pontuação: os controles (tópicos) ficam espalhados e podem ser visitados em qualquer ordem.
export function CourseMap({
  seed,
  title,
  moduleId,
  topics,
  byTopic,
  lit,
  onLight,
}: {
  seed: number
  title: string
  moduleId: string
  topics: Topic[]
  byTopic: Map<number, Progress>
  lit: number | null
  onLight: (id: number | null) => void
}) {
  const land = useMemo(() => terrain(seed), [seed])
  const spots = useMemo(() => placeControls(topics.length, seed), [topics.length, seed])
  const marshId = `marsh-${seed}`
  const dotsId = `dots-${seed}`

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="map-sheet block h-auto w-full" aria-label={`Mapa de ${title}`}>
      <defs>
        <pattern id={marshId} width="6" height="4" patternUnits="userSpaceOnUse">
          <path d="M0 2h4" stroke="var(--accent)" strokeWidth="1" />
        </pattern>
        {/* Retícula de impressão para a mata */}
        <pattern id={dotsId} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <circle cx="2.5" cy="2.5" r="1.1" fill="var(--t-dots)" />
        </pattern>
      </defs>

      <g aria-hidden="true">
        {land.openLand.map((d, i) => (
          <path key={`o${i}`} d={d} fill="var(--t-open)" />
        ))}
        {land.thickets.map((d, i) => (
          <path key={`t${i}`} d={d} fill={`url(#${dotsId})`} />
        ))}
        {land.marsh.map((d, i) => (
          <path key={`m${i}`} d={d} fill={`url(#${marshId})`} opacity="0.5" />
        ))}
        {land.contours.map((c, i) => (
          <path key={`c${i}`} d={c.d} className={`contour ${c.index ? 'index' : ''}`} />
        ))}
        <path d={land.trail} fill="none" stroke="var(--t-trail)" strokeWidth="1.3" strokeDasharray="6 4" opacity="0.7" />
        {/* Linhas de norte magnético */}
        {[80, 180, 280, 380].map((x) => (
          <line key={x} x1={x} y1="0" x2={x - 18} y2={MAP_H} stroke="var(--t-contour)" strokeWidth="0.6" opacity="0.3" />
        ))}
        {/* Norte: a estrela de quatro pontas do app */}
        <path
          d={`M${MAP_W - 22} 10c.5 5 4.5 9 9.5 9.5-5 .5-9 4.5-9.5 9.5-.5-5-4.5-9-9.5-9.5 5-.5 9-4.5 9.5-9.5z`}
          fill="var(--ink-2)"
        />
        <path
          d={`M${START.x} ${START.y - 13}L${START.x + 11.5} ${START.y + 7}H${START.x - 11.5}Z`}
          fill="none"
          stroke="var(--bg)"
          strokeWidth="7"
          strokeLinejoin="round"
        />
        <path
          d={`M${START.x} ${START.y - 13}L${START.x + 11.5} ${START.y + 7}H${START.x - 11.5}Z`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
      </g>

      {topics.map((t, i) => {
        const [x, y] = spots[i]
        const p = byTopic.get(t.id) ?? { done: 0, total: 0 }
        const r = p.total ? p.done / p.total : 0
        const labelLeft = x > MAP_W - 50
        return (
          <a
            key={t.id}
            href={`#/${moduleId}/t/${t.id}`}
            className={`control ${lit === t.id ? 'lit' : ''}`}
            aria-label={`${i + 1}. ${t.title}: ${p.done} de ${p.total}`}
            onMouseEnter={() => onLight(t.id)}
            onMouseLeave={() => onLight(null)}
            onFocus={() => onLight(t.id)}
            onBlur={() => onLight(null)}
          >
            <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <g className="land" style={{ '--i': i } as CSSProperties}>
                <circle r="22" fill="transparent" />
                <circle r="12" className="halo" />
                <circle r="12" className="ring" />
                {r > 0 && <path d={pie(7, r)} fill="var(--accent)" />}
                <circle r="18" className="focus-ring" />
              </g>
              <text x={labelLeft ? -17 : 16} y="-11" textAnchor={labelLeft ? 'end' : 'start'} className="num">
                {i + 1}
              </text>
            </g>
          </a>
        )
      })}
    </svg>
  )
}
