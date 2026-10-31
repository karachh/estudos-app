import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/ui/Icon'
import { Cross, Fraction, ProgressMark, Punches } from '../../components/ui/Marks'
import { db, type CheckItem, type Topic } from '../../core/db'
import type { AppModule } from '../../core/modules'
import type { Progress } from '../../core/queries'
import { contents } from './helpers'

export function ControlRow({
  mod,
  topic,
  index,
  progress,
  materials,
}: {
  mod: AppModule
  topic: Topic
  index: number
  progress?: Progress
  materials?: number
}) {
  const p = progress ?? { done: 0, total: 0 }
  return (
    <Link
      to={`/${mod.id}/t/${topic.id}`}
      className={`grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-3 px-2 py-3 transition-colors hover:bg-raised row-lit`}
    >
      <span className="flex items-center gap-1.5">
        {!mod.unnumbered?.includes(topic.title) && <span className="mono w-6 text-right text-meta font-bold text-accent">{String(index + 1).padStart(2, '0')}</span>}
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-semibold">{topic.title}</span>
          {topic.badge && (
            <span className="mono rounded-full border border-accent px-2 text-micro uppercase text-accent">
              {topic.badge}
            </span>
          )}
        </span>
        {topic.flow && <span className="block text-sm text-ink-3">{topic.flow}</span>}
        {p.total > 0 && (
          <span className="mt-1.5 block">
            <Punches p={p} />
          </span>
        )}
      </span>
      <span className="flex items-center gap-2.5">
        {p.total > 0 ? <Fraction p={p} className="text-sm" /> : <span className="text-sm text-ink-3">{contents(materials)}</span>}
        <ProgressMark world={mod.world} p={p} size={18} />
      </span>
    </Link>
  )
}

// Fica fora do componente para o tópico continuar aberto ao voltar de dentro dele, com a rolagem no mesmo ponto
const openRows = new Set<number>()

// Tópico que abre o checklist ali mesmo, com as seções separadas; links e observações ficam ao entrar nele
export function ExpandRow({
  mod,
  topic,
  index,
  progress,
  checks,
}: {
  mod: AppModule
  topic: Topic
  index: number
  progress?: Progress
  checks: CheckItem[]
}) {
  const [open, setOpen] = useState(() => openRows.has(topic.id))
  const p = progress ?? { done: 0, total: 0 }
  const sections = [...new Set([...mod.defaultSections, ...checks.map((c) => c.section)])].filter((s) => checks.some((c) => c.section === s))

  function toggle() {
    if (open) openRows.delete(topic.id)
    else openRows.add(topic.id)
    setOpen(!open)
  }

  return (
    <>
      <button
        type="button"
        className="grid w-full cursor-pointer grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-3 px-2 py-3 text-left transition-colors hover:bg-raised"
        onClick={toggle}
        aria-expanded={open}
      >
        <span className="mono w-6 justify-self-end text-right text-meta font-bold text-accent">{String(index + 1).padStart(2, '0')}</span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-semibold">{topic.title}</span>
            {topic.badge && <span className="mono rounded-full border border-accent px-2 text-micro uppercase text-accent">{topic.badge}</span>}
          </span>
          {topic.flow && <span className="block text-sm text-ink-3">{topic.flow}</span>}
          {p.total > 0 && (
            <span className="mt-1.5 block">
              <Punches p={p} />
            </span>
          )}
        </span>
        <span className="flex items-center gap-2.5">
          {p.total > 0 && <Fraction p={p} className="text-sm" />}
          <ProgressMark world={mod.world} p={p} size={18} />
          <span className={`row-chevron text-ink-3 ${open ? 'row-chevron-open' : ''}`}>
            <Icon name="chevron" size={16} />
          </span>
        </span>
      </button>
      {open && (
        <div className="topic-drawer">
          {sections.length === 0 ? (
            <p className="text-ink-3">Nenhum item ainda. Entre no tópico para criar o checklist.</p>
          ) : (
            <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
              {sections.map((section) => {
                const list = checks.filter((c) => c.section === section).sort((a, b) => a.order - b.order)
                return (
                  <section key={section} aria-label={section}>
                    <div className="mb-1 flex items-baseline justify-between">
                      <h3 className="sub-head display text-lead text-ink-2">{section}</h3>
                      <span className="tabular-nums text-sm text-ink-3">
                        {list.filter((c) => c.done).length}/{list.length}
                      </span>
                    </div>
                    <ul>
                      {list.map((c) => (
                        <li key={c.id} className="border-t border-line py-2 first:border-t-0">
                          <label className={`flex cursor-pointer items-start gap-3 ${c.done ? 'text-ink-3 line-through decoration-ink-3/60' : ''}`}>
                            <input type="checkbox" className="check" checked={c.done} onChange={() => db.checks.update(c.id, { done: !c.done })} />
                            <span className="min-w-0 flex-1">{c.text}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </section>
                )
              })}
            </div>
          )}
          <Link to={`/${mod.id}/t/${topic.id}`} className="btn mt-5">
            Entrar no tópico
            <Icon name="chevron" size={15} />
          </Link>
          <span className="mt-2 block text-sm text-ink-3 sm:ml-3 sm:mt-0 sm:inline">Links de cada item e observações</span>
        </div>
      )}
    </>
  )
}

export function Niche({
  mod,
  topic,
  progress,
  materials,
}: {
  mod: AppModule
  topic: Topic
  progress?: Progress
  materials?: number
}) {
  const p = progress ?? { done: 0, total: 0 }
  const state = p.total === 0 ? '' : p.done === p.total ? 'concluído' : p.done > 0 ? 'em andamento' : ''
  const ratio = p.total ? p.done / p.total : 0
  return (
    <Link to={`/${mod.id}/t/${topic.id}`} className={`niche w-full ${state === 'em andamento' ? 'niche-active' : ''}`}>
      {/* Janela em arco que se enche de dourado de baixo para cima */}
      <span className="niche-head" aria-hidden="true">
        <span className="niche-fill" style={{ height: `${ratio * 100}%` }} />
        <Cross size={28} className={`niche-star ${ratio >= 0.5 ? 'over' : ''}`} />
      </span>
      <span className="mt-4 px-3 font-serif text-reading font-medium leading-snug">{topic.title}</span>
      {topic.flow && <span className="mt-1 px-3 text-sm text-ink-3">{topic.flow}</span>}
      <span className="mt-auto px-3 pb-4 pt-3 text-sm text-ink-3">
        {p.total > 0 ? <Fraction p={p} /> : contents(materials)}
        {state && <span className="italic-serif text-ink-2"> · {state}</span>}
      </span>
    </Link>
  )
}
