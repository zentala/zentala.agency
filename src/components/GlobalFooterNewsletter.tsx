/*
  WIP therefore temporarily ignoring the following ESLint errors
  TODO: 
   - Connect external newsletter
   - Handle displaying validation messages
   - Post-regstration redirections, etc.
*/

/* eslint-disable */

import React, { useState } from 'react'
import { Link } from 'gatsby'

import { Col, Row, Typography, Space, Button, Input, Form, Checkbox } from 'antd'
import { CheckOutlined, MailOutlined } from '@ant-design/icons'
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox'

const { Title } = Typography

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

type NewsletterFormFields = {
  email: string
  approval: boolean
}

// .globalNewsletter
//     background: #f7f7f7
//     padding: 30px auto
//     border-top: 1px solid #eee

const GlobalFooterNewsletter = ({}) => {
  const [checked, setChecked] = useState(true)

  const toggleChecked = () => {
    setChecked(!checked)
  }

  const onChange = (e: CheckboxChangeEvent) => {
    console.log('checked = ', e.target.checked)
    setChecked(e.target.checked)
  }

  return (
    <section className="globalNewsletter middle">
      <div className="wrapper">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Row>
            <Col lg={10}>
              <Title level={1}>Zapisz się na Newsletter</Title>
            </Col>
            <Col span={14}>
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  size="large"
                  placeholder="Twój główny adres e-mail"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                />
                <Button role="submit" size="large" icon={<CheckOutlined />} type="primary">
                  Submit
                </Button>
              </Space.Compact>
              <Space style={{ marginTop: '1em' }}>
                <Checkbox checked={checked} onChange={onChange}>
                  Zgadzam się na przetwarzanie swoich danych osobowych zgodnie z{' '}
                  <Link to="/polityka-prywatnosci">Polityką Prywatności</Link>.
                  {/* TODO opisanym w <a>Polityce Prywatności</a> oraz <a>Warunkach Korzystania z usługi</a> */}
                </Checkbox>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
    </section>
  )
}

export default GlobalFooterNewsletter
