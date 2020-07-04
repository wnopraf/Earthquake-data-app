import React, { useEffect, useState } from 'react'
import EarthQuakeInfo from './components/EarthQuakeInfo'
import ButtonWrapper from './components/ButtonInfo'

const L = window.L

function App() {
  const [isInfoActive, setIsInfoActive] = useState(false)
  const [infoData, setInfoData] = useState({})
  const [allInfo, setAllInfo] = useState(null)

  useEffect(() => {
    var mapa = L.map('mapa', {
      center: [0, 0],
      zoom: 2,
    })

    var capaOrtoFoto = L.esri.basemapLayer('Imagery')
    capaOrtoFoto.addTo(mapa)

    var url =
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

    L.Util.ajax(url).then(function (datosGeoJOSN) {
      setAllInfo(datosGeoJOSN)
      var capaTerremotos = L.geoJSON(datosGeoJOSN, {
        pointToLayer: function (entidad, latlng) {
          return L.circleMarker(latlng)
        },
        style: function (entidad) {
          var magnitud = entidad.properties.mag
          var colorTerremoto
          if (magnitud > 6) {
            colorTerremoto = 'rgba(255, 0, 0)'
          } else if (magnitud <= 6 && magnitud > 5) {
            colorTerremoto = 'rgba(255, 255, 0)'
          } else if (magnitud <= 5 && magnitud > 4) {
            colorTerremoto = 'rgba(0, 255, 255)'
          } else {
            colorTerremoto = 'rgba(0, 0, 255)'
          }

          var miEstilo = {
            radius: 1.6 ** magnitud,
            fillColor: colorTerremoto,
            fillOpacity: 0.4,
            color: 'rgba(0, 0, 0, 0.7)',
            weight: 1,
          }

          return miEstilo
        },
      })

      capaTerremotos.on('click', ({ layer: { feature } }) => {
        setIsInfoActive(true)
        setInfoData(feature)
      })
      capaTerremotos.addTo(mapa)
    })
  }, [])
  return (
    <>
      <div id="mapa"></div>

      <EarthQuakeInfo
        feature={infoData}
        {...{ isInfoActive, setIsInfoActive }}
      />
      {allInfo && <ButtonWrapper geoData={allInfo} />}
    </>
  )
}

export default App
