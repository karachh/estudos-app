import type { CSSProperties } from 'react'
import swordfish from '../../assets/bebop/swordfish.png'
import handshake from '../../assets/fosforo/aperto-pixel.png'
import { AlienTurn } from './AlienTurn'
import shipFrame from '../../assets/fosforo/navio-quadro.jpg'
import face1 from '../../assets/trabalho/face-1.jpg'
import face2 from '../../assets/trabalho/face-2.jpg'
import face3 from '../../assets/trabalho/face-3.jpg'
import face4 from '../../assets/trabalho/face-4.jpg'
import face5 from '../../assets/trabalho/face-5.jpg'
import { BEBOP_TONES } from './tones'
import type { AppModule } from '../../core/modules'
import { plural } from '../../core/geometry'
import { backdrops } from '../../data/backdrops'

// Cabeçalhos dos quatro mundos que trocam só a pele do mapa: fosforo (Profissional), bebop (Repertório),
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

/* ---------- Fósforo (Profissional): monitor verde de um computador de pesquisa antigo ---------- */

// Radar do scanner (o círculo de varredura da referência do navio): anéis, mira e um feixe que gira
export function Radar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" className={`ph-radar ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="ph-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {[46, 34, 22, 10].map((r) => (
        <circle key={r} r={r} fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
      ))}
      <path d="M-48 0H48M0-48V48" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <g className="ph-radar-sweep">
        <path d="M0 0L46 0A46 46 0 0 0 32.5-32.5Z" fill="url(#ph-sweep)" />
      </g>
      <rect x="18" y="-24" width="3" height="3" fill="currentColor" className="ph-blip" />
      <rect x="-30" y="12" width="3" height="3" fill="currentColor" className="ph-blip ph-blip-2" />
    </svg>
  )
}

// O aperto de mão em pixel art (referência do dono), recolorido em fósforo com o fogo laranja
export function PixelShake({ className = '' }: { className?: string }) {
  return <img src={handshake} alt="" className={`ph-sprite ${className}`} aria-hidden="true" decoding="async" />
}

// Barra de carga em blocos, como num boot: 20 células, cada uma vale 5%
function BootBar({ pct }: { pct: number }) {
  const on = Math.round(pct / 5)
  return (
    <span className="ph-bootbar" aria-hidden="true">
      {Array.from({ length: 20 }, (_, i) => (
        <i key={i} className={i < on ? 'on' : ''} style={{ '--i': i } as CSSProperties} />
      ))}
    </span>
  )
}

export function FosforoHeader({ mod, groupCount, pct = 0 }: HeaderProps) {
  return (
    <div className="ph-screen" style={{ '--len': mod.short.length } as CSSProperties}>
      <div className="ph-bar" aria-hidden="true">
        <span>ESTUDOS BIOS (TM)</span>
        <span className="ph-bar-mid">DADOS + IA · RESEARCH</span>
        <span>VER 1.03</span>
        <span>PORT{'.'.repeat(6)}{groupCount}</span>
      </div>
      <div className="ph-menu" aria-hidden="true">
        <span>ROTA</span>
        <span>ETAPAS</span>
        <span>BOOT</span>
        <span>SEQ</span>
        <span>MAIS+</span>
      </div>
      <div className="ph-grid">
        <div className="ph-copy">
          <p className="ph-prompt" aria-hidden="true">
            C:\ESTUDOS\{mod.id.toUpperCase()}&gt; RUN ROADMAP.EXE<i className="ph-cursor" />
          </p>
          <h1 className="ph-title" data-text={mod.short}>
            {mod.short}
          </h1>
          <p className="ph-tag">{mod.tagline}</p>
          <div className="ph-load" aria-hidden="true">
            <span>CARREGANDO</span>
            <BootBar pct={pct} />
            <span className="ph-load-pct">{String(pct).padStart(3, '0')}%</span>
          </div>
          <p className="ph-log" aria-hidden="true">
            &gt; {count(mod, groupCount).toUpperCase()} NA MEMÓRIA · BANK 1 OK · BANK 2 OK
          </p>
        </div>
        <figure className="ph-art" aria-hidden="true">
          <img src={shipFrame} alt="" />
          <figcaption>
            <span>SCAN 0X3F · ALVO</span>
            <span>N 47°36' · O 52°11'</span>
          </figcaption>
        </figure>
      </div>
      <div className="ph-foot" aria-hidden="true">
        <Radar />
        <PixelShake />
        <span className="ph-foot-txt">
          PENSAMENTOS SÃO PROGRAMAS.
          <br />
          RODE OS SEUS COM CUIDADO.
        </span>
      </div>
      <span className="ph-crt" aria-hidden="true" />
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
            {BEBOP_TONES.map((c, i) => (
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

// "UEM" desenhado no estilo do logotipo de Evangelion (refs/uem-eva/uem_fonte.jpg): letras cortadas, com asas pontudas dos dois lados
export function UemLogo() {
  return (
    <svg viewBox="0 0 600 200" className="eva-logo" aria-hidden="true" focusable="false">
      <path d="M6 26L166 74L150 98L170 104L138 128L146 100L120 92Z" />
      <path d="M150 58L208 92L196 150L214 166L240 150L246 80L270 42L274 150L250 192L188 194L158 166Z" />
      <path d="M290 50L366 72L358 94L318 84L314 108L354 112L346 132L314 126L316 156L374 166L360 194L286 178L298 120Z" />
      <path d="M384 186L392 70L412 38L448 122L486 38L506 72L518 170L490 197L480 106L450 176L418 106L410 178Z" />
      <path d="M506 72L596 24L532 104L514 106Z" />
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
          <h1 className="eva-title">
            <span className="sr-only">{mod.short}</span>
            <UemLogo />
          </h1>
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

/* ---------- Neural (IA): mesma grade do eva, com cabeça sintética e letreiro vertical em duas cores ---------- */

export function NeuralHeader({ mod, groupCount, pct = 0 }: HeaderProps) {
  const n = String(groupCount).padStart(2, '0')
  return (
    <div className="nr-panel" style={{ '--len': mod.short.length, '--fit': `${pct}%` } as CSSProperties}>
      <span className="nr-glow" aria-hidden="true" />
      <AlienTurn className="nr-art" />
      <span className="nr-sweep" aria-hidden="true" />
      <div className="nr-grid">
        <p className="nr-kicker" aria-hidden="true">
          THE FUTURE HAS COME
        </p>
        <h1 className="nr-title">{mod.short}</h1>
        <p className="nr-tag">{mod.tagline}</p>
        <div className="nr-meta" aria-hidden="true">
          <div className="nr-unit">
            <span className="nr-unit-label">{groupCount === 1 ? mod.groupLabel : plural(mod.groupLabel)}</span>
            <span className="nr-unit-num">{n}</span>
          </div>
          <div className="nr-fit">
            <span className="nr-fit-head">
              <span>TREINO</span>
              <span className="nr-fit-pct">{String(pct).padStart(3, '0')}%</span>
            </span>
            <span className="nr-fit-bar">
              <span />
            </span>
            <span className="nr-warn">OVERFITTING: NÃO DECORE, APRENDA</span>
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
