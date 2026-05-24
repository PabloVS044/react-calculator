import { useState } from 'react'
import './App.css'

const BUTTONS = [
  { label: 'AC', tone: 'function', action: 'clear' },
  { label: '±', tone: 'function', action: 'toggle-sign' },
  { label: '%', tone: 'function', action: 'percent' },
  { label: '÷', tone: 'operator', operator: '÷' },
  { label: '7', tone: 'number', value: '7' },
  { label: '8', tone: 'number', value: '8' },
  { label: '9', tone: 'number', value: '9' },
  { label: '×', tone: 'operator', operator: '×' },
  { label: '4', tone: 'number', value: '4' },
  { label: '5', tone: 'number', value: '5' },
  { label: '6', tone: 'number', value: '6' },
  { label: '-', tone: 'operator', operator: '-' },
  { label: '1', tone: 'number', value: '1' },
  { label: '2', tone: 'number', value: '2' },
  { label: '3', tone: 'number', value: '3' },
  { label: '+', tone: 'operator', operator: '+' },
  { label: '0', tone: 'number', value: '0', wide: true },
  { label: '.', tone: 'number', action: 'decimal' },
  { label: '=', tone: 'operator', action: 'equals' },
]

const MAX_DIGITS = 12

function formatValue(value) {
  if (!Number.isFinite(value)) {
    return 'Error'
  }

  return Number(value.toPrecision(12)).toString()
}

function calculate(firstValue, secondValue, operator) {
  switch (operator) {
    case '+':
      return firstValue + secondValue
    case '-':
      return firstValue - secondValue
    case '×':
      return firstValue * secondValue
    case '÷':
      return secondValue === 0 ? Number.NaN : firstValue / secondValue
    default:
      return secondValue
  }
}

function App() {
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
    if (displayValue === 'Error' || shouldResetDisplay) {
      replaceDisplay(digit)
      return
    }

    const numericLength = displayValue.replace('-', '').replace('.', '').length

    if (numericLength >= MAX_DIGITS) {
      return
    }

    if (displayValue === '0') {
      setDisplayValue(digit)
      return
    }

    setDisplayValue((current) => `${current}${digit}`)
  }

  const inputDecimal = () => {
    if (displayValue === 'Error' || shouldResetDisplay) {
      replaceDisplay('0.')
      return
    }

    if (displayValue.includes('.')) {
      return
    }

    setDisplayValue((current) => `${current}.`)
  }

  const toggleSign = () => {
    if (displayValue === 'Error' || displayValue === '0') {
      return
    }

    setDisplayValue((current) =>
      current.startsWith('-') ? current.slice(1) : `-${current}`,
    )
  }

  const convertToPercent = () => {
    if (displayValue === 'Error') {
      clearAll()
      return
    }

    const nextValue = formatValue(Number(displayValue) / 100)

    setDisplayValue(nextValue)
    setShouldResetDisplay(false)
  }

  const solvePendingOperation = (firstValue, secondValue, operator) => {
    const result = calculate(firstValue, secondValue, operator)
    const formattedResult = formatValue(result)

    setDisplayValue(formattedResult)

    if (formattedResult === 'Error') {
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
    if (displayValue === 'Error') {
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
      displayValue === 'Error' ||
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

    switch (button.action) {
      case 'clear':
        clearAll()
        break
      case 'decimal':
        inputDecimal()
        break
      case 'toggle-sign':
        toggleSign()
        break
      case 'percent':
        convertToPercent()
        break
      case 'equals':
        handleEquals()
        break
      default:
        break
    }
  }

  const displayClassName = [
    'calculator__value',
    displayValue.length > 9 ? 'calculator__value--compact' : '',
    displayValue.length > 12 ? 'calculator__value--tiny' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <main className="app-shell">
      <section className="calculator" aria-label="Calculadora estilo iOS">
        <div className="calculator__display">
          <output className={displayClassName} aria-live="polite">
            {displayValue}
          </output>
        </div>

        <div className="calculator__keypad">
          {BUTTONS.map((button) => {
            const className = [
              'key',
              `key--${button.tone}`,
              button.wide ? 'key--wide' : '',
              button.operator && pendingOperator === button.operator
                ? 'key--active'
                : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <button
                key={button.label}
                type="button"
                className={className}
                onClick={() => handleButtonPress(button)}
              >
                {button.label}
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default App
