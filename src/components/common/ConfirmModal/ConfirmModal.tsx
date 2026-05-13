import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  descriptions?: string[]
  confirmLabel?: string
  cancelLabel?: string
  confirmVariant?: 'primary' | 'danger' | 'deleteClass' | 'endClass'
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  descriptions,
  confirmLabel = '확인',
  cancelLabel = '취소',
  confirmVariant = 'primary',
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center mt-11 mb-9">
        <Text variant="headingMd" as="h2" className="mb-3">
          {title}
        </Text>
        {descriptions &&
          descriptions.map((desc, i) => (
            <Text key={i} variant="bodyLg" color="gray500">
              {desc}
            </Text>
          ))}
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="md" fullWidth onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button variant={confirmVariant} size="md" fullWidth onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
