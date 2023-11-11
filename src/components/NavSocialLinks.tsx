import React from 'react'
import { SocialLinks } from '../config/about'
import LinkIcon, { Size } from './LinkIcon'

interface NavSocialLinksProps {
  size?: Size
}

const NavSocialLinks: React.FC<NavSocialLinksProps> = ({ size = 'md' }) => {
  const socialKeys = Object.keys(SocialLinks)

  return (
    <div>
      {socialKeys.map((key, index) => (
        <LinkIcon key={index} name={key} size={size} />
      ))}
    </div>
  )
}

export default NavSocialLinks
