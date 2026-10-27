import { db, type CheckItem, type Topic } from '../core/db'
import { AddForm } from './AddForm'
import { Icon } from './Icon'

// Itens agrupados por seção (Estudar, Fazer, Entregas...). As seções padrão do módulo sempre aparecem,
// para ter onde adicionar; as demais só aparecem quando têm itens.
export function Checklist({
  topic,
  items,
  defaultSections,
}: {
  topic: Topic
  items: CheckItem[]
  defaultSections: string[]
}) {
  const sections = [...defaultSections]
  for (const it of items) if (!sections.includes(it.section)) sections.push(it.section)

  async function addItem(section: string, text: string) {
    const order = items.filter((i) => i.section === section).length
    await db.checks.add({ moduleId: topic.moduleId, topicId: topic.id, section, text, done: false, order })
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => {
        const list = items.filter((i) => i.section === section).sort((a, b) => a.order - b.order)
        const done = list.filter((i) => i.done).length
        return (
          <section key={section} aria-labelledby={`sec-${section}`}>
            <div className="mb-2 flex items-baseline justify-between">
              <h3 id={`sec-${section}`} className="sub-head display text-lead text-ink-2">
                {section}
              </h3>
              {list.length > 0 && (
                <span className="tabular-nums text-sm text-ink-3">
                  {done}/{list.length}
                </span>
              )}
            </div>
            <ul>
              {list.map((it) => (
                <li key={it.id} className="flex items-start gap-3 border-t border-line py-2.5 first:border-t-0">
                  <input
                    id={`chk-${it.id}`}
                    type="checkbox"
                    className="check"
                    checked={it.done}
                    onChange={() => db.checks.update(it.id, { done: !it.done })}
                  />
                  <label
                    htmlFor={`chk-${it.id}`}
                    className={`flex-1 cursor-pointer ${it.done ? 'text-ink-3 line-through decoration-ink-3/60' : ''}`}
                  >
                    {it.text}
                  </label>
                  <button
                    className="btn-ghost rounded p-1 text-ink-3 hover:text-danger"
                    onClick={() => db.checks.delete(it.id)}
                    aria-label={`Remover: ${it.text}`}
                  >
                    <Icon name="x" size={15} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <AddForm placeholder={`Novo item em ${section}`} onAdd={(t) => addItem(section, t)} />
            </div>
          </section>
        )
      })}
    </div>
  )
}
