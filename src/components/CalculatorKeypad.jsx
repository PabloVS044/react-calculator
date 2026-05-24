import Button from './Button'

function CalculatorKeypad({ buttons, activeOperator, onButtonPress }) {
  return (
    <div className="calculator__keypad">
      {buttons.map((button) => {
        return (
          <Button
            key={button.label}
            onClick={() => onButtonPress(button)}
            wide={button.wide}
            isSelected={button.operator === activeOperator}
            backgroundColor={button.backgroundColor}
            textColor={button.textColor}
            selectedBackgroundColor={button.selectedBackgroundColor}
            selectedTextColor={button.selectedTextColor}
            justify={button.justify}
          >
            {button.label}
          </Button>
        )
      })}
    </div>
  )
}

export default CalculatorKeypad
