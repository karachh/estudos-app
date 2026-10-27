import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AddForm } from '../components/AddForm'
import { Fraction, Meter, SegmentBar } from '../components/Bars'
import { Icon } from '../components/Icon'
import { db, deleteTopicData, type Group, type Topic } from '../core/db'
import { getModule, type AppModule } from '../core/modules'
import { ratio, sumProgress, useModuleData, type Progress } from '../core/queries'

export default function ModulePage() {
  const { moduleId = '' } = useParams()
  const mod = getModule(moduleId)
  const data = useModuleData(moduleId)

  if (!mod) return <Navigate to="/" replace />
  if (!data) return null

  const { groups, topics, byTopic } = data
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

  return (
    <article>
      <header>
        <h1 className="text-4xl md:text-5xl">{mod.label}</h1>
        <p className="mt-2 max-w-prose text-lg text-ink-2">{mod.tagline}</p>

        {total.total > 0 ? (
          <div className="mt-8 flex items-center gap-5">
            <span className="font-serif text-5xl tabular-nums text-accent md:text-6xl">{pct}%</span>
            <div className="flex-1">
              <p className="mb-2 text-ink-2">
                {total.done} de {total.total} itens concluídos
              </p>
              <Meter p={total} />
            </div>
          </div>
        ) : (
          <p className="mt-6 text-ink-3">O progresso aparece aqui quando houver itens para marcar.</p>
        )}

        {mod.intro && (
          <details className="mt-8 rounded-xl border border-line bg-surface p-4" open={mod.introOpen}>
            <summary className="cursor-pointer font-medium">{mod.introTitle ?? 'Como usar este roadmap'}</summary>
            <dl className="mt-3 space-y-3">
              {mod.intro.map((item) => (
                <div key={item.title}>
                  <dt className="font-serif text-lg">{item.title}</dt>
                  <dd className="max-w-prose text-ink-2">{item.text}</dd>
                </div>
              ))}
            </dl>
          </details>
        )}
      </header>

      {groups.length === 0 && (
        <p className="mt-14 max-w-prose rounded-xl border border-dashed border-line p-5 text-ink-2">
          {mod.emptyHint}
        </p>
      )}

      {groups.map((group) => (
        <GroupSection
          key={group.id}
          mod={mod}
          group={group}
          topics={topics.filter((t) => t.groupId === group.id)}
          byTopic={byTopic}
        />
      ))}

      <div className="mt-14 border-t border-line pt-6">
        <AddForm placeholder={mod.newGroup} onAdd={addGroup} label={`Criar ${mod.groupLabel}`} />
      </div>
    </article>
  )
}

