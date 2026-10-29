import type { LinkSeed, ModuleContent } from '../data/content/helpers'
import { roadmap } from '../data/roadmap'
import { db, deleteTopicData, type CheckItem, type Resource } from './db'

const SEED_KEY = 'seed:v1'
const CONTENT_KEY = 'content'

let running: Promise<void> | null = null

// Carga inicial: roadmap importado do PDF + módulos que já nascem com estrutura.
// A primeira parte roda uma vez por banco; os conteúdos (links, módulos novos) rodam de novo
// sempre que CONTENT_VERSION sobe, só acrescentando o que falta.
export function ensureSeed() {
  return (running ??= seed().then(applyContent))
}

// Como o recurso é guardado: vídeo do YouTube guarda só o id; o resto guarda o endereço.
function toStored(l: LinkSeed): Pick<Resource, 'kind' | 'url'> {
  const url = new URL(l.url)
  const id =
    url.hostname === 'youtu.be'
      ? url.pathname.slice(1)
      : url.hostname.endsWith('youtube.com') && url.pathname === '/watch'
        ? url.searchParams.get('v')
        : null
  return id ? { kind: 'youtube', url: id } : { kind: 'link', url: url.href }
}

async function applyModule(c: ModuleContent) {
  const groups = await db.groups.where('moduleId').equals(c.moduleId).toArray()

  for (const g of c.groups) {
    let group = groups.find((x) => x.title === g.title)
    if (!group) {
      const order = Math.max(-1, ...groups.map((x) => x.order)) + 1
      const data = {
        moduleId: c.moduleId,
        title: g.title,
        subtitle: g.subtitle ?? '',
        description: g.description ?? '',
        criteria: g.criteria ?? '',
        order,
      }
      group = { ...data, id: await db.groups.add(data) }
      groups.push(group)
    }

    const topics = await db.topics.where('groupId').equals(group.id).toArray()
    for (const t of g.topics) {
      let topic = topics.find((x) => x.title === t.title)
      if (!topic) {
        const data = {
          moduleId: c.moduleId,
          groupId: group.id,
          title: t.title,
          summary: t.summary ?? '',
          badge: t.badge ?? '',
          flow: '',
          isProject: false,
          notes: '',
          glossary: (t.terms ?? []).map(([term, def]) => ({ term, def })),
          order: Math.max(-1, ...topics.map((x) => x.order)) + 1,
          createdAt: Date.now(),
        }
        topic = { ...data, id: await db.topics.add(data) }
        topics.push(topic)
        const checks: Omit<CheckItem, 'id'>[] = Object.entries(t.sections ?? {}).flatMap(([section, items]) =>
          items.map((text, order) => ({ moduleId: c.moduleId, topicId: topic!.id, section, text, done: false, order })),
        )
        await db.checks.bulkAdd(checks)
      }

      const existing = await db.resources.where('topicId').equals(topic.id).toArray()
      for (const l of t.links ?? []) {
        const stored = toStored(l)
        if (existing.some((r) => r.url === stored.url)) continue
        await db.resources.add({ topicId: topic.id, title: l.title, createdAt: Date.now(), ...stored })
      }
    }
  }
}

// O conteúdo vem num arquivo à parte, carregado só aqui, para não pesar a abertura do app.
async function applyContent() {
  const { CONTENT_VERSION, contentModules } = await import('../data/content')
  await db.transaction('rw', [db.groups, db.topics, db.checks, db.resources, db.sessions, db.meta], async () => {
    const done = ((await db.meta.get(CONTENT_KEY))?.value as number | undefined) ?? 0
    if (done >= CONTENT_VERSION) return
    // v4: o dono pediu para tirar o grupo de Scrum do Trabalho (27/10/2026)
    if (done < 4) {
      const scrum = await db.groups.where('moduleId').equals('trabalho').filter((g) => g.title === 'Scrum e agilidade').first()
      if (scrum) {
        for (const t of await db.topics.where('groupId').equals(scrum.id).toArray()) await deleteTopicData(t.id)
        await db.groups.delete(scrum.id)
      }
    }
    // v5: o dono renomeou o assunto "Sentimentos humanos" da Igreja para "Nosso coração" (28/10/2026)
    if (done < 5) {
      const groups = await db.groups.where('moduleId').equals('igreja').toArray()
      const old = groups.find((g) => g.title === 'Sentimentos humanos')
      if (old && !groups.some((g) => g.title === 'Nosso coração')) await db.groups.update(old.id, { title: 'Nosso coração' })
    }
    // v6: o dono renomeou o assunto "Teologia pura" da Igreja para "Teologia" (29/10/2026)
    if (done < 6) {
      const groups = await db.groups.where('moduleId').equals('igreja').toArray()
      const old = groups.find((g) => g.title === 'Teologia pura')
      if (old && !groups.some((g) => g.title === 'Teologia')) await db.groups.update(old.id, { title: 'Teologia' })
    }
    // v7: o dono tirou a seção "Por tema" do Repertório (29/10/2026). Grupo com item marcado fica, para não perder progresso.
    if (done < 7) {
      const gone = ['Saúde e longevidade', 'Mente e bem-estar', 'Comportamento e comunicação', 'IA: bastidores e debates']
      const groups = await db.groups.where('moduleId').equals('cultura').filter((g) => gone.includes(g.title)).toArray()
      for (const g of groups) {
        const topics = await db.topics.where('groupId').equals(g.id).toArray()
        const marked = await db.checks.where('topicId').anyOf(topics.map((t) => t.id)).filter((c) => c.done).count()
        if (marked) continue
        for (const t of topics) await deleteTopicData(t.id)
        await db.groups.delete(g.id)
      }
    }
    for (const c of contentModules) await applyModule(c)
    await db.meta.put({ key: CONTENT_KEY, value: CONTENT_VERSION })
  })
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
