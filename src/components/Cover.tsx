import type { CSSProperties } from 'react'
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
export function Band({ title, foot, world = 'home', pct = 0 }: { title: string; foot: string; world?: string; pct?: number }) {
  return (
    <div className={`band band-${world}`} style={{ '--len': title.length, '--pct': `${Math.round(pct * 100)}%` } as CSSProperties}>
      <span className="band-glow" aria-hidden="true" />
      <span className="band-meter" aria-hidden="true">
        <i />
      </span>
      <Sparkle size={13} className="band-star twinkle" />
      <span className="band-title gloock text-accent">{title}</span>
      <span className="fine band-foot text-accent">
        <Sparkle size={12} />
        {foot}
      </span>
    </div>
  )
}
