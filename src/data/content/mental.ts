import { yt, type ModuleContent } from './helpers.ts'

// Vídeos para os dias de desânimo. Os links vêm de buscas no YouTube e não foram assistidos pelo Claude:
// vale trocar os que não funcionarem para você. Os temas já aceitam novos vídeos.
export const mental: ModuleContent = {
  moduleId: 'mental',
  groups: [
    {
      title: 'Para os dias de desânimo',
      subtitle: 'Abra aqui quando o ânimo cair',
      description:
        'Se o desânimo durar semanas ou vier acompanhado de tristeza profunda, converse com alguém de confiança e procure um profissional de saúde mental.',
      topics: [
        {
          title: 'Disciplina e constância',
          summary: 'Para lembrar que o resultado vem da repetição, não da vontade do dia.',
          sections: { 'Para lembrar': [] },
          links: [
            yt('M-DPRkSqTXI', 'O Poder da Disciplina - palestra motivacional'),
            yt('xsE964xxuxI', 'Nunca desista'),
          ],
        },
        {
          title: 'Estudar mesmo sem vontade',
          summary: 'Dicas e relatos de quem manteve a rotina de estudos nos dias ruins.',
          sections: { 'Para lembrar': [] },
          links: [
            yt('GaFO6bRc8uI', 'Dicas para não desistir dos estudos'),
            yt('xv3VQF6nex8', 'Assista toda vez que você não quiser estudar'),
            yt('rNnROej7V4E', 'Como venci a preguiça e estudei todos os dias até ser aprovada'),
            yt('tG1eE2sdDX4', 'Como se manter motivado nos estudos sem depender dos outros'),
          ],
        },
        {
          title: 'Fé e esperança',
          summary: 'Duas pregações do Padre Paulo Ricardo sobre esperança nas dificuldades.',
          sections: { 'Para lembrar': [] },
          links: [
            yt('KI2dZWddYTQ', 'Com Esperança Vencerás a Tribulação - Padre Paulo Ricardo'),
            yt('LLrxNc8kARE', 'Virtude da Esperança - Padre Paulo Ricardo'),
          ],
        },
      ],
    },
    {
      title: 'Minhas razões',
      subtitle: 'Escritas por mim, para ler quando eu esquecer',
      topics: [
        {
          title: 'Por que eu comecei',
          summary: 'Preencha com calma, uma vez. Depois é só reler.',
          sections: {
            'Para lembrar': [
              'Por que eu escolhi Computação e engenharia de dados',
              'O que eu quero ter construído daqui a 2 anos',
              'Uma coisa que eu já consegui e achava impossível',
              'Quem eu quero orgulhar com esse esforço',
            ],
          },
        },
      ],
    },
  ],
}
