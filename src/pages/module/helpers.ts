import type { ResourceKind } from '../../core/db'

export type Kinds = Map<number, Partial<Record<ResourceKind, number>>>
const kindNames: Record<ResourceKind, [string, string]> = {
  youtube: ['vídeo', 'vídeos'],
  link: ['link', 'links'],
  file: ['arquivo', 'arquivos'],
}
// "2 vídeos · 1 link": o que tem dentro, por tipo de material
export function kindSummary(k?: Partial<Record<ResourceKind, number>>) {
  const parts: string[] = []
  for (const key of Object.keys(kindNames) as ResourceKind[]) {
    const n = k?.[key] ?? 0
    if (n) parts.push(`${n} ${kindNames[key][n === 1 ? 0 : 1]}`)
  }
  return parts.join(' · ')
}

// Com checklist mostra a fração; sem checklist, quantos materiais o tópico tem.
export const contents = (n = 0) => (n === 0 ? 'vazio' : `${n} ${n === 1 ? 'material' : 'materiais'}`)

