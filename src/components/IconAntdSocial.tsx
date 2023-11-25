import React, { useState, CSSProperties } from 'react'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const sizeMap: Record<Size, string> = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px'
}

type IconGatsbyProps = {
  name: string
  size?: Size
}

const IconGatsby: React.FC<IconGatsbyProps> = ({ name, size = 'md' }) => {
  const [color, setColor] = useState('#333')

  const socialLink = SocialLinks[name]

  if (!socialLink) {
    return null
  }

  const style: CSSProperties = {
    fontSize: sizeMap[size],
    marginRight: '8px',
    color: color,
    transition: 'color 0.3s ease'
  }

  return (
    <span title={socialLink.alt} style={style} onMouseOver={() => setColor('#555')} onMouseOut={() => setColor('#333')}>
      {socialLink.icon()}
    </span>
  )
}

export default IconGatsby
