import { useId } from 'react'
import type { World } from '../core/modules'
import { pie } from '../core/geometry'
import type { Progress } from '../core/queries'

const ratioOf = (p?: Progress) => (p && p.total > 0 ? p.done / p.total : 0)

// Círculo de controle: vazio (não iniciado), com fatia (em andamento), cheio (concluído).
export function ControlMark({ p, size = 20, filled }: { p?: Progress; size?: number; filled?: boolean }) {
  const r = filled ? 1 : ratioOf(p)
  return (
    <svg width={size} height={size} viewBox="-12 -12 24 24" aria-hidden="true" className="shrink-0 text-accent">
      <circle r="9.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      {r > 0 && <path d={pie(5.6, r)} fill="currentColor" />}
    </svg>
  )
}

// Arco de nicho: o dourado sobe de baixo para cima conforme o tópico avança.
export function ArchMark({ p, size = 40, filled }: { p?: Progress; size?: number; filled?: boolean }) {
  const r = filled ? 1 : ratioOf(p)
  const clip = useId()
  const arch = 'M2 23V10a8 8 0 0116 0v13z'
  return (
    <svg width={size * 0.8} height={size} viewBox="0 0 20 25" aria-hidden="true" className="shrink-0 text-accent">
      <clipPath id={clip}>
        <path d={arch} />
      </clipPath>
      {r > 0 && <rect x="0" y={23 - 21 * r} width="20" height={21 * r} fill="currentColor" clipPath={`url(#${clip})`} />}
      <path d={arch} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

// Sol nascendo atrás do horizonte (cosmos): o disco sobe e se enche de brasa conforme o tópico avança.
export function SunMark({ p, size = 20, filled }: { p?: Progress; size?: number; filled?: boolean }) {
  const r = filled ? 1 : ratioOf(p)
  const clip = useId()
  return (
    <svg width={size} height={size} viewBox="-12 -12 24 24" aria-hidden="true" className="shrink-0 text-accent">
      <clipPath id={clip}>
        <circle r="8.2" />
      </clipPath>
      {r > 0 && <rect x="-9" y={8.2 - 16.4 * r} width="18" height="17" fill="currentColor" clipPath={`url(#${clip})`} />}
      <circle r="8.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M-11.5 4.6H11.5" stroke="currentColor" strokeWidth="1" opacity="0.65" />
      {r >= 1 && <path d="M0-11.5v2.4M0 9.1v2.4M-11.5 0h2.4M9.1 0h2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />}
    </svg>
  )
}

// Painel colorido do pôster de Cowboy Bebop: o bloco se enche de baixo para cima, com hachura enquanto está pela metade.
export function BlockMark({ p, size = 20, filled }: { p?: Progress; size?: number; filled?: boolean }) {
  const r = filled ? 1 : ratioOf(p)
  const clip = useId()
  return (
    <svg width={size} height={size} viewBox="-12 -12 24 24" aria-hidden="true" className="shrink-0 text-accent">
      <clipPath id={clip}>
        <rect x="-9.5" y="-9.5" width="19" height="19" />
      </clipPath>
      {r > 0 && <rect x="-9.5" y={9.5 - 19 * r} width="19" height="19" fill="currentColor" clipPath={`url(#${clip})`} />}
      {r > 0 && r < 1 && <path d="M-12 12L12-12M-12 6L6-12M-6 12L12-6" stroke="var(--bg)" strokeWidth="1.2" opacity="0.55" clipPath={`url(#${clip})`} />}
      <rect x="-9.5" y="-9.5" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

// Hexágono do Evangelion: o preenchimento sobe de baixo para cima.
export function HexMark({ p, size = 20, filled }: { p?: Progress; size?: number; filled?: boolean }) {
  const r = filled ? 1 : ratioOf(p)
  const clip = useId()
  const hex = 'M0-10.5L9.1-5.25V5.25L0 10.5-9.1 5.25V-5.25Z'
  return (
    <svg width={size} height={size} viewBox="-12 -12 24 24" aria-hidden="true" className="shrink-0 text-accent">
      <clipPath id={clip}>
        <path d={hex} />
      </clipPath>
      {r > 0 && <rect x="-12" y={10.5 - 21 * r} width="24" height="22" fill="currentColor" clipPath={`url(#${clip})`} />}
      <path d={hex} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

// Grade 3×3 de retícula do mundo office: um pixel aceso a cada nona parte concluída.
export function PixelMark({ p, size = 20, filled }: { p?: Progress; size?: number; filled?: boolean }) {
  const r = filled ? 1 : ratioOf(p)
  const lit = r >= 1 ? 9 : Math.floor(r * 9 + (r > 0 ? 0.999 : 0))
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 text-accent">
      {Array.from({ length: 9 }, (_, i) => (
        <rect
          key={i}
          x={1.5 + (i % 3) * 7.5}
          y={1.5 + Math.floor(i / 3) * 7.5}
          width="6"
          height="6"
          fill={i < lit ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.3"
          opacity={i < lit ? 1 : 0.55}
        />
      ))}
    </svg>
  )
}

export function ProgressMark({ world, ...props }: { world: World; p?: Progress; size?: number; filled?: boolean }) {
  if (world === 'sacro') return <ArchMark {...props} />
  if (world === 'eva') return <HexMark {...props} />
  if (world === 'office') return <PixelMark {...props} />
  if (world === 'cosmos') return <SunMark {...props} />
  if (world === 'bebop') return <BlockMark {...props} />
  return <ControlMark {...props} />
}

// Um traço por item do checklist, como um código de barras: cheio quando marcado.
export function Punches({ p, max = 20 }: { p: Progress; max?: number }) {
  if (p.total === 0) return null
  if (p.total > max) {
    const pct = Math.round((p.done / p.total) * 100)
    return <span className="mono text-xs text-ink-3">{pct}%</span>
  }
  return (
    <span className="flex flex-wrap items-end gap-[2px]" aria-hidden="true">
      {Array.from({ length: p.total }, (_, i) => (
        <span key={i} className={`h-3 w-[3px] rounded-[1px] ${i < p.done ? 'bg-accent' : 'bg-ink-3/45'}`} />
      ))}
    </span>
  )
}

export function Fraction({ p, className = '' }: { p: Progress; className?: string }) {
  return (
    <span className={`mono text-ink-2 ${className}`}>
      {p.done}/{p.total}
    </span>
  )
}

// Estrela de quatro pontas: o glifo comum do app, vindo das capas e dos pôsteres.
export function Sparkle({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" fill="currentColor" />
    </svg>
  )
}

// Órbitas cruzadas com a estrela no meio, desenhadas a traço como nas capas de referência.
export function Orbit({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="100" cy="62" r="46" />
      <circle cx="100" cy="100" r="46" />
      <circle cx="100" cy="138" r="46" />
      <ellipse cx="100" cy="100" rx="92" ry="22" opacity="0.6" />
      <path
        d="M100 52c2.4 25 22.6 45.6 48 48-25.4 2.4-45.6 23-48 48-2.4-25-22.6-45.6-48-48 25.4-2.4 45.6-23 48-48z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}
