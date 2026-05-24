import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import '../src/App.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'calculator-surface',
      values: [
        { name: 'calculator-surface', value: '#bcbcbc' },
        { name: 'dark-frame', value: '#111111' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
      },
    },
  },
}

export default preview
