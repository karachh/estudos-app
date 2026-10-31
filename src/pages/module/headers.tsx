import { Film } from '../../components/worlds/Cover'
import { Gethsemane } from '../../components/worlds/Gethsemane'
import { Orbit } from '../../components/ui/Marks'
import { BebopHeader, EvaHeader, FosforoHeader, NeuralHeader, OfficeHeader } from '../../components/worlds/headers'
import type { AppModule } from '../../core/modules'
import { covers, landscapes } from '../../data/art'

const WORLD_HEADERS = { fosforo: FosforoHeader, bebop: BebopHeader, eva: EvaHeader, office: OfficeHeader, neural: NeuralHeader }

// Cabeçalho do módulo: cada mundo tem o seu; quem está no mapa usa a capa da página inicial, se tiver foto
export function ModuleHeader({ mod, groupCount, pct }: { mod: AppModule; groupCount: number; pct: number }) {
  if (mod.world === 'sacro') return <SacredHeader mod={mod} />
  if (mod.world !== 'mapa') {
    const Header = WORLD_HEADERS[mod.world]
    return (
      <header>
        <Header mod={mod} groupCount={groupCount} pct={pct} />
      </header>
    )
  }
  if (landscapes[mod.id]) return <FilmHeader mod={mod} />
  return (
    <header>
      <div className="frame relative overflow-hidden px-6 pb-7 pt-10 md:px-10 md:pt-14">
        <Orbit className="pointer-events-none absolute right-6 top-1/2 hidden w-60 -translate-y-1/2 text-accent xl:block" />
        <h1 className="display relative max-w-[12ch] text-display">{mod.label}</h1>
        <p className="relative mt-4 max-w-[34rem] text-lg text-ink-2">{mod.tagline}</p>
      </div>
    </header>
  )
}

function SacredHeader({ mod }: { mod: AppModule }) {
  const igrejaCover = covers[mod.id]
  return (
    <header>
    <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0c0a08]">
      {/* No desktop a pintura fica à direita, para o rosto de Cristo não ficar atrás do título */}
      <Gethsemane fy={0.22} className="gth-head" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,9,5,.94)_0%,rgba(14,9,5,.6)_40%,rgba(14,9,5,.05)_75%)] md:bg-[linear-gradient(90deg,rgba(14,9,5,.94)_0%,rgba(14,9,5,.7)_38%,rgba(14,9,5,.05)_62%)]" />
      {/* Filete dourado por dentro, como a moldura de um painel */}
      <div className="pointer-events-none absolute inset-2.5 rounded-[1.1rem] border border-[color-mix(in_oklab,var(--accent)_55%,transparent)]" />
      <div className="relative flex min-h-[23rem] flex-col justify-end px-6 pb-7 pt-14 text-[#f0e7cf] md:min-h-[26rem] md:px-10">
        <h1 className="cinzel relative self-start leading-[0.95]">
          {mod.label}
        </h1>
        <p className="italic-serif mt-3 max-w-[26rem] text-lead leading-snug">{mod.tagline}</p>
        <p className="mt-6 text-xs text-[#c9bf9f]">
          {igrejaCover.source ? (
            <a href={igrejaCover.source} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline credit">
              {igrejaCover.credit}
            </a>
          ) : (
            igrejaCover.credit
          )}
        </p>
      </div>
    </div>
    </header>
  )
}

// Provisório, até o módulo ganhar um mundo próprio: o cabeçalho repete a capa dele na página inicial.
function FilmHeader({ mod }: { mod: AppModule }) {
  const art = landscapes[mod.id]
  return (
    <header>
      <div className="cover">
        <Film art={art} eager />
        <div className="sticker">
          <h1 className="gloock-text text-cover leading-tight">{mod.label}</h1>
          <p className="mt-2 text-ink-2">{mod.tagline}</p>
          <p className="fine mt-4 text-ink-3">
            <a href={art.source} target="_blank" rel="noopener noreferrer" className="hover:text-ink credit">
              Foto: {art.credit}
            </a>
          </p>
        </div>
      </div>
    </header>
  )
}
