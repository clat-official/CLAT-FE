import { style } from '@vanilla-extract/css'
import { colors } from '@/styles/tokens/colors'

export const dragHandleStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  cursor: 'grab',
  color: colors.gray300,
  flexShrink: 0,
  width: '16px',
  alignItems: 'center',
  selectors: {
    '&:active': {
      cursor: 'grabbing',
    },
  },
})

export const dragDotRowStyle = style({
  display: 'flex',
  gap: '2px',
})

export const dragDotStyle = style({
  width: '3px',
  height: '3px',
  borderRadius: '50%',
  backgroundColor: 'currentColor',
})
