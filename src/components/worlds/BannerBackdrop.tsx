import { useRef, type CSSProperties, type PointerEvent } from 'react'
import swordfishPixel from '../../assets/bebop/swordfish-pixel.png'
import evaAberta from '../../assets/eva/eva-lua-boca-aberta.jpg'
import evaMeia from '../../assets/eva/eva-lua-boca-meia.jpg'
// Banner da página inicial: o alien de perfil, com o enquadramento do vídeo da virada, que toca ali mesmo ao abrir (alienTurnIn.ts)
import iaBrilho from '../../assets/ia/ia-vermelha-brilho-banner.jpg'
import iaPerfil from '../../assets/ia/ia-vermelha-banner.jpg'
import officeTeam from '../../assets/trabalho/banner-equipe.jpg'
import type { AppModule } from '../../core/modules'
import { backdrops } from '../../data/backdrops'

import { BEBOP_TONES } from './tones'
import { Hexes, InkFilter, PixelShake, Radar, Stars } from './headers'

/* ---------- Fundos dos banners da página inicial ---------- */

// Mesmos enfeites dos cabeçalhos, soltos atrás da faixa e da etiqueta do banner.
export function BannerBackdrop({ world }: { world: AppModule['world'] }) {
  if (world === 'fosforo') {
    return (
      <div className="banner-theme" aria-hidden="true">
        <img src={backdrops.profissional.images[1].src} alt="" className="bt-ph-img" loading="lazy" decoding="async" />
        <Radar className="bt-ph-radar" />
        <PixelShake className="bt-ph-sprite" />
        <span className="bt-ph-side">PENSAMENTOS SÃO PROGRAMAS · RODE OS SEUS COM CUIDADO · PENSAMENTOS SÃO PROGRAMAS ·</span>
        <span className="ph-crt" />
      </div>
    )
  }
  if (world === 'bebop') {
    return (
      <div className="banner-theme" aria-hidden="true">
        <InkFilter />
        <Stars n={44} seed={2} className="bb-stars" />
        <img src={backdrops.cultura.images[0].src} alt="" className="bt-bb-bg" loading="lazy" decoding="async" />
        <span className="bt-bb-wash" />
        <span className="bt-bb-blocks">
          {BEBOP_TONES.slice(0, 4).map((c, i) => (
            <i key={c} style={{ '--c': c, '--i': i } as CSSProperties} />
          ))}
        </span>
        <DragShip />
      </div>
    )
  }
  if (world === 'eva') {
    return (
      <div className="banner-theme" aria-hidden="true">
        <Hexes />
        <span className="eva-glow" />
        {/* Três quadros da mesma pintura (boca fechada, meia e aberta, com o olho vermelho) trocados aos trancos,
            como animatrônico. O fechado fica sempre embaixo; os outros só se acendem por cima, sem buraco entre eles. */}
        <span className="bt-img eva-stack">
          <img src={backdrops.uem.images[3].src} alt="" decoding="async" />
          <img src={evaMeia} alt="" className="eva-f1" decoding="async" />
          <img src={evaAberta} alt="" className="eva-f2" decoding="async" />
        </span>
        <span className="bt-kanji" lang="ja">
          新世紀
        </span>
        <span className="bt-alert" lang="ja">
          警報
        </span>
        <span className="eva-tab">I MUST (NOT) RUN AWAY</span>
      </div>
    )
  }
  if (world === 'neural') {
    return (
      <div className="banner-theme" aria-hidden="true">
        <span className="nr-glow" />
        {/* O robô respira e a tinta vermelha pulsa; o filtro de filme fica parado por cima */}
        <span className="bt-nr-stack">
          <span className="bt-nr-robot">
            <img src={iaPerfil} alt="" loading="lazy" decoding="async" />
            <img src={iaBrilho} alt="" className="bt-nr-glow" loading="lazy" decoding="async" />
          </span>
          <span className="bt-nr-film" />
        </span>
        <span className="nr-sweep" />
      </div>
    )
  }
  if (world === 'office') {
    return (
      <div className="banner-theme" aria-hidden="true">
        <span className="office-halftone" />
        <img src={officeTeam} alt="" className="bt-img bt-office-img" loading="lazy" decoding="async" />
      </div>
    )
  }
  return null
}

// A Swordfish II do banner do Repertório, em pixel art (gerada da imagem original): dá para pegar e arrastar com o mouse (ou o dedo). Ela inclina conforme a
// velocidade do arrasto e fica onde foi solta; é de lá que ela parte quando o módulo é aberto (flyIn em HomePage.tsx).
function DragShip() {
  const drag = useRef<{ x: number; y: number; dx: number; dy: number; lastX: number; t: number } | null>(null)
  const pos = useRef({ x: 0, y: 0 })
  const down = (e: PointerEvent<HTMLImageElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    e.currentTarget.dataset.drag = ''
    drag.current = { x: e.clientX, y: e.clientY, dx: pos.current.x, dy: pos.current.y, lastX: e.clientX, t: performance.now() }
  }
  const move = (e: PointerEvent<HTMLImageElement>) => {
    const d = drag.current
    if (!d) return
    pos.current = { x: d.dx + e.clientX - d.x, y: d.dy + e.clientY - d.y }
    const now = performance.now()
    const v = (e.clientX - d.lastX) / Math.max(1, now - d.t) // px por ms
    d.lastX = e.clientX
    d.t = now
    const el = e.currentTarget
    el.style.translate = `${pos.current.x}px ${pos.current.y}px`
    el.style.rotate = `${Math.max(-18, Math.min(18, v * 9)).toFixed(1)}deg`
  }
  const up = (e: PointerEvent<HTMLImageElement>) => {
    drag.current = null
    delete e.currentTarget.dataset.drag
    e.currentTarget.style.rotate = '0deg'
  }
  return (
    <img
      src={swordfishPixel}
      alt=""
      className="swordfish bt-ship pixel"
      draggable={false}
      loading="lazy"
      decoding="async"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    />
  )
}
