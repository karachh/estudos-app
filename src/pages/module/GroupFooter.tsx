import { useState } from 'react'
import { AddForm } from '../../components/ui/AddForm'
import { Icon } from '../../components/ui/Icon'
import { db, deleteTopicData, type Group, type Topic } from '../../core/db'
import type { AppModule } from '../../core/modules'

// Rodapé de todo grupo: criar tópico e editar ou excluir o grupo
export function GroupFooter({ mod, group, topics, placeholder, className }: { mod: AppModule; group: Group; topics: Topic[]; placeholder: string; className: string }) {
  const [editing, setEditing] = useState(false)

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
    <div className={className}>
      <AddForm placeholder={placeholder} onAdd={addTopic} />
      <button className="btn btn-ghost -ml-[0.95rem]" onClick={() => setEditing((v) => !v)} aria-expanded={editing}>
        <Icon name="pencil" size={15} />
        Editar {mod.groupLabel}
      </button>
      {editing && <GroupEditor group={group} groupLabel={mod.groupLabel} onDelete={removeGroup} onClose={() => setEditing(false)} />}
    </div>
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
      {/* Nos cartões estreitos da visão geral os dois botões não cabem lado a lado: o segundo desce de linha */}
      <div className="flex flex-wrap justify-between gap-2">
        <button className="btn btn-ghost text-danger" onClick={onDelete}>
          <Icon name="trash" size={15} />
          Excluir {groupLabel}
        </button>
        <button className="btn ml-auto" onClick={onClose}>
          Concluir edição
        </button>
      </div>
    </div>
  )
}
