import React from 'react'
import { Button } from 'antd'
import './AntdExtended.sass'

interface OurButtonProps {
  customStyle?: 'lead'
  [key: string]: any
}

export const OurButton: React.FC<OurButtonProps> = ({ customStyle, ...props }) => {
  let className = ''

  if (customStyle === 'lead') {
    className = 'leading-button'
  }

  return <Button className={className} {...props} />
}
