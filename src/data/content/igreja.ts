import { link, ppr, yt, type ModuleContent, type TopicSeed } from './helpers.ts'

// Plano de estudo católico em três trilhas, montado sobre os cursos do site do Padre Paulo Ricardo
// (padrepauloricardo.org/cursos). O site não informa na lista quais cursos exigem assinatura:
// confirme o acesso na página de cada curso. Só "Comece por aqui" e "Consagração Total" aparecem como gratuitos.

const curso = (
  title: string,
  slug: string,
  aulas: number,
  summary: string,
  fazer: string[] = [],
  extra: Partial<TopicSeed> = {},
): TopicSeed => ({
  title,
  summary,
  sections: {
    Estudar: [`Assistir às ${aulas} aulas do curso`, 'Anotar 3 ideias que mudaram o jeito como eu penso'],
    Praticar: fazer.length ? fazer : ['Escrever um resumo de uma página com as minhas palavras'],
  },
  links: [ppr(slug, title)],
  ...extra,
})

export const igreja: ModuleContent = {
  moduleId: 'igreja',
  groups: [
    {
      title: 'Espiritualidade',
      subtitle: 'Oração e vida de piedade',
      description:
        'A base de tudo: aprender a rezar e criar o hábito. Estas são as primeiras coisas a começar, em paralelo às trilhas abaixo.',
      topics: [
        curso('Direção Espiritual: Aprenda a Rezar', 'direcao-espiritual-aprenda-a-rezar', 22, 'Ponto de partida prático para a vida de oração.', [
          'Definir um horário fixo de oração e cumprir por 7 dias seguidos',
        ]),
        curso('Ensina-nos a orar', 'ensina-nos-a-orar', 25, 'Curso sobre oração.'),
        curso('O Segredo do Rosário', 'o-segredo-do-rosario', 7, 'Curso sobre o rosário.', [
          'Rezar o terço uma vez por dia durante uma semana',
        ]),
        curso('Consagração Total a Nossa Senhora', 'consagracao-total-a-nossa-senhora', 20, 'Curso marcado como gratuito no site.', [
          'Seguir o roteiro de preparação até o fim',
        ], { badge: 'Gratuito' }),
      ],
    },
    {
      title: 'Teologia pura',
      subtitle: 'Doutrina, Bíblia e história da Igreja',
      description:
        'Ordem sugerida: fundamentos, depois doutrina, depois aprofundamento e, por último, história e apologética. Um curso por vez; ritmo de 1 a 2 aulas por dia nos dias úteis.',
      criteria: 'Consigo explicar o Credo, os sacramentos e os mandamentos com as minhas palavras para alguém que nunca estudou isso.',
      topics: [
        curso('Catequese para Adultos', 'catequese-para-adultos', 34, 'Fundamentos da fé em um só curso. Boa primeira escolha.', [], { badge: 'Fundamentos' }),
        curso('Como Ler a Bíblia', 'como-ler-a-biblia', 16, 'Curso sobre como ler a Bíblia.', [], { badge: 'Fundamentos' }),
        curso('Introdução às Escrituras', 'aprenda-a-ler-a-biblia', 7, 'Curso curto para começar a ler a Bíblia com método.', [], { badge: 'Fundamentos' }),
        curso('Quem é Jesus?', 'quem-e-jesus', 19, 'Curso sobre quem é Jesus Cristo.', [], { badge: 'Fundamentos' }),
        curso('Credo Apostólico', 'catecismo-da-igreja-catolica', 90, 'O Catecismo da Igreja Católica explicado a partir do Credo. É o curso mais longo: divida em blocos de 10 aulas.', [
          'Terminar um bloco de 10 aulas por semana',
        ], { badge: 'Doutrina' }),
        curso('Os Sete Sacramentos', 'os-sete-sacramentos', 43, 'O que cada sacramento é, o que realiza e como vivê-lo.', [], { badge: 'Doutrina' }),
        curso('Os Dez Mandamentos', 'os-dez-mandamentos', 45, 'A moral católica explicada mandamento por mandamento.', [], { badge: 'Doutrina' }),
        curso('Introdução ao Método Teológico', 'introducao-ao-metodo-teologico', 15, 'Curso sobre como a teologia raciocina.', [], { badge: 'Aprofundamento' }),
        curso('Introdução a Santo Tomás de Aquino', 'santo-tomas', 18, 'Introdução a Santo Tomás de Aquino.', [], { badge: 'Aprofundamento' }),
        curso('Evangelhos Sinóticos', 'os-evangelhos-sinoticos', 20, 'Leitura guiada de Mateus, Marcos e Lucas.', [], { badge: 'Aprofundamento' }),
        curso('História da Igreja Antiga', 'historia-da-igreja-antiga', 15, 'História da Igreja nos primeiros séculos.', [], { badge: 'História' }),
        curso('História da Igreja Medieval', 'historia-da-igreja-medieval', 18, 'A Igreja na Idade Média.', [], { badge: 'História' }),
        curso('Por que não sou protestante', 'por-que-nao-sou-protestante', 10, 'Apologética: as diferenças de fundo entre católicos e protestantes.', [], { badge: 'Apologética' }),
        curso('A Igreja e o Mundo Moderno', 'a-igreja-e-o-mundo-moderno', 18, 'A relação entre a Igreja e as ideias modernas.', [], { badge: 'Apologética' }),
        {
          title: 'Catecismo e Compêndio (leitura direta)',
          summary: 'Para consultar o texto oficial sempre que um curso citar um ponto da doutrina.',
          sections: { Estudar: ['Ler o Compêndio do Catecismo, uma seção por semana'], Praticar: ['Anotar cada dúvida com o número do parágrafo'] },
          links: [
            link(
              'Vaticano: motu proprio que aprova o Compêndio do Catecismo',
              'https://www.vatican.va/content/benedict-xvi/pt/motu_proprio/documents/hf_ben-xvi_motu-proprio_20050628_compendio-catechismo.html',
            ),
            link('Vaticano: Fidei depositum, constituição apostólica sobre o Catecismo', 'https://www.vatican.va/content/john-paul-ii/pt/apost_constitutions/documents/hf_jp-ii_apc_19921011_fidei-depositum.pdf'),
          ],
        },
      ],
    },
    {
      title: 'Sentimentos humanos',
      subtitle: 'Entender o coração, o seu e o dos outros, para saber aconselhar',
      description:
        'Emoções, temperamentos, ansiedade, tristeza e tentações. A ideia é conhecer o próprio interior e ganhar repertório para ouvir e aconselhar quem está sofrendo. Comece por temperamentos, que dão o vocabulário para o resto.',
      criteria: 'Consigo ouvir um amigo em sofrimento sem me apressar em dar solução e sei apontar para a ajuda certa, inclusive profissional.',
      topics: [
        curso('Os Quatro Temperamentos', 'os-quatro-temperamentos', 16, 'Vocabulário para entender por que cada pessoa reage de um jeito.', [
          'Identificar o meu temperamento e o de 3 pessoas próximas',
        ], { badge: 'Comece por aqui' }),
        curso('Terapia das Doenças Espirituais', 'terapia-das-doencas-espirituais', 24, 'Curso sobre as doenças espirituais.'),
        curso('Terapia da Ansiedade', 'terapia-da-ansiedade', 20, 'Curso sobre ansiedade.'),
        curso('Depressão: Entender para Ajudar', 'depressao-entender-para-ajudar', 14, 'Curso sobre depressão, para entender e ajudar quem passa por ela.', [
          'Anotar sinais de alerta e quando encaminhar para um profissional',
        ]),
        curso('Cartas de um Diabo a seu Aprendiz', 'cartas-de-um-diabo-a-seu-aprendiz', 14, 'Curso sobre o clássico de C. S. Lewis.'),
        curso('Masculinidade e Liderança', 'masculinidade-e-lideranca', 11, 'Curso sobre masculinidade e liderança.'),
        curso('Esto Vir: Seja Homem', 'esto-vir-seja-homem', 10, 'Curso voltado aos homens.'),
        curso('O Mistério da Mulher', 'o-misterio-da-mulher', 11, 'Curso sobre a mulher.'),
        curso('Terapia da Alma Feminina', 'terapia-da-alma-feminina', 10, 'Curso sobre a alma feminina.'),
        {
          title: 'Como aconselhar alguém',
          summary: 'Treino prático. Não há curso único para isso: o aprendizado vem de ouvir e de refletir depois.',
          sections: {
            Estudar: [
              'Ouvir primeiro: perguntar mais do que responder',
              'Distinguir desabafo de pedido de conselho',
              'Saber quando encaminhar para padre, psicólogo ou médico',
            ],
            Praticar: [
              'Em uma conversa difícil desta semana, só ouvir e fazer perguntas',
              'Anotar depois o que aprendi sobre aquela pessoa',
              'Pedir a um amigo mais velho ou ao meu diretor espiritual um exemplo de aconselhamento que deu certo',
            ],
          },
        },
      ],
    },
    {
      title: 'Maturidade espiritual',
      subtitle: 'Crescer na vida interior com constância',
      description:
        'Direção espiritual, santidade no cotidiano e combate espiritual. Só vale a pena avançar aqui com a oração diária já funcionando (veja Espiritualidade).',
      criteria: 'Tenho uma regra de vida de oração mantida há pelo menos 3 meses e converso regularmente com um diretor espiritual.',
      topics: [
        curso('Direção Espiritual: a Jornada', 'direcao-espiritual-a-jornada', 15, 'Curso sobre direção espiritual.', [
          'Procurar um padre para direção espiritual regular',
        ]),
        curso('Engenharia da Santidade', 'engenharia-da-santidade', 13, 'Curso sobre o caminho da santidade.'),
        curso('Engenharia da Santidade II', 'engenharia-da-santidade-ii', 15, 'Continuação do curso anterior.'),
        curso('Caminho de Perfeição', 'caminho-de-perfeicao', 13, 'Curso baseado na obra de Santa Teresa de Ávila.'),
        curso('O Segredo de Teresinha', 'o-segredo-de-teresinha', 20, 'Curso sobre Santa Teresinha.'),
        curso('Livrai-nos do Mal', 'livrai-nos-do-mal', 16, 'Curso sobre o mal e o combate espiritual.'),
        curso('Ferro e Fogo', 'ferro-e-fogo', 20, 'Confira o tema na página do curso.'),
        {
          title: 'Esperança nos dias difíceis',
          summary: 'Pregações curtas para reler quando o ânimo cair. Também aparecem no módulo Motivação.',
          sections: { Praticar: ['Assistir a uma pregação e rezar em seguida'] },
          links: [
            yt('KI2dZWddYTQ', 'Com Esperança Vencerás a Tribulação - Padre Paulo Ricardo'),
            yt('LLrxNc8kARE', 'Virtude da Esperança - Padre Paulo Ricardo'),
          ],
        },
      ],
    },
  ],
}
