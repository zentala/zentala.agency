import React from "react"
import { Col, Row, Typography } from 'antd';
import Layout from "../../components/GlobalLayout"

const { Title } = Typography;

const BlogPage = () => (
  <Layout>
    <section>
    <Title align="center">Blog of Zentala AI Automation Agency</Title>
olit

    <Row justify="space-around" align="center" gutter={[64, 36]}>
      <Col span={8} style={{ textAlign: 'center' }}>
        <img alt="Opis obrazka" />
        <Title level={5} align="center">Praktyczna wiedza o technologii dla praktyków biznesu i marketingu</Title>
      </Col>
      <Col className="col-with-dots" span={8} style={{ textAlign: 'center' }}>
        <img alt="Opis obrazka" />
        <Title level={5} align="center">Najważniejsze trendy i predykcje dotyczące technolii i jej wpływu ba sposób prowadzenia biznesu</Title>
      </Col>
      <Col span={8} style={{ textAlign: 'center' }}>
        <img alt="Opis obrazka" />
        <Title level={5} align="center">Zebrana i ustrukturyzowana wiedza do pobrania za darmo</Title>
      </Col>
    </Row>
    </section>
    <section>
      {/* <BlogTagsFilter /> */}
      {/* <NesletterSquezzeBox /> */}
      {/* <BlogPostsGrid/> */}
    </section>
  </Layout>
)

export default BlogPage
