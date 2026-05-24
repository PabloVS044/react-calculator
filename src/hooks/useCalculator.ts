import { useState } from 'react'
import { ERROR_DISPLAY, MAX_DIGITS } from '../constants/calculator'
import type {
  CalculatorButton,
  CalculatorDigit,
  CalculatorOperator,
  UseCalculatorResult,
} from '../types/calculator'
import { calculate, formatValue } from '../utils/calculator'

function useCalculator(): UseCalculatorResult {
  const [displayValue, setDisplayValue] = useState('0')
  const [storedValue, setStoredValue] = useState<number | null>(null)
  const [pendingOperator, setPendingOperator] =
    useState<CalculatorOperator | null>(null)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const clearAll = (): void => {
    setDisplayValue('0')
    setStoredValue(null)
    setPendingOperator(null)
    setShouldResetDisplay(false)
  }

  const replaceDisplay = (nextValue: string): void => {
    setDisplayValue(nextValue)
    setShouldResetDisplay(false)
  }

  const hasReachedCharacterLimit = (value: string): boolean =>
    value.length >= MAX_DIGITS

  const inputDigit = (digit: CalculatorDigit): void => {
    if (displayValue === ERROR_DISPLAY || shouldResetDisplay) {
      replaceDisplay(digit)
      return
    }

    if (hasReachedCharacterLimit(displayValue)) {
      return
    }

    if (displayValue === '0') {
      setDisplayValue(digit)
      return
    }

    if (displayValue === '-0') {
      setDisplayValue(`-${digit}`)
      return
    }

    setDisplayValue((currentValue) => `${currentValue}${digit}`)
  }

  const inputDecimal = (): void => {
    if (displayValue === ERROR_DISPLAY || shouldResetDisplay) {
      replaceDisplay('0.')
      return
    }

    if (displayValue.includes('.') || hasReachedCharacterLimit(displayValue)) {
      return
    }

    setDisplayValue((currentValue) => `${currentValue}.`)
  }

  const toggleSign = (): void => {
    if (displayValue === ERROR_DISPLAY || displayValue === '0') {
      return
    }

    if (displayValue.startsWith('-')) {
      setDisplayValue(displayValue.slice(1))
      return
    }

    if (hasReachedCharacterLimit(displayValue)) {
      return
    }

    setDisplayValue(`-${displayValue}`)
  }

  const solvePendingOperation = (
    firstValue: number,
    secondValue: number,
    operator: CalculatorOperator,
  ): number | null => {
    const result = calculate(firstValue, secondValue, operator)
    const formattedResult = formatValue(result)

    setDisplayValue(formattedResult)

    if (formattedResult === ERROR_DISPLAY) {
      setStoredValue(null)
      setPendingOperator(null)
      setShouldResetDisplay(true)
      return null
    }

    const numericResult = Number(formattedResult)

    setStoredValue(numericResult)
    setShouldResetDisplay(true)

    return numericResult
  }

  const handleOperator = (nextOperator: CalculatorOperator): void => {
    if (displayValue === ERROR_DISPLAY) {
      clearAll()
      return
    }

    const currentValue = Number(displayValue)

    if (storedValue === null) {
      setStoredValue(currentValue)
      setPendingOperator(nextOperator)
      setShouldResetDisplay(true)
      return
    }

    if (pendingOperator !== null && !shouldResetDisplay) {
      const result = solvePendingOperation(
        storedValue,
        currentValue,
        pendingOperator,
      )

      if (result === null) {
        return
      }
    } else {
      setStoredValue(currentValue)
    }

    setPendingOperator(nextOperator)
    setShouldResetDisplay(true)
  }

  const handleEquals = (): void => {
    if (
      displayValue === ERROR_DISPLAY ||
      pendingOperator === null ||
      storedValue === null ||
      shouldResetDisplay
    ) {
      return
    }

    solvePendingOperation(storedValue, Number(displayValue), pendingOperator)
    setPendingOperator(null)
  }

  const handleButtonPress = (button: CalculatorButton): void => {
    if ('value' in button) {
      inputDigit(button.value)
      return
    }

    if ('operator' in button) {
      handleOperator(button.operator)
      return
    }

    if (button.action === 'decimal') {
      inputDecimal()
      return
    }

    if (button.action === 'toggle-sign') {
      toggleSign()
      return
    }

    if (button.action === 'clear') {
      clearAll()
      return
    }

    if (button.action === 'equals') {
      handleEquals()
    }
  }

  return {
    displayValue,
    pendingOperator,
    handleButtonPress,
  }
}

export { useCalculator }
