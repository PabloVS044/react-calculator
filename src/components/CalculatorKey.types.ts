import type { CalculatorButton, CalculatorOperator } from '../types/calculator'

export interface CalculatorKeyProps {
  button: CalculatorButton
  activeOperator: CalculatorOperator | null
  onButtonPress: (button: CalculatorButton) => void
}
