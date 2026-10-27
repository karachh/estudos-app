import { link, playlist, yt, type ModuleContent } from './helpers.ts'

// Materiais para os tópicos do roadmap. Português primeiro; (EN) marca conteúdo em inglês, escolhido
// por ser didático. Os títulos de tópico e de etapa precisam bater com os do roadmap importado.
export const profissional: ModuleContent = {
  moduleId: 'profissional',
  groups: [
    {
      title: 'Bronze: fundação',
      topics: [
        {
          title: 'SQL avançado',
          links: [
            yt('v3U5ViG-rkc', '[SQL] Ep #06 - O que são WINDOW FUNCTIONS?'),
            yt('MzxIhnIaXuY', 'Windows Functions - o que são e como funcionam?'),
            yt('LJC8277LONg', 'SQL WITH Clause (CTE)'),
            yt('6RU6T8HKgYA', 'SQL Subquery vs CTE vs Views vs CTAS vs TEMP'),
            yt('o666k19mZwE', '(EN) SQL Window Functions Basics (Visually Explained)'),
            yt('GmX8tjT7UcQ', '(EN) Understanding Explain and Explain Analyze in PostgreSQL'),
            yt('31EmOKBP1PY', '(EN) A beginners guide to EXPLAIN ANALYZE'),
            link('Documentação PostgreSQL: consultas WITH (CTE)', 'https://www.postgresql.org/docs/current/queries-with.html'),
            link('Documentação PostgreSQL: tutorial de window functions', 'https://www.postgresql.org/docs/current/tutorial-window.html'),
            link('Documentação PostgreSQL: usando EXPLAIN', 'https://www.postgresql.org/docs/current/using-explain.html'),
            link('Use The Index, Luke: índices em SQL', 'https://use-the-index-luke.com/'),
            link('PostgreSQL Exercises: exercícios práticos', 'https://pgexercises.com/'),
            link('LeetCode: SQL 50', 'https://leetcode.com/studyplan/top-sql-50/'),
            link('StrataScratch: exercícios de entrevista', 'https://www.stratascratch.com/'),
            link('PostGIS: documentação', 'https://postgis.net/documentation/'),
            link('PostGIS: workshop de introdução', 'https://postgis.net/workshops/postgis-intro/'),
          ],
        },
        {
          title: 'Python para dados',
          links: [
            yt('TMfMkgLkeBQ', 'Tudo de Pandas para Python'),
            yt('6vpDSD1wchA', 'Curso rápido completo de Pandas - Parte 1'),
            yt('SKlF2PmIkrU', 'Consumindo API com Python e consultando endereço pelo CEP'),
            link('Tutorial oficial de Python (português)', 'https://docs.python.org/pt-br/3/tutorial/'),
            link('pandas: 10 minutos para o pandas', 'https://pandas.pydata.org/docs/user_guide/10min.html'),
            link('requests: documentação', 'https://requests.readthedocs.io/'),
            link('Python: guia de logging (português)', 'https://docs.python.org/pt-br/3/howto/logging.html'),
            link('SQLAlchemy: tutorial', 'https://docs.sqlalchemy.org/en/20/tutorial/'),
            link('psycopg 3: uso básico', 'https://www.psycopg.org/psycopg3/docs/basic/index.html'),
          ],
        },
        {
          title: 'Git e GitHub',
          links: [
            yt('Yp0RRTdtkqY', 'Curso de Git & GitHub Para Completos Iniciantes'),
            playlist('PLvBI9y9HTA1q4cXgdMC0iPlw9BlJ9fxcf', 'Git e Github para iniciantes 2025 (playlist)'),
            yt('jq4AxdaCID0', 'Como fazer um bom CODE REVIEW'),
            yt('thtAHpgYVg8', 'Git - Pull requests, code review e contribuição em projetos públicos'),
            link('Pro Git (livro oficial, português)', 'https://git-scm.com/book/pt-br/v2'),
            link('Learn Git Branching: prática visual', 'https://learngitbranching.js.org/?locale=pt_BR'),
            link('GitHub Skills: cursos práticos', 'https://skills.github.com/'),
            link('GitHub Docs: pull requests', 'https://docs.github.com/pt/pull-requests'),
          ],
        },
        {
          title: 'Linux básico',
          links: [
            yt('xbLJWmmZXBc', 'Instalação do WSL e comandos básicos do terminal Linux'),
            yt('CnYraL0J_hM', 'Comandos Básicos do Linux'),
            yt('TVp4g6y-M34', 'Comandos Básicos de Linux - Aula #1 Para Iniciantes'),
            link('Microsoft: instalar o WSL', 'https://learn.microsoft.com/pt-br/windows/wsl/install'),
            link('Linux Journey (EN): trilha gratuita', 'https://linuxjourney.com/'),
          ],
        },
        {
          title: 'Conceitos de ETL/ELT',
          links: [
            yt('cYH73bq6tZU', 'Introdução à Engenharia de Dados - Pipeline ETL/ELT'),
            yt('AEcShkVNoUY', 'Pipeline vs ETL vs ELT: qual é a diferença real?'),
            yt('_ke3qwjgmQI', 'ETL vs ELT: qual a melhor abordagem para Engenharia de Dados?'),
            yt('ANkrrduTtu0', 'O que é ETL?'),
          ],
        },
        {
          title: 'Docker básico',
          links: [
            playlist('PLNCSWIsR6ADKRq-XBvAcRd4XtqLj3f_mf', 'Curso Docker + Docker Compose (playlist)'),
            yt('0xxHiOSJVe8', '[LINUXtips] Curso de Docker completo e grátis'),
            playlist('PL18bbNo7xuh84zAeNjNejyzd1GASt8Q9x', 'Docker para Iniciantes: minicurso gratuito (playlist)'),
            yt('my0XrCckork', 'Dockerfile Descomplicado'),
            link('Docker: primeiros passos (oficial)', 'https://docs.docker.com/get-started/'),
            link('Docker Compose: primeiros passos', 'https://docs.docker.com/compose/gettingstarted/'),
          ],
        },
        {
          title: 'P1: API, Python, Postgres e dashboard',
          links: [
            link('APIs de dados do IBGE', 'https://servicodados.ibge.gov.br/api/docs'),
            yt('ZPEIlIZvj1g', 'Introdução e Instalação do Metabase'),
            yt('TyiUwoI5I-0', 'Curso Metabase - Aula 11: criando dashboard (parte 2)'),
            yt('HSIZPK4kdIw', 'Conheça o Metabase'),
            link('Metabase: aprenda (guias oficiais)', 'https://www.metabase.com/learn/'),
            link('Metabase: rodando com Docker', 'https://www.metabase.com/docs/latest/installation-and-operation/running-metabase-on-docker'),
          ],
        },
      ],
    },
    {
      title: 'Prata: pipeline profissional',
      topics: [
        {
          title: 'Modelagem dimensional',
          links: [
            yt('6VaX68aAztg', 'Introdução à Modelagem Dimensional de Dados'),
            yt('uAxEtj2uobk', '[Power BI] Criando tabelas FATO e DIMENSÃO (Star Schema)'),
            yt('0p4EpAsSAno', '(EN) SCD Type 2 Explained'),
            link('Kimball: técnicas de modelagem dimensional (EN)', 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/'),
          ],
        },
        {
          title: 'dbt',
          links: [
            yt('FjQvONjoBfc', 'Você conhece dbt? Vamos falar sobre "Data Build Tool"'),
            yt('ZPYmgt4zE7M', 'Primeiros passos com DBT'),
            yt('uYRVKk6CfKo', 'Criando nosso primeiro projeto DBT'),
            yt('5GZBn1dIsQA', 'Tutorial: como garantir Data Quality com dbt'),
            link('dbt: documentação (introdução)', 'https://docs.getdbt.com/docs/introduction'),
            link('dbt Learn: curso gratuito dbt Fundamentals (EN)', 'https://learn.getdbt.com/'),
          ],
        },
        {
          title: 'Orquestração com Airflow',
          links: [
            yt('IYPJcikYUNc', 'Fundamentos de Apache Airflow'),
            yt('qiGLGU-VY0s', 'Como criar uma DAG no Airflow?'),
            yt('rTBwHWMrmQw', 'Aula 01 - Airflow: instalando com Docker e carregando sua primeira DAG'),
            yt('EOR55_GwBdc', 'Engenharia de Dados com Airflow'),
            link('Airflow: tutorial oficial (fundamentos)', 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/fundamentals.html'),
            link('Astronomer Academy: cursos gratuitos de Airflow (EN)', 'https://academy.astronomer.io/'),
          ],
        },
        {
          title: 'Qualidade de dados',
          links: [
            yt('bj_VazLdRiM', 'Great Expectations e a conformidade dos dados'),
            yt('5GZBn1dIsQA', 'Tutorial: como garantir Data Quality com dbt'),
            yt('F3yvXqzkDhU', '(EN) Great Expectations (GX) for Data Testing - Introduction'),
            link('dbt: testes de dados', 'https://docs.getdbt.com/docs/build/data-tests'),
            link('Great Expectations: documentação', 'https://docs.greatexpectations.io/'),
            link('Soda: documentação', 'https://docs.soda.io/'),
          ],
        },
        {
          title: 'Uma cloud',
          links: [
            playlist('PL6zAoCQx46xVuPBM4AZgGN7VLvnTMZeAh', 'Curso AWS - Cloud Practitioner (playlist)'),
            yt('bGZXVslod5E', 'Curso: AWS Cloud Practitioner - parte 1/3'),
            yt('RCK9fBwrZeY', 'Aprenda AWS Lambda neste curso prático gratuito'),
            yt('j6yImUbs4OA', 'Curso gratuito Amazon Web Services na Prática - Aula 01'),
            link('AWS: nível gratuito', 'https://aws.amazon.com/pt/free/'),
            link('AWS Budgets: alerta de orçamento', 'https://aws.amazon.com/pt/aws-cost-management/aws-budgets/'),
            link('AWS Skill Builder: treinamentos gratuitos', 'https://explore.skillbuilder.aws/'),
            link('Certificação AWS Cloud Practitioner', 'https://aws.amazon.com/pt/certification/certified-cloud-practitioner/'),
          ],
        },
        {
          title: 'P2: pipeline completo com Airflow e dbt',
          links: [
            link('Airflow com Docker Compose (guia oficial)', 'https://airflow.apache.org/docs/apache-airflow/stable/howto/docker-compose/index.html'),
            link('DuckDB: documentação', 'https://duckdb.org/docs/'),
            link('MinIO: documentação (S3 local)', 'https://min.io/docs/minio/linux/index.html'),
          ],
        },
      ],
    },
    {
      title: 'Ouro: escala e IA',
      topics: [
        {
          title: 'Spark (conceitos) e alternativas leves',
          links: [
            yt('8GxOhBB6-N0', 'PySpark Para Humanos'),
            yt('pOs27Vea10Y', '(EN) Apache Spark Shuffle: when it happens and why it is so expensive'),
            yt('8x6h0pe6mQc', '(EN) Secret Behind Spark Shuffle'),
            link('Spark SQL: guia oficial (EN)', 'https://spark.apache.org/docs/latest/sql-programming-guide.html'),
            link('DuckDB: documentação', 'https://duckdb.org/docs/'),
            link('Polars: documentação', 'https://docs.pola.rs/'),
          ],
        },
        {
          title: 'Lakehouse',
          links: [
            yt('tnnVbpaHoI8', 'Deep Dive de Apache Iceberg como Formato para Data Lakehouse'),
            yt('jonw_1A5IZ4', '(EN) Apache Iceberg vs Delta Lake vs Apache Hudi'),
            link('Delta Lake', 'https://delta.io/'),
            link('Apache Iceberg', 'https://iceberg.apache.org/'),
            link('Apache Parquet', 'https://parquet.apache.org/'),
          ],
        },
        {
          title: 'Engenharia de dados para IA',
          links: [
            yt('9iGvXxH_fdE', '(EN) RAG Tutorial: Vector Embeddings and RAG Architecture Explained'),
            yt('tTW3dOfyCpE', '(EN) Advanced RAG: Chunking, Embeddings, and Vector Databases'),
            yt('TcRRfcbsApw', '(EN) Semantic Chunking for RAG'),
            link('pgvector: busca vetorial no Postgres', 'https://github.com/pgvector/pgvector'),
          ],
        },
        {
          title: 'P3: pipeline de dados para IA',
          links: [link('Vaticano: documentos oficiais em português', 'https://www.vatican.va/content/vatican/pt.html')],
        },
      ],
    },
    {
      title: 'Depois: após o primeiro emprego',
      topics: [
        {
          title: 'Streaming',
          links: [
            yt('k1aJ2n93WK8', 'Apache Kafka do Zero! O que é Kafka Stream?'),
            yt('1xgBQTF24mU', '(EN) Stream vs Batch processing explained with examples'),
            link('Kafka: documentação oficial (EN)', 'https://kafka.apache.org/documentation/'),
          ],
        },
        {
          title: 'Infraestrutura e CI/CD avançado',
          links: [
            yt('-I6ojXKTdSA', 'O que é CI/CD?'),
            yt('iwf6kcvxeD4', 'DevOps // Dicionário do Programador'),
            link('GitHub Actions: documentação', 'https://docs.github.com/pt/actions'),
            link('Terraform: tutoriais (EN)', 'https://developer.hashicorp.com/terraform/tutorials'),
          ],
        },
        {
          title: 'Segunda cloud e observabilidade avançada',
          links: [
            link('Microsoft Learn: Azure (português)', 'https://learn.microsoft.com/pt-br/training/'),
            link('Google Cloud: treinamentos', 'https://cloud.google.com/learn/training'),
          ],
        },
      ],
    },
  ],
}
