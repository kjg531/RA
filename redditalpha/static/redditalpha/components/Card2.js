/**
 * Created by KG on 8/9/16.
 */

import React from "react"
const pr = '/static/images/SkeletonsCard.png'
const sk = '/static/images/PrinceCard.png'
const mp = '/static/images/MiniPEKKACard.png'
const mr = '/static/images/MinerCard.png'
const g = '/static/images/GuardsCard.png'
const rg = '/static/images/RoyalGiantCard.png'
const p = '/static/images/PrincessCard.png'


class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  style = {
    common: {
      position: 'relative',
      display: 'inline-block',
      top: -132,
      left: -122,
      fontFamily: 'SuperCell',
      color: 'white',
      fontSize: '1rem',
      width: 14,
      height: 24,
      textAlign: 'center',
      textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 2px #000',
    },

    epic: {
      position: 'relative',
      display: 'inline-block',
      top: -128,
      left: -122,
      fontFamily: 'SuperCell',
      color: 'white',
      fontSize: '1rem',
      width: 14,
      height: 24,
      textAlign: 'center',
      textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 2px #000',
    },

    legendary: {
      position: 'relative',
      display: 'inline-block',
      top: -129,
      left: -113,
      fontFamily: 'SuperCell',
      color: 'white',
      fontSize: '1rem',
      width: 14,
      height: 24,
      textAlign: 'center',
      textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 2px #000',
    }
  }

  onClick = (event) => {
    // console.log('Clicked card ' + this.props.data.name);
    console.log('Calling cardSelectionHandler from parent');
    // this.setState({'selected': !this.state.selected});
    // this.props.onClick(this.props.data);
  }

  render() {
    // this.props.data contains the following items:
      // id      this.props.data.id
      // name      this.props.data.name
      // cost      this.props.data.cost
      // image_url       this.props.data.image_url
      // selected      this.props.data.selected

    return (
      <div>
        <div>
          <img style={{height:160}}src={pr} onClick={this.onClick} />
          <span style={this.style.common}>4</span>
        </div>
        <div>
          <img style={{height:160}}src={sk} onClick={this.onClick} />
          <span style={this.style.epic}>4</span>
        </div>
        <div>
          <img style={{height:160}}src={mp} onClick={this.onClick} />
          <span style={this.style.epic}>4</span>
        </div>
        <div>
          <img style={{height:160}}src={mr} onClick={this.onClick} />
          <span style={this.style.legendary}>4</span>
        </div>
        <div>
          <img style={{height:160}}src={g} onClick={this.onClick} />
          <span style={this.style.epic}>4</span>
        </div>
        <div>
          <img style={{height:160}}src={rg} onClick={this.onClick} />
          <span style={this.style.common}>4</span>
        </div>
        <div>
          <img style={{height:160}}src={p} onClick={this.onClick} />
          <span style={this.style.legendary}>4</span>
        </div>
        <div>
          <img style={{height:160}}src={sk} onClick={this.onClick} />
          <span style={this.style.price}>8</span>
        </div>
        <div>
          <img style={{height:160}}src={sk} onClick={this.onClick} />
          <span style={this.style.price}>9</span>
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  data: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
};

export default Card;
