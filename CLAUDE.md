# Estudos (app pessoal)

App de uso pessoal para organizar estudos, em módulos. Mantido pelo Claude; o dono não acompanha o código e usa o app no PC e no celular.

## Stack
React + TypeScript + Vite + Tailwind v4 + Dexie (IndexedDB, local-first) + vite-plugin-pwa. Roteamento com HashRouter.
Fontes locais (Newsreader para títulos, Schibsted Grotesk para o corpo) via `@fontsource-variable`, para funcionar offline.

## Modelo de dados (`src/core/db.ts`)
Um modelo só para todos os módulos: módulo > grupo (etapa, disciplina, assunto...) > tópico > checklist, materiais, sessões.
- `groups`, `topics`, `checks` (checklist, agrupado por `section`), `resources` (links, vídeos do YouTube e arquivos em Blob), `sessions`, `meta`.
- Vídeo do YouTube é guardado só pelo id (`kind: 'youtube'`); link comum guarda o endereço; arquivo guarda o Blob.
- Dexie v1 era o protótipo (`pessoal_*`); v2 migra para o modelo atual; v3 remove as tabelas antigas.

## Módulos (`src/core/modules.ts`)
profissional, trabalho, uem, igreja, cultura, mental. As telas são as mesmas para todos (`pages/ModulePage.tsx` e `pages/TopicPage.tsx`).
Para criar um módulo: adicione em `modules.ts`, uma cor em `src/index.css` (`[data-module='x']`, tema escuro e claro) e o conteúdo em `src/data/content/`.
Cada módulo tem a sua cor de marca-texto; o tema padrão é escuro, com alternância para claro.

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
`npm run dev`, `npm run build`, `npm run lint`. O Node foi instalado via winget; no shell Bash o `npm` não está no PATH, use o PowerShell (atualize o PATH se não achar).
Ao gravar arquivos com PowerShell 5.1, não use `Set-Content -Encoding utf8` (grava BOM e quebra o `package.json`); use `[System.IO.File]::WriteAllText` com `UTF8Encoding($false)` ou as ferramentas de edição.
Não suba o servidor na porta 5173 em testes: o dono costuma deixar o dele rodando lá. Use outra porta e encerre depois.

## Decisões / pendências
- Dados só locais, por aparelho. Sincronizar PC e celular (Supabase) é a próxima grande etapa; anexos hoje só existem no aparelho onde foram adicionados.
- Cultura: pedir ao dono suas referências (gostos, livros, séries, temas) e refinar o módulo. O lembrete está no próprio módulo.
- Igreja: os cursos do Padre Paulo Ricardo estão linkados pela lista do site; só dois aparecem como gratuitos. Confirmar quais exigem assinatura.
- Conteúdo da UEM ainda será inserido pelo dono, disciplina a disciplina (Estrutura de Dados já veio do Notion).
- Esta pasta fica dentro do vault do Obsidian: não alterar notas do vault (ver ../../CLAUDE.md). `_arquivo/` guarda arquivos antigos movidos em vez de apagados e está no .gitignore.
