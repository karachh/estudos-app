import { useEffect, useRef, type CSSProperties, type MouseEvent } from 'react'
import { Link, useNavigate, useNavigationType } from 'react-router-dom'
import swordfish from '../assets/bebop/swordfish.png'
import { Band, Film } from '../components/Cover'
import { Icon } from '../components/Icon'
import { BannerBackdrop } from '../components/Worlds'
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
          <Band title="Estudos" foot="Cauã Karach" footStar={false} topStar={false} letters />
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

      {/* Pontos de parada da rolagem: um por tela (ver html[data-snap] em index.css) */}
      {[0, ...modules.map((_, i) => i + 1)].map((i) => (
        <span key={i} className="snap-mark" style={{ '--i': i } as CSSProperties} aria-hidden="true" />
      ))}

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
    // A rolagem "trava" em cada tela, para o módulo não passar direto
    document.documentElement.dataset.snap = ''
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      delete document.documentElement.dataset.snap
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

// Repertório: ao abrir, a Swordfish II sai na hora de onde estiver (inclusive se foi arrastada) e faz uma curva em S:
// avança para o lado em que o nariz aponta, sobe, vira e mergulha na direção da tela, crescendo até tapar a visão.
// Ela inclina seguindo a própria trajetória, balança como quem pilota, solta chama pelo motor e deixa rastro; no
// fim surgem linhas de velocidade e a tela treme de leve. Um véu escuro fecha a passagem e a página do módulo entra.
const smooth = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (t: number) => Math.min(1, Math.max(0, t))
const bezier = (a: number, b: number, c: number, d: number, t: number) =>
  (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d
const bezierSlope = (a: number, b: number, c: number, d: number, t: number) =>
  3 * (1 - t) ** 2 * (b - a) + 6 * (1 - t) * t * (c - b) + 3 * t * t * (d - c)

function flyIn(e: MouseEvent<HTMLAnchorElement>, go: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  const banner = (e.currentTarget as HTMLElement).closest<HTMLElement>('.banner')
  const pane = banner?.querySelector<HTMLElement>('.pane')
  const frameEl = banner?.querySelector<HTMLElement>('.banner-frame')
  const rest = banner?.querySelector<HTMLElement>('.bt-ship')
  if (!banner || !pane || !frameEl || !rest || still()) return go()
  if (pane.dataset.flying) return
  pane.dataset.flying = '1'

  const r = rest.getBoundingClientRect()
  const flip = getComputedStyle(rest).scale.startsWith('-1') ? -1 : 1 // espelhada ou não
  const facing = -flip // a imagem original aponta o nariz para a esquerda
  const W = window.innerWidth
  const H = window.innerHeight
  const P0 = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
  const P3 = { x: W / 2, y: H * 0.48 }
  const P1 = { x: P0.x + facing * W * 0.26, y: P0.y - H * 0.26 }
  const P2 = { x: P3.x - facing * W * 0.2, y: P3.y - H * 0.18 }
  // Escala final: a nave passa a cobrir bem mais que a tela
  const grow = (Math.max(W, H) / r.width) * 3.2

  const make = (cls: string) => {
    const el = document.createElement('div')
    el.className = cls
    Object.assign(el.style, { width: `${r.width}px`, height: `${r.height}px`, left: `${-r.width / 2}px`, top: `${-r.height / 2}px` })
    const img = new Image()
    img.src = swordfish
    img.alt = ''
    img.style.transform = `scaleX(${flip})`
    el.append(img)
    return el
  }
  const ghosts = [0.3, 0.18, 0.09].map((o) => {
    const g = make('tow-ship fly-ghost')
    g.style.opacity = '0'
    g.dataset.o = String(o)
    return g
  })
  const ship = make('tow-ship')
  // Chama do motor, presa na traseira (a imagem tem os motores do lado oposto ao nariz, um pouco acima do meio)
  const flame = document.createElement('span')
  flame.className = 'fly-flame'
  Object.assign(flame.style, {
    left: `${50 - facing * 44}%`,
    top: '34%',
    transformOrigin: facing === 1 ? '100% 50%' : '0 50%',
  })
  flame.dataset.side = facing === 1 ? 'back-left' : 'back-right'
  ship.prepend(flame)
  const lines = document.createElement('div')
  lines.className = 'fly-lines'
  const veil = document.createElement('div')
  veil.className = 'tow-veil'
  document.body.append(lines, ...ghosts, ship, veil)
  rest.style.visibility = 'hidden'
  pane.style.willChange = 'transform, filter'

  const trail: string[] = []
  const T = 1500
  const t0 = performance.now()
  const frame = (now: number) => {
    const u = clamp01((now - t0) / T)
    // Ponto da curva: começa rápido (sem parada) e assenta no centro
    const k = 1 - (1 - u) ** 1.8
    const x = bezier(P0.x, P1.x, P2.x, P3.x, k)
    const y = bezier(P0.y, P1.y, P2.y, P3.y, k)
    // Tamanho: cresce desde o início e acelera no fim, como algo vindo na nossa direção
    const near = 0.22 * u + 0.78 * u ** 2.6
    const scale = Math.exp(Math.log(grow) * near)
    // Inclinação: o nariz segue a tangente da curva; perto de nós ela se endireita. Mais o balanço do piloto.
    const tx = bezierSlope(P0.x, P1.x, P2.x, P3.x, k)
    const ty = bezierSlope(P0.y, P1.y, P2.y, P3.y, k)
    const heading = (Math.atan2(ty * facing, tx * facing) * 180) / Math.PI
    const bank = Math.max(-55, Math.min(55, heading)) * (1 - 0.85 * near)
    const sway = Math.sin(u * Math.PI * 3.2) * 7 * (1 - u)
    const roll = 1 - 0.22 * Math.sin(u * Math.PI * 2.2) ** 2 * (1 - u) // achata como quem gira no próprio eixo
    const tf = `translate(${x}px, ${y}px) rotate(${(bank + sway).toFixed(2)}deg) scale(${scale.toFixed(3)}, ${(scale * roll).toFixed(3)})`
    ship.style.transform = tf
    ship.style.filter = `blur(${(u ** 3 * 6).toFixed(2)}px)`
    flame.style.scale = `${(0.75 + Math.random() * 0.5 + u).toFixed(2)} ${(0.85 + Math.random() * 0.3).toFixed(2)}`

    // Rastro: cópias que repetem onde a nave esteve alguns quadros atrás
    trail.unshift(tf)
    if (trail.length > 12) trail.pop()
    ghosts.forEach((g, i) => {
      const old = trail[(i + 1) * 3]
      if (!old) return
      g.style.transform = old
      g.style.opacity = String(Number(g.dataset.o) * (1 - u * 0.6))
    })

    // Linhas de velocidade e um tremor leve quando ela já está perto
    lines.style.opacity = String((smooth(clamp01((u - 0.35) / 0.5)) * 0.9).toFixed(3))
    lines.style.transform = `scale(${(1 + u * 0.6).toFixed(3)}) rotate(${(u * 8).toFixed(2)}deg)`
    const shake = smooth(clamp01((u - 0.5) / 0.5)) * 5
    frameEl.style.translate = `${((Math.random() - 0.5) * shake).toFixed(1)}px ${((Math.random() - 0.5) * shake).toFixed(1)}px`

    // O cartão fica para trás: recua e escurece
    pane.style.transform = `scale(${(1 - 0.06 * k).toFixed(4)})`
    pane.style.filter = `brightness(${(1 - 0.5 * k).toFixed(3)})`

    // Quando a nave já tapa a tela, o véu fecha
    veil.style.opacity = String(smooth(clamp01((u - 0.72) / 0.28)))

    if (u < 1) return void requestAnimationFrame(frame)
    go()
    window.setTimeout(() => {
      ship.remove()
      lines.remove()
      ghosts.forEach((g) => g.remove())
      veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 480, fill: 'forwards' }).finished.then(() => veil.remove())
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
            onClick={(e) => (mod.world === 'bebop' ? flyIn(e, open) : expandInto(e, open))}
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
