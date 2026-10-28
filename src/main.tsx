import '@fontsource-variable/newsreader'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'
import '@fontsource/barlow/400-italic.css'
import '@fontsource-variable/big-shoulders-display'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import '@fontsource/gloock/400.css'
import '@fontsource-variable/archivo-narrow/wght.css'
import '@fontsource-variable/newsreader/wght-italic.css'
import '@fontsource/young-serif'
import '@fontsource-variable/bodoni-moda'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/anton'
import '@fontsource/krona-one'
import '@fontsource/special-elite'
import '@fontsource/cinzel-decorative/700.css'
import '@fontsource-variable/noto-serif-display/wdth.css'
import '@fontsource-variable/montserrat'
import '@fontsource/bagel-fat-one'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'
import { ensureSeed } from './core/seed.ts'
import './index.css'
import './worlds.css'

ensureSeed().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>,
  )
})
