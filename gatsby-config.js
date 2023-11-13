/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config()

const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
}

// Sprawdź, czy wszystkie wymagane klucze konfiguracji są zdefiniowane
if (!cloudinaryConfig.cloudName || !cloudinaryConfig.apiKey || !cloudinaryConfig.apiSecret) {
  throw new Error('Cloudinary configuration keys are missing.')
}

module.exports = {
  siteMetadata: {
    title: `Zentala Innovation Agency`,
    description: `Digital showcase for innovation prototyping services. Hub for those looking to shape and transform ideas into prototypes.`,
    author: `@zentala`,
    siteUrl: `https://zentala.agency/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Zentala Innovation Agency`,
        short_name: `ZentalaAgency`,
        start_url: `/`,
        background_color: `#fff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        theme_color: `#000`,
        display: `standalone`,
        icon: `src/images/favicon-sygnet.png`, // This path is relative to the root of the site.
        crossOrigin: `use-credentials`, // `use-credentials` or `anonymous`
      },
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: cloudinaryConfig.cloudName,
        apiKey: cloudinaryConfig.apiKey,
        apiSecret: cloudinaryConfig.apiSecret,
        resourceType: `image`,
        type: `upload`,
      },
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: cloudinaryConfig.cloudName,
        apiKey: cloudinaryConfig.apiKey,
        apiSecret: cloudinaryConfig.apiSecret,
        resourceType: `video`,
        type: `upload`,
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en`, `pl`],
        defaultLanguage: `en`,
        redirect: true,
      },
    },
  ],
}
