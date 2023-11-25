/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import React, { ReactNode } from 'react'
import { ConfigProvider, Layout } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'

import { CloudinaryProvider } from '../contexts/CloudinaryContext'

import GlobalHeader from './GlobalHeader'
import GlobalFooterAbout from './GlobalFooterAbout'
import GlobalFooterLinks from './GlobalFooterLinks'

import './layout.sass'

const { Content, Footer } = Layout

const antdTheme = {
  // algorithm: theme.darkAlgorithm,
  token: {
    // colorPrimary: '#00b96b',
    // borderRadius: 2,
    // colorBgContainer: '#f6ffed',
  }
}

interface GlobalLayoutProps {
  children: ReactNode
  background?: string
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children, background }) => {
  const contentStyle = background ? { background: background } : {}

  return (
    <>
      <CloudinaryProvider>
        <StyleProvider hashPriority="high">
          <ConfigProvider theme={antdTheme}>
            <Layout>
              <GlobalHeader />
              <Content style={contentStyle}>{children}</Content>
              <Footer style={{ padding: 0, margin: 0 }}>
                <GlobalFooterAbout />
                <GlobalFooterLinks />
              </Footer>
            </Layout>
          </ConfigProvider>
        </StyleProvider>
      </CloudinaryProvider>
    </>
  )
}

export default GlobalLayout
