import { style } from '@vanilla-extract/css'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'

export const pageWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  backgroundColor: colors.background,
})

export const headerStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

export const backButtonStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0',
  color: colors.gray900,
  width: '24px',
  height: '24px',
  flexShrink: 0,
})

export const pageTitleStyle = style({
  fontSize: fontStyles.display.fontSize,
  fontWeight: fontStyles.display.fontWeight,
  color: colors.gray900,
  letterSpacing: '-0.03em',
  lineHeight: '140%',
})

export const contentStyle = style({
  padding: '60px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
})

export const templateNameWidthStyle = style({
  maxWidth: '336px',
})

export const sectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

export const sectionHeaderRowStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

export const sectionTitleStyle = style({
  fontSize: fontStyles.headingMd.fontSize,
  fontWeight: fontStyles.headingMd.fontWeight,
  color: colors.gray900,
  letterSpacing: '-0.03em',
  lineHeight: '140%',
})

export const sectionHintStyle = style({
  fontSize: fontStyles.bodyMd.fontSize,
  fontWeight: fontStyles.bodyMd.fontWeight,
  color: colors.gray300,
  letterSpacing: '-0.03em',
})

export const tableScrollStyle = style({
  overflowX: 'auto',
})

// 알림톡 포함 항목

export const notificationListStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  maxWidth: '542px',
})

export const notificationItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  padding: '15px 16px 15px 12px',
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray75}`,
  borderRadius: '8px',
})

export const notificationItemLeftStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flex: 1,
})

export const notifDragHandleStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  cursor: 'grab',
  color: colors.gray300,
  flexShrink: 0,
  selectors: {
    '&:active': { cursor: 'grabbing' },
  },
})

export const notifDragDotRowStyle = style({
  display: 'flex',
  gap: '3px',
})

export const notifDragDotStyle = style({
  width: '3px',
  height: '3px',
  borderRadius: '50%',
  backgroundColor: 'currentColor',
})

export const commonBadgeStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 12px',
  backgroundColor: colors.primary100,
  borderRadius: '99px',
  fontSize: fontStyles.labelSm.fontSize,
  fontWeight: fontStyles.labelSm.fontWeight,
  color: colors.primary500,
  letterSpacing: '-0.03em',
  flexShrink: 0,
})

export const individualBadgeStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 12px',
  backgroundColor: colors.gray50,
  borderRadius: '99px',
  fontSize: fontStyles.labelSm.fontSize,
  fontWeight: fontStyles.labelSm.fontWeight,
  color: colors.gray700,
  letterSpacing: '-0.03em',
  flexShrink: 0,
})

export const notifItemNameStyle = style({
  fontSize: fontStyles.titleMd.fontSize,
  fontWeight: fontStyles.titleMd.fontWeight,
  color: colors.gray700,
  letterSpacing: '-0.03em',
  lineHeight: '140%',
})

// ─── AS-IS 편집 페이지 스타일 (edit/page.tsx) ────────────────────────────────

export const formHeaderStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px 48px',
  backgroundColor: colors.white,
  borderBottom: `1px solid ${colors.gray100}`,
})

export const formHeaderLeftStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

export const formBackButtonStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0',
  color: colors.gray900,
  width: '24px',
  height: '24px',
  flexShrink: 0,
})

export const pageStyle = style({
  display: 'flex',
  gap: '24px',
  padding: '24px 48px',
  alignItems: 'flex-start',
})

export const leftSectionStyle = style({
  flex: '0 0 calc(58% - 12px)',
  minWidth: 0,
})

export const rightSectionStyle = style({
  flex: '0 0 calc(42% - 12px)',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

export const sectionBoxStyle = style({
  backgroundColor: colors.white,
  borderRadius: '12px',
  border: `1px solid ${colors.gray100}`,
  padding: '24px',
})

// 하단 고정 CTA

export const ctaBarStyle = style({
  position: 'sticky',
  bottom: 0,
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
  paddingBottom: '24px',
  backgroundImage: `linear-gradient(180deg, transparent 0%, ${colors.background} 30%)`,
  pointerEvents: 'none',
})

export const ctaButtonWrapperStyle = style({
  pointerEvents: 'auto',
})
