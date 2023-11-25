import React from 'react'
import { Typography } from 'antd'
import { OurButton } from './OurButton'

const { Title, Paragraph } = Typography

const CtaDiscoverySession = () => {
  return (
    <div>
      <Title level={1}>Reserve Slot for Business Needs Discovery Session</Title>
      <Paragraph style={{ fontSize: '120%' }}>
        If you manage a business that may need improvements or fine-tuning, or if you're just looking for inspiration
        and want to have a casual talk about what awesome things we can build for you, sign up for a 30-minute discovery
        session.
      </Paragraph>
      <Paragraph style={{ fontSize: '120%' }}>
        I will collect needed information about your business, needs, challenges, and aspirations, and come back with
        proposals of tailor-made solutions.
      </Paragraph>
      <OurButton type="primary" href="https://calendly.com/zentala/discovery">
        Sign Up for Business Needs Discovery Session
      </OurButton>
      {/*  customStyle="cta" */}
    </div>
  )
}

export default CtaDiscoverySession
