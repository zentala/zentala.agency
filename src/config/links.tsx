import React, { FC } from "react";
import { FacebookOutlined, InstagramOutlined, GithubOutlined, LinkedinOutlined, MailOutlined, MailTwoTone, MailFilled, GithubFilled, InstagramFilled, FacebookFilled, LinkedinFilled }  from '@ant-design/icons';

// export const links = [
//   {
//     text: "Tutorial2",
//     url: "https://www.gatsbyjs.com/docs/tutorial",
//     description:
//       "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
//   },
//   {
//     text: "Examples",
//     url: "https://github.com/gatsbyjs/gatsby/tree/master/examples",
//     description:
//       "A collection of websites ranging from very basic to complex/complete that illustrate how to accomplish specific tasks within your Gatsby sites.",
//   },
//   {
//     text: "Plugin Library",
//     url: "https://www.gatsbyjs.com/plugins",
//     description:
//       "Learn how to add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
//   },
//   {
//     text: "Build and Host",
//     url: "https://www.gatsbyjs.com/cloud",
//     description:
//       "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
//   },
// ]



interface NavLink {
  url: string;
  text: string;
  badge?: boolean;
  desc?: string;
}

export const NavMainLinks: NavLink[] = [
  { text: "Oferta", url: "/", badge: false },
  // { text: "Baza wiedzy", url: "/baza-wiedzy" },
  // { text: "Blog", url: "/blog", badge: false, desc: "A simple example of linking to another page within a Gatsby site" },
  // { text: "Inspirations catalog", url: "/inspirations" },
  { text: "O nas", url: "/o-nas" },
  { text: "Kontakt", url: "/kontakt" }
]

interface SocialLink {
  url: string;
  alt: string;
  icon: () => JSX.Element;
}

export const SocialLinks: Record<string, SocialLink> = {
  linkedin: { alt: "LinkedIn", icon: () => <LinkedinFilled />, url: "https://www.linkedin.com/in/zentala/" },
  facebook: { alt: "facebook", icon: () => <FacebookFilled />, url: "https://www.facebook.com/zentala/" },
  instagram: { alt: "Instagram", icon: () => <InstagramFilled />, url: "https://www.instagram.com/pzentala/" },
  github: { alt: "GitHub", icon: () => <GithubFilled />, url: "https://github.com/zentala" },
  mail: { alt: "E-mail", icon: () => <MailFilled />, url: "mailto:zentala@gmail.com" }
};
