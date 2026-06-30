import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Modal from './Modal'
import Button from '@/components/common/Button'

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
}
export default meta

type Story = StoryObj<typeof Modal>

export const Small: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>모달 열기 (sm)</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <p className="text-body-md text-fg-default mb-600">sm 사이즈 모달 내용입니다.</p>
          <Button fullWidth onClick={() => setIsOpen(false)}>닫기</Button>
        </Modal>
      </>
    )
  },
}

export const Medium: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>모달 열기 (md)</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
          <h2 className="text-heading-md text-fg-default mb-400">모달 제목</h2>
          <p className="text-body-md text-fg-secondary mb-700">
            md 사이즈 모달입니다. 오버레이 클릭 또는 닫기 버튼으로 닫을 수 있습니다.
          </p>
          <div className="flex justify-end gap-200">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>취소</Button>
            <Button onClick={() => setIsOpen(false)}>확인</Button>
          </div>
        </Modal>
      </>
    )
  },
}
