import { useState } from 'react'

export type Theme = 'dark' | 'light'

const KEY = 'estudos:theme'

function read(): Theme {
  try {
    return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0d0c0a' : '#ece5d3')
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // sem armazenamento (aba privada): o tema vale só para esta sessão
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read)
  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    apply(next)
    setTheme(next)
  }
  return { theme, toggle }
}
