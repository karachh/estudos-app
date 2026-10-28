import { useLiveQuery } from 'dexie-react-hooks'
import { db, type ResourceKind } from './db'

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
    // Quantos materiais cada tópico tem: tópico sem checklist ainda pode ter vídeos e links
    const materials = new Map<number, number>()
    // E de que tipo: vídeo do YouTube, link (artigo, site) ou arquivo
    const kinds = new Map<number, Partial<Record<ResourceKind, number>>>()
    const resources = await db.resources.where('topicId').anyOf(topics.map((t) => t.id)).toArray()
    for (const r of resources) {
      materials.set(r.topicId, (materials.get(r.topicId) ?? 0) + 1)
      const k = kinds.get(r.topicId) ?? {}
      k[r.kind] = (k[r.kind] ?? 0) + 1
      kinds.set(r.topicId, k)
    }
    return { groups, topics, byTopic, materials, kinds }
  }, [moduleId])
}

// Resumo de todos os módulos para a página inicial: progresso por grupo e por tópico.
export function useHomeData() {
  return useLiveQuery(async () => {
    const [groups, topics, checks] = await Promise.all([db.groups.toArray(), db.topics.toArray(), db.checks.toArray()])
    const byTopic = new Map<number, Progress>()
    for (const c of checks) add(byTopic, c.topicId, c.done)
    const modules = new Map<string, { groups: { title: string; p: Progress }[]; topics: Progress[] }>()
    for (const g of groups.sort((a, b) => a.order - b.order)) {
      const inGroup = topics.filter((t) => t.groupId === g.id).sort((a, b) => a.order - b.order)
      const m = modules.get(g.moduleId) ?? { groups: [], topics: [] }
      const ps = inGroup.map((t) => byTopic.get(t.id) ?? { done: 0, total: 0 })
      m.groups.push({ title: g.title, p: sumProgress(ps) })
      m.topics.push(...ps)
      modules.set(g.moduleId, m)
    }
    return modules
  }, [])
}
