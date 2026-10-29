import { useEffect, useRef, type CSSProperties, type MouseEvent } from 'react'
import { Link, useNavigate, useNavigationType } from 'react-router-dom'
import swordfish from '../assets/bebop/swordfish.png'
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
    <div className={`text-accent ${center ? 'flex flex-col md:items-center' : ''}`}>
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

// Módulo que a pessoa abriu a partir da página inicial: ao voltar pelo botão do navegador, a rolagem retorna ao banner dele
const BACK_KEY = 'estudos:home-from'
const rememberModule = (id: string) => {
  try {
    sessionStorage.setItem(BACK_KEY, id)
  } catch {
    // sem armazenamento: volta para o começo, como antes
  }
}

function useBackToModule(root: React.RefObject<HTMLDivElement | null>, ready: boolean) {
  const type = useNavigationType()
  useEffect(() => {
    const el = root.current
    if (!el || !ready || type !== 'POP') return
    let id: string | null = null
    try {
      id = sessionStorage.getItem(BACK_KEY)
    } catch {
      // sem armazenamento
    }
    const i = modules.findIndex((m) => m.id === id)
    if (i < 0) return
    // A tela 0 é a capa; o banner do módulo i é a tela i + 1 e assenta depois de (i + 1) alturas de rolagem
    const base = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: base + (i + 1) * el.querySelector<HTMLElement>('.film-section')!.offsetHeight, behavior: 'instant' })
  }, [root, ready, type])
}

