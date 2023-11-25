import React, { useState, CSSProperties } from 'react'
import { Link } from 'gatsby'
import { SocialLinks } from '../config/about'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const sizeMap: Record<Size, string> = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px'
}

type LinkIconProps = {
  name: string
  size?: Size
}

const IconLink: React.FC<LinkIconProps> = ({ name, size = 'md' }) => {
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
    <Link
      to={socialLink.url}
      target="_blank"
      rel="noopener noreferrer"
      title={socialLink.alt}
      style={{ cursor: 'pointer' }}
      onMouseOver={() => setColor('#555')}
      onMouseOut={() => setColor('#333')}
    >
      <span style={style}>{socialLink.icon()}</span>
    </Link>
  )
}

export default IconLink
