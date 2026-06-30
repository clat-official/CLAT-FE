import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ConfirmModal from './ConfirmModal'
import Button from '@/components/common/Button'

const meta: Meta<typeof ConfirmModal> = {
  title: 'Common/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  argTypes: {
    confirmVariant: {
      control: 'select',
      options: ['primary', 'danger', 'deleteClass', 'endClass'],
    },
  },
}
export default meta

type Story = StoryObj<typeof ConfirmModal>

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>확인 모달 열기</Button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
        />
      </>
    )
  },
  args: {
    title: '정말 삭제하시겠어요?',
    descriptions: ['삭제한 내용은 복구할 수 없어요.'],
    confirmLabel: '삭제',
    cancelLabel: '취소',
    confirmVariant: 'danger',
  },
}

export const Delete: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>반 삭제</Button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
        />
      </>
    )
  },
  args: {
    title: '영어 심화반을 삭제할까요?',
    descriptions: ['반에 속한 학생 정보와 수업 기록이 모두 삭제돼요.', '이 작업은 되돌릴 수 없어요.'],
    confirmLabel: '삭제',
    confirmVariant: 'deleteClass',
  },
}

export const EndClass: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button variant="endClass" onClick={() => setIsOpen(true)}>수업 종료</Button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
        />
      </>
    )
  },
  args: {
    title: '수업을 종료할까요?',
    descriptions: ['종료한 수업은 이력에서 확인할 수 있어요.'],
    confirmLabel: '종료',
    confirmVariant: 'endClass',
  },
}
