import type { CalculatorButton, CalculatorOperator } from '../types/calculator'

export interface CalculatorKeypadProps {
  buttons: readonly CalculatorButton[]
  activeOperator: CalculatorOperator | null
  onButtonPress: (button: CalculatorButton) => void
}