export default function HomePage() {
  const data = useHomeData()
  const root = useRef<HTMLDivElement>(null)
  useStack(root, !!data)
  useBackToModule(root, !!data)
  if (!data) return null

  const all = modules.flatMap((m) => data.get(m.id)?.topics ?? [])
  const total = sumProgress(all)

  return (
    <div className="home" ref={root}>
      <section className="film-section" aria-label="Início" style={{ '--accent': '#ead9a6' } as CSSProperties}>
        <h1 className="sr-only">Caderno de Estudos Pessoal</h1>
        <Film art={landscapes.inicio} eager />
        <div className="hero-group">
          <Band title="Estudos" foot="Cauã Karach" />
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
    let h = 0
    let base = 0
    // Medidas só quando a janela muda; a rolagem só lê scrollY
    const measure = () => {
      h = screens[0].offsetHeight
      base = el.getBoundingClientRect().top + window.scrollY
    }
    const paint = () => {
      raf = 0
      const y = window.scrollY - base
      const p = screens.map((_, i) => (i === 0 || still ? 1 : clamp((y - (i - 1) * h) / h)))
      screens.forEach((s, i) => {
        const cover = still ? 0 : (p[i + 1] ?? 0)
        s.style.setProperty('--p', p[i].toFixed(3))
        s.style.setProperty('--cover', cover.toFixed(3))
        // Só escurece enquanto há o que mostrar; animações infinitas só rodam na tela à vista
        s.toggleAttribute('data-dim', cover > 0.001)
        s.toggleAttribute('data-live', p[i] > 0 && cover < 1)
        // Tela totalmente coberta: sai da ordem do Tab e dos leitores de tela
        s.inert = !still && cover >= 0.999
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }
    const onResize = () => {
      measure()
      onScroll()
    }
    measure()
    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [root, ready])
}

const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// O cartão cresce até tomar a tela e só então a página do módulo aparece por baixo dele.
function expandInto(e: MouseEvent<HTMLAnchorElement>, go: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  const pane = (e.currentTarget as HTMLElement).closest<HTMLElement>('.pane')
  if (!pane || still()) return go()
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

const ease = {
  out: (t: number) => 1 - (1 - t) ** 3,
  in: (t: number) => t ** 2,
}

// Repertório: a Swordfish II já espera ao lado do cartão. Ao abrir, ela dá um tranco, engata o cabo na beirada
// e puxa o cartão na diagonal, como quem vira uma página de livro: o cartão gira em torno do canto de cima do lado
// da parede (dobradiça) e sai arrastado para cima. A nave e o cabo ficam num overlay à parte; no fim a página entra.
function towAway(e: MouseEvent<HTMLAnchorElement>, side: 'left' | 'right', go: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  const banner = (e.currentTarget as HTMLElement).closest<HTMLElement>('.banner')
  const pane = banner?.querySelector<HTMLElement>('.pane')
  const rest = banner?.querySelector<HTMLElement>('.bt-ship')
  if (!banner || !pane || !rest || still() || !window.matchMedia('(min-width: 768px)').matches) return go()
  if (pane.dataset.towing) return
  pane.dataset.towing = '1'

  const dir = side === 'right' ? -1 : 1 // para onde o cartão é puxado
  const sr = rest.getBoundingClientRect()
  const pr = pane.getBoundingClientRect()
  const w = sr.width
  const h = sr.height
  const pivot = { x: dir === -1 ? pr.right : pr.left, y: pr.top }
  // Ponto em que o cabo prende: a beirada livre do cartão, mais perto de baixo, onde a nave espera
  const hv = { x: (dir === -1 ? pr.left : pr.right) - pivot.x, y: pr.height * 0.72 }
  const start = { x: sr.left + w / 2, y: sr.top + h / 2 }
  const MAX = (50 * Math.PI) / 180 // quanto a página gira
  const slide = pr.right + pr.width * 0.6 // quanto ela anda para fora
  const lift = pr.height * 0.4

  const ship = document.createElement('div')
  ship.className = 'tow-ship'
  Object.assign(ship.style, { width: `${w}px`, height: `${h}px`, left: `${-w / 2}px`, top: `${-h / 2}px` })
  const img = new Image()
  img.src = swordfish
  img.alt = ''
  img.style.transform = `scaleX(${dir === -1 ? -1 : 1})`
  const trail = document.createElement('span')
  trail.className = 'tow-trail'
  trail.style.background =
    dir === -1 ? 'linear-gradient(90deg, rgba(255,243,216,.9), transparent)' : 'linear-gradient(270deg, rgba(255,243,216,.9), transparent)'
  ship.append(trail, img)

  const ns = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(ns, 'svg')
  svg.setAttribute('class', 'tow-line')
  const cable = document.createElementNS(ns, 'path')
  const spark = document.createElementNS(ns, 'circle')
  spark.setAttribute('r', '0')
  svg.append(cable, spark)

  const veil = document.createElement('div')
  veil.className = 'tow-veil'
  document.body.append(svg, ship, veil)
  rest.style.visibility = 'hidden'
  pane.style.transformOrigin = dir === -1 ? '100% 0' : '0 0'

  const B = 380 // o tranco: engata o cabo
  const C = 1300 // a página sai
  const t0 = performance.now()
  const frame = (now: number) => {
    const t = now - t0
    const drag = t < B ? 0 : ease.in(Math.min(1, (t - B) / C))
    const ang = -dir * MAX * drag // sentido horário quando a página sai para a esquerda
    const tx = dir * slide * drag
    const ty = -lift * drag
    const cos = Math.cos(ang)
    const sin = Math.sin(ang)
    // Posição do ponto de engate depois de girar em torno da dobradiça e deslizar
    const hook = {
      x: pivot.x + hv.x * cos - hv.y * sin + tx,
      y: pivot.y + hv.x * sin + hv.y * cos + ty,
    }
    pane.style.transform = `translate(${tx}px, ${ty}px) rotate(${ang}rad)`

    // A nave segue o engate, um pouco adiante e acima, com o nariz levantado
    const lead = { x: hook.x + dir * (w * 0.42 + 20), y: hook.y - h * 0.18 }
    const k = Math.min(1, t / B)
    const eased = ease.out(k)
    const at0 = { x: hook.x + dir * (w * 0.42 + 20), y: hook.y - h * 0.18 }
    const x = t < B ? start.x + (at0.x - start.x) * eased : lead.x
    const y = t < B ? start.y + (at0.y - start.y) * eased : lead.y
    ship.style.transform = `translate(${x}px, ${y}px) rotate(${(-dir * 22 * (0.4 + drag * 0.6)).toFixed(1)}deg)`
    const tension = t < B ? eased * 0.5 : 0.5 + 0.5 * drag
    const trailW = tension * w * 1.2
    trail.style.width = `${trailW}px`
    trail.style.left = dir === -1 ? `${w * 0.9}px` : `${w * 0.1 - trailW}px`

    // Cabo: da cauda da nave até o ponto de engate; frouxo no tranco, esticado quando a página sai
    const tail = { x: x - dir * w * 0.4, y: y + h * 0.06 }
    const sag = (1 - Math.min(1, tension * 1.3)) * 36
    cable.setAttribute('d', `M${tail.x} ${tail.y}Q${(tail.x + hook.x) / 2} ${(tail.y + hook.y) / 2 + sag} ${hook.x} ${hook.y}`)
    cable.setAttribute('stroke-opacity', String(Math.min(1, t / 140)))
    spark.setAttribute('cx', String(hook.x))
    spark.setAttribute('cy', String(hook.y))
    spark.setAttribute('r', String(t < B ? 14 * Math.sin(k * Math.PI) : 0))

    // Véu escuro no fim da saída, para a página do módulo entrar sem corte
    const fadeAt = B + C * 0.68
    veil.style.opacity = String(t > fadeAt ? Math.min(1, (t - fadeAt) / (C * 0.32)) : 0)

    if (t < B + C) return void requestAnimationFrame(frame)
    go()
    window.setTimeout(() => {
      ship.remove()
      svg.remove()
      veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 420, fill: 'forwards' }).finished.then(() => veil.remove())
    }, 60)
  }
  requestAnimationFrame(frame)
}

function Credit({ art }: { art: Artwork }) {
  return (
    <p className="fine mt-5 text-ink-3">
      <a href={art.source} target="_blank" rel="noopener noreferrer" className="hover:text-ink credit">
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
  const themed = mod.world !== 'mapa' && mod.world !== 'sacro'
  const open = () => {
    rememberModule(mod.id)
    navigate(`/${mod.id}`)
  }
  return (
    <section id={`mod-${mod.id}`} data-module={mod.id} data-side={side} className={`banner ${themed ? `banner-${mod.world}` : ''}`} aria-labelledby={`bn-${mod.id}`}>
      <div className="banner-frame">
        {themed ? <BannerBackdrop world={mod.world} /> : art && <Film art={art} />}
        <Band
          title={mod.short}
          world={mod.world}
          pct={p.total ? p.done / p.total : 0}
          foot={`${groups.length} ${groups.length === 1 ? mod.groupLabel : plural(mod.groupLabel)}`}
        />
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
          <Link
            to={`/${mod.id}`}
            className="btn btn-primary mt-6 self-start"
            onClick={(e) => (mod.world === 'bebop' ? towAway(e, side, open) : expandInto(e, open))}
          >
            Abrir {mod.short}
            <Icon name="chevron" size={16} />
          </Link>
          {art && !themed && (
            <p className="fine mt-5 text-ink-3">
              <a href={art.source} target="_blank" rel="noopener noreferrer" className="hover:text-ink credit">
                {landscapes[mod.id] ? 'Foto' : 'Obra'}: {art.credit}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
