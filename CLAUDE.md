# Estudos (app pessoal)

App de uso pessoal para organizar estudos, em módulos. Mantido pelo Claude; o dono não acompanha o código e usa o app no PC e no celular.

## Stack
React + TypeScript + Vite + Tailwind v4 + Dexie (IndexedDB, local-first) + vite-plugin-pwa. Roteamento com HashRouter.
Fontes locais via `@fontsource` e `@fontsource-variable`, para funcionar offline: Barlow (corpo), Big Shoulders Display (títulos e botões) e Space Mono (números) em todo o app; Gloock e Archivo Narrow na página inicial e na marca "Estudos" da lateral; `src/fonts.d.ts` declara o pacote da Big Shoulders, que não traz tipos; Young Serif e Newsreader itálico no mundo sacro, com Cinzel Decorative no título; Noto Serif Display condensada (eixo wdth), Cormorant Garamond e Montserrat no mundo renascença; Bagel Fat One (psico); Noto Serif Display condensada no título da UEM (eva); Anton e Special Elite (office). O PWA guarda fontes e imagens no cache (`workbox.globPatterns` em `vite.config.ts`).

## Modelo de dados (`src/core/db.ts`)
Um modelo só para todos os módulos: módulo > grupo (etapa, disciplina, assunto...) > tópico > checklist, materiais, sessões.
- `groups`, `topics`, `checks` (checklist, agrupado por `section`), `resources` (links, vídeos do YouTube e arquivos em Blob), `sessions`, `meta`.
- Vídeo do YouTube é guardado só pelo id (`kind: 'youtube'`); link comum guarda o endereço; arquivo guarda o Blob.
- Dexie v1 era o protótipo (`pessoal_*`); v2 migra para o modelo atual; v3 remove as tabelas antigas.

## Módulos (`src/core/modules.ts`)
profissional, trabalho, uem, igreja, cultura, mental. Os ids `cultura` e `mental` aparecem na tela como Repertório e Motivação (renomeados em 27/10/2026; o id ficou para não perder dados salvos). As telas são as mesmas para todos (`pages/ModulePage.tsx` e `pages/TopicPage.tsx`).
Para criar um módulo: adicione em `modules.ts` (com o `world`), uma cor em `src/index.css` (`[data-module='x']`, tema escuro e claro) e o conteúdo em `src/data/content/`.
Cada módulo tem a sua cor, e `.app` mistura essa cor no fundo e tinge a lateral (`--*-base` são os neutros). O tema padrão é escuro, com alternância para claro.

