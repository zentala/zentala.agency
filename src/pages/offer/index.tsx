import React from "react"
import { Typography } from 'antd';
import Layout from "../../components/GlobalLayout"
import Section from "../../components/Section"
import Seo from "../../components/seo";
import Hero from "../../components/Hero";

const { Title } = Typography;

const OfferPage: React.FC = () => {
  return (
    <Layout>
      <Section>
        <Hero
          containerStyle={{ backgroundColor: '#eee' }}
          titleId="offer.title"
          subtitleId="offer.subtitle"
          footerComponent={<div>test</div>}
        />
      </Section>
    </Layout>
  );
};

export const Head = () => <Seo title="Offer" />

export default OfferPage
