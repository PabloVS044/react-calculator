import type { Meta, StoryObj } from '@storybook/react-vite'
import CalculatorDisplay from './CalculatorDisplay'

const meta = {
  title: 'Components/CalculatorDisplay',
  component: CalculatorDisplay,
  args: {
    displayValue: '0',
  },
} satisfies Meta<typeof CalculatorDisplay>

export default meta

type Story = StoryObj<typeof meta>

export const ZeroState: Story = {}

export const SevenDigits: Story = {
  args: {
    displayValue: '1234567',
  },
}

export const ErrorState: Story = {
  args: {
    displayValue: 'ERROR',
  },
}
