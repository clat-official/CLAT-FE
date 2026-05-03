import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'

export const inputWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
})

export const inputSuffix = style({
  position: 'absolute',
  right: '16px',
  color: colors.gray300,
  fontSize: fontStyles.bodyMd.fontSize,
  fontWeight: fontStyles.bodyMd.fontWeight,
  pointerEvents: 'none',
})

export const inputRecipe = recipe({
  base: {
    width: '100%',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: fontStyles.bodyMd.fontSize,
    fontWeight: fontStyles.bodyMd.fontWeight,
    lineHeight: '140%',
    letterSpacing: '-0.03em',
    color: colors.gray700,
    outline: 'none',
    transition: 'all 0.2s',
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
  },
  variants: {
    variant: {
      default: {
        backgroundColor: colors.white,
        border: `1px solid ${colors.gray100}`,
      },
      gray: {
        backgroundColor: colors.background,
        border: `1px solid ${colors.gray50}`,
      },
    },
    hasError: {
      true: {
        borderColor: colors.error500,
        selectors: {
          '&:focus': {
            borderColor: colors.error500,
          },
        },
      },
    },
    shape: {
      square: {
        height: '48px',
        borderRadius: '8px',
      },
      capsule: {
        height: '48px',
        borderRadius: '999px',
        padding: '0 32px',
        border: `1px solid ${colors.gray200}`,
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    shape: 'square',
  },
})
