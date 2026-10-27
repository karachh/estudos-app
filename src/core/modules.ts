import { roadmapIntro } from '../data/roadmap'

// Mundo visual do interior do módulo. 'mapa' é o padrão (prova de orientação); 'sacro' é o do Igreja;
// 'renascenca' é o do Motivação (colagem renascentista).
export type World = 'mapa' | 'sacro' | 'renascenca'

export interface AppModule {
  id: string
  world: World
  intro?: { title: string; text: string }[]
  introTitle?: string
  introOpen?: boolean
  label: string
  short: string
  tagline: string
  groupLabel: string // como o módulo chama o grupo: etapa, disciplina...
  newGroup: string // placeholder do campo de criação, concordando em gênero com groupLabel
  topicLabel: string
  defaultSections: string[]
  emptyHint: string
}

// Para criar um módulo novo: adicione aqui, escolha o world e uma cor em index.css. As telas são as mesmas para todos.
export const modules: AppModule[] = [
  {
    id: 'profissional',
    world: 'mapa',
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
    world: 'mapa',
    label: 'Trabalho',
    short: 'Trabalho',
    tagline: 'O que preciso dominar para o dia a dia como desenvolvedor',
    groupLabel: 'área',
    newGroup: 'Nova área',
    topicLabel: 'tópico',
    defaultSections: ['Estudar', 'Fazer'],
    emptyHint: 'Crie uma área (por exemplo, uma ferramenta ou projeto) e liste os tópicos dela.',
  },
  {
    id: 'uem',
    world: 'mapa',
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
    world: 'sacro',
    label: 'Igreja',
    short: 'Igreja',
    tagline: 'Plano de estudo católico: teologia, coração humano e maturidade espiritual',
    groupLabel: 'assunto',
    newGroup: 'Novo assunto',
    topicLabel: 'conteúdo',
    defaultSections: ['Estudar', 'Praticar'],
    emptyHint: 'Crie um assunto de estudo.',
  },
  {
    id: 'cultura',
    world: 'mapa',
    label: 'Repertório',
    short: 'Repertório',
    tagline: 'Saúde, mente, comportamento, IA e documentários: o que vale ler, ver e ouvir',
    groupLabel: 'categoria',
    newGroup: 'Nova categoria',
    topicLabel: 'item',
    defaultSections: ['Ler', 'Assistir ou ouvir', 'Anotar'],
    emptyHint: 'Crie uma categoria para guardar o que você quer ver, ouvir ou ler.',
  },
  {
    id: 'mental',
    world: 'renascenca',
    label: 'Motivação',
    short: 'Motivação',
    tagline: 'Vídeos e lembretes para os dias em que o ânimo cai',
    groupLabel: 'coleção',
    newGroup: 'Nova coleção',
    topicLabel: 'tema',
    defaultSections: ['Para lembrar'],
    emptyHint: 'Crie uma coleção e guarde aqui os vídeos que levantam o seu ânimo, agrupados por tema.',
  },
]

export const getModule = (id: string | undefined) => modules.find((m) => m.id === id)
