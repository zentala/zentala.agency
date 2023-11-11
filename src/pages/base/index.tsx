import React from "react"
import { Typography } from 'antd';
import Layout from "../../components/GlobalLayout"
import Section from "../../components/Section"
import Seo from "../../components/seo";
import { FormattedMessage } from "gatsby-plugin-intl";

const { Title } = Typography;

const BasePage: React.FC = () => {
  return (
    <Layout>
      <Section>
        <Title align="center"><FormattedMessage id="base.title" /></Title>
      </Section>
    </Layout>
  );
};

export const Head = () => <Seo title="Base" />

export default BasePage
