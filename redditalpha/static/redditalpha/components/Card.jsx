/**
 * Created by KG on 8/9/16.
 */

import React from 'react';
import theme from './Card.scss';
class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  style = {
    Common: {
      position: 'absolute',
      top: 2.5,
      left: 2,
      fontFamily: 'SuperCell',
      color: 'white',
      fontSize: '.5rem',
      width: 14,
      height: 24,
      textAlign: 'center',
      textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 2px #000',
    },

    Rare: {
      position: 'absolute',
      top: 8,
      left: 3,
      fontFamily: 'SuperCell',
      color: 'white',
      fontSize: '.5rem',
      width: 14,
      height: 24,
      textAlign: 'center',
      textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 2px #000',
    },

    Epic: {
      position: 'absolute',
      top: 8,
      left: 3,
      fontFamily: 'SuperCell',
      color: 'white',
      fontSize: '.5rem',
      width: 14,
      height: 24,
      textAlign: 'center',
      textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 2px #000',
    },

    Legendary: {
      position: 'absolute',
      top: 8,
      left: 3,
      fontFamily: 'SuperCell',
      color: 'white',
      fontSize: '.5rem',
      width: 14,
      height: 24,
      textAlign: 'center',
      textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 2px #000',
    },
    images: {
      height: '87px !important',
      top: -3,
    },
  }

  onClick = (event) => {
    // console.log('Clicked card ' + this.props.data.name);
    // console.log('Calling cardSelectionHandler from parent');
    // this.setState({'selected': !this.state.selected});
    this.props.onClick(this.props.data);
  }

  render() {
    // this.props.data contains the following items:
      // id      this.props.data.id
      // name      this.props.data.name
      // cost      this.props.data.cost
      // image_url       this.props.data.image_url
      // selected      this.props.data.selected
    if (this.props.data) {
      return (
        <div style={{display: 'inline-block', position: 'relative', height: 90, minWidth: 70}}>
          <img style={{height: '90px', width: '70px', position: 'relative'}} data-rarity={this.props.data.rarity} className={theme.imagesClass1} src={this.props.data.image_url} onClick={this.onClick} title={this.props.data.name}/>
          <span style={this.style[this.props.data.rarity]} data-rarity={this.props.data.rarity}>{this.props.data.cost}</span>
        </div>
      );
    } else {
      return (
        <div style={{display: 'inline-block', position: 'relative', height: 90, minWidth: 70, margin: 8}}>
          <img style={{height: 90, width: 70}}src="/static/images/blank_card.png" />
        </div>
      );
    }
  }
}

Card.propTypes = {
  data: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
};

Card.defaultProps = {
  onClick: function() {},  // no-op. by default, don't do anything on click
};

export default Card;
