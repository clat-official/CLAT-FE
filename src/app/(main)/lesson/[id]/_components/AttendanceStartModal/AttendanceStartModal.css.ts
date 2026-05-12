import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'

export const titleStyle = style({
  marginTop: '20px',
  marginBottom: '12px',
})

export const subtitleStyle = style({
  marginBottom: '60px',
})

export const timeSectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '28px',
})

export const timeChipGroupStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
})

export const timeChipRecipe = recipe({
  base: {
    width: '64px',
    height: '32px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: fontStyles.titleSm.fontSize,
    fontWeight: fontStyles.titleSm.fontWeight,
    letterSpacing: '-0.03em',
    lineHeight: '140%',
    transition: 'background-color 0.15s, color 0.15s',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: colors.primary50,
        color: colors.primary500,
      },
      false: {
        backgroundColor: colors.gray50,
        color: colors.gray700,
      },
    },
  },
  defaultVariants: { selected: false },
})

export const customInputWrapperStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
})

export const customInputStyle = style({
  width: '80px',
  height: '32px',
  borderRadius: '8px',
  border: `1px solid ${colors.primary500}`,
  backgroundColor: colors.white,
  padding: '0 10px',
  fontSize: fontStyles.titleSm.fontSize,
  fontWeight: fontStyles.titleSm.fontWeight,
  letterSpacing: '-0.03em',
  color: colors.gray900,
  outline: 'none',
  textAlign: 'center',
  selectors: {
    '&::placeholder': { color: colors.gray300 },
  },
})

export const infoBoxStyle = style({
  borderRadius: '12px',
  backgroundColor: colors.primary50,
  padding: '20px',
  marginBottom: '40px',
})

export const buttonGroupStyle = style({
  display: 'flex',
  gap: '12px',
})

export const cancelButtonStyle = style({
  flex: 1,
  height: '54px',
  borderRadius: '12px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: colors.gray50,
  color: colors.gray700,
  fontSize: fontStyles.titleMd.fontSize,
  fontWeight: fontStyles.titleMd.fontWeight,
  letterSpacing: '-0.03em',
  lineHeight: '140%',
})

export const confirmButtonStyle = style({
  flex: 1,
  height: '54px',
  borderRadius: '12px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: colors.primary500,
  color: colors.white,
  fontSize: fontStyles.titleMd.fontSize,
  fontWeight: fontStyles.titleMd.fontWeight,
  letterSpacing: '-0.03em',
  lineHeight: '140%',
})
