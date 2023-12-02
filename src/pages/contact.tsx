import React, { FC } from 'react'
import { Row, Col } from 'antd'
import Section from '../components/Section'
import Seo from '../components/seo'
import GlobalLayout from '../components/GlobalLayout'
import { Link, useIntl } from 'gatsby-plugin-intl'
// import WorldMap from '../components/WorldMap'
import Hero from '../components/Hero'
import CtaContactForm from '../components/CtaContactForm'

const ContactPage: FC = () => {
  // const [form] = Form.useForm()
  const intl = useIntl()

  // const onFinish = (values: any) => {
  //   console.log('Received values of form: ', values)
  // }

  return (
    <GlobalLayout background="#eee">
      {/* <SectionChapter background='#eee' titleId="contact.title" leadTextId="contact.leadText" /> */}
      <Hero containerStyle={{ backgroundColor: 'lightgrey' }} titleId="contact.title" subtitleId="contact.leadText" />
      <Section padding="large">
        <Row gutter={48}>
          <Col span={8}>
            <div>
              <h2 style={{ marginTop: 0 }}>{intl.formatMessage({ id: 'contact.cta' })}</h2>
              <p>{intl.formatMessage({ id: 'contact.intro' })}</p>
              <div style={{ marginTop: '2em' }}>
                <img
                  style={{ width: 100, height: 100, float: 'left', marginRight: 20, borderRadius: '50%' }}
                  src="https://avatars.githubusercontent.com/u/7286123?v=4"
                />
                {/* <CloudinaryImage
                  prefix="me/"
                  id="332017726_520261293524169_4865848693757117488_n_jess1d"
                  description="Image"
                  transformations={{
                    aspectRatio: "1:1",
                    background: "#262c35",
                    border: "5px_solid_rgb:ff0000",
                    gravity: "auto",
                    height: "240",
                    radius: "max",
                    width: "240",
                    crop: "fill",
                  }}
                /> */}

                <h3 style={{ margin: '-5px 0 5px 0' }}>Paweł Żentała</h3>
                <p>
                  <Link to={'mailto:zentala@gmail.com'}>zentala@gmail.com</Link>
                  <br />
                  <Link to={'tel:+48517178984'}>+48 517 17 89 84</Link>
                  <br />
                  {/* <Link to="https://www.linkedin.com/in/zentala/" target="_blank"><LinkedinOutlined style={{ fontSize: '24px' }} /></Link> */}
                </p>
              </div>
            </div>
          </Col>
          <Col span={14}>
            <CtaContactForm />
          </Col>
        </Row>
      </Section>
      {/* <Section background="#f8f8f8" >
        <div style={{ padding: '20px 0 40px 0' }}>
          <h2 style={{ marginTop: 0 }}>
            <FormattedMessage id="contact.company_data" />
          </h2>
          <div>
            <Row gutter={16}>
              <Col span={6}>
                <Card
                  title={
                    <span
                      dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'contact.company_info_address' }) }}
                      style={{ fontSize: '1.2rem' }}
                    />
                  }
                  bordered={false}
                >
                  <p>
                    <span
                      dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'contact.company_info_full_name' }) }}
                    />
                    <br />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({ id: 'contact.company_info_address_street' })
                      }}
                    />
                    <br />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({ id: 'contact.company_info_address_city' })
                      }}
                    />
                    <br />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({ id: 'contact.company_info_address_country' })
                      }}
                    />
                  </p>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title={
                    <span
                      dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'contact.company_legal_data' }) }}
                      style={{ fontSize: '1.2rem' }}
                    />
                  }
                  bordered={false}
                >
                  <p>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({ id: 'contact.company_legal_address_street' })
                      }}
                    />
                    <br />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({ id: 'contact.company_legal_address_city' })
                      }}
                    />
                    <br />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({ id: 'contact.company_legal_data_vat_ue' })
                      }}
                    />
                    <br />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({ id: 'contact.company_legal_data_regon' })
                      }}
                    />
                  </p>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title={
                    <span
                      dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'contact.company_account' }) }}
                      style={{ fontSize: '1.2rem' }}
                    />
                  }
                  bordered={false}
                >
                  <p>
                    <span
                      dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'contact.company_account_iban' }) }}
                    />
                    <br />
                    <span
                      dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'contact.company_account_bank' }) }}
                    />
                    <br />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({ id: 'contact.company_account_bic_swift' })
                      }}
                    />
                  </p>
                </Card>
              </Col>

              <Col span={6}>
                <Card
                  title={
                    <span
                      dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'contact.opening_hours_title' }) }}
                      style={{ fontSize: '1.2rem' }}
                    />
                  }
                  bordered={false}
                >
                  <p>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({ id: 'contact.opening_hours_description' })
                      }}
                    />
                  </p>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Section> */}
      {/* <SectionChapter titleId="contact.map_title" leadTextId="contact.map_lead_text" customStyles={{ marginBottom: 0 }}>
        <div>
          <WorldMap />
        </div>
      </SectionChapter> */}
    </GlobalLayout>
  )
}

export const Head = () => <Seo title="Contact" />

export default ContactPage
