import React from "react"
import Layout from "../components/GlobalLayout"
import { Link } from 'gatsby';
import { Col, Row, Typography } from 'antd';
const { Title, Paragraph, Text  } = Typography;

import Seo from "../components/seo"

const PrivacyPolicy: React.FC = () => {
  return (
  <Layout>
    <section>
      <div className="wrapper">
        <Title level={1}>Polityka Prywatności</Title>
        <Paragraph>Data ostatniej aktualizacji: <strong>27 października 2023</strong></Paragraph>

        <Title level={2}>Wprowadzenie</Title>
        <Paragraph>
          Dziękujemy za odwiedzenie strony internetowej:
          <ul style={{marginLeft: `1em`}}>
            <li>prowadzonej przez <Text strong>Paweł Zentala Consulting</Text></li>
            <li>zarejestrowaną pod adresem: <Text code>ul. Dorotowska 2 m. 7, 02-347 Warszawa, Polska</Text></li>
            <li>indetyfikujacą się NIP: <Text code>PL 5381827962</Text></li>
            <li>nazywaną zamennie <Text code>Zentala Consulting</Text>, <Text code>Zentala Agency</Text>, <Text code>my</Text>, <Text code>nas</Text>, <Text code>nasz</Text></li>
          </ul>
          Niniejsza Polityka Prywatności wyjaśnia, jakie informacje zbieramy od użytkowników oraz w jaki sposób je wykorzystujemy i chronimy.
        </Paragraph>

        <Title level={2}>Zbieranie Danych</Title>
        <Paragraph>
          Zbieramy podstawowe dane, takie jak adres e-mail, przy zapisie na newsletter. Dodatkowo zbieramy podstawowe dane, takie jak imię, nazwisko, adres e-mail, numer telefonu oraz odpowiedzi na pytania z ankiet, które pomagają nam przygotować ofertę dopasowaną do klienta.
        </Paragraph>

        <Title level={2}>Wykorzystanie Danych</Title>
        <Paragraph>
          Wykorzystujemy zebrane dane wyłącznie w celu wysyłania newsletterów oraz przygotowania indywidualnej oferty dla klienta.
        </Paragraph>

        <Title level={2}>Udostępnienie Danych Trzecim Stronom</Title>
        <Paragraph>
          Nie udostępniamy Twoich danych osobowych trzecim stronom bez Twojej wyraźnej zgody.
        </Paragraph>

        <Title level={2}>Bezpieczeństwo</Title>
        <Paragraph>
          Zastosowaliśmy odpowiednie środki bezpieczeństwa w celu ochrony Twoich danych.
        </Paragraph>

        <Title level={2}>Cookies</Title>
        <Paragraph>
          Nasza strona korzysta z plików cookies w celu ulepszenia doświadczenia użytkownika.
        </Paragraph>

        <Title level={2}>Prawa Użytkownika</Title>
        <Paragraph>
          Masz prawo do dostępu, sprostowania, usunięcia swoich danych zgodnie z obowiązującym prawem.
        </Paragraph>

        <Title level={2}>Zmiany w Polityce Prywatności</Title>
        <Paragraph>
          Zastrzegamy sobie prawo do wprowadzenia zmian w Polityce Prywatności. Wszelkie zmiany będą publikowane na tej stronie.
        </Paragraph>

        <Title level={2}>Kontakt</Title>
        <Paragraph>
          Jeśli masz pytania dotyczące Polityki Prywatności, skontaktuj się z nami pod adresem: <Link to="mailto:zentala@gmail.com">zentala@gmail.com</Link>.
        </Paragraph>
      </div>
    </section>
  </Layout>
  )
}

export const Head = () => <Seo title="Privacy Policy" />

export default PrivacyPolicy
