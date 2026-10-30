import { Fragment, useState, type CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AddForm } from '../components/AddForm'
import { Film } from '../components/Cover'
import { CourseMap } from '../components/CourseMap'
import { Gethsemane } from '../components/Gethsemane'
import { Icon } from '../components/Icon'
import { Fraction, Orbit, ProgressMark, Punches, Sparkle } from '../components/Marks'
import { ThemeBoard } from '../components/ThemeBoard'
import { BebopHeader, CosmosHeader, EvaHeader, OfficeHeader } from '../components/Worlds'
import { db, deleteTopicData, type Group, type ResourceKind, type Topic } from '../core/db'
import { getModule, type AppModule } from '../core/modules'
import { sumProgress, useModuleData, type Progress } from '../core/queries'
import { artFor, covers, landscapes } from '../data/art'

// Níveis do Profissional ("Bronze: fundação"...) ganham a cor do metal; os outros grupos não têm nível.
const tierOf = (title: string) => /^(bronze|prata|ouro)[: ]/i.exec(title)?.[1].toLowerCase()

// Título do grupo com só a palavra do nível pintada na cor do metal
function GroupTitle({ title }: { title: string }) {
  const tier = tierOf(title)
  if (!tier) return <>{title}</>
  return (
    <>
      <span className="tier-word" data-tier={tier}>
        {title.slice(0, tier.length)}
      </span>
      {title.slice(tier.length)}
    </>
  )
}

type Kinds = Map<number, Partial<Record<ResourceKind, number>>>
const kindNames: Record<ResourceKind, [string, string]> = {
  youtube: ['vídeo', 'vídeos'],
  link: ['link', 'links'],
  file: ['arquivo', 'arquivos'],
}
// "2 vídeos · 1 link": o que tem dentro, por tipo de material
function kindSummary(k?: Partial<Record<ResourceKind, number>>) {
  const parts: string[] = []
  for (const key of Object.keys(kindNames) as ResourceKind[]) {
    const n = k?.[key] ?? 0
    if (n) parts.push(`${n} ${kindNames[key][n === 1 ? 0 : 1]}`)
  }
  return parts.join(' · ')
}


// Com checklist mostra a fração; sem checklist, quantos materiais o tópico tem.
const contents = (n = 0) => (n === 0 ? 'vazio' : `${n} ${n === 1 ? 'material' : 'materiais'}`)

