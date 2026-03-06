'use client'

import { useEffect, useState } from 'react'
import Modal from '@/components/common/Modal'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import { templateService, type Template } from '@/services/template'
import { modalContentStyle, chipGroupStyle, actionsStyle, chipButtonRecipe } from './TemplateSelectModal.css'

interface TemplateSelectModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (templateId: number) => void | Promise<void>
  title?: string
  confirmLabel?: string
}

export default function TemplateSelectModal({
  isOpen,
  onClose,
  onConfirm,
  title = '템플릿 선택',
  confirmLabel = '확인',
}: TemplateSelectModalProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    templateService.getTemplates().then(setTemplates)
  }, [isOpen])

  const handleConfirm = async () => {
    if (!selectedId) return
    setIsLoading(true)
    try {
      await onConfirm(selectedId)
    } finally {
      setIsLoading(false)
      setSelectedId(null)
    }
  }

  const handleClose = () => {
    setSelectedId(null)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="sm">
      <div className={modalContentStyle}>
        <Text variant="headingMd">{title}</Text>
        <div className={chipGroupStyle}>
          {templates.map((t) => (
            <button
              key={t.id}
              className={chipButtonRecipe({ selected: selectedId === t.id })}
              onClick={() => setSelectedId(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className={actionsStyle}>
          <Button variant="ghost" size="md" fullWidth onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleConfirm}
            disabled={!selectedId || isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
