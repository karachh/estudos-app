import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/ui/Icon'
import { Fraction, ProgressMark } from '../../components/ui/Marks'
import type { Group, ResourceKind, Topic } from '../../core/db'
import type { AppModule } from '../../core/modules'
import { sumProgress, type Progress } from '../../core/queries'
import { GroupFooter } from './GroupFooter'
import { BEBOP_TONES } from '../../components/worlds/tones'
import { contents, kindSummary, type Kinds } from './helpers'

// Cartão com projetos abre recolhido; a escolha fica guardada para valer ao voltar de um tópico.
function useCardOpen(groupId: number) {
  const key = `estudos:fase:${groupId}`
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem(key) === 'open'
    } catch {
      return false
    }
  })
  const toggle = () => {
    setOpen(!open)
    try {
      if (open) localStorage.removeItem(key)
      else localStorage.setItem(key, 'open')
    } catch {
      // sem armazenamento (aba privada): vale só enquanto a página estiver aberta
    }
  }
  return [open, toggle] as const
}

// Visão geral: todos os grupos de uma vez, cada um com os seus tópicos em lista curta (sem o mapa).
export function GroupCard({
  index,
  mod,
  group,
  topics,
  byTopic,
  materials,
  kinds,
  collapsible,
}: {
  index: number
  mod: AppModule
  group: Group
  topics: Topic[]
  byTopic: Map<number, Progress>
  materials: Map<number, number>
  kinds: Kinds
  collapsible: boolean // o módulo tem projetos: todos os cartões abrem recolhidos, para ficarem do mesmo jeito
}) {
  const progress = sumProgress(topics.map((t) => byTopic.get(t.id)))
  const session = mod.world === 'bebop'
  // Soma dos tipos de material do grupo inteiro, para a linha de resumo do cartão
  const total: Partial<Record<ResourceKind, number>> = {}
  for (const t of topics)
    for (const [k, n] of Object.entries(kinds.get(t.id) ?? {})) total[k as ResourceKind] = (total[k as ResourceKind] ?? 0) + n
  const totalKinds = kindSummary(total)
  const projects = topics.filter((t) => t.isProject)
  const studies = topics.filter((t) => !t.isProject)
  const [open, toggle] = useCardOpen(group.id)
  const detailsId = `gd-${group.id}`

  return (
    <section
      className={`frame group-card flex flex-col p-4 ${collapsible ? 'self-start' : 'h-full'} ${session ? 'session-card' : ''}`}
      style={session ? ({ '--tone': BEBOP_TONES[index % BEBOP_TONES.length], '--i': index } as CSSProperties) : undefined}
      aria-labelledby={`gh-${group.id}`}
    >
      {session && (
        <p className="session-tab" aria-hidden="true">
          <span>Session {String(index + 1).padStart(2, '0')}</span>
          <ProgressMark world={mod.world} p={progress} size={18} />
        </p>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id={`gh-${group.id}`} className="display text-xl leading-tight">
            {group.title}
          </h2>
          {group.subtitle && <p className="mt-0.5 text-sm text-ink-3">{group.subtitle}</p>}
          {totalKinds && <p className="mono mt-1.5 text-micro uppercase tracking-wide text-accent">{totalKinds}</p>}
        </div>
        {progress.total > 0 && (
          <p className="display shrink-0 text-xl leading-none text-accent">
            {progress.done}
            <span className="text-ink-3">/{progress.total}</span>
          </p>
        )}
      </div>

      {topics.length === 0 ? (
        <p className="mt-3 text-sm text-ink-3">Nenhum {mod.topicLabel} ainda.</p>
      ) : (
        studies.length > 0 && <TopicLinks mod={mod} topics={studies} byTopic={byTopic} materials={materials} kinds={kinds} />
      )}

      {collapsible && (
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-between gap-2 rounded px-1 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-raised"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={toggle}
        >
          {open ? 'Recolher' : projects.length ? `Expandir: ${projects.length} ${projects.length === 1 ? 'projeto' : 'projetos'}` : 'Expandir'}
          <span className={`transition-transform ${open ? '-rotate-90' : 'rotate-90'}`}>
            <Icon name="chevron" size={16} />
          </span>
        </button>
      )}

      {(!collapsible || open) && (
        <div id={detailsId} className="flex flex-1 flex-col">
          {projects.length > 0 && <ProjectLinks mod={mod} projects={projects} byTopic={byTopic} />}
          <GroupFooter mod={mod} group={group} topics={topics} placeholder={`Novo ${mod.topicLabel}`} className="mt-auto space-y-2 pt-3" />
        </div>
      )}
    </section>
  )
}

function TopicLinks({ mod, topics, byTopic, materials, kinds }: { mod: AppModule; topics: Topic[]; byTopic: Map<number, Progress>; materials: Map<number, number>; kinds: Kinds }) {
  return (
    <ul className="card-list mt-3 max-h-[17.5rem] overflow-y-auto border-t border-line">
      {topics.map((t) => {
        const p = byTopic.get(t.id) ?? { done: 0, total: 0 }
        return (
          <li key={t.id} className="border-b border-line">
            <Link to={`/${mod.id}/t/${t.id}`} className="flex items-center gap-2 px-1 py-2 transition-colors hover:bg-raised">
              <span className="min-w-0 flex-1 text-sm font-medium leading-snug">{t.title}</span>
              <span className="shrink-0 text-xs text-ink-3">
                {p.total > 0 ? <Fraction p={p} /> : kindSummary(kinds.get(t.id)) || contents(materials.get(t.id))}
              </span>
              <ProgressMark world={mod.world} p={p} size={16} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

// IA: os projetos do portfólio de cada fase, com título e descrição
function ProjectLinks({ mod, projects, byTopic }: { mod: AppModule; projects: Topic[]; byTopic: Map<number, Progress> }) {
  return (
    <div className="mt-5">
      <h3 className="display text-base leading-tight text-accent">Projetos</h3>
      <ul className="mt-2 border-t border-line">
        {projects.map((t) => {
          const p = byTopic.get(t.id) ?? { done: 0, total: 0 }
          return (
            <li key={t.id} className="border-b border-line">
              <Link to={`/${mod.id}/t/${t.id}`} className="flex items-start gap-2 px-1 py-2 transition-colors hover:bg-raised">
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium leading-snug">{t.title}</span>
                  {t.summary && <span className="mt-0.5 block text-xs leading-snug text-ink-2">{t.summary}</span>}
                </span>
                {p.total > 0 && (
                  <span className="shrink-0 text-xs text-ink-3">
                    <Fraction p={p} />
                  </span>
                )}
                <ProgressMark world={mod.world} p={p} size={16} />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Repertório: cada formato é uma seção, dividida em cartões por área (o `badge` de cada item)
export function AreaSection({
  mod,
  group,
  topics,
  byTopic,
  materials,
  kinds,
}: {
  mod: AppModule
  group: Group
  topics: Topic[]
  byTopic: Map<number, Progress>
  materials: Map<number, number>
  kinds: Kinds
}) {
  const areas = [...new Set(topics.map((t) => t.badge || 'Sem área'))]

  return (
    <section className="mt-12 first-of-type:mt-8" aria-labelledby={`gh-${group.id}`}>
      <h2 id={`gh-${group.id}`} className="rule-head">
        {group.title}
      </h2>
      {group.subtitle && <p className="mt-2 text-sm text-ink-3">{group.subtitle}</p>}
      {topics.length === 0 ? (
        <p className="mt-4 text-sm text-ink-3">Nenhum {mod.topicLabel} ainda.</p>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {areas.map((area, i) => {
            const list = topics.filter((t) => (t.badge || 'Sem área') === area)
            const p = sumProgress(list.map((t) => byTopic.get(t.id)))
            return (
              <div key={area} className="frame group-card session-card p-4" style={{ '--tone': BEBOP_TONES[i % BEBOP_TONES.length], '--i': i } as CSSProperties}>
                <div className="flex items-start justify-between gap-3 pt-3">
                  <h3 className="display text-xl leading-tight">{area}</h3>
                  {p.total > 0 && (
                    <p className="display shrink-0 text-xl leading-none text-accent">
                      {p.done}
                      <span className="text-ink-3">/{p.total}</span>
                    </p>
                  )}
                </div>
                <TopicLinks mod={mod} topics={list} byTopic={byTopic} materials={materials} kinds={kinds} />
              </div>
            )
          })}
        </div>
      )}
      <GroupFooter mod={mod} group={group} topics={topics} placeholder={`Novo ${mod.topicLabel} em ${group.title}`} className="mt-4 space-y-2" />
    </section>
  )
}
