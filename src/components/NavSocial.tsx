import React from 'react'
import { Link } from "gatsby"
import { NavSocialLink } from '../config/links';



const NavSocial = () => (
  <nav>
    <ol className="inline-list">
      {NavSocialLink.map((link, index) => (
        <ol key={index}>
          <Link to={link.url} aria-description={link.alt}>{link.icon}</Link>
        </ol>
      ))}
    </ol>
  </nav>
)



export default NavSocial
