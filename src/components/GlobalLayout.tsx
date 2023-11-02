/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import React, { ReactNode } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ConfigProvider, Layout } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

import GlobalHeader from "./GlobalHeader"
import "./layout.sass"
import GlobalFooterAbout from "./GlobalFooterAbout";
import GlobalFooterLinks from "./GlobalFooterLinks";

const { Header, Content, Footer } = Layout;

const antdTheme = {
  // algorithm: theme.darkAlgorithm,
  token: {
    // colorPrimary: '#00b96b',
    // borderRadius: 2,
    // colorBgContainer: '#f6ffed',
  }
};

interface GlobalLayoutProps {
  children: ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <>
      <StyleProvider hashPriority="high">
        <ConfigProvider theme={antdTheme}>
          <Layout>
            <GlobalHeader />
            {/* <div className="container"> */}
            <Content>
              {children}
            </Content>
            {/* </div> */}
            <Footer style={{ padding: 0, margin: 0 }}>
              <GlobalFooterAbout />
              <GlobalFooterLinks />
            </Footer>
          </Layout>
        </ConfigProvider>
      </StyleProvider>
    </>
  )
}

export default GlobalLayout
