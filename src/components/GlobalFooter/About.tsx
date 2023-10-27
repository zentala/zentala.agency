import React from 'react';
import { Col, Row } from 'antd'

import { footerSpecjalization, footerOffer } from '../../config/about'

import NavSocialLinks from '../NavSocialLinks'
import Logo from '../Logo'

const GlobalFooterAbout = ({}) => {
  return (
    <section className='middle'>
      <div className='wrapper'>
        <Row>
          <Col lg={6}>
            <div style={{ marginBottom: `1em` }}>
              <Logo height={30} />
            </div>
            <NavSocialLinks size="lg"/>
          </Col>
          <Col lg={9} className='dashed-neightbout-container'>
            {footerSpecjalization}
          </Col>
          <Col lg={9} className="dashed-border-container">
            {footerOffer}
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default GlobalFooterAbout