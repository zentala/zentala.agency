import React from 'react'
import {
  UserSwitchOutlined,
  ClusterOutlined,
  LinkOutlined,
  RobotOutlined,
  RocketOutlined,
  MobileOutlined,
  LaptopOutlined,
  DeploymentUnitOutlined,
  CloudOutlined,
  BgColorsOutlined,
  CodeOutlined,
  DatabaseOutlined,
  FunnelPlotOutlined,
  ShopOutlined
} from '@ant-design/icons'

import Layout from '../../components/GlobalLayout'
import Section from '../../components/Section'
import Seo from '../../components/seo'
import Hero from '../../components/Hero'
import { createUseStyles } from 'react-jss'
import OfferItem from '../../components/OfferItem'

/*
 * TODO Potrzebuję otagować część rzeczy
 * - electron (mobile), react native (desktp), strony internetowe, apliakcje internetowe, mikroserwisy, panele administratora, nazrzędzia wenętrzne, - JavaScript pozwala robic to wszystko na jednym codebase JavaScriptu dzieki czemu mozna wspoldzielic miedzy nimi wspolny kod (co oszczedza czas programowania) oraz jeden developer moze wprowadzac zmiany ze wszystkich czesciach ekosystemu. prawdopodobnie to dlatego jest to jeden z najpoupularniszych jezykow wsrod programistow,a dzeki temu bedzie Ci latwo znalexc kogos do wprowadzania zmian i dalszego rozwoju.
 * - iot, robtyka, machine leadning - nie tworzymy tutaj rzeczy od podstaw i nie podsuwamy do przodu rozwoju tych branz prowadzac badania rnd. w zamian za to dzialamy jako system integrator = znamy spekutrm dostepnych na rynkuy gotowych do implementacji komponentow i ich mozliwosci, dzieki czemu kestesmy w stanie doradzic i zaimplemntowac ich intrgracje. skladamy jak z klockow LEGO elementy zewnetrznych dostawcow. a jest co  skladac, do wiekszosci tychpowych zastosowan sa dostepne gotowe i latwe do zintegrowania komponenty.
 *
 */
const servicesData = [
  {
    titleId: 'offer.innovation_title',
    descriptionId: 'offer.innovation_desc',
    Icon: UserSwitchOutlined,
    backgroundColor: 'lightblue'
  },
  {
    titleId: 'offer.specs_title',
    descriptionId: 'offer.specs_desc',
    Icon: ClusterOutlined,
    backgroundColor: 'lightblue'
  },
  {
    titleId: 'offer.ux_title',
    descriptionId: 'offer.ux_desc',
    Icon: BgColorsOutlined,
    backgroundColor: 'lightskyblue'
  },
  // webdesign <HighlightOutlined />
  // strony internetowe
  // landing i squeeze page
  {
    titleId: 'offer.webapps_title',
    descriptionId: 'offer.webapps_desc',
    Icon: LinkOutlined,
    backgroundColor: 'lightsteelblue'
  },
  {
    titleId: 'offer.shops_title',
    descriptionId: 'offer.shops_desc',
    Icon: ShopOutlined, // <ShoppingCartOutlined />
    backgroundColor: 'lightsteelblue'
  },
  // LMS
  // analityka
  // intenralonalizacje - wielojezykowosc <TranslationOutlined />
  // panele administracyjne <ControlOutlined />  <DashboardOutlined />
  {
    titleId: 'offer.native_title',
    descriptionId: 'offer.native_desc',
    Icon: MobileOutlined,
    backgroundColor: 'lightsteelblue'
  },
  {
    titleId: 'offer.desktop_title',
    descriptionId: 'offer.desktop_desc',
    Icon: LaptopOutlined,
    backgroundColor: 'lightsteelblue'
  },
  {
    titleId: 'offer.console_title',
    descriptionId: 'offer.console_desc',
    Icon: CodeOutlined,
    backgroundColor: 'lightsteelblue'
  },
  {
    titleId: 'offer.cloud_title',
    descriptionId: 'offer.cloud_desc',
    Icon: CloudOutlined,
    backgroundColor: 'lightslategray'
  },
  {
    titleId: 'offer.devops_title',
    descriptionId: 'offer.devops_desc',
    Icon: FunnelPlotOutlined,
    backgroundColor: 'lightslategray'
  },
  {
    titleId: 'offer.databases_title',
    descriptionId: 'offer.databases_desc',
    Icon: DatabaseOutlined,
    backgroundColor: 'lightslategray'
  },
  {
    titleId: 'offer.iot_title',
    descriptionId: 'offer.iot_desc',
    Icon: DeploymentUnitOutlined,
    backgroundColor: 'lightgrey'
  },
  {
    titleId: 'offer.robotics_title',
    descriptionId: 'offer.robotics_desc',
    Icon: RobotOutlined,
    backgroundColor: 'lightgrey'
  },
  {
    titleId: 'offer.ml_title',
    descriptionId: 'offer.ml_desc',
    Icon: RocketOutlined,
    backgroundColor: 'lightgrey'
  }
  // chatboty <CommentOutlined />
  // image processing <CameraOutlined />
  // boty - social media, komunikatory
  // emergecy <BugOutlined />
  // systemy raingowe i remokendacji <StarOutlined />
]

// "prototyping_title": "Rapid Prototyping",
// "prototyping_desc": "Nie dostarczymi Ci produkcyjnej obudowy Twojego urządzenia, ale zaprototypujemy ją dzięki technologii modelowania, frezowania i druku 3D, cięcia i grawerowania 2D.",

// CHATBOTUY

// <ShoppingCartOutlined />
// <ShopOutlined />
// <SendOutlined />
const useStyles = createUseStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(33%, 1fr))',
    gap: '16px'
    // Tutaj możesz dodać więcej stylów dla siatki
  }
  // Tutaj możesz dodać więcej stylów
})

const OfferPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Layout>
      <Hero containerStyle={{ backgroundColor: 'lightgrey' }} titleId="offer.title" subtitleId="offer.subtitle" />
      <Section>
        <div className={classes.grid}>
          {servicesData.map((service, index) => (
            <OfferItem
              key={service.number}
              number={index < 9 ? '0' + (index + 1) : index + 1}
              titleId={service.titleId}
              descriptionId={service.descriptionId}
              iconSrc={service.iconSrc}
              Icon={service.Icon}
              backgroundColor={service.backgroundColor}
            />
          ))}
        </div>
      </Section>
      {/* <Section>
        cta
      </Section> */}
    </Layout>
  )
}

export const Head = () => <Seo title="Offer" />

export default OfferPage
