---
name: Estudos
description: Caderno pessoal de estudos em módulos, com uma casca de cartaz analógico (capa de disco e pôster retrô de ficção científica impressos) e um mundo interior por módulo.
colors:
  print-black: "#0d0c0a"
  print-surface: "#14120f"
  print-raised: "#1c1a16"
  print-line: "#2e2b25"
  print-frame: "#5a5446"
  cream-ink: "#ece4cf"
  cream-ink-2: "#c4bca6"
  cream-ink-3: "#9c947f"
  danger-dark: "#ef8f7f"
  print-paper: "#ece5d3"
  print-paper-surface: "#f2ecdd"
  print-paper-line: "#d2c8b1"
  print-paper-frame: "#8c826b"
  paper-ink: "#1a1814"
  danger-light: "#b3382b"
  accent-profissional: "#6fd0b0"
  accent-trabalho: "#e8b04a"
  accent-uem: "#b69cff"
  accent-igreja: "#dcaa3c"
  accent-cultura: "#7cc4f0"
  accent-mental: "#d4543f"
  accent-profissional-light: "#0e8a68"
  accent-trabalho-light: "#a76400"
  accent-uem-light: "#6544d6"
  accent-igreja-light: "#8c600a"
  accent-cultura-light: "#0b72b5"
  accent-mental-light: "#a3301f"
  map-contour: "#8d846c"
  map-dots: "#4a4538"
  map-trail: "#b8ae94"
  sacro-leather: "#17110c"
  sacro-surface: "#1e1610"
  sacro-raised: "#271d15"
  sacro-line: "#3d2e20"
  sacro-frame: "#6e5638"
  sacro-ink: "#efe3c8"
  sacro-wine: "#7d2630"
  renascenca-black: "#13110e"
  renascenca-surface: "#1a1713"
  renascenca-line: "#3a3229"
  renascenca-ink: "#ece2cc"
  renascenca-paper: "#ddcdad"
  renascenca-ochre: "#c9962e"
  film-orange: "#e5582b"
  film-lift: "#34302b"
  film-sky-tint: "#788ca0"
typography:
  cover-display:
    fontFamily: "'Gloock', 'Bodoni Moda Variable', serif"
    fontSize: "9rem"
    fontWeight: 400
    lineHeight: 0.8
  cover-heading:
    fontFamily: "'Gloock', 'Bodoni Moda Variable', serif"
    fontSize: "2.3rem"
    fontWeight: 400
    lineHeight: 1.2
  fine-print:
    fontFamily: "'Archivo Narrow Variable', 'Barlow', sans-serif"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.08em"
  display:
    fontFamily: "'Big Shoulders Display Variable', 'Barlow', sans-serif"
    fontSize: "5.5rem"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0.005em"
  headline:
    fontFamily: "'Big Shoulders Display Variable', 'Barlow', sans-serif"
    fontSize: "2.6rem"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0.005em"
  title:
    fontFamily: "'Big Shoulders Display Variable', 'Barlow', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.03em"
  body:
    fontFamily: "'Barlow', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tnum"
  label:
    fontFamily: "'Big Shoulders Display Variable', 'Barlow', sans-serif"
    fontSize: "1.02rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.05em"
  data:
    fontFamily: "'Space Mono', ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.35
  sacro-display:
    fontFamily: "'Young Serif', Georgia, serif"
    fontSize: "2.3rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  sacro-italic:
    fontFamily: "'Newsreader Variable', Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.2
  renascenca-display:
    fontFamily: "'Bodoni Moda Variable', 'Didot', serif"
    fontSize: "6rem"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  renascenca-reading:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "1.4rem"
    fontWeight: 500
    lineHeight: 1.2
rounded:
  bar: "1px"
  tab: "3px"
  check: "4px"
  corner: "0.3rem"
  field: "0.7rem"
  niche-foot: "1rem"
  map: "1.25rem"
  frame: "1.5rem"
  pill: "999px"
