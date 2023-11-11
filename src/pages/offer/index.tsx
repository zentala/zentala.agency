import React from 'react'
import { Typography } from 'antd'
import Layout from '../../components/GlobalLayout'
import Section from '../../components/Section'
import Seo from '../../components/seo'
import Hero from '../../components/Hero'

const { Title } = Typography

const OfferPage: React.FC = () => {
  return (
    <Layout>
      <Hero containerStyle={{ backgroundColor: '#eee' }} titleId="offer.title" subtitleId="offer.subtitle" />
      <Section>
        <p>
          Grid with example solutions we can offer to our clients. Last element is suggesting request for custom
          solutions.
        </p>
      </Section>
    </Layout>
  )
}

export const Head = () => <Seo title="Offer" />

export default OfferPage
