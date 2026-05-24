import { useState } from 'react'
import { ERROR_DISPLAY, MAX_DIGITS } from '../constants/calculator'
import { calculate, formatValue } from '../utils/calculator'

export function useCalculator() {
  const [displayValue, setDisplayValue] = useState('0')
  const [storedValue, setStoredValue] = useState(null)
  const [pendingOperator, setPendingOperator] = useState(null)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const clearAll = () => {
    setDisplayValue('0')
    setStoredValue(null)
    setPendingOperator(null)
    setShouldResetDisplay(false)
  }

  const replaceDisplay = (nextValue) => {
    setDisplayValue(nextValue)
    setShouldResetDisplay(false)
  }

  const inputDigit = (digit) => {
    if (displayValue === ERROR_DISPLAY || shouldResetDisplay) {
      replaceDisplay(digit)
      return
    }

    if (displayValue.length >= MAX_DIGITS) {
      return
    }

    if (displayValue === '0') {
      setDisplayValue(digit)
      return
    }

    setDisplayValue((current) => `${current}${digit}`)
  }

  const solvePendingOperation = (firstValue, secondValue, operator) => {
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

  const handleOperator = (nextOperator) => {
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

  const handleEquals = () => {
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

  const handleButtonPress = (button) => {
    if (button.value) {
      inputDigit(button.value)
      return
    }

    if (button.operator) {
      handleOperator(button.operator)
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
