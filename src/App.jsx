import { useState } from 'react'
import './App.css'

const BUTTONS = [
  { label: 'AC', tone: 'function', action: 'clear' },
  { label: '±', tone: 'function' },
  { label: '%', tone: 'function' },
  { label: '÷', tone: 'operator' },
  { label: '7', tone: 'number', value: '7' },
  { label: '8', tone: 'number', value: '8' },
  { label: '9', tone: 'number', value: '9' },
  { label: '×', tone: 'operator' },
  { label: '4', tone: 'number', value: '4' },
  { label: '5', tone: 'number', value: '5' },
  { label: '6', tone: 'number', value: '6' },
  { label: '-', tone: 'operator' },
  { label: '1', tone: 'number', value: '1' },
  { label: '2', tone: 'number', value: '2' },
  { label: '3', tone: 'number', value: '3' },
  { label: '+', tone: 'operator' },
  { label: '0', tone: 'number', value: '0', wide: true },
  { label: '.', tone: 'number', action: 'decimal' },
  { label: '=', tone: 'operator' },
]

const MAX_DIGITS = 9

function App() {
  const [displayValue, setDisplayValue] = useState('0')

  const resetDisplay = () => {
    setDisplayValue('0')
  }

  const addDigit = (digit) => {
    setDisplayValue((current) => {
      if (current === '0') {
        return digit
      }

      if (current.length >= MAX_DIGITS) {
        return current
      }

      return `${current}${digit}`
    })
  }

  const addDecimal = () => {
    setDisplayValue((current) => {
      if (current.includes('.')) {
        return current
      }

      return `${current}.`
    })
  }

  const handleButtonPress = (button) => {
    if (button.action === 'clear') {
      resetDisplay()
      return
    }

    if (button.action === 'decimal') {
      addDecimal()
      return
    }

    if (button.value) {
      addDigit(button.value)
    }
  }

  return (
    <main className="app-shell">
      <section className="calculator" aria-label="Calculadora estilo iOS">
        <div className="calculator__display">
          <output className="calculator__value" aria-live="polite">
            {displayValue}
          </output>
        </div>

        <div className="calculator__keypad">
          {BUTTONS.map((button) => {
            const className = [
              'key',
              `key--${button.tone}`,
              button.wide ? 'key--wide' : '',
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
