import React from 'react';
import theme from './Hand.scss'

import Card from './Card';
import HandRate from './HandRate';

export default class Hand extends React.Component {
  static propTypes = {
    deckId: React.PropTypes.string.isRequired,
    cards: React.PropTypes.array.isRequired, // only initial card list to build state with
    starter: React.PropTypes.number, // only initial starter to build state with
  };

  static defaultProps = {
    starter: null
  }

  static style = {
    highlighted: {backgroundColor: 'red'}
  }

  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards,
      selectedCard: props.starter
    };
  }

  handleCardClick = (card) => {
    this.setState({
      selectedCard: card.id
    });

    var request = $.ajax({
      url: '/api/decks/' + this.props.deckId + '/hand/starter',
      type: 'POST',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN},
      data: {
        card1_id: this.state.cards[0].id,
        card2_id: this.state.cards[1].id,
        card3_id: this.state.cards[2].id,
        card4_id: this.state.cards[3].id,
        starter_id: card.id
      }
    });

    request.done((data, textStatus, jqXHR) => {
      console.log('Posted starter card for hand in deckid:' + this.props.deckId);
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      console.log('Error saving starter card');
    });
  }

  render() {
    return (
      <div>
        {this.state.cards.map((card, i) => {
          return (
            <span key={card.id} style={card.id == this.state.selectedCard ? Hand.style.highlighted : {}}>
              <Card
                data={card}
                onClick={this.handleCardClick.bind(this, card)}
              />
            </span>
          );
        })}
      </div>
    );
  }
}


// import React from "react";

// import Card from './Card';


// class Deck extends React.Component {
//   style = {

//   }
//   render() {
//     return (
//       <div style={this.props.style}>
//         {this.props.cards.map(function(card, i){
//           return <Card key={card.id} data={card} />;
//         })}
//       </div>
//     )
//   }
// }

// Deck.propTypes = {
//   cards: React.PropTypes.array.isRequired,
// };

// Deck.defaultProps = {
//   cards: []
// };

// export default Deck;
