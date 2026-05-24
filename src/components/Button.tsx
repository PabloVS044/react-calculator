import type { ButtonProps } from './Button.types'
import { getButtonClassName, getButtonStyle } from './Button.utils'
function Button(props: ButtonProps) {
  const { children, onClick } = props
  return (
    <button type="button" className={getButtonClassName(props)} style={getButtonStyle(props)} onClick={onClick}>
      {children}
    </button>
  )
}
export default Button
