import React, { ReactNode } from 'react'
import { Row, Col, Grid } from 'antd'
import { Breakpoint, breakpoints } from '../config/antd'
const { useBreakpoint } = Grid

interface SectionProps {
  children: ReactNode
  background?: string
  maxWidth?: Breakpoint
  padding?: 'thin' | 'normal' | 'big' | 'large'
  className?: string
}

const Section: React.FC<SectionProps> = ({
  children,
  background = '#ffffff', // global default section background
  maxWidth = 'xl', // global default section breakpoint
  padding = 'normal',
  className = '',
}) => {
  const screens = useBreakpoint()
  const maxWidthInPx = breakpoints[maxWidth]
  const paddingMultipliers = { thin: 0.5, normal: 1, big: 2, large: 3 }

  const baseVerticalPadding = screens.xl ? '40px' : screens.lg ? '30px' : screens.md ? '20px' : '20px'

  const verticalPadding = `${parseFloat(baseVerticalPadding) * paddingMultipliers[padding]}px`

  const horizontalPadding = screens.xs ? '10px' : '20px'

  return (
    <Row
      style={{ background, padding: `${verticalPadding} ${horizontalPadding}` }}
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      className={className}
    >
      <Col span={24} style={{ maxWidth: maxWidthInPx, margin: '0 auto' }}>
        {children}
      </Col>
    </Row>
  )
}

export default Section
