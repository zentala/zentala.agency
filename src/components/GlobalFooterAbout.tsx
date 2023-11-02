import React from 'react';
import { createUseStyles } from 'react-jss';
import { Col, Row } from 'antd';

import { breakpoints } from '../config/antd'; // Importujesz breakpoints
import { footerSpecjalization, footerOffer } from '../config/about';
import NavSocialLinks from './NavSocialLinks';
import Logo from './Logo';
import Section from './Section';

const useStyles = createUseStyles({
  dashedLineColumn: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      top: 0,
      bottom: 0,
      borderLeft: '1px dashed #ccc',
    },
  },
  smallText: {
    textAlign: 'justify', 
    fontSize: '0.85em',
    color: '#888',
  },
  column: {
    // Zdefiniuj breakpoint dla medium (md) i zmień marginBottom
    [`@media (max-width: ${breakpoints.md})`]: {
      marginBottom: '1em',
    },
    // Dla large (lg) nie ma dodatkowego margin-bottom
    [`@media (min-width: ${breakpoints.lg})`]: {
      marginBottom: 0,
    },
  },
  // Możesz dodać dodatkowe style tutaj
});

const GlobalFooterAbout = ({}) => {
  const classes = useStyles();

  return (
    <Section background='#eee'>
      <Row gutter={{ md: 24, lg: 0 }}>
        <Col lg={6} className={classes.column}>
          <div style={{ marginBottom: `1em` }}>
            <Logo height={30} />
          </div>
          <NavSocialLinks size="lg"/>
        </Col>
        <Col lg={{ span: 8, offset: 1 }} md={24} className={`${classes.smallText} ${classes.column}`}>
          {footerSpecjalization}
        </Col>
        <Col lg={1} md={0} sm={0} xs={0} className={classes.dashedLineColumn} />
        <Col lg={8} className={classes.smallText}>
          {footerOffer}
        </Col>
      </Row>
    </Section>
  )
}

export default GlobalFooterAbout;
