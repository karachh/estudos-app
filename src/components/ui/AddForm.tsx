import { useState, type FormEvent } from 'react'
import { Icon } from './Icon'

export function AddForm({
  placeholder,
  onAdd,
  label = 'Adicionar',
}: {
  placeholder: string
  onAdd: (text: string) => unknown
  label?: string
}) {
  const [value, setValue] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    const text = value.trim()
    if (!text) return
    onAdd(text)
    setValue('')
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        className="field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <button type="submit" className="btn">
        <Icon name="plus" size={16} />
        {label}
      </button>
    </form>
  )
}
