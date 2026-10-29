// Mundo visual do interior do módulo. 'mapa' é o padrão (prova de orientação, hoje o do Motivação);
// 'sacro' é o do Igreja. 'cosmos' (Profissional, sol sobre o mar de nuvens), 'bebop' (Repertório, Cowboy Bebop),
// 'eva' (UEM, Evangelion) e 'office' (Trabalho, The Office) são temas do mapa: mesma estrutura, outra pele.
export type World = 'mapa' | 'cosmos' | 'bebop' | 'eva' | 'office' | 'sacro'

// Mundos que mostram o mapa de orientação com a tabela de controles
export const hasMap = (w: World) => w !== 'sacro'

export interface AppModule {
  id: string
  world: World
  intro?: { title: string; text: string }[]
  introTitle?: string
  introOpen?: boolean
  overview?: boolean // mostra todos os grupos lado a lado, em vez de um sob o outro
  sections?: { title: string; hint: string; groups: string[] }[] // divide a visão geral; grupo fora da lista vai para "Outros"
  hideGroupMeta?: boolean // esconde o prazo (subtítulo) e o critério de saída dos grupos
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
    world: 'cosmos',
    label: 'Estudos profissionais',
    short: 'Profissional',
    hideGroupMeta: true,
    tagline: 'Roadmap de Engenharia de Dados + IA',
    groupLabel: 'etapa',
    newGroup: 'Nova etapa',
    topicLabel: 'tópico',
    defaultSections: ['Estudar', 'Fazer'],
    emptyHint: 'Crie a primeira etapa do seu roadmap.',
  },
  {
    id: 'trabalho',
    world: 'office',
    label: 'Trabalho',
    short: 'Trabalho',
    tagline: 'dev/suporte na Tributech',
    groupLabel: 'área',
    newGroup: 'Nova área',
    topicLabel: 'tópico',
    defaultSections: ['Estudar', 'Fazer'],
    emptyHint: 'Crie uma área (por exemplo, uma ferramenta ou projeto) e liste os tópicos dela.',
  },
  {
    id: 'uem',
    overview: true,
    world: 'eva',
    label: 'UEM',
    short: 'UEM',
    tagline: 'Controle de disciplinas do semestre',
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
    tagline: 'Plano de Estudo Católico',
    groupLabel: 'assunto',
    newGroup: 'Novo assunto',
    topicLabel: 'conteúdo',
    defaultSections: ['Estudar', 'Praticar'],
    emptyHint: 'Crie um assunto de estudo.',
  },
  {
    id: 'cultura',
    overview: true,
    sections: [
      {
        title: 'Por tema',
        hint: 'Newsletters, vídeos e artigos sobre cada assunto',
        groups: ['Saúde e longevidade', 'Mente e bem-estar', 'Comportamento e comunicação', 'IA: bastidores e debates'],
      },
      {
        title: 'Por formato',
        hint: 'Documentários, podcasts, séries, canais e livros',
        groups: ['Documentários e filmes', 'Podcasts', 'Séries', 'Canais e artigos', 'Literatura e fé'],
      },
    ],
    world: 'bebop',
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
    world: 'mapa',
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
