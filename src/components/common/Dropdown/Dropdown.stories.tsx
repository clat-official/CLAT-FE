import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Dropdown from './Dropdown'

const SAMPLE_OPTIONS = [
  { label: '1반', value: 'class-1' },
  { label: '2반', value: 'class-2' },
  { label: '3반', value: 'class-3' },
  { label: '영어 심화반', value: 'class-4' },
]

const meta: Meta<typeof Dropdown> = {
  title: 'Common/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    menuLabel: { control: 'text' },
    noBorder: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  decorators: [(Story) => <div className="p-700 h-48"><Story /></div>],
}
export default meta

type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return <Dropdown {...args} options={SAMPLE_OPTIONS} value={value} onChange={setValue} />
  },
  args: { placeholder: '반 선택' },
}

export const WithMenuLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return <Dropdown {...args} options={SAMPLE_OPTIONS} value={value} onChange={setValue} />
  },
  args: { placeholder: '반 선택', menuLabel: '수업 반 목록' },
}

export const NoBorder: Story = {
  render: (args) => {
    const [value, setValue] = useState('class-1')
    return <Dropdown {...args} options={SAMPLE_OPTIONS} value={value} onChange={setValue} />
  },
  args: { noBorder: true },
}

export const FullWidth: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <div className="w-72">
        <Dropdown {...args} options={SAMPLE_OPTIONS} value={value} onChange={setValue} />
      </div>
    )
  },
  args: { fullWidth: true, placeholder: '반 선택' },
}
