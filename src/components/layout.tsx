/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ConfigProvider, theme } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

import GlobalHeader from "./GlobalHeader"
import GlobalFooter from "./GlobalFooter"
import "./layout.sass"

const antdTheme = {
  // algorithm: theme.darkAlgorithm,
  token: {
    // colorPrimary: '#00b96b',
    // borderRadius: 2,
    // colorBgContainer: '#f6ffed',
  }
};

const Layout = ({ children }) => {
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
          <GlobalHeader />
          {/* <div className="container"> */}
          <main>{children}</main>
          {/* </div> */}
          <GlobalFooter/>
      </ConfigProvider>
      </StyleProvider>
    </>
  )
}

export default Layout
