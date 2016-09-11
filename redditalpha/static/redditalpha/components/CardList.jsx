import React from 'react';
import Card from './Card';


class CardList extends React.Component {
  renderPlaceholders = () => {
    let jsx = [];
    if (this.props.cards.length < this.props.placeholders){
      for(let i = 0; i < Math.abs(this.props.placeholders - this.props.cards.length); i++){
        jsx.push(<Card />);
      }
    }
    return jsx;
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.props.cards.map((card) => (
          <Card data={card} onClick={this.props.clickHandler.bind(this, card.id)}/>
        ))}
        
        {this.renderPlaceholders()}
      </div>
    );
  }
}

CardList.propTypes = {
  cards: React.PropTypes.array.isRequired,
  placeholders: React.PropTypes.number.isRequired,
  clickHandler: React.PropTypes.func.isRequired
};

CardList.defaultProps = {
  placeholders: 0
};

export default CardList;
