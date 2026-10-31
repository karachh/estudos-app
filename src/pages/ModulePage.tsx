import { Fragment, useLayoutEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { AddForm } from '../components/ui/AddForm'
import { Fraction, ProgressMark } from '../components/ui/Marks'
import { db, type Group } from '../core/db'
import { getModule } from '../core/modules'
import { sumProgress, useModuleData } from '../core/queries'
import { GroupSection } from './module/GroupSection'
import { GroupTitle } from './module/GroupTitle'
import { ModuleHeader } from './module/headers'
import { Intro } from './module/Intro'
import { AreaSection, GroupCard } from './module/overview'

// Onde estava a rolagem do módulo quando a pessoa entrou num tópico
let leftAt: { moduleId: string; y: number } | null = null

export default function ModulePage() {
  const { moduleId = '' } = useParams()
  const mod = getModule(moduleId)
  const data = useModuleData(moduleId)
  const ready = !!data

  // De volta de um tópico, a rolagem retorna ao ponto de onde a pessoa saiu; os dados chegam depois da montagem
  useLayoutEffect(() => {
    if (!ready || !leftAt) return
    if (leftAt.moduleId === moduleId) window.scrollTo({ top: leftAt.y, behavior: 'instant' })
    leftAt = null
  }, [ready, moduleId])

  if (!mod) return <Navigate to="/" replace />
  if (!data) return null

  const { groups, topics, byTopic, checksByTopic, materials, kinds } = data
  const total = sumProgress(topics.map((t) => byTopic.get(t.id)))
  const pct = total.total ? Math.round((total.done / total.total) * 100) : 0
  const addGroup = (title: string) =>
    db.groups.add({
      moduleId: mod.id,
      title,
      subtitle: '',
      description: '',
      criteria: '',
      order: Math.max(-1, ...groups.map((g) => g.order)) + 1,
    })

  const groupProgress = (g: Group) => sumProgress(topics.filter((t) => t.groupId === g.id).map((t) => byTopic.get(t.id)))

  return (
    <article
      key={mod.id}
      className="enter"
      onClickCapture={(e) => {
        if ((e.target as Element).closest('a[href^="#/"]')) leftAt = { moduleId: mod.id, y: window.scrollY }
      }}
    >
      <ModuleHeader mod={mod} groupCount={groups.length} pct={pct} />

      {groups.length > 1 && !mod.overview && !mod.hideGroupNav && (
        <nav
          aria-label={`Ir para ${mod.groupLabel}`}
          className="-mx-4 mt-7 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        >
          {groups.map((g) => (
            <button
              key={g.id}
              className="btn btn-ghost shrink-0 border-line! normal-case tracking-normal"
              onClick={() => document.getElementById(`group-${g.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <ProgressMark world={mod.world} p={groupProgress(g)} size={mod.world === 'sacro' ? 18 : 16} />
              <span className="font-sans text-meta font-medium">
                <GroupTitle title={g.title} />
              </span>
              {groupProgress(g).total > 0 && <Fraction p={groupProgress(g)} className="font-sans text-sm" />}
            </button>
          ))}
        </nav>
      )}

      {groups.length === 0 && (
        <p className="mt-14 max-w-prose border border-dashed border-line p-5 text-ink-2">{mod.emptyHint}</p>
      )}

      {mod.overview && groups.length > 0 && (
        <>
          <Intro mod={mod} />
          {mod.areas ? (
            groups.map((group) => (
              <AreaSection key={group.id} mod={mod} group={group} topics={topics.filter((t) => t.groupId === group.id)} byTopic={byTopic} materials={materials} kinds={kinds} />
            ))
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {groups.map((group, index) => (
                <GroupCard
                  key={group.id}
                  index={index}
                  mod={mod}
                  group={group}
                  topics={topics.filter((t) => t.groupId === group.id)}
                  byTopic={byTopic}
                  materials={materials}
                  kinds={kinds}
                  collapsible={topics.some((t) => t.isProject)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {!mod.overview && groups.map((group, gi) => (
        <Fragment key={group.id}>
          <GroupSection
            mod={mod}
            group={group}
            topics={topics.filter((t) => t.groupId === group.id)}
            byTopic={byTopic}
            checksByTopic={checksByTopic}
            materials={materials}
          />
          {/* As instruções vêm depois do primeiro grupo, para o primeiro mapa aparecer logo na tela */}
          {gi === 0 && <Intro mod={mod} />}
        </Fragment>
      ))}
      {groups.length === 0 && <Intro mod={mod} />}

      <div className="mt-16 border-t border-line pt-6">
        <AddForm placeholder={mod.newGroup} onAdd={addGroup} label={`Criar ${mod.groupLabel}`} />
      </div>
    </article>
  )
}