spacing:
  rail: "15.5rem"
  rail-collapsed: "4.5rem"
  content-max: "66rem"
  map-column: "25rem"
  group-gap: "4rem"
  block-gap: "3.5rem"
  row-y: "0.75rem"
components:
  button:
    backgroundColor: "transparent"
    textColor: "{colors.cream-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.48rem 1rem"
  button-primary:
    backgroundColor: "{colors.accent-profissional}"
    textColor: "{colors.print-black}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.48rem 1rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cream-ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.48rem 1rem"
  field:
    backgroundColor: "{colors.print-surface}"
    textColor: "{colors.cream-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "0.55rem 0.85rem"
  check:
    backgroundColor: "transparent"
    rounded: "{rounded.check}"
    size: "1.2rem"
  strip:
    backgroundColor: "{colors.accent-profissional}"
    textColor: "{colors.print-black}"
    typography: "{typography.data}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1.1rem"
  niche-head:
    backgroundColor: "{colors.sacro-leather}"
    textColor: "{colors.accent-igreja}"
    rounded: "{rounded.pill}"
  plate:
    backgroundColor: "{colors.renascenca-surface}"
    textColor: "{colors.renascenca-ink}"
    rounded: "{rounded.frame}"
    padding: "1.4rem 1.4rem 1.2rem"
  plate-paper:
    backgroundColor: "{colors.renascenca-paper}"
    textColor: "#1d1913"
    padding: "1.4rem 1.4rem 1.2rem"
---

# Design System: Estudos

## Overview

**Creative North Star: "Uma capa de disco impressa à mão"**

O app é um caderno de estudos para um usuário só, usado à noite no PC e no celular. Desde 27/10/2026 a casca segue as referências soltas em `../refs/`: capas de disco e pôsteres retrô de ficção científica, impressos em serigrafia ou risografia. Isso quer dizer preto quente com grão de impressão, tinta creme, duas ou três cores chapadas, molduras finas de canto arredondado, faixas em cápsula, glifos celestes a traço (estrela de quatro pontas, órbitas cruzadas) e letreiro condensado retrô.

O interior de cada módulo é um mundo próprio, escolhido por `data-world` na raiz `.app`, e todos herdam a casca (grão, molduras, cápsulas, estrela, faixa de resumo, números em Space Mono):
- `mapa` (Profissional, Trabalho, UEM, Repertório): prova de orientação por pontuação, impressa em duas cores. As curvas de nível são creme, a mata é retícula de pontos e o campo aberto vem na cor do módulo. Provisoriamente, o cabeçalho desses módulos é a capa deles na página inicial (ver Capa do módulo).
- `sacro` (Igreja): manuscrito medieval em couro marrom escuro e dourado de folha, com vinho. Os nichos em arco se enchem de dourado.
- `renascenca` (Motivação): colagem renascentista com papel rasgado, Bodoni e disco vermelho.

O progresso nunca é barra de porcentagem. Cada mundo tem seu desenho que se completa (controle, arco dourado, disco), e cada item do checklist vira um traço de código de barras. Nenhum desenho liga os tópicos entre si nem sugere sequência.

**Key Characteristics:**
- Casca única de cartaz analógico; três mundos internos trocados por `data-world`.
- Cor por módulo como a cor chapada da impressão; tinge de leve o fundo no mundo mapa.
- Tema escuro por padrão e claro como alternativa (papel creme), em todos os mundos.
- Lateral recolhível no desktop, lembrada por aparelho (`estudos:rail` no localStorage).
- Obras de arte em domínio público com crédito visível, empacotadas para uso offline.

## Página inicial (`pages/HomePage.tsx`, rota `/`)

Referência: `../refs/c564aeb767c39bbc03d14bd03b530fc1.jpg`, uma capa de disco com foto de montanha em filme, faixa preta vertical com letreiro laranja de alto contraste, letras miúdas e código de barras. A página fica sempre escura e não tem lateral nem abas.
- **Capa:** foto de paisagem em tela cheia com filtro de filme (`.film-img`: saturação e contraste baixos, sépia leve). Por cima vão `.film-lift` (pretos levantados) e `.film-fade` (vinheta, céu frio e grão próprio).
  - **Faixa** (`.band`): à esquerda, com "ESTUDOS" em Gloock na vertical, em laranja de filme (`#e5582b`). O rodapé da faixa vai em letra miúda.
  - **Etiqueta** (`.sticker`): à direita, com "Caderno de Estudos Pessoal" em Gloock, o código de barras do progresso geral, o botão "Ver os módulos" e o crédito da foto.
