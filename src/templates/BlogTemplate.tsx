import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/GlobalLayout'

interface BlogTemplateProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        date: string
        author: string
        tags: string[]
      }
      html: string
    }
  }
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout>
      <article>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>
        <p>Author: {frontmatter.author}</p>
        <p>Tags: {frontmatter.tags && frontmatter.tags.join(', ')}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        author
        tags
      }
      html
    }
  }
`

export default BlogTemplate
