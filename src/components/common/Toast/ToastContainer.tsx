'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useToastStore } from '@/stores/toastStore'
import Toast from './Toast'

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div className="fixed top-8 right-8 z-[9999] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>,
    document.body,
  )
}
