import { useState, type CSSProperties } from 'react'
import fim from '../../assets/ia/ia-vermelha-virada-fim.jpg'
import inicio from '../../assets/ia/ia-vermelha-virada-inicio.jpg'
import virada from '../../assets/ia/ia-vermelha-virada.mp4'
import { justArrived } from './alienTurnIn'

// O alien da IA vira de frente para quem entra no módulo: toca uma vez e para no último quadro.
// Com "reduzir movimento", ou se o vídeo não abrir, ele já aparece de frente.
export function AlienTurn({ className, style }: { className?: string; style?: CSSProperties }) {
  const [still, setStill] = useState(() => justArrived() || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  if (still) return <img src={fim} alt="" decoding="async" className={className} style={style} />
  return <video src={virada} poster={inicio} autoPlay muted playsInline preload="auto" aria-hidden="true" tabIndex={-1} className={className} style={style} onError={() => setStill(true)} />
}
