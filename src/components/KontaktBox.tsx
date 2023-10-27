import * as React from "react"
// import { Link } from "gatsby"
// import { links, samplePageLinks } from '../config/navigation'
import { Button, Space, DatePicker, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './KontaktBox.sass'




const Navigaton = () => (
  <div id="kontakt" className="kontakt">
    <div>
      <h2>Skontaktujmy się</h2>
      <Space>
        <DatePicker />
        <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
        <Input placeholder="default size" prefix={<UserOutlined />} />
        <Input size="small" placeholder="small size" prefix={<UserOutlined />} />
        <Button type="primary">Primary Button</Button>
      </Space>
      [imie i naziwako]
      [email]
      [numer trelefonuo]
      [dodaj zalaczik]
      [twoja wiadmosc]
      [checboz] Zgadzam się na przetwarzanie swoich danych osobowych przez Administratora – Żentała Consulting z siedzibą w Warszawie (02-347) przy ul. Dorotowska 2/7 w celu informacyjnym i marketingowym, opisanym w Polityce Prywatności. Strona jest chroniona przez reCAPTCHA i Google. Zobacz: Politykę Prywatności oraz Warunki Korzystania z usługi.
      [WYŚLIJ]
    </div>
    <div>
      loklalizacja, logo warszawy
      +48 517 17 8984
      info@zentala.io
      ul. Dorotowska 2/7
      02-347 Warszawa
      NIP: PLXXXX
      Dane konta: PL XXXX XXXX XXXX XXXX, SWIFT xxxx
    </div>
  </div>
)



export default Navigaton
