import React from 'react'
import { Card, Form, Input, Button, Checkbox, Row, Col, Space } from 'antd'
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  ArrowRightOutlined,
  EnvironmentOutlined,
  BankOutlined,
  MoneyCollectOutlined,
  GlobalOutlined,
} from '@ant-design/icons'
import { Link } from 'gatsby'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './ContactBox.sass'
import TableSimple from './TableSimple'

import { CompanyInfo } from '../config/about'

// const dataSource = [
//   {
//     key: '1',
//     icon: <PhoneOutlined />,
//     data: <Link to="tel:+48517178984">+48 517 17 89 84</Link>
//   },
//   {
//     key: '2',
//     icon: <MailOutlined />,
//     data: <Link to="mailto:zentala@gmail.com">zentala@gmail.com</Link>
//   },
//   {
//     key: '3',
//     icon: <EnvironmentOutlined />,
//     data: 'ul. Dorotowska 2/7, 02-347 Warszawa'
//   },
//   {
//     key: '4',
//     icon: <MoneyCollectOutlined />,
//     data: 'NIP: PL5381827962'
//   },
//   {
//     key: '5',
//     icon: <BankOutlined />,
//     data: 'IBAN: PL 72 1020 3206 0000 8502 0154 6951'
//   },
//   {
//     key: '6',
//     icon: <GlobalOutlined />,
//     data: 'SWIFT: BPKOPLPW'
//   }
// ];

// Konwersja obiektów z konfiguracji na format używany przez dataSource
const dataSource = Object.values(CompanyInfo).map(info => ({
  key: info.key,
  icon: info.icon,
  data: generateDataElement(info.data, info.icon),
}))

function generateDataElement(data: string, icon: JSX.Element) {
  if (icon.type === PhoneOutlined) {
    return <Link to={`tel:${data}`}>{data}</Link>
  } else if (icon.type === MailOutlined) {
    return <Link to={`mailto:${data}`}>{data}</Link>
  }
  return data
}

const columns = [
  {
    dataIndex: 'icon',
    key: 'icon',
  },
  {
    dataIndex: 'data',
    key: 'data',
  },
]

const ContactBox = () => {
  return (
    <Card className="kontakt_box" style={{ padding: 64 }} id="contact-box">
      <Row gutter={160}>
        <Col lg={15} className="border-right">
          <h2>Skontaktujmy się</h2>
          <Form layout="vertical">
            <Form.Item
              label="Imię i nazwisko"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Proszę wpisać swoje imię i nazwisko!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Imię i nazwisko" size="large" />
            </Form.Item>

            <Input.Group>
              <Row gutter={16}>
                <Col md={24} lg={12}>
                  <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Proszę wpisać swój adres e-mail!',
                      },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="E-mail" size="large" />
                  </Form.Item>
                </Col>
                <Col md={24} lg={12}>
                  <Form.Item
                    label="Numer telefonu"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: 'Proszę wpisać swój numer telefonu!',
                      },
                    ]}
                  >
                    <PhoneInput
                      country={'pl'}
                      placeholder="Numer telefonu"
                      containerClass="phone-input-container"
                      inputStyle={{ maxWidth: '100%', width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>

            <Form.Item label="Dodaj załącznik">
              <Button icon={<UploadOutlined />} size="large">
                Wybierz plik
              </Button>
            </Form.Item>
            <Form.Item label="Twoja wiadomość" required>
              <Input.TextArea rows={5} size="large" />
            </Form.Item>

            <Form.Item
              name="privacyPolicy"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: 'Proszę zaakceptować politykę prywatności.',
                },
              ]}
              style={{ display: 'flex', flexDirection: 'column-reverse' }}
            >
              <Checkbox>
                Zgadzam się na przetwarzanie moich danych osobowych zgodnie z{' '}
                <Link to="/polityka-prywatnosci">Polityką Prywatności</Link>. Wyrażam również zgodę na korzystanie z
                technologii takich jak cookies i na przetwarzanie moich danych osobowych przez Żentała Consulting w
                celach marketingowych. <span style={{ color: 'red' }}></span>
              </Checkbox>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" size="large" icon={<ArrowRightOutlined />}>
                Wyślij
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col lg={9}>
          <div className="info-section">
            <img src="/images/warsaw-palace-of-culture.svg" />
            <h3>🏙️ 🧜Warszawa, 🇵🇱, 🇪🇺</h3>
            <hr className="ant-divider-horizontal" />
            <TableSimple dataSource={dataSource} columns={columns} />
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default ContactBox
