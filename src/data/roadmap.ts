// Importado de roadmap.pdf (Roadmap de Engenharia de Dados + IA, out/2026 a dez/2027).
// Depois de importado, o conteúdo vive no banco e é editado pelo app; este arquivo só alimenta a primeira carga.

export interface SeedTopic {
  title: string
  badge?: string
  summary: string
  estudar?: string[]
  fazer?: string[]
  entregas?: string[]
  flow?: string
  termos?: [string, string][]
}

export interface SeedTier {
  title: string
  subtitle: string
  description: string
  criteria: string
  topics: SeedTopic[]
}

export const roadmapIntro = [
  {
    title: 'Um conceito novo por projeto',
    text: 'Se o projeto tem três ferramentas que você nunca usou, ele vai te perder. Troque uma delas por algo que você já domina.',
  },
  {
    title: 'A IA destrava, você pensa',
    text: 'Deixe a IA gerar código de apoio e explicar erros. As queries e a lógica do pipeline você escreve com as próprias mãos.',
  },
  {
    title: 'Só avança com o critério de saída',
    text: 'Cada tier tem um critério no fim. Não cumpriu, não passa para o próximo, mesmo que o calendário diga que sim.',
  },
  {
    title: 'Ritmo realista',
    text: 'Sábado: 3h de projeto. Domingo: 2h de estudo. Dias úteis: 20 min de exercício de SQL no almoço. Cerca de 6 a 7h por semana; os prazos foram calculados com isso.',
  },
]

