import type { LinkSeed, ModuleContent } from '../data/content/helpers'
import { roadmap } from '../data/roadmap'
import { db, deleteTopicData, type CheckItem, type Group, type Resource } from './db'

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
      const order = g.order ?? Math.max(-1, ...groups.map((x) => x.order)) + 1
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
          isProject: !!t.project,
          notes: t.notes ?? '',
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

async function updateGroup(moduleId: string, title: string, changes: Partial<Group>) {
  const group = await db.groups.where('moduleId').equals(moduleId).filter((g) => g.title === title).first()
  if (group) await db.groups.update(group.id, changes)
}

// Grupo com item marcado ou anotação fica, para não perder o que o dono fez
async function removeUntouchedGroup(moduleId: string, title: string) {
  const group = await db.groups.where('moduleId').equals(moduleId).filter((g) => g.title === title).first()
  if (!group) return
  const topics = await db.topics.where('groupId').equals(group.id).toArray()
  const marked = await db.checks.where('topicId').anyOf(topics.map((t) => t.id)).filter((c) => c.done).count()
  if (marked || topics.some((t) => t.notes.trim())) return
  for (const t of topics) await deleteTopicData(t.id)
  await db.groups.delete(group.id)
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
    // v9: pedidos do dono de 31/10/2026 (grupos, textos da Igreja e da Motivação, prazos da IA, áreas do Repertório)
    if (done < 9) {
      await removeUntouchedGroup('cultura', 'Literatura e fé')
      await removeUntouchedGroup('mental', 'Minhas razões')
      await updateGroup('mental', 'Para os dias de desânimo', { subtitle: '', description: '' })
      await updateGroup('igreja', 'Teologia', {
        description: 'Ordem sugerida: fundamentos, depois doutrina, depois aprofundamento e, por último, história e apologética.',
        criteria: '',
      })
      await updateGroup('igreja', 'Nosso coração', { description: 'Emoções, temperamentos, ansiedade, tristeza e tentações.', criteria: '' })
      await updateGroup('igreja', 'Maturidade espiritual', { criteria: '' })
      await updateGroup('ia', 'Fase 0: Base', { subtitle: 'Serve para as duas trilhas' })
      for (const g of await db.groups.where('moduleId').equals('ia').toArray()) if (/\d{4}/.test(g.subtitle)) await db.groups.update(g.id, { subtitle: '' })
      const seeds = contentModules.find((c) => c.moduleId === 'cultura')!.groups.flatMap((g) => g.topics)
      for (const t of await db.topics.where('moduleId').equals('cultura').toArray()) {
        const badge = seeds.find((s) => s.title === t.title)?.badge
        if (badge && !t.badge) await db.topics.update(t.id, { badge })
      }
    }
    // v11: o dono tirou "Fé e esperança" da Motivação e os vídeos sugeridos dos outros temas (31/10/2026).
    // Só saem os vídeos que o app trouxe; o que o dono adicionou por conta própria fica.
    if (done < 11) {
      const suggested = ['M-DPRkSqTXI', 'xsE964xxuxI', 'GaFO6bRc8uI', 'xv3VQF6nex8', 'rNnROej7V4E', 'tG1eE2sdDX4']
      for (const t of await db.topics.where('moduleId').equals('mental').toArray()) {
        if (t.title === 'Fé e esperança') await deleteTopicData(t.id)
        else await db.resources.where('topicId').equals(t.id).filter((r) => suggested.includes(r.url)).delete()
      }
    }
    // v12: o dono trocou o roadmap da IA pelo plano de 12 meses e pediu para remover o antigo por inteiro (31/10/2026),
    // inclusive o que tinha progresso, anotação ou material.
    if (done < 12) {
      const old = ['Fase 0: Base', 'Fase 1: Trilha B, AI Builder', 'Fase 2: Base de dados e ML', 'Fase 3: Trilha A, AI Engineer']
      for (const g of await db.groups.where('moduleId').equals('ia').filter((g) => old.includes(g.title)).toArray()) {
        for (const t of await db.topics.where('groupId').equals(g.id).toArray()) await deleteTopicData(t.id)
        await db.groups.delete(g.id)
      }
    }
    // v14: o dono tirou as datas da frente dos tópicos da IA ("Jan/2027: ...") em 31/10/2026.
    // Vem antes da v13, que procura os tópicos pelo título novo.
    if (done < 14) {
      for (const t of await db.topics.where('moduleId').equals('ia').toArray()) {
        const rest = t.title.replace(/^[A-Z][a-z]{2}\/\d{4}:\s*/, '')
        if (rest !== t.title) await db.topics.update(t.id, { title: rest.charAt(0).toUpperCase() + rest.slice(1) })
      }
    }
    // v13: o dono pediu os materiais de "Cursos e recursos" (IA) dentro dos meses a que dizem respeito (31/10/2026).
    // Os links saem daqui e o applyModule, logo abaixo, cria cada um no mês certo; as orientações vão para as anotações.
    // Tópico em que o dono marcou item, anotou, registrou sessão ou pôs material próprio fica, para não perder nada.
    if (done < 13) {
      const seeds = contentModules.find((c) => c.moduleId === 'ia')!.groups.flatMap((g) => g.topics)
      const planned = new Set(seeds.flatMap((s) => s.links ?? []).map((l) => toStored(l).url))
      const group = await db.groups.where('moduleId').equals('ia').filter((g) => g.title === 'Cursos e recursos').first()
      if (group) {
        let kept = 0
        for (const t of await db.topics.where('groupId').equals(group.id).toArray()) {
          await db.resources.where('topicId').equals(t.id).filter((r) => planned.has(r.url)).delete()
          const marked = await db.checks.where('topicId').equals(t.id).filter((c) => c.done).count()
          const resources = await db.resources.where('topicId').equals(t.id).count()
          const sessions = await db.sessions.where('topicId').equals(t.id).count()
          if (marked || resources || sessions || t.notes.trim()) kept++
          else await deleteTopicData(t.id)
        }
        if (!kept) await db.groups.delete(group.id)
      }
      for (const t of await db.topics.where('moduleId').equals('ia').toArray()) {
        const notes = seeds.find((s) => s.title === t.title)?.notes
        if (notes && !t.notes.includes(notes)) await db.topics.update(t.id, { notes: t.notes.trim() ? `${t.notes.trim()}\n\n${notes}` : notes })
      }
    }
    // v15: o dono pediu o "Portfólio público" da IA dentro das fases, como seção "Projetos" (31/10/2026).
    // Os projetos novos vêm do applyModule. Tópico antigo com progresso, anotação, material ou sessão fica, para não perder nada.
    if (done < 15) {
      const group = await db.groups.where('moduleId').equals('ia').filter((g) => g.title === 'Portfólio público').first()
      if (group) {
        let kept = 0
        for (const t of await db.topics.where('groupId').equals(group.id).toArray()) {
          const marked = await db.checks.where('topicId').equals(t.id).filter((c) => c.done).count()
          const resources = await db.resources.where('topicId').equals(t.id).count()
          const sessions = await db.sessions.where('topicId').equals(t.id).count()
          if (marked || resources || sessions || t.notes.trim()) kept++
          else await deleteTopicData(t.id)
        }
        if (!kept) await db.groups.delete(group.id)
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
