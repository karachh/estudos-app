// Formato dos conteúdos pré-carregados. O carregador (core/seed.ts) cria o que falta e adiciona links novos,
// mas nunca sobrescreve o que foi editado no app.

export interface LinkSeed {
  title: string
  url: string
}

export interface TopicSeed {
  title: string
  summary?: string
  badge?: string
  sections?: Record<string, string[]>
  links?: LinkSeed[]
  terms?: [string, string][]
}

export interface GroupSeed {
  title: string
  subtitle?: string
  description?: string
  criteria?: string
  topics: TopicSeed[]
}

export interface ModuleContent {
  moduleId: string
  groups: GroupSeed[]
}

export const yt = (id: string, title: string): LinkSeed => ({ title, url: `https://www.youtube.com/watch?v=${id}` })

export const playlist = (id: string, title: string): LinkSeed => ({
  title,
  url: `https://www.youtube.com/playlist?list=${id}`,
})

export const link = (title: string, url: string): LinkSeed => ({ title, url })

export const ppr = (slug: string, title: string): LinkSeed => ({
  title: `${title} (Padre Paulo Ricardo)`,
  url: `https://padrepauloricardo.org/cursos/${slug}`,
})
