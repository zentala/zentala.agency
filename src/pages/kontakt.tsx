import React from "react"
import Layout from "../components/GlobalLayout"
import KontaktBox from "../components/ContactBox"

const oNas = () => (
  <Layout>
    <section>
      <div>
        <h2>Porozmawiajmy o Twoim biznesie</h2>
        [form: imię i naziwsko, adres email, numer telefonu, twoja wiadomosc, dodaj załacznik, checkboax + zgodam, wyślij]
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
    </section>
    <section>
      <div>
        <h2>Wpadnij pogadać</h2>
        [mapa]
        <h4>Nasze biuro w Warszawie</h4>
        <p>ul. Dorotowska 2/7<br/>O2-347 Warszawa</p>
      </div>
      <div>
        <h2>Dane firmy</h2>
        <p>
        Paweł Żentała Consulting<br/>
        Dorotowska 2/7, 02-347 Warszawa
        NIP XXXXXXXXXXXXXXXXX

        Dane do przelewów (PKO BP):
        PL XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        SWIFT XXXXXXX 
        </p>
      </div>
    </section>
    {/* TODO wyłączyć NL tutaj */}
  </Layout>
)

export default oNas
