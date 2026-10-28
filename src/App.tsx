import { useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useMatch } from 'react-router-dom'
import { Icon, type IconName } from './components/Icon'
import { Logo } from './components/Logo'
import { ThemeBackdrop } from './components/ThemeBackdrop'
import { getModule, modules } from './core/modules'
import { backdrops } from './data/backdrops'
import { useTheme } from './core/theme'
import ModulePage from './pages/ModulePage'
import HomePage from './pages/HomePage'
import TopicPage from './pages/TopicPage'

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      className="btn btn-ghost p-2"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  )
}

// Ícone de cada módulo, usado quando a lateral está recolhida
const moduleIcons: Record<string, IconName> = {
  profissional: 'database',
  trabalho: 'office',
  uem: 'cap',
  igreja: 'cross',
  cultura: 'book',
  mental: 'sunrise',
}

const RAIL_KEY = 'estudos:rail'

// Lateral recolhida ou aberta, lembrada por aparelho
function useRail() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(RAIL_KEY) === 'closed'
    } catch {
      return false
    }
  })
  const toggle = () =>
    setCollapsed((c) => {
      try {
        localStorage.setItem(RAIL_KEY, c ? 'open' : 'closed')
      } catch {
        // sem armazenamento: vale só para esta sessão
      }
      return !c
    })
  return { collapsed, toggle }
}

export default function App() {
  const current = getModule(useMatch('/:moduleId/*')?.params.moduleId) ?? modules[0]
  const { collapsed, toggle } = useRail()
  const home = useMatch('/')
  const backdrop = backdrops[current.id]

  // A página inicial ocupa a tela inteira, sem lateral nem abas
  if (home) {
    return (
      <div data-module="profissional" data-world="mapa" className="app">
        <HomePage />
      </div>
    )
  }

  return (
    <div
      data-module={current.id}
      data-world={current.world}
      data-backdrop={backdrop ? '' : undefined}
      className={`app min-h-dvh bg-bg md:grid ${collapsed ? 'md:grid-cols-[4.5rem_minmax(0,1fr)]' : 'md:grid-cols-[15.5rem_minmax(0,1fr)]'}`}
    >
      {backdrop && <ThemeBackdrop backdrop={backdrop} />}

      {/* Navegação lateral (desktop), recolhível */}
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-(--rail) py-5 md:flex">
        <div className={`mb-7 flex items-center ${collapsed ? 'flex-col gap-3 px-2' : 'justify-between pl-5 pr-3'}`}>
          <Link to="/" className="brand flex items-center gap-2.5 text-brand" title="Início" aria-label={collapsed ? 'Início' : undefined}>
            <Logo className="size-8" />
            {!collapsed && 'Estudos'}
          </Link>
          {!collapsed && <ThemeToggle />}
        </div>
        <nav aria-label="Módulos" className={`flex flex-col gap-1 ${collapsed ? 'items-center px-2' : 'px-3'}`}>
          {modules.map((m) => (
            <NavLink
              key={m.id}
              to={`/${m.id}`}
              data-module={m.id}
              title={collapsed ? m.label : undefined}
              aria-label={collapsed ? m.label : undefined}
              className={({ isActive }) => `nav-item ${collapsed ? 'nav-mini h-11 w-11 justify-center' : 'px-3 py-2'} ${isActive ? 'active' : ''}`}
            >
              {collapsed ? (
                <span className="text-accent">
                  <Icon name={moduleIcons[m.id] ?? 'chevron'} size={22} />
                </span>
              ) : (
                m.label
              )}
            </NavLink>
          ))}
        </nav>
        <div className={`mt-auto flex ${collapsed ? 'flex-col items-center gap-2' : 'justify-start px-3'}`}>
          {collapsed && <ThemeToggle />}
          <button
            className="btn btn-ghost p-2.5"
            onClick={toggle}
            aria-label={collapsed ? 'Abrir menu lateral' : 'Recolher menu lateral'}
            aria-expanded={!collapsed}
          >
            <Icon name={collapsed ? 'chevron' : 'back'} />
            {!collapsed && <span className="text-meta">Recolher</span>}
          </button>
        </div>
      </aside>

      {/* Barra superior (celular) */}
      <header className="flex items-center justify-between border-b border-line bg-(--rail) px-4 py-2 md:hidden">
        <Link to="/" className="brand flex items-center gap-2 text-2xl" title="Início">
          <Logo className="size-7" />
          Estudos
        </Link>
        <ThemeToggle />
      </header>

      <main className="px-4 pb-28 pt-6 md:px-12 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-[66rem]">
          <Routes>
            <Route path="/:moduleId" element={<ModulePage />} />
            <Route path="/:moduleId/t/:topicId" element={<TopicPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {/* Abas (celular) */}
      <nav
        aria-label="Módulos"
        className="fixed inset-x-0 bottom-0 z-40 flex overflow-x-auto border-t border-line bg-(--rail) pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {modules.map((m) => (
          <NavLink
            key={m.id}
            to={`/${m.id}`}
            data-module={m.id}
            className={({ isActive }) => `nav-tab shrink-0 flex-[1_0_auto] px-2 pb-3 pt-3 text-micro ${isActive ? 'active' : ''}`}
          >
            {m.short}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
