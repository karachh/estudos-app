import type { MouseEvent } from 'react'
import swordfishPixel from '../../assets/bebop/swordfish-pixel.png'

export const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// O cartão cresce até tomar a tela e só então a página do módulo aparece por baixo dele.
export function expandInto(e: MouseEvent<HTMLAnchorElement>, go: () => void) {
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

// Trabalho: a tela fica branca e "That's what she said" atravessa da direita para a esquerda, como num
// corte de The Office. A página do módulo monta por trás do branco, que se desfaz depois que a frase sai.
export function whiteOut(e: MouseEvent<HTMLAnchorElement>, go: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  if (still()) return go()
  const veil = document.createElement('div')
  Object.assign(veil.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '100',
    background: '#fbfaf6',
    overflow: 'hidden',
    pointerEvents: 'none',
    opacity: '0',
  })
  const line = document.createElement('p')
  line.textContent = "That's what she said"
  Object.assign(line.style, {
    position: 'absolute',
    top: '50%',
    left: '0',
    margin: '0',
    whiteSpace: 'nowrap',
    color: '#111',
    fontFamily: "'ITC American Typewriter', 'American Typewriter', 'Special Elite', monospace",
    fontSize: 'clamp(3rem, 11vw, 10rem)',
    letterSpacing: '-0.01em',
    lineHeight: '1',
    textTransform: 'uppercase',
  })
  veil.append(line)
  document.body.append(veil)
  const W = window.innerWidth
  const TALL = 'scaleY(1.4)' // letras mais altas, sem mudar a largura
  // -100% é a largura real da frase, então ela sempre sai inteira, qualquer que seja a fonte. O fim acelera, e o branco só se desfaz depois.
  veil.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, fill: 'forwards' }).finished.then(() => {
    window.setTimeout(go, 350)
    line
      .animate([{ transform: `translate(${W}px, -50%) ${TALL}` }, { transform: `translate(-100%, -50%) ${TALL}` }], {
        duration: 1000,
        easing: 'cubic-bezier(0.45, 0.1, 0.85, 0.65)',
        fill: 'forwards',
      })
      .finished.then(() =>
        veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: 'forwards' }).finished.then(() => veil.remove()),
      )
  })
}

// Repertório: ao abrir, a Swordfish II dispara para fora da tela na direção do nariz. A página do módulo é montada
// fora da tela, desse mesmo lado, e a nave volta por ali, de frente, puxando-a por um cabo até ela cobrir a tela.
// Aí o cabo solta e a nave segue até sair pelo outro lado. Enquanto a página entra, uma cópia do banner fica
// por baixo, para não aparecer fundo vazio. Dura cerca de 1,5 s, pouco mais que a troca de tela dos outros módulos.
const smooth = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (t: number) => Math.min(1, Math.max(0, t))

export function flyIn(e: MouseEvent<HTMLAnchorElement>, go: () => void) {
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
      // Entra embalada e cede só um pouco ao peso da página, sem chegar a parar, até sair do outro lado
      const k = u + 0.035 * Math.sin(2 * Math.PI * u)
      const x = from + (to - from) * k
      const y = H * 0.4 - Math.sin(Math.PI * u) * H * 0.06
      const b = tilt(dir * 6 * Math.cos(Math.PI * u), now) // leve mergulho e subida ao cruzar a tela
      ship.style.transform = `translate(${x}px, ${y}px) rotate(${b.toFixed(2)}deg) scale(1.2)`
      flicker(0.6)

      // Traseira da nave (do lado de onde veio) e a beirada da página, que segue o cabo até encaixar
      const tail = x + dir * w * 0.55
      // A página não bate na borda: perto do encaixe ela freia aos poucos (curva softplus) até assentar
      const ease = 70
      const softEdge = (d: number) => (d > ease * 8 ? d : ease * Math.log1p(Math.exp(d / ease)))
      const edge = dir === 1 ? softEdge(tail + gap) : W - softEdge(W - (tail - gap))
      app.style.transform = `translateX(${(dir === 1 ? edge : edge - W).toFixed(1)}px)`
      under.style.filter = `brightness(${(0.4 + 0.6 * Math.abs(dir === 1 ? edge : W - edge) / W).toFixed(3)})`
      if (!locked && (dir === 1 ? edge <= 2 : edge >= W - 2)) locked = now

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
