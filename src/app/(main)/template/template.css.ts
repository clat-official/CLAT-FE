import { style } from '@vanilla-extract/css'

export const gridStyle = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  marginTop: '60px',
  '@media': {
    'screen and (max-width: 1279px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    'screen and (max-width: 767px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
})