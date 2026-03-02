import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'

export const pageStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '60px',
  paddingBottom: '80px',
})

export const headerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const backButtonStyle = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: colors.gray500,
  display: 'flex',
  alignItems: 'center',
})

export const headerLeftStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

export const headerButtonGroupStyle = style({
  display: 'flex',
  gap: '8px',
})

export const footerStyle = style({
  position: 'fixed',
  bottom: 0,
  left: '240px',
  right: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 48px',
  backgroundColor: colors.primary100,
  borderTop: `1px solid ${colors.gray100}`,
  zIndex: 100,
})

export const sectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
})

export const templateSectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

export const templateLabelRowStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

export const templateChipGroupStyle = style({
  display: 'flex',
  gap: '8px',
})

export const templateChipRecipe = recipe({
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