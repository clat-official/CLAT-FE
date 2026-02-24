import { recipe } from '@vanilla-extract/recipes'
import { colors } from '@/styles/tokens/colors'

export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: 'Pretendard, sans-serif',
    transition: 'background-color 0.2s, opacity 0.2s',
    whiteSpace: 'nowrap',
    selectors: {
      '&:disabled': {
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: colors.primary500,
        color: colors.gray50,
        selectors: {
          '&:hover:not(:disabled)': { backgroundColor: colors.primary600 },
          '&:active:not(:disabled)': { backgroundColor: colors.primary700 },
          '&:disabled': { backgroundColor: colors.gray300, color: colors.gray100 },
        },
      },
      secondary: {
        backgroundColor: colors.primary100,
        color: colors.primary500,
        selectors: {
          '&:hover:not(:disabled)': { backgroundColor: colors.primary200 },
          '&:active:not(:disabled)': { backgroundColor: colors.primary300 },
          '&:disabled': { backgroundColor: colors.gray50, color: colors.gray200 },
        },
      },
      ghost: {
        backgroundColor: colors.gray50,
        color: colors.gray500,
        selectors: {
          '&:hover:not(:disabled)': { backgroundColor: colors.gray75 },
          '&:active:not(:disabled)': { backgroundColor: colors.gray100 },
          '&:disabled': { backgroundColor: colors.gray50, color: colors.gray100 },
        },
      },
      outlined: {
        backgroundColor: colors.white,
        color: colors.gray700,
        outline: `1px solid ${colors.gray100}`,
        selectors: {
          '&:hover:not(:disabled)': { backgroundColor: colors.primary50, color: colors.primary500, outline: `1px solid ${colors.primary500}` },
          '&:active:not(:disabled)': { backgroundColor: colors.primary50, color: colors.primary500, outline: `1px solid ${colors.primary500}` },
          '&:disabled': { color: colors.gray100, outline: `1px solid ${colors.gray100}` },
        },
      },
      danger: {
        backgroundColor: colors.error500,
        color: colors.white,
        selectors: {
          '&:hover:not(:disabled)': { backgroundColor: colors.error600 },
          '&:active:not(:disabled)': { backgroundColor: colors.error700 },
          '&:disabled': { backgroundColor: colors.gray300, color: colors.gray100 },
        },
      },
    },
    size: {
      sm: { padding: '8px 12px', fontSize: '14px', fontWeight: '500' },
      md: { padding: '12px 128px', fontSize: '14px', fontWeight: '600' },
      lg: { padding: '16px 120px', fontSize: '16px', fontWeight: '600' },
    },
    fullWidth: {
      true: { width: '100%' },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})