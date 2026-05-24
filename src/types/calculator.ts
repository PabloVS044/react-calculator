import type { ButtonVisualProps } from './button'

export type CalculatorDigit =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'

export type CalculatorOperator = '+' | '-' | '×'
export type CalculatorAction = 'clear' | 'equals'

interface BaseCalculatorButton extends ButtonVisualProps {
  label: string
}

export interface DigitButton extends BaseCalculatorButton {
  value: CalculatorDigit
}

export interface OperatorButton extends BaseCalculatorButton {
  operator: CalculatorOperator
}

export interface ActionButton extends BaseCalculatorButton {
  action: CalculatorAction
}

export type CalculatorButton = DigitButton | OperatorButton | ActionButton

export interface UseCalculatorResult {
  displayValue: string
  pendingOperator: CalculatorOperator | null
  handleButtonPress: (button: CalculatorButton) => void
}
