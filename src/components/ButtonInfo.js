import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import buttonBg from '../assets/toggle.svg'

const Button = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  background: url(${buttonBg}) white center no-repeat;
  z-index: 10000;
  cursor: pointer;
  border-radius: 1rem;
  box-shadow: 0px 0px 4px 1px black;
`

const ButtonInfo = ({ geoData, isVisible, setIsVisible }) => {
  return <Button onClick={() => setIsVisible(!isVisible)} />
}
const DataWrapper = ({ geoDataList, isVisible }) => {
  return (
    <StyledDiv isVisible={isVisible}>
      <H3Render>Earthquake locations worldwide</H3Render>
      <ul>
        {geoDataList.map((e, i) => {
          return <li key={i}>{e}</li>
        })}
      </ul>
    </StyledDiv>
  )
}

const ButtonWrapper = ({ geoData }) => {
  const [isVisible, setIsVisible] = useState(false)
  const { features } = geoData
  let extractedData = []
  let geoDataList = useMemo(
    () => extractDataRecusive(features, extractedData),
    [features]
  )

  return (
    <div className="button-wrapper">
      <ButtonInfo {...{ geoData, isVisible, setIsVisible }} />
      <DataWrapper {...{ geoDataList, isVisible }} />
    </div>
  )
}
const H3Render = styled.h3`
  font-size: 1.05rem;
  line-height: 1.35;
  text-align: center;
  text-transform: uppercase;
`
const StyledDiv = styled.div`
  transform: ${(props) =>
    props.isVisible ? 'translateX(0)' : 'translateX(-110%)'};
  transition: transform 700ms;
  background: white;
  position: absolute;
  top: 2rem;
  left: 0;
  padding: 2rem;
  border-radius: 1rem;
  color: #9c4c4c;
  width: 21rem;
  height: 40rem;
  overflow: scroll;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.42);
`
function extractDataRecusive(data, result) {
  if (Array.isArray(data)) {
    for (let dataItem of data) {
      extractDataRecusive(dataItem, result)
    }
  } else {
    result.push(data.properties.place)
  }
  return result
}

export default ButtonWrapper
