import React from 'react'

import GlobalLayout from '../components/GlobalLayout'
import HeroLogo from '../components/HeroLogo'
import Section from '../components/Section'
import TestCloudinary from '../components/TestCloudinary'
import Seo from '../components/seo'
import SectionChapter from '../components/SectionChapter'

const HomePage: React.FC = () => {
  return (
    <GlobalLayout>
      <HeroLogo />

      {/* <Section background="#eee">
        <TestCloudinary />
      </Section> */}

      <SectionChapter titleId="home.mission.header" leadTextId="home.mission.lead" />

      <SectionChapter background="#eee" titleId="home.how.header" leadTextId="home.how.lead" />

      <SectionChapter
        titleId="home.detailed.header"
        leadTextId="home.detailed.lead"
        // tableContent={[
        //   { headerId: "home.detailed.service.software.title", paragraphsId: ["para1", "para2"] },
        //   { headerId: "tableHeader2", paragraphsId: ["para3", "para4"] }
        // ]}
      />
    </GlobalLayout>
  )
}

export const Head = () => <Seo title="Home" />

export default HomePage
