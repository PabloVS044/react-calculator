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
}) {
  const style = {
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
