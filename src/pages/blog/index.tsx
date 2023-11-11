import React from "react"
import { Col, Row, Typography } from 'antd';
import { createUseStyles } from 'react-jss';
import Layout from "../../components/GlobalLayout"
import Section from "../../components/Section"
import OurImage from '../../components/OurImage';
import Seo from "../../components/seo";
import { FormattedMessage, useIntl } from "gatsby-plugin-intl";

const { Title } = Typography;

const useStyles = createUseStyles<string>({
  column: {
    textAlign: 'center',
    '& img': {
      width: '70%',
      height: 'auto'
    },
  }
});

const columnsContent = [
  {
    key: 'column1',
    titleId: 'blog.hero.feat1.title',
    altId: 'blog.hero.feat2.alt',
    imageId: '',
  },
  {
    key: 'column2',
    titleId: 'blog.hero.feat2.title',
    altId: 'blog.hero.feat2.alt',
    imageId: '',
    className: 'col-with-dots',
  },
  {
    key: 'column3',
    titleId: 'blog.hero.feat3.title',
    altId: 'blog.hero.feat3.alt',
    imageId: ''
  }
];

const BlogPage: React.FC = () => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Layout>
      <Section>
        <Title align="center"><FormattedMessage id="blog.title" /></Title>
        <Row justify="space-around" align="middle" gutter={[64, 36]}>
          {columnsContent.map((column) => (
            <Col key={column.key} span={8} className={`${classes.column} ${column.className ?? classes[column.className]}`}>
              <OurImage
                src={undefined}
                alt={intl.formatMessage({ id: column.altId })}
                width="70%"
                // height="0"
                style={{
                  paddingBottom: '70%',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
              <Title level={4}><FormattedMessage id={column.titleId} /></Title>
            </Col>
          ))}
        </Row>
      </Section>
      <Section>
        {/* <BlogTagsFilter /> */}
        {/* <NesletterSquezzeBox /> */}
        {/* <BlogPostsGrid/> */}
      </Section>
    </Layout>
  );
};

export const Head = () => <Seo title="Blog" />

export default BlogPage
