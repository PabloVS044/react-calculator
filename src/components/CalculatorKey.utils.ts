import type { ButtonProps } from './Button.types'
import type { CalculatorKeyProps } from './CalculatorKey.types'

export function getCalculatorKeyButtonProps({
  button,
  activeOperator,
  onButtonPress,
}: CalculatorKeyProps): Omit<ButtonProps, 'children'> {
  return {
    onClick: () => onButtonPress(button),
    wide: button.wide,
    isSelected: 'operator' in button && button.operator === activeOperator,
    backgroundColor: button.backgroundColor,
    textColor: button.textColor,
    selectedBackgroundColor: button.selectedBackgroundColor,
    selectedTextColor: button.selectedTextColor,
    justify: button.justify,
  }
}
