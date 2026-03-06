import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'

export const modalContentStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
})

export const chipGroupStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

export const actionsStyle = style({
  display: 'flex',
  gap: '8px',
})

export const chipButtonRecipe = recipe({
  base: {
    height: '40px',
    padding: '0 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: fontStyles.bodyMd.fontSize,
    fontWeight: fontStyles.bodyMd.fontWeight,
    letterSpacing: '-0.03em',
    lineHeight: '140%',
    transition: 'background-color 0.15s, border-color 0.15s, color 0.15s',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: colors.primary100,
        border: `1px solid ${colors.primary500}`,
        color: colors.primary500,
      },
      false: {
        backgroundColor: colors.white,
        border: `1px solid ${colors.gray100}`,
        color: colors.gray500,
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
})
