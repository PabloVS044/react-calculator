export type ButtonJustify = 'center' | 'flex-start' | 'flex-end'

export interface ButtonVisualProps {
  backgroundColor: string
  textColor: string
  selectedBackgroundColor?: string
  selectedTextColor?: string
  justify?: ButtonJustify
  wide?: boolean
}
