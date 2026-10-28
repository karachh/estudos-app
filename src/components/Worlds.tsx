import type { CSSProperties } from 'react'
import face1 from '../assets/trabalho/face-1.jpg'
import face2 from '../assets/trabalho/face-2.jpg'
import face3 from '../assets/trabalho/face-3.jpg'
import face4 from '../assets/trabalho/face-4.jpg'
import face5 from '../assets/trabalho/face-5.jpg'
import type { AppModule } from '../core/modules'
import { plural } from '../core/geometry'
import { backdrops } from '../data/backdrops'
import { Icon } from './Icon'
import { Sparkle } from './Marks'

// Cabeçalhos dos três mundos que trocam só a pele do mapa: psico (Profissional), eva (UEM) e office (Trabalho).
// Os enfeites são aria-hidden; o texto de verdade é o h1 e a tagline.

type HeaderProps = { mod: AppModule; groupCount: number; pct?: number }

const count = (mod: AppModule, n: number) => `${n} ${n === 1 ? mod.groupLabel : plural(mod.groupLabel)}`

/* ---------- Psico: pôster psicodélico de OVNI ---------- */

export function Ufo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 230" aria-hidden="true" className={className}>
      {/* feixe */}
      <path d="M88 118h44l36 112H52z" fill="#0c0a10" />
      <path d="M96 118h28l22 112H74z" fill="#0c0a10" stroke="#e8318f" strokeWidth="1.5" opacity="0.9" />
      {/* cúpula */}
      <path d="M62 62c6-30 90-30 96 0z" fill="#e2b93b" />
      <path d="M78 52c8-10 56-10 64 0" fill="none" stroke="#fff6d8" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      {/* disco */}
      <ellipse cx="110" cy="76" rx="104" ry="26" fill="#0c0a10" />
      <ellipse cx="110" cy="76" rx="104" ry="26" fill="none" stroke="#e8318f" strokeWidth="2" />
      <ellipse cx="110" cy="74" rx="84" ry="15" fill="none" stroke="#4b2ee6" strokeWidth="5" />
      <ellipse cx="110" cy="74" rx="62" ry="10" fill="none" stroke="#f4f0e4" strokeWidth="3" strokeDasharray="14 8" />
      {/* olho */}
      <path d="M52 112Q110 70 168 112Q110 150 52 112Z" fill="#f4f0e4" stroke="#0c0a10" strokeWidth="3" />
      <circle cx="110" cy="112" r="21" fill="#0c0a10" />
      <circle cx="110" cy="112" r="21" fill="none" stroke="#e2b93b" strokeWidth="2" strokeDasharray="2 4" />
      <circle cx="110" cy="112" r="8" fill="#e2b93b" />
      <circle cx="105" cy="107" r="2.6" fill="#fff" />
    </svg>
  )
}

// O Concorde da referência: um jato branco que atravessa o quadro deixando um rastro de luz azul, creme e laranja.
const TRAIL = 'M-40 228C90 214 200 150 320 120S520 58 660 18'

export function PlaneTrail({ className = '', id = 'plane' }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 600 240" preserveAspectRatio="xMidYMid slice" className={`plane ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" x2="1">
          <stop offset="0" stopColor="#2b3cf5" stopOpacity="0" />
          <stop offset="0.3" stopColor="#4d63ff" />
          <stop offset="0.6" stopColor="#fff6d8" />
          <stop offset="0.85" stopColor="#ee7a2c" />
          <stop offset="1" stopColor="#ee7a2c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={TRAIL} pathLength={1} className="plane-glow" stroke={`url(#${id}-g)`} />
      <path d={TRAIL} pathLength={1} className="plane-trail" stroke={`url(#${id}-g)`} />
      <g className="plane-jet">
        <path d="M-26-1.3L14-1.5Q25-.8 30 0Q25 .8 14 1.5L-26 1.3z" fill="#fff" />
        <path d="M4 0L-17-11h-5l9 11-9 11h5z" fill="#fff" />
        <circle r="7" fill="#fff6d8" opacity="0.35" />
        <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path={TRAIL} />
      </g>
    </svg>
  )
}

