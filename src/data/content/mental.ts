import type { ModuleContent } from './helpers.ts'

// Os temas nascem sem material: o dono tirou os vídeos sugeridos em 31/10/2026 e adiciona os dele pelo app.
export const mental: ModuleContent = {
  moduleId: 'mental',
  groups: [
    {
      title: 'Para os dias de desânimo',
      topics: [
        {
          title: 'Disciplina e constância',
          summary: 'Para lembrar que o resultado vem da repetição, não da vontade do dia.',
          sections: { 'Para lembrar': [] },
        },
        {
          title: 'Estudar mesmo sem vontade',
          summary: 'Dicas e relatos de quem manteve a rotina de estudos nos dias ruins.',
          sections: { 'Para lembrar': [] },
        },
      ],
    },
  ],
}
