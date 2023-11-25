import React from 'react'
import { Link } from 'gatsby'
import { Typography } from 'antd'
const { Paragraph, Text } = Typography

import Seo from '../components/seo'
import SectionChapter from '../components/SectionChapter'
import Hero from '../components/Hero'
import GlobalLayout from '../components/GlobalLayout'

const PrivacyPolicy: React.FC = () => {
  return (
    <GlobalLayout>
      <Hero containerStyle={{ backgroundColor: 'lightgrey' }} titleId="privacy.title" subtitleId="privacy.subtitle" />

      <SectionChapter titleId="privacy.intro.header" maxWidth="lg" leadTextId="privacy.intro.lead">
        <Paragraph>
          Dziękujemy za odwiedzenie strony internetowej:
          <ul style={{ marginLeft: '1em' }}>
            <li>
              prowadzonej przez <Text strong>Paweł Zentala Consulting</Text>
            </li>
            <li>
              zarejestrowaną pod adresem: <Text code>ul. Dorotowska 2 m. 7, 02-347 Warszawa, Polska</Text>
            </li>
            <li>
              indetyfikujacą się NIP: <Text code>PL 5381827962</Text>
            </li>
            <li>
              nazywaną zamennie <Text code>Zentala Consulting</Text>, <Text code>Zentala Agency</Text>,{' '}
              <Text code>my</Text>, <Text code>nas</Text>, <Text code>nasz</Text>
            </li>
          </ul>
          Niniejsza Polityka Prywatności wyjaśnia, jakie informacje zbieramy od użytkowników oraz w jaki sposób je
          wykorzystujemy i chronimy.
        </Paragraph>
      </SectionChapter>

      <SectionChapter titleId="privacy.data.header" maxWidth="lg">
        <Paragraph>
          Zbieramy podstawowe dane, takie jak adres e-mail, przy zapisie na newsletter. Dodatkowo zbieramy podstawowe
          dane, takie jak imię, nazwisko, adres e-mail, numer telefonu oraz odpowiedzi na pytania z ankiet, które
          pomagają nam przygotować ofertę dopasowaną do klienta.
        </Paragraph>
      </SectionChapter>

      <SectionChapter titleId="privacy.usage.header" maxWidth="lg">
        <Paragraph>
          Wykorzystujemy zebrane dane wyłącznie w celu wysyłania newsletterów oraz przygotowania indywidualnej oferty
          dla klienta.
        </Paragraph>
      </SectionChapter>

      <SectionChapter titleId="privacy.sharing.header" maxWidth="lg">
        <Paragraph>
          Wykorzystujemy zebrane dane wyłącznie w celu wysyłania newsletterów oraz przygotowania indywidualnej oferty
          dla klienta.
        </Paragraph>
      </SectionChapter>

      <SectionChapter titleId="privacy.security.header" maxWidth="lg">
        <Paragraph>Zastosowaliśmy odpowiednie środki bezpieczeństwa w celu ochrony Twoich danych.</Paragraph>
      </SectionChapter>

      <SectionChapter titleId="privacy.cookies.header" maxWidth="lg">
        <Paragraph>Nasza strona korzysta z plików cookies w celu ulepszenia doświadczenia użytkownika.</Paragraph>
      </SectionChapter>

      <SectionChapter titleId="privacy.cookies.header" maxWidth="lg">
        <Paragraph>Nasza strona korzysta z plików cookies w celu ulepszenia doświadczenia użytkownika.</Paragraph>
      </SectionChapter>

      <SectionChapter titleId="privacy.userRights.header" maxWidth="lg">
        <Paragraph>
          Masz prawo do dostępu, sprostowania, usunięcia swoich danych zgodnie z obowiązującym prawem.
        </Paragraph>
      </SectionChapter>

      <SectionChapter titleId="privacy.userRights.header" maxWidth="lg">
        <Paragraph>Nasza strona korzysta z plików cookies w celu ulepszenia doświadczenia użytkownika.</Paragraph>
      </SectionChapter>

      <SectionChapter titleId="privacy.changes.header" maxWidth="lg">
        <Paragraph>
          Zastrzegamy sobie prawo do wprowadzenia zmian w Polityce Prywatności. Wszelkie zmiany będą publikowane na tej
          stronie.
        </Paragraph>
      </SectionChapter>

      <SectionChapter titleId="privacy.contact.header" maxWidth="lg">
        <Paragraph>
          Jeśli masz pytania dotyczące Polityki Prywatności, skontaktuj się z nami pod adresem:{' '}
          <Link to="mailto:zentala@gmail.com">zentala@gmail.com</Link>.
        </Paragraph>
      </SectionChapter>
    </GlobalLayout>
  )
}

export const Head = () => <Seo title="Privacy Policy" />

export default PrivacyPolicy
