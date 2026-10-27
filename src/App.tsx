import { NavLink, Navigate, Route, Routes, useMatch } from 'react-router-dom'
import { Meter } from './components/Bars'
import { Icon } from './components/Icon'
import { modules } from './core/modules'
import { useModuleTotals } from './core/queries'
import { useTheme } from './core/theme'
import ModulePage from './pages/ModulePage'
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

export default function App() {
  const current = useMatch('/:moduleId/*')?.params.moduleId
  const totals = useModuleTotals()

  return (
    <div data-module={current} className="min-h-dvh md:grid md:grid-cols-[17rem_minmax(0,1fr)]">
      {/* Navegação lateral (desktop) */}
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-surface p-5 md:flex">
        <div className="mb-8 flex items-center justify-between">
          <span className="font-serif text-2xl italic">Estudos</span>
          <ThemeToggle />
        </div>
        <nav aria-label="Módulos" className="flex flex-col gap-1">
          {modules.map((m) => {
            const p = totals?.get(m.id) ?? { done: 0, total: 0 }
            return (
              <NavLink
                key={m.id}
                to={`/${m.id}`}
                data-module={m.id}
                className={({ isActive }) =>
                  `rounded-lg border-l-2 px-3 py-2.5 ${
                    isActive ? 'border-accent bg-raised text-ink' : 'border-transparent text-ink-2 hover:bg-raised'
                  }`
                }
              >
                <span className="block font-medium">{m.label}</span>
                {p.total > 0 && <Meter p={p} className="mt-2" />}
              </NavLink>
            )
          })}
        </nav>
      </aside>

      {/* Barra superior (celular) */}
      <header className="flex items-center justify-between border-b border-line px-4 py-2 md:hidden">
        <span className="font-serif text-xl italic">Estudos</span>
        <ThemeToggle />
      </header>

      <main className="px-4 pb-28 pt-8 md:px-14 md:pb-24 md:pt-14">
        <div className="mx-auto max-w-3xl">
          <Routes>
            <Route path="/" element={<Navigate to={`/${modules[0].id}`} replace />} />
            <Route path="/:moduleId" element={<ModulePage />} />
            <Route path="/:moduleId/t/:topicId" element={<TopicPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {/* Abas (celular) */}
      <nav
        aria-label="Módulos"
        className="fixed inset-x-0 bottom-0 z-10 flex overflow-x-auto border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {modules.map((m) => (
          <NavLink
            key={m.id}
            to={`/${m.id}`}
            data-module={m.id}
            className={({ isActive }) =>
              `shrink-0 flex-1 border-t-2 px-4 py-3 text-center text-sm ${
                isActive ? 'border-accent font-medium text-ink' : 'border-transparent text-ink-2'
              }`
            }
          >
            {m.short}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
