import { cultura } from './cultura.ts'
import type { ModuleContent } from './helpers.ts'
import { igreja } from './igreja.ts'
import { mental } from './mental.ts'
import { profissional } from './profissional.ts'
import { trabalho } from './trabalho.ts'
import { uem } from './uem.ts'

// Suba este número sempre que mexer nos arquivos desta pasta: o app aplica de novo o que ainda não existe
// no banco de cada aparelho (grupos, tópicos e links novos). Nada que foi editado é sobrescrito.
export const CONTENT_VERSION = 4

export const contentModules: ModuleContent[] = [profissional, trabalho, uem, igreja, cultura, mental]
