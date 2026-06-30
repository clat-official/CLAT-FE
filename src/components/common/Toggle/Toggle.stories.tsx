import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Toggle from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Common/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: 'onChange' },
  },
  args: { checked: false, disabled: false },
}
export default meta

type Story = StoryObj<typeof Toggle>

export const Unchecked: Story = { args: { checked: false } }
export const Checked: Story = { args: { checked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const CheckedDisabled: Story = { args: { checked: true, disabled: true } }

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center gap-300 p-400">
        <Toggle checked={checked} onChange={() => setChecked((v) => !v)} />
        <span className="text-body-md text-fg-secondary">{checked ? 'ON' : 'OFF'}</span>
      </div>
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-300 p-400">
      {[
        { label: 'Off', checked: false, disabled: false },
        { label: 'On', checked: true, disabled: false },
        { label: 'Disabled Off', checked: false, disabled: true },
        { label: 'Disabled On', checked: true, disabled: true },
      ].map(({ label, checked, disabled }) => (
        <div key={label} className="flex items-center gap-300">
          <Toggle checked={checked} onChange={() => {}} disabled={disabled} />
          <span className="text-body-md text-fg-secondary">{label}</span>
        </div>
      ))}
    </div>
  ),
}
