import { useRef, type CSSProperties, type PointerEvent } from 'react'
import swordfish from '../assets/bebop/swordfish.png'
import swordfishPixel from '../assets/bebop/swordfish-pixel.png'
import evaAberta from '../assets/eva/eva-lua-boca-aberta.jpg'
import evaMeia from '../assets/eva/eva-lua-boca-meia.jpg'
import face1 from '../assets/trabalho/face-1.jpg'
import face2 from '../assets/trabalho/face-2.jpg'
import face3 from '../assets/trabalho/face-3.jpg'
import face4 from '../assets/trabalho/face-4.jpg'
import face5 from '../assets/trabalho/face-5.jpg'
import type { AppModule } from '../core/modules'
import { plural } from '../core/geometry'
import { backdrops } from '../data/backdrops'
import { Sparkle } from './Marks'

// Cabeçalhos dos quatro mundos que trocam só a pele do mapa: cosmos (Profissional), bebop (Repertório),
// eva (UEM) e office (Trabalho). Os enfeites são aria-hidden; o texto de verdade é o h1 e a tagline.

type HeaderProps = { mod: AppModule; groupCount: number; pct?: number }

const count = (mod: AppModule, n: number) => `${n} ${n === 1 ? mod.groupLabel : plural(mod.groupLabel)}`

// Estrelas fixas (posição sorteada pela semente, para não mudar a cada desenho) que piscam cada uma no seu tempo
export function Stars({ n = 28, seed = 1, className = '' }: { n?: number; seed?: number; className?: string }) {
  return (
    <span className={`sky-stars ${className}`} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <i
          key={i}
          style={
            {
              left: `${(i * 37 + seed * 11) % 100}%`,
              top: `${(i * 53 + seed * 7 + (i % 3) * 9) % 100}%`,
              '--s': i % 7 === 0 ? '3px' : i % 3 === 0 ? '2px' : '1.5px',
              '--d': `${((i * 0.73) % 4).toFixed(2)}s`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  )
}

// Cruz de luz fina de uma estrela (das referências do Profissional): duas linhas que atravessam o quadro e pulsam
export function Flare({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <span className={`flare ${className}`} style={style} aria-hidden="true">
      <i className="flare-v" />
      <i className="flare-h" />
      <Sparkle size={22} className="flare-core" />
    </span>
  )
}

/* ---------- Cosmos (Profissional): o sol vermelho sobre o mar de nuvens ---------- */

export function CosmosHeader({ mod, groupCount, pct = 0 }: HeaderProps) {
  return (
    <div className="cos-poster" style={{ '--len': mod.short.length, '--orbit': `${pct}%` } as CSSProperties}>
      <img src={backdrops.profissional.images[1].src} alt="" className="cos-art" aria-hidden="true" />
      <span className="cos-mist" aria-hidden="true" />
      <span className="cos-mist cos-mist-2" aria-hidden="true" />
      <Stars n={34} seed={3} className="cos-stars" />
      <Flare className="cos-flare" />
      <span className="cos-side" aria-hidden="true">
        OBSERVATÓRIO · ROTA DE DADOS + IA
      </span>
      <div className="cos-copy">
        <p className="cos-kicker" aria-hidden="true">
          <Sparkle size={11} className="twinkle" /> Observatório
        </p>
        <h1 className="cos-title">{mod.short}</h1>
        <p className="cos-tag">{mod.tagline}</p>
        <div className="cos-meta" aria-hidden="true">
          <span className="cos-chip">{count(mod, groupCount)}</span>
          <span className="cos-orbit">
            <span>ÓRBITA</span>
            <span className="cos-orbit-track">
              <i />
            </span>
            <span>{String(pct).padStart(3, '0')}%</span>
          </span>
        </div>
      </div>
    </div>
  )
}

/* ---------- Bebop (Repertório): pôster de Cowboy Bebop com a Swordfish II cruzando o quadro ---------- */

// Filtro que come a tinta das letras em pontinhos, como o letreiro impresso dos pôsteres
export function InkFilter() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <filter id="bb-ink" x="-2%" y="-5%" width="104%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="5" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -7 5.5" result="holes" />
        <feComposite in="SourceGraphic" in2="holes" operator="in" />
      </filter>
    </svg>
  )
}

const VU = ['#f2c230', '#3c8d4a', '#d9382c', '#e8761e', '#3b7de0']

