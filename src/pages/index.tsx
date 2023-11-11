import React from "react"
import { useIntl, injectIntl } from "gatsby-plugin-intl"

import GlobalLayout from "../components/GlobalLayout"
import HeroLogo from "../components/HeroLogo"
import Section from "../components/Section"
import TestCloudinary from "../components/TestCloudinary"
import Seo from "../components/seo"

const HomePage: React.FC = ({ intl }) => {
  return (
    <GlobalLayout>
      <HeroLogo />

      <Section>
        <TestCloudinary />
        <h2>{intl.formatMessage({ id: "home.mission.header" })}</h2>
        <p>{intl.formatMessage({ id: "home.mission.lead" })}</p>
      </Section>

      <Section background="gray">
        <h2>{intl.formatMessage({ id: "home.how.header" })}</h2>
        <p>{intl.formatMessage({ id: "home.how.lead" })}</p>
      </Section>

      <Section background="white">
        <h2>{intl.formatMessage({ id: "home.detailed.header" })}</h2>
        <p>{intl.formatMessage({ id: "home.detailed.lead" })}</p>
      </Section>
    </GlobalLayout>
  )
}

export const Head = () => <Seo title="Home" />

export default injectIntl(HomePage)
