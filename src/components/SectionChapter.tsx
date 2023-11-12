import React, { ReactNode } from 'react'
import { useIntl } from 'gatsby-plugin-intl'
import { createUseStyles } from 'react-jss'
import Section from './Section'
import { Col, Row, Typography } from 'antd'

interface SectionChapterProps {
  background?: string
  titleId: string
  leadTextId: string
  tableContent?: Array<{ headerId: string; descId: string }>
  children?: ReactNode
}

const useStyles = createUseStyles({
  title: { textTransform: 'uppercase', textAlign: 'center', fontSize: '1.5em', fontWeight: 600, color: '#555' },
  leadText: { textAlign: 'center', fontSize: '2.6em', fontWeight: 400 },
  table: {},
  tableHeader: {},
  tableParagraph: {},
})

const SectionChapter: React.FC<SectionChapterProps> = ({ background, titleId, leadTextId, tableContent, children }) => {
  const intl = useIntl()
  const classes = useStyles()

  return (
    <Section background={background} padding="large">
      <h5 className={classes.title}>{intl.formatMessage({ id: titleId })}</h5>
      <p className={classes.leadText}>{intl.formatMessage({ id: leadTextId })}</p>
      <Row gutter={[16, 16]}>
        {tableContent &&
          tableContent.map((content, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Typography.Title level={4}>{intl.formatMessage({ id: content.headerId })}</Typography.Title>
              <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: content.descId }) }} />
            </Col>
          ))}
      </Row>
      {children}
    </Section>
  )
}

export default SectionChapter
