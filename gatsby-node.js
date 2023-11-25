const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

/**
 * `createPages` is a core function in Gatsby's Node API that is used for dynamically creating pages in a Gatsby site.
 * This function leverages GraphQL to fetch data and uses it to programmatically create pages with specific layouts,
 * using provided templates. It's a key part of Gatsby's data-driven approach to building sites.
 *
 * In this specific implementation, the function is used to create a blog landing page (the main blog index) and
 * individual blog post pages. It queries data about markdown files (or other data sources) and creates pages for
 * them using predefined templates. The paths for these pages are typically derived from the data itself, such as
 * slugs generated from markdown file names.
 *
 * @param {Object} params - The parameters provided by Gatsby's Node API, including graphql and actions.
 * @param {Function} params.graphql - A function for running GraphQL queries to fetch data.
 * @param {Object} params.actions - An object containing actions for creating pages.
 * @param {Function} params.actions.createPage - An action used to create pages programmatically.
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Creating blog home page
  createPage({
    path: '/blog',
    component: require.resolve('./src/templates/BlogHome.tsx')
  })

  // reqiest GraphQL to get all slugs
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // validate potential errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Create single blog posts
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.fields && node.fields.slug) {
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/BlogTemplate.tsx'), // TODO consider, maybe should be in templates not blog
        context: {
          slug: node.fields.slug
        }
      })
    }
  })
}

/**
 * `createSchemaCustomization` is a Gatsby Node API function that allows for explicit definition, customization,
 * and extension of the GraphQL schema used by Gatsby. This function is used to define custom types, interfaces,
 * and fields in the GraphQL schema, ensuring that the data structure is predictable and tailored to specific needs.
 *
 * In this implementation, custom type definitions for `MarkdownRemark` and its associated fields are provided.
 * This includes defining types for frontmatter content and additional fields. By doing this, it helps ensure
 * that the GraphQL queries used in the Gatsby site are properly validated and executed, particularly for Markdown
 * content handling.
 *
 * @param {Object} params - The parameters provided by Gatsby's Node API, including actions.
 * @param {Object} params.actions - An object containing actions for manipulating the GraphQL schema.
 * @param {Function} params.actions.createTypes - An action used to define custom types in the GraphQL schema.
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    
    type Frontmatter {
      title: String
      date: Date
      author: String
      tags: [String]
      lang: String
    }
    
    type Fields {
      slug: String
    }
  `
  createTypes(typeDefs)
}

/**
 * `onCreateWebpackConfig` is a Gatsby Node API function used to modify the default Webpack configuration.
 * It allows for custom Webpack configurations that can enhance or modify the build process of a Gatsby site.
 * This function is particularly useful for adding or overriding Webpack settings, such as adding polyfills
 * or configuring module resolution.
 *
 * In this specific implementation, it's used to add polyfills for various Node.js core modules that are not
 * natively supported in the browser environment. This is crucial for certain dependencies that rely on Node.js
 * modules, ensuring compatibility and preventing build-time errors.
 *
 * @param {Object} params - The parameters provided by Gatsby's Node API, including actions.
 * @param {Object} params.actions - An object containing actions for manipulating the Webpack config.
 * @param {Function} params.actions.setWebpackConfig - An action used to modify the Webpack configuration.
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        stream: require.resolve('stream-browserify')
      }
    }
  })
}

/**
 * `onCreateNode` is a Gatsby Node API function that is called whenever a new node is created or updated.
 * This function is used to programmatically add additional fields to nodes in the GraphQL data layer.
 * In this specific instance, it is used to add a 'slug' field to each MarkdownRemark node, which represents
 * the path to the page that will be created for each markdown file.
 *
 * This is essential for dynamically creating pages from markdown files, as the 'slug' field is used to generate URLs.
 * The `createFilePath` function from `gatsby-source-filesystem` is used to generate the slug based on the markdown file's
 * name and location. This slug is then added to each MarkdownRemark node, making it available in GraphQL queries
 * and allowing pages to be created with URLs derived from the markdown file names.
 *
 * @param {Object} params - The parameters provided by Gatsby's Node API, including node, getNode, and actions.
 * @param {Object} params.node - Represents a single node in the Gatsby data layer.
 * @param {Function} params.getNode - A helper function to retrieve a node by its ID.
 * @param {Object} params.actions - An object containing actions for manipulating nodes and the GraphQL schema.
 * @param {Function} params.actions.createNodeField - An action used to add additional fields to nodes.
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    // Tworzenie pola 'slug' dla każdego posta bloga
    const slug = createFilePath({ node, getNode, basePath: 'pages/blog' })
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}
