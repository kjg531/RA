import React from 'react';

import Input from 'react-toolbox/lib/input';
import {Button, IconButton} from 'react-toolbox/lib/button';

import theme from './DeckNotes.scss'
import Deck from './Deck';
import Hand from './Hand';


export default class DeckNotes extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      notes: '',
      showHands: false,
      loading: true
    };
  }

  loadDeck = () => {
    var request = $.ajax({
      url: '/api/decks/' + this.props.params.deckId + '/notes',
      type: 'GET'
    });

    request.done((data, textStatus, jqXHR) => {
      this.setState({
        deck: data.deck,
        notes: data.notes,
        loading: false
      });
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      console.log('Error loading deck from api');
    });
  }

  buildCardHash = () => {
    if (!this.state.deck){
      return;
    }

    this.cardHash = {};

    this.state.deck.cards.map((card) => {
      this.cardHash[card.id] = card;
    });
  }

  buildCardList = (hand) => {
    return hand.map((id) => this.getCard(id));
  }

  getCard = (id) => {
    if (!this.cardHash){
      this.buildCardHash();
    }

    return this.cardHash[id];
  }

  componentDidMount() {
    this.loadDeck();
  }

  toggleShowHands = () => {
    this.setState({showHands: !this.state.showHands});
  }

  handleNotesChange = (value) => {
    this.setState({notes: value});
  }

  handleNotesBlur = () => {
    var request = $.ajax({
      url: '/api/decks/' + this.props.params.deckId + '/notes',
      type: 'POST',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN},
      data: {notes: this.state.notes}
    });

    request.done((data, textStatus, jqXHR) => {
      console.log('Posted notes for deckid:' + this.props.params.deckId);
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      console.log('Error saving notes');
    });
  }

  render() {
    // TODO: LOADING SPINNER THING. YOU HAVE TO PUT IT ON LIKE 110, WHERE THAT <p> IS
    return (
      <div style={{textAlign: 'center'}}>
        <h1>These is a deck!</h1>

        <div>
          <p>Here you can pick your favorite starting hands for this deck and save notes!</p>
        </div>

        <div>
          <h1>Deck</h1>
          {this.state.loading ? <p>loading...</p> : <Deck cards={this.state.deck.cards} />}
        </div>

        <div>
          <h1>Notes</h1>
          <Input
            type='text'
            multiline label='Notes'
            value={this.state.notes}
            className={theme.inputClass}
            onChange={this.handleNotesChange}
            onBlur={this.handleNotesBlur}
          />
        </div>

        <div>
          <h1>Starting Hands {this.state.showHands ? <Button icon="remove" label="Hide" onClick={this.toggleShowHands} flat/> : <Button icon="add" label="Show" onClick={this.toggleShowHands} flat/>}</h1> 

          <div style={!this.state.showHands ? {display: 'none'} : {}}>
            {this.state.deck ? this.state.deck.hands.map((hand) => (
              <Hand
                key={hand.cards}
                deckId={this.props.params.deckId}
                cards={this.buildCardList(hand.cards)}
                starter={hand.starter}
              />
            )) : ''}
          </div>
        </div>
      </div>
    )
  }
}


// import React from "react";
// import { render } from "react-dom";

// import MyDeckList from './MyDeckList';
// import TagFilter from './TagFilter';


// class MyDecks extends React.Component {


//   favoriteDeck = (id) => {
//     var request = $.ajax({
//       url: '/api/decks/' + id + '/favorite',
//       type: 'POST',
//       headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN}
//     });

//     request.done((data, textStatus, jqXHR) => {
//       this.setState({
//         decks: this.state.decks.map((deck) => {
//           if (deck.id == id){
//             deck.favorite = data.favorite;
//           }
//           return deck;
//         })
//       });
//     });

//     request.fail((jqXHR, textStatus, errorThrown) => {
//       console.log('Favorite ajax failed!');
//     });
//   }

//   deleteDeck = (id) => {
//     var request = $.ajax({
//       url: '/api/decks/' + id + '/delete' ,
//       type: 'DELETE',
//       headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN}
//     });

//     request.done((data, textStatus, jqXHR) => {
//       this.setState({
//         'decks': this.state.decks.filter((deck) => {
//           return deck.id != id;
//         })
//       });
//     });

//     request.fail((jqXHR, textStatus, errorThrown) => {
//       console.log('Delete deck ' + id + ' failed!');
//     });
//   }



//   toggleTagFilter = (tag) => {
//     if (this.state.tagFilters.indexOf(tag) >= 0){
//       this.setState({
//         tagFilters: this.state.tagFilters.filter((item) => {return item != tag})
//       });
//     } else {
//       this.setState({
//         tagFilters: this.state.tagFilters.concat(tag)
//       });
//     }
//   }

//   render() {
//     return (
//       <div>
//         <h1>These are your decks</h1>

//         <div>
//           <p>Here you can filter your decks by the tags you assigned to them</p>
//           <TagFilter
//             tags={this.state.tags} 
//             tagFilters={this.state.tagFilters}
//             toggleTagFilter={this.toggleTagFilter} />
//         </div>

//         <MyDeckList 
//           decks={this.state.decks}
//           tagFilters={this.state.tagFilters}
//           favoriteHandler={this.favoriteDeck}
//           deleteHandler={this.deleteDeck} 
//         />
//       </div>
//     )
//   }
// }

// export default MyDecks;
