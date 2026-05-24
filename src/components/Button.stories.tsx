import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: '7',
    onClick: () => undefined,
    backgroundColor: '#1c1c1c',
    textColor: '#fff',
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const NumberButton: Story = {}

export const FunctionButton: Story = {
  args: {
    children: 'AC',
    backgroundColor: '#d4d4d2',
    textColor: '#000',
  },
}

export const OperatorButton: Story = {
  args: {
    children: '+',
    backgroundColor: '#ff9f0a',
    textColor: '#fff',
  },
}

export const ActiveOperatorButton: Story = {
  args: {
    children: '×',
    backgroundColor: '#ff9f0a',
    textColor: '#fff',
    selectedBackgroundColor: '#fff',
    selectedTextColor: '#ff9f0a',
    isSelected: true,
  },
}

export const WideZeroButton: Story = {
  args: {
    children: '0',
    wide: true,
    justify: 'flex-start',
  },
}
