import React from 'react'
import Layout from '../components/GlobalLayout'
import KontaktBox from '../components/ContactBox'
import Section from '../components/Section'
import Seo from '../components/seo'
import { FormattedMessage } from 'gatsby-plugin-intl'

const oNas: React.FC = () => {
  return (
    <Layout>
      <Section>
        <div>
          <h2>
            <FormattedMessage id="contact.title" />
          </h2>
          [form: imię i naziwsko, adres email, numer telefonu, twoja wiadomosc, dodaj załacznik, checkboax + zgodam,
          wyślij]
        </div>
        <div>
          [graphic]
          <h3>Paweł Żentała</h3>
          <h6>Solution Architect</h6>
          <div>
            <div>
              [icon]
              <h2>Zadzwoń</h2>
              <p className="lead">+48 517 17 8984</p>
            </div>
            <div>
              [icon]
              <h2>Napisz</h2>
              <p className="lead">zentala@gmail.com</p>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div>
          <h2>Wpadnij pogadać</h2>
          [mapa]
          <h4>Nasze biuro w Warszawie</h4>
          <p>
            ul. Dorotowska 2/7
            <br />
            O2-347 Warszawa
          </p>
        </div>
        <div>
          <h2>Dane firmy</h2>
          <p>
            Paweł Żentała Consulting
            <br />
            Dorotowska 2/7, 02-347 Warszawa NIP XXXXXXXXXXXXXXXXX Dane do przelewów (PKO BP): PL
            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX SWIFT XXXXXXX
          </p>
        </div>
      </Section>
      {/* TODO wyłączyć NL tutaj */}
    </Layout>
  )
}

export const Head = () => <Seo title="Contact" />

export default oNas
