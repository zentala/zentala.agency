import React from 'react'
import { Typography } from 'antd'
import Layout from '../../components/GlobalLayout'
import Section from '../../components/Section'
import Seo from '../../components/seo'
import { FormattedMessage } from 'gatsby-plugin-intl'
import Hero from '../../components/Hero'

const { Title } = Typography

const BasePage: React.FC = () => {
  return (
    <Layout>
      <Hero
        containerStyle={{ backgroundColor: '#eee' }}
        titleId="base.title"
        subtitleId="base.subtitle"
        footerComponent={<div>some filter component</div>}
      />
      <Section>
        content, some grid like on the blog. some elements will be bigger, some smaller, or there will be another way I
        will mark impotnaccy. i think aboit some colourfull tags and backgrounds of elements. element can cotain title,
        lead text, text, quote, code, tags, and I should be able to mix content components, fill them with what I want.
      </Section>
    </Layout>
  )
}

export const Head = () => <Seo title="Base" />

export default BasePage