export default function ModulePage() {
  const { moduleId = '' } = useParams()
  const mod = getModule(moduleId)
  const data = useModuleData(moduleId)

  if (!mod) return <Navigate to="/" replace />
  if (!data) return null

  const { groups, topics, byTopic, materials, kinds } = data
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
    <article key={mod.id} className="enter">
      {mod.world === 'sacro' ? (
        <SacredHeader mod={mod} />
      ) : mod.world === 'cosmos' || mod.world === 'bebop' || mod.world === 'eva' || mod.world === 'office' ? (
        <header>
          {mod.world === 'cosmos' ? (
            <CosmosHeader mod={mod} groupCount={groups.length} pct={pct} />
          ) : mod.world === 'bebop' ? (
            <BebopHeader mod={mod} groupCount={groups.length} />
          ) : mod.world === 'eva' ? (
            <EvaHeader mod={mod} groupCount={groups.length} pct={pct} />
          ) : (
            <OfficeHeader mod={mod} groupCount={groups.length} />
          )}
        </header>
      ) : landscapes[mod.id] ? (
        <FilmHeader mod={mod} groupCount={groups.length} />
      ) : (
        <header>
          <div className="frame relative overflow-hidden px-6 pb-7 pt-10 md:px-10 md:pt-14">
            <Orbit className="pointer-events-none absolute right-6 top-1/2 hidden w-60 -translate-y-1/2 text-accent xl:block" />
            <h1 className="display relative max-w-[12ch] text-display">{mod.label}</h1>
            <p className="relative mt-4 max-w-[34rem] text-lg text-ink-2">{mod.tagline}</p>
          </div>
        </header>
      )}

      {groups.length > 1 && !mod.overview && (
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
          {overviewSections(mod, groups).map((sec) => (
            <section key={sec.title || 'todos'} className="mt-10 first-of-type:mt-8" aria-label={sec.title || mod.label}>
              {sec.title && (
                <div className="mb-4">
                  <h2 className="rule-head">{sec.title}</h2>
                  <p className="mt-2 text-sm text-ink-3">{sec.hint}</p>
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {sec.groups.map((group) => (
                  <GroupCard
                    key={group.id}
                    index={groups.indexOf(group)}
                    mod={mod}
                    group={group}
                    topics={topics.filter((t) => t.groupId === group.id)}
                    byTopic={byTopic}
                    materials={materials}
                    kinds={kinds}
                  />
                ))}
              </div>
            </section>
          ))}
        </>
      )}

      {!mod.overview && groups.map((group, gi) => (
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

// Divide os grupos da visão geral nas seções do módulo (Repertório: por tema e por formato)
function overviewSections(mod: AppModule, groups: Group[]) {
  if (!mod.sections) return [{ title: '', hint: '', groups }]
  const used = new Set<number>()
  const out = mod.sections.map((sec) => {
    const list = groups.filter((g) => sec.groups.includes(g.title))
    list.forEach((g) => used.add(g.id))
    return { title: sec.title, hint: sec.hint, groups: list }
  })
  const rest = groups.filter((g) => !used.has(g.id))
  if (rest.length) out.push({ title: 'Outros', hint: 'Categorias criadas por você', groups: rest })
  return out.filter((sec) => sec.groups.length > 0)
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

function SacredHeader({ mod }: { mod: AppModule }) {
  const igrejaCover = covers[mod.id]
  return (
    <header>
    <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0c0a08]">
      {/* No desktop a pintura fica à direita, para o rosto de Cristo não ficar atrás do título */}
      <Gethsemane fy={0.22} className="md:left-[36%] md:[mask-image:linear-gradient(90deg,transparent,#000_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,9,5,.94)_0%,rgba(14,9,5,.6)_40%,rgba(14,9,5,.05)_75%)] md:bg-[linear-gradient(90deg,rgba(14,9,5,.94)_0%,rgba(14,9,5,.7)_38%,rgba(14,9,5,.05)_62%)]" />
      {/* Filete dourado por dentro, como a moldura de um painel */}
      <div className="pointer-events-none absolute inset-2.5 rounded-[1.1rem] border border-[color-mix(in_oklab,var(--accent)_55%,transparent)]" />
      <div className="relative flex min-h-[23rem] flex-col justify-end px-6 pb-7 pt-14 text-[#f0e7cf] md:min-h-[26rem] md:px-10">
        <h1 className="cinzel relative self-start leading-[0.95]">
          {mod.label}
        </h1>
        <p className="italic-serif mt-3 max-w-[26rem] text-lead leading-snug">{mod.tagline}</p>
        <p className="mt-6 text-xs text-[#c9bf9f]">
          {igrejaCover.source ? (
            <a href={igrejaCover.source} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline credit">
              {igrejaCover.credit}
            </a>
          ) : (
            igrejaCover.credit
          )}
        </p>
      </div>
    </div>
    </header>
  )
}

// Provisório, até o módulo ganhar um mundo próprio: o cabeçalho repete a capa dele na página inicial.
function FilmHeader({ mod }: { mod: AppModule; groupCount: number }) {
  const art = landscapes[mod.id]
  return (
    <header>
      <div className="cover">
        <Film art={art} eager />
        <div className="sticker">
          <h1 className="gloock-text text-cover leading-tight">{mod.label}</h1>
          <p className="mt-2 text-ink-2">{mod.tagline}</p>
          <p className="fine mt-4 text-ink-3">
            <a href={art.source} target="_blank" rel="noopener noreferrer" className="hover:text-ink credit">
              Foto: {art.credit}
            </a>
          </p>
        </div>
      </div>
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
  const art = artFor(mod.id, group.title)
  const meta = !mod.hideGroupMeta

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
          <figure className="hidden w-28 shrink-0 sm:block">
            <img
              src={art.src}
              decoding="async"
              alt=""
              className="aspect-[3/4] w-full rounded-t-full border border-[color-mix(in_oklab,var(--accent)_60%,transparent)] object-cover"
              style={{ objectPosition: art.position }}
              loading="lazy"
            />
            <figcaption className="mt-1.5 text-micro leading-tight text-ink-3">
              <a href={art.source} target="_blank" rel="noopener noreferrer" className="hover:underline credit">
                {art.credit}
              </a>
            </figcaption>
          </figure>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 id={`gh-${group.id}`} className={`text-headline max-sm:text-[1.65rem] ${sacred ? 'wide-serif' : 'display'}`}>
                <GroupTitle title={group.title} />
              </h2>
              {meta && group.subtitle && <p className={`mt-1.5 text-ink-3 ${sacred ? 'italic-serif text-lg' : ''}`}>{group.subtitle}</p>}
            </div>
            {progress.total > 0 && (
              <p className="count-plate shrink-0 text-right leading-none">
                <span className="display text-headline text-accent">
                  {progress.done}
                  <span className="text-ink-2">/{progress.total}</span>
                </span>
                <span className="mono mt-1.5 block text-xs text-ink-2">itens</span>
              </p>
            )}
          </div>
          {group.description && <p className="mt-3 max-w-prose text-ink-2">{group.description}</p>}
          {meta && group.criteria && (
            <p className="mt-3 flex max-w-prose gap-2.5 text-ink-2">
              <Sparkle size={15} className="mt-1 shrink-0 text-accent" />
              <span>
                <strong className="font-semibold text-ink">Critério de saída.</strong> {group.criteria}
              </span>
            </p>
          )}
        </div>
      </div>

      {topics.length === 0 ? (
        <p className="mt-6 text-ink-3">Nenhum {mod.topicLabel} ainda.</p>
      ) : sacred ? (
        <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(10.5rem,1fr))] sm:gap-4">
          {topics.map((t) => (
            <li key={t.id} className="flex">
              <Niche mod={mod} topic={t} progress={byTopic.get(t.id)} materials={materials.get(t.id)} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] xl:gap-8">
          <div className="xl:sticky xl:top-6 xl:self-start">
            {mod.world === 'mapa' ? (
              <CourseMap
                seed={group.id}
                title={group.title}
                moduleId={mod.id}
                topics={topics}
                byTopic={byTopic}
                lit={lit}
                onLight={setLit}
              />
            ) : (
              <ThemeBoard
                world={mod.world}
                seed={group.id}
                title={group.title}
                moduleId={mod.id}
                topics={topics}
                byTopic={byTopic}
                lit={lit}
                onLight={setLit}
              />
            )}
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

// Visão geral: todos os grupos de uma vez, cada um com os seus tópicos em lista curta (sem o mapa).
// Cores dos painéis do pôster de Cowboy Bebop, uma por cartão
const SESSION_TONES = ['#f2c230', '#3c8d4a', '#d9382c', '#e8761e', '#3b7de0']

function GroupCard({
  index,
  mod,
  group,
  topics,
  byTopic,
  materials,
  kinds,
}: {
  index: number
  mod: AppModule
  group: Group
  topics: Topic[]
  byTopic: Map<number, Progress>
  materials: Map<number, number>
  kinds: Kinds
}) {
  const [editing, setEditing] = useState(false)
  const progress = sumProgress(topics.map((t) => byTopic.get(t.id)))
  const session = mod.world === 'bebop'
  // Soma dos tipos de material do grupo inteiro, para a linha de resumo do cartão
  const total: Partial<Record<ResourceKind, number>> = {}
  for (const t of topics)
    for (const [k, n] of Object.entries(kinds.get(t.id) ?? {})) total[k as ResourceKind] = (total[k as ResourceKind] ?? 0) + n
  const totalKinds = kindSummary(total)

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
    <section
      className={`frame group-card flex h-full flex-col p-4 ${session ? 'session-card' : ''}`}
      style={session ? ({ '--tone': SESSION_TONES[index % SESSION_TONES.length], '--i': index } as CSSProperties) : undefined}
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
      )}

      <div className="mt-auto space-y-2 pt-3">
        <AddForm placeholder={`Novo ${mod.topicLabel}`} onAdd={addTopic} />
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
        <span className="mono w-6 text-right text-meta font-bold text-accent">{String(index + 1).padStart(2, '0')}</span>
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
      <span className="mt-4 px-3 font-serif text-reading font-medium leading-snug">{topic.title}</span>
      {topic.flow && <span className="mt-1 px-3 text-sm text-ink-3">{topic.flow}</span>}
      <span className="mt-auto px-3 pb-4 pt-3 text-sm text-ink-3">
        {p.total > 0 ? <Fraction p={p} /> : contents(materials)}
        {state && <span className="italic-serif text-ink-2"> · {state}</span>}
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
