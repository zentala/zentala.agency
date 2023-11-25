import React, { useState, CSSProperties } from 'react'
import { Icons } from '../config/about'

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
  color: string
  hoverColor?: string
}

const IconAntd: React.FC<IconGatsbyProps> = ({ name, size = 'md', color = '#333', hoverColor }) => {
  const [iconColor, setIconColor] = useState(color)

  const antdIcon = Icons[name]

  if (!antdIcon) {
    return null
  }

  const style: CSSProperties = {
    fontSize: sizeMap[size],
    marginRight: '8px',
    color: iconColor,
    transition: 'color 0.3s ease'
  }

  const handleMouseOver = () => {
    if (hoverColor) {
      setIconColor(hoverColor)
    }
  }

  const handleMouseOut = () => {
    setIconColor(color)
  }

  return (
    <span title={antdIcon.alt} style={style} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {antdIcon.icon()}
    </span>
  )
}

export default IconAntd
