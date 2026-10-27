import { link, playlist, yt, type ModuleContent } from './helpers.ts'

export const trabalho: ModuleContent = {
  moduleId: 'trabalho',
  groups: [
    {
      title: 'Scrum e agilidade',
      subtitle: 'Como o time organiza o trabalho em sprints',
      description: 'O vocabulário e o ritmo do dia a dia de uma equipe de desenvolvimento.',
      topics: [
        {
          title: 'Scrum: papéis, eventos e artefatos',
          summary: 'A base para entender daily, planning, review e retrospectiva sem se perder nas reuniões.',
          sections: {
            Estudar: [
              'Papéis: Product Owner, Scrum Master e Developers',
              'A Sprint e o Sprint Goal',
              'Eventos: Sprint Planning, Daily Scrum, Sprint Review e Sprint Retrospective',
              'Artefatos: Product Backlog, Sprint Backlog e Incremento',
              'Definition of Done e critérios de aceite',
              'Estimativa: story points e planning poker',
            ],
            Fazer: [
              'Ler o Guia do Scrum 2020 inteiro (cerca de 15 páginas)',
              'Acompanhar uma sprint real do meu time e anotar o que acontece em cada evento',
              'Escrever 3 histórias de usuário no formato "Como..., quero..., para..."',
            ],
          },
          links: [
            link('Guia do Scrum 2020 (PDF oficial, português do Brasil)', 'https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-PortugueseBR-3.0.pdf'),
            link('Atlassian: o que é Scrum (português)', 'https://www.atlassian.com/br/agile/scrum'),
            yt('6lbGPwQeUOk', 'Metodologias Ágeis - Cerimônias do Scrum'),
            yt('s3y95I79D_Q', '(EN) The Scrum Guide: full course'),
          ],
          terms: [
            ['Sprint', 'Período fixo (em geral de 1 a 4 semanas) em que o time entrega um incremento de produto.'],
            ['Product Backlog', 'Lista ordenada de tudo que pode ser feito no produto. Quem prioriza é o Product Owner.'],
            ['Sprint Backlog', 'Os itens escolhidos para a sprint, mais o plano do time para entregá-los.'],
            ['Daily Scrum', 'Encontro de até 15 minutos para o time alinhar o andamento em direção ao Sprint Goal.'],
            ['Retrospectiva', 'Reunião ao fim da sprint para decidir o que o time vai melhorar no jeito de trabalhar.'],
            ['Story point', 'Unidade relativa de esforço usada para estimar histórias. Não é medida de horas.'],
          ],
        },
      ],
    },
    {
      title: 'Java',
      subtitle: 'A linguagem do backend',
      topics: [
        {
          title: 'Java: fundamentos e orientação a objetos',
          sections: {
            Estudar: [
              'Sintaxe, tipos, operadores e estruturas de controle',
              'Classes, objetos, construtores e encapsulamento',
              'Herança, polimorfismo, interfaces e classes abstratas',
              'Coleções: List, Set e Map',
              'Tratamento de exceções',
              'Maven: dependências e build',
            ],
            Fazer: ['Resolver 20 exercícios de lógica em Java', 'Montar um mini sistema (por exemplo, biblioteca ou lojinha) só com POO'],
          },
          links: [
            playlist('PLGxZ4Rq3BOBq0KXHsp5J3PxyFaBIXVs3r', 'Curso de Java Básico Gratuito com Certificado - Loiane Groner (playlist)'),
            playlist('PLLaQioUGFzGNKP6QlZ5viFc9n1bvlqTTM', 'Curso de Java para Iniciantes (playlist)'),
            link('dev.java: aprenda Java (oficial)', 'https://dev.java/learn/'),
            link('roadmap.sh: trilha de Java (EN)', 'https://roadmap.sh/java'),
          ],
        },
        {
          title: 'Java moderno: lambdas, Streams e Optional',
          sections: {
            Estudar: ['Expressões lambda e interfaces funcionais', 'Streams: map, filter, reduce e collect', 'Optional e como evitar NullPointerException'],
            Fazer: ['Reescrever 5 laços for do meu trabalho usando Streams'],
          },
          links: [
            playlist('PLuYctAHjg89ZkhgOQo0zcTtmHY5nuRYud', 'Curso Lambda, Streams e Optional do Java 8 (playlist)'),
          ],
        },
        {
          title: 'Persistência: JPA e Hibernate',
          sections: {
            Estudar: ['O que é ORM, JPA e Hibernate', 'Entidades, relacionamentos e chaves', 'JPQL e consultas', 'O problema N+1 e carregamento lazy'],
            Fazer: ['Mapear 3 tabelas relacionadas e consultar com JPQL'],
          },
          links: [
            yt('xBdulbfguuE', 'JPA? Hibernate? ORM? - aula 01'),
            yt('398Ul6wq5U4', 'JPA com Hibernate - #01 - Introdução'),
            yt('vtR3WAbC6IA', 'JAVA com JPA #1 - Criando do zero projeto JPA com Hibernate'),
          ],
        },
      ],
    },
    {
      title: 'Spring Boot',
      subtitle: 'APIs REST em Java',
      topics: [
        {
          title: 'Spring Boot: primeira API REST',
          sections: {
            Estudar: [
              'Spring Initializr e a estrutura de um projeto',
              'Controller, Service e Repository',
              'Injeção de dependência',
              'Verbos HTTP e códigos de status',
              'DTOs e validação',
            ],
            Fazer: ['Criar uma API de CRUD do zero', 'Documentar os endpoints e testar com Postman ou Insomnia'],
          },
          links: [
            yt('zu2z4F0g91Y', 'Curso Spring Boot na prática: crie sua primeira API REST com Java - parte 01'),
            yt('9GWK9A79tEc', 'Como criar uma REST API com Spring Boot (tutorial passo a passo)'),
            yt('MuF_jkfdqUo', 'Criando API do zero com Java Spring + deploy VPS'),
            link('Spring Initializr', 'https://start.spring.io/'),
            link('Spring: guia "Building a RESTful Web Service" (EN)', 'https://spring.io/guides/gs/rest-service'),
            link('Spring Boot: documentação de referência (EN)', 'https://docs.spring.io/spring-boot/index.html'),
          ],
        },
        {
          title: 'Spring Data JPA e banco de dados',
          sections: {
            Estudar: ['Repositórios com Spring Data JPA', 'Consultas derivadas do nome do método', 'Migrações com Flyway ou Liquibase', 'Transações com @Transactional'],
            Fazer: ['Ligar a API de CRUD a um Postgres rodando em Docker'],
          },
          links: [link('Spring: guia "Accessing Data with JPA" (EN)', 'https://spring.io/guides/gs/accessing-data-jpa')],
        },
        {
          title: 'Spring Security e testes',
          sections: {
            Estudar: ['Autenticação vs autorização', 'JWT', 'Testes unitários com JUnit e Mockito', 'Testes de API com MockMvc'],
            Fazer: ['Proteger a API com login e um endpoint restrito', 'Escrever testes para o service principal'],
          },
          links: [
            link('Spring: guia "Securing a Web Application" (EN)', 'https://spring.io/guides/gs/securing-web'),
          ],
        },
      ],
    },
    {
      title: 'Angular',
      subtitle: 'O frontend',
      topics: [
        {
          title: 'Angular: fundamentos',
          sections: {
            Estudar: [
              'TypeScript essencial',
              'Componentes, templates e data binding',
              'Diretivas e controle de fluxo',
              'Services e injeção de dependência',
              'Roteamento',
              'Formulários reativos',
            ],
            Fazer: ['Fazer o tutorial oficial "Learn Angular"', 'Montar uma lista de tarefas com rotas e formulário'],
          },
          links: [
            link('Angular: tutorial oficial "Learn Angular" (EN)', 'https://angular.dev/tutorials/learn-angular'),
            yt('F22_BLpdSCM', 'Domine os componentes de Angular: estrutura, reutilização e boas práticas'),
            playlist('PLnDvRpP8Bnex2GQEN0768_AxZg_RaIGmw', 'Curso de Angular - Matheus Battisti (playlist)'),
            link('Loiane Training: cursos e materiais', 'https://loiane.training/'),
            link('roadmap.sh: trilha de Angular (EN)', 'https://roadmap.sh/angular'),
          ],
        },
        {
          title: 'RxJS e estado no Angular',
          sections: {
            Estudar: ['Observable, Subscription e operadores', 'HttpClient e tratamento de erros', 'async pipe', 'Signals'],
            Fazer: ['Consumir uma API REST com HttpClient e exibir em tela'],
          },
          links: [link('Angular: guia de Signals (EN)', 'https://angular.dev/guide/signals')],
        },
        {
          title: 'Angular + Spring Boot: o sistema completo',
          summary: 'Juntar frontend e backend: o que o trabalho pede no dia a dia.',
          sections: {
            Estudar: ['CORS', 'Autenticação ponta a ponta', 'Contratos de API (DTOs e erros padronizados)'],
            Fazer: ['Ligar o frontend Angular à API Spring Boot criada acima'],
          },
          links: [playlist('PLGxZ4Rq3BOBpwaVgAPxTxhdX_TfSVlTcY', 'CRUD Angular + Spring - Loiane Groner (playlist)')],
        },
      ],
    },
    {
      title: 'Dia a dia de quem trabalha com tecnologia',
      subtitle: 'Rotina, siglas e boas práticas do time',
      topics: [
        {
          title: 'Rotina de um time de desenvolvimento',
          sections: {
            Estudar: ['Como é um dia típico: daily, desenvolvimento, code review, deploy', 'Como pedir ajuda sem travar o time', 'Como estimar e dar status sem enrolar'],
            Fazer: ['Anotar por uma semana onde meu tempo realmente vai'],
          },
          links: [
            playlist('PLIIX-IKjIiwOK6qq3ZARQgaD6UtfNe1W-', 'Rotina Desenvolvedora - dia a dia de programador (playlist)'),
            playlist('PLzdD8HJUOktL7Y0H11f0WkPttZ9o_0cAf', 'Rotina de um desenvolvedor de software (playlist)'),
          ],
        },
        {
          title: 'Code review e pull requests',
          sections: {
            Estudar: ['Como abrir um PR pequeno e claro', 'O que olhar ao revisar o código de alguém', 'Como receber feedback sem tomar para o lado pessoal'],
            Fazer: ['Revisar 3 pull requests do time e deixar pelo menos um comentário útil em cada'],
          },
          links: [
            yt('jq4AxdaCID0', 'Como fazer um bom CODE REVIEW'),
            yt('thtAHpgYVg8', 'Git - Pull requests, code review e contribuição em projetos públicos'),
          ],
        },
        {
          title: 'Vocabulário e siglas da tecnologia',
          summary: 'Para entender a conversa da reunião sem precisar pausar para perguntar.',
          sections: {
            Estudar: ['Ler os termos abaixo até reconhecer todos', 'Assistir à série "Dicionário do Programador"'],
            Fazer: ['Anotar toda sigla desconhecida que ouvir no trabalho e pesquisar no mesmo dia'],
          },
          links: [
            playlist('PLVc5bWuiFQ8GgKm5m0cZE6E02amJho94o', 'Dicionário do Programador (playlist)'),
            yt('-I6ojXKTdSA', 'O que é CI/CD?'),
          ],
          terms: [
            ['PR / MR', 'Pull request (GitHub) ou merge request (GitLab): pedido para incorporar uma branch na principal, com revisão.'],
            ['Merge', 'Juntar o código de uma branch em outra.'],
            ['Rebase', 'Reescrever o histórico de uma branch para ela partir da ponta mais recente de outra.'],
            ['Deploy', 'Colocar uma versão do sistema no ar, em algum ambiente.'],
            ['Staging / homologação', 'Ambiente parecido com a produção, usado para testar antes de publicar.'],
            ['Produção (prod)', 'O ambiente real, usado pelos clientes.'],
            ['Hotfix', 'Correção urgente aplicada direto para resolver um problema em produção.'],
            ['Rollback', 'Voltar para a versão anterior quando uma publicação dá errado.'],
            ['Backlog', 'Lista de trabalho pendente, ordenada por prioridade.'],
            ['Épico', 'Item grande do backlog, que se divide em várias histórias.'],
            ['Definition of Done', 'Combinado do time sobre o que precisa estar pronto para um item contar como concluído.'],
            ['Feature flag', 'Chave que liga ou desliga uma funcionalidade sem precisar publicar de novo.'],
            ['CI/CD', 'Automação que compila, testa e publica o código a cada mudança.'],
            ['Débito técnico', 'Atalhos no código que aceleram hoje e cobram juros depois, em forma de manutenção mais cara.'],
            ['Refatoração', 'Melhorar a estrutura do código sem mudar o que ele faz.'],
            ['SLA', 'Compromisso de prazo ou disponibilidade, como "resposta em até 4 horas".'],
          ],
        },
        {
          title: 'Carreira em tecnologia',
          sections: { Estudar: ['Assistir ao vídeo de carreira com o Fabio Akita', 'Definir onde quero estar em 12 meses'], Fazer: ['Escrever meu plano de carreira em meia página'] },
          links: [
            yt('KOb_sWwqvUw', 'Ainda vale a pena ser um programador hoje em dia? (entrevista com Fabio Akita)'),
            link('Canal do Fabio Akita (Akitando)', 'https://www.youtube.com/channel/UCib793mnUOhWymCh2VJKplQ'),
          ],
        },
      ],
    },
  ],
}
