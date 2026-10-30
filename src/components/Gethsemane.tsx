import type { CSSProperties } from 'react'
import getsemani from '../assets/igreja/getsemani.jpg'

// Capa da Igreja: Cristo no Getsêmani (Heinrich Hofmann). A pintura fica quieta, como ele rezando; o que vive é a luz.
// A claridade do céu (alto à esquerda) pulsa e desce num feixe até o rosto, com poeira dourada flutuando dentro dele;
// a pedra sob as mãos respira como luz de vela, a neblina passa rente ao chão e o quadro se aproxima devagar.
// O palco tem a proporção da pintura e cobre a caixa como object-fit: cover; --fx/--fy fazem o papel de object-position.
// Com "reduzir movimento" ligado, tudo fica parado (ver .gth em worlds.css).
const motes = [
  [24, 10, 0, 9], [28, 16, 2.2, 11], [31, 12, 4.8, 10], [26, 21, 1.1, 12], [34, 19, 6.3, 9], [30, 25, 3.4, 13],
  [37, 24, 7.9, 10], [33, 29, 5.6, 11], [22, 15, 8.8, 12], [39, 28, 0.7, 10], [29, 8, 9.6, 11], [35, 14, 3.9, 12],
]

export function Gethsemane({ fx = 0.5, fy = 0.26, className = '' }: { fx?: number; fy?: number; className?: string }) {
  return (
    <div className={`gth ${className}`} aria-hidden="true">
      <div className="gth-stage" style={{ '--fx': fx, '--fy': fy } as CSSProperties}>
        <img className="gth-img" src={getsemani} alt="" decoding="async" />
        <span className="gth-beam" />
        <span className="gth-sky" />
        <span className="gth-rock" />
        <span className="gth-mist" />
        {motes.map(([x, y, d, t], i) => (
          <span key={i} className="gth-mote" style={{ '--x': `${x}%`, '--y': `${y}%`, '--d': `${d}s`, '--t': `${t}s` } as CSSProperties} />
        ))}
      </div>
    </div>
  )
}
