import type { Meta, StoryObj } from '@storybook/react'
import DragHandle from './DragHandle'

const meta: Meta<typeof DragHandle> = {
  title: 'Common/DragHandle',
  component: DragHandle,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof DragHandle>

export const Default: Story = {}

export const InContext: Story = {
  render: () => (
    <div className="flex items-center gap-300 p-400 bg-bg-default border border-border-default rounded-400 w-64">
      <DragHandle />
      <span className="text-body-md text-fg-default">드래그 가능한 항목</span>
    </div>
  ),
}
