/*
  WIP therefore temporarily ignoring the following ESLint errors
  TODO: 
   - Connect external mailer service
   - Handle displaying success, errors & validaton messages
*/

/* eslint-disable */

import React, { useRef } from 'react'
import { Form, Row, Col, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useIntl } from 'gatsby-plugin-intl'
import IconAntd from './IconAntd'

const CtaContactForm = () => {
  const form = useRef<HTMLFormElement>(null)
  const intl = useIntl()
  const [formInstance] = Form.useForm()

  const envConfig = {
    serviceID: process.env.GATSBY_EMAILJS_SERVICE_ID,
    templateID: process.env.GATSBY_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.GATSBY_EMAILJS_PUBLIC_KEY
  }

  // const onFinish = () => {
  //   if (form.current) {
  //     emailjs.sendForm(envConfig.serviceID, form.current, envConfig.templateID, envConfig.publicKey).then(
  //       result => {
  //         console.log(result.text)
  //       },
  //       error => {
  //         console.log(error.text)
  //       }
  //     )
  //   }
  // }

  return (
    <Form ref={form} onFinish={formInstance.submit} layout="vertical">
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label={intl.formatMessage({ id: 'contact.fname_label' })}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder={intl.formatMessage({ id: 'contact.fname_placeholder' })} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label={intl.formatMessage({ id: 'contact.sname_label' })}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder={intl.formatMessage({ id: 'contact.sname_placeholder' })} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            name="email"
            label={intl.formatMessage({ id: 'contact.email_label' })}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder={intl.formatMessage({ id: 'contact.email_placeholder' })} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label={intl.formatMessage({ id: 'contact.phone_label' })}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder={intl.formatMessage({ id: 'contact.phone_placeholder' })} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="message"
        label={intl.formatMessage({ id: 'contact.msg_label' })}
        size="large"
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={4} placeholder={intl.formatMessage({ id: 'contact.msg_placeholder' })} />
      </Form.Item>
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item name="attachment" label={intl.formatMessage({ id: 'contact.attach_label' })}>
            <Upload>
              <Button size="large" icon={<UploadOutlined />}>
                {intl.formatMessage({ id: 'contact.attach_placeholder' })}
              </Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12} style={{ paddingTop: 32 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{
              float: 'right',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'scale(1.1)',
              transformOrigin: 'bottom right',
              textAlign: 'right'
            }}
          >
            <IconAntd name="send" color={'#ffff'} />
            {intl.formatMessage({ id: 'contact.btn_send' })}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default CtaContactForm
