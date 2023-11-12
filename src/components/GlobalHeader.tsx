import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import NavMain from './NavMain'
import Logo from './Logo'
import Section from './Section'

const useStyles = createUseStyles({
  globalHeader: {
    margin: '0 auto',
    padding: [20, 15],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eee',
    position: 'sticky',
    top: 0,
    backgroundColor: '#f7f7f7',
    zIndex: 1000,
    transition: 'padding 0.2s ease-in-out',
    '&.scrolled': {
      padding: [15, 15],
    },
  },
  headerContent: {
    width: '100%', // zajmuje całą szerokość
    display: 'flex', // ustawienie flex
    justifyContent: 'space-between', // logo po lewej, menu po prawej
    alignItems: 'center',
  },
})

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const classes = useStyles()

  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 200) {
      // możesz dostosować ten offset
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  let headerClasses = classes.globalHeader
  if (scrolled) {
    headerClasses += ` ${classes.scrolled}`
  }

  return (
    <Section className={headerClasses} padding="thin">
      <div className={classes.headerContent}>
        <Logo link="/" height="20px" supplement="Innovation Agency" />
        <NavMain />
      </div>
    </Section>
  )
}

export default Header
