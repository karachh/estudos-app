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

// Faixa preta vertical com o nome em letreiro, como na capa de referência.
export function Band({ title, foot }: { title: string; foot: string }) {
  return (
    <div className="band">
      <span className="band-title gloock text-accent" style={{ '--len': title.length } as CSSProperties}>
        {title}
      </span>
      <span className="fine band-foot text-accent">
        <Sparkle size={12} />
        {foot}
      </span>
    </div>
  )
}
