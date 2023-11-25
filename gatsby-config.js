/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

// const envConfig = {
//   cloudinary: {
//     cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//     apiKey: process.env.CLOUDINARY_API_KEY,
//     apiSecret: process.env.CLOUDINARY_API_SECRET
//   },
//   strapi: {
//     token: process.env.STRAPI_TOKEN
//   }
// };

// if (!envConfig.cloudinary.cloudName || !envConfig.cloudinary.apiKey || !envConfig.cloudinary.apiSecret) {
//   throw new Error("Cloudinary configuration keys are missing.");
// }

// if (!envConfig.strapi.token) {
//   throw new Error("Strapi token is missing.");
// }

const envConfig = require('./gatsby-env.js')

module.exports = {
  siteMetadata: {
    title: `Zentala Innovation Agency`,
    description: `Digital showcase for innovation prototyping services. Hub for those looking to shape and transform ideas into prototypes.`,
    author: `@zentala`,
    siteUrl: `https://zentala.agency/`
  },
  // developMiddleware: app => {
  //   app.use((req, res, next) => {
  //     if (process.env.NODE_ENV === "development") {
  //       res.redirect("/404/");
  //     } else {
  //       next();
  //     }
  //   });
  // },

  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`
      }
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
        crossOrigin: `use-credentials` // `use-credentials` or `anonymous`
      }
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ['GATSBY_EMAILJS_SERVICE_ID', 'GATSBY_EMAILJS_TEMPLATE_ID', 'GATSBY_EMAILJS_PUBLIC_KEY']
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/pages/blog`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`]
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: []
      }
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: envConfig.cloudinary.cloudName,
        apiKey: envConfig.cloudinary.apiKey,
        apiSecret: envConfig.cloudinary.apiSecret,
        resourceType: `image`,
        type: `upload`
      }
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: envConfig.cloudinary.cloudName,
        apiKey: envConfig.cloudinary.apiKey,
        apiSecret: envConfig.cloudinary.apiSecret,
        resourceType: `video`,
        type: `upload`
      }
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en`, `pl`],
        defaultLanguage: `en`,
        redirect: true
      }
    }
    /* TODO: Strapi Token jest dostarczony ale appka nie dziala (403) co sugeruje bledna konfiguracje serwera CMS Strapi */
    /* 
      ERROR #11321  API.NODE.EXECUTION

      "gatsby-source-strapi" threw an error while running the sourceNodes lifecycle:
      
      Request failed with status code 403
      
      
      
        AxiosError: Request failed with status code 403
        
        - settle.js:19 settle
          [ai.zentala.io]/[gatsby-source-strapi]/[axios]/lib/core/settle.js:19:12
        
        - http.js:570 IncomingMessage.handleStreamEnd
          [ai.zentala.io]/[gatsby-source-strapi]/[axios]/lib/adapters/http.js:570:11
        
        - node:events:526 IncomingMessage.emit
          node:events:526:35
        
        - readable:1408 endReadableNT
          node:internal/streams/readable:1408:12
        
        - task_queues:82 processTicksAndRejections
          node:internal/process/task_queues:82:21
        
      
      not finished source and transform nodes - 2.043s
    */

    // {
    //   resolve: `gatsby-source-strapi`,
    //   options: {
    //     apiURL: `https://cms.zentala.agency`,
    //     queryLimit: 1000, // Domyślnie 100
    //     collectionTypes: [`page`, `post`, `project`],
    //     locales: [`en`, `pl`], // Zastąp `en`, `pl` twoimi kodami językowymi
    //     // singleTypes: [`homepage`, `global`], // Jeśli masz pojedyncze typy (opcjonalnie)
    //     headers: {
    //       Authorization: `${envConfig.strapi.token}`
    //     }
    //   }
    // }
  ]
}
