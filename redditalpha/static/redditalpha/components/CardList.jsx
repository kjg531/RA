import React from 'react';
import Card from './Card';


class CardList extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.props.cards.map((card) => (
        <Card data={card} onClick={this.props.clickHandler.bind(this, card.id)}/>
          ))}
      </div>
    )
  }
}

CardList.propTypes = {
  cards: React.PropTypes.array.isRequired,
  clickHandler: React.PropTypes.func.isRequired
};

export default CardList;
