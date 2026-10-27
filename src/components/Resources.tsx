import { useLiveQuery } from 'dexie-react-hooks'
import { useRef, useState, type FormEvent } from 'react'
import { db, type Resource } from '../core/db'
import { Icon } from './Icon'

function parseUrl(raw: string): URL | null {
  const value = raw.trim()
  if (!value) return null
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value}`)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url : null
  } catch {
    return null
  }
}

function youtubeId(url: URL): string | null {
  if (url.hostname === 'youtu.be') return url.pathname.slice(1) || null
  if (url.hostname.endsWith('youtube.com')) {
    if (url.pathname === '/watch') return url.searchParams.get('v')
    return url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)?.[1] ?? null
  }
  return null
}

const formatSize = (bytes: number) =>
  bytes >= 1_048_576 ? `${(bytes / 1_048_576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`

function openFile(r: Resource) {
  if (!r.file) return
  const url = URL.createObjectURL(r.file)
  window.open(url, '_blank', 'noopener')
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

function YouTubeCard({ resource }: { resource: Resource }) {
  const [playing, setPlaying] = useState(false)
  const id = resource.url
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="relative aspect-video bg-raised">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={resource.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            className="group absolute inset-0 grid place-items-center"
            onClick={() => setPlaying(true)}
            aria-label={`Reproduzir: ${resource.title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80"
              loading="lazy"
            />
            <span className="relative grid h-14 w-14 place-items-center rounded-full bg-accent text-on-accent">
              <Icon name="play" size={24} />
            </span>
          </button>
        )}
      </div>
      <p className="px-3 py-2 text-sm text-ink-2">{resource.title}</p>
    </div>
  )
}

export function Resources({ topicId }: { topicId: number }) {
  const resources = useLiveQuery(() => db.resources.where('topicId').equals(topicId).sortBy('createdAt'), [topicId])
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)

  async function addLink(e: FormEvent) {
    e.preventDefault()
    const parsed = parseUrl(url)
    if (!parsed) {
      setError('Cole um endereço que comece com http:// ou https://.')
      return
    }
    setError('')
    const yt = youtubeId(parsed)
    await db.resources.add({
      topicId,
      kind: yt ? 'youtube' : 'link',
      title: title.trim() || (yt ? 'Vídeo do YouTube' : parsed.hostname.replace(/^www\./, '')),
      url: yt ?? parsed.href,
      createdAt: Date.now(),
    })
    setUrl('')
    setTitle('')
  }

  async function addFiles(files: FileList | null) {
    if (!files) return
    for (const file of Array.from(files)) {
      await db.resources.add({
        topicId,
        kind: 'file',
        title: file.name,
        url: '',
        file,
        fileName: file.name,
        createdAt: Date.now(),
      })
    }
    if (fileInput.current) fileInput.current.value = ''
  }

  const videos = resources?.filter((r) => r.kind === 'youtube') ?? []
  const others = resources?.filter((r) => r.kind !== 'youtube') ?? []

  return (
    <div className="space-y-4">
      {videos.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {videos.map((r) => (
            <div key={r.id} className="relative">
              <YouTubeCard resource={r} />
              <button
                className="btn-ghost absolute right-1.5 top-1.5 rounded bg-bg/70 p-1 text-ink-2 hover:text-danger"
                onClick={() => db.resources.delete(r.id)}
                aria-label={`Remover: ${r.title}`}
              >
                <Icon name="x" size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      {others.length > 0 && (
        <ul>
          {others.map((r) => (
            <li key={r.id} className="flex items-center gap-3 border-t border-line py-2.5 first:border-t-0">
              <span className="text-ink-3">
                <Icon name={r.kind === 'file' ? 'clip' : 'link'} />
              </span>
              {r.kind === 'link' ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 flex-1 truncate underline decoration-line underline-offset-4 hover:decoration-accent"
                >
                  {r.title}
                  <span className="ml-2 text-sm text-ink-3">{new URL(r.url).hostname.replace(/^www\./, '')}</span>
                </a>
              ) : (
                <button
                  onClick={() => openFile(r)}
                  className="min-w-0 flex-1 truncate text-left underline decoration-line underline-offset-4 hover:decoration-accent"
                >
                  {r.title}
                  {r.file && <span className="ml-2 text-sm text-ink-3">{formatSize(r.file.size)}</span>}
                </button>
              )}
              <button
                className="btn-ghost rounded p-1 text-ink-3 hover:text-danger"
                onClick={() => db.resources.delete(r.id)}
                aria-label={`Remover: ${r.title}`}
              >
                <Icon name="x" size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {resources?.length === 0 && (
        <p className="text-ink-3">Nenhum material ainda. Cole o link do site ou do vídeo que você vai usar, ou anexe um arquivo.</p>
      )}

      <form onSubmit={addLink} className="grid gap-2 sm:grid-cols-[1fr_12rem_auto]">
        <input
          className="field"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Link do site ou do YouTube"
          aria-label="Link do site ou do YouTube"
          inputMode="url"
        />
        <input
          className="field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nome (opcional)"
          aria-label="Nome do material"
        />
        <button type="submit" className="btn">
          <Icon name="plus" size={16} />
          Adicionar link
        </button>
      </form>
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}

      <div>
        <input
          ref={fileInput}
          id={`file-${topicId}`}
          type="file"
          multiple
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
        <label htmlFor={`file-${topicId}`} className="btn cursor-pointer">
          <Icon name="clip" size={16} />
          Anexar arquivo
        </label>
        <span className="ml-3 text-sm text-ink-3">Fica salvo só neste aparelho.</span>
      </div>
    </div>
  )
}
