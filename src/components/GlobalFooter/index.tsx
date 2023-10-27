import React from 'react';

import Newsletter from './Newsletter' // let's convert to out newsletter as first
import About from './About' // share some info about company for SEO and new users
import Links from './Links' // print neccessary footer links, copy, privacy policy, etc

import './index.sass'

const GlobalFooter = ({}) => {
  return (
    <>
      <footer className="globalFooter">
        {/* <Newsletter /> */}
        <About />
        <Links />
      </footer>
    </>
  )

}

export default GlobalFooter
