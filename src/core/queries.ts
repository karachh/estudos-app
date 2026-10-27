import { useLiveQuery } from 'dexie-react-hooks'
import { db } from './db'

export interface Progress {
  done: number
  total: number
}

const add = (map: Map<number, Progress>, key: number, done: boolean) => {
  const p = map.get(key) ?? { done: 0, total: 0 }
  p.total += 1
  if (done) p.done += 1
  map.set(key, p)
}

export const ratio = (p?: Progress) => (p && p.total > 0 ? p.done / p.total : 0)

export function sumProgress(list: (Progress | undefined)[]): Progress {
  return list.reduce<Progress>(
    (acc, p) => ({ done: acc.done + (p?.done ?? 0), total: acc.total + (p?.total ?? 0) }),
    { done: 0, total: 0 },
  )
}

// Tudo que a tela de um módulo precisa, com o progresso de cada tópico já calculado.
export function useModuleData(moduleId: string) {
  return useLiveQuery(async () => {
    const [groups, topics, checks] = await Promise.all([
      db.groups.where('moduleId').equals(moduleId).sortBy('order'),
      db.topics.where('moduleId').equals(moduleId).sortBy('order'),
      db.checks.where('moduleId').equals(moduleId).toArray(),
    ])
    const byTopic = new Map<number, Progress>()
    for (const c of checks) add(byTopic, c.topicId, c.done)
    return { groups, topics, byTopic }
  }, [moduleId])
}

// Progresso total de cada módulo, para a navegação.
export function useModuleTotals() {
  return useLiveQuery(async () => {
    const totals = new Map<string, Progress>()
    await db.checks.each((c) => {
      const p = totals.get(c.moduleId) ?? { done: 0, total: 0 }
      p.total += 1
      if (c.done) p.done += 1
      totals.set(c.moduleId, p)
    })
    return totals
  })
}
