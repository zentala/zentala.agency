// import React from "react"
// import { useCloudinaryImages } from "../contexts/CloudinaryContext"

// interface CloudinaryImageProps {
//   prefix?: string
//   id: string
//   description?: string
// }

// // const CloudinaryImage: React.FC<CloudinaryImageProps> = ({ prefix = "zentala.agency/", id, description = "Image" }) => {
// //   const { images } = useCloudinaryImages()
// //   const image = images.find(img => img.public_id === `${prefix}${id}`)

// //   return <div>{image ? <img src={image.secure_url} alt={description} /> : <p>Obrazek nie został znaleziony.</p>}</div>
// // }

// // export default CloudinaryImage

// import React from "react"
// import { useCloudinaryImages } from "../contexts/CloudinaryContext"

// interface CloudinaryImageProps {
//   prefix?: string
//   id: string
//   description?: string
// }

// const CloudinaryImage: React.FC<CloudinaryImageProps> = ({ prefix = "zentala.agency/", id, description = "Image", transformations, customStyles }) => {
//   const { images } = useCloudinaryImages()
//   const image = images.find(img => img.public_id === `${prefix}${id}`)

//   // Użyj dostarczonych niestandardowych stylów lub pozostaw puste obiekty dla braków
//   const imageStyle: React.CSSProperties = {
//     width: customStyles?.width || undefined,
//     height: customStyles?.height || undefined,
//     float: customStyles?.float || undefined,
//     marginRight: customStyles?.marginRight || undefined,
//     borderRadius: customStyles?.borderRadius || undefined,
//   }

//   return <div>{image ? <img src={image.secure_url} alt={description} style={imageStyle} /> : <p>Obrazek nie został znaleziony.</p>}</div>
// }

import React from 'react'
import { useCloudinaryImages } from '../contexts/CloudinaryContext'

interface CloudinaryImageProps {
  prefix?: string
  id: string
  description?: string
  customStyles?: React.CSSProperties // Nowy prop dla niestandardowych stylów
  transformations?: Record<string, string> // Nowy prop dla transformacji obrazu
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  prefix = 'zentala.agency/',
  id,
  description = 'Image',
  customStyles, // Przyjmujemy niestandardowe style
  transformations // Przyjmujemy transformacje obrazu
}) => {
  const { images } = useCloudinaryImages()
  const image = images.find(img => img.public_id === `${prefix}${id}`)

  // Użyj dostarczonych niestandardowych stylów lub pozostaw puste obiekty dla braków
  const imageStyle: React.CSSProperties = {
    width: customStyles?.width || undefined,
    height: customStyles?.height || undefined,
    float: customStyles?.float || undefined,
    marginRight: customStyles?.marginRight || undefined,
    borderRadius: customStyles?.borderRadius || undefined,
    ...transformations // Dodaj dostarczone transformacje obrazu jako style
  }

  return (
    <div>
      {image ? (
        <img src={image.secure_url} alt={description} style={imageStyle} />
      ) : (
        <p>Obrazek nie został znaleziony.</p>
      )}
    </div>
  )
}

export default CloudinaryImage
