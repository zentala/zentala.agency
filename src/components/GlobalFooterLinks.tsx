import React from 'react'
import { Link } from 'gatsby'
import Section from './Section'
import { FormattedMessage } from 'gatsby-plugin-intl'
import { createUseStyles } from 'react-jss'
import LanguageSwitcher from './LanguageSwitcher'

const useStyles = createUseStyles({
  container: {
    color: '#777',
    '& a': {
      color: '#888',
      '&:hover': {
        color: '#999'
      }
    }
  }
})

const DotSeparator: React.FC = () => {
  return <span style={{ margin: '0 12px' }}>&middot;</span>
}

const GlobalFooterLinks: React.FC = () => {
  const classes = useStyles()

  return (
    <Section background="#ddd" padding="thin" className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-sm)' }}>
        <div>
          © {new Date().getFullYear()}{' '}
          <Link to="/">
            <FormattedMessage id="seo.fullName" />
          </Link>
          <DotSeparator />
          <Link to="/privacy-policy">
            <FormattedMessage id="footer.privacy" />
          </Link>
        </div>

        <div>
          <LanguageSwitcher direction="top" />
        </div>
      </div>
    </Section>
  )
}

export default GlobalFooterLinks
