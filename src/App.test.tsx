import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

function setup() {
  const user = userEvent.setup()
  const view = render(<App />)

  const getDisplay = (): HTMLOutputElement => {
    const display = view.container.querySelector('output')

    if (!(display instanceof HTMLOutputElement)) {
      throw new Error('Calculator display not found')
    }

    return display
  }

  const press = async (label: string): Promise<void> => {
    await user.click(screen.getByRole('button', { name: label }))
  }

  const pressSequence = async (...labels: string[]): Promise<void> => {
    for (const label of labels) {
      await press(label)
    }
  }

  return {
    getDisplay,
    press,
    pressSequence,
  }
}

describe('App calculator flow', () => {
  it('concatenates digits on the display in entry order', async () => {
    const { getDisplay, pressSequence } = setup()

    await pressSequence('1', '2', '3')

    expect(getDisplay()).toHaveTextContent('123')
  })

  it('ignores digits entered after the ninth character', async () => {
    const { getDisplay, pressSequence } = setup()

    await pressSequence('1', '2', '3', '4', '5', '6', '7', '8', '9', '0')

    expect(getDisplay()).toHaveTextContent('123456789')
  })

  it('clears the display before entering the next operand after an operator', async () => {
    const { getDisplay, pressSequence } = setup()

    await pressSequence('1', '2', '+', '3')

    expect(getDisplay()).toHaveTextContent('3')
  })

  it('evaluates chained operations when another operator is pressed', async () => {
    const { getDisplay, pressSequence } = setup()

    await pressSequence('2', '+', '3', '×')

    expect(getDisplay()).toHaveTextContent('5')
  })

  it('shows the pending result when equals is pressed', async () => {
    const { getDisplay, pressSequence } = setup()

    await pressSequence('1', '2', '×', '3', '=')

    expect(getDisplay()).toHaveTextContent('36')
  })

  it('shows ERROR when a subtraction result becomes negative', async () => {
    const { getDisplay, pressSequence } = setup()

    await pressSequence('1', '-', '2', '=')

    expect(getDisplay()).toHaveTextContent('ERROR')
  })

  it('shows ERROR when an operation exceeds the maximum display value', async () => {
    const { getDisplay, pressSequence } = setup()

    await pressSequence('9', '9', '9', '9', '9', '9', '9', '9', '9', '+', '1', '=')

    expect(getDisplay()).toHaveTextContent('ERROR')
  })
})
