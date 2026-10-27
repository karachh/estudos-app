// Fatia de pizza centrada em (0,0): usada para mostrar quanto do tópico já foi marcado.
export function pie(r: number, ratio: number) {
  if (ratio <= 0) return ''
  if (ratio >= 1) return `M${-r} 0a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`
  const a = ratio * Math.PI * 2
  const x = r * Math.sin(a)
  const y = -r * Math.cos(a)
  return `M0 0V${-r}A${r} ${r} 0 ${ratio > 0.5 ? 1 : 0} 1 ${x.toFixed(2)} ${y.toFixed(2)}Z`
}

// Plural simples dos rótulos dos módulos (tópico, conteúdo, item, tema).
export const plural = (word: string) => (word.endsWith('m') ? `${word.slice(0, -1)}ns` : `${word}s`)
