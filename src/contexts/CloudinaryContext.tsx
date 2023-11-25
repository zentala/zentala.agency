import React, { createContext, useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

// Structure for the image data we expect from Cloudinary
interface CloudinaryMedia {
  secure_url: string
  public_id: string
  format: string
  resource_type: 'image' | 'video'
  width: number
  height: number
}

// Shape of the data within the CloudinaryImage context
export interface CloudinaryImageContextType {
  images: CloudinaryMedia[]
}

// Creating the context with a default empty value
const CloudinaryImageContext = createContext<CloudinaryImageContextType>({ images: [] })

// Custom hook to use the CloudinaryImage context
export const useCloudinaryImages = () => useContext(CloudinaryImageContext)

export interface CloudinaryProviderProps {
  children: React.ReactNode
}

// The provider component that wraps your app and makes the CloudinaryImage context available
export const CloudinaryProvider: React.FC<CloudinaryProviderProps> = ({ children }) => {
  const cloudinaryData = useStaticQuery(graphql`
    query CloudinaryImages {
      allCloudinaryMedia {
        edges {
          node {
            secure_url
            public_id
            format
            width
            height
          }
        }
      }
    }
  `)

  const value = {
    images: cloudinaryData.allCloudinaryMedia.edges.map(edge => edge.node)
  }

  return <CloudinaryImageContext.Provider value={value}>{children}</CloudinaryImageContext.Provider>
}

export default CloudinaryImageContext
