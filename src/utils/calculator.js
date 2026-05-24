import { ERROR_DISPLAY, MAX_VALUE } from '../constants/calculator'

export function formatValue(value) {
  if (!Number.isFinite(value) || value < 0 || value > MAX_VALUE) {
    return ERROR_DISPLAY
  }

  return Math.trunc(value).toString()
}

export function calculate(firstValue, secondValue, operator) {
  switch (operator) {
    case '+':
      return firstValue + secondValue
    case '-':
      return firstValue - secondValue
    case '×':
      return firstValue * secondValue
    default:
      return secondValue
  }
}
