---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["src/pages/ModulePage.tsx","src/pages/TopicPage.tsx"]
---

# Superfície: app inteiro (shell, módulo, tópico)

Modo: Operate. Usuário único estudando no PC à noite, luz baixa. Tarefa: abrir um módulo, ver o progresso, entrar em qualquer tópico e marcar o checklist. Os conteúdos NÃO são sequenciais: ele estuda o primeiro e o último no mesmo dia. O dono gostou da direção por não ser minimalista. Restrições fixadas pelo dono: tema escuro como padrão, cor própria por módulo. Evitar: parecer brinquedo, parecer planilha fria. Logo do livro pode mudar.

## Direction contract

THESIS: Cada módulo é uma prova de orientação por pontuação (score-O): cada grupo é um mapa, cada tópico um ponto de controle numerado espalhado nele, visitado em qualquer ordem e sobreimpresso na cor do módulo. Recusa o painel escuro de cartões arredondados, barras de progresso e brilho neon, e recusa impor uma sequência.

OWN-WORLD: Terreno noturno chapado verde-preto; no mapa de cada grupo, curvas de nível marrons, manchas de vegetação oliva e campo aberto amarelo apagado (tintas ISOM traduzidas para o escuro), nunca atrás de texto corrido; tinta de legenda cor de osso. A cor do módulo é a tinta de sobreimpressão: traço do percurso, círculos de controle, triângulo de largada, item ativo; sem linha ligando controles. Títulos e números de controle em grotesca condensada caixa alta; corpo em grotesca de sinalização. Sem cartões: filetes de 1px e a tabela de descrição dos controles. Estado pelo desenho: controle picotado = círculo cheio, em andamento = círculo com arco, não iniciado = círculo vazio. No claro, papel de mapa branco com contornos marrons.

STORY: Ele abre o módulo, vê cada mapa com os controles picotados, os em andamento e os livres; clica em qualquer controle (no mapa ou na tabela) e vai ao tópico, onde o checklist são os picotes daquele controle.

FIRST VIEWPORT: Lateral de 248px em terreno mais escuro: marca com símbolo de largada, módulos com círculo de controle (o ativo cheio na sua cor). Principal: H1 condensado caixa alta ~56px, linha de resumo (itens, %, controles em andamento). Cada grupo abre com seu mapa (mesma escala em todos): terreno, triângulo de largada, controles numerados em posições fixas, todos clicáveis, estado pelo desenho. Ao lado/abaixo, a tabela de descrição dos controles. Ação principal: clicar num controle.

FORM: Percurso de orientação (desafiante escolhido pelo dono no lugar do item 6 sorteado). seed:49a7dfad25181d1a. Assinatura: passar o mouse numa linha da tabela acende o controle no mapa e vice-versa; ao abrir, os controles pousam no mapa uma vez.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
