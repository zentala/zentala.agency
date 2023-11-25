import React, { ReactNode } from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import { createUseStyles } from 'react-jss'
import Section from './Section'
import { Col, Row, Typography } from 'antd'
import { Breakpoint } from '../config/antd'

interface SectionChapterProps {
  background?: string
  titleId: string
  leadTextId?: string
  tableContent?: Array<{ headerId: string; descId: string }>
  children?: ReactNode
  maxWidth?: Breakpoint
  customStyles?: React.CSSProperties
}

const useStyles = createUseStyles({
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: '1.5em',
    fontWeight: 600,
    color: '#555'
  },
  leadText: {
    textAlign: 'center',
    fontSize: '2.6em',
    fontWeight: 400
  },
  table: {},
  tableHeader: {},
  tableParagraph: {},
  subTitle: {
    textAlign: 'center',
    fontSize: '1.8em',
    marginBottom: '1.2em !important',
    fontWeight: 600,
    color: '#555'
  },
  subParagraph: {
    fontSize: '1.2em'
  }
})

const SectionChapter: React.FC<SectionChapterProps> = ({
  background,
  titleId,
  leadTextId,
  tableContent,
  children,
  maxWidth,
  customStyles
}) => {
  const intl = useIntl()
  const classes = useStyles()

  return (
    <Section background={background} padding="large" maxWidth={maxWidth} styles={customStyles}>
      <h5 className={classes.title}>{intl.formatMessage({ id: titleId })}</h5>
      {leadTextId && <p className={classes.leadText}>{intl.formatMessage({ id: leadTextId })}</p>}
      {tableContent && (
        <Row gutter={[36, 36]} style={{ marginTop: '2em' }}>
          {tableContent.map((content, index) => (
            <Col key={index} xs={36} sm={12} md={8}>
              <Typography.Title level={3} className={classes.subTitle}>
                {intl.formatMessage({ id: content.headerId })}
              </Typography.Title>
              <div
                className={classes.subParagraph}
                dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: content.descId }) }}
              />
            </Col>
          ))}
        </Row>
      )}
      {children}
    </Section>
  )
}

export default SectionChapter
