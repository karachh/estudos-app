import { Icon } from '../../components/ui/Icon'
import type { AppModule } from '../../core/modules'

export function Intro({ mod }: { mod: AppModule }) {
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
