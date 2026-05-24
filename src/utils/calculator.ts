import { ERROR_DISPLAY, MAX_VALUE } from '../constants/calculator'
import type { CalculatorOperator } from '../types/calculator'

function trimFraction(text: string): string {
  return text.replace(/(\.\d*?[1-9])0+$/u, '$1').replace(/\.0+$/u, '')
}

function formatValue(value: number): string {
  if (!Number.isFinite(value)) {
    return ERROR_DISPLAY
  }

  const integerText = Math.trunc(value).toString()

  if (Number.isInteger(value)) {
    return integerText.length <= MAX_VALUE.toString().length
      ? integerText
      : ERROR_DISPLAY
  }

  const signCharacters = value < 0 ? 1 : 0
  const integerLength = Math.trunc(Math.abs(value)).toString().length
  const availableFractionDigits = 9 - signCharacters - integerLength - 1

  if (availableFractionDigits < 1) {
    return ERROR_DISPLAY
  }

  const roundedText = value.toFixed(availableFractionDigits)
  const normalizedText = trimFraction(roundedText)

  return normalizedText.length <= 9 ? normalizedText : ERROR_DISPLAY
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
    case '÷':
      return firstValue / secondValue
    case '%':
      return firstValue % secondValue
  }
}

export { calculate, formatValue }