- **Um banner por módulo, na ordem de `modules.ts`:** cada um é uma seção de tela cheia com a foto (`landscapes` em `data/art.ts`) ou, na Igreja, a capa pintada.
  - A faixa traz o nome curto na cor do módulo.
  - A etiqueta traz o nome, a tagline, os grupos com fração (três no celular, seis no desktop), o código de barras, "Abrir <módulo>" e o crédito.
- **Crescimento:** o banner entra recortado (`clip-path: inset(16% 14% round 1.5rem)`) e cresce até a borda enquanto a foto desaproxima (escala de 1.2 a 1.02). É uma animação ligada à rolagem: `view-timeline: --banner` na seção, que precisa de `overflow: clip`, porque `hidden` cria um contêiner de rolagem e trava a animação. Sem suporte ou com movimento reduzido, o banner aparece pronto.
- **Código de barras:** um traço por tópico; 1px a 45% se não começado, 2px se em andamento, 4px se concluído. A legenda vai em Space Mono ("N de M itens").
- **Tamanho do letreiro na faixa:** sai do comprimento do nome (`--len` × 0.9), para o nome ocupar a altura. Na faixa a altura de linha é 1, não 0.8: com 0.8 os acentos (Ó, Ã) saíam da caixa e encostavam na borda.
- **Rodapé da faixa:** letra miúda a 0.72rem; nada informativo fica abaixo de 11px.
- **Voltar ao início:** a marca "Estudos" na lateral e na barra do celular leva para `/`.

## Colors

Uma cor saturada por tela, a do módulo, sobre preto quente e creme.

### Primary
- **Cor chapada do módulo** (`--accent`): uma por módulo, com par escuro e par claro. Profissional é verde-água, Trabalho âmbar, UEM lilás, Igreja dourado de folha, Repertório azul-céu e Motivação vermelhão (os tokens mantêm os ids `cultura` e `mental`). Vai em:
  - faixa de resumo, glifos (estrela e órbita), botão primário;
  - controles, traços marcados, frações de grupo, foco e cursor de texto.

### Secondary
- **Tintas do mapa** (map-contour, map-dots, map-trail): só dentro do SVG do mundo mapa.
  - Curvas de nível creme apagado, a curva índice mais grossa.
  - Mata em retícula de pontos girada 30°.
  - Campo aberto com 16% da cor do módulo e pântano em hachura da mesma cor.
  - Trilha tracejada, linhas de norte e uma estrela no canto como norte.
- **Vinho sacro** (sacro-wine): hover e estado em andamento dos nichos; faz o degradê do filete dos títulos sacros com o dourado.
- **Ocre renascentista** (renascenca-ochre): metadados das lâminas, filete dos títulos e o anel a traço em volta do disco vermelho da capa.

### Neutral
- **Preto de impressão** (print-black, print-surface, print-raised, print-line, print-frame): fundo, superfície, elevado, filete e moldura do mundo mapa. No `.app` recebem 2.5%, 4%, 6%, 10% e 22% da cor do módulo via `color-mix` em oklab.
- **Tinta creme** (cream-ink, cream-ink-2, cream-ink-3): texto principal, secundário e de apoio.
- **Papel** (print-paper, print-paper-surface, print-paper-line, print-paper-frame, paper-ink): tema claro.
- **Couro sacro** (sacro-*) e **preto quente renascentista** (renascenca-*): neutros dos dois mundos próprios. Neles a cor do módulo não tinge o fundo.

### Named Rules
**The Spot Color Rule.** A cor do módulo é a única tinta saturada da tela. Ela marca o que é interativo, o estado e os glifos da casca. Texto corrido nunca vai na cor do módulo; a exceção é o texto escuro (`--on-accent`) dentro da faixa chapada.

