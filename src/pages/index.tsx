import React from "react"
import { Col, Row, Space } from 'antd'

import Layout from "../components/layout"
import LinkIcon from "../components/LinkIcon"

const HomePage = () => (
  <Layout>
    <section id="header">
      <div className="wrapper">
        <h1 className="lead">AI<br/>Automation<br/>Agency</h1>
        <p className="lead">
          <strong>zoptymalizuj</strong> procesy<br/>
          <strong>automatyzuj</strong> przepływy pracy<br/>
          <strong>usprawnij</strong> biznes
        </p>
      </div>
    </section>

    <section id="services">
      <div className="wrapper">
        <h2>Usługi</h2>
        <h3>ROZWÓJ AI</h3>
        <p>Dostarczamy przedsiębiorstwom inteligentne rozwiązania, w tym niestandardowe chatboty, narzędzia AI i spersonalizowane integracje. Nasza oferta promuje wzrost, upraszcza i optymalizuje procesy, poprawia komunikację, rozwijając tym samym Twoją firmę.</p>
        <h3>GENEROWANIE LEADÓW</h3>
        <p>Nasze inteligentne rozwiązania, takie jak niestandardowe chatboty, narzędzia AI i spersonalizowane integracje, są zaprojektowane w celu napędzania wzrostu biznesowego. Poprzez usprawnienie procesów i ulepszenie komunikacji pomagamy w efektywnym generowaniu i zarządzaniu leadami dla Twojego biznesu.</p>
        <h3>AUTOMATYZACJA CRM</h3>
        <p>Automatyzuj i optymalizuj zarządzanie leadami dzięki naszym rozwiązaniom CRM, pozwalając Twojej firmie skoncentrować się na swoich głównych mocnych stronach. Nasza usprawniona ścieżka zarządzania leadami zapewnia zarówno efektywność, jak i skuteczność, pomagając w lepszym angażowaniu i relacjach z klientem.</p>
        <h3>LEJKI SPRZEDAŻOWE</h3>
        <p>Projektujemy i nadzorujemy ukierunkowane na wyniki lejki sprzedażowe, jednocześnie starannie monitorując wyniki, aby zapewnić maksymalną efektywność. Ta strategia pozwala firmom skupić się na ich podstawowych celach, promując wzrost i osiągając mierzalny sukces.</p>
      </div>
    </section>

    <section id="why-us">
      <div className="wrapper">
        <h2>Dlaczego Agencja Automatyzacji?</h2>
        <h3>Naszą misją jest wzrost Twojego biznesu</h3>
        <p>Jesteśmy grupą ekspertów technologicznych z ponad 20-letnim doświadczeniem zdobytym w pracy w wielkich korporacjach, startupach technologicznych, agencjach projektowych i konsultingowych oraz w przemyśle.</p>
        <p>Pomożemy Ci zautomatyzować Twoje przepływy pracy, aby zwiększyć produktywność i odzyskać kontrolę nad swoim czasem.</p>
        <p>Możesz wtedy skupić się na tym, co jest najważniejsze dla Twojego biznesu.</p>
        <Row>
          <Col span={16}>
            <h3>Pożegnaj</h3>
            <ul className="list">
              <li>Leadamy zdobyte w weekend, ignorowane do poniedziałku.</li>
              <li>Straty czasu na ściganie niekwalifikowanych leadów.</li>
              <li>Żmudne i powtarzalne procesy obsługi klienta.</li>
            </ul>
          </Col>
          <Col span={8}>
            <h3>Powitaj</h3>
            <ul className="list">
              <li>Więcej kwalifikowanych leadów.</li>
              <li>Zwiększone wskaźniki konwersji.</li>
              <li>Zmniejszony czas pracy.</li>
            </ul>
          </Col>
        </Row>
        </div>
    </section>

    <section id="contact">
      <div className="wrapper">
        <h2>Porozmawiaj z nami</h2>
        <p>Chcesz spędzać mniej czasu na drobiazgach, a więcej na fantastycznym rozwijaniu swojego biznesu?</p>
        <p>Przestać zajmować się tworzeniem dokumentów, wypełnianiem arkuszy kalkulacyjnych, kopiowaniem danych ani wysyłaniem tych samych e-maili każdego dnia.</p>
        <p>Skończyć z traceniem godzin na rozmowach z chłodnymi, niekwalifikowanymi leadami</p>
        <p>Chcesz zająć się dostarczaniem świetnych wyników swoim klientom.</p>
        <p>Agencja Automatyzacji pomoże Ci wejść na tę ścieżkę automatyzacji Twojego biznesu.</p>
        <p>Porozmawiaj z nami.</p>
        <p><strong>Zoptymalizuj. Automatyzuj. Rozwijaj się.</strong></p>
        <Space>
          <LinkIcon name="linkedin" size="lg" />
          <LinkIcon name="mail" size="lg" />
        </Space>
      </div>
    </section>

  </Layout>
)

export default HomePage