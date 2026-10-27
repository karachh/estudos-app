// Estrela de quatro pontas dentro de uma órbita, na cor do módulo atual.
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={`text-accent ${className}`} aria-hidden="true">
      <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 5.5c.5 5.6 4.9 10 10.5 10.5-5.6.5-10 4.9-10.5 10.5-.5-5.6-4.9-10-10.5-10.5 5.6-.5 10-4.9 10.5-10.5z" fill="currentColor" />
    </svg>
  )
}
