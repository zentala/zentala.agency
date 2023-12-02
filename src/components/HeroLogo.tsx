import React from 'react'
import { createUseStyles } from 'react-jss'

import Logo from './Logo'

const useStyles = createUseStyles({
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    backgroundImage: 'linear-gradient(to right bottom, #111, #222)'
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  logoContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    position: 'relative',
    width: '100%',
    height: '40vw',
    paddingTop: '5vw',
    paddingBottom: '5vw',
    '& > div': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }
  }
})

const HeroLogo: React.FC = () => {
  const styles = useStyles()

  const logoStyle: Record<string, React.CSSProperties> = {
    sygnet: {
      opacity: 0.3,
      zIndex: 2,
      width: '20%'
    },
    full: {
      opacity: 1,
      zIndex: 3,
      width: '80%'
    }
  }

  return (
    <div className={styles.container}>
      <video autoPlay muted loop className={styles.video} src="/images/heroSmoke.mp4"></video>
      <div className={styles.logoContainer}>
        <Logo type="sygnet" containerStyle={logoStyle.sygnet} color="white" />
        <Logo
          type="full"
          containerStyle={logoStyle.full}
          color="white"
          supplement="Innovation Agency"
          supplementPosition="bottom"
          uppercase
          suplementStyle={{
            fontSize: 'calc(100%*4)',
            marginTop: '1vw',
            letterSpacing: '1.5vw',
            marginLeft: 0,
            marginRight: '-1.5vw',
            fontWeight: 600
          }}
        />
      </div>
    </div>
  )
}

export default HeroLogo
