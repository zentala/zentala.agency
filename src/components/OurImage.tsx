import React from 'react'
import { Image, Spin } from 'antd'
import { createUseStyles } from 'react-jss'

// Definiowanie stylów JSS dla placeholdera i spinnera
const useStyles = createUseStyles({
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholder: {
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    color: '#ccc',
    width: '100%', // Pełna szerokość kontenera
    height: '100%' // Pełna wysokość kontenera
  }
})

interface OurImageProps {
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
  style?: React.CSSProperties
  fallback?: string
}

const OurImage: React.FC<OurImageProps> = ({ src, alt, width, height, style, fallback = 'placeholder_image.jpg' }) => {
  const classes = useStyles()

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      placeholder={
        <div className={classes.spinnerContainer} style={{ width, height }}>
          {src ? <Spin /> : <div className={classes.placeholder}>Image</div>}
        </div>
      }
      fallback={fallback}
    />
  )
}

export default OurImage
