import type { ButtonVisualProps } from '../types/button'
import type { CalculatorButton } from '../types/calculator'

const NUMBER_BUTTON_STYLE = {
  backgroundColor: '#1c1c1c',
  textColor: '#fff',
} satisfies ButtonVisualProps

const FUNCTION_BUTTON_STYLE = {
  backgroundColor: '#d4d4d2',
  textColor: '#000',
} satisfies ButtonVisualProps

const OPERATOR_BUTTON_STYLE = {
  backgroundColor: '#ff9f0a',
  textColor: '#fff',
  selectedBackgroundColor: '#fff',
  selectedTextColor: '#ff9f0a',
} satisfies ButtonVisualProps

export const BUTTONS = [
  { label: '7', value: '7', ...NUMBER_BUTTON_STYLE },
  { label: '8', value: '8', ...NUMBER_BUTTON_STYLE },
  { label: '9', value: '9', ...NUMBER_BUTTON_STYLE },
  { label: '+', operator: '+', ...OPERATOR_BUTTON_STYLE },
  { label: '4', value: '4', ...NUMBER_BUTTON_STYLE },
  { label: '5', value: '5', ...NUMBER_BUTTON_STYLE },
  { label: '6', value: '6', ...NUMBER_BUTTON_STYLE },
  { label: '-', operator: '-', ...OPERATOR_BUTTON_STYLE },
  { label: '1', value: '1', ...NUMBER_BUTTON_STYLE },
  { label: '2', value: '2', ...NUMBER_BUTTON_STYLE },
  { label: '3', value: '3', ...NUMBER_BUTTON_STYLE },
  { label: '×', operator: '×', ...OPERATOR_BUTTON_STYLE },
  {
    label: '0',
    value: '0',
    wide: true,
    justify: 'flex-start',
    ...NUMBER_BUTTON_STYLE,
  },
  { label: 'AC', action: 'clear', ...FUNCTION_BUTTON_STYLE },
  { label: '=', action: 'equals', ...OPERATOR_BUTTON_STYLE },
] satisfies ReadonlyArray<CalculatorButton>

export const ERROR_DISPLAY = 'ERROR'
export const MAX_DIGITS = 9
export const MAX_VALUE = 999999999
