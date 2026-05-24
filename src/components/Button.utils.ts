import type { ButtonProps, ButtonStyle } from './Button.types'

export function getButtonClassName({
  wide = false,
  isSelected = false,
}: Pick<ButtonProps, 'wide' | 'isSelected'>): string {
  return [
    'app-button',
    wide ? 'app-button--wide' : '',
    isSelected ? 'app-button--selected' : '',
  ].filter(Boolean).join(' ')
}

export function getButtonStyle({
  backgroundColor,
  textColor,
  selectedBackgroundColor,
  selectedTextColor,
  justify = 'center',
}: ButtonProps): ButtonStyle {
  return {
    '--button-bg': backgroundColor,
    '--button-color': textColor,
    '--button-selected-bg': selectedBackgroundColor ?? backgroundColor,
    '--button-selected-color': selectedTextColor ?? textColor,
    '--button-justify': justify,
  }
}
