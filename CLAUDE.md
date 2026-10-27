# Estudos (app pessoal)

App de uso pessoal para organizar estudos, em módulos. Mantido pelo Claude; o dono não acompanha o código.

## Stack
React + TypeScript + Vite + Tailwind v4 + Dexie (IndexedDB, local-first) + vite-plugin-pwa. Roteamento com HashRouter.

## Estrutura
- `src/core/db.ts`: banco Dexie. Tabelas prefixadas por módulo (`pessoal_*`).
- `src/core/modules.ts`: registro de módulos. Para criar um novo (UEM, trabalho, igreja), crie `src/modules/<id>/` e registre aqui.
- `src/modules/pessoal/`: módulo de estudos pessoais (temas, tarefas, sessões, anotações).

## Comandos
`npm run dev`, `npm run build`, `npm run lint`. Node instalado via winget; em shells novos, atualize o PATH se `npm` não for encontrado.

## Decisões / pendências
- Dados só locais por enquanto; sincronizar com o celular (Supabase) é a próxima grande etapa.
- Esta pasta fica dentro do vault do Obsidian: não alterar notas do vault (ver ../../CLAUDE.md).
