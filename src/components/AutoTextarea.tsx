import { useLayoutEffect, useRef, type TextareaHTMLAttributes } from 'react'

// Textarea que cresce com o texto, sem barra de rolagem própria. Funciona em qualquer navegador.
export function AutoTextarea({ value, className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
    fit()
    // Recalcula quando a largura muda ou a fonte termina de carregar (as duas mudam a quebra de linha)
    const observer = new ResizeObserver(fit)
    observer.observe(el)
    document.fonts?.ready.then(fit)
    return () => observer.disconnect()
  }, [value])

  return <textarea ref={ref} rows={1} value={value} className={`resize-none overflow-hidden ${className}`} {...props} />
}
