import React from "react"
import { Col, Row, Space, Layout, Typography } from 'antd'
import { FormattedMessage } from "gatsby-plugin-intl";

import GlobalLayout from "../../components/GlobalLayout"
import LinkIcon from "../../components/LinkIcon"
import PortfolioView from "../../components/PortfolioView";
import Seo from "../../components/seo";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const PortfolioPage = () => (
  <GlobalLayout>

    <Header style={{ backgroundColor: 'white', textAlign: 'center', padding: '50px 0', height: 500 }}>
      <Title level={1} style={{ marginBottom: '0px', fontSize: '92px' }}>
        <FormattedMessage id="portfolio.title" />
      </Title>
      <Title level={2} style={{ marginBottom: '20px', marginTop: 0, fontSize: '32px' }}>
        Odkryj Naszą Twórczość
      </Title>
      <Paragraph style={{ fontSize: '24px' }}>
        Każdy projekt to <strong>historia sukcesu</strong> napisana innowacją.<br />
        Zobacz nasze <strong>majstersztyki</strong> i przekonaj się, że możemy uczynić wielkie rzeczy także dla Ciebie.<br />
        Twoja wizja + Nasza ekspertyza = <strong>Rewolucja w branży</strong>.
      </Paragraph>
    </Header>

    <Content style={{ maxWidth: 1200, margin: 'auto', padding: '0 20px' }}>
      <PortfolioView />
    </Content>



  </GlobalLayout>
)

export const Head = () => <Seo title="Portfolio" />

export default PortfolioPage
