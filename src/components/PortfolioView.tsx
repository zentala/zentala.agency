import React, { useState } from 'react'
import PortfolioItem from './PortfolioItem'
import PortfolioCategorySelector from './PortfolioCategorySelector'
import { Space, Typography } from 'antd'

const { Paragraph } = Typography

const PortfolioView = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const allItems = [
    {
      title: 'Robot Merch',
      description: (
        <Space>
          <Paragraph>
            Functional prototype of a socially-aware humanoid robot tailored for events and retail applications,
            enhancing its situational awareness through bespoke IoT integrations.
          </Paragraph>
          <Paragraph>
            The robot stood 1.6 metres tall and operated on a dual-servo system, incorporating a two-axis articulated
            head, touchscreen interface, touch-sensitive sensors and a docking (charging) station.
          </Paragraph>
          <Paragraph>
            The culmination of this four-month project was the result of a dynamic partnership: myself, a temporary
            software contractor tasked with software development of the robot, and Ula, a dedicated Cheil employee
            serving as R&D Art Director. Ula played a pivotal role in shaping the concept and design of this innovative
            robotic solution.
          </Paragraph>
          <Paragraph>
            We collaborated directly on the physical construction of the robot, starting with hardware decisions,
            continuing with the fabrication of the robot's skeleton and enclosure using CNC milling and 3D printing
            techniques, and ending with the final machine assembly.
          </Paragraph>
        </Space>
      ),
      categories: ['Hardware'],
      technologies: [
        'Linux',
        'ROS (Robotic Operating System)',
        'ROS2',
        'Python',
        'C/C++',
        'Computer Vision',
        'Machine Learning',
        'TensorFlow',
        'SLAM',
        'YOLO',
        'Electronics',
        'LIDAR',
        'Intel RealSense Cameras (T265 & D435)',
        'NVIDIA Jetson',
        '3D Printing',
        'CNC Milling',
        'AUTODESK Fusion 360',
        'React.js'
      ],
      image: 'https://example.com/image.jpg',
      detailsLink: '/details-page',
      demoLink: '/live-demo'
    },
    {
      title: 'Smart Height Adjustable Desk',
      description:
        "An innovative, sensor-equipped desk that adjusts its height based on the user's time spent in front of the computer. It can suggest breaks or raise itself autonomously to encourage standing work.",
      categories: ['Hardware', 'Apps'],
      technologies: ['IoT', 'Embedded Systems', '3D modeling', 'CNC milling', 'Raspberry Pi'],
      image: 'https://desk.zentala.io/images/20230628_033806.jpg',
      demoLink: 'https://desk.zentala.io/'
    },
    {
      title: 'Remote Work Status Indicator',
      description:
        "A clear LED ring on the door displays the remote worker's current status. An orange light signifies that they are on a call, red indicates active speaking during the call, and green denotes focused individual work. In the center of the ring, there's a bell button that allows household members to discreetly request a chat with the remote worker. The worker can either accept or decline this request, and their decision will also be visually indicated on the LED ring.",
      categories: ['Hardware', 'Apps'],
      technologies: ['IoT', 'Embedded Systems', '3D modeling', 'CNC milling', 'ESP32'],
      image: '',
      demoLink: ''
    },
    {
      title: 'Real Time Indoor Location Systems',
      description:
        'With 2 years of professional experience in the field of indoor location systems, I am capable of designing and implementing any scale and type of RTLS solution. During my first year, I worked as an engineer on a central server for calculating location and configuring IoT infrastructure for localization (deployment), gaining a deep understanding of the architecture of such systems. Subsequently, over the next year, while handling on-site deployments and tailoring systems to the individual needs of clients in various venues such as restaurants, factories, aviation facilities, and public utility buildings, I amassed practical business experience from these implementations.',
      categories: ['Hardware', 'Apps'],
      technologies: ['IoT', 'BLE', 'UWB', 'RTLS', 'Node.js', 'Cloud', 'Linux', 'Embedded Systems'],
      image:
        'https://media.licdn.com/dms/image/C4D2DAQFth4V_7GoUDw/profile-treasury-image-shrink_800_800/0/1607385644787?e=1699412400&v=beta&t=ibKHzVGTl6Xqbv0w6fX5lrPGbxVTdrcgBDxcif-b3x8'
    },
    {
      title: 'Home Connect - Smart Home Appliances Control Backend',
      description:
        "With over 2 years of experience in developing the software architecture behind hundreds of smart home appliances from leading European home appliance manufacturers, I've learned how to build high-traffic and scalable IoT systems.",
      categories: ['IoT', 'Apps'],
      technologies: [
        'IoT',
        'Node.js',
        'Cloud',
        'Linux',
        'React',
        'DevOps',
        'Kafka',
        'MongoDB',
        'PostgresSQL',
        'Docker'
      ],
      demoLink: 'https://www.home-connect.com/'
    },
    {
      title: 'Game Player Nick Finder',
      description:
        'Reconnect with Old Gaming Buddies! Are you missing those unforgettable gaming sessions with your old buddies? Look no further! Our platform is here to help you revive the good old days by reuniting you with your gaming companions. Whether you used to conquer virtual realms together or embark on epic adventures, we bring back the camaraderie and thrill of gaming.',
      categories: ['Websites', 'Apps'],
      demoLink: 'https://gpnf.zentala.io/',
      technologies: ['React', 'Python', 'Django', 'Redis']
    },
    {
      title: 'Health Coaching',
      description:
        "My design from 2011! I believe that despite over a decade passing, it has aged beautifully. Honestly, I miss webmastering and web design, but it's a time-consuming job, and I can allocate my time more lucratively as a developer, so I don't have any recent creations. It's a pity... I would love to create something visually pleasing again.",
      categories: ['Websites', 'Marketing', 'Design'],
      demoLink: '',
      image:
        'https://media.licdn.com/dms/image/D4D2DAQHvqdJBvFeTJg/profile-treasury-image-shrink_1920_1920/0/1698348553957?e=1699416000&v=beta&t=cnelby0IJYkxypbd8ozcfEDQ0SUxOclj32BqaA9oY70',
      technologies: ['WordPress']
    },
    {
      title: 'Events Calendar',
      description: '',
      categories: ['Apps', 'Design'],
      demoLink: '',
      image:
        'https://media.licdn.com/dms/image/D4D2DAQFckFI-WS9y0Q/profile-treasury-image-shrink_800_800/0/1692935629000?e=1699416000&v=beta&t=fCravADLlN6jZpH88gkMoyVlVrQkc5vRgzZHzh3gTjU',
      technologies: ['WordPress', 'React']
    },
    {
      title: 'Marc Jacobs Fragrances',
      demoLink: 'https://www.marcjacobsfragrances.com/',
      description: 'Detail oriented UX / UI project.',
      technologies: ['React', 'BEM', 'SCSS', 'HTML5', 'Drupal'],
      categories: ['Websites']
    },
    {
      title: 'Hitachi Poland',
      demoLink: 'https://www.behance.net/gallery/48517239/Hitachi-Poland',
      description: 'I coded most of it.',
      image: 'https://mir-s3-cdn-cf.behance.net/projects/404/65d80148517239.Y3JvcCw0MDUsMzE3LDAsMA.png',
      technologies: ['WordPress', 'JavaScript', 'MySQL', 'PHP', 'jQuery'],
      categories: ['Websites']
    },
    {
      title: "Squeeze Page 'Pułapki Rozwoju'",
      demoLink: 'https://www.behance.net/gallery/48517239/Hitachi-Poland',
      description:
        'Designed squeeze page for PDF report on survey results from 150 business leaders. Report: "Development Traps" - explores growth opportunities and threats for Polish firms. Crafted webpage, cover in Photoshop, coded, deployed on server. Set up email autoresponder for PDF delivery post email confirmation, converting leads to newsletter sign-ups for the report - hence, "squeeze page".',
      image:
        'https://media.licdn.com/dms/image/D4D2DAQFb9Yt3geSE7w/profile-treasury-image-shrink_800_800/0/1692936221851?e=1699416000&v=beta&t=D-x833OdnbZbCSqncB3EeSKyz3wkYuyG0pfT8Yle4w4',
      technologies: ['WordPress'],
      categories: ['Websites', 'Design', 'Marketing']
    },
    {
      title: '35k+ members FB Community: Online Marketing Strategies',
      categories: ['Marketing'],
      demoLink: 'https://www.facebook.com/groups/strategie.marketingu/',
      technologies: []
    }
  ]

  // Filtruj projekty na podstawie wybranej kategorii
  const filteredItems = selectedCategory
    ? allItems.filter(item => item.categories.map(cat => cat.toLowerCase()).includes(selectedCategory))
    : allItems

  return (
    <div style={{ paddingBottom: '4em' }}>
      <PortfolioCategorySelector onCategoryChange={setSelectedCategory} />
      {filteredItems.map((item, index) => (
        <PortfolioItem key={index} item={item} />
      ))}
    </div>
  )
}

export default PortfolioView