export const roadmap: SeedTier[] = [
  {
    title: 'Bronze: fundação',
    subtitle: 'Out/2026 a jan/2027 (meses 1 a 4)',
    description:
      'Escrever SQL de verdade e levar dados de uma API até um banco com Python, entendendo cada etapa sem depender da IA.',
    criteria: 'Você termina o P1 e consegue explicar cada linha dele em voz alta.',
    topics: [
      {
        title: 'SQL avançado',
        badge: 'Prioridade máxima',
        summary:
          'É o que mais cai em entrevista e você já usa no trabalho. A IA escreve a query, mas quem descobre por que ela está lenta é você.',
        estudar: [
          'JOINs e GROUP BY sem hesitar',
          'Subquery e CTE (WITH)',
          'CASE WHEN e UNION',
          'Window functions: ROW_NUMBER, RANK, LAG/LEAD, SUM OVER',
          'Índices: quando ajudam e quando atrapalham',
          'EXPLAIN ANALYZE: ler um query plan',
          'Transações e ACID',
          'PK, FK e normalização (1FN a 3FN)',
        ],
        fazer: [
          'Resolver 40 exercícios intermediários e avançados (LeetCode SQL 50 ou StrataScratch)',
          'Analisar 3 queries lentas do trabalho com EXPLAIN ANALYZE',
          'Reescrever uma query do trabalho trocando subquery por window function',
          'Aprender o básico de PostGIS: ST_Intersects, ST_Buffer e índice GIST',
        ],
        termos: [
          ['CTE', 'Uma subquery com nome, declarada com WITH, que deixa a query legível.'],
          [
            'Window function',
            'Cálculo sobre um grupo de linhas sem juntar o resultado numa linha só. Ex.: ranking por categoria.',
          ],
          ['Query plan', 'O roteiro que o banco monta para executar sua query. Mostra onde ele gasta tempo.'],
          ['ACID', 'Garantias de uma transação: tudo ou nada, consistência, isolamento e durabilidade.'],
          ['GIST', 'Tipo de índice usado para dados espaciais no PostGIS.'],
        ],
      },
      {
        title: 'Python para dados',
        summary: 'É a cola de todo pipeline. Não precisa ser avançado, precisa ser sólido.',
        estudar: [
          'Tipos, funções, list e dict comprehension',
          'Ler e escrever JSON e CSV',
          'requests: chamar API, paginação, erros HTTP',
          'pandas básico: ler, filtrar, juntar',
          'venv e requirements.txt',
          'try/except e logging',
          'Conectar no Postgres com psycopg ou SQLAlchemy',
        ],
        fazer: [
          'Script que chama uma API pública e salva o JSON bruto em disco',
          'Script que lê esse JSON, limpa e insere no Postgres',
          'Trocar todos os print() por logging',
        ],
        termos: [
          ['venv', 'Ambiente isolado com as bibliotecas de um projeto, para não misturar versões entre projetos.'],
          ['Paginação', 'Quando a API devolve os dados em páginas e você pede uma de cada vez.'],
          ['Logging', 'Registro do que o programa fez, com nível (INFO, ERROR) e horário.'],
        ],
      },
      {
        title: 'Git e GitHub',
        summary: 'Todo projeto seu vai para o GitHub. É o seu portfólio.',
        estudar: [
          'commit, branch, merge e pull request',
          '.gitignore: nunca subir senha nem .env',
          'Resolver conflito de merge',
          'Escrever um bom README',
        ],
        fazer: ['Criar o repositório do P1 com README desde o primeiro dia', 'Trabalhar em branch e abrir PR para você mesmo'],
        termos: [
          ['Pull request (PR)', 'Pedido para juntar uma branch na principal. É onde acontece a revisão de código.'],
          ['.env', 'Arquivo com senhas e configurações que fica fora do Git.'],
        ],
      },
      {
        title: 'Linux básico',
        summary: 'Servidores, Docker e cloud rodam Linux. O básico basta.',
        estudar: [
          'cd, ls, cp, mv, rm, cat, grep, chmod',
          'Variáveis de ambiente',
          'Ler logs com tail -f e grep',
          'Rodar scripts pelo terminal, sem IDE',
        ],
        fazer: ['Instalar WSL2 (se usa Windows) e rodar o P1 inteiro pelo terminal'],
        termos: [
          ['WSL2', 'Linux rodando dentro do Windows.'],
          ['Variável de ambiente', 'Configuração que o programa lê do sistema. Usada para guardar senhas fora do código.'],
        ],
      },
      {
        title: 'Conceitos de ETL/ELT',
        summary: 'É o que diferencia um script de um pipeline. Cai muito em entrevista.',
        estudar: ['ETL vs ELT', 'Camadas raw, silver e gold', 'Carga full vs incremental', 'Idempotência', 'Retries', 'Deduplicação'],
        fazer: ['Rodar o P1 duas vezes seguidas sem duplicar nenhuma linha', 'Implementar carga incremental: buscar só o que é novo'],
        termos: [
          ['ETL', 'Extrai, transforma e só depois carrega.'],
          ['ELT', 'Carrega o dado bruto e transforma dentro do banco. É o padrão moderno.'],
          ['Idempotência', 'Rodar de novo dá o mesmo resultado, sem duplicar.'],
          ['Incremental', 'Processar só o que mudou desde a última execução.'],
          ['Raw, silver, gold', 'Dado bruto, dado limpo e dado pronto para o negócio.'],
        ],
      },
      {
        title: 'Docker básico',
        summary: 'Faz seu projeto rodar igual em qualquer máquina, inclusive na do recrutador.',
        estudar: ['Imagem vs container', 'Dockerfile', 'docker compose', 'Volumes'],
        fazer: ['Subir o Postgres do P1 com docker compose'],
        termos: [
          ['Imagem', 'A receita congelada de um ambiente.'],
          ['Container', 'A imagem rodando.'],
          ['docker compose', 'Arquivo que sobe vários containers juntos, como banco e aplicação.'],
        ],
      },
      {
        title: 'P1: API, Python, Postgres e dashboard',
        badge: 'Projeto',
        flow: 'API › Python › Postgres › Metabase',
        summary:
          'Pegue uma API pública (sugestão: IBGE ou dados abertos do Paraná), salve o bruto, trate com Python e carregue no Postgres. Monte um dashboard simples no Metabase.',
        entregas: [
          'Repositório no GitHub com README e diagrama',
          'Sobe tudo com docker compose up',
          'Idempotente: rodar duas vezes não duplica',
          'Carga incremental funcionando',
          'Dashboard respondendo 3 perguntas de negócio',
        ],
      },
    ],
  },
  {
    title: 'Prata: pipeline profissional',
    subtitle: 'Fev a jun/2027 (meses 5 a 9)',
    description: 'Construir um pipeline do jeito que uma empresa constrói: orquestrado, modelado e testado.',
    criteria: 'O P2 roda agendado, com testes, e você explica por que modelou as tabelas daquele jeito.',
    topics: [
      {
        title: 'Modelagem dimensional',
        badge: 'Faltava no roadmap original',
        summary:
          'É como todo data warehouse organiza dados para análise. O roadmap do vídeo esqueceu, e é uma falha grave.',
        estudar: [
          'OLTP vs OLAP',
          'Tabela fato e tabela dimensão',
          'Star schema',
          'Granularidade',
          'SCD tipo 1 e tipo 2',
          'Livro The Data Warehouse Toolkit (Kimball), capítulos 1 a 3',
        ],
        fazer: ['Desenhar o star schema do P2 antes de escrever qualquer código', 'Modelar uma fato e três dimensões'],
        termos: [
          ['OLTP', 'Banco do dia a dia do sistema: muitas escritas pequenas.'],
          ['OLAP', 'Banco para análise: leituras grandes.'],
          ['Fato', 'Tabela de eventos com números, como vendas ou medições.'],
          ['Dimensão', 'O contexto do fato: quem, onde, quando.'],
          ['Granularidade', 'O que exatamente uma linha da tabela fato representa.'],
          ['SCD', 'Técnica para guardar histórico quando uma dimensão muda.'],
        ],
      },
      {
        title: 'dbt',
        badge: 'Muito pedido para júnior',
        summary: 'Virou padrão de mercado na etapa de transformação, o T do ELT.',
        estudar: [
          'models, ref() e sources',
          'Materializações: view, table e incremental',
          'Testes: not_null, unique, relationships',
          'Documentação e lineage com dbt docs',
        ],
        fazer: ['Montar as camadas staging, intermediate e marts no P2', 'Escrever pelo menos um teste por model'],
        termos: [
          ['Model', 'Um SELECT salvo em arquivo que o dbt transforma em tabela ou view.'],
          ['Materialização', 'Como o dbt grava o resultado: view, tabela ou incremental.'],
          ['Lineage', 'O mapa de onde cada dado veio e para onde vai.'],
        ],
      },
      {
        title: 'Orquestração com Airflow',
        summary: 'É a ferramenta mais pedida em vaga. Aprenda uma; Dagster e Prefect usam os mesmos conceitos.',
        estudar: ['DAG, task e operator', 'Scheduler e agendamento com cron', 'Dependências entre tasks', 'Retries e alertas de falha', 'Backfill'],
        fazer: ['Orquestrar o P2 inteiro em uma DAG', 'Fazer um backfill de 30 dias'],
        termos: [
          ['DAG', 'O fluxo do pipeline em forma de grafo, sem ciclos.'],
          ['Task', 'Uma etapa da DAG.'],
          ['Operator', 'O tipo de tarefa: rodar Python, rodar SQL, etc.'],
          ['Backfill', 'Rodar o pipeline para datas passadas.'],
          ['Cron', 'Formato para agendar horários, como todo dia às 6h.'],
        ],
      },
      {
        title: 'Qualidade de dados',
        summary: 'Pipeline que roda não é pipeline certo. Quem contrata valoriza muito isso.',
        estudar: [
          'Checagens de null, unique, schema, volume e freshness',
          'Testes do dbt a fundo',
          'Noções de Great Expectations ou Soda',
        ],
        fazer: [
          'Criar alerta de volume: se chegar menos de 50% do normal, o pipeline falha',
          'Adicionar teste de freshness nas sources',
        ],
        termos: [
          ['Freshness', 'O dado está atualizado?'],
          ['Volume check', 'Chegou a quantidade esperada de linhas?'],
          ['Schema', 'A estrutura de colunas e tipos de uma tabela.'],
        ],
      },
      {
        title: 'Uma cloud',
        summary: 'Quase toda vaga pede. Escolha só uma e vá fundo.',
        estudar: [
          'Regra: se a sua empresa usa alguma cloud, estude essa. Se não usa, AWS',
          'S3: armazenamento',
          'IAM: permissões',
          'Lambda ou Glue: processamento',
          'Custos: como não levar susto na fatura',
        ],
        fazer: [
          'Configurar alerta de orçamento antes de qualquer outra coisa',
          'Mover a camada raw do P2 para o S3',
          'Opcional: certificação AWS Cloud Practitioner',
        ],
        termos: [
          ['Storage', 'Onde os arquivos ficam guardados.'],
          ['Compute', 'Onde o processamento roda.'],
          ['IAM', 'Quem pode acessar o quê.'],
          ['Free tier', 'Uso gratuito limitado, para aprender.'],
        ],
      },
      {
        title: 'P2: pipeline completo com Airflow e dbt',
        badge: 'Projeto',
        flow: 'API › Data lake › Airflow › dbt › Warehouse › BI',
        summary:
          'Versão enxuta do P2 do vídeo, sem Spark. Roda local com Docker: Airflow, Postgres ou DuckDB e Metabase. A camada raw fica no S3 ou no MinIO (um S3 que roda no seu computador).',
        entregas: [
          'DAG agendada rodando sozinha',
          'Star schema documentado',
          'Testes dbt passando',
          'Alerta de qualidade funcionando',
          'README com arquitetura e o porquê de cada decisão',
        ],
      },
    ],
  },
  {
    title: 'Ouro: escala e IA',
    subtitle: 'Jul a dez/2027 (meses 10 a 15)',
    description: 'Entender processamento em escala e construir a ponte entre engenharia de dados e IA.',
    criteria: 'O P3 funciona e você explica o que é shuffle e como funciona um pipeline de RAG.',
    topics: [
      {
        title: 'Spark (conceitos) e alternativas leves',
        summary: 'Aparece em vaga, mas o júnior precisa dos conceitos, não de um cluster gigante.',
        estudar: [
          'Quando usar Spark e quando Python puro resolve',
          'DataFrame, transformations e actions',
          'Lazy evaluation',
          'Partições e shuffle',
          'Spark SQL e PySpark',
          'DuckDB e Polars para dados médios',
        ],
        fazer: ['Reescrever uma transformação do P2 em PySpark e comparar com DuckDB', 'Encontrar um shuffle no Spark UI'],
        termos: [
          ['Lazy evaluation', 'O Spark só executa quando você pede um resultado.'],
          ['Shuffle', 'Redistribuir dados entre máquinas. É caro e é o gargalo mais comum.'],
          ['Partição', 'Pedaço dos dados processado em paralelo.'],
          ['DuckDB', 'Banco analítico que roda dentro do Python, sem servidor.'],
        ],
      },
      {
        title: 'Lakehouse',
        summary: 'Arquitetura que está virando padrão em Databricks, Fabric e Snowflake.',
        estudar: [
          'Lake vs warehouse vs lakehouse',
          'Formato Parquet',
          'Delta Lake e Iceberg',
          'Camadas bronze, silver e gold',
          'Schema evolution e time travel',
        ],
        fazer: ['Salvar as camadas do P2 em Parquet e depois em Delta'],
        termos: [
          ['Parquet', 'Formato de arquivo colunar, compacto e rápido para análise.'],
          [
            'Table format',
            'Delta e Iceberg: camada sobre arquivos que dá cara de tabela, com transações e histórico.',
          ],
          ['Schema evolution', 'Mudar colunas sem quebrar o que já existe.'],
          ['Time travel', 'Consultar a tabela como ela estava numa data passada.'],
        ],
      },
      {
        title: 'Engenharia de dados para IA',
        badge: 'Seu diferencial',
        summary: 'É a ponte entre as suas duas áreas e um diferencial forte de currículo.',
        estudar: [
          'O que são embeddings',
          'Bancos vetoriais e pgvector',
          'Chunking de documentos',
          'Pipeline de RAG: ingestão, chunking, embedding, indexação e busca',
          'Dados não estruturados: PDF e texto',
        ],
        fazer: ['Instalar pgvector no Postgres do P1', 'Indexar um conjunto de documentos e fazer busca semântica'],
        termos: [
          ['Embedding', 'Vetor de números que representa o significado de um texto.'],
          ['Banco vetorial', 'Banco que busca por significado parecido, não por palavra igual.'],
          ['Chunking', 'Quebrar documentos em pedaços menores antes de indexar.'],
          ['RAG', 'Técnica em que a IA consulta seus documentos antes de responder.'],
        ],
      },
      {
        title: 'P3: pipeline de dados para IA',
        badge: 'Projeto',
        flow: 'Documentos › Chunking › Embeddings › pgvector › Busca/chat',
        summary:
          'Substitui o P3 de streaming do vídeo. Sugestão de base: documentos públicos da Igreja no site do Vaticano, ou documentação técnica que você usa no trabalho (sem dados sigilosos).',
        entregas: [
          'Pipeline orquestrado no Airflow',
          'Incremental: só processa documentos novos',
          'Avaliação simples: 10 perguntas com resposta esperada',
          'README explicando as decisões de chunking',
        ],
      },
    ],
  },
  {
    title: 'Depois: após o primeiro emprego',
    subtitle: 'Quando o trabalho pedir',
    description:
      'Aprofundar no que a sua vaga usar de verdade. Estudar isso antes é gastar tempo que falta para o Tier 1.',
    criteria: 'Não tem. Aqui você estuda sob demanda.',
    topics: [
      {
        title: 'Streaming',
        summary: 'Pouquíssima vaga júnior exige na prática.',
        estudar: ['Kafka: producer, consumer, topic, partition, offset', 'Spark Structured Streaming', 'Flink'],
        fazer: ['Por enquanto: saber explicar batch vs streaming em duas frases'],
        termos: [
          ['Batch', 'Acumula os dados e processa de tempos em tempos.'],
          ['Streaming', 'Processa cada evento assim que ele chega.'],
          ['Kafka', 'Sistema que recebe e distribui fluxos de eventos.'],
        ],
      },
      {
        title: 'Infraestrutura e CI/CD avançado',
        summary: 'Útil no dia a dia de times maduros, não é pré-requisito para entrar.',
        estudar: ['Terraform (infraestrutura como código)', 'Pipelines de CI/CD completos', 'Kubernetes (noções)'],
        fazer: ['Por enquanto: um GitHub Actions rodando os testes do P2'],
        termos: [
          ['CI/CD', 'Automação que testa e publica o código a cada mudança.'],
          ['Infraestrutura como código', 'Criar servidores e serviços de cloud a partir de arquivos, não de cliques.'],
        ],
      },
      {
        title: 'Segunda cloud e observabilidade avançada',
        summary: 'Quem domina uma cloud aprende a segunda rápido.',
        estudar: ['Segunda cloud (Azure ou GCP)', 'Lineage em nível de coluna', 'SLAs de dados e métricas de pipeline'],
        termos: [['SLA', 'Compromisso de prazo e qualidade, como: dado pronto até as 8h.']],
      },
    ],
  },
]
