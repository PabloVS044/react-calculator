import { ERROR_DISPLAY } from '../constants/calculator'

export function getDisplayClassName(displayValue: string): string {
  return [
    'calculator__value',
    displayValue.length >= 7 ? 'calculator__value--compact' : '',
    displayValue.length >= 9 || displayValue === ERROR_DISPLAY ? 'calculator__value--tiny' : '',
  ].filter(Boolean).join(' ')
}
