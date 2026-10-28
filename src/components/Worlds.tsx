import { useId, type CSSProperties } from 'react'
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

// Quem pediu menos movimento no sistema vê as cenas paradas (animações SMIL não obedecem ao CSS).
const stillMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Contorno ondulado e simétrico, largo embaixo: a aura do pôster e o feixe usam a mesma construção.
function wavy(top: number, bottom: number, half: (t: number) => number, amp: number, freq: number) {
  const pts: [number, number][] = []
  const n = 46
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const y = top + (bottom - top) * t
    pts.push([half(t) + amp * Math.sin(t * freq), y])
  }
  const right = pts.map(([x, y]) => `${(150 + x).toFixed(1)} ${y.toFixed(1)}`)
  const left = [...pts].reverse().map(([x, y]) => `${(150 - x).toFixed(1)} ${y.toFixed(1)}`)
  return `M${right.join('L')}L${left.join('L')}Z`
}
// o topo é arredondado (a largura cresce com a raiz perto do início)
const AURA = wavy(26, 372, (t) => (46 + 40 * t + 42 * t * t) * Math.min(1, Math.sqrt(t / 0.1)), 7, 26)
const BEAM = wavy(160, 372, (t) => 12 + 62 * t, 4, 18)
const ECHOES = [
  { k: 1.07, c: '#ee3a2c', w: 5, d: '0s' },
  { k: 1.15, c: '#e8318f', w: 4, d: '-1.2s' },
  { k: 1.23, c: '#e2b93b', w: 3.5, d: '-2.4s' },
  { k: 1.31, c: '#8d7cff', w: 3, d: '-3.6s' },
]

/* O OVNI do pôster de referência: aura violeta de borda derretida com contornos que se repetem, disco com
   cúpula, olho de raios dourados e um feixe de ondas que desce até a borda do quadro. */
