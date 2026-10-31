import { useRef, type CSSProperties } from 'react'
import { Band, Film } from '../components/worlds/Cover'
import { Icon } from '../components/ui/Icon'
import { modules } from '../core/modules'
import { useHomeData } from '../core/queries'
import { landscapes } from '../data/art'
import { ModuleBanner } from './home/ModuleBanner'
import { useBackToModule, useStack } from './home/scroll'

export default function HomePage() {
  const data = useHomeData()
  const root = useRef<HTMLDivElement>(null)
  useStack(root, !!data)
  useBackToModule(root, !!data)
  if (!data) return null

  return (
    <div className="home" ref={root}>
      <section className="film-section" aria-label="Início" style={{ '--accent': '#ead9a6' } as CSSProperties}>
        <h1 className="sr-only">Caderno de Estudos Pessoal</h1>
        <Film art={landscapes.inicio} eager />
        <div className="hero-group">
          <Band title="Estudos" topStar={false} letters />
          <div className="sticker">
            <p className="gloock-text text-cover leading-tight">
              Caderno de Estudos Pessoal
            </p>
            <button
              className="btn mt-6"
              onClick={() => document.getElementById(`mod-${modules[0].id}`)?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver os módulos
              <span className="rotate-90">
                <Icon name="chevron" size={16} />
              </span>
            </button>
          </div>
        </div>
        <p className="fine home-signature">Cauã Karach</p>
      </section>

      {/* Pontos de parada da rolagem: um por tela (ver html[data-snap] em index.css) */}
      {[0, ...modules.map((_, i) => i + 1)].map((i) => (
        <span key={i} className="snap-mark" style={{ '--i': i } as CSSProperties} aria-hidden="true" />
      ))}

      {modules.map((m, i) => (
        <ModuleBanner
          key={m.id}
          mod={m}
          side={modules.slice(1, i + 1).filter((x) => !x.sameSide).length % 2 === 0 ? 'right' : 'left'}
          groups={data.get(m.id)?.groups ?? []}
          topics={data.get(m.id)?.topics ?? []}
        />
      ))}
    </div>
  )
}
