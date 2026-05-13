'use client'

import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const modalVariants = cva('bg-white relative flex flex-col', {
  variants: {
    size: {
      sm: 'w-[420px] rounded-2xl p-6',
      md: 'w-[640px] rounded-3xl p-12 max-h-[90vh]',
    },
  },
  defaultVariants: { size: 'md' },
})

interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, size = 'md', children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-[4px] flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div className={cn(modalVariants({ size }))} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
