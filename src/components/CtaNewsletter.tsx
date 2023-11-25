import React from 'react'
import { Button, Typography, Input, Checkbox, Row, Col } from 'antd'
import IconEmoji from './IconEmoji'
import { Link } from 'gatsby-plugin-intl'

const { Title, Paragraph } = Typography

const CtaNewsletter = () => {
  return (
    <div>
      <Title level={1}>Sign Up for Newsletter & Innovation Mastermind Group Waitlist</Title>
      <Paragraph style={{ fontSize: '120%' }}>
        Program for business owners, directors, board members, investors, and professional innovators. Updates about
        practical innovations ready to implement in business from areas of IoT, Machine Learning, Robotics, and others.
        A huge amount of inspiration and structured know-how of what and how you can implement. Innovation overview.
      </Paragraph>
      <Paragraph style={{ fontSize: '120%' }}>
        We will also put attention to providing inspirations about business models, financing, building teams capable of
        innovating, change management, building and evaluating prototypes, testing the market, and marketing.
      </Paragraph>
      <Paragraph style={{ fontSize: '120%' }}>
        The Mastermind is intended to be a great first step for you to prepare the concept of radical innovation for
        implementing in your business. From exploring possibilities to grow and expand, through checking up solutions up
        to building up a team around and starting talks about how to finance it.
      </Paragraph>

      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={18}>
          <Input placeholder="Your primary e-mail address..." size="large" />
        </Col>
        <Col xs={24} sm={6}>
          <Button type="primary" block size="large">
            Sign Up Now!
          </Button>
        </Col>
        <Col xs={24}>
          <Checkbox defaultChecked>
            Sign up for the newsletter so you will be informed about all new free content published!
          </Checkbox>
          <Paragraph>
            <IconEmoji emoji="🔒" label="Security" /> Your data are safe with us.{' '}
            <Link to="privacy-policy/">Read more in our privacy policy.</Link>
          </Paragraph>
        </Col>
      </Row>
    </div>
  )
}

export default CtaNewsletter
