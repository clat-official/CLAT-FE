import type { Preview } from '@storybook/react'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: '#FAFAFA' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
  },
}

export default preview
