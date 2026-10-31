import { Link, useNavigate } from 'react-router-dom'
import { alienTurnIn } from '../../components/worlds/alienTurnIn'
import { Film } from '../../components/worlds/Cover'
import { Gethsemane } from '../../components/worlds/Gethsemane'
import { Icon } from '../../components/ui/Icon'
import { BannerBackdrop } from '../../components/worlds/BannerBackdrop'
import { UemLogo } from '../../components/worlds/headers'
import type { AppModule } from '../../core/modules'
import { sumProgress, type Progress } from '../../core/queries'
import { bannerFor, landscapes, type Artwork } from '../../data/art'
import { Barcode } from './Barcode'
import { rememberModule } from './scroll'
import { expandInto, flyIn, whiteOut } from './transitions'

export function Credit({ art }: { art: Artwork }) {
  return (
    <p className="fine mt-5 text-ink-3">
      <a href={art.source} target="_blank" rel="noopener noreferrer" className="hover:text-ink credit">
        Foto: {art.credit}
      </a>
    </p>
  )
}

// Cada módulo é uma "capa" que cresce até ocupar a tela conforme a página desce.
export function ModuleBanner({ mod, side, groups, topics }: { mod: AppModule; side: 'left' | 'right'; groups: { title: string; p: Progress }[]; topics: Progress[] }) {
  const navigate = useNavigate()
  const art = bannerFor(mod.id)
  const p = sumProgress(topics)
  const themed = mod.world !== 'mapa' && mod.world !== 'sacro'
  const open = () => {
    rememberModule(mod.id)
    navigate(`/${mod.id}`)
  }
  return (
    <section id={`mod-${mod.id}`} data-module={mod.id} data-side={side} className={`banner ${themed ? `banner-${mod.world}` : ''}`} aria-labelledby={`bn-${mod.id}`}>
      <div className="banner-frame">
        {themed ? (
          <BannerBackdrop world={mod.world} />
        ) : mod.id === 'igreja' ? (
          <>
            <Gethsemane fy={0.28} className="gth-banner" />
            <span className="film-fade" aria-hidden="true" />
          </>
        ) : (
          art && <Film art={art} />
        )}
        <div className="pane">
          <h2 id={`bn-${mod.id}`} className="gloock-text text-cover leading-tight">
            {mod.world === 'eva' ? (
              <>
                <span className="sr-only">{mod.label}</span>
                <UemLogo />
              </>
            ) : (
              mod.label
            )}
          </h2>
          <p className="mt-2 text-ink-2">{mod.tagline}</p>
          {groups.length > 0 && (
            <ul className="fine mt-5 space-y-1.5 border-t border-[#3a352d] pt-4">
              {groups.slice(0, 6).map((g, i) => (
                <li key={g.title} className={`flex justify-between gap-6 ${i >= 3 ? 'max-md:hidden' : ''}`}>
                  <span className="truncate">{g.title}</span>
                  {g.p.total > 0 && (
                    <span className="mono shrink-0 tracking-normal text-accent">
                      {g.p.done}/{g.p.total}
                    </span>
                  )}
                </li>
              ))}
              {groups.length > 3 && (
                <li className="text-ink-3 md:hidden">e mais {groups.length - 3}</li>
              )}
              {groups.length > 6 && <li className="text-ink-3 max-md:hidden">e mais {groups.length - 6}</li>}
            </ul>
          )}
          {topics.length > 0 && (
            <div className="mt-5">
              <Barcode items={topics} p={p} />
            </div>
          )}
          <Link
            to={`/${mod.id}`}
            className="btn btn-primary mt-6 self-start"
            onClick={(e) => (mod.world === 'bebop' ? flyIn(e, open) : mod.world === 'office' ? whiteOut(e, open) : mod.world === 'neural' ? alienTurnIn(e, open) : expandInto(e, open))}
          >
            Abrir {mod.short}
            <Icon name="chevron" size={16} />
          </Link>
          {art && !themed && (
            <p className="fine mt-5 text-ink-3">
              {art.source ? (
                <a href={art.source} target="_blank" rel="noopener noreferrer" className="hover:text-ink credit">
                  {landscapes[mod.id] ? 'Foto' : 'Obra'}: {art.credit}
                </a>
              ) : (
                <>Obra: {art.credit}</>
              )}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