function GroupSection({
  mod,
  group,
  topics,
  byTopic,
}: {
  mod: AppModule
  group: Group
  topics: Topic[]
  byTopic: Map<number, Progress>
}) {
  const [editing, setEditing] = useState(false)
  const progress = sumProgress(topics.map((t) => byTopic.get(t.id)))

  const addTopic = (title: string) =>
    db.topics.add({
      moduleId: mod.id,
      groupId: group.id,
      title,
      summary: '',
      badge: '',
      flow: '',
      isProject: false,
      notes: '',
      glossary: [],
      order: Math.max(-1, ...topics.map((t) => t.order)) + 1,
      createdAt: Date.now(),
    })

  async function removeGroup() {
    const msg = `Excluir "${group.title}" com ${topics.length} ${mod.topicLabel}(s) e tudo dentro? Isso não pode ser desfeito.`
    if (!confirm(msg)) return
    await db.transaction('rw', [db.groups, db.topics, db.checks, db.resources, db.sessions], async () => {
      for (const t of topics) await deleteTopicData(t.id)
      await db.groups.delete(group.id)
    })
  }

  return (
    <section className="mt-14" aria-labelledby={`group-${group.id}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 id={`group-${group.id}`} className="text-3xl">
            {group.title}
          </h2>
          {group.subtitle && <p className="mt-1 text-ink-3">{group.subtitle}</p>}
        </div>
        {progress.total > 0 && (
          <span className="shrink-0 font-serif text-2xl">
            <Fraction p={progress} />
          </span>
        )}
      </div>

      <SegmentBar ratios={topics.map((t) => ratio(byTopic.get(t.id)))} className="mt-4" />

      {group.description && <p className="mt-4 max-w-prose text-ink-2">{group.description}</p>}
      {group.criteria && (
        <p className="mt-3 max-w-prose border-l-2 border-accent pl-3 text-ink-2">
          <strong className="font-medium text-ink">Critério de saída.</strong> {group.criteria}
        </p>
      )}

      <ul className="mt-5">
        {topics.map((t) => (
          <li key={t.id} className="border-t border-line first:border-t-0">
            <TopicRow mod={mod} topic={t} progress={byTopic.get(t.id)} />
          </li>
        ))}
      </ul>

      {topics.length === 0 && <p className="mt-4 text-ink-3">Nenhum {mod.topicLabel} ainda.</p>}

      <div className="mt-3">
        <AddForm placeholder={`Novo ${mod.topicLabel} em ${group.title}`} onAdd={addTopic} />
      </div>

      <div className="mt-3">
        <button className="btn btn-ghost" onClick={() => setEditing((v) => !v)} aria-expanded={editing}>
          <Icon name="pencil" size={15} />
          Editar {mod.groupLabel}
        </button>
      </div>

      {editing && <GroupEditor group={group} groupLabel={mod.groupLabel} onDelete={removeGroup} onClose={() => setEditing(false)} />}
    </section>
  )
}

function TopicRow({ mod, topic, progress }: { mod: AppModule; topic: Topic; progress?: Progress }) {
  const p = progress ?? { done: 0, total: 0 }
  return (
    <Link
      to={`/${mod.id}/t/${topic.id}`}
      className="-mx-3 flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-raised"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-medium">{topic.title}</span>
          {topic.badge && (
            <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] px-2 py-0.5 text-xs text-accent">
              {topic.badge}
            </span>
          )}
        </div>
        {topic.flow && <p className="text-sm text-ink-3">{topic.flow}</p>}
      </div>
      {p.total > 0 && (
        <div className="flex w-24 shrink-0 items-center gap-2">
          <Meter p={p} className="flex-1" />
          <span className="text-sm">
            <Fraction p={p} />
          </span>
        </div>
      )}
      <span className="text-ink-3">
        <Icon name="chevron" size={16} />
      </span>
    </Link>
  )
}

function GroupEditor({
  group,
  groupLabel,
  onDelete,
  onClose,
}: {
  group: Group
  groupLabel: string
  onDelete: () => void
  onClose: () => void
}) {
  const fields: { key: 'title' | 'subtitle' | 'description' | 'criteria'; label: string; multiline?: boolean }[] = [
    { key: 'title', label: 'Nome' },
    { key: 'subtitle', label: 'Período ou subtítulo' },
    { key: 'description', label: 'Descrição', multiline: true },
    { key: 'criteria', label: 'Critério de saída', multiline: true },
  ]
  return (
    <div className="mt-3 space-y-3 rounded-xl border border-line bg-surface p-4">
      {fields.map((f) => (
        <label key={f.key} className="block">
          <span className="mb-1 block text-sm text-ink-2">{f.label}</span>
          {f.multiline ? (
            <textarea
              className="field"
              rows={3}
              value={group[f.key]}
              onChange={(e) => db.groups.update(group.id, { [f.key]: e.target.value })}
            />
          ) : (
            <input
              className="field"
              value={group[f.key]}
              onChange={(e) => db.groups.update(group.id, { [f.key]: e.target.value })}
            />
          )}
        </label>
      ))}
      <div className="flex justify-between gap-2">
        <button className="btn btn-ghost text-danger" onClick={onDelete}>
          <Icon name="trash" size={15} />
          Excluir {groupLabel}
        </button>
        <button className="btn" onClick={onClose}>
          Concluir edição
        </button>
      </div>
    </div>
  )
}
