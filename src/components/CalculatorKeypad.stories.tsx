import type { Meta, StoryObj } from '@storybook/react-vite'
import CalculatorKeypad from './CalculatorKeypad'
import { BUTTONS } from '../constants/calculator'

const meta = {
  title: 'Components/CalculatorKeypad',
  component: CalculatorKeypad,
  args: {
    buttons: BUTTONS,
    activeOperator: null,
    onButtonPress: () => undefined,
  },
} satisfies Meta<typeof CalculatorKeypad>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const AdditionSelected: Story = {
  args: {
    activeOperator: '+',
  },
}
