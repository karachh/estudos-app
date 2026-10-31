// Mundo visual do interior do módulo. 'mapa' é o padrão (prova de orientação, hoje o do Motivação);
// 'sacro' é o do Igreja. 'fosforo' (Profissional, monitor de fósforo verde), 'bebop' (Repertório, Cowboy Bebop),
// 'eva' (UEM, Evangelion), 'office' (Trabalho, The Office) e 'neural' (IA, cabeças sintéticas) são temas do mapa: mesma estrutura, outra pele.
export type World = 'mapa' | 'fosforo' | 'bebop' | 'eva' | 'office' | 'neural' | 'sacro'


export interface AppModule {
  id: string
  world: World
  intro?: { title: string; text: string }[]
  introTitle?: string
  introOpen?: boolean
  overview?: boolean // mostra todos os grupos lado a lado, em vez de um sob o outro
  areas?: boolean // na visão geral, cada grupo vira uma seção, com um cartão por área (`badge` do tópico)
  checkLinks?: boolean // o tópico abre o checklist ali mesmo na lista; dentro dele, os links ficam em cada item
  hideGroupMeta?: boolean // esconde o prazo (subtítulo) e o critério de saída dos grupos
  hideGroupNav?: boolean // sem a fileira de atalhos para os grupos logo abaixo do cabeçalho
  unnumbered?: string[] // títulos de tópicos que aparecem sem o número
  sameSide?: boolean // na página inicial, o cartão repete o lado do módulo anterior, sem mudar o lado dos seguintes
  label: string
  short: string
  tagline: string
  groupLabel: string // como o módulo chama o grupo: etapa, disciplina...
  newGroup: string // placeholder do campo de criação, concordando em gênero com groupLabel
  topicLabel: string
  defaultSections: string[]
  emptyHint: string
}

// Para criar um módulo novo: adicione aqui, escolha o world e uma cor em styles/index.css. As telas são as mesmas para todos.
export const modules: AppModule[] = [
  {
    id: 'profissional',
    world: 'fosforo',
    label: 'Estudos profissionais',
    short: 'Profissional',
    hideGroupMeta: true,
    hideGroupNav: true,
    checkLinks: true,
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
    id: 'ia',
    overview: true,
    sameSide: true,
    world: 'neural',
    label: 'IA',
    short: 'IA',
    tagline: 'Plano de 12 meses, de nov/2026 a out/2027',
    introTitle: 'Como seguir este plano',
    intro: [
      {
        title: 'A ordem importa mais que a lista',
        text: 'Fazer os 10 temas ao mesmo tempo significa terminar nenhum. Primeiro o que dá resultado rápido e já ajuda no trabalho, depois a base sólida, depois a especialização. n8n, Make, Zapier e vibe coding se aprendem em semanas; machine learning e engenharia de IA levam meses.',
      },
      {
        title: 'O que mais pesa para vaga júnior',
        text: 'Python, SQL, estatística básica, ML clássico, uma aplicação com LLM funcionando e portfólio público no GitHub. Automação e vibe coding são diferenciais, não base.',
      },
      {
        title: 'Cada mês termina com uma entrega pública',
        text: 'Se não há entrega, o mês não conta. Se as férias da faculdade caírem em dez/jan/fev, use para adiantar a Fase 2.',
      },
      {
        title: 'Portfólio: qualidade vence quantidade',
        text: 'Um recrutador abre 2 ou 3 repositórios, no máximo. Cada projeto está na seção "Projetos" da sua fase. Metas em 12 meses: 6 repositórios de ML e dados, 2 de engenharia de IA, 2 modelos e 1 Space no Hugging Face, 3 competições no Kaggle, 1 projeto de pesquisa e 3 artigos técnicos.',
      },
      {
        title: 'Sua vantagem escondida',
        text: 'Você já trabalha com dados georreferenciados e SQL. Um projeto de ML ou IA em cima de dados geográficos públicos (IBGE, INPE) é raro entre iniciantes e conta uma história boa na entrevista. Nunca use dados confidenciais da empresa em projetos públicos; use bases abertas.',
      },
      {
        title: 'Kaggle e artigos ficam para depois',
        text: 'Competição sem base vira frustração: antes, use os cursos gratuitos do Kaggle Learn e as competições de treino (Playground). Pesquisa e artigos ficam para a fase final, quando você já tem o que contar.',
      },
      {
        title: 'Próximo passo real',
        text: 'Criar a conta no GitHub (se ainda não tem), o primeiro repositório com README, e começar a trilha de Python e Pandas do Kaggle Learn.',
      },
    ],
    groupLabel: 'fase',
    newGroup: 'Nova fase',
    topicLabel: 'tópico',
    defaultSections: ['Estudar'],
    emptyHint: 'Crie uma fase do plano e liste os tópicos dela.',
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
    areas: true,
    world: 'bebop',
    label: 'Repertório',
    short: 'Repertório',
    tagline: 'Saúde, comportamento, documentários e cultura',
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
    tagline: 'Foque no seu objetivo',
    unnumbered: ['Fé e esperança'],
    groupLabel: 'coleção',
    newGroup: 'Nova coleção',
    topicLabel: 'tema',
    defaultSections: ['Para lembrar'],
    emptyHint: 'Crie uma coleção e guarde aqui os vídeos que levantam o seu ânimo, agrupados por tema.',
  },
]

export const getModule = (id: string | undefined) => modules.find((m) => m.id === id)
