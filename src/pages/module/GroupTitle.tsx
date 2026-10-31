// Níveis do Profissional ("Bronze: fundação"...) ganham a cor do metal; os outros grupos não têm nível.
const tierOf = (title: string) => /^(bronze|prata|ouro)[: ]/i.exec(title)?.[1].toLowerCase()

// Título do grupo com só a palavra do nível pintada na cor do metal
export function GroupTitle({ title }: { title: string }) {
  const tier = tierOf(title)
  if (!tier) return <>{title}</>
  return (
    <>
      <span className="tier-word" data-tier={tier}>
        {title.slice(0, tier.length)}
      </span>
      {title.slice(tier.length)}
    </>
  )
}
