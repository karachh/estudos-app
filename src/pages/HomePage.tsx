import { useEffect, useRef, type CSSProperties, type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Band, Film } from '../components/Cover'
import { Icon } from '../components/Icon'
import { BannerBackdrop } from '../components/Worlds'
import { plural } from '../core/geometry'
import { modules, type AppModule } from '../core/modules'
import { sumProgress, useHomeData, type Progress } from '../core/queries'
import { bannerFor, landscapes, type Artwork } from '../data/art'

// Código de barras do progresso: um traço por tópico, mais grosso quanto mais avançado.
function Barcode({ items, label, center }: { items: Progress[]; label: string; center?: boolean }) {
  return (
    <div className={`text-accent ${center ? 'flex flex-col items-center' : ''}`}>
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
  const root = useRef<HTMLDivElement>(null)
  useStack(root, !!data)
  if (!data) return null

  const all = modules.flatMap((m) => data.get(m.id)?.topics ?? [])
  const total = sumProgress(all)

  return (
    <div className="home" ref={root}>
      <section className="film-section" aria-label="Início" style={{ '--accent': '#e5582b' } as CSSProperties}>
        <h1 className="sr-only">Caderno de Estudos Pessoal</h1>
        <Film art={landscapes.inicio} eager />
        <Band title="Estudos"foot={`${modules.length} módulos · ${total.total} itens`} />
        <div className="sticker">
          <p className="gloock-text text-cover leading-tight">
            Caderno de Estudos Pessoal
          </p>
          <div className="mt-6">
            <Barcode items={all} label={itemsLabel(total)} center />
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

      {modules.map((m, i) => (
        <ModuleBanner
          key={m.id}
          mod={m}
          side={i % 2 === 0 ? 'right' : 'left'}
          groups={data.get(m.id)?.groups ?? []}
          topics={data.get(m.id)?.topics ?? []}
        />
      ))}
    </div>
  )
}

// Cada tela é fixa no topo e a seguinte sobe por cima dela. O progresso de cada uma vai para o CSS:
// --p (0 a 1) é o quanto ela já subiu; --cover é o quanto a próxima já a cobriu.
function useStack(root: React.RefObject<HTMLDivElement | null>, ready: boolean) {
  useEffect(() => {
    const el = root.current
    if (!el || !ready) return
    const screens = Array.from(el.querySelectorAll<HTMLElement>('.film-section, .banner'))
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clamp = (v: number) => Math.min(1, Math.max(0, v))
    let raf = 0
    const paint = () => {
      raf = 0
      const h = screens[0].offsetHeight
      const y = window.scrollY - (el.getBoundingClientRect().top + window.scrollY)
      const p = screens.map((_, i) => (i === 0 || still ? 1 : clamp((y - (i - 1) * h) / h)))
      screens.forEach((s, i) => {
        s.style.setProperty('--p', p[i].toFixed(3))
        s.style.setProperty('--cover', (still ? 0 : (p[i + 1] ?? 0)).toFixed(3))
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }
    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [root, ready])
}

// O cartão cresce até tomar a tela e só então a página do módulo aparece por baixo dele.
function expandInto(e: MouseEvent<HTMLAnchorElement>, go: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  const pane = (e.currentTarget as HTMLElement).closest<HTMLElement>('.pane')
  if (!pane || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return go()
  const r = pane.getBoundingClientRect()
  const cs = getComputedStyle(pane)
  const veil = document.createElement('div')
  Object.assign(veil.style, {
    position: 'fixed',
    zIndex: '100',
    boxSizing: 'border-box',
    background: cs.backgroundColor,
    borderStyle: 'solid',
    borderWidth: '0',
    pointerEvents: 'none',
  })
  const edge = cs.borderLeftWidth !== '0px' ? 'borderLeftWidth' : cs.borderRightWidth !== '0px' ? 'borderRightWidth' : 'borderTopWidth'
  veil.style.borderColor = cs.borderLeftWidth !== '0px' ? cs.borderLeftColor : cs.borderRightWidth !== '0px' ? cs.borderRightColor : cs.borderTopColor
  document.body.appendChild(veil)
  const from = { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, [edge]: cs[edge as 'borderLeftWidth'] }
  const to = { left: '0px', top: '0px', width: `${window.innerWidth}px`, height: `${window.innerHeight}px`, [edge]: '0px' }
  veil.animate([from, to], { duration: 520, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', fill: 'forwards' }).finished.then(() => {
    go()
    window.setTimeout(() => {
      veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, fill: 'forwards' }).finished.then(() => veil.remove())
    }, 120)
  })
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
function ModuleBanner({ mod, side, groups, topics }: { mod: AppModule; side: 'left' | 'right'; groups: { title: string; p: Progress }[]; topics: Progress[] }) {
  const navigate = useNavigate()
  const art = bannerFor(mod.id)
  const p = sumProgress(topics)
  const themed = mod.world === 'psico' || mod.world === 'eva' || mod.world === 'office'
  return (
    <section id={`mod-${mod.id}`} data-module={mod.id} data-side={side} className={`banner ${themed ? `banner-${mod.world}` : ''}`} aria-labelledby={`bn-${mod.id}`}>
      <div className="banner-frame">
        {themed ? <BannerBackdrop world={mod.world} /> : art && <Film art={art} />}
        <Band title={mod.short} foot={`${groups.length} ${groups.length === 1 ? mod.groupLabel : plural(mod.groupLabel)}`} />
        <div className="pane">
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
          <Link to={`/${mod.id}`} className="btn btn-primary mt-6 self-start" onClick={(e) => expandInto(e, () => navigate(`/${mod.id}`))}>
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
