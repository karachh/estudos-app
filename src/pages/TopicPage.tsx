import { useLiveQuery } from 'dexie-react-hooks'
import { useState, type FormEvent, type ReactNode } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { AutoTextarea } from '../components/AutoTextarea'
import { Checklist } from '../components/Checklist'
import { Icon } from '../components/Icon'
import { Fraction, ProgressMark, Punches } from '../components/Marks'
import { Resources } from '../components/Resources'
import { db, deleteTopicData, today } from '../core/db'
import { getModule } from '../core/modules'
import { sumProgress } from '../core/queries'
import { artFor } from '../data/art'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14" aria-label={title}>
      <h2 className="rule-head mb-5">{title}</h2>
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
  const siblings = useLiveQuery(
    async () => (topic ? db.topics.where('groupId').equals(topic.groupId).sortBy('order') : []),
    [topic?.groupId],
  )
  const sessions = useLiveQuery(() => db.sessions.where('topicId').equals(id).reverse().sortBy('date'), [id])
  const [minutes, setMinutes] = useState('')

  if (!mod) return <Navigate to="/" replace />
  if (topic === undefined || !items || !sessions) return null
  if (topic === null || !topic) return <Navigate to={`/${mod.id}`} replace />

  const progress = sumProgress([
    { done: items.filter((i) => i.done).length, total: items.length },
  ])
  const art = artFor(mod.id, group?.title)
  const number = (siblings?.findIndex((s) => s.id === id) ?? -1) + 1
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
      <nav aria-label="Navegação" className="mb-8 flex flex-wrap items-center gap-1 text-ink-2">
        <Link to={`/${mod.id}`} className="inline-flex items-center gap-1 hover:text-ink">
          <Icon name="back" size={16} />
          {mod.label}
        </Link>
        {group && <span className="text-ink-3">/ {group.title}</span>}
      </nav>

      <header className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 md:grid-cols-[auto_minmax(0,1fr)_auto]">
        <span className="relative mt-1 grid place-items-center">
          <ProgressMark world={mod.world} p={progress} size={mod.world === 'mapa' ? 64 : 72} />
          {number > 0 && (
            <span
              className={`mono absolute -right-3 -top-3 text-[1.05rem] font-bold text-accent ${mod.world !== 'mapa' ? 'hidden' : ''}`}
              style={{ textShadow: '0 0 6px var(--bg), 0 0 3px var(--bg)' }}
            >
              {String(number).padStart(2, '0')}
            </span>
          )}
        </span>
        <div className="min-w-0">
          <AutoTextarea
            className={`w-full bg-transparent leading-tight outline-none focus-visible:underline ${
              mod.world === 'sacro'
                ? 'wide-serif text-[2.4rem] md:text-[3rem]'
                : mod.world === 'renascenca'
                  ? 'bodoni text-[2.4rem] md:text-[3.2rem]'
                  : 'display text-[2.6rem] md:text-[3.4rem]'
            }`}
            value={topic.title}
            onChange={(e) => db.topics.update(id, { title: e.target.value.replace(/\n/g, ' ') })}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            aria-label="Título"
          />
          {topic.flow && <p className="mt-1 text-ink-3">{topic.flow}</p>}
          <AutoTextarea
            className={`mt-2 w-full max-w-prose bg-transparent text-lg text-ink-2 outline-none placeholder:text-ink-3 focus-visible:underline ${
              mod.world === 'sacro' ? 'italic-serif text-[1.3rem]' : mod.world === 'renascenca' ? 'garamond text-[1.4rem] italic' : ''
            }`}
            value={topic.summary}
            placeholder="Para que serve este conteúdo?"
            onChange={(e) => db.topics.update(id, { summary: e.target.value })}
            aria-label="Resumo"
          />
          {progress.total > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Punches p={progress} max={40} />
              <Fraction p={progress} className="text-sm" />
            </div>
          )}
        </div>
        {art && (
          <figure className="hidden w-36 md:block">
            {mod.world === 'renascenca' ? (
              <div className="torn bg-(--paper) p-2">
                <img src={art.src} alt="" className="aspect-square w-full object-cover sepia-[.3]" style={{ objectPosition: art.position }} />
              </div>
            ) : (
              <img
                src={art.src}
                alt=""
                className="aspect-[3/4] w-full rounded-t-full border border-[color-mix(in_oklab,var(--accent)_60%,transparent)] object-cover"
                style={{ objectPosition: art.position }}
              />
            )}
            <figcaption className="mt-1.5 text-[0.7rem] leading-tight text-ink-3">
              <a href={art.source} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {art.credit}
              </a>
            </figcaption>
          </figure>
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
          className="field min-h-44 max-w-[75ch] leading-relaxed"
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
