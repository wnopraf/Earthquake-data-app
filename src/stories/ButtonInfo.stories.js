import React, { useEffect, useState } from 'react'
import ButtonInfo from '../components/ButtonInfo'
import App from '../App'
import '../index.css'
const L = window.L

export const AjaxWrapper = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    L.Util.ajax(
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
    ).then((data) => {
      setData(data)
    })
  }, [])

  return data && <ButtonInfo geoData={data} />
}
export const EarthQuakeButton = App
export default {
  title: 'ButtonInfo',
  component: ButtonInfo
}
