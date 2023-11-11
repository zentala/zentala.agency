import React from 'react';
import { Link } from 'gatsby';
import Section from './Section';
import { FormattedMessage } from 'gatsby-plugin-intl';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    background: 'blue',
    a: {
      color: '#555',
      '&:hover': {
        color: '#333'
      }
    }
  }
})

const DotSeparator: React.FC = () => {
  return <span style={{ margin: '0 10px' }}>&middot;</span>;
};

const GlobalFooterLinks: React.FC = ({}) => {
  const classes = useStyles();

  return (
    <Section background="#ccc" padding='thin' className={classes.container}>
      <div style={{ fontSize: `var(--font-sm)` }}> 
        © {new Date().getFullYear()} {` `} <Link to="/"><FormattedMessage id="seo.fullName" /></Link> 
        <DotSeparator />
        <Link to="/privacy-policy"><FormattedMessage id="footer.privacy" /></Link> 
        {/* {` `} &middot; {` `} */}
      </div>
    </Section>
  )
}

export default GlobalFooterLinks