## Visual: cartaz analógico + um mundo por módulo
Mundo por módulo decidido com o dono em 27/10/2026 (ver `.impeccable/surfaces/src-app-tsx.md`); no mesmo dia ele pediu a casca "analógica/indie/antiga" das referências soltas em `../refs/` (capas de disco e pôsteres retrô de ficção científica). Detalhes em `DESIGN.md`.
- Casca comum a todos os mundos: preto quente com grão de impressão, tinta creme, molduras finas de canto arredondado (`.frame`), botões em cápsula, estrela de quatro pontas como glifo (`Sparkle`, `Orbit` em `components/Marks.tsx`), faixa chapada com o resumo embaixo do cabeçalho (`.strip`), letreiro Big Shoulders Display e Space Mono só para números.
- Lateral recolhível no desktop (`useRail` em `App.tsx`, guardada em `estudos:rail`).
- Página inicial (`/`, `pages/HomePage.tsx`): capa de disco com foto de montanha em filtro de filme analógico e, rolando, um banner por módulo que cresce até a tela cheia. Referência `../refs/c564aeb767c39bbc03d14bd03b530fc1.jpg`. Fontes da capa: Gloock (letreiro) e Archivo Narrow (letra miúda). Fotos em `src/assets/paisagens/`, todas CC0 do Wikimedia Commons, com crédito em `landscapes` (`data/art.ts`). Módulo novo precisa de uma foto ali, senão o banner fica sem imagem. Fotos alternativas já verificadas em `../refs/paisagens/`.
- Provisório (pedido do dono em 27/10/2026): módulos do mundo `mapa` que têm foto em `landscapes` abrem com a capa da página inicial como cabeçalho (`FilmHeader` em `ModulePage.tsx`, `.cover` em `index.css`; `Film` e `Band` em `components/Cover.tsx`). Sai quando o módulo ganhar um mundo próprio.
- Temas por cima do mapa (27/10/2026, refs em `../refs/estudos pessoais/`, `../refs/facul.uem/`, `../refs/trabalho/`): mesma estrutura do `mapa` (mapa de orientação + tabela de controles), outra pele. Cores e fontes em `index.css` (`[data-world=...]`), regras dos componentes em `src/worlds.css`, cabeçalhos em `components/Worlds.tsx`, marcadores em `Marks.tsx`. Kanji do eva usa fonte do sistema.
  - `psico` (Profissional): pôster psicodélico de OVNI, violeta, tomate, mostarda e moldura rosa-choque; olho como marcador; o Concorde da referência atravessa o cabeçalho com rastro de luz (`PlaneTrail`). Só a palavra Bronze/Prata/Ouro do título da etapa leva a cor do metal (`GroupTitle` em `ModulePage.tsx`). Sem prazo, critério de saída nem introdução (`hideGroupMeta`; o dado continua no banco). Claro = papel creme.
  - `eva` (UEM): Evangelion, preto arroxeado com hexágonos, alerta vermelho, kanji; cabeçalho em grade com barra "SYNC RATE" do progresso; hexágono como marcador. Claro = verde-menta.
  - `office` (Trabalho, era `tech` até 27/10/2026): pôster de The Office em papel pardo, placa da porta (ícone `office` em `Icon.tsx`, também na lateral recolhida), carimbo e os cinco retratos recortados do pôster (`src/assets/trabalho/face-*.jpg`); retícula colorida como painel. O grupo de Scrum saiu a pedido do dono (CONTENT_VERSION 4 apaga o grupo uma vez em `seed.ts`).
  - No lugar do mapa de cada grupo, um painel clicável (`components/ThemeBoard.tsx`): favo de hexágonos "SYNC RATE" (eva), mural de papel pardo (office), céu de olhos que piscam (psico).
- Fundo temático (`components/ThemeBackdrop.tsx`, imagens e modo em `data/backdrops.ts`): imagens fixas atrás da página do módulo e dos tópicos, apagadas pelo CSS (`.tbg` em `worlds.css`) para o texto seguir legível. Modo `scroll` (UEM, Trabalho, Profissional, Repertório, Motivação): a cada ~uma tela rolada a próxima entra atrás de uma linha de varredura. Modo `section` (Igreja): a imagem segue o assunto que está na tela (Maria, São Miguel, Cristo, São Miguel de armadura) com esmaecimento. Com "reduzir movimento" ligado, fica parado.
- Visão geral (`overview` em `modules.ts`, UEM e Repertório): todos os grupos em cartões de altura igual, com rolagem própria e a contagem por tipo de material (vídeos, links, arquivos). O Repertório divide os cartões em "Por tema" e "Por formato" (`sections`).
- Os cabeçalhos FilmHeader (capa provisória) seguem só no Repertório.
- `mapa` (padrão agora só o Repertório): prova de orientação por pontuação impressa em duas cores. Cada grupo tem um mapa (`components/CourseMap.tsx`, terreno gerado por `core/terrain.ts` com o id do grupo como semente) e a tabela de controles. Os tópicos NÃO são sequenciais: sem linha ligando controles, todos clicáveis em qualquer ordem.
- `sacro` (Igreja, sem a faixa de resumo no topo: `hideSummary`): manuscrito medieval, couro marrom escuro e dourado. Pintura no topo com filete dourado, nichos em arco que se enchem de dourado de baixo para cima. O dono pediu SEM círculos atrás (nada de auréola ou disco).
- `renascenca` (Mental): colagem renascentista. Papel rasgado (máscara `.torn`), Bodoni, disco vermelho como progresso.
- O progresso é um desenho que se completa (`components/Marks.tsx`: anel de controle, arco dourado ou disco). Um traço de código de barras por item do checklist.
- Pinturas em `src/assets/<módulo>/`, todas de domínio público do Wikimedia Commons, com crédito e link em `src/data/art.ts` (e origem gravada no próprio arquivo). Grupo novo fica sem pintura até alguém escolher uma.
- Referências do dono em `../refs/` (casca) e `../refs/<módulo>/`. Os módulos sem referência própria ficam no mundo `mapa`.
- A logo (`components/Logo.tsx`) é um selo antigo, estrela de bússola dentro de um mostrador com marcas de régua (27/10/2026); antes era a estrela de quatro pontas dentro de uma órbita, que segue, na cor do módulo; `public/favicon.svg` e os PNGs do PWA usam a mesma forma em verde (PNGs renderizados a partir do SVG).

