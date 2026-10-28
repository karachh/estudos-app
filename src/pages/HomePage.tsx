import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Band, Film } from '../components/Cover'
import { Icon } from '../components/Icon'
import { BannerBackdrop } from '../components/Worlds'
import { plural } from '../core/geometry'
import { modules, type AppModule } from '../core/modules'
import { sumProgress, useHomeData, type Progress } from '../core/queries'
import { bannerFor, landscapes, type Artwork } from '../data/art'

// Código de barras do progresso: um traço por tópico, mais grosso quanto mais avançado.
function Barcode({ items, label }: { items: Progress[]; label: string }) {
  return (
    <div className="text-accent">
      <span className="flex h-11 items-stretch gap-[2px]" aria-hidden="true">
        {items.map((p, i) => {
          const done = p.total > 0 && p.done === p.total
          const started = p.done > 0
          return (
            <span
              key={i}
              className={done ? 'w-[4px] bg-current' : started ? 'w-[2px] bg-current' : 'w-px bg-current opacity-45'}
            />
          )
        })}
      </span>
      <span className="mono mt-1.5 block text-micro tracking-[0.2em]">{label}</span>
    </div>
  )
}

const itemsLabel = (p: Progress) => `${p.done} de ${p.total} itens`

export default function HomePage() {
  const data = useHomeData()
  if (!data) return null

  const all = modules.flatMap((m) => data.get(m.id)?.topics ?? [])
  const total = sumProgress(all)

  return (
    <div className="home">
      <section className="film-section" aria-label="Início" style={{ '--accent': '#e5582b' } as CSSProperties}>
        <h1 className="sr-only">Caderno de Estudos Pessoal</h1>
        <Film art={landscapes.inicio} eager />
        <Band title="Estudos"foot={`${modules.length} módulos · ${total.total} itens`} />
        <div className="sticker">
          <p className="gloock-text text-cover leading-tight">
            Caderno de Estudos Pessoal
          </p>
          <div className="mt-6">
            <Barcode items={all} label={itemsLabel(total)} />
          </div>
          <button
            className="btn mt-6"
            onClick={() => document.getElementById(`mod-${modules[0].id}`)?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver os módulos
            <span className="rotate-90">
              <Icon name="chevron" size={16} />
            </span>
          </button>
          <Credit art={landscapes.inicio} />
        </div>
      </section>

      {modules.map((m) => (
        <ModuleBanner key={m.id} mod={m} groups={data.get(m.id)?.groups ?? []} topics={data.get(m.id)?.topics ?? []} />
      ))}
    </div>
  )
}

function Credit({ art }: { art: Artwork }) {
  return (
    <p className="fine mt-5 text-ink-3">
      <a href={art.source} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
        Foto: {art.credit}
      </a>
    </p>
  )
}

// Cada módulo é uma "capa" que cresce até ocupar a tela conforme a página desce.
function ModuleBanner({ mod, groups, topics }: { mod: AppModule; groups: { title: string; p: Progress }[]; topics: Progress[] }) {
  const art = bannerFor(mod.id)
  const p = sumProgress(topics)
  const themed = mod.world === 'psico' || mod.world === 'eva' || mod.world === 'office'
  return (
    <section id={`mod-${mod.id}`} data-module={mod.id} className={`banner ${themed ? `banner-${mod.world}` : ''}`} aria-labelledby={`bn-${mod.id}`}>
      <div className="banner-frame">
        {themed ? <BannerBackdrop world={mod.world} /> : art && <Film art={art} />}
        <Band title={mod.short} foot={`${groups.length} ${groups.length === 1 ? mod.groupLabel : plural(mod.groupLabel)}`} />
        <div className="sticker banner-copy">
          <h2 id={`bn-${mod.id}`} className="gloock-text text-cover leading-tight">
            {mod.label}
          </h2>
          <p className="mt-2 text-ink-2">{mod.tagline}</p>
          {groups.length > 0 && (
            <ul className="fine mt-5 space-y-1.5 border-t border-[#3a352d] pt-4">
              {groups.slice(0, 6).map((g, i) => (
                <li key={g.title} className={`flex justify-between gap-6 ${i >= 3 ? 'max-md:hidden' : ''}`}>
                  <span className="truncate">{g.title}</span>
                  {g.p.total > 0 && (
                    <span className="mono shrink-0 tracking-normal text-accent">
                      {g.p.done}/{g.p.total}
                    </span>
                  )}
                </li>
              ))}
              {groups.length > 3 && (
                <li className="text-ink-3 md:hidden">e mais {groups.length - 3}</li>
              )}
              {groups.length > 6 && <li className="text-ink-3 max-md:hidden">e mais {groups.length - 6}</li>}
            </ul>
          )}
          {topics.length > 0 && (
            <div className="mt-5">
              <Barcode items={topics} label={itemsLabel(p)} />
            </div>
          )}
          <Link to={`/${mod.id}`} className="btn btn-primary mt-6">
            Abrir {mod.short}
            <Icon name="chevron" size={16} />
          </Link>
          {art && !themed && (
            <p className="fine mt-5 text-ink-3">
              <a href={art.source} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                {landscapes[mod.id] ? 'Foto' : 'Obra'}: {art.credit}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