**The Ink Swap Rule.** Quando há uma superfície clara dentro de uma tela escura (como a lâmina de papel), ela redefine `--ink`, `--ink-2` e `--ink-3` localmente, em vez de pintar cada texto um a um.

## Typography

**Display Font:** Big Shoulders Display, variável (com Barlow). No mundo renascença, Bodoni Moda (com Didot).
**Body Font:** Barlow (com system-ui).
**Data Font:** Space Mono, só para números e dados: frações, numeração dos controles, faixa de resumo, selos.
**Vozes de mundo:** Young Serif e Newsreader itálica, com Cinzel Decorative no título (sacro); Noto Serif Display condensada (wdth 62.5), Cormorant Garamond e Montserrat Variable (renascença, Motivação); Bagel Fat One (psico, Profissional); Noto Serif Display Variable condensada no título, Gloock e kanji em fonte do sistema, Yu Mincho e equivalentes (eva, UEM); Anton e Special Elite (office, Trabalho). Marca "Estudos" da lateral em Gloock. Regras em `src/worlds.css`.

**Character:** letreiro condensado de capa retrô em caixa-alta para títulos e rótulos de botão, grotesca neutra no corpo e monoespaçada de etiqueta técnica para os números.

### Hierarchy
- **Display** (800, 3.5rem no celular e 5.5rem no desktop, 0.9, caixa-alta): nome do módulo dentro da moldura do cabeçalho. O sacro usa o mesmo letreiro sobre a pintura; a renascença usa Bodoni 500 na cor do módulo, com o tamanho tirado da largura da coluna e do número de letras (`min(6rem, 130cqw / --len)`), para nome comprido não invadir a pintura. Nos módulos com capa provisória, o nome vai em Gloock na etiqueta.
- **Headline** (800, 2.1 a 2.6rem): título do grupo, e do tópico a 2.6 a 3.4rem.
  - Sacro: Young Serif. Renascença: Bodoni.
- **Title** (800, 1.5rem, 0.03em): cabeçalho de bloco, com estrela na frente e filete até a borda.
  - Sacro: Young Serif com filete em degradê. Renascença: Bodoni, com um disco no lugar da estrela.
- **Body** (400, 16px, 1.5, números tabulares): texto corrido em `max-w-prose`; as anotações vão até 75ch.
- **Label** (700, 1.02rem, 0.05em, caixa-alta): rótulo de botão, sempre no letreiro, mesmo no mundo renascença.
- **Data** (Space Mono): resumo na faixa a 0.8rem, número do controle com dois dígitos (01, 02…), frações e selos (selo a 0.72rem, o menor tamanho de texto informativo).

### Escala de papéis
Todo tamanho de texto sai de um token de papel em `src/index.css` (`--type-*`, classes `text-*` do Tailwind). Nenhum componente escreve tamanho solto (`text-[1.45rem]`).
- `micro` (0.72rem): créditos, letra miúda, selos, abas do celular. É o piso do texto informativo.
- `meta` (0.95rem): atalhos de grupo, número do controle, "Recolher".
- `body` (1rem, nunca em px, para respeitar a letra escolhida no navegador).
- `reading` (1.15rem): texto de leitura dentro de nicho e lâmina.
- `lead` (1.4rem; 1.55rem na renascença, porque a Cormorant tem olho pequeno): tagline, subtítulo do tópico, seção do checklist.
- `card` (1.65rem): título da lâmina.
- `brand` (1.9rem): marca "Estudos".
- `cover` (1.9 a 2.3rem, fluido): título na etiqueta das capas.
- `headline` (2.1 a 2.6rem; sacro 1.9 a 2.3; renascença 2 a 2.5): título e contagem do grupo.
- `topic` (2.6 a 3.4rem; sacro 2.4 a 3; renascença 2.4 a 3.2): título do tópico.
- `display` (3.5 a 5.5rem; sacro 5 a 6): nome do módulo.

