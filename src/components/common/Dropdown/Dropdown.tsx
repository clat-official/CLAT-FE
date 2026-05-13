'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import ChevronDownIcon from '@/assets/icons/icon-chevron-down.svg'

interface DropdownOption {
  label: string
  value: string
}

interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  menuLabel?: string
  triggerClassName?: string
  noBorder?: boolean
  fullWidth?: boolean
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = '선택',
  menuLabel,
  triggerClassName,
  noBorder = false,
  fullWidth = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)
  const isSelected = !!selectedOption

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block', fullWidth && 'block w-full')}
    >
      <button
        className={cn(
          'flex items-center gap-8 bg-white border border-gray-200 rounded-lg px-4 py-2 cursor-pointer',
          'text-gray-700 text-sm font-semibold tracking-[-0.03em] leading-[1.4]',
          'transition-[border-color,color] duration-200 hover:bg-primary-50',
          noBorder && 'border-0 hover:bg-gray-50',
          fullWidth && 'w-full justify-between',
          isSelected && 'text-primary-500',
          triggerClassName,
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <ChevronDownIcon
          width={16}
          height={16}
          className={cn('transition-transform duration-200 ease-in-out shrink-0', isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && (
        <div
          className={cn(
            'absolute top-[calc(100%+8px)] left-0 bg-white border border-gray-200 rounded-lg z-[100] min-w-full overflow-hidden py-2',
            noBorder && 'border-0 shadow-[0_4px_16px_rgba(0,0,0,0.08)]',
          )}
        >
          {menuLabel && (
            <div className="px-4 py-2 text-gray-300 text-sm font-semibold tracking-[-0.03em] leading-[1.4]">
              {menuLabel}
            </div>
          )}
          {options.map((opt) => (
            <div
              key={opt.value}
              className={cn(
                'flex items-center px-4 py-2 cursor-pointer text-gray-700',
                'text-sm font-semibold tracking-[-0.03em] leading-[1.4]',
                'transition-[background-color] duration-150 hover:bg-gray-50',
                opt.value === value && 'text-primary-500',
              )}
              onClick={() => {
                onChange(opt.value)
                setIsOpen(false)
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
