import Dexie, { type EntityTable } from 'dexie'

// Modelo único para todos os módulos:
// módulo → grupo (etapa, disciplina, assunto) → tópico → checklist, recursos, sessões.

export interface Group {
  id: number
  moduleId: string
  title: string
  subtitle: string
  description: string
  criteria: string
  order: number
}

export interface Term {
  term: string
  def: string
}

export interface Topic {
  id: number
  moduleId: string
  groupId: number
  title: string
  summary: string
  badge: string
  flow: string
  isProject: boolean
  notes: string
  glossary: Term[]
  order: number
  createdAt: number
}

export interface CheckItem {
  id: number
  moduleId: string
  topicId: number
  section: string
  text: string
  done: boolean
  order: number
}

export type ResourceKind = 'link' | 'youtube' | 'file'

export interface Resource {
  id: number
  topicId: number
  kind: ResourceKind
  title: string
  url: string
  file?: Blob
  fileName?: string
  createdAt: number
}

export interface Session {
  id: number
  topicId: number
  minutes: number
  date: string // YYYY-MM-DD
  note: string
}

export interface Meta {
  key: string
  value: unknown
}

export const db = new Dexie('estudos') as Dexie & {
  groups: EntityTable<Group, 'id'>
  topics: EntityTable<Topic, 'id'>
  checks: EntityTable<CheckItem, 'id'>
  resources: EntityTable<Resource, 'id'>
  sessions: EntityTable<Session, 'id'>
  meta: EntityTable<Meta, 'key'>
}

// v1: protótipo do módulo de estudos pessoais (tabelas pessoal_*).
db.version(1).stores({
  pessoal_topics: '++id, status, createdAt',
  pessoal_tasks: '++id, topicId',
  pessoal_sessions: '++id, topicId, date',
})

// v2: modelo genérico. O que existia em pessoal_* migra para o grupo "Avulsos" do módulo profissional.
db.version(2)
  .stores({
    groups: '++id, moduleId, order',
    topics: '++id, moduleId, groupId, order',
    checks: '++id, moduleId, topicId',
    resources: '++id, topicId',
    sessions: '++id, topicId, date',
    meta: 'key',
  })
  .upgrade(async (tx) => {
    const old = await tx.table('pessoal_topics').toArray()
    if (old.length === 0) return
    const groupId = (await tx.table('groups').add({
      moduleId: 'profissional',
      title: 'Avulsos',
      subtitle: 'Temas criados antes da importação do roadmap',
      description: '',
      criteria: '',
      order: 999,
    })) as number
    const idMap = new Map<number, number>()
    for (const [i, t] of old.entries()) {
      const id = (await tx.table('topics').add({
        moduleId: 'profissional',
        groupId,
        title: t.title,
        summary: '',
        badge: '',
        flow: '',
        isProject: false,
        notes: t.notes ?? '',
        glossary: [],
        order: i,
        createdAt: t.createdAt ?? Date.now(),
      })) as number
      idMap.set(t.id, id)
    }
    for (const [i, task] of (await tx.table('pessoal_tasks').toArray()).entries()) {
      const topicId = idMap.get(task.topicId)
      if (!topicId) continue
      await tx.table('checks').add({
        moduleId: 'profissional',
        topicId,
        section: 'Tarefas',
        text: task.text,
        done: task.done,
        order: i,
      })
    }
    for (const s of await tx.table('pessoal_sessions').toArray()) {
      const topicId = idMap.get(s.topicId)
      if (!topicId) continue
      await tx.table('sessions').add({ topicId, minutes: s.minutes, date: s.date, note: s.note ?? '' })
    }
  })

// v3: remove as tabelas do protótipo, já migradas.
db.version(3).stores({
  pessoal_topics: null,
  pessoal_tasks: null,
  pessoal_sessions: null,
})

// Apaga o tópico e tudo que depende dele. Chame dentro de uma transação.
export async function deleteTopicData(topicId: number) {
  await db.checks.where('topicId').equals(topicId).delete()
  await db.resources.where('topicId').equals(topicId).delete()
  await db.sessions.where('topicId').equals(topicId).delete()
  await db.topics.delete(topicId)
}

export const today = () => new Date().toLocaleDateString('sv-SE') // YYYY-MM-DD no fuso local
