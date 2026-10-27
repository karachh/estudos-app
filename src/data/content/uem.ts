import type { GroupSeed, ModuleContent, TopicSeed } from './helpers.ts'

// Importado do Notion (UEM > Disciplinas) em 26/10/2026. Os dados de faltas e nota são uma foto desse dia.
// O conteúdo de cada disciplina ainda será preenchido; por enquanto cada uma já tem os blocos que o Notion tinha.

const padrao: TopicSeed[] = [
  {
    title: 'Trabalhos e provas',
    summary: 'Datas, entregas e o que cai em cada avaliação.',
    sections: { 'Trabalhos e provas': [] },
  },
  {
    title: 'Dúvidas e revisão',
    summary: 'O que não entendi na aula e precisa de revisão antes da prova.',
    sections: { Dúvidas: [], Revisão: [] },
  },
]

const disciplina = (
  title: string,
  meta: { semestre: string; professor: string; codigo: string; faltas?: [number, number]; nota?: number; status?: string },
  conteudo: TopicSeed[] = [],
): GroupSeed => ({
  title,
  subtitle: `${meta.semestre} semestre · Prof. ${meta.professor} · Código ${meta.codigo}${meta.status ? ` · ${meta.status}` : ''}`,
  description: [
    meta.faltas ? `Faltas: ${meta.faltas[0]} de ${meta.faltas[1]}.` : '',
    meta.nota !== undefined ? `Nota final registrada: ${meta.nota}.` : '',
  ]
    .filter(Boolean)
    .join(' '),
  topics: [...conteudo, ...padrao],
})

export const uem: ModuleContent = {
  moduleId: 'uem',
  groups: [
    disciplina('Banco de Dados II', { semestre: '6º', professor: 'Carlos Danilo Luz', codigo: '11922', faltas: [10, 17] }),
    disciplina('Projeto e Análise de Algoritmos', {
      semestre: '6º',
      professor: 'José Roberto Vasconcelos',
      codigo: '14854',
      faltas: [10, 17],
      nota: 2,
    }),
    disciplina('Construção de Software', { semestre: '6º', professor: 'André', codigo: '9910', faltas: [6, 25] }),
    disciplina('Sistemas Operacionais', { semestre: '6º', professor: 'Lucas de Oliveira Teixeira', codigo: '9911', faltas: [4, 17] }),
    disciplina('Programação de Sistemas Web', {
      semestre: '6º',
      professor: 'Lucas de Oliveira Teixeira',
      codigo: '9907',
      faltas: [10, 25],
      nota: 2,
    }),
    disciplina('Psicologia no contexto do trabalho', { semestre: '6º', professor: 'Renata da Silva', codigo: '9902', faltas: [6, 8] }),
    disciplina('DIN na Comunidade', { semestre: '6º', professor: 'Kikuti', codigo: '11923', faltas: [0, 34] }),
    disciplina(
      'Estrutura de Dados',
      { semestre: '2º', professor: 'Kikuti', codigo: '9893', status: 'Acompanhamento' },
      [
        {
          title: 'Conceitos fundamentais',
          sections: {
            Estudar: [
              'Tipos abstratos de dados (TADs) e sua diferença pra tipos primitivos',
              'Análise de complexidade de algoritmos (notação Big O), pra você conseguir comparar estruturas em termos de eficiência',
            ],
          },
        },
        {
          title: 'Estruturas lineares',
          sections: {
            Estudar: [
              'Listas (encadeadas simples, duplamente encadeadas, circulares)',
              'Pilhas (stack) — aplicações como avaliação de expressões, backtracking',
              'Filas (queue) — incluindo filas de prioridade',
            ],
          },
        },
        {
          title: 'Estruturas não-lineares',
          sections: {
            Estudar: [
              'Árvores binárias, árvores de busca (BST)',
              'Árvores balanceadas (AVL, e possivelmente Rubro-Negra, dependendo de quanto o professor aprofundar)',
              'Grafos — representação (matriz de adjacência, lista de adjacência) e percursos (BFS, DFS)',
            ],
          },
        },
        {
          title: 'Busca e ordenação',
          sections: {
            Estudar: [
              'Algoritmos de busca (linear, binária, busca em árvores)',
              'Algoritmos de ordenação (bubble sort, insertion sort, merge sort, quick sort, etc.) com foco em complexidade',
            ],
          },
        },
        {
          title: 'Tabelas hash',
          sections: { Estudar: ['Funções de espalhamento (hashing) e tratamento de colisões'] },
        },
      ],
    ),
    disciplina('Matemática Discreta II', { semestre: '2º', professor: 'Yerko', codigo: '5173', status: 'Acompanhamento' }),
  ],
}