export function BebopHeader({ mod, groupCount }: HeaderProps) {
  return (
    <div className="bb-poster" style={{ '--len': mod.short.length } as CSSProperties}>
      <InkFilter />
      <Stars n={30} seed={5} className="bb-stars" />
      <span className="bb-frame" aria-hidden="true" />
      <figure className="bb-art" aria-hidden="true">
        <img src={backdrops.cultura.images[0].src} alt="" />
        <span className="bb-art-scan" />
      </figure>
      <img src={swordfish} alt="" className="swordfish bb-ship" aria-hidden="true" />
      <div className="bb-copy">
        <p className="bb-kicker" aria-hidden="true">
          Session {String(groupCount).padStart(2, '0')} · Repertório
        </p>
        <h1 className="bb-title">{mod.short}</h1>
        <p className="bb-kana" lang="ja" aria-hidden="true">
          レパートリー
        </p>
        <p className="bb-tag">{mod.tagline}</p>
        <div className="bb-meta" aria-hidden="true">
          <span className="bb-vu">
            {VU.map((c, i) => (
              <i key={c} style={{ '--c': c, '--i': i } as CSSProperties} />
            ))}
          </span>
          <span className="bb-chip">{count(mod, groupCount)}</span>
        </div>
      </div>
      <p className="bb-ticker" aria-hidden="true">
        <span>See you space cowboy… &nbsp; See you space cowboy… &nbsp; See you space cowboy… &nbsp; See you space cowboy… &nbsp;</span>
      </p>
    </div>
  )
}

/* ---------- Eva: pôster de anime, NERV e kanji ---------- */

export function Hexes() {
  return (
    <svg className="eva-hex" aria-hidden="true">
      <defs>
        <pattern id="eva-hexp" width="28" height="48.5" patternUnits="userSpaceOnUse" patternTransform="scale(1.3)">
          <path d="M14 0l14 8.1v16.2L14 32.4 0 24.3V8.1zM0 32.4l14 8.1v8M28 32.4l-14 8.1" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#eva-hexp)" />
    </svg>
  )
}

export function EvaHeader({ mod, groupCount, pct = 0 }: HeaderProps) {
  const n = String(groupCount).padStart(2, '0')
  return (
    <div className="eva-panel" style={{ '--len': mod.short.length, '--sync': `${pct}%` } as CSSProperties}>
      <Hexes />
      <span className="eva-glow" aria-hidden="true" />
      <img src={backdrops.uem.images[3].src} alt="" className="eva-art" aria-hidden="true" />
      <span className="eva-sweep" aria-hidden="true" />
      <span className="eva-tab" aria-hidden="true">
        I MUST (NOT) RUN AWAY
      </span>

      <div className="eva-grid">
        <div className="eva-copy">
          <p className="eva-kicker" aria-hidden="true">
            NEON GENESIS · NERV
            <span className="eva-kicker-ja" lang="ja">
              新世紀
            </span>
          </p>
          <h1 className="eva-title">{mod.short}</h1>
          <p className="eva-tag">{mod.tagline}</p>

          <div className="eva-meta" aria-hidden="true">
            <div className="eva-unit">
              <span className="eva-unit-label">UNIT</span>
              <span className="eva-unit-num">{n}</span>
              <span className="eva-unit-label">{groupCount === 1 ? mod.groupLabel : plural(mod.groupLabel)}</span>
            </div>
            <div className="eva-sync">
              <span className="eva-sync-head">
                <span>SYNC RATE</span>
                <span className="eva-sync-pct">{String(pct).padStart(3, '0')}%</span>
              </span>
              <span className="eva-sync-bar">
                <span />
              </span>
              <span className="eva-warns">
                <span lang="ja">警告 WARNING</span>
                <span lang="ja">非常事態 EMERGENCY</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Office: pôster de The Office em papel pardo ---------- */

const faces = [
  { src: face1, name: 'Prison Mike' },
  { src: face2, name: 'Jim Halpert' },
  { src: face3, name: 'Dwight Schrute' },
  { src: face4, name: 'Pam Beesly' },
  { src: face5, name: 'Michael Scott' },
]

export function OfficeHeader({ mod }: HeaderProps) {
  return (
    <div className="office-poster" style={{ '--len': mod.short.length } as CSSProperties}>
      <span className="office-halftone" aria-hidden="true" />
      <div className="office-head">
        <div className="office-copy">
          <h1 className="office-title">{mod.short}</h1>
        </div>
      </div>
      <ul className="office-faces" aria-hidden="true">
        {faces.map((f, i) => (
          <li key={f.name} className={`office-face office-face-${i + 1}`}>
            <img src={f.src} alt="" />
            <span>{f.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Fundos dos banners da página inicial ---------- */

// Mesmos enfeites dos cabeçalhos, soltos atrás da faixa e da etiqueta do banner.
export function BannerBackdrop({ world }: { world: AppModule['world'] }) {
  if (world === 'cosmos') {
    return (
      <div className="banner-theme" aria-hidden="true">
        <img src={backdrops.profissional.images[1].src} alt="" className="bt-cos-img" loading="lazy" decoding="async" />
        <span className="cos-mist" />
        <span className="cos-mist cos-mist-2" />
        <Stars n={40} seed={9} className="cos-stars" />
        <Flare className="bt-flare" />
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
          {VU.slice(0, 4).map((c, i) => (
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
  if (world === 'office') {
    return (
      <div className="banner-theme" aria-hidden="true">
        <span className="office-halftone" />
        <img src={backdrops.trabalho.images[0].src} alt="" className="bt-img bt-office-img" loading="lazy" decoding="async" />
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
