require('dotenv').config()

const getEnvVar = key => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Environment variable ${key} not found`)
  }
  return value
}

const envConfig = {
  emailJs: {
    serviceId: getEnvVar('GATSBY_EMAILJS_SERVICE_ID'),
    templateId: getEnvVar('GATSBY_EMAILJS_TEMPLATE_ID'),
    publicKey: getEnvVar('GATSBY_EMAILJS_PUBLIC_KEY')
  },
  cloudinary: {
    cloudName: getEnvVar('CLOUDINARY_CLOUD_NAME'),
    apiKey: getEnvVar('CLOUDINARY_API_KEY'),
    apiSecret: getEnvVar('CLOUDINARY_API_SECRET')
  },
  strapi: {
    token: getEnvVar('STRAPI_TOKEN')
  }
}

module.exports = envConfig
