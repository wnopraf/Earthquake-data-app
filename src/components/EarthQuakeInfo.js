import React from 'react'
import styled from 'styled-components'

const EarthQuakeInfo = ({ feature, setIsInfoActive, isInfoActive }) => {
  return (
    <EarthQuakeInfoRender isInfoActive={isInfoActive}>
      <ul>
        {Object.keys(feature).map((key) => {
          if (key === 'properties') {
            const PropertiesObject = feature[key]
            const keyProps = Object.keys(feature[key])
            return keyProps.map((key, i) => {
              return (
                PropertiesObject[key] !== null && (
                  <li key={i}>
                    <p className="feature-prop">{key}</p>
                    <p className="feature-value">{PropertiesObject[key]}</p>
                  </li>
                )
              )
            })
          }
        })}
      </ul>

      <CloseButton setIsInfoActive={setIsInfoActive} />
    </EarthQuakeInfoRender>
  )
}

const EarthQuakeInfoRender = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 1rem 2rem;
  transition: opacity 500ms, z-index 500ms;
  opacity: ${(props) => (props.isInfoActive ? 1 : 0)};
  background: white;
  color: black;
  height: 300px;
  width: 22rem;
  font-size: .8rem;
  border-radius: 1rem;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.5803921568627451);
  z-index: ${(props) => (props.isInfoActive ? 1000 : 0)}; ;
  & ul {
    height: 100%;
    overflow: scroll;
    li {
      p {
        margin: 0;
    padding: .5rem;
    color: gray;
    overflow-wrap: break-word;
    line-height: 1.6;
      }
        .feature-prop {
          background: #f3f3f3;
          text-transform: capitalize;
          font-weight: bold;
          letter-spacing: 1px;
        }
      }
    }
  }
   
`
const CloseButtonRender = styled.span`
  color: #ec4f4f;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  font-size: 1.8rem;
`
const CloseButton = ({ setIsInfoActive }) => {
  return (
    <CloseButtonRender onClick={() => setIsInfoActive((oldState) => !oldState)}>
      &times;
    </CloseButtonRender>
  )
}

export default EarthQuakeInfo
