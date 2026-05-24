import type { CalculatorDisplayProps } from './CalculatorDisplay.types'
import { getDisplayClassName } from './CalculatorDisplay.utils'
function CalculatorDisplay({ displayValue }: CalculatorDisplayProps) {
  return (
    <div className="calculator__display">
      <output className={getDisplayClassName(displayValue)} aria-live="polite">
        {displayValue}
      </output>
    </div>
  )
}
export default CalculatorDisplay
