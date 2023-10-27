import React from 'react';
import { Link } from 'gatsby';

const GlobalFooterAbout = ({}) => {
  return (
    <section className="thin" style={{ backgroundColor: `#ccc` }}>
      <div className='wrapper' style={{ fontSize: `var(--font-sm)` }}> 
        Copyright © {new Date().getFullYear()} {` `} <Link to="/">Zentala AI Automation Agency</Link> 
        {/* {` `} &middot; {` `} */}
        {/* <Link to="/polityka-prywatnosci">Polityka prywatności</Link>  */}
        {/* {` `} &middot; {` `} */}
      </div>
    </section>
  )
}

export default GlobalFooterAbout