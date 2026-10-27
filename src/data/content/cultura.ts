import { link, ppr, yt, type ModuleContent } from './helpers.ts'

// Módulo Repertório (id 'cultura'). Os grupos do topo saem dos links que o dono mandou em 27/10/2026, quase todos
// de newsletters: saúde e longevidade, mente, comportamento, IA e documentários. Os demais foram o ponto de partida genérico.
export const cultura: ModuleContent = {
  moduleId: 'cultura',
  groups: [
    {
      title: 'Saúde e longevidade',
      subtitle: 'Hábitos, comida e cérebro',
      topics: [
        {
          title: 'Hábitos para criar aos 20 e 30 anos',
          summary: 'Artigo de Stanford Medicine com cinco hábitos de saúde para começar cedo.',
          sections: { Ler: ['Ler o artigo'], Anotar: ['Escolher um hábito para começar'] },
          links: [link('(EN) Five healthy habits to develop in your 20s and 30s (Stanford Medicine)', 'https://med.stanford.edu/news/insights/2026/01/five-healthy-habits-to-develop-in-your-20s-and-30s.html')],
        },
        {
          title: 'O que um cardiologista não come',
          summary: 'Matéria da CNBC: nove alimentos que um cardiologista evita e o que ele compra no lugar.',
          sections: { Ler: ['Ler a matéria'], Anotar: [] },
          links: [link('(EN) Cardiologist: 9 American foods I\'ll never touch (CNBC)', 'https://www.cnbc.com/2025/10/10/cardiologist-9-american-foods-ill-never-eat-and-the-healthy-alternatives-i-buy.html')],
        },
        {
          title: 'Comida e cérebro',
          summary: 'Vídeo da BBC sobre alimentos que ajudam o cérebro.',
          sections: { 'Assistir ou ouvir': ['Assistir ao vídeo'], Anotar: [] },
          links: [yt('eCa36C6q1Ts', '(EN) The food that can boost your brain (BBC Global)')],
        },
        {
          title: 'Alzheimer: prevenção e diagnóstico',
          summary: 'Uma palestra da neurocientista Lisa Genova (Big Think) sobre como proteger o cérebro, e uma matéria da AP sobre exames de sangue para Alzheimer.',
          sections: { 'Assistir ou ouvir': ['Assistir à palestra'], Ler: ['Ler a matéria da AP'], Anotar: [] },
          links: [
            yt('xBDGgovA1LI', '(EN) 5 ways to build an Alzheimer\'s-resistant brain (Lisa Genova, Big Think)'),
            link('(EN) Exames de sangue para Alzheimer (AP News)', 'https://apnews.com/article/alzheimers-blood-tests-amyloid-tau-55eb2d490231b57acec8ef2848072d93'),
          ],
        },
        {
          title: 'Hábitos de quem envelhece feliz',
          summary: 'Matéria da CNBC com três hábitos de uma aposentadoria feliz.',
          sections: { Ler: ['Ler a matéria'], Anotar: [] },
          links: [link('(EN) 3 habits for a happier retirement (CNBC)', 'https://www.cnbc.com/2026/09/29/happy-retirement-habits.html')],
        },
      ],
    },
    {
      title: 'Mente e bem-estar',
      subtitle: 'Calma, ansiedade e dias ruins',
      topics: [
        {
          title: 'Hábitos de 30 segundos para ficar mais calmo',
          summary: 'Artigo da BBC Future com quatro hábitos rápidos para melhorar o humor.',
          sections: { Ler: ['Ler o artigo'], Anotar: ['Testar um deles por uma semana'] },
          links: [link('(EN) Four 30-second habits that could make you calmer (BBC Future)', 'https://www.bbc.com/future/article/20260911-four-30-second-habits-that-could-make-you-calmer')],
        },
        {
          title: 'Ansiedade social',
          summary: 'Matéria da BBC News Brasil sobre hábitos ocultos que agravam a ansiedade social e como evitá-los.',
          sections: { Ler: ['Ler a matéria'], Anotar: [] },
          links: [link('Ansiedade social: os hábitos ocultos que agravam a condição (BBC News Brasil)', 'https://www.bbc.com/portuguese/articles/cmn0jd62er0ro')],
        },
        {
          title: 'Como se recuperar de um dia ruim',
          summary: 'Artigo da Reader\'s Digest sobre o que fazer depois de um dia ruim.',
          sections: { Ler: ['Ler o artigo'], Anotar: [] },
          links: [link('(EN) How to recover from a bad day (Reader\'s Digest)', 'https://www.rd.com/article/how-to-recover-from-a-bad-day/')],
        },
      ],
    },
    {
      title: 'Comportamento e comunicação',
      subtitle: 'Como as pessoas falam, convencem e brigam',
      topics: [
        {
          title: 'As palavras que entregam um mentiroso',
          summary: 'Artigo da BBC Science Focus com uma linguista forense sobre sinais de mentira na linguagem.',
          sections: { Ler: ['Ler o artigo'], Anotar: [] },
          links: [link('(EN) The simple words that can expose any liar (BBC Science Focus)', 'https://www.sciencefocus.com/wellbeing/how-to-catch-a-liar-language')],
        },
        {
          title: 'Retórica',
          summary: 'Aula animada do TED-Ed sobre como usar a retórica para convencer.',
          sections: { 'Assistir ou ouvir': ['Assistir ao vídeo'], Anotar: [] },
          links: [yt('3klMM9BkW5o', '(EN) How to use rhetoric to get what you want (TED-Ed)')],
        },
        {
          title: 'Como brigar bem com quem você ama',
          summary: 'Quadrinho da NPR com conselhos de Priya Parker, especialista em resolução de conflitos.',
          sections: { Ler: ['Ler o quadrinho'], Anotar: [] },
          links: [link('(EN) How to fight with your loved ones (NPR)', 'https://www.npr.org/2026/09/09/nx-s1-5961264/conflict-and-relationships-comic-priya-parker')],
        },
      ],
    },
    {
      title: 'IA: bastidores e debates',
      subtitle: 'Ensaios, entrevistas e eventos',
      topics: [
        {
          title: 'Ensaios sobre o rumo da IA',
          summary: 'Um texto de Kevin Roose sobre o ensaio que deu início à corrida da IA, uma análise da MIT Technology Review sobre autoaperfeiçoamento recursivo e o post de Alexandr Wang sobre o Muse.',
          sections: { Ler: ['Kevin Roose', 'MIT Technology Review', 'Alexandr Wang'], Anotar: [] },
          links: [
            link('(EN) The Essay That Started the AI Race (Kevin Roose)', 'https://kevinroose.substack.com/p/the-essay-that-started-the-ai-race'),
            link('(EN) AI\'s recursive self-improvement might not come so quickly after all (MIT Technology Review)', 'https://www.technologyreview.com/2026/08/18/1142188/ai-recursive-self-improvement/'),
            link('(EN) Why We\'re Building Muse (Alexandr Wang, no X)', 'https://x.com/alexandr_wang/status/2103551714536439951'),
          ],
        },
        {
          title: 'Entrevistas e palestras',
          summary: 'Mike Krieger (Anthropic) no Atlantico Tech Talks, o melhor do Febraban Tech 2026 pela Oracle e Diogo Almeida no podcast Latent Space.',
          sections: { 'Assistir ou ouvir': ['Mike Krieger', 'Febraban Tech 2026', 'Latent Space'], Anotar: [] },
          links: [
            yt('F0fL_lg5dis', 'Mike Krieger: a nova restrição não é inteligência (Atlantico Tech Talks)'),
            yt('TyaYCbM1UJA', 'Agentes inteligentes, liderança humana: o melhor do Febraban Tech 2026 (Oracle Brasil)'),
            yt('cFx9Z3ZXca0', '(EN) Why I couldn\'t build Jev at OpenAI: Diogo Almeida (Latent Space)'),
          ],
        },
        {
          title: 'Liderança na Era da IA (Google Cloud e Geoambiente, SP)',
          summary: 'Página de inscrição do evento "Liderança na Era da IA: da estratégia de dados à execução". Confira data e vagas na página (ela pede login no Google).',
          sections: { Fazer: ['Ver a data e decidir se vai'], Anotar: [] },
          links: [link('Inscrição no evento (Google)', 'https://rsvp.withgoogle.com/events/cloud-encounters-geoambiente-sp')],
        },
      ],
    },
    {
      title: 'Documentários e filmes',
      subtitle: 'A história por trás da tecnologia',
      topics: [
        {
          title: 'Os 50 maiores documentários (Sight and Sound)',
          summary: 'Lista da revista Sight and Sound, do BFI, com os 50 maiores documentários segundo a crítica. Boa fonte para escolher o próximo.',
          sections: { 'Assistir ou ouvir': ['Escolher 3 da lista para assistir'], Anotar: [] },
          links: [link('(EN) Critics\' 50 Greatest Documentaries of All Time (BFI)', 'https://www.bfi.org.uk/sight-and-sound/critics-50-greatest-documentaries-all-time')],
        },
        {
          title: 'Como Viver até os 100: Os Segredos das Zonas Azuis',
          summary: 'Série documental da Netflix sobre os lugares do mundo onde as pessoas vivem mais.',
          sections: { 'Assistir ou ouvir': ['Assistir à série'], Anotar: [] },
          links: [link('Como Viver até os 100 (Netflix)', 'https://www.netflix.com/br/title/81214929')],
        },
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
  ],
}
