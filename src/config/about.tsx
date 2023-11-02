import React from 'react';
import { 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined, 
  MoneyCollectOutlined, 
  BankOutlined, 
  GlobalOutlined,
  MailFilled, GithubFilled, InstagramFilled, FacebookFilled, LinkedinFilled
} from '@ant-design/icons';




/*** Company info ***/ 

interface CompanyProp {
  key: string;
  icon: JSX.Element;
  data: string;
}

export const CompanyInfo: Record<string, CompanyProp> = {
  phone: { key: '1', icon: <PhoneOutlined />, data: '+48 517 17 89 84' },
  email: { key: '2', icon: <MailOutlined />, data: 'zentala@gmail.com' },
  address: { key: '3', icon: <EnvironmentOutlined />, data: 'ul. Dorotowska 2/7, 02-347 Warszawa' },
  nip: { key: '4', icon: <MoneyCollectOutlined />, data: 'NIP: PL5381827962' },
  iban: { key: '5', icon: <BankOutlined />, data: 'IBAN: PL 72 1020 3206 0000 8502 0154 6951' },
  swift: { key: '6', icon: <GlobalOutlined />, data: 'SWIFT: BPKOPLPW' }
};




/* Main navbar links */

interface NavLink {
  url: string;
  text: string;
  badge?: boolean;
  desc?: string;
}

export const NavMainLinks: NavLink[] = [
  { text: "Oferta", url: "/", badge: false },
  { text: "AI Automation", url: "/automation", badge: false },
  { text: "Portfolio", url: "/portfolio", badge: false },
  { text: "Baza wiedzy", url: "/baza-wiedzy" },
  { text: "Blog", url: "/blog", badge: false, desc: "A simple example of linking to another page within a Gatsby site" },
  // { text: "Inspirations catalog", url: "/inspirations" },
  { text: "O nas", url: "/o-nas" },
  { text: "Kontakt", url: "/kontakt" }
]




/* Social links */

interface SocialLink {
  url: string;
  alt: string;
  icon: () => JSX.Element;
  hoverColor: string;
}

export const SocialLinks: Record<string, SocialLink> = {
  linkedin: { alt: "LinkedIn", icon: () => <LinkedinFilled />, url: "https://www.linkedin.com/in/zentala/", hoverColor: '#0e76a8' },
  facebook: { alt: "facebook", icon: () => <FacebookFilled />, url: "https://www.facebook.com/zentala/", hoverColor: '#0e76a8' },
  instagram: { alt: "Instagram", icon: () => <InstagramFilled />, url: "https://www.instagram.com/pzentala/", hoverColor: '#0e76a8' },
  github: { alt: "GitHub", icon: () => <GithubFilled />, url: "https://github.com/zentala", hoverColor: '#0e76a8' },
  mail: { alt: "E-mail", icon: () => <MailFilled />, url: "mailto:zentala@gmail.com", hoverColor: '#0e76a8' }
};




/* Footer texts */
export const footerSpecjalization = "Agencja Innowacji specjalizuje się w wdrażaniu kompleksowych aplikacji i rozwiązań z zakresu oprogramowania, stron internetowych, marketingu, sztucznej inteligencji, automatyzacji, robotyzacji oraz Internetu Rzeczy (IoT). Nasza agencja dostarcza zaawansowane technologie, które efektywnie podnoszą wartość operacyjną i konkurencyjność Twojej firmy na rynku.";
export const footerOffer = "Oferujemy szeroki zakres usług skoncentrowanych wczesnym stadium implementacji technologi przyszłości. Nasze główne obszary działania to: edukacja i konsulting w zakresie nowych technologii, analiza wykonawcza i analityka biznesowa innowacyjnych projektów, tworzenie dokumentacji, budowa prototypów (Proof of Concept) i budowa zespołów IT kontynuujacych rozwój i utrzymanie projektów.";
