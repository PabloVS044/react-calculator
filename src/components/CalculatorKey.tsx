import Button from './Button'
import type { CalculatorKeyProps } from './CalculatorKey.types'
import { getCalculatorKeyButtonProps } from './CalculatorKey.utils'

function CalculatorKey(props: CalculatorKeyProps) {
  return (
    <Button {...getCalculatorKeyButtonProps(props)}>
      {props.button.label}
    </Button>
  )
}

export default CalculatorKey
