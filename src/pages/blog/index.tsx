import React from "react"
import { Col, Row, Typography } from 'antd';
import { createUseStyles } from 'react-jss';
import Layout from "../../components/GlobalLayout"
import Section from "../../components/Section"
import OurImage from '../../components/OurImage';

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
    title: 'Praktyczna wiedza o technologii dla praktyków biznesu i marketingu',
    imageAlt: 'Opis obrazka 1',
  },
  {
    key: 'column2',
    title: 'Najważniejsze trendy i predykcje dotyczące technologii i jej wpływu na sposób prowadzenia biznesu',
    imageAlt: 'Opis obrazka 2',
    className: 'col-with-dots',
  },
  {
    key: 'column3',
    title: 'Zebrana i ustrukturyzowana wiedza do pobrania za darmo',
    imageAlt: 'Opis obrazka 3',
  }
];

const BlogPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Section>
        <Title align="center">Blog of Zentala AI Automation Agency</Title>
        <Row justify="space-around" align="middle" gutter={[64, 36]}>
          {columnsContent.map((column) => (
            <Col key={column.key} span={8} className={`${classes.column} ${column.className ?? classes[column.className]}`}>
              <OurImage
                src={undefined}
                alt={column.imageAlt}
                width="70%"
                // height="0"
                style={{
                  paddingBottom: '70%',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
              <Title level={4}>{column.title}</Title>
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

export default BlogPage
