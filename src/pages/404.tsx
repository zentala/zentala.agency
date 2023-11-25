import * as React from 'react'
import { Button, Typography } from 'antd'
import Seo from '../components/seo'
import CloudinaryImage from '../components/CloudinaryImage'
import Section from '../components/Section'
import IconAntd from '../components/IconAntd'

const { Paragraph } = Typography

const NotFoundPage = () => (
  <Section valign="center">
    <CloudinaryImage id="404" />
    <h1>404: Not Found</h1>
    <Paragraph>Sorry, the page you visited does not exist.</Paragraph>
    {process.env.NODE_ENV === 'development' && (
      <Paragraph>This is the development mode. Additional debugging information.</Paragraph>
    )}
    <Button
      type="primary"
      size="large"
      className="ant-btn-icon-align-center"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <IconAntd name="home" color="#fff" />
      Back to Home page
    </Button>
  </Section>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
