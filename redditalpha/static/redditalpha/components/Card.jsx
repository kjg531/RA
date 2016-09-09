/**
 * Created by KG on 8/9/16.
 */

import React from "react"

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

    rare: {
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

    return (
      <div style={{display:'inline-block'}}>
        <img style={{height:100}}src={this.props.data.image_url} onClick={this.onClick} />
        <span style={this.style[this.props.data.rarity]} data-rarity={this.props.data.rarity}>{this.props.data.cost}</span>
      </div>
    )
  }
}

Card.propTypes = {
  data: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
};

Card.defaultProps = {
  onClick: function(){} // no-op. by default, don't do anything on click
};

export default Card;
