import React from 'react'
import { Col, Row, Typography } from 'antd'
import { createUseStyles } from 'react-jss'
import Section from '../../components/Section'
import OurImage from '../../components/OurImage'
import Seo from '../../components/seo'
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl'
import { graphql, Link } from 'gatsby'

const { Title } = Typography

const useStyles = createUseStyles({
  column: {
    textAlign: 'center',
    '& img': {
      width: '70%',
      height: 'auto'
    }
  },
  colWithDots: {
    /* style for col-with-dots class */
  }
})

const columnsContent = [
  // ... (bez zmian)
]

const BlogPage: React.FC = ({ data }) => {
  const classes = useStyles()
  const intl = useIntl()

  const BlogLink = ({ node }) => (
    <li key={node.id}>
      <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
    </li>
  )

  return (
    <>
      <Section>
        <Title align="center">
          <FormattedMessage id="blog.title" />
        </Title>
        <Row justify="space-around" align="middle" gutter={[64, 36]}>
          {columnsContent.map(column => (
            <Col key={column.key} span={8} className={`${classes.column} ${classes[column.className] ?? ''}`}>
              {column.imageId && (
                <OurImage
                  src={column.imageId} // Teraz używamy imageId jako URL obrazu
                  alt={intl.formatMessage({ id: column.altId })}
                  width="70%"
                  style={{ paddingBottom: '70%', display: 'block', margin: '0 auto' }}
                />
              )}
              <Title level={4}>
                <FormattedMessage id={column.titleId} />
              </Title>
            </Col>
          ))}
        </Row>
      </Section>
      <Section>
        <section id="header">
          <h1>Blog</h1>
        </section>
        <section id="blog-list">
          <ul>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <BlogLink node={node} />
            ))}
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <li key={node.id}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </Section>
    </>
  )
}

export const Head = () => <Seo title="Blog" />

export default BlogPage

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            date
            author
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
