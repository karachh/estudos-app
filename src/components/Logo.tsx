// Selo antigo: estrela de bússola (quatro pontas grandes, quatro pequenas) dentro de um mostrador com
// marcas de régua, como o dial de um rádio velho. Na cor do módulo atual.
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={`text-accent ${className}`} aria-hidden="true">
      <circle cx="16" cy="16" r="14.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="12.2" fill="none" stroke="currentColor" strokeWidth="2.2" strokeDasharray="0.55 2.05" opacity="0.75" />
      <path d="M16 9.4l1.7 4.9 4.9 1.7-4.9 1.7-1.7 4.9-1.7-4.9-4.9-1.7 4.9-1.7z" fill="currentColor" opacity="0.45" transform="rotate(45 16 16)" />
      <path d="M16 4.6c.5 5.8 5.6 10.9 11.4 11.4-5.8.5-10.9 5.6-11.4 11.4-.5-5.8-5.6-10.9-11.4-11.4 5.8-.5 10.9-5.6 11.4-11.4z" fill="currentColor" />
      <circle cx="16" cy="16" r="1.5" fill="var(--bg, #0c0a08)" />
    </svg>
  )
}
