/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config();

const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET
};

// Sprawdź, czy wszystkie wymagane klucze konfiguracji są zdefiniowane
if (!cloudinaryConfig.cloudName || !cloudinaryConfig.apiKey || !cloudinaryConfig.apiSecret) {
  console.warn('Warning: Cloudinary configuration keys are missing. Image functionalities will be limited.');
}

module.exports = {
  siteMetadata: {
    title: `Zentala Innovation Agency`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
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
        type: `upload`
      },
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: cloudinaryConfig.cloudName,
        apiKey: cloudinaryConfig.apiKey,
        apiSecret: cloudinaryConfig.apiSecret,
        resourceType: `video`,
        type: `upload`
      },
    },
  ],
}
