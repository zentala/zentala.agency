import React from 'react'
import { Typography } from 'antd'
import {
  UserSwitchOutlined,
  ClusterOutlined,
  FormatPainterOutlined,
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
} from '@ant-design/icons'

import Layout from '../../components/GlobalLayout'
import Section from '../../components/Section'
import Seo from '../../components/seo'
import Hero from '../../components/Hero'
import { createUseStyles } from 'react-jss'
import OfferItem from '../../components/OfferItem'

const { Title } = Typography

const servicesData = [
  {
    titleId: 'offer.services.innovation.title',
    descriptionId: 'offer.services.innovation.desc',
    Icon: UserSwitchOutlined,
    backgroundColor: 'lightblue',
  },
  {
    titleId: 'offer.services.specs.title',
    descriptionId: 'offer.services.specs.desc',
    Icon: ClusterOutlined,
    backgroundColor: 'lightblue',
  },
  {
    titleId: 'offer.services.ux.title',
    descriptionId: 'offer.services.ux.desc',
    // Icon: FormatPainterOutlined,
    Icon: BgColorsOutlined,
    backgroundColor: 'lightskyblue',
  },
  {
    titleId: 'offer.services.webapps.title',
    descriptionId: 'offer.services.webapps.desc',
    Icon: LinkOutlined,
    backgroundColor: 'lightsteelblue',
  },
  {
    titleId: 'offer.services.native.title',
    descriptionId: 'offer.services.native.desc',
    Icon: MobileOutlined,
    backgroundColor: 'lightsteelblue',
  },
  {
    titleId: 'offer.services.desktop.title',
    descriptionId: 'offer.services.desktop.desc',
    Icon: LaptopOutlined,
    backgroundColor: 'lightsteelblue',
  },
  {
    titleId: 'offer.services.cli.title',
    descriptionId: 'offer.services.cli.desc',
    Icon: CodeOutlined,
    backgroundColor: 'lightsteelblue',
  },
  {
    titleId: 'offer.services.cloud.title',
    descriptionId: 'offer.services.cloud.desc',
    // iconSrc: 'icon1.png',
    Icon: CloudOutlined,
    backgroundColor: 'lightslategray',
  },
  {
    titleId: 'offer.services.db.title',
    descriptionId: 'offer.services.db.desc',
    Icon: DatabaseOutlined,
    backgroundColor: 'lightslategray',
  },
  {
    titleId: 'offer.services.iot.title',
    descriptionId: 'offer.services.iot.desc',
    Icon: DeploymentUnitOutlined,
    backgroundColor: 'lightsalmon',
  },
  {
    titleId: 'offer.services.robotics.title',
    descriptionId: 'offer.services.robotics.desc',
    Icon: RobotOutlined,
    backgroundColor: 'lightsalmon',
  },
  {
    titleId: 'offer.services.ml.title',
    descriptionId: 'offer.services.ml.desc',
    Icon: RocketOutlined,
    backgroundColor: 'lightgreen',
  },
]

// dodamy
// sklpey internetowe
// wprdpress stroony, sklepy, LMS
// social media - nie bedzziemy Ci ich prowadzic ale wyznaczymy kierunek
// landing i squeezepage - stworzoymy strony wyciskajace i sprzedajace dla Twojego produkty
// lejek sprzedazowy
//

// <ShoppingCartOutlined />
// <ShopOutlined />
// <SendOutlined />
const useStyles = createUseStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(33%, 1fr))',
    gap: '16px',
    // Tutaj możesz dodać więcej stylów dla siatki
  },
  // Tutaj możesz dodać więcej stylów
})

const OfferPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Layout>
      <Hero containerStyle={{ backgroundColor: '#eee' }} titleId="offer.title" subtitleId="offer.subtitle" />
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
    </Layout>
  )
}

export const Head = () => <Seo title="Offer" />

export default OfferPage
