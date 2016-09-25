import React from "react"
import {Motion, spring} from 'react-motion';


function CheckboxWrapper(props) {
  const TOTALLENGTH = 72.7977294921875
  const CIRCLELENGTH = 50.24085998535156
  const CHECKEDLENGTH = -22.55687141418457


  let wrapperStyle = {
    cursor: 'pointer'
  }

  let innerStyle = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '3',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }

  let motionProps = {
    defaultStyle: {
      offset: -TOTALLENGTH
    },
    style: {
      offset: props.active ?
        spring(CIRCLELENGTH, {stiffness: 60, damping: 11}) :
        spring(CHECKEDLENGTH, {stiffness: 120, damping: 13.8})
    }
  }

  return (
    <svg style={wrapperStyle} height="200px" width="200px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g style={innerStyle}>
        <Motion {...motionProps} >
            { ({ offset }) =>
                <path
                    style={{
                      stroke: props.active ? '#e64e5f' : 'black',
                      strokeDasharray: `${TOTALLENGTH} ${TOTALLENGTH}`,
                      strokeDashoffset: offset
                }}
            d="M20 6.7L9.3 17.3 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8"
          /> }
      </Motion>
    </g>
  </svg>
  )
}


export default class Loading extends React.Component {
  constructor() {
    super()
  }

  style= {
    checkbox: {
      fontSize: '6em',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },

    container: {
      hidden: {
        backgroundColor:'black', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        zIndex: 20,
        display: 'none',
      },

      shown: {
        backgroundColor:'black', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        zIndex: 20,
        opacity: 0.8,
      },
    }
  }

  render() {
    return (
      <div style={this.props.active ? this.style.container.shown : this.style.container.hidden }>
        <span style={this.style.checkbox}>
          <CheckboxWrapper active={this.props.active} />
        </span>
      </div>
    )
  }
}