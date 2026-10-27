import { useLiveQuery } from 'dexie-react-hooks'
import { useState, type FormEvent, type ReactNode } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { AutoTextarea } from '../components/AutoTextarea'
import { Meter } from '../components/Bars'
import { Checklist } from '../components/Checklist'
import { Icon } from '../components/Icon'
import { Resources } from '../components/Resources'
import { db, deleteTopicData, today } from '../core/db'
import { getModule } from '../core/modules'
import { sumProgress } from '../core/queries'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12" aria-label={title}>
      <h2 className="mb-4 text-2xl">{title}</h2>
      {children}
    </section>
  )
}

export default function TopicPage() {
  const { moduleId = '', topicId = '' } = useParams()
  const id = Number(topicId)
  const navigate = useNavigate()
  const mod = getModule(moduleId)

  const topic = useLiveQuery(() => db.topics.get(id), [id])
  const group = useLiveQuery(async () => (topic ? db.groups.get(topic.groupId) : undefined), [topic?.groupId])
  const items = useLiveQuery(() => db.checks.where('topicId').equals(id).toArray(), [id])
  const sessions = useLiveQuery(() => db.sessions.where('topicId').equals(id).reverse().sortBy('date'), [id])
  const [minutes, setMinutes] = useState('')

  if (!mod) return <Navigate to="/" replace />
  if (topic === undefined || !items || !sessions) return null
  if (topic === null || !topic) return <Navigate to={`/${mod.id}`} replace />

  const progress = sumProgress([
    { done: items.filter((i) => i.done).length, total: items.length },
  ])
  const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0)

  async function addSession(e: FormEvent) {
    e.preventDefault()
    const m = Number(minutes)
    if (!Number.isFinite(m) || m <= 0) return
    await db.sessions.add({ topicId: id, minutes: Math.round(m), date: today(), note: '' })
    setMinutes('')
  }

  async function remove() {
    if (!confirm(`Excluir "${topic?.title}" e tudo dentro dele? Isso não pode ser desfeito.`)) return
    await db.transaction('rw', [db.topics, db.checks, db.resources, db.sessions], () => deleteTopicData(id))
    navigate(`/${mod!.id}`)
  }

  return (
    <article>
      <nav aria-label="Navegação" className="mb-6 flex items-center gap-1 text-ink-2">
        <Link to={`/${mod.id}`} className="inline-flex items-center gap-1 hover:text-ink">
          <Icon name="back" size={16} />
          {mod.label}
        </Link>
        {group && <span className="text-ink-3">/ {group.title}</span>}
      </nav>

      <header>
        <AutoTextarea
          className="w-full bg-transparent font-serif text-4xl leading-tight outline-none focus-visible:underline md:text-5xl"
          value={topic.title}
          onChange={(e) => db.topics.update(id, { title: e.target.value.replace(/\n/g, ' ') })}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          aria-label="Título"
        />
        {topic.flow && <p className="mt-2 text-ink-3">{topic.flow}</p>}
        <AutoTextarea
          className="mt-3 w-full bg-transparent text-lg text-ink-2 outline-none placeholder:text-ink-3 focus-visible:underline"
          value={topic.summary}
          placeholder="Para que serve este conteúdo?"
          onChange={(e) => db.topics.update(id, { summary: e.target.value })}
          aria-label="Resumo"
        />
        {progress.total > 0 && (
          <div className="mt-4 flex items-center gap-3">
            <span className="tabular-nums text-ink-2">
              {progress.done}/{progress.total}
            </span>
            <Meter p={progress} className="flex-1" />
          </div>
        )}
      </header>

      <Block title="Checklist">
        <Checklist topic={topic} items={items} defaultSections={mod.defaultSections} />
      </Block>

      <Block title="Materiais">
        <Resources topicId={id} />
      </Block>

      {topic.glossary.length > 0 && (
        <Block title="Termos">
          <dl className="divide-y divide-line">
            {topic.glossary.map((g) => (
              <div key={g.term} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                <dt className="font-medium">{g.term}</dt>
                <dd className="text-ink-2">{g.def}</dd>
              </div>
            ))}
          </dl>
        </Block>
      )}

      <Block title="Anotações">
        <textarea
          className="field min-h-40 leading-relaxed"
          value={topic.notes}
          placeholder="O que você entendeu, dúvidas, comandos que quer lembrar..."
          onChange={(e) => db.topics.update(id, { notes: e.target.value })}
          aria-label="Anotações"
        />
      </Block>

      <Block title="Tempo de estudo">
        <p className="mb-3 text-ink-2">
          {totalMinutes > 0
            ? `${Math.floor(totalMinutes / 60)}h${String(totalMinutes % 60).padStart(2, '0')} no total`
            : 'Registre quanto tempo você dedicou a este conteúdo.'}
        </p>
        <form onSubmit={addSession} className="flex gap-2">
          <input
            className="field max-w-48"
            type="number"
            min="1"
            inputMode="numeric"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Minutos"
            aria-label="Minutos estudados"
          />
          <button type="submit" className="btn">
            <Icon name="plus" size={16} />
            Registrar
          </button>
        </form>
        {sessions.length > 0 && (
          <ul className="mt-4">
            {sessions.slice(0, 8).map((s) => (
              <li key={s.id} className="flex items-center justify-between border-t border-line py-2 first:border-t-0">
                <span className="tabular-nums text-ink-2">
                  {new Date(`${s.date}T12:00:00`).toLocaleDateString('pt-BR')} · {s.minutes} min
                </span>
                <button
                  className="btn-ghost rounded p-1 text-ink-3 hover:text-danger"
                  onClick={() => db.sessions.delete(s.id)}
                  aria-label={`Remover sessão de ${s.minutes} minutos`}
                >
                  <Icon name="x" size={15} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Block>

      <div className="mt-16 border-t border-line pt-6">
        <button className="btn btn-ghost text-danger" onClick={remove}>
          <Icon name="trash" size={15} />
          Excluir {mod.topicLabel}
        </button>
      </div>
    </article>
  )
}
