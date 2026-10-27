import { Fragment, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AddForm } from '../components/AddForm'
import { Band, Film } from '../components/Cover'
import { CourseMap } from '../components/CourseMap'
import { Icon } from '../components/Icon'
import { ControlMark, DiskMark, Fraction, Orbit, ProgressMark, Punches, Sparkle } from '../components/Marks'
import { plural } from '../core/geometry'
import { db, deleteTopicData, type Group, type Topic } from '../core/db'
import { getModule, type AppModule } from '../core/modules'
import { sumProgress, useModuleData, type Progress } from '../core/queries'
import { artFor, covers, landscapes } from '../data/art'

const started = (p?: Progress) => !!p && p.done > 0 && p.done < p.total

// Com checklist mostra a fração; sem checklist, quantos materiais o tópico tem.
const contents = (n = 0) => (n === 0 ? 'vazio' : `${n} ${n === 1 ? 'material' : 'materiais'}`)

export default function ModulePage() {
  const { moduleId = '' } = useParams()
  const mod = getModule(moduleId)
  const data = useModuleData(moduleId)

  if (!mod) return <Navigate to="/" replace />
  if (!data) return null

  const { groups, topics, byTopic, materials } = data
  const total = sumProgress(topics.map((t) => byTopic.get(t.id)))
  const pct = total.total ? Math.round((total.done / total.total) * 100) : 0
  const inProgress = topics.filter((t) => started(byTopic.get(t.id))).length
  const summary =
    total.total > 0
      ? `${total.done} de ${total.total} itens marcados · ${pct}% · ${inProgress} ${inProgress === 1 ? mod.topicLabel : plural(mod.topicLabel)} em andamento`
      : 'O progresso aparece aqui quando houver itens para marcar.'

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
    <article>
      {mod.world === 'sacro' ? (
        <SacredHeader mod={mod} summary={summary} />
      ) : mod.world === 'renascenca' ? (
        <RenaissanceHeader mod={mod} summary={summary} />
      ) : landscapes[mod.id] ? (
        <FilmHeader mod={mod} summary={summary} groupCount={groups.length} />
      ) : (
        <header>
          <div className="frame relative overflow-hidden px-6 pb-7 pt-10 md:px-10 md:pt-14">
            <Orbit className="pointer-events-none absolute right-6 top-1/2 hidden w-60 -translate-y-1/2 text-accent xl:block" />
            <h1 className="display relative max-w-[12ch] text-[3.5rem] md:text-[5.5rem]">{mod.label}</h1>
            <p className="relative mt-4 max-w-[34rem] text-lg text-ink-2">{mod.tagline}</p>
          </div>
          <SummaryStrip summary={summary} />
        </header>
      )}

      {groups.length > 1 && (
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
              <span className="font-sans text-[0.95rem] font-medium">{g.title}</span>
              {groupProgress(g).total > 0 && <Fraction p={groupProgress(g)} className="font-sans text-sm" />}
            </button>
          ))}
        </nav>
      )}

      {groups.length === 0 && (
        <p className="mt-14 max-w-prose border border-dashed border-line p-5 text-ink-2">{mod.emptyHint}</p>
      )}

      {groups.map((group, gi) => (
        <Fragment key={group.id}>
          <GroupSection
            mod={mod}
            group={group}
            topics={topics.filter((t) => t.groupId === group.id)}
            byTopic={byTopic}
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

function Intro({ mod }: { mod: AppModule }) {
  if (!mod.intro) return null
  return (
    <details className="intro mt-10 border border-line bg-surface px-4 py-3" open={mod.introOpen}>
      <summary className="flex cursor-pointer items-center gap-2 font-medium">
        <span className="intro-chevron text-ink-3">
          <Icon name="chevron" size={16} />
        </span>
        {mod.introTitle ?? 'Como usar este roadmap'}
      </summary>
      <dl className="mt-3 grid gap-x-8 gap-y-3 pb-1 md:grid-cols-2">
        {mod.intro.map((item) => (
          <div key={item.title}>
            <dt className="font-semibold">{item.title}</dt>
            <dd className="max-w-prose text-ink-2">{item.text}</dd>
          </div>
        ))}
      </dl>
    </details>
  )
}

function SacredHeader({ mod, summary }: { mod: AppModule; summary: string }) {
  const igrejaCover = covers[mod.id]
  return (
    <header>
    <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0c0a08]">
      <img
        src={igrejaCover.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-85"
        style={{ objectPosition: igrejaCover.position }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,9,5,.94)_0%,rgba(14,9,5,.72)_45%,rgba(14,9,5,.08)_80%)]" />
      {/* Filete dourado por dentro, como a moldura de um painel */}
      <div className="pointer-events-none absolute inset-2.5 rounded-[1.1rem] border border-[color-mix(in_oklab,var(--accent)_55%,transparent)]" />
      <div className="relative flex min-h-[23rem] flex-col justify-end px-6 pb-7 pt-14 text-[#f0e7cf] md:min-h-[26rem] md:px-10">
        <h1 className="display relative self-start text-[5rem] leading-[0.85] md:text-[6rem]">
          {mod.label}
          <Sparkle size={22} className="absolute -right-8 -top-3 text-accent" />
          <Sparkle size={11} className="absolute -right-11 top-5 text-accent" />
        </h1>
        <p className="italic-serif mt-3 max-w-[26rem] text-[1.45rem] leading-snug">{mod.tagline}</p>
        <p className="mt-6 text-xs text-[#c9bf9f]">
          <a href={igrejaCover.source} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
            {igrejaCover.credit}
          </a>
        </p>
      </div>
    </div>
      <SummaryStrip summary={summary} />
    </header>
  )
}

// Provisório, até o módulo ganhar um mundo próprio: o cabeçalho repete a capa dele na página inicial.
function FilmHeader({ mod, summary, groupCount }: { mod: AppModule; summary: string; groupCount: number }) {
  const art = landscapes[mod.id]
  return (
    <header>
      <div className="cover">
        <Film art={art} eager />
        <div aria-hidden="true">
          <Band title={mod.short} foot={`${groupCount} ${groupCount === 1 ? mod.groupLabel : plural(mod.groupLabel)}`} />
        </div>
        <div className="sticker">
          <h1 className="gloock-text text-[2rem] leading-tight md:text-[2.6rem]">{mod.label}</h1>
          <p className="mt-2 text-ink-2">{mod.tagline}</p>
          <p className="fine mt-4 text-ink-3">
            <a href={art.source} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              Foto: {art.credit}
            </a>
          </p>
        </div>
      </div>
      <SummaryStrip summary={summary} />
    </header>
  )
}

function SummaryStrip({ summary }: { summary: string }) {
  return (
    <p className="strip mt-2.5">
      <Sparkle size={13} className="shrink-0" />
      <span className="min-w-0">{summary}</span>
    </p>
  )
}

function RenaissanceHeader({ mod, summary }: { mod: AppModule; summary: string }) {
  const cover = covers[mod.id]
  return (
    <header>
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div>
        <h1 className="bodoni text-[4.5rem] text-accent md:text-[6rem]">{mod.label}</h1>
        <span className="plate-rule mt-6 w-10" />
        <p className="garamond mt-5 max-w-[24rem] text-[1.6rem] leading-snug italic">{mod.tagline}</p>
      </div>
      {cover && (
        <figure className="relative">
          <span className="absolute -left-6 top-4 size-40 rounded-full bg-accent md:size-52" aria-hidden="true" />
          <span className="absolute -left-12 -top-2 size-52 rounded-full border border-(--ochre) md:size-64" aria-hidden="true" />
          <div className="torn relative bg-(--paper) p-3">
            <img
              src={cover.src}
              alt=""
              className="aspect-[4/3] w-full object-cover sepia-[.25]"
              style={{ objectPosition: cover.position }}
            />
          </div>
          <figcaption className="mt-2 text-right text-xs text-ink-3">
            <a href={cover.source} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {cover.credit}
            </a>
          </figcaption>
        </figure>
      )}
    </div>
      <SummaryStrip summary={summary} />
    </header>
  )
}

function GroupSection({
  mod,
  group,
  topics,
  byTopic,
  materials,
}: {
  mod: AppModule
  group: Group
  topics: Topic[]
  byTopic: Map<number, Progress>
  materials: Map<number, number>
}) {
  const [editing, setEditing] = useState(false)
  const [lit, setLit] = useState<number | null>(null)
  const progress = sumProgress(topics.map((t) => byTopic.get(t.id)))
  const sacred = mod.world === 'sacro'
  const renaissance = mod.world === 'renascenca'
  const art = artFor(mod.id, group.title)

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
    <section id={`group-${group.id}`} className="mt-16 scroll-mt-6 border-t border-line pt-8" aria-labelledby={`gh-${group.id}`}>
      <div className="flex items-start gap-5">
        {art && (
          <figure className={`hidden shrink-0 sm:block ${renaissance ? 'w-36' : 'w-28'}`}>
            {renaissance ? (
              <div className="torn bg-(--paper) p-2">
                <img src={art.src} alt="" className="aspect-square w-full object-cover sepia-[.3]" style={{ objectPosition: art.position }} loading="lazy" />
              </div>
            ) : (
              <img
                src={art.src}
                alt=""
                className="aspect-[3/4] w-full rounded-t-full border border-[color-mix(in_oklab,var(--accent)_60%,transparent)] object-cover"
                style={{ objectPosition: art.position }}
                loading="lazy"
              />
            )}
            <figcaption className="mt-1.5 text-[0.7rem] leading-tight text-ink-3">
              <a href={art.source} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {art.credit}
              </a>
            </figcaption>
          </figure>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 id={`gh-${group.id}`} className={sacred ? 'wide-serif text-[1.9rem] sm:text-[2.3rem]' : renaissance ? 'bodoni text-[2rem] sm:text-[2.5rem]' : 'display text-[2.1rem] sm:text-[2.6rem]'}>
                {group.title}
              </h2>
              {group.subtitle && <p className={`mt-1.5 text-ink-3 ${sacred ? 'italic-serif text-lg' : renaissance ? 'garamond text-xl italic' : ''}`}>{group.subtitle}</p>}
            </div>
            {progress.total > 0 && (
              <p className="shrink-0 text-right leading-none">
                <span className="display text-[2rem] text-accent sm:text-[2.6rem]">
                  {progress.done}
                  <span className="text-ink-3">/{progress.total}</span>
                </span>
                <span className="mono mt-1.5 block text-xs text-ink-3">itens</span>
              </p>
            )}
          </div>
          {group.description && <p className="mt-3 max-w-prose text-ink-2">{group.description}</p>}
          {group.criteria && (
            <p className="mt-3 flex max-w-prose gap-2.5 text-ink-2">
              {renaissance ? (
                <span className="mt-2 size-3 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              ) : (
                <Sparkle size={15} className="mt-1 shrink-0 text-accent" />
              )}
              <span>
                <strong className="font-semibold text-ink">Critério de saída.</strong> {group.criteria}
              </span>
            </p>
          )}
        </div>
      </div>

      {topics.length === 0 ? (
        <p className="mt-6 text-ink-3">Nenhum {mod.topicLabel} ainda.</p>
      ) : renaissance ? (
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t, i) => (
            <li key={t.id} className="flex">
              <Plate mod={mod} topic={t} index={i} progress={byTopic.get(t.id)} materials={materials.get(t.id)} />
            </li>
          ))}
        </ul>
      ) : sacred ? (
        <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(10.5rem,1fr))] sm:gap-4">
          {topics.map((t) => (
            <li key={t.id} className="flex">
              <Niche mod={mod} topic={t} progress={byTopic.get(t.id)} materials={materials.get(t.id)} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-7 grid gap-6 md:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] md:gap-8">
          <div className="md:sticky md:top-6 md:self-start">
            <CourseMap
              seed={group.id}
              title={group.title}
              moduleId={mod.id}
              topics={topics}
              byTopic={byTopic}
              lit={lit}
              onLight={setLit}
            />
          </div>
          <ol className="border-t border-line">
            {topics.map((t, i) => (
              <li key={t.id} className="border-b border-line">
                <ControlRow
                  mod={mod}
                  topic={t}
                  index={i}
                  progress={byTopic.get(t.id)}
                  materials={materials.get(t.id)}
                  lit={lit === t.id}
                  onLight={setLit}
                />
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-6 space-y-2">
        <AddForm placeholder={`Novo ${mod.topicLabel} em ${group.title}`} onAdd={addTopic} />
        <button className="btn btn-ghost -ml-[0.95rem]" onClick={() => setEditing((v) => !v)} aria-expanded={editing}>
          <Icon name="pencil" size={15} />
          Editar {mod.groupLabel}
        </button>
        {editing && (
          <GroupEditor group={group} groupLabel={mod.groupLabel} onDelete={removeGroup} onClose={() => setEditing(false)} />
        )}
      </div>
    </section>
  )
}

function ControlRow({
  mod,
  topic,
  index,
  progress,
  materials,
  lit,
  onLight,
}: {
  mod: AppModule
  topic: Topic
  index: number
  progress?: Progress
  materials?: number
  lit: boolean
  onLight: (id: number | null) => void
}) {
  const p = progress ?? { done: 0, total: 0 }
  return (
    <Link
      to={`/${mod.id}/t/${topic.id}`}
      className={`grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-3 px-2 py-3 transition-colors hover:bg-raised ${lit ? 'row-lit' : ''}`}
      onMouseEnter={() => onLight(topic.id)}
      onMouseLeave={() => onLight(null)}
      onFocus={() => onLight(topic.id)}
      onBlur={() => onLight(null)}
    >
      <span className="flex items-center gap-1.5">
        <span className="mono w-6 text-right text-[0.95rem] font-bold text-accent">{String(index + 1).padStart(2, '0')}</span>
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-semibold">{topic.title}</span>
          {topic.badge && (
            <span className="mono rounded-full border border-accent px-2 text-[0.68rem] uppercase text-accent">
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
        <ControlMark p={p} size={18} />
      </span>
    </Link>
  )
}

function Niche({
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
        <Sparkle size={26} className={`niche-star ${ratio >= 0.5 ? 'over' : ''}`} />
      </span>
      <span className="mt-4 px-3 font-serif text-[1.15rem] font-medium leading-snug">{topic.title}</span>
      {topic.flow && <span className="mt-1 px-3 text-sm text-ink-3">{topic.flow}</span>}
      <span className="mt-auto px-3 pb-4 pt-3 text-sm text-ink-3">
        {p.total > 0 ? <Fraction p={p} /> : contents(materials)}
        {state && <span className="italic-serif text-ink-2"> · {state}</span>}
      </span>
    </Link>
  )
}

function Plate({
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
  const paper = index % 2 === 1
  return (
    <Link to={`/${mod.id}/t/${topic.id}`} className={`plate w-full ${paper ? 'plate-paper torn' : ''}`}>
      <span className="flex items-start justify-between gap-4">
        <span className="bodoni max-w-[14ch] text-[1.65rem]">{topic.title}</span>
        <span className="land block shrink-0" style={{ animationDelay: `${index * 60}ms` }}>
          <DiskMark p={p} size={52} />
        </span>
      </span>
      {topic.summary && <span className="plate-text garamond mt-3 line-clamp-3 text-[1.12rem] leading-snug">{topic.summary}</span>}
      <span className="plate-meta mt-auto pt-5 text-sm">{p.total > 0 ? <Fraction p={p} /> : contents(materials)}</span>
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
    <div className="mt-3 space-y-3 border border-line bg-surface p-4">
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
