import React from 'react'
import { Layout } from 'antd'

import GlobalLayout from '../../components/GlobalLayout'
import PortfolioView from '../../components/PortfolioView'
import Seo from '../../components/seo'
import Hero from '../../components/Hero'

const { Content } = Layout

const PortfolioPage: React.FC = () => {
  return (
    <GlobalLayout>
      <Hero
        containerStyle={{ backgroundColor: 'white' }}
        titleId="portfolio.title"
        subtitleId="portfolio.subtitle"
        leadId="portfolio.lead"
        footerComponent={<div>test</div>}
      />

      <Content style={{ maxWidth: 1200, margin: 'auto', padding: '0 20px' }}>
        <PortfolioView />
      </Content>
    </GlobalLayout>
  )
}

export const Head = () => <Seo title="Portfolio" />

export default PortfolioPage
