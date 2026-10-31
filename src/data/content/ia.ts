import { link, type ModuleContent } from './helpers.ts'

// "Plano de estudos de IA: 12 meses" (nov/2026 a out/2027), passado pelo dono em 31/10/2026.
// Cada fase tem um tópico por mês; as trilhas do plano entram no mês em que são estudadas, com a prioridade no resumo.
// Links conferidos por HTTP em 31/10/2026. O plano cita os cursos sem endereço.
// Cursos, links e orientações de preço ficam no mês em que são usados (`links` e `notes`), a pedido do dono (31/10/2026).
// O portfólio público também virou parte das fases: cada projeto (`project: true`) entra na seção "Projetos" da fase em que é feito.

const README = 'README com problema, dados, método, resultado e como rodar'

export const ia: ModuleContent = {
  moduleId: 'ia',
  groups: [
    {
      // Catálogo e endereços conferidos em anthropic.skilljar.com em 31/10/2026.
      title: 'Fase 0: Anthropic Academy',
      order: -1,
      topics: [
        {
          title: 'Cursos da Anthropic Academy',
          summary: 'Os cursos da Academy que servem a este plano: primeiro entender a IA e a ferramenta, depois construir com a API.',
          sections: {
            'Começar agora': ['AI Capabilities and Limitations', 'AI Fluency: Framework & Foundations', 'Claude Code 101'],
            'Depois de pegar Python': ['Building with the Claude API', 'Introduction to Model Context Protocol'],
            Opcional: ['Claude Code in Action', 'Introduction to subagents', 'Introduction to agent skills'],
          },
          links: [
            link('AI Capabilities and Limitations (EN)', 'https://anthropic.skilljar.com/ai-capabilities-and-limitations'),
            link('AI Fluency: Framework & Foundations (EN)', 'https://anthropic.skilljar.com/ai-fluency-framework-foundations'),
            link('Claude Code 101 (EN)', 'https://anthropic.skilljar.com/claude-code-101'),
            link('Building with the Claude API (EN)', 'https://anthropic.skilljar.com/claude-with-the-anthropic-api'),
            link('Introduction to Model Context Protocol (EN)', 'https://anthropic.skilljar.com/introduction-to-model-context-protocol'),
            link('Claude Code in Action (EN)', 'https://anthropic.skilljar.com/claude-code-in-action'),
            link('Introduction to subagents (EN)', 'https://anthropic.skilljar.com/introduction-to-subagents'),
            link('Introduction to agent skills (EN)', 'https://anthropic.skilljar.com/introduction-to-agent-skills'),
          ],
          notes:
            'Por que estes:\n\nBuilding with the Claude API é o mais importante para o plano: cobre chamadas à API, avaliação de prompts, engenharia de prompts, tool use, RAG com embeddings, MCP e agentes. Serve de apoio às Fases 1 e 3. Ele pede proficiência em Python e noção de JSON, por isso vem depois do início da Fase 1.\n\nIntroduction to Model Context Protocol ensina a construir servidores e clientes MCP do zero, em Python.\n\nOs de Claude Code ajudam a programar com a ferramenta no dia a dia, o que combina com o vibe coding usado como acelerador.\n\nFicaram de fora por enquanto: Claude Platform 101 (os exemplos usam TypeScript e exigem crédito pré-pago na API, e o plano é em Python); Model Context Protocol: Advanced Topics (só se você for colocar um servidor MCP em produção); Claude 101 e Introduction to Claude Cowork (uso geral, não constroem nada para o portfólio); e os cursos de Bedrock, Google Cloud, educadores, empresas e organizações, fora do escopo.',
        },
      ],
    },
    {
      title: 'Fase 1: Base + IA aplicada',
      topics: [
        {
          title: 'Python, SQL e prompts',
          summary: 'Python + SQL: prioridade alta, base de tudo. Prompt engineering: prioridade alta, esforço baixo.',
          sections: {
            Estudar: [
              'Python para dados: pandas',
              'SQL avançado: funções de janela (window functions)',
              'Guia oficial de prompts da Anthropic',
              'Few-shot (dar exemplos)',
              'Saída em JSON',
              'Testar prompts com casos',
            ],
            'Entrega do mês': ['Repo GitHub com biblioteca de prompts testados', 'Notebook de análise de dados no mesmo repo'],
          },
          terms: [
            ['Python + SQL', 'Linguagem e consulta a banco que sustentam tudo.'],
            ['pandas', 'A biblioteca de tabelas em Python.'],
            ['Prompt engineering', 'Escrever instruções para o modelo de forma que ele erre menos: contexto, exemplos, formato de saída.'],
          ],
          links: [
            link('Kaggle Learn: Python (EN)', 'https://www.kaggle.com/learn/python'),
            link('Kaggle Learn: Pandas (EN)', 'https://www.kaggle.com/learn/pandas'),
            link('Kaggle Learn: Intro to SQL (EN)', 'https://www.kaggle.com/learn/intro-to-sql'),
            link('Kaggle Learn: Advanced SQL (EN)', 'https://www.kaggle.com/learn/advanced-sql'),
            link('Guia de prompt engineering da Anthropic (EN)', 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview'),
            link('Alura: Engenharia de Dados (opcional)', 'https://www.alura.com.br/carreiras/engenharia-de-dados'),
            link('Alura: planos (opcional)', 'https://www.alura.com.br/planos-cursos-online'),
          ],
          notes:
            'Os cursos do Kaggle Learn são gratuitos e cobrem o que este mês pede.\n\nAlura (opcional, em português): assinatura por plano (Plus, Pro, Ultra); o preço varia. Trilha pronta, com Git, SQL e pandas, menos reconhecida fora do Brasil que Coursera e DeepLearning.AI. Use só nas Fases 1 e 3, se sentir que trava por falta de estrutura. Também tem cursos de n8n, Docker e Claude Code.',
        },
        {
          title: 'APIs, vibe coding e n8n',
          summary:
            'Integração por APIs: prioridade alta. Automações: prioridade média, úteis no trabalho e pouco decisivas para contratar. Vibe coding: prioridade baixa para estudar, alta para usar.',
          sections: {
            Estudar: [
              'Claude API',
              'Requisições com requests',
              'Chaves de API e limites de uso',
              'Webhooks',
              'n8n: focar só nele (pode rodar na sua máquina e é o mais técnico)',
              'Vibe coding como acelerador, não como método de estudo',
            ],
            'Entrega do mês': ['1 automação n8n funcionando', '1 script que chama uma API de IA'],
          },
          terms: [
            ['API', 'A porta pela qual um programa conversa com outro via internet (HTTP). Você manda um pedido e recebe dados em JSON.'],
            ['Webhook', 'O sistema avisa você quando algo acontece.'],
            ['Low-code', 'Plataformas de pouco código que ligam apps: um gatilho (trigger) dispara ações em sequência. Make e Zapier ficam fáceis depois que você domina o n8n.'],
            ['Vibe coding', 'Programar descrevendo o que quer e deixando a IA escrever o código. Regra: não publique código que você não consegue explicar linha a linha.'],
          ],
          links: [
            link('Anthropic Academy (EN)', 'https://anthropic.skilljar.com/'),
            link('Documentação do n8n (EN)', 'https://docs.n8n.io/'),
          ],
          notes: 'Anthropic Academy: fazer os cursos de Claude API e de MCP. É gratuita e não exige cartão.',
        },
        {
          title: 'GitHub: biblioteca de prompts testados',
          summary: 'Prompts testados com casos, mais um notebook de análise de dados no mesmo repositório. Primeiro repositório, ainda em nov/2026: publicar cedo e imperfeito vale mais que esperar o projeto "digno".',
          project: true,
          sections: { 'Pronto quando': [README, 'Código rodando do zero'] },
        },
        {
          title: 'GitHub: automação n8n e script de API',
          summary: 'Uma automação n8n funcionando e um script que chama uma API de IA. Dez/2026.',
          project: true,
          sections: { 'Pronto quando': [README, 'Código rodando do zero'] },
        },
      ],
    },
    {
      title: 'Fase 2: Dados + ML',
      description: 'Se as férias da faculdade caírem em dez/jan/fev, use para adiantar esta fase.',
      topics: [
        {
          title: 'Estatística, EDA e visualização',
          summary: 'Análise de dados com IA: prioridade alta. Python + SQL continua aqui com GeoPandas.',
          sections: {
            Estudar: [
              'Estatística básica',
              'Análise exploratória de dados (EDA)',
              'Gráficos e visualização',
              'GeoPandas',
              'Text-to-SQL',
              'Checar sempre o resultado da IA contra o dado real',
            ],
            'Entrega do mês': ['Projeto de análise de dados abertos (IBGE/INPE) com GeoPandas'],
          },
          terms: [
            ['Análise de dados com IA', 'Usar LLM e ML para limpar, explorar e resumir dados.'],
            ['EDA', 'Análise exploratória de dados.'],
            ['Text-to-SQL', 'A IA transforma uma pergunta em consulta.'],
          ],
        },
        {
          title: 'ML clássico com scikit-learn',
          summary: 'Machine learning: prioridade alta. É o núcleo da vaga.',
          sections: {
            Estudar: ['scikit-learn', 'Divisão treino/teste', 'Overfitting', 'Regressão', 'Classificação', 'Clusterização'],
            'Entrega do mês': ['Repo com 3 modelos (regressão, classificação, clusterização) comentados'],
          },
          terms: [
            ['Machine learning', 'Treinar modelos que aprendem padrões a partir de dados.'],
            ['Overfitting', 'O modelo decora em vez de aprender.'],
          ],
          links: [
            link('Machine Learning Specialization, DeepLearning.AI no Coursera (EN)', 'https://www.coursera.org/specializations/machine-learning-introduction'),
            link('Kaggle Learn: Intro to Machine Learning (EN)', 'https://www.kaggle.com/learn/intro-to-machine-learning'),
            link('Notebooks do livro Hands-On Machine Learning (EN)', 'https://github.com/ageron/handson-ml3'),
          ],
          notes:
            'Machine Learning Specialization (Andrew Ng): assinatura de cerca de US$ 49 por mês. Dá para assistir aos vídeos de graça (auditar); o certificado exige assinatura. É a referência de mercado em ML para iniciante, e vale pagar na hora de fechar o curso para ter o certificado.\n\nLivro de apoio: Hands-On Machine Learning (Aurélien Géron).\n\nOrçamento do ano: cerca de 3 meses de Coursera na Fase 2, em torno de US$ 150. Pague por no máximo um curso por vez, e só onde a marca e a estrutura ajudam de verdade; o melhor lugar para investir é esta fase, o núcleo da vaga. Os preços vêm de resumos de busca de out/2026; confirme na página oficial antes de pagar.',
        },
        {
          title: 'Avaliação e primeira competição',
          summary: 'Kaggle só depois da base de ML: competição sem base vira frustração. Comece pelas competições de treino (Playground).',
          sections: {
            Estudar: ['Avaliação de modelos', 'Métricas: acurácia, F1, RMSE', 'Validação cruzada'],
            'Entrega do mês': ['1ª participação no Kaggle (Playground)', 'Notebook público'],
          },
          links: [
            link('Kaggle Learn: Intermediate Machine Learning (EN)', 'https://www.kaggle.com/learn/intermediate-machine-learning'),
            link('Competições de treino do Kaggle (Playground) (EN)', 'https://www.kaggle.com/competitions?hostSegmentTitle=playground'),
          ],
        },
        {
          title: 'GitHub: análise de dados abertos com GeoPandas',
          summary: 'Análise de dados públicos do IBGE ou do INPE. É o seu diferencial: dado geográfico é raro entre iniciantes. Jan/2027.',
          project: true,
          sections: { 'Pronto quando': [README, 'Código rodando do zero', 'Dados abertos'] },
        },
        {
          title: 'GitHub: 3 modelos de ML comentados',
          summary: 'Um modelo de regressão, um de classificação e um de clusterização, com scikit-learn. Fev/2027.',
          project: true,
          sections: { 'Pronto quando': [README, 'Código rodando do zero', 'Dados abertos'] },
        },
        {
          title: 'Kaggle: primeira competição (Playground)',
          summary: 'Primeira participação, numa competição de treino, com notebook público. Mar/2027.',
          project: true,
          sections: { 'Pronto quando': ['Notebook público e comentado', 'Processo documentado'] },
        },
      ],
    },
    {
      title: 'Fase 3: Engenharia de IA',
      topics: [
        {
          title: 'Embeddings e RAG',
          summary: 'Engenharia de IA: prioridade alta. É onde há mais vaga nova.',
          sections: {
            Estudar: ['Embeddings', 'Banco vetorial (ex.: pgvector)', 'RAG (busca em documentos + LLM)'],
            'Entrega do mês': ['App RAG sobre documentos reais, no GitHub'],
          },
          terms: [
            ['Engenharia de IA', 'Construir produtos em cima de modelos prontos.'],
            ['Embedding', 'Transformar texto em números para buscar por significado.'],
            ['pgvector', 'Uma extensão do PostgreSQL que funciona como banco vetorial.'],
            ['RAG', 'Buscar trechos em seus documentos e entregar ao LLM para ele responder com base neles.'],
          ],
          links: [
            link('Curso de LLM do Hugging Face (EN)', 'https://huggingface.co/learn/llm-course'),
            link('Cursos da DeepLearning.AI (EN)', 'https://www.deeplearning.ai/courses'),
            link('Materiais do livro AI Engineering (EN)', 'https://github.com/chiphuyen/aie-book'),
          ],
          notes:
            'Livro de apoio: AI Engineering (Chip Huyen).\n\nOs vídeos dos mini cursos da DeepLearning.AI são gratuitos. Não compre o plano DeepLearning.AI Pro (cerca de US$ 50 por mês ou US$ 300 por ano): ele libera laboratórios e certificados dos mini cursos, e você não precisa disso agora.',
        },
        {
          title: 'Orquestração de agentes',
          summary: 'Orquestração de agentes: prioridade média-alta.',
          sections: {
            Estudar: ['Tool use', 'LangGraph', 'Limites e falhas de agentes'],
            'Entrega do mês': ['Agente que consulta banco SQL e responde perguntas'],
          },
          terms: [
            ['Agente', 'Um LLM que decide sozinho quais ferramentas chamar em vários passos. Orquestrar é controlar esse fluxo.'],
            ['Tool use', 'O modelo chama funções.'],
            ['LangGraph', 'Fluxo do agente em grafo.'],
          ],
          links: [
            link('Curso de Agentes do Hugging Face (EN)', 'https://huggingface.co/learn/agents-course'),
            link('Documentação do LangGraph (EN)', 'https://langchain-ai.github.io/langgraph/'),
            link('Alura: Engenharia de Agentes de IA (opcional)', 'https://www.alura.com.br/carreiras/engenharia-de-ia'),
          ],
          notes: 'O Curso de Agentes do Hugging Face é gratuito, com certificado. Cobre LangGraph, LlamaIndex e smolagents e termina em projeto final.',
        },
        {
          title: 'Engenharia de software para IA',
          summary: 'Prioridade alta: separa júnior bom de júnior comum. São as boas práticas para o projeto não virar notebook bagunçado.',
          sections: {
            Estudar: ['Git/GitHub', 'Testes com pytest', 'FastAPI', 'Docker', 'CI no GitHub Actions', 'Avaliação das respostas (evals)'],
            'Entrega do mês': ['App RAG/agente empacotado em API, com testes e README'],
          },
          terms: [
            ['FastAPI', 'Criar sua própria API.'],
            ['Docker', 'Empacotar o app para rodar em qualquer máquina.'],
          ],
          links: [
            link('Documentação do FastAPI (EN)', 'https://fastapi.tiangolo.com/'),
            link('Alura: Engenharia de Machine Learning (opcional)', 'https://www.alura.com.br/carreiras/engenharia-de-machine-learning'),
          ],
        },
        {
          title: 'GitHub: app RAG sobre documentos reais',
          summary: 'Busca em documentos + LLM, depois empacotado em API. É um dos dois que você mostra na entrevista. Abr a jun/2027.',
          project: true,
          sections: { 'Pronto quando': [README, 'Com FastAPI', 'Com Docker', 'Com testes'] },
        },
        {
          title: 'GitHub: agente que consulta banco SQL',
          summary: 'Agente que consulta um banco SQL e responde perguntas, depois empacotado em API. É o outro que você mostra na entrevista. Mai a jun/2027.',
          project: true,
          sections: { 'Pronto quando': [README, 'Com FastAPI', 'Com Docker', 'Com testes'] },
        },
        {
          title: 'Kaggle: segunda competição',
          summary: 'Segunda das 3 competições do ano, aplicando o que aprendeu na primeira. Mai/2027.',
          project: true,
          sections: { 'Pronto quando': ['Notebook público e comentado', 'Processo documentado'] },
        },
        {
          title: 'Artigo técnico: primeiro',
          summary: 'Conte algo que você construiu nesta fase, no Medium ou no dev.to. Jun/2027.',
          project: true,
          sections: { 'Pronto quando': ['Conta algo que você construiu', 'Inclui os erros que você cometeu', 'Inclui o que você aprendeu'] },
        },
      ],
    },
    {
      title: 'Fase 4: Portfólio e pesquisa',
      topics: [
        {
          title: 'Redes neurais e fine-tuning',
          summary: 'Deep learning e fine-tuning: prioridade média, necessário para publicar modelos.',
          sections: {
            Estudar: ['Redes neurais com PyTorch básico', 'Hugging Face Transformers', 'Fine-tuning leve (LoRA)'],
            'Entrega do mês': ['1º modelo publicado no Hugging Face'],
          },
          terms: [['Fine-tuning', 'Ajustar um modelo pronto com seus dados.']],
          links: [
            link('fast.ai Practical Deep Learning (EN)', 'https://course.fast.ai/'),
            link('Hugging Face: Transformers (EN)', 'https://huggingface.co/docs/transformers'),
            link('Hugging Face: Hub (EN)', 'https://huggingface.co/docs/hub'),
            link('Hugging Face: model cards (EN)', 'https://huggingface.co/docs/hub/model-cards'),
          ],
          notes: 'O fast.ai é gratuito e ensina deep learning fazendo, bom para o modelo que você vai publicar.',
        },
        {
          title: 'Kaggle de verdade e MLOps',
          summary: 'Meta realista: top 50%. A posição importa menos que o processo documentado.',
          sections: {
            Estudar: ['Competição Kaggle de verdade', 'MLOps básico'],
            'Entrega do mês': ['Notebook com solução e ranking registrado'],
          },
        },
        {
          title: 'Projeto de pesquisa',
          summary: 'Pesquisa e escrita técnica: prioridade média, um diferencial. Tema sugerido: ML sobre dados georreferenciados abertos.',
          sections: {
            Estudar: [
              'Ler artigos científicos ligados ao tema do seu projeto',
              'Formular a pergunta',
              'Rodar o experimento',
              'Relatar o resultado em relatório reproduzível',
            ],
            'Entrega do mês': ['Relatório do projeto no GitHub'],
          },
          links: [link('arXiv (EN)', 'https://arxiv.org/')],
        },
        {
          title: 'Escrita técnica e revisão',
          summary: 'Artigo técnico bom é a descrição de algo que você construiu.',
          sections: {
            Estudar: ['Escrita técnica', 'Revisão do portfólio'],
            'Entrega do mês': ['2 artigos publicados', 'Perfil GitHub, Hugging Face e LinkedIn revisado'],
          },
        },
        {
          title: 'Hugging Face: primeiro modelo',
          summary: 'Modelo ajustado com fine-tuning leve e publicado. Jul/2027.',
          project: true,
          sections: { 'Pronto quando': ['Modelo publicado', 'Model card preenchido'] },
          terms: [['Model card', 'Ficha do modelo: dados, limites, métricas.']],
        },
        {
          title: 'Hugging Face: segundo modelo',
          summary: 'Segundo modelo publicado, com a ficha completa. Ago/2027.',
          project: true,
          sections: { 'Pronto quando': ['Modelo publicado', 'Model card preenchido'] },
          terms: [['Model card', 'Ficha do modelo: dados, limites, métricas.']],
        },
        {
          title: 'Hugging Face: Space',
          summary: 'Demo online, para qualquer pessoa testar sem instalar nada. Jul a ago/2027.',
          project: true,
          sections: { 'Pronto quando': ['Space no ar'] },
        },
        {
          title: 'Kaggle: competição de verdade',
          summary: 'Última das 3 competições. Meta realista: top 50%; a posição importa menos que o processo documentado. Ago/2027.',
          project: true,
          sections: { 'Pronto quando': ['Notebook público e comentado', 'Processo documentado', 'Ranking registrado'] },
        },
        {
          title: 'GitHub: projeto de pesquisa',
          summary: 'Tema sugerido: ML sobre dados georreferenciados abertos. Set/2027.',
          project: true,
          sections: { 'Pronto quando': ['Pergunta clara', 'Experimento reproduzível', 'Relatório curto'] },
        },
        {
          title: 'Artigo técnico: segundo',
          summary: 'Conte algo que você construiu, no Medium ou no dev.to. Set/2027.',
          project: true,
          sections: { 'Pronto quando': ['Conta algo que você construiu', 'Inclui os erros que você cometeu', 'Inclui o que você aprendeu'] },
        },
        {
          title: 'Artigo técnico: terceiro',
          summary: 'Conte algo que você construiu, no Medium ou no dev.to. Out/2027.',
          project: true,
          sections: { 'Pronto quando': ['Conta algo que você construiu', 'Inclui os erros que você cometeu', 'Inclui o que você aprendeu'] },
        },
      ],
    },
  ],
}
