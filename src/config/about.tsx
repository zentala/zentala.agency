import React from 'react'
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  MoneyCollectOutlined,
  BankOutlined,
  GlobalOutlined,
  MailFilled,
  GithubFilled,
  InstagramFilled,
  FacebookFilled,
  LinkedinFilled,
} from '@ant-design/icons'

/*** Company info ***/

interface CompanyProp {
  key: string
  icon: JSX.Element
  data: string
}

export const CompanyInfo: Record<string, CompanyProp> = {
  phone: { key: '1', icon: <PhoneOutlined />, data: '+48 517 17 89 84' },
  email: { key: '2', icon: <MailOutlined />, data: 'zentala@gmail.com' },
  address: { key: '3', icon: <EnvironmentOutlined />, data: 'ul. Dorotowska 2/7, 02-347 Warszawa' },
  nip: { key: '4', icon: <MoneyCollectOutlined />, data: 'NIP: PL5381827962' },
  iban: { key: '5', icon: <BankOutlined />, data: 'IBAN: PL 72 1020 3206 0000 8502 0154 6951' },
  swift: { key: '6', icon: <GlobalOutlined />, data: 'SWIFT: BPKOPLPW' },
}

/* Main navbar links */
export const NavMainLinks = ['offer', 'contact'] // , 'portfolio', 'base', 'blog', 'about', 'contact'
// INFO: edit or remove by key from translation file in the group "menu"

/* Social links */

interface SocialLink {
  url: string
  alt: string
  icon: () => JSX.Element
  hoverColor: string
}

export const SocialLinks: Record<string, SocialLink> = {
  linkedin: {
    alt: 'LinkedIn',
    icon: () => <LinkedinFilled />,
    url: 'https://www.linkedin.com/in/zentala/',
    hoverColor: '#0e76a8',
  },
  facebook: {
    alt: 'facebook',
    icon: () => <FacebookFilled />,
    url: 'https://www.facebook.com/zentala/',
    hoverColor: '#0e76a8',
  },
  instagram: {
    alt: 'Instagram',
    icon: () => <InstagramFilled />,
    url: 'https://www.instagram.com/pzentala/',
    hoverColor: '#0e76a8',
  },
  github: { alt: 'GitHub', icon: () => <GithubFilled />, url: 'https://github.com/zentala', hoverColor: '#0e76a8' },
  mail: { alt: 'E-mail', icon: () => <MailFilled />, url: 'mailto:zentala@gmail.com', hoverColor: '#0e76a8' },
}
