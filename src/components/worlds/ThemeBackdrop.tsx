import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import type { Backdrop } from '../../data/backdrops'
import { AlienTurn } from './AlienTurn'

// Fundo temático: as imagens ficam fixas atrás da página e se trocam conforme a rolagem (ver data/backdrops.ts).
// No modo "scroll", ao passar de um ponto da rolagem a linha de varredura desce a tela de uma vez, sem acompanhar
// a rolagem, e a próxima imagem entra atrás dela; no modo "section", a imagem segue o grupo que está na tela e troca
// com um esmaecimento. O CSS (.tbg em worlds.css) apaga as imagens para o texto seguir legível.
const STEP = 0.9 // alturas de tela rolada para passar de uma imagem à seguinte
const SLACK = 0.1 // folga em volta do ponto de troca, para a imagem não ir e voltar com a rolagem parada ali
const SWEEP = 750 // duração da passada da linha, em ms

export function ThemeBackdrop({ backdrop }: { backdrop: Backdrop }) {
  const root = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const { images, mode, tag } = backdrop

  useEffect(() => {
    const el = root.current
    if (!el) return
    const layers = Array.from(el.querySelectorAll<HTMLElement>('.tbg-layer'))
    const n = layers.length
    // Cada página começa numa imagem diferente
    const seed = [...pathname].reduce((sum, c) => sum + c.charCodeAt(0), 0) % n
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scrolled = () => (still ? 0 : window.scrollY / (window.innerHeight * STEP))
    let raf = 0
    let sweep = 0
    let step = Math.max(0, Math.floor(scrolled()))
    let shown = (seed + step) % n

    const show = (cur: number, next: number, f: number) => {
      layers.forEach((l, k) => {
        l.dataset.role = k === cur ? 'cur' : k === next && f > 0.001 ? 'next' : 'off'
      })
      el.style.setProperty('--w', f.toFixed(3))
      el.style.setProperty('--scan', f > 0.01 && f < 0.99 ? '1' : '0')
      el.style.setProperty('--tint', images[next >= 0 ? next : cur].tint)
    }

    const sweepTo = (to: number) => {
      const start = performance.now()
      const tick = (now: number) => {
        const u = Math.min(1, (now - start) / SWEEP)
        if (u < 1) {
          show(shown, to, u * u * (3 - 2 * u))
          sweep = requestAnimationFrame(tick)
          return
        }
        sweep = 0
        shown = to
        // A rolagem pode ter passado de outro ponto durante a passada
        paint()
      }
      sweep = requestAnimationFrame(tick)
    }

    const paint = () => {
      raf = 0
      if (mode === 'section') {
        // O grupo cujo topo já passou de 45% da tela manda no fundo; sem grupos (página do tópico), vale a semente
        const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id^="group-"]'))
        let i = sections.length ? 0 : seed
        sections.forEach((s, k) => {
          if (s.getBoundingClientRect().top < window.innerHeight * 0.45) i = k
        })
        show(i % n, -1, 0)
        return
      }
      const pos = scrolled()
      if (pos >= step + 1 + SLACK || pos < step - SLACK) step = Math.max(0, Math.floor(pos))
      if (sweep) return
      const to = (seed + step) % n
      if (to === shown) show(shown, -1, 0)
      else sweepTo(to)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }

    paint()
    // A lista de grupos chega do banco depois do primeiro desenho
    const late = window.setTimeout(paint, 400)
    if (!still || mode === 'section') {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
    }
    return () => {
      window.clearTimeout(late)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
      if (sweep) cancelAnimationFrame(sweep)
    }
  }, [pathname, images, mode])

  return (
    <div ref={root} className="tbg" data-fx={mode === 'section' ? 'fade' : 'scan'} data-page={pathname.includes('/t/') ? 'topic' : 'module'} aria-hidden="true">
      {images.map((a) => (
        <div key={a.src} className="tbg-layer" data-role="off">
          {a.turn && !pathname.includes('/t/') ? (
            <AlienTurn className="tbg-img" style={{ objectPosition: a.pos }} />
          ) : (
            <img src={a.src} alt="" decoding="async" className="tbg-img" style={{ objectPosition: a.pos }} />
          )}
        </div>
      ))}
      <span className="tbg-scan" />
      <span className="tbg-tag">{tag}</span>
    </div>
  )
}
