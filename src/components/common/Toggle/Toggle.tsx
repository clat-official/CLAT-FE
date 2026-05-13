interface ToggleProps {
  checked: boolean
  onChange: () => void
  disabled?: boolean
}

export default function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-checked={checked}
      data-disabled={disabled}
      className={[
        'group relative inline-flex items-center w-9 h-5 rounded-[10px] border-0 p-0 shrink-0',
        'cursor-pointer transition-[background-color] duration-200',
        'bg-gray-300',
        'data-[checked=true]:bg-primary-500',
        'data-[checked=true]:data-[disabled=true]:bg-primary-300',
        'data-[disabled=true]:bg-gray-200 data-[disabled=true]:cursor-not-allowed',
      ].join(' ')}
      onClick={disabled ? undefined : onChange}
    >
      <span className="absolute left-[2px] w-4 h-4 rounded-full bg-white transition-transform duration-200 group-data-[checked=true]:translate-x-4" />
    </button>
  )
}
