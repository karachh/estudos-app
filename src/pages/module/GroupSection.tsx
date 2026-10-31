import { Sparkle } from '../../components/ui/Marks'
import type { CheckItem, Group, Topic } from '../../core/db'
import type { AppModule } from '../../core/modules'
import { sumProgress, type Progress } from '../../core/queries'
import { artFor } from '../../data/art'
import { GroupFooter } from './GroupFooter'
import { GroupTitle } from './GroupTitle'
import { ControlRow, ExpandRow, Niche } from './rows'

export function GroupSection({
  mod,
  group,
  topics,
  byTopic,
  checksByTopic,
  materials,
}: {
  mod: AppModule
  group: Group
  topics: Topic[]
  byTopic: Map<number, Progress>
  checksByTopic: Map<number, CheckItem[]>
  materials: Map<number, number>
}) {
  const progress = sumProgress(topics.map((t) => byTopic.get(t.id)))
  const sacred = mod.world === 'sacro'
  const art = artFor(mod.id, group.title)
  const meta = !mod.hideGroupMeta

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
        <div className="mt-7">
          <ol className="border-t border-line">
            {topics.map((t, i) => (
              <li key={t.id} className="border-b border-line">
                {mod.checkLinks ? (
                  <ExpandRow mod={mod} topic={t} index={i} progress={byTopic.get(t.id)} checks={checksByTopic.get(t.id) ?? []} />
                ) : (
                  <ControlRow
                    mod={mod}
                    topic={t}
                    index={i}
                    progress={byTopic.get(t.id)}
                    materials={materials.get(t.id)}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      <GroupFooter mod={mod} group={group} topics={topics} placeholder={`Novo ${mod.topicLabel} em ${group.title}`} className="mt-6 space-y-2" />
    </section>
  )
}
