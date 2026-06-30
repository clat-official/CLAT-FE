import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outlined', 'danger', 'endClass', 'deleteClass'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['square', 'capsule'] },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: '버튼',
    variant: 'primary',
    size: 'md',
    shape: 'square',
    fullWidth: false,
    disabled: false,
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {}

export const Secondary: Story = { args: { variant: 'secondary' } }

export const Ghost: Story = { args: { variant: 'ghost' } }

export const Outlined: Story = { args: { variant: 'outlined' } }

export const Danger: Story = { args: { variant: 'danger', children: '삭제' } }

export const Disabled: Story = { args: { disabled: true } }

export const FullWidth: Story = { args: { fullWidth: true } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-300 p-700 bg-bg-subtle">
      <div className="flex gap-200 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="endClass">수업 종료</Button>
        <Button variant="deleteClass">반 삭제</Button>
      </div>
      <div className="flex gap-200">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex gap-200">
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled</Button>
      </div>
    </div>
  ),
}
