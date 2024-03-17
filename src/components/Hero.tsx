import React, { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { useIntl } from 'gatsby-plugin-intl'

interface HeroProps {
  containerStyle?: React.CSSProperties
  titleId: string
  subtitleId?: string
  leadId?: string
  footerComponent?: ReactNode
}

const useStyles = createUseStyles({
  hero: {
    textAlign: 'center',
    padding: '50px 0'
  },
  title: {
    marginBottom: '0px',
    fontSize: '92px',
    color: '#444',
    fontWeight: 100,
  },
  subtitle: {
    marginBottom: '40px',
    marginTop: 0,
    fontSize: '32px',
    color: '#555',
    fontWeight: 400,
  },
  paragraph: {
    fontSize: '24px'
  },
  footer: {
    marginTop: '40px'
  }
})

const Hero: React.FC<HeroProps> = ({ containerStyle, titleId, subtitleId, leadId, footerComponent }) => {
  const classes = useStyles()
  const intl = useIntl()

  return (
    <div className={classes.hero} style={containerStyle}>
      {titleId && (
        <h1 className={classes.title} dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: titleId }) }} />
      )}
      {subtitleId && (
        <h2 className={classes.subtitle} dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: subtitleId }) }} />
      )}
      {leadId && (
        <p className={classes.paragraph} dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: leadId }) }} />
      )}
      {footerComponent && <div className={classes.footer}>{footerComponent}</div>}
    </div>
  )
}

export default Hero
