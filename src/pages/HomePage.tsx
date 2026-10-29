import { useEffect, useRef, type CSSProperties, type MouseEvent } from 'react'
import { Link, useNavigate, useNavigationType } from 'react-router-dom'
import swordfishPixel from '../assets/bebop/swordfish-pixel.png'
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

// Repertório: ao abrir, a Swordfish II dispara para fora da tela na direção do nariz. A página do módulo é montada
// fora da tela, desse mesmo lado, e a nave volta por ali, de frente, puxando-a por um cabo até ela cobrir a tela.
// Aí o cabo solta e a nave segue até sair pelo outro lado. Enquanto a página entra, uma cópia do banner fica
// por baixo, para não aparecer fundo vazio. Dura cerca de 1,5 s, pouco mais que a troca de tela dos outros módulos.
const smooth = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (t: number) => Math.min(1, Math.max(0, t))

function flyIn(e: MouseEvent<HTMLAnchorElement>, go: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  const banner = (e.currentTarget as HTMLElement).closest<HTMLElement>('.banner')
  const pane = banner?.querySelector<HTMLElement>('.pane')
  const rest = banner?.querySelector<HTMLElement>('.bt-ship')
  if (!banner || !pane || !rest || still()) return go()
  if (pane.dataset.flying) return
  pane.dataset.flying = '1'

  const r = rest.getBoundingClientRect()
  const W = window.innerWidth
  const H = window.innerHeight
  const w = r.width
  const h = r.height
  // A imagem original aponta o nariz para a esquerda; espelhada, para a direita
  const dir = getComputedStyle(rest).scale.startsWith('-1') ? 1 : -1 // lado para onde ela sai (e por onde volta)

  const ship = document.createElement('div')
  ship.className = 'tow-ship'
  Object.assign(ship.style, { width: `${w}px`, height: `${h}px`, left: `${-w / 2}px`, top: `${-h / 2}px` })
  const img = new Image()
  img.src = swordfishPixel
  img.alt = ''
  const flame = document.createElement('span')
  flame.className = 'fly-flame'
  ship.append(flame, img)
  // Vira a nave para um lado: espelha a imagem e põe a chama na traseira
  const face = (side: 1 | -1) => {
    img.style.transform = `scaleX(${-side})`
    flame.style.left = `${50 - side * 44}%`
    flame.style.top = '34%'
    flame.style.transformOrigin = side === 1 ? '100% 50%' : '0 50%'
    flame.dataset.side = side === 1 ? 'back-left' : 'back-right'
  }
  face(dir)

  const ns = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(ns, 'svg')
  svg.setAttribute('class', 'tow-line')
  const cable = document.createElementNS(ns, 'path')
  const spark = document.createElementNS(ns, 'circle')
  spark.setAttribute('r', '0')
  svg.append(cable, spark)
  document.body.append(svg, ship)
  rest.style.visibility = 'hidden'

  let bank = 0
  let last = performance.now()
  const tilt = (target: number, now: number) => {
    bank += (target - bank) * (1 - Math.exp(-(now - last) / 140))
    last = now
    return bank
  }
  const flicker = (boost: number) =>
    (flame.style.scale = `${(0.8 + Math.random() * 0.4 + boost).toFixed(2)} ${(0.85 + Math.random() * 0.3).toFixed(2)}`)

  // 1) Saída: acelera na direção do nariz, subindo um pouco, até sumir pela borda
  const start = { x: r.left + w / 2, y: r.top + h / 2 }
  const out = { x: dir === 1 ? W + w * 0.8 : -w * 0.8, y: start.y - H * 0.12 }
  const A = 420
  const tA = performance.now()
  const exit = (now: number) => {
    const u = clamp01((now - tA) / A)
    const k = u * u * (1.6 - 0.6 * u) // arranca e acelera
    const x = start.x + (out.x - start.x) * k
    const y = start.y + (out.y - start.y) * smooth(u)
    const b = tilt(-dir * 10 * Math.sin(Math.PI * u), now) // nariz para cima na subida
    ship.style.transform = `translate(${x}px, ${y}px) rotate(${b.toFixed(2)}deg) scale(${(1 + 0.15 * u).toFixed(3)})`
    flicker(u * 1.2)
    pane.style.transform = `scale(${(1 - 0.03 * u).toFixed(4)})`
    if (u < 1) return void requestAnimationFrame(exit)
    swap()
  }

  // 2) Troca: monta a página do módulo, guarda uma cópia do banner por baixo e põe a página fora da tela
  const under = document.createElement('div')
  under.className = 'tow-under'
  const swap = () => {
    const copy = banner.cloneNode(true) as HTMLElement
    copy.removeAttribute('id')
    copy.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'))
    under.append(copy)
    document.body.append(under)
    go()
    window.scrollTo({ top: 0, behavior: 'instant' })
    const id = banner.dataset.module
    const t0 = performance.now()
    const wait = () => {
      const app = document.querySelector<HTMLElement>(`.app[data-module="${id}"]`)
      if (app) return tow(app)
      if (performance.now() - t0 < 800) return void requestAnimationFrame(wait)
      finish(null)
    }
    requestAnimationFrame(wait)
  }

  // 3) Volta: a nave entra pelo mesmo lado, agora de frente para dentro, puxando a página pelo cabo
  const tow = (app: HTMLElement) => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    Object.assign(app.style, { position: 'relative', zIndex: '99', willChange: 'transform', boxShadow: '0 0 80px rgba(0,0,0,.7)' })
    face(dir === 1 ? -1 : 1)
    bank = 0
    const from = dir === 1 ? W + w * 0.7 : -w * 0.7
    const gap = 80 // comprimento do cabo esticado
    // Ponto em que a página encaixa (a beirada chega na borda da tela); a nave chega nele a 80% do caminho
    // e usa o resto para soltar o cabo e sair embalada
    const lockAt = dir === 1 ? -gap - w * 0.55 : W + gap + w * 0.55
    const to = from + (lockAt - from) / 0.8
    const B = 1050
    const tB = performance.now()
    let locked = 0 // instante em que a página encaixou e o cabo soltou
    const step = (now: number) => {
      const u = clamp01((now - tB) / B)
      // Entra embalada, perde velocidade enquanto arrasta o peso da página e, solta, acelera de novo para sair
      const k = u + 0.12 * Math.sin(2 * Math.PI * u)
      const x = from + (to - from) * k
      const y = H * 0.4 - Math.sin(Math.PI * u) * H * 0.06
      const b = tilt(dir * 6 * Math.cos(Math.PI * u), now) // leve mergulho e subida ao cruzar a tela
      ship.style.transform = `translate(${x}px, ${y}px) rotate(${b.toFixed(2)}deg) scale(1.2)`
      flicker(0.6)

      // Traseira da nave (do lado de onde veio) e a beirada da página, que segue o cabo até encaixar
      const tail = x + dir * w * 0.55
      const edge = dir === 1 ? Math.max(0, tail + gap) : Math.min(W, tail - gap)
      app.style.transform = `translateX(${dir === 1 ? edge : edge - W}px)`
      under.style.filter = `brightness(${(0.4 + 0.6 * Math.abs(dir === 1 ? edge : W - edge) / W).toFixed(3)})`
      if (!locked && (dir === 1 ? edge <= 0 : edge >= W)) locked = now

      const slack = locked ? clamp01((now - locked) / 180) : 0
      const hook = { x: edge, y: y + 18 }
      cable.setAttribute('d', `M${tail} ${y + 6}Q${(tail + hook.x) / 2} ${(y + hook.y) / 2 + 10 + slack * 30} ${hook.x} ${hook.y}`)
      cable.setAttribute('stroke-opacity', String(1 - slack))
      spark.setAttribute('cx', String(hook.x))
      spark.setAttribute('cy', String(hook.y))
      spark.setAttribute('r', String(locked ? 14 * Math.sin(Math.PI * slack) : 0))

      if (u < 1) return void requestAnimationFrame(step)
      finish(app)
    }
    requestAnimationFrame(step)
  }

  const finish = (app: HTMLElement | null) => {
    if (app) Object.assign(app.style, { position: '', zIndex: '', willChange: '', boxShadow: '', transform: '' })
    ship.remove()
    svg.remove()
    under.remove()
  }

  requestAnimationFrame(exit)
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
