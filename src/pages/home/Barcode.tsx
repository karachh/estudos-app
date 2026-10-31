import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Progress } from '../../core/queries'
import { still } from './transitions'

// Código de barras do progresso: um traço por tópico, mais grosso quanto mais avançado. Ao aparecer, os traços
// sobem rápido da esquerda para a direita e a contagem corre até o valor; de vez em quando um brilho fraco
// atravessa o código (.barcode em index.css).
export function Barcode({ items, p, center }: { items: Progress[]; p: Progress; center?: boolean }) {
  const box = useRef<HTMLSpanElement>(null)
  const done = useCountUp(p.done, box)
  const total = useCountUp(p.total, box)
  return (
    <div className={`text-accent ${center ? 'flex flex-col md:items-center' : ''}`}>
      <span ref={box} className="barcode flex h-11 items-stretch gap-[2px]" style={{ '--n': items.length } as CSSProperties} aria-hidden="true">
        {items.map((p, i) => {
          const done = p.total > 0 && p.done === p.total
          const started = p.done > 0
          return (
            <span
              key={i}
              style={{ '--i': i } as CSSProperties}
              className={done ? 'w-[4px] bg-current' : started ? 'w-[2px] bg-current' : 'bc-idle w-px bg-current'}
            />
          )
        })}
        <i className="bc-scan" />
      </span>
      <span className="mono mt-1.5 block text-micro tracking-[0.2em]">
        <span className="sr-only">{itemsLabel(p)}</span>
        <span aria-hidden="true">{itemsLabel({ done, total })}</span>
      </span>
    </div>
  )
}

const itemsLabel = (p: Progress) => `${p.done} de ${p.total} itens`

// Conta de 0 até o valor na primeira vez que o elemento aparece na tela
function useCountUp(value: number, el: React.RefObject<HTMLElement | null>) {
  const [shown, setShown] = useState(() => (still() ? value : 0))
  const started = useRef(false)
  useEffect(() => {
    const node = el.current
    if (started.current || !node || still()) return setShown(value)
    let raf = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      started.current = true
      node.dataset.on = '' // dispara a impressão dos traços
      const t0 = performance.now()
      const dur = 700
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / dur)
        setShown(Math.round(value * (1 - (1 - t) ** 3)))
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    })
    io.observe(node)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, el])
  return shown
}
