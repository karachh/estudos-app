import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react'
import type { Artwork } from '../data/art'
import { Sparkle } from './Marks'

// Foto com cara de filme analógico: cores lavadas, pretos levantados, vinheta e grão.
export function Film({ art, eager }: { art: Artwork; eager?: boolean }) {
  return (
    <>
      <img
        src={art.src}
        alt=""
        className="film-img"
        style={{ objectPosition: art.position }}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      <span className="film-lift" aria-hidden="true" />
      <span className="film-fade" aria-hidden="true" />
    </>
  )
}

// Faixa preta vertical com o nome em letreiro, como na capa de referência. Cada mundo veste a faixa à sua
// maneira (`band-<mundo>` em index.css e worlds.css) e o medidor lateral mostra o progresso do módulo.
export function Band({
  title,
  foot,
  world = 'home',
  pct = 0,
  footStar = true,
  topStar = true,
  letters = false,
}: {
  title: string
  foot: string
  world?: string
  pct?: number
  footStar?: boolean
  topStar?: boolean
  letters?: boolean // as letras do título sobem onde o mouse passa (só na capa)
}) {
  return (
    <div className={`band band-${world}`} style={{ '--len': title.length, '--pct': `${Math.round(pct * 100)}%` } as CSSProperties}>
      <span className="band-glow" aria-hidden="true" />
      <span className="band-meter" aria-hidden="true">
        <i />
      </span>
      {topStar && <Sparkle size={13} className="band-star twinkle" />}
      <span className="band-title gloock text-accent">
        {letters ? <BumpTitle title={title} /> : title}
      </span>
      <span className="fine band-foot text-accent">
        {footStar && <Sparkle size={12} />}
        {foot}
      </span>
    </div>
  )
}

// Relevo: o título está sobre uma plataforma e o mouse é uma lombada que passa por baixo. Cada letra sobe conforme
// a distância até o cursor (curva em sino), então a vizinha também levanta um pouco (ver .bump em index.css).
// Ao abrir a página, a lombada passa sozinha uma vez da primeira à última letra; mexer o mouse interrompe.
function BumpTitle({ title }: { title: string }) {
  const box = useRef<HTMLSpanElement>(null)
  const auto = useRef(0) // quadro da passada automática (0 = parada)

  const lift = (x: number | null) => {
    const el = box.current
    if (!el) return
    const letters = Array.from(el.querySelectorAll<HTMLElement>('.bump-l'))
    const spread = (el.offsetWidth / letters.length) * 0.85
    for (const l of letters) {
      const d = x === null ? Infinity : (l.offsetLeft + l.offsetWidth / 2 - x) / spread
      l.style.setProperty('--w', x === null ? '0' : Math.exp(-d * d).toFixed(3))
    }
  }

  useEffect(() => {
    const el = box.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const delay = 950 // depois que a faixa termina de entrar
    const dur = 1700
    const t0 = performance.now() + delay
    const step = (now: number) => {
      const t = (now - t0) / dur
      if (t < 0) return void (auto.current = requestAnimationFrame(step))
      if (t > 1) {
        auto.current = 0
        return lift(null)
      }
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
      const pad = el.offsetWidth / title.length
      lift(-pad + e * (el.offsetWidth + 2 * pad))
      auto.current = requestAnimationFrame(step)
    }
    auto.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(auto.current)
  }, [title])

  const move = (e: PointerEvent) => {
    const el = box.current
    if (e.pointerType !== 'mouse' || !el) return
    if (auto.current) {
      cancelAnimationFrame(auto.current)
      auto.current = 0
    }
    lift(e.clientX - el.getBoundingClientRect().left)
  }
  return (
    <span ref={box} className="bump" onPointerMove={move} onPointerLeave={() => lift(null)}>
      <span className="sr-only">{title}</span>
      <span className="bump-row" aria-hidden="true">
        {[...title].map((c, i) => (
          <span key={i} className="bump-l">
            {c}
          </span>
        ))}
      </span>
    </span>
  )
}
