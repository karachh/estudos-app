import { roadmapIntro } from '../data/roadmap'

export interface AppModule {
  id: string
  intro?: { title: string; text: string }[]
  label: string
  short: string
  tagline: string
  groupLabel: string // como o módulo chama o grupo: etapa, disciplina...
  newGroup: string // placeholder do campo de criação, concordando em gênero com groupLabel
  topicLabel: string
  defaultSections: string[]
  emptyHint: string
}

// Para criar um módulo novo: adicione aqui. As telas são as mesmas para todos.
export const modules: AppModule[] = [
  {
    id: 'profissional',
    label: 'Estudos profissionais',
    short: 'Profissional',
    intro: roadmapIntro,
    tagline: 'Roadmap de Engenharia de Dados + IA',
    groupLabel: 'etapa',
    newGroup: 'Nova etapa',
    topicLabel: 'tópico',
    defaultSections: ['Estudar', 'Fazer'],
    emptyHint: 'Crie a primeira etapa do seu roadmap.',
  },
  {
    id: 'trabalho',
    label: 'Trabalho',
    short: 'Trabalho',
    tagline: 'O que preciso aprender para o dia a dia no trabalho',
    groupLabel: 'área',
    newGroup: 'Nova área',
    topicLabel: 'tópico',
    defaultSections: ['Estudar', 'Fazer'],
    emptyHint: 'Crie uma área (por exemplo, uma ferramenta ou projeto) e liste os tópicos dela.',
  },
  {
    id: 'uem',
    label: 'UEM',
    short: 'UEM',
    tagline: 'Disciplinas da faculdade, separadas por tópicos',
    groupLabel: 'disciplina',
    newGroup: 'Nova disciplina',
    topicLabel: 'conteúdo',
    defaultSections: ['Estudar', 'Exercícios'],
    emptyHint: 'Crie uma disciplina e depois adicione os conteúdos que vai estudar nela.',
  },
  {
    id: 'igreja',
    label: 'Igreja',
    short: 'Igreja',
    tagline: 'Formação e vida espiritual',
    groupLabel: 'assunto',
    newGroup: 'Novo assunto',
    topicLabel: 'conteúdo',
    defaultSections: ['Estudar', 'Praticar'],
    emptyHint: 'Crie um assunto de estudo.',
  },
]

export const getModule = (id: string | undefined) => modules.find((m) => m.id === id)
