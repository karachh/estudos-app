import type { Progress } from '../core/queries'

// Barra contínua de progresso, na cor do módulo.
export function Meter({ p, className = '' }: { p: Progress; className?: string }) {
  const pct = p.total ? (p.done / p.total) * 100 : 0
  return (
    <div
      className={`h-1.5 overflow-hidden rounded-full bg-line ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={p.total}
      aria-valuenow={p.done}
    >
      <div className="fill h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
    </div>
  )
}

// Um segmento por tópico: mostra de uma vez quais tópicos de um grupo estão perto de fechar.
export function SegmentBar({ ratios, className = '' }: { ratios: number[]; className?: string }) {
  if (ratios.length === 0) return <div className={`h-1.5 rounded-full bg-line ${className}`} />
  return (
    <div className={`flex gap-1 ${className}`} aria-hidden="true">
      {ratios.map((r, i) => (
        <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
          <div className="fill h-full bg-accent" style={{ width: `${r * 100}%` }} />
        </div>
      ))}
    </div>
  )
}

export function Fraction({ p }: { p: Progress }) {
  return (
    <span className="tabular-nums text-ink-2">
      {p.done}/{p.total}
    </span>
  )
}
