import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"
import NavMain from './NavMain'
import Logo from './Logo'
import Section from './Section';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200 ) { // możesz dostosować ten offset
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  let headerClasses = ['globalHeader'];
  if (scrolled) {
    headerClasses.push('scrolled');
  }

  return (

    <header className={headerClasses.join(" ")}>
      {/* <div className={"container"}> */}
        <Logo link="/" height="20px" supplement="Innovation Agency"/>
        <NavMain />
      {/* </div> */}
    </header>
  )
}

export default Header
