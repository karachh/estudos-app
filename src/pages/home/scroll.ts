import { useEffect } from 'react'
import { useNavigationType } from 'react-router-dom'
import { modules } from '../../core/modules'

// Módulo que a pessoa abriu a partir da página inicial: ao voltar pelo botão do navegador, a rolagem retorna ao banner dele
const BACK_KEY = 'estudos:home-from'
export const rememberModule = (id: string) => {
  try {
    sessionStorage.setItem(BACK_KEY, id)
  } catch {
    // sem armazenamento: volta para o começo, como antes
  }
}

export function useBackToModule(root: React.RefObject<HTMLDivElement | null>, ready: boolean) {
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


// Cada tela é fixa no topo e a seguinte sobe por cima dela. O progresso de cada uma vai para o CSS:
// --p (0 a 1) é o quanto ela já subiu; --cover é o quanto a próxima já a cobriu.
export function useStack(root: React.RefObject<HTMLDivElement | null>, ready: boolean) {
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
