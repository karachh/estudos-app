# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

PWA instalável (vite-plugin-pwa), usado no PC e no celular. O uso principal é no PC.

## Users

Um usuário só: o dono, estudante de Engenharia de Software (foco em Engenharia de Dados e IA) que trabalha como analista técnico com SQL e dados georreferenciados. Ainda iniciante em boa parte da tecnologia.

Situação principal: sessão de estudo no PC. Ele abre um tópico, usa os links e vídeos dali, anota e marca o checklist. O celular é secundário.

O dono não acompanha o código; o Claude mantém o app.

## Product Purpose

Organizar todos os estudos da vida dele num lugar só, separados em módulos (Profissional, Trabalho, UEM, Igreja, Repertório e Motivação; os ids internos continuam `cultura` e `mental`).

Sucesso, nas palavras dele:
- **Tudo num lugar só**: links, vídeos, arquivos e anotações juntos, sem caçar em vários apps.
- **Ver o progresso**: enxergar quanto já andou em cada etapa ou disciplina.
- **Saber o próximo passo**: abrir e já saber o que estudar agora, sem decidir do zero.

## Positioning

Não é um app de produtividade genérico nem um curso. É um caderno pessoal pré-carregado: o roadmap de Engenharia de Dados + IA, as disciplinas da UEM e listas de links curadas e verificadas já vêm dentro, e o dono só edita por cima. O conteúdo carregado nunca sobrescreve o que ele mudou.

## Operating Context

- Um modelo para todos os módulos: módulo > grupo (etapa, disciplina, assunto...) > tópico > checklist, materiais e sessões. Cada módulo dá seu próprio nome ao grupo e ao tópico.
- Materiais: links, vídeos do YouTube (guardados pelo id) e arquivos anexados.
- O roadmap profissional veio de `roadmap.pdf`; a UEM veio do Notion em 26/10/2026.
- Ao lado do app ficam o vault do Obsidian (anotações) e o Notion antigo; o app não substitui as notas do vault.

## Capabilities and Constraints

- Local-first: dados no IndexedDB (Dexie), por aparelho. Funciona offline, inclusive as fontes.
- Sem login e sem sincronização por enquanto. Sincronizar PC e celular (Supabase) é a próxima grande etapa; anexos hoje só existem no aparelho em que foram adicionados.
- Interface toda em português.
- Links nunca são inventados: cada URL e vídeo é verificado antes de entrar. Português primeiro; inglês só se for didático, marcado "(EN)".
- Em aberto: confirmar quais cursos da Igreja exigem assinatura; o dono ainda vai inserir o resto do conteúdo da UEM.

## Brand Commitments

- Nome: "Estudos".
- Logo: estrela de quatro pontas dentro de uma órbita, na cor do módulo (`src/components/Logo.tsx`, `public/favicon.svg`, ícones do PWA).
- Cada módulo tem a sua cor, e essa cor tinge o app quando ele está aberto.
- Cada módulo pode ter um mundo visual próprio, guiado pelas referências do dono (Igreja: manuscrito medieval; Motivação: colagem renascentista). Os demais usam o mapa de orientação e, por enquanto, abrem com a capa da página inicial.
- Conteúdo não é sequencial: nada no visual impõe ordem entre tópicos.
- Tema escuro por padrão, com opção de claro.

## Evidence on Hand

- Conteúdo real: `src/data/roadmap.ts` e `src/data/content/*.ts` (198 links verificados em 26/10/2026).
- Não há usuários além do dono, nem depoimentos ou métricas. Não inventar.

## Product Principles

1. **Sem cobrança.** Nada de sequência de dias, "atrasado" em vermelho, culpa ou pressão. O app mostra o caminho e o progresso; não cobra.
2. **O próximo passo à vista.** Abrir um módulo deve deixar claro o que estudar agora, sem o dono ter que decidir do zero.
3. **Progresso honesto.** O avanço vem do que ele marcou, e aparece por etapa ou disciplina.
4. **Tudo do tópico no tópico.** Material, checklist e anotação de um assunto ficam juntos; nada de mandar o dono para outro lugar procurar.
5. **O que ele editou é dele.** Conteúdo pré-carregado só acrescenta; nunca apaga nem sobrescreve.
