import React from 'react'
import { Button, ButtonProps } from 'antd'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  leadingButton: {
    fontSize: 24,
    height: 60,
    padding: '6px 40px',
    borderRadius: 100
  },
  ctaButton: {
    maxWidth: '100%',
    height: 60,
    '& > span': {
      fontSize: 32,
      padding: '10px 30px',
      margin: '10px auto 0'
    }
    // Możesz dodać dodatkowe style dla "cta", jeśli to konieczne
  }
})

interface OurButtonProps extends ButtonProps {
  customStyle?: 'lead' | 'cta'
}

export const OurButton: React.FC<OurButtonProps> = ({ customStyle, ...props }) => {
  const classes = useStyles()

  let className = ''
  if (customStyle === 'lead') {
    className = classes.leadingButton
  } else if (customStyle === 'cta') {
    className = classes.ctaButton
  }

  return <Button className={className} {...props} />
}
