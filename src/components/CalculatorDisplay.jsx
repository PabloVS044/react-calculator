import { ERROR_DISPLAY } from '../constants/calculator'

function getDisplayClassName(displayValue) {
  return [
    'calculator__value',
    displayValue.length >= 7 ? 'calculator__value--compact' : '',
    displayValue.length >= 9 || displayValue === ERROR_DISPLAY
      ? 'calculator__value--tiny'
      : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function CalculatorDisplay({ displayValue }) {
  return (
    <div className="calculator__display">
      <output className={getDisplayClassName(displayValue)} aria-live="polite">
        {displayValue}
      </output>
    </div>
  )
}

export default CalculatorDisplay
