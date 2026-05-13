'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import SuccessIcon from '@/assets/icons/icon-success.svg'
import WarningIcon from '@/assets/icons/icon-warning.svg'
import ErrorIcon from '@/assets/icons/icon-error.svg'
import { useToastStore, type Toast as ToastType } from '@/stores/toastStore'

const ICON_MAP = {
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
}

const DURATION = 3000

export default function Toast({ id, variant, message }: ToastType) {
  const removeToast = useToastStore((s) => s.removeToast)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsClosing(true), DURATION)
    return () => clearTimeout(timer)
  }, [])

  const handleAnimationEnd = () => {
    if (isClosing) removeToast(id)
  }

  const Icon = ICON_MAP[variant]

  return (
    <div
      className={cn(
        'flex items-center gap-3 bg-gray-700 text-white rounded-xl py-3 px-4',
        'min-w-[320px] max-w-[480px] shadow-[0_4px_16px_rgba(0,0,0,0.2)]',
        'text-sm font-medium tracking-[-0.03em] leading-[1.4]',
        'pointer-events-auto whitespace-pre-wrap',
        'animate-fade-slide-in',
        isClosing && 'animate-fade-slide-out',
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      <Icon width={24} height={24} className="shrink-0" />
      {message}
    </div>
  )
}
