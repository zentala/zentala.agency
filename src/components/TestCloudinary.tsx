import React from 'react'
import { useCloudinaryImages } from '../contexts/CloudinaryContext'

const MyComponent = () => {
  const { images } = useCloudinaryImages()
  const image = images.find(img => img.public_id === 'zentala.agency/debate3_mjtlkc')

  return <div>{image ? <img src={image.secure_url} alt="Opis" /> : <p>Obrazek nie został znaleziony.</p>}</div>
}

export default MyComponent
