import Button from './Button'
import type { CalculatorButton, CalculatorOperator } from '../types/calculator'

interface CalculatorKeypadProps {
  buttons: readonly CalculatorButton[]
  activeOperator: CalculatorOperator | null
  onButtonPress: (button: CalculatorButton) => void
}

function CalculatorKeypad({
  buttons,
  activeOperator,
  onButtonPress,
}: CalculatorKeypadProps) {
  const isActiveOperator = (button: CalculatorButton): boolean =>
    'operator' in button && button.operator === activeOperator

  return (
    <div className="calculator__keypad">
      {buttons.map((button) => (
        <Button
          key={button.label}
          onClick={() => onButtonPress(button)}
          wide={button.wide}
          isSelected={isActiveOperator(button)}
          backgroundColor={button.backgroundColor}
          textColor={button.textColor}
          selectedBackgroundColor={button.selectedBackgroundColor}
          selectedTextColor={button.selectedTextColor}
          justify={button.justify}
        >
          {button.label}
        </Button>
      ))}
    </div>
  )
}

export default CalculatorKeypad
