import type { Meta, StoryObj } from '@storybook/react'
import { useToastStore } from '@/stores/toastStore'
import Toast from './Toast'
import Button from '@/components/common/Button'

const meta: Meta = {
  title: 'Common/Toast',
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

export const Success: Story = {
  render: () => (
    <div className="p-400">
      <Toast id="preview-success" variant="success" message="저장됐어요." />
    </div>
  ),
}

export const Warning: Story = {
  render: () => (
    <div className="p-400">
      <Toast id="preview-warning" variant="warning" message="잠시 후 다시 시도해주세요." />
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <div className="p-400">
      <Toast id="preview-error" variant="error" message="저장에 실패했어요." />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-200 p-400">
      <Toast id="1" variant="success" message="완료 처리됐어요." />
      <Toast id="2" variant="warning" message="네트워크 연결을 확인해주세요." />
      <Toast id="3" variant="error" message="저장에 실패했어요. 잠시 후 다시 시도해주세요." />
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const addToast = useToastStore((s) => s.addToast)
    const toasts = useToastStore((s) => s.toasts)
    return (
      <div className="flex flex-col gap-300 p-700">
        <div className="flex gap-200">
          <Button variant="secondary" size="sm" onClick={() => addToast({ variant: 'success', message: '저장됐어요.' })}>
            Success
          </Button>
          <Button variant="ghost" size="sm" onClick={() => addToast({ variant: 'warning', message: '잠시 후 다시 시도해주세요.' })}>
            Warning
          </Button>
          <Button variant="danger" size="sm" onClick={() => addToast({ variant: 'error', message: '오류가 발생했어요.' })}>
            Error
          </Button>
        </div>
        <div className="flex flex-col gap-200 mt-200">
          {toasts.map((t) => (
            <Toast key={t.id} {...t} />
          ))}
        </div>
      </div>
    )
  },
}
