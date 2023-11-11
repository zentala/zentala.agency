import React from 'react'
import { Link } from 'gatsby'
import { SocialLinks } from '../config/about'

const NavSocial = () => (
  <nav>
    <ol className="inline-list">
      {SocialLinks.map((link, index) => (
        <ol key={index}>
          <Link to={link.url} aria-description={link.alt}>
            {link.icon}
          </Link>
        </ol>
      ))}
    </ol>
  </nav>
)

export default NavSocial
