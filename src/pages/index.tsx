import React from 'react'
import { useIntl } from 'gatsby-plugin-intl'

import GlobalLayout from '../components/GlobalLayout'
import HeroLogo from '../components/HeroLogo'
import Seo from '../components/seo'
import SectionChapter from '../components/SectionChapter'
import TagsCloud from '../components/TagsCloud'
import CtaDiscoverySession from '../components/CtaDiscoverySession'
import CtaNewsletter from '../components/CtaNewsletter'
import { Col, Row } from 'antd'

const HomePage: React.FC = () => {
  const intl = useIntl()

  const tags = [
    { name: 'egalitarianism', description: '' },
    { name: 'equality', description: '' },
    { name: 'inclusivity', description: '' },
    { name: 'dignity', description: '' },
    { name: 'respect', description: '' },
    { name: 'freedom', description: '' },
    { name: 'democracy', description: '' },
    { name: 'health and well-being', description: '' },
    { name: 'ecology', description: '' },
    { name: 'sustainability', description: '' },
    { name: 'symbiosis', description: '' },
    { name: 'conservation and preservation', description: '' },
    { name: 'responsibility', description: '' }
  ]

  return (
    <GlobalLayout>
      <HeroLogo />

      <SectionChapter titleId="home.mission.header" leadTextId="home.mission.lead" maxWidth="lg" />

      <SectionChapter background="#eee" titleId="home.how.header" leadTextId="home.how.lead" maxWidth="lg" />

      {/* <SectionChapter
        titleId="home.detailed.header"
        leadTextId="home.detailed.lead"
        maxWidth="xxl"
        tableContent={[
          { headerId: 'home.service_software_title', descId: 'home.service_software_desc' },
          { headerId: 'home.service_hardware_title', descId: 'home.service_hardware_desc' },
          { headerId: 'home.service_automation_title', descId: 'home.service_automation_desc' },
          { headerId: 'home.service_consulting_title', descId: 'home.service_consulting_desc' },
          { headerId: 'home.service_ux_title', descId: 'home.service_ux_desc' },
          { headerId: 'home.service_marketing_title', descId: 'home.service_marketing_desc' }
        ]}
      /> */}

      {/* <SectionChapter background="#eee" titleId="home.why.header" leadTextId="home.why.lead" maxWidth="lg">
        <>
          <p className="midLead" style={{ textAlign: 'center' }}>
            {intl.formatMessage({ id: 'home.why.p1' })}
          </p>
          <p className="midLead" style={{ textAlign: 'center' }}>
            {intl.formatMessage({ id: 'home.why.p11' })}
          </p>
          <p className="midLead" style={{ textAlign: 'center' }}>
            {intl.formatMessage({ id: 'home.why.p2' })}
          </p>
          <p className="midLead" style={{ textAlign: 'center' }}>
            {intl.formatMessage({ id: 'home.why.p3' })}
          </p>
          <TagsCloud tags={tags} style={{ margin: '2rem auto 3rem' }} />
          <p className="midLead" style={{ textAlign: 'center' }}>
            {intl.formatMessage({ id: 'home.why.p5' })}
          </p>
          <h2 style={{ textAlign: 'center' }}>{intl.formatMessage({ id: 'home.why.p6' })}</h2>
        </>
      </SectionChapter> */}
      <SectionChapter background="#fff" titleId="home.start.header" leadTextId="home.start.lead">
        <Row gutter={36}>
          <Col xs={24} sm={8}>
            <CtaDiscoverySession />
          </Col>
          <Col xs={24} sm={16}>
            <CtaNewsletter />
          </Col>
        </Row>
      </SectionChapter>

      {/* <Section background="#eee">
        <TestCloudinary />
      </Section> */}
    </GlobalLayout>
  )
}

export const Head = () => <Seo title="Home" />

export default HomePage
