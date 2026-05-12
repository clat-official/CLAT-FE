import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'

export const titleStyle = style({
  marginTop: '20px',
  marginBottom: '12px',
})

export const metaRowStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '36px',
})

export const metaItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

export const statCardGroupStyle = style({
  display: 'flex',
  gap: '8px',
  marginBottom: '36px',
})

export const statCardStyle = style({
  flex: 1,
  borderRadius: '12px',
  backgroundColor: colors.gray50,
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
})

export const statNumberStyle = style({
  fontSize: '28px',
  fontWeight: '600',
  letterSpacing: '-0.03em',
  lineHeight: '140%',
})

export const filterChipGroupStyle = style({
  display: 'flex',
  gap: '8px',
  marginBottom: '16px',
})

export const filterChipRecipe = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 12px',
    borderRadius: '999px',
    border: 'none',
    cursor: 'pointer',
    fontSize: fontStyles.titleSm.fontSize,
    fontWeight: fontStyles.titleSm.fontWeight,
    letterSpacing: '-0.03em',
    lineHeight: '140%',
    transition: 'background-color 0.15s',
  },
  variants: {
    active: {
      true: {
        backgroundColor: colors.primary500,
        color: colors.white,
      },
      false: {
        backgroundColor: colors.gray50,
        color: colors.gray700,
      },
    },
  },
  defaultVariants: { active: false },
})

export const studentListStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  // 행 높이 25px(badge 기준) × 4쌍 + gap 16px × 3 = 148px
  maxHeight: 'calc(4 * 25px + 3 * 16px)',
  overflowY: 'auto',
  marginBottom: '32px',
})

export const studentRowGroupStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
})

export const studentItemStyle = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const studentRightStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
})

export const statusBadgeRecipe = recipe({
  base: {
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '-0.03em',
    lineHeight: '140%',
  },
  variants: {
    status: {
      출석: { backgroundColor: colors.success50, color: colors.success500 },
      결석: { backgroundColor: colors.error50, color: colors.error500 },
      미응답: { backgroundColor: colors.gray50, color: colors.gray500 },
    },
  },
})

export const endButtonStyle = style({
  width: '100%',
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
