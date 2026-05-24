import { ERROR_DISPLAY, MAX_VALUE } from '../constants/calculator'
import type { CalculatorOperator } from '../types/calculator'

function formatValue(value: number): string {
  if (!Number.isFinite(value) || value < 0 || value > MAX_VALUE) {
    return ERROR_DISPLAY
  }

  return Math.trunc(value).toString()
}

function calculate(
  firstValue: number,
  secondValue: number,
  operator: CalculatorOperator,
): number {
  switch (operator) {
    case '+':
      return firstValue + secondValue
    case '-':
      return firstValue - secondValue
    case '×':
      return firstValue * secondValue
  }
}

export { calculate, formatValue }
