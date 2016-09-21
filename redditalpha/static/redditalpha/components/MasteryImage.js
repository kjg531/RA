/**
 * Created by KG on 8/8/16.
 */
/**
 * Created by KG on 8/1/16.
 */
import React from "react"
const masteryImageLocation = '/static/images/masteryggBlue.png'


export default class MasteryImage extends React.Component {
    style = {
        masteryImage: {
            height: '130px',
            width: '162px',
            margin: '10px'

        }
    }

  render() {
    return (
            <img style={this.style.masteryImage} src={masteryImageLocation}></img>
    )
  }
}
// #1D203B
