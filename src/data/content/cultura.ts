import { link, ppr, yt, type ModuleContent } from './helpers.ts'

// Ponto de partida montado com o pouco que o Claude sabe sobre o dono do app: brasileiro, estuda Computação,
// trabalha com desenvolvimento (Java, Angular, SQL), quer migrar para engenharia de dados e IA, e é católico.
// A categoria "Para enriquecer depois" lista o que falta saber para refinar tudo isso.
export const cultura: ModuleContent = {
  moduleId: 'cultura',
  groups: [
    {
      title: 'Podcasts',
      subtitle: 'Para ouvir no trânsito ou na academia',
      topics: [
        {
          title: 'Hipsters Ponto Tech',
          summary: 'Podcast brasileiro de tecnologia da Alura: programação, carreira, design e tendências. Episódios de cerca de 45 minutos.',
          sections: { 'Assistir ou ouvir': ['Ouvir os dois episódios linkados', 'Escolher 3 episódios antigos sobre carreira ou dados'], Anotar: [] },
          links: [
            link('Carreira e Dia da Programação (Hipsters #374)', 'https://www.alura.com.br/podcast/carreira-e-dia-da-programacao-hipsters-ponto-tech-374-a9072'),
            link('Imersão, tecnologia e aprendizagem 6 (Hipsters #497)', 'https://www.alura.com.br/podcast/imersao-tecnologia-e-aprendizagem-6-hipsters-ponto-tech-497-a9948'),
          ],
        },
        {
          title: 'Outros podcasts de tecnologia',
          summary: 'Listas para escolher mais programas. Dois que apareceram nas buscas: PodProgramar (voltado a desenvolvedores) e Debugados (conversas sobre programação).',
          sections: { 'Assistir ou ouvir': ['Testar 3 programas das listas e ficar com os que prenderem a atenção'], Anotar: [] },
          links: [
            link('Lista de 31 podcasts de tecnologia', 'https://engenharia360.com/lista-de-31-podcasts-de-tecnologia/'),
            link('Podcasts recomendados para desenvolvedores (TabNews)', 'https://www.tabnews.com.br/gorpo85/lista-de-podcasts-recomendados-para-desenvolvedores'),
          ],
        },
      ],
    },
    {
      title: 'Documentários e filmes',
      subtitle: 'A história por trás da tecnologia',
      topics: [
        {
          title: 'AlphaGo (documentário)',
          summary: 'Documentário de 2017 sobre o programa de IA da DeepMind que desafiou um campeão mundial de Go. A versão linkada é o upload oficial da DeepMind, em inglês (confira se há legendas em português no player).',
          sections: { 'Assistir ou ouvir': ['Assistir ao documentário inteiro'], Anotar: ['Anotar uma ideia sobre como a IA aprendeu a jogar'] },
          links: [yt('WXuK6gekU1Y', '(EN) AlphaGo - The Movie (DeepMind, oficial)')],
        },
        {
          title: 'Alan Turing: o filme e a vida',
          summary: '"O Jogo da Imitação" (2014) é um filme sobre Alan Turing. A palestra linkada é de um professor de computação sobre o pai da Ciência da Computação.',
          sections: { 'Assistir ou ouvir': ['Assistir à palestra', 'Assistir ao filme'], Anotar: [] },
          links: [
            yt('CSYILyCGWdc', 'Alan Turing: o pai da Ciência da Computação (legendado)'),
            yt('GxokSkSqF5E', 'O Jogo da Imitação - trailer oficial legendado'),
          ],
        },
        {
          title: 'O Dilema das Redes e Coded Bias (Netflix)',
          summary: 'Dois documentários da Netflix sobre o lado social da tecnologia: redes sociais e viés em algoritmos. Procure no catálogo; a disponibilidade muda.',
          sections: { 'Assistir ou ouvir': ['Assistir O Dilema das Redes', 'Assistir Coded Bias'], Anotar: ['Anotar o que isso muda na forma como eu construo sistemas de dados'] },
        },
      ],
    },
    {
      title: 'Séries',
      subtitle: 'Ficção sobre o mundo da tecnologia',
      topics: [
        {
          title: 'Silicon Valley',
          summary: 'Comédia da HBO sobre startups. Boa para reconhecer o vocabulário e os dramas do mercado.',
          sections: { 'Assistir ou ouvir': ['Assistir à primeira temporada'], Anotar: [] },
        },
        {
          title: 'Halt and Catch Fire',
          summary: 'Drama da AMC sobre a indústria de computadores pessoais nos anos 1980.',
          sections: { 'Assistir ou ouvir': ['Assistir ao primeiro episódio e decidir se continua'], Anotar: [] },
        },
        {
          title: 'Mr. Robot',
          summary: 'Suspense sobre um engenheiro de segurança e hackers.',
          sections: { 'Assistir ou ouvir': ['Assistir ao primeiro episódio e decidir se continua'], Anotar: [] },
        },
      ],
    },
    {
      title: 'Canais e artigos',
      subtitle: 'Para ler e assistir quando sobrar tempo',
      topics: [
        {
          title: 'Akitando (Fabio Akita)',
          summary: 'Canal de um programador veterano com vídeos longos sobre carreira, mercado e como aprender de verdade.',
          sections: { 'Assistir ou ouvir': ['Assistir ao vídeo linkado'], Anotar: ['Anotar uma conclusão sobre carreira'] },
          links: [
            yt('KOb_sWwqvUw', 'Ainda vale a pena ser um programador hoje em dia? (entrevista com Fabio Akita)'),
            link('Canal Akitando', 'https://www.youtube.com/channel/UCib793mnUOhWymCh2VJKplQ'),
          ],
        },
        {
          title: 'Comunidades e trilhas para ler',
          summary: 'TabNews é uma comunidade brasileira de tecnologia com artigos e discussões. roadmap.sh traz trilhas visuais de estudo.',
          sections: { 'Assistir ou ouvir': ['Ler 1 artigo por semana no TabNews'], Anotar: [] },
          links: [link('TabNews', 'https://www.tabnews.com.br/'), link('roadmap.sh: trilhas de estudo (EN)', 'https://roadmap.sh/')],
        },
      ],
    },
    {
      title: 'Literatura e fé',
      subtitle: 'Autores que pensam a fé e a imaginação',
      description: 'Os cursos do Padre Paulo Ricardo sobre autores católicos servem como porta de entrada para ler os livros.',
      topics: [
        {
          title: 'G. K. Chesterton',
          summary: 'Escritor inglês e apologista católico. Comece pelo curso introdutório.',
          sections: { 'Assistir ou ouvir': ['Assistir ao curso introdutório'], Anotar: ['Escolher um livro dele para ler'] },
          links: [ppr('introducao-a-chesterton', 'Introdução a Chesterton')],
        },
        {
          title: 'J. R. R. Tolkien',
          summary: 'O autor de O Senhor dos Anéis era católico praticante. Dois cursos do Padre Paulo sobre sua obra.',
          sections: { 'Assistir ou ouvir': ['Assistir a "Tolkien e a Imortalidade" (6 aulas)', 'Assistir a "O Senhor dos Anéis" (12 aulas)'], Anotar: [] },
          links: [ppr('tolkien-e-a-imortalidade', 'Tolkien e a Imortalidade'), ppr('o-senhor-dos-aneis', 'O Senhor dos Anéis')],
        },
        {
          title: 'C. S. Lewis: Cartas de um Diabo a seu Aprendiz',
          summary: 'Clássico em forma de cartas entre dois demônios, sobre como funcionam as tentações.',
          sections: { 'Assistir ou ouvir': ['Assistir ao curso e depois ler o livro'], Anotar: [] },
          links: [ppr('cartas-de-um-diabo-a-seu-aprendiz', 'Cartas de um Diabo a seu Aprendiz')],
        },
      ],
    },
    {
      title: 'Para enriquecer depois',
      subtitle: 'O que contar ao Claude para refinar este módulo',
      description: 'Lembrete: quando tiver um tempo, responda estes itens e mande ao Claude. Ele usa o contexto para trocar as sugestões genéricas por coisas que combinam com você.',
      topics: [
        {
          title: 'Me mande minhas referências',
          badge: 'Lembrete',
          summary: 'Marque cada item quando já tiver mandado a resposta ao Claude.',
          sections: {
            'Mandar ao Claude': [
              'Quais podcasts, canais e criadores eu já acompanho e gosto?',
              'Quais séries, filmes e documentários eu adorei (e quais larguei)?',
              'Quais livros e autores são meus favoritos?',
              'Que assuntos me dão curiosidade fora da tecnologia (história, ciência, música, esporte, fé...)?',
              'Que formato funciona melhor: vídeo longo, vídeo curto, áudio ou texto?',
              'Quanto tempo livre eu tenho por semana para isso?',
              'Aceito conteúdo em inglês? Com legenda ou só em português?',
            ],
          },
        },
      ],
    },
  ],
}