export function Ufo({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  const still = stillMotion()
  const rays = Array.from({ length: 18 }, (_, i) => (i * 360) / 18)
  return (
    <svg viewBox="0 0 300 372" aria-hidden="true" className={`ufo ${className}`} preserveAspectRatio="xMidYMax meet">
      <defs>
        <filter id={`${id}-melt`} x="-15%" y="-5%" width="130%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="7" result="n">
            {!still && <animate attributeName="baseFrequency" values="0.012 0.04;0.017 0.05;0.012 0.04" dur="9s" repeatCount="indefinite" />}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="9" />
        </filter>
        <clipPath id={`${id}-beam`}>
          <path d={BEAM} />
        </clipPath>
        <clipPath id={`${id}-eye`}>
          <path d="M66 150Q150 92 234 150Q150 208 66 150Z" />
        </clipPath>
      </defs>

      <g filter={`url(#${id}-melt)`}>
        {ECHOES.map((e) => (
          <path key={e.k} d={AURA} fill="none" stroke={e.c} strokeWidth={e.w} className="ufo-echo" style={{ '--k': e.k, '--d': e.d } as CSSProperties} vectorEffect="non-scaling-stroke" />
        ))}
        <path d={AURA} fill="#4b2ee6" />
        <path d={AURA} fill="none" stroke="#0c0a12" strokeWidth="5" vectorEffect="non-scaling-stroke" />
      </g>

      {/* feixe: preto, com ondas de ouro e rosa que descem */}
      <path d={BEAM} fill="#0c0a12" />
      <g clipPath={`url(#${id}-beam)`}>
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx="150" cy="190" rx="14" ry="5" fill="none" stroke={i % 2 ? '#e8318f' : '#e2b93b'} strokeWidth="3" opacity="0">
            {!still && (
              <>
                <animate attributeName="cy" values="190;372" dur="4.8s" begin={`${-i * 1.2}s`} repeatCount="indefinite" />
                <animate attributeName="rx" values="14;78" dur="4.8s" begin={`${-i * 1.2}s`} repeatCount="indefinite" />
                <animate attributeName="ry" values="5;22" dur="4.8s" begin={`${-i * 1.2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.7;1" dur="4.8s" begin={`${-i * 1.2}s`} repeatCount="indefinite" />
              </>
            )}
          </ellipse>
        ))}
      </g>
      <path d={BEAM} fill="none" stroke="#e8318f" strokeWidth="2.5" opacity="0.9" />

      {/* disco e cúpula */}
      <path d="M92 80C96 30 204 30 208 80Z" fill="#e2b93b" stroke="#0c0a12" strokeWidth="4" />
      <path d="M112 62C122 46 178 46 188 62" fill="none" stroke="#fff6d8" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
      <ellipse cx="150" cy="86" rx="120" ry="28" fill="#0c0a12" stroke="#e8318f" strokeWidth="3.5" />
      <ellipse cx="150" cy="84" rx="94" ry="17" fill="none" stroke="#4b2ee6" strokeWidth="7" />
      <ellipse cx="150" cy="84" rx="68" ry="11" fill="none" stroke="#f4f0e4" strokeWidth="3.5" strokeDasharray="14 9">
        {!still && <animate attributeName="stroke-dashoffset" values="0;-92" dur="3s" repeatCount="indefinite" />}
      </ellipse>

      {/* luz que desce do disco ao olho */}
      <path d="M96 104L204 104L176 138L124 138Z" fill="#e8318f" opacity="0.5" />
      <path d="M118 104L182 104L168 138L132 138Z" fill="#fff6d8" opacity="0.55">
        {!still && <animate attributeName="opacity" values="0.55;0.2;0.55" dur="2.4s" repeatCount="indefinite" />}
      </path>

      {/* olho: a pupila passeia e as pálpebras fecham de tempos em tempos */}
      <g transform="translate(150 150)">
        <g>
          {!still && <animateTransform attributeName="transform" type="scale" values="1 1;1 1;1 0.08;1 1" keyTimes="0;0.92;0.96;1" dur="6s" repeatCount="indefinite" />}
          <g transform="translate(-150 -150)">
            <path d="M66 150Q150 92 234 150Q150 208 66 150Z" fill="#f4f0e4" />
            <g clipPath={`url(#${id}-eye)`}>
              <g>
                {!still && <animateTransform attributeName="transform" type="translate" values="-10 0;10 2;-10 0" dur="7s" repeatCount="indefinite" />}
                <circle cx="150" cy="150" r="30" fill="#0c0a12" />
                <g>
                  {!still && <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="30s" repeatCount="indefinite" />}
                  {rays.map((r) => (
                    <line key={r} x1="150" y1="114" x2="150" y2="121" stroke="#e2b93b" strokeWidth="2.2" strokeLinecap="round" transform={`rotate(${r} 150 150)`} />
                  ))}
                  <circle cx="150" cy="150" r="24" fill="none" stroke="#e2b93b" strokeWidth="2" strokeDasharray="2 5" />
                </g>
                <circle cx="150" cy="150" r="10" fill="#e2b93b" />
                <circle cx="145" cy="145" r="3" fill="#fff" />
              </g>
            </g>
            <path d="M66 150Q150 92 234 150Q150 208 66 150Z" fill="none" stroke="#0c0a12" strokeWidth="4.5" />
          </g>
        </g>
      </g>
    </svg>
  )
}

// O Concorde da referência: um jato branco que atravessa o quadro deixando fitas de luz azul, creme e laranja.
const TRAIL = 'M-40 228C90 214 200 150 320 120S520 58 660 18'
const RIBBONS = [
  { dy: 7, from: '#2b3cf5', mid: '#6a7bff', w: 3.5, d: '0s' },
  { dy: 0, from: '#4d63ff', mid: '#fff6d8', w: 4.5, d: '0.12s' },
  { dy: -7, from: '#ee7a2c', mid: '#ffb15c', w: 3, d: '0.24s' },
]

export function PlaneTrail({ className = '', id = 'plane' }: { className?: string; id?: string }) {
  const still = stillMotion()
  return (
    <svg viewBox="0 0 600 240" preserveAspectRatio="xMidYMid slice" className={`plane ${className}`} aria-hidden="true">
      <defs>
        {RIBBONS.map((r, i) => (
          <linearGradient key={i} id={`${id}-g${i}`} x1="0" x2="1">
            <stop offset="0" stopColor={r.from} stopOpacity="0" />
            <stop offset="0.3" stopColor={r.from} />
            <stop offset="0.62" stopColor={r.mid} />
            <stop offset="0.88" stopColor="#ee7a2c" />
            <stop offset="1" stopColor="#ee7a2c" stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      <path d={TRAIL} pathLength={1} className="plane-glow" stroke={`url(#${id}-g1)`} />
      {RIBBONS.map((r, i) => (
        <path
          key={i}
          d={TRAIL}
          pathLength={1}
          className="plane-trail"
          stroke={`url(#${id}-g${i})`}
          strokeWidth={r.w}
          transform={`translate(0 ${r.dy})`}
          style={{ animationDelay: r.d }}
        />
      ))}
      <g className="plane-jet" transform={still ? 'translate(330 118) rotate(-17)' : undefined}>
        {!still && <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path={TRAIL} />}
        {/* o jato diminui ao se afastar, como no horizonte do pôster, e balança de leve */}
        <g>
          {!still && <animateTransform attributeName="transform" type="scale" values="1.9;1.1;0.6" keyTimes="0;0.5;1" dur="7s" repeatCount="indefinite" />}
          <g>
            {!still && <animateTransform attributeName="transform" type="rotate" values="-4;3;-4" dur="2.6s" repeatCount="indefinite" additive="sum" />}
            {/* pós-combustor */}
            <ellipse cx="-30" cy="0" rx="10" ry="2.4" fill="#ee7a2c" opacity="0.9">
              {!still && <animate attributeName="rx" values="8;15;9;14;8" dur="0.45s" repeatCount="indefinite" />}
            </ellipse>
            <ellipse cx="-28" cy="0" rx="5" ry="1.3" fill="#9fb2ff">
              {!still && <animate attributeName="rx" values="4;8;5;7;4" dur="0.35s" repeatCount="indefinite" />}
            </ellipse>
            <path d="M-26-1.3L14-1.5Q25-.8 30 0Q25 .8 14 1.5L-26 1.3z" fill="#fff" />
            <path d="M4 0L-17-11h-5l9 11-9 11h5z" fill="#fff" />
            <circle r="8" fill="#fff6d8" opacity="0.35">
              {!still && <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.2s" repeatCount="indefinite" />}
            </circle>
            {/* onda de choque no nariz */}
            {!still &&
              [0, 0.6].map((b) => (
                <circle key={b} cx="30" cy="0" r="2" fill="none" stroke="#fff6d8" strokeWidth="0.9">
                  <animate attributeName="r" values="2;16" dur="1.2s" begin={`${b}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="1.2s" begin={`${b}s`} repeatCount="indefinite" />
                </circle>
              ))}
          </g>
        </g>
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
        <img src={backdrops.profissional.images[2].src} alt="" className="bt-psy-img" loading="lazy" decoding="async" />
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
        <img src={backdrops.uem.images[3].src} alt="" className="bt-img" loading="lazy" decoding="async" />
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