## Conteúdo pré-carregado (`src/data/content/` e `src/core/seed.ts`)
- `data/roadmap.ts`: roadmap importado do `roadmap.pdf` (Engenharia de Dados + IA). Carga única (`seed:v1`).
- `data/content/*.ts`: links, módulos e planos. Carregador idempotente: cria o que falta (grupo e tópico por título) e adiciona links novos; NUNCA sobrescreve o que o dono editou.
- **Sempre que mexer em `data/content/`, suba `CONTENT_VERSION` em `data/content/index.ts`** para o app reaplicar nos aparelhos que já têm dados.
- Títulos de etapa e de tópico em `content/profissional.ts` precisam bater com os de `roadmap.ts`; se não baterem, cria um tópico novo.
- UEM foi importado do Notion (UEM > Disciplinas) em 26/10/2026. Faltas e nota são uma foto desse dia.

## Regras para escolher links
- Nunca inventar URL nem id de vídeo. Buscar na web e **verificar**: YouTube pelo oEmbed (confirma que existe e mostra o título/autor reais), o resto por HTTP. Em 26/10/2026, 198 links verificados; só LeetCode e Linux Journey respondem 403 a robôs, mas abrem para pessoas.
- Conferir o idioma real pelo título/autor do oEmbed (já aconteceu de um vídeo "de Angular" ser em espanhol). Português primeiro; inglês só se for didático, marcado com "(EN)".
- Vídeos não foram assistidos pelo Claude. Descrição de curso só quando o site informou; senão, texto neutro.

## Comandos
`npm run dev`, `npm run build`, `npm run lint`. No Linux o Node está em `~/.local/node/bin` e o `npm` funciona no Bash. No Windows o Node foi instalado via winget; lá o `npm` não está no PATH do Bash, use o PowerShell.
Ao gravar arquivos com PowerShell 5.1, não use `Set-Content -Encoding utf8` (grava BOM e quebra o `package.json`); use `[System.IO.File]::WriteAllText` com `UTF8Encoding($false)` ou as ferramentas de edição.
Não suba o servidor na porta 5173 em testes: o dono costuma deixar o dele rodando lá. Use outra porta e encerre depois.

## Decisões / pendências
- Dados só locais, por aparelho. Sincronizar PC e celular (Supabase) é a próxima grande etapa; anexos hoje só existem no aparelho onde foram adicionados.
- Repertório (id `cultura`): o dono mandou as referências em 27/10/2026 (newsletters sobre saúde, mente, comportamento e IA, além de documentários). Os grupos genéricos antigos (podcasts, séries, canais, literatura e fé) continuam no arquivo; o lembrete saiu.
- Visual: Repertório ainda espera referências do dono para ganhar um mundo próprio (por enquanto só o fundo de praias).
- Igreja: os cursos do Padre Paulo Ricardo estão linkados pela lista do site; só dois aparecem como gratuitos. Confirmar quais exigem assinatura.
- Conteúdo da UEM ainda será inserido pelo dono, disciplina a disciplina (Estrutura de Dados já veio do Notion).
- Esta pasta fica dentro do vault do Obsidian: não alterar notas do vault (ver ../../CLAUDE.md). `_arquivo/` guarda arquivos antigos movidos em vez de apagados e está no .gitignore.
