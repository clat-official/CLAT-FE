import type { Meta, StoryObj } from '@storybook/react'
import AddCard from './AddCard'

const meta: Meta<typeof AddCard> = {
  title: 'Common/AddCard',
  component: AddCard,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  args: { label: '반 추가', description: undefined, disabled: false },
}
export default meta

type Story = StoryObj<typeof AddCard>

export const Default: Story = {}

export const WithDescription: Story = {
  args: { label: '학생 추가', description: '새 학생을 등록합니다' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const WithIcon: Story = {
  args: {
    label: '템플릿 추가',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
      </svg>
    ),
  },
}

export const InGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-600 p-700 bg-bg-page">
      <div className="bg-bg-default border border-border-default rounded-400 p-700 min-h-[160px] flex flex-col gap-200">
        <span className="text-title-md text-fg-default">기존 반 A</span>
        <span className="text-body-md text-fg-tertiary">학생 8명</span>
      </div>
      <div className="bg-bg-default border border-border-default rounded-400 p-700 min-h-[160px] flex flex-col gap-200">
        <span className="text-title-md text-fg-default">기존 반 B</span>
        <span className="text-body-md text-fg-tertiary">학생 5명</span>
      </div>
      <AddCard label="반 추가" />
    </div>
  ),
}
