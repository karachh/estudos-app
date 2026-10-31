import type { MouseEvent } from 'react'
import inicio from '../../assets/ia/ia-vermelha-virada-inicio.jpg'
import virada from '../../assets/ia/ia-vermelha-virada.mp4'

const RATE = 2.4 // a virada dura ~4,3 s na página do módulo e ~1,8 s aqui
const LEAD = 350 // a página do módulo monta por baixo este tempo antes de a varredura começar, em ms
const SWEEP = 560 // duração da varredura que revela a página, em ms
const ARRIVAL = 2000 // janela, em ms, em que o módulo que acabou de abrir mostra o alien já de frente

let arrivedAt = -Infinity
let running = false

// A virada já passou na transição: o módulo que abre em seguida não a repete
export const justArrived = () => performance.now() - arrivedAt < ARRIVAL

// Copia o banner na mesma posição, com as animações no mesmo ponto, para a troca de página não aparecer
function freezeCopy(banner: HTMLElement) {
  const r = banner.getBoundingClientRect()
  const copy = banner.cloneNode(true) as HTMLElement
  copy.removeAttribute('id')
  copy.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'))
  Object.assign(copy.style, { position: 'absolute', left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, margin: '0' })
  return copy
}

function syncAnimations(from: HTMLElement, to: HTMLElement) {
  const live = [from, ...from.querySelectorAll<HTMLElement>('*')]
  const copied = [to, ...to.querySelectorAll<HTMLElement>('*')]
  live.forEach((el, i) => {
    const mine = copied[i]?.getAnimations() ?? []
    el.getAnimations().forEach((a, k) => {
      if (mine[k]) mine[k].currentTime = a.currentTime
    })
  })
}

// IA: a tela fica como está e o alien do banner vira de frente, ali mesmo, rápido. Quando ele termina, uma linha de
// varredura vermelha desce e revela a página do módulo por baixo do banner, que continua parado até ser coberto.
export function alienTurnIn(e: MouseEvent<HTMLAnchorElement>, go: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  if (running) return
  const banner = (e.currentTarget as HTMLElement).closest<HTMLElement>('.banner')
  const robot = banner?.querySelector<HTMLElement>('.bt-nr-robot')
  const glow = robot?.querySelector<HTMLElement>('.bt-nr-glow')
  if (!banner || !robot || !glow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return go()
  running = true

  const video = document.createElement('video')
  video.muted = true
  video.playsInline = true
  video.preload = 'auto'
  video.poster = inicio
  video.src = virada
  video.setAttribute('aria-hidden', 'true')
  // Mesmo enquadramento e mesmo filtro das imagens do banner (.bt-nr-robot img)
  Object.assign(video.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: '62% 30%',
    filter: 'saturate(0.78) contrast(0.92) brightness(1.04) sepia(0.14)',
    opacity: '0',
  })
  robot.insertBefore(video, glow) // abaixo do brilho, que se apaga enquanto o vídeo entra

  let swept = false
  const reveal = () => {
    if (swept) return
    swept = true

    const veil = document.createElement('div')
    Object.assign(veil.style, { position: 'fixed', inset: '0', zIndex: '100', overflow: 'hidden', pointerEvents: 'none' })
    const stage = document.createElement('div')
    Object.assign(stage.style, { position: 'absolute', inset: '0', background: '#0a131d' })
    const line = document.createElement('span')
    Object.assign(line.style, {
      position: 'absolute',
      left: '0',
      right: '0',
      top: '0',
      height: '2px',
      background: '#ff2e55',
      boxShadow: '0 0 22px 5px rgba(255, 46, 85, 0.75)',
      opacity: '0',
    })
    video.remove() // sai antes da cópia, para ela não levar um segundo vídeo vazio
    const copy = freezeCopy(banner)
    copy.querySelector<HTMLElement>('.bt-nr-glow')?.style.setProperty('display', 'none')
    copy.querySelector('.bt-nr-robot')?.append(video)
    stage.append(copy)
    veil.append(stage, line)
    document.body.append(veil)
    syncAnimations(banner, copy)

    arrivedAt = performance.now()
    go()
    window.scrollTo({ top: 0, behavior: 'instant' })
    window.setTimeout(() => {
      const ease = 'cubic-bezier(0.65, 0, 0.35, 1)'
      line.style.opacity = '1'
      line.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${window.innerHeight}px)` }], { duration: SWEEP, easing: ease, fill: 'forwards' })
      stage
        .animate([{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(100% 0 0 0)' }], { duration: SWEEP, easing: ease, fill: 'forwards' })
        .finished.then(() => {
          veil.remove()
          running = false
        })
    }, LEAD)
  }

  video.addEventListener('ended', reveal)
  video.addEventListener('error', reveal)
  // Se o vídeo não começar logo (aparelho lento, bateria fraca), abre o módulo sem esperar
  const stuck = window.setTimeout(reveal, 1200)
  video.addEventListener(
    'playing',
    () => {
      window.clearTimeout(stuck)
      video.style.opacity = '1'
      glow.animate([{ opacity: getComputedStyle(glow).opacity }, { opacity: 0 }], { duration: 220, fill: 'forwards' })
    },
    { once: true },
  )
  video.playbackRate = RATE
  video.defaultPlaybackRate = RATE
  video.play().catch(reveal)
}