export function PsicoHeader({ mod, groupCount }: HeaderProps) {
  return (
    <div className="psy-poster" style={{ '--len': mod.short.length } as CSSProperties}>
      {/* Filtro que entorta o letreiro, como as letras derretidas do pôster */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <filter id="psy-warp" x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.03" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="9" />
        </filter>
      </svg>
      <span className="psy-blob torn" aria-hidden="true" />
      <PlaneTrail className="psy-plane" id="psy-plane" />
      <Ufo className="psy-ufo" />
      <Sparkle size={14} className="twinkle absolute left-[6%] top-[12%] text-[#f4f0e4]" />
      <Sparkle size={9} className="twinkle absolute left-[44%] top-[7%] text-[#e2b93b] [animation-delay:.8s]" />
      <Sparkle size={11} className="twinkle absolute bottom-[20%] left-[3%] text-[#f4f0e4] [animation-delay:1.6s]" />
      <Sparkle size={8} className="twinkle absolute bottom-[34%] right-[46%] text-[#e8318f] [animation-delay:2.2s]" />
      <span className="psy-side" aria-hidden="true">
        DECOLAGEM · DADOS + IA · ROADMAP
      </span>
      <div className="psy-copy">
        <h1 className="psy-title">{mod.short}</h1>
        <p className="psy-tag">{mod.tagline}</p>
        <p className="psy-chip">{count(mod, groupCount)}</p>
      </div>
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

        <div className="eva-side" aria-hidden="true">
          <span className="eva-kanji" lang="ja">
            新世紀
          </span>
          <span className="eva-alert" lang="ja">
            警報
          </span>
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

export function OfficeHeader({ mod, groupCount }: HeaderProps) {
  return (
    <div className="office-poster" style={{ '--len': mod.short.length } as CSSProperties}>
      <span className="office-halftone" aria-hidden="true" />
      <div className="office-head">
        <div className="office-copy">
          <p className="office-sign" aria-hidden="true">
            <span>The Office</span>
            <Icon name="office" size={34} />
          </p>
          <h1 className="office-title">{mod.short}</h1>
        </div>
        <p className="office-stamp" aria-hidden="true">
          <span>Aprovado pelo</span>
          <strong>código de Scranton</strong>
          <span>{count(mod, groupCount)}</span>
        </p>
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
  if (world === 'psico') {
    return (
      <div className="banner-theme" aria-hidden="true">
        <img src={backdrops.profissional.images[2].src} alt="" className="bt-psy-img" />
        <span className="bt-psy-wash" />
        <span className="bt-psy-wash hot" />
        {[
          ['#e8318f', '0s'],
          ['#e2b93b', '-3s'],
          ['#ee3a2c', '-6s'],
        ].map(([c, d]) => (
          <span key={c} className="bt-ring" style={{ '--c': c, '--d': d } as CSSProperties} />
        ))}
        <PlaneTrail className="bt-plane" id="bt-plane" />
        <Ufo className="bt-art bt-ufo" />
        <Sparkle size={16} className="twinkle absolute left-[24%] top-[14%] text-[#f4f0e4]" />
        <Sparkle size={10} className="twinkle absolute left-[46%] top-[30%] text-[#e2b93b] [animation-delay:1s]" />
        <Sparkle size={12} className="twinkle absolute bottom-[18%] left-[34%] text-[#e8318f] [animation-delay:2s]" />
        <Sparkle size={14} className="twinkle absolute right-[38%] top-[20%] text-[#f4f0e4] [animation-delay:1.6s]" />
      </div>
    )
  }
  if (world === 'eva') {
    return (
      <div className="banner-theme" aria-hidden="true">
        <Hexes />
        <span className="eva-glow" />
        <img src={backdrops.uem.images[3].src} alt="" className="bt-img" />
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
        <img src={backdrops.trabalho.images[0].src} alt="" className="bt-img bt-office-img" />
      </div>
    )
  }
  return null
}
