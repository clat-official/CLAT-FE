import Text from '@/components/common/Text'
export default function HomePage() {
  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Text variant="display" as="h1" color='primary500'>display · 28px</Text>
      <Text variant="headingLg" as="h2">headingLg · 24px</Text>
      <Text variant="headingMd" as="h3">headingMd · 20px</Text>
      <Text variant="headingSm" as="h4">headingSm · 18px</Text>
      <Text variant="titleMd" as="p">titleMd · 16px</Text>
      <Text variant="titleSm" as="p">titleSm · 14px</Text>
      <Text variant="bodyLg" as="p">bodyLg · 16px</Text>
      <Text variant="bodyMd" as="p">bodyMd · 14px</Text>
      <Text variant="labelSm" as="span">labelSm · 12px</Text>
    </div>
  )
}