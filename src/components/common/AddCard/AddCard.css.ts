import { style } from '@vanilla-extract/css'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'
import { interactiveCardStyleRule } from '@/styles/tokens/card'

export const addCardStyle = style({
  ...interactiveCardStyleRule,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  width: '100%',
  selectors: {
    '&:hover': { backgroundColor: colors.primary50 },
    '&:disabled': {
      cursor: 'not-allowed',
      color: colors.gray300,
    },
  },
  color: colors.gray300,
})