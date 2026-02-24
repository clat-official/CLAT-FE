import { createGlobalTheme } from '@vanilla-extract/css'

export const vars = createGlobalTheme(':root', {
  color: {
    primary: {
      50: '#F1F4FD',
      100: '#E0E7F9',
      200: '#C8D5F5',
      300: '#A3BAED',
      400: '#5774DA',
      500: '#3B51CC',
      600: '#3946BC',
      700: '#333A9A',
      800: '#2E367A',
    },
    gray: {
      50: '#F3F4F5',
      75: '#E5E6EC',
      100: '#D7D7E3',
      200: '#C5C6D3',
      300: '#A9AABF',
      500: '#9492A9',
      600: '#757693',
      700: '#5B5C72',
      900: '#363744',
    },
    semantic: {
      success: {
        50: '#EDFCF5',
        200: '#ABEFD2',
        500: '#1DAA7F',
      },
      warning: {
        50: '#FFF9EB',
        200: '#FFEEC6',
        500: '#FDAD22',
      },
      error: {
        50: '#FFF1F1',
        200: '#FDCED0',
        500: '#EF4453',
        600: '#DC223B',
        700: '#B91730',
      },
    },
  },
  typography: {
    fontSize: {
      display: '28px',
      headingLg: '24px',
      headingMd: '20px',
      headingSm: '18px',
      titleMd: '16px',
      titleSm: '14px',
      bodyLg: '16px',
      bodyMd: '14px',
      labelSm: '12px',
    },
    lineHeight: {
      default: '140%',
    },
    letterSpacing: {
      default: '-0.03em',
    },
    fontWeight: {
      display: '700',
      headingLg: '600',
      headingMd: '600',
      headingSm: '600',
      titleMd: '600',
      titleSm: '600',
      bodyLg: '500',
      bodyMd: '500',
      labelSm: '500',
    },
  },
})
