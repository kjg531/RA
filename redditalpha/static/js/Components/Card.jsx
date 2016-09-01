/**
 * Created by KG on 8/9/16.
 */

import React from "react"

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = (event) => {
    console.log('Clicked card ' + this.props.data.name);
    console.log('Calling cardSelectionHandler from parent');
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
      <img style={{height:200}}src={this.props.data.image_url} onClick={this.onClick} />
    )
  }
}

Card.propTypes = {
  data: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
};

export default Card;
