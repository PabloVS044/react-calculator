import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import type { ButtonVisualProps } from '../types/button'

type ButtonStyleVariables =
  | '--button-bg'
  | '--button-color'
  | '--button-selected-bg'
  | '--button-selected-color'
  | '--button-justify'

type ButtonStyle = CSSProperties & Record<ButtonStyleVariables, string>

interface ButtonProps extends ButtonVisualProps {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  isSelected?: boolean
}

function Button({
  children,
  onClick,
  wide = false,
  isSelected = false,
  backgroundColor,
  textColor,
  selectedBackgroundColor,
  selectedTextColor,
  justify = 'center',
}: ButtonProps) {
  const style: ButtonStyle = {
    '--button-bg': backgroundColor,
    '--button-color': textColor,
    '--button-selected-bg': selectedBackgroundColor ?? backgroundColor,
    '--button-selected-color': selectedTextColor ?? textColor,
    '--button-justify': justify,
  }

  const className = [
    'app-button',
    wide ? 'app-button--wide' : '',
    isSelected ? 'app-button--selected' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={className} style={style} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