Os mundos só redefinem o valor do token em `[data-world='sacro']` e `[data-world='renascenca']`, porque cada voz tem outro tamanho aparente. Títulos usam `text-wrap: balance` e parágrafos `text-wrap: pretty`.

### Named Rules
**The Role Scale Rule.** Tamanho de texto é papel, não número: um texto novo escolhe um dos papéis acima. Se nenhum servir, cria-se um papel novo na escala, nunca um tamanho solto no componente.

**The Shell Voice Rule.** Os mundos trocam os títulos e subtítulos. O corpo, os campos, a navegação, os rótulos de botão e a marca "Estudos" (`.brand`) ficam sempre na voz da casca.

**The Data Face Rule.** A monoespaçada só aparece em números e dados, nunca em texto corrido nem como fantasia de "técnico".

## Layout

No desktop a grade tem duas colunas.
- **Lateral:** 15.5rem, sticky e com a altura da tela. Recolhe para 4.5rem e aí mostra só a marca e os círculos dos módulos, com o nome em `title`/`aria-label`. O botão de recolher e o de tema ficam no pé dela.
- **Conteúdo:** centrado até 66rem.

No celular a lateral vira uma barra superior com a marca, e as abas ficam fixas no rodapé.

O cabeçalho do módulo é uma moldura e, logo abaixo, a faixa chapada com o resumo. A órbita decorativa só aparece a partir de `xl`, para não cobrir o título. Os grupos se separam por filete e 4rem.

O miolo de cada grupo muda por mundo:
- **Mapa:** o mapa (até 25rem, sticky) ao lado da tabela.
- **Sacro:** uma grade de nichos de no mínimo 10.5rem.
- **Renascença:** lâminas em 1, 2 ou 3 colunas.

## Elevation & Depth

O sistema é plano, sem sombra de caixa: a profundidade vem do tom e da moldura. Os materiais próprios são:
- o grão de impressão fixo em todo o app (8% no mapa, 11% no sacro e 10% na renascença; invertido e mais fraco no tema claro);
- o halo da cor do fundo atrás dos controles do mapa;
- o degradê escuro sobre a pintura sacra, com um filete dourado por dentro.

### Named Rules
**The Printed Sheet Rule.** Nada flutua. As superfícies se distinguem por tom, moldura de 1px e grão, nunca por sombra projetada.

## Shapes

- **Contêineres:** a moldura tem 1.5rem de raio (cabeçalho e lâmina escura, esta com o canto inferior esquerdo quase reto). O mapa tem 1.25rem e o campo 0.7rem.
- **Cápsulas:** botões, faixa de resumo, atalhos de grupo, selos e o item ativo da navegação.
- **Arco pleno:** exclusivo do sacro, nos nichos, nas imagens de grupo e no ArchMark.
- **Borda rasgada:** exclusiva da renascença, feita por máscara de ruído.

### Named Rules
**The Filling Mark Rule.** O desenho de progresso de cada mundo se completa: vazio, parcial, cheio.
- Mapa: anel com fatia.
- Sacro: arco que se enche de dourado de baixo para cima, sem auréola nem disco atrás.
- Renascença: disco vermelho.

## Components

### Buttons
- Cápsula de borda fina na cor da moldura, fundo transparente, rótulo no letreiro. No hover a borda fica na cor do módulo, com 8% de fundo.
- **Primary:** cor do módulo chapada com `--on-accent`.
- **Ghost:** sem borda até o hover. É também a base dos atalhos de grupo (Barlow, com a marca de progresso e a fração em mono).

### Capa do módulo (provisória, mundo mapa)
Enquanto Profissional, Trabalho, UEM e Repertório não ganham mundo próprio, o cabeçalho deles repete a capa da página inicial (`FilmHeader` em `ModulePage.tsx`, componentes `Film` e `Band` em `components/Cover.tsx`).
- Moldura de 1.5rem de raio, 30rem de altura no celular e 34rem no desktop, sempre escura (troca as tintas localmente, como a página inicial).
- Foto com o filtro de filme, faixa preta vertical com o nome curto na cor do módulo e a contagem de grupos, e etiqueta preta com o nome em Gloock, a tagline e o crédito.
- O letreiro da faixa usa a altura da moldura (`cqh`), não a da tela.
- A faixa de resumo continua logo abaixo. Sai quando o módulo ganhar mundo próprio.

