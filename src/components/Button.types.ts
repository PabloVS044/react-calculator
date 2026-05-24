import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import type { ButtonVisualProps } from '../types/button'

type ButtonStyleVariable =
  | '--button-bg'
  | '--button-color'
  | '--button-selected-bg'
  | '--button-selected-color'
  | '--button-justify'

export type ButtonStyle = CSSProperties & Record<ButtonStyleVariable, string>

export interface ButtonProps extends ButtonVisualProps {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  isSelected?: boolean
}
