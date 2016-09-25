/**
 * Created by KG on 8/8/16.
 */
/**
 * Created by KG on 8/1/16.
 */
import React from "react"
const iconImage = '/static/images/icon.png'


export default class Logo extends React.Component {
    style = {
        icon: {
            height: '50px',
            width: '50px',
            margin: '10px'

        }
    }

  render() {
    return (
            <img style={this.style.icon} className={this.props.className}src={iconImage}></img>
    )
  }
}
