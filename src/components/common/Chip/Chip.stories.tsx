import type { Meta, StoryObj } from '@storybook/react'
import Chip from './Chip'

const meta: Meta<typeof Chip> = {
  title: 'Common/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'active', 'ended', 'done', 'inProgress'],
    },
  },
  args: { label: '칩', variant: 'default' },
}
export default meta

type Story = StoryObj<typeof Chip>

export const Default: Story = {}
export const Active: Story = { args: { variant: 'active', label: '진행 중' } }
export const Ended: Story = { args: { variant: 'ended', label: '종료' } }
export const Done: Story = { args: { variant: 'done', label: '완료' } }
export const InProgress: Story = { args: { variant: 'inProgress', label: '진행 중' } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-200 p-400">
      <Chip variant="default" label="기본" />
      <Chip variant="active" label="활성" />
      <Chip variant="ended" label="종료" />
      <Chip variant="done" label="완료" />
      <Chip variant="inProgress" label="진행 중" />
    </div>
  ),
}
