import { roadmap } from '../data/roadmap'
import { db, type CheckItem } from './db'

const SEED_KEY = 'seed:v1'

let running: Promise<void> | null = null

// Carga inicial: roadmap importado do PDF + módulos que já nascem com estrutura.
// Roda uma única vez por banco; depois disso tudo é editado pelo app.
export function ensureSeed() {
  return (running ??= seed())
}

async function seed() {
  await db.transaction('rw', [db.groups, db.topics, db.checks, db.meta], async () => {
    if (await db.meta.get(SEED_KEY)) return

    for (const [i, tier] of roadmap.entries()) {
      const groupId = await db.groups.add({
        moduleId: 'profissional',
        title: tier.title,
        subtitle: tier.subtitle,
        description: tier.description,
        criteria: tier.criteria,
        order: i,
      })

      for (const [j, t] of tier.topics.entries()) {
        const topicId = await db.topics.add({
          moduleId: 'profissional',
          groupId,
          title: t.title,
          summary: t.summary,
          badge: t.badge ?? '',
          flow: t.flow ?? '',
          isProject: !!t.entregas,
          notes: '',
          glossary: (t.termos ?? []).map(([term, def]) => ({ term, def })),
          order: j,
          createdAt: Date.now(),
        })

        const sections: [string, string[] | undefined][] = [
          ['Estudar', t.estudar],
          ['Fazer', t.fazer],
          ['Entregas', t.entregas],
        ]
        const checks: Omit<CheckItem, 'id'>[] = sections.flatMap(([section, items]) =>
          (items ?? []).map((text, order) => ({
            moduleId: 'profissional',
            topicId,
            section,
            text,
            done: false,
            order,
          })),
        )
        await db.checks.bulkAdd(checks)
      }
    }

    await db.groups.add({
      moduleId: 'igreja',
      title: 'Espiritualidade',
      subtitle: 'Conteúdo inicial',
      description: '',
      criteria: '',
      order: 0,
    })

    await db.meta.put({ key: SEED_KEY, value: Date.now() })
  })
}
