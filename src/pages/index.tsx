import React from 'react'

import GlobalLayout from '../components/GlobalLayout'
import HeroLogo from '../components/HeroLogo'
import Section from '../components/Section'
import TestCloudinary from '../components/TestCloudinary'
import Seo from '../components/seo'
import SectionChapter from '../components/SectionChapter'
import { useIntl } from 'gatsby-plugin-intl'

const HomePage: React.FC = () => {
  const intl = useIntl()
  return (
    <GlobalLayout>
      <HeroLogo />

      <SectionChapter titleId="home.mission.header" leadTextId="home.mission.lead" />

      <SectionChapter background="#eee" titleId="home.how.header" leadTextId="home.how.lead" />

      <SectionChapter
        titleId="home.detailed.header"
        leadTextId="home.detailed.lead"
        tableContent={[
          { headerId: 'home.detailed.service.software.title', descId: 'home.detailed.service.software.desc' },
          { headerId: 'home.detailed.service.hardware.title', descId: 'home.detailed.service.hardware.desc' },
          { headerId: 'home.detailed.service.automation.title', descId: 'home.detailed.service.automation.desc' },
          { headerId: 'home.detailed.service.consulting.title', descId: 'home.detailed.service.consulting.desc' },
          { headerId: 'home.detailed.service.ux.title', descId: 'home.detailed.service.ux.desc' },
          { headerId: 'home.detailed.service.marketing.title', descId: 'home.detailed.service.marketing.desc' },
        ]}
      />

      <SectionChapter background="#eee" titleId="home.why.header" leadTextId="home.why.lead">
        <>
          <p>{intl.formatMessage({ id: 'home.why.p1' })}</p>
          <p>{intl.formatMessage({ id: 'home.why.p2' })}</p>
          <p>{intl.formatMessage({ id: 'home.why.p3' })}</p>
          <h4>{intl.formatMessage({ id: 'home.why.p4' })}</h4>
          <p>{intl.formatMessage({ id: 'home.why.p5' })}</p>
          <h4>{intl.formatMessage({ id: 'home.why.p6' })}</h4>
        </>
      </SectionChapter>
      <SectionChapter background="#eee" titleId="home.start.header" leadTextId="home.start.lead" />

      <Section background="#eee">
        <TestCloudinary />
      </Section>
    </GlobalLayout>
  )
}

export const Head = () => <Seo title="Home" />

export default HomePage
