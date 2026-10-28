const paths = {
  sun: 'M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z',
  moon: 'M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z',
  plus: 'M12 5v14M5 12h14',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 001 1h8a1 1 0 001-1l1-12M9 7V4h6v3',
  link: 'M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 0011 18.7l1-1',
  play: 'M8 5.5v13l11-6.5-11-6.5z',
  clip: 'M20 11.5l-8.2 8.2a5 5 0 01-7-7l8.5-8.5a3.3 3.3 0 014.7 4.7l-8.5 8.5a1.7 1.7 0 01-2.4-2.4l7.8-7.8',
  chevron: 'M9 6l6 6-6 6',
  back: 'M15 6l-6 6 6 6',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5',
  pencil: 'M4 20h4L19 9a2.8 2.8 0 00-4-4L4 16v4z',
  x: 'M6 6l12 12M18 6L6 18',
  // Ícones dos módulos na lateral recolhida
  database: 'M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3zM5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3',
  briefcase: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
  // Placa da porta de The Office: alguém chega com a pasta, outro trabalha sentado à mesa
  office:
    'M4.5 3h15A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-15A1.5 1.5 0 014.5 3zM9.6 6.4a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0zM8.4 8.8v5.4l-.8 4M8.4 14.2l.8 4M5.2 12.4h2v2.6h-2zM17 8.2a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0zM15.9 10l-.5 3.4h-2.2M15.4 13.4l.8 4.8M18.2 11.4v6.8M11.4 13.4h3.4M12.3 13.4v4.8',
  cap: 'M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6',
  cross: 'M12 3v18M7 8h10',
  book: 'M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5zM12 6v13',
  sunrise: 'M5 15a7 7 0 0114 0zM3 18h18M7 21h10M12 3v3M5.6 6.6 7 8M18.4 6.6 17 8',
} as const

export type IconName = keyof typeof paths

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d={paths[name]} />
    </svg>
  )
}
