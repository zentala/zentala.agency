import React from 'react'
import { Button, Typography, Row, Col } from 'antd'
import { OurButton } from '../components/OurButton'
import Section from '../components/Section'
import { Link } from 'gatsby'

import GlobalLayout from '../components/GlobalLayout'
import ContactBox from '../components/ContactBox'
import Seo from '../components/seo'
import { FormattedMessage } from 'gatsby-plugin-intl'

const { Title, Paragraph } = Typography

const About: React.FC = () => (
  <GlobalLayout>
    <Section>
      <Row gutter={64}>
        <Col span={12}>
          <Title level={1} style={{ marginBottom: 0, fontSize: '4.4em' }}>
            <FormattedMessage id="about.title" />
          </Title>
          <Title level={2} style={{ marginTop: '0.8em', fontSize: '2.2em' }}>
            <FormattedMessage id="about.subtitle" />
          </Title>
          <Link to="#contact-box">
            <OurButton type="primary" size="large" customStyle="lead">
              <FormattedMessage id="about.cta" />
            </OurButton>
          </Link>
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/images/debate3.png" alt="Opis obrazka" style={{ maxWidth: '100%', height: 'auto' }} />
        </Col>
      </Row>
    </Section>

    <Section>
      <Row gutter={32} justify="center">
        <Col span={8} style={{ textAlign: 'center' }}>
          <img src="path_do_twojego_obrazka1.jpg" alt="Opis obrazka 1" />
          <Title level={3}>Twoje przedsiębiorstwo w centrum uwagi</Title>
          <Paragraph>
            Nasza misja to nie tylko dostarczenie efektywnych rozwiązań technologicznych, ale również zrozumienie i
            wsparcie dla specyfiki Twojego biznesu. Naszym priorytetem jest Twoje zadowolenie i sukces.
          </Paragraph>
        </Col>

        <Col span={8} style={{ textAlign: 'center' }}>
          <img src="path_do_twojego_obrazka2.jpg" alt="Opis obrazka 2" />
          <Title level={3}>Automatyzacja i Innowacje</Title>
          <Paragraph>
            Specjalizujemy się w dostarczaniu zaawansowanych rozwiązań, które zwiększają efektywność i redukują koszty.
            Nasze podejście łączy w sobie najnowsze technologie z praktycznymi zastosowaniami w biznesie.
          </Paragraph>
        </Col>

        <Col span={8} style={{ textAlign: 'center' }}>
          <img src="path_do_twojego_obrazka3.jpg" alt="Opis obrazka 3" />
          <Title level={3}>Przyszłość to teraz</Title>
          <Paragraph>
            Żyjemy w dynamicznie zmieniającym się środowisku, w którym opóźnienie w adaptacji do nowych technologii może
            być kosztowne. Dlatego stawiamy na ciągły rozwój i innowacyjność, aby zawsze być krok przed konkurencją.
          </Paragraph>
        </Col>
      </Row>
    </Section>

    <Section className="values-section">
      <Title level={3} className="centered-text">
        Nasze wartości
      </Title>
      <Row gutter={[16, 16]} className="values-list">
        <Col span={6} className="value-item">
          <img src="path_to_icon1.png" alt="Ikona wartości 1" />
          <p>Skuteczność - Robimy to, co obiecujemy</p>
        </Col>
        <Col span={6} className="value-item">
          <img src="path_to_icon2.png" alt="Ikona wartości 2" />
          <p>Odpowiedzialność - Za nasze działania i za Twoje zadowolenie</p>
        </Col>
        <Col span={6} className="value-item">
          <img src="path_to_icon3.png" alt="Ikona wartości 3" />
          <p>Zaufanie - Tworzymy relacje, które są korzystne dla obu stron</p>
        </Col>
        <Col span={6} className="value-item">
          <img src="path_to_icon4.png" alt="Ikona wartości 4" />
          <p>Innowacyjność - Nieustannie poszukujemy nowych, lepszych rozwiązań</p>
        </Col>
      </Row>
      <Row className="contact-button">
        <Col span={24}>
          <Button type="primary" size="large" className="centered-button">
            Skontaktuj się z nami
          </Button>
        </Col>
      </Row>
    </Section>

    <Section>
      <Title level={2}>Historia Agencji</Title>
      <Paragraph>
        Nasza historia to ciągła ewolucja i adaptacja do zmieniającego się rynku. Zaczynaliśmy jako mały zespół
        freelancerów, a dzisiaj jesteśmy liderem w automatyzacji i innowacjach.
      </Paragraph>
      <Paragraph>
        Posiadamy biuro w Warszawie, a nasi eksperci mają wieloletnie doświadczenie w różnych sektorach: rozwóju
        oprogramowania, IoT, robotyki, project managmentów, change menagmentu, marketungu, designu i UX, data science,
        zarządzania strategiczego itd. Jesteśmy zespołem o silnym trzonie technologicznym, a jednocześnie zakorzenionym
        w biznesie.
      </Paragraph>
      <Paragraph>
        Nieważne, czy jesteś małą firmą, czy dużą korporacją, mamy rozwiązania dopasowane do Twoich potrzeb.
      </Paragraph>
    </Section>

    <Section>
      <ContactBox />
    </Section>
  </GlobalLayout>
)

export const Head = () => <Seo title="About" />

export default About
