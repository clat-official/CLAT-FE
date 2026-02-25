import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
import Text from '@/components/common/Text'
import { deleteModalContentStyle, deleteModalActionsStyle, titleStyle } from './DeleteConfirmModal.css'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  templateName: string
  classCount: number
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  templateName,
  classCount,
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className={deleteModalContentStyle}>
        <Text variant="headingMd" as="h2" className={titleStyle}>'{templateName}'을 삭제할까요?</Text>
        <Text variant="bodyLg" color="gray500">
          현재 {classCount}개의 반에서 사용하고 있어요.
        </Text>
        <Text variant="bodyLg" color="gray500">
          삭제 후에는 복구할 수 없어요.
        </Text>
      </div>
      <div className={deleteModalActionsStyle}>
        <Button variant="ghost" size="md" fullWidth onClick={onClose}>취소</Button>
        <Button variant="danger" size="md" fullWidth onClick={onConfirm}>삭제</Button>
      </div>
    </Modal>
  )
}