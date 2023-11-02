import React from 'react';
import { Link } from 'gatsby';
import Section from './Section';

const GlobalFooterLinks = ({}) => {
  return (
    <Section background="#ccc" padding='thin'>
      <div style={{ fontSize: `var(--font-sm)` }}> 
        Copyright © {new Date().getFullYear()} {` `} <Link to="/">Zentala AI Automation Agency</Link> 
        {` `} &middot; {` `}
        <Link to="/polityka-prywatnosci">Polityka prywatności</Link> 
        {/* {` `} &middot; {` `} */}
      </div>
    </Section>
  )
}

export default GlobalFooterLinks