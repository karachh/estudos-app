import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { db, type CheckItem, type Topic } from '../../core/db'
import { AddForm } from '../ui/AddForm'
import { Icon } from '../ui/Icon'
import { Resources } from './Resources'

// Itens agrupados por seção (Estudar, Fazer, Entregas...). As seções padrão do módulo sempre aparecem,
// para ter onde adicionar; as demais só aparecem quando têm itens.
// Com `withLinks`, cada item tem os próprios links, escondidos atrás de um botão.
export function Checklist({
  topic,
  items,
  defaultSections,
  withLinks = false,
}: {
  topic: Topic
  items: CheckItem[]
  defaultSections: string[]
  withLinks?: boolean
}) {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const linkCounts = useLiveQuery(async () => {
    const counts = new Map<number, number>()
    if (!withLinks) return counts
    await db.resources.where('topicId').equals(topic.id).each((r) => {
      if (r.checkId != null) counts.set(r.checkId, (counts.get(r.checkId) ?? 0) + 1)
    })
    return counts
  }, [topic.id, withLinks])

  const sections = [...defaultSections]
  for (const it of items) if (!sections.includes(it.section)) sections.push(it.section)

  async function addItem(section: string, text: string) {
    const order = items.filter((i) => i.section === section).length
    await db.checks.add({ moduleId: topic.moduleId, topicId: topic.id, section, text, done: false, order })
  }

  // Os links do item removido não se perdem: voltam para a lista de links sem item
  function removeItem(id: number) {
    return db.transaction('rw', [db.checks, db.resources], async () => {
      await db.resources
        .where('topicId')
        .equals(topic.id)
        .filter((r) => r.checkId === id)
        .modify((r) => {
          delete r.checkId
        })
      await db.checks.delete(id)
    })
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
              {list.map((it) => {
                const count = linkCounts?.get(it.id) ?? 0
                const open = openItem === it.id
                return (
                  <li key={it.id} className="border-t border-line py-2.5 first:border-t-0">
                    <div className="flex items-start gap-3">
                      <input
                        id={`chk-${it.id}`}
                        type="checkbox"
                        className="check"
                        checked={it.done}
                        onChange={() => db.checks.update(it.id, { done: !it.done })}
                      />
                      <label
                        htmlFor={`chk-${it.id}`}
                        className={`min-w-0 flex-1 cursor-pointer ${it.done ? 'text-ink-3 line-through decoration-ink-3/60' : ''}`}
                      >
                        {it.text}
                      </label>
                      {withLinks && (
                        <button
                          className="check-links-toggle"
                          onClick={() => setOpenItem(open ? null : it.id)}
                          aria-expanded={open}
                          aria-label={`${open ? 'Fechar' : count ? `Ver ${count} ${count === 1 ? 'link' : 'links'} de` : 'Adicionar link em'}: ${it.text}`}
                        >
                          <Icon name="link" size={15} />
                          <span className="max-sm:hidden">{open ? 'Fechar' : count ? `Ver mais (${count})` : 'Adicionar link'}</span>
                          {count > 0 && <span className="sm:hidden">{count}</span>}
                        </button>
                      )}
                      <button
                        className="btn-ghost rounded p-1 text-ink-3 hover:text-danger"
                        onClick={() => removeItem(it.id)}
                        aria-label={`Remover: ${it.text}`}
                      >
                        <Icon name="x" size={15} />
                      </button>
                    </div>
                    {open && (
                      <div className="check-links">
                        <Resources topicId={topic.id} scope={it.id} />
                      </div>
                    )}
                  </li>
                )
              })}
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