### Faixa de resumo
Cápsula chapada na cor do módulo, embaixo do cabeçalho de todos os mundos. Leva a estrela e o resumo em Space Mono ("N de M itens marcados · % · N em andamento").

### Inputs / Fields
- Superfície com filete de 1px e 0.7rem de raio; no foco, borda na cor do módulo e anel de 3px a 18%.
- **Checklist:** caixa de 1.2rem com 4px de raio; marcada, fica chapada com o visto recortado.

### Navigation
Nenhum círculo na navegação, a pedido do dono em 27/10/2026.
- **Lateral aberta:** a marca é o logo (órbita com a estrela de quatro pontas, na cor do módulo) mais "Estudos" no letreiro.
  - Os itens são só o nome; o ativo é uma cápsula com borda e 10% de fundo na cor do módulo.
  - O botão "Recolher" fica no pé da lateral.
- **Lateral recolhida:** um ícone a traço por módulo (`moduleIcons` em `App.tsx`: banco de dados, maleta, capelo, cruz, livro, sol nascente), na cor dele e sem forma atrás; o ativo ganha um traço de 2px embaixo. Módulo novo precisa de um ícone ali.
- **Celular:** abas só com o nome curto; a ativa tem um traço de 3px na cor do módulo no topo.

### Mapa de percurso (mundo mapa)
- SVG dentro de uma moldura arredondada, com terreno gerado pela semente do grupo.
- Tem o triângulo de largada, a estrela de norte e os controles numerados em mono, sem linha entre eles.
- Passar o mouse acende o controle na tabela e vice-versa.
- Ao abrir a tela, os controles pousam uma vez (650ms; desligado com movimento reduzido).

### Tabela de controles (mundo mapa)
Cada linha tem o número com dois dígitos em mono na cor do módulo, o título em 600, um selo em cápsula mono, os traços, a fração e o círculo de controle.

### Nicho (sacro)
- Moldura em arco, com uma janela em arco por dentro.
- A janela se enche de dourado de baixo para cima conforme o progresso, com a estrela no meio; a estrela escurece quando o dourado passa dela.
- O título vai em Newsreader. Hover e estado em andamento tingem de vinho.

### Lâmina (renascença)
- Moldura de canto redondo com título em Bodoni e disco de 52px.
- Uma em cada duas vira papel sépia rasgado, com as tintas escuras trocadas localmente.

### Traços (Punches)
- Um traço de 3×12px por item do checklist, com 2px de intervalo, como um código de barras.
- Feito fica chapado na cor do módulo; não feito, em tinta de apoio a 45%.
- Acima de 20 itens (40 no tópico) vira porcentagem.

## Do's and Don'ts

### Do:
- **Do** manter a faixa de resumo, a estrela e as molduras em todo mundo novo: são o que liga os mundos à casca.
- **Do** criar módulo novo escolhendo um `world` existente e um par de cores de `--accent` (escuro e claro).
- **Do** usar os neutros `--*-base` e deixar o `.app` misturar a cor do módulo.
- **Do** creditar toda obra de arte com autor, título e data, ligada à fonte, e empacotar a imagem no app.

### Don't:
- **Don't** usar barra de progresso, sombra projetada ou cartões aninhados.
- **Don't** pôr círculo, auréola ou disco atrás do progresso no sacro (pedido do dono em 27/10/2026).
- **Don't** desenhar linha ou seta ligando tópicos, nem sugerir sequência obrigatória.
- **Don't** usar vermelho de alerta, contagem de dias ou "atrasado"; `--danger` é só para excluir.
- **Don't** levar o arco do sacro ou a borda rasgada da renascença para outro mundo.
- **Don't** usar a monoespaçada fora de números e dados.
