import React from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
// import geography from './WorldMap.topology.json'
import './WorldMap.css'

// const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json" // nie da sie usunac anarktydy

/*
  # d3.geoArmadillo() · Source, Examples
  # d3.geoArmadilloRaw(phi0)
  The armadillo projection. The default center assumes the default parallel of 20° and should be changed if a different parallel is used. Note: requires clipping to the sphere.
  # armadillo.parallel([parallel])
*/

// https://www.react-simple-maps.io/docs/geographies/

// console.log(geography)

interface CityMarker {
  name: string
  coordinates: [number, number]
}

const markers: CityMarker[] = [
  { name: 'Londyn', coordinates: [-0.1276, 51.5072] },
  { name: 'Amsterdam', coordinates: [4.8952, 52.3702] },
  { name: 'Warszawa', coordinates: [21.0122, 52.2297] },
  { name: 'Singapur', coordinates: [103.8198, 1.3521] },
  { name: 'Hongkong', coordinates: [114.1694, 22.3193] },
  { name: 'Kalifornia', coordinates: [-119.4179, 36.7783] }
]

const style = {
  default: {
    fill: '#ccc', // Kolor tła kraju (szary)
    stroke: '#fff', // Kolor granic kraju (biały)
    strokeWidth: 0, // Grubość granic
    outline: 'none' // Wyłączanie efektu podświetlania
  },
  hover: {
    fill: '#ccc', // Kolor tła kraju po najechaniu myszką (szary)
    outline: 'none' // Wyłączanie efektu podświetlania
  },
  pressed: {
    fill: '#ccc',
    stroke: 'none'
  }
}

const WorldMap: React.FC = () => (
  <ComposableMap>
    <Geographies geography="./assets/topology.json" disableDefaultStyles={true}>
      {({ geographies }) =>
        geographies
          // .filter(geo => !geo.properties.name.includes("Arktyka")) // Filtruj Arktykę
          .map(geo => <Geography key={geo.rsmKey} geography={geo} style={style} />)
      }
    </Geographies>
    {markers.map(({ name, coordinates }) => (
      <Marker key={name} coordinates={coordinates}>
        <circle r={10} fill="#eee" stroke="#fff" strokeWidth={2} />
        {/* <IconAntd name="pin" color="#F00" /> */}
        <text textAnchor="middle" y={-20} style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}>
          {name}
        </text>
      </Marker>
    ))}
  </ComposableMap>
)

export default WorldMap
