import React from "react"

import GlobalLayout from "../components/GlobalLayout"
import HeroLogo from "../components/HeroLogo"
import Section from "../components/Section"

const HomePage = () => (
  <GlobalLayout>
    <HeroLogo />

    <Section>
      regular section (white)
    </Section>

    <Section background="orange">
      section with orange bg
    </Section>

    <Section background="purple">
      section with purple bg
    </Section>
  </GlobalLayout>
)

export default HomePage