import { roadmapIntro } from '../data/roadmap'

export interface AppModule {
  id: string
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

// Para criar um módulo novo: adicione aqui e uma cor em index.css. As telas são as mesmas para todos.
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
    tagline: 'O que preciso dominar para o dia a dia como desenvolvedor',
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
    tagline: 'Plano de estudo católico: teologia, coração humano e maturidade espiritual',
    groupLabel: 'assunto',
    newGroup: 'Novo assunto',
    topicLabel: 'conteúdo',
    defaultSections: ['Estudar', 'Praticar'],
    emptyHint: 'Crie um assunto de estudo.',
  },
  {
    id: 'cultura',
    label: 'Cultura',
    short: 'Cultura',
    tagline: 'Podcasts, documentários, séries e leituras para ampliar o repertório',
    introTitle: 'Lembrete: mande suas referências ao Claude',
    introOpen: true,
    intro: [
      {
        title: 'Esta lista ainda é um ponto de partida',
        text: 'As sugestões daqui foram escolhidas com o pouco que o Claude sabe sobre você. Na categoria "Para enriquecer depois" há uma lista do que contar a ele (gostos, livros, séries, temas de curiosidade). Quando puder, mande esse contexto e peça para ele refinar este módulo.',
      },
    ],
    groupLabel: 'categoria',
    newGroup: 'Nova categoria',
    topicLabel: 'item',
    defaultSections: ['Assistir ou ouvir', 'Anotar'],
    emptyHint: 'Crie uma categoria para guardar o que você quer ver, ouvir ou ler.',
  },
  {
    id: 'mental',
    label: 'Mental',
    short: 'Mental',
    tagline: 'Vídeos e lembretes para os dias em que o ânimo cai',
    groupLabel: 'coleção',
    newGroup: 'Nova coleção',
    topicLabel: 'tema',
    defaultSections: ['Para lembrar'],
    emptyHint: 'Crie uma coleção e guarde aqui os vídeos que levantam o seu ânimo, agrupados por tema.',
  },
]

export const getModule = (id: string | undefined) => modules.find((m) => m.id === id)
