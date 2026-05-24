import CalculatorKey from './CalculatorKey'
import type { CalculatorKeypadProps } from './CalculatorKeypad.types'
function CalculatorKeypad({ buttons, activeOperator, onButtonPress }: CalculatorKeypadProps) {
  return (
    <div className="calculator__keypad">
      {buttons.map((button) => (
        <CalculatorKey key={button.label} button={button} activeOperator={activeOperator} onButtonPress={onButtonPress} />
      ))}
    </div>
  )
}
export default CalculatorKeypad
