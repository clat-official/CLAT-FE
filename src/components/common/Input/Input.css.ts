import { style } from '@vanilla-extract/css'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'

export const inputStyle = style({
  width: '100%',
  padding: '10px 16px',
  borderRadius: '8px',
  border: `1px solid ${colors.gray100}`,
  backgroundColor: colors.white,
  fontSize: fontStyles.bodyMd.fontSize,
  fontWeight: fontStyles.bodyMd.fontWeight,
  lineHeight: '140%',
  letterSpacing: '-0.03em',
  color: colors.gray700,
  outline: 'none',
  transition: 'border-color 0.2s',
  selectors: {
    '&::placeholder': {
      color: colors.gray300,
    },
    '&:focus': {
      borderColor: colors.primary500,
    },
    '&:disabled': {
      color: colors.gray100,
      cursor: 'not-allowed',
    },
  },
})