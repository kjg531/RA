import React from "react";
import { render } from "react-dom";

import MyDeckList from './MyDeckList';


class MyDecks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'decks': []
    };
  }

  loadDecks = () => {
    var request = $.ajax({
      url: '/api/decks/mine',
      type: 'GET'
    });

    request.done((data, textStatus, jqXHR) => {
      this.setState({
        decks: data.decks
      });
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      console.log('Error loading decks from api');
    });
  }

  favoriteDeck = (id) => {
    var request = $.ajax({
      url: '/api/decks/' + id + '/favorite',
      type: 'POST',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN}
    });

    request.done((data, textStatus, jqXHR) => {
      this.setState({
        decks: this.state.decks.map((deck) => {
          if (deck.id == id){
            deck.favorite = data.favorite;
          }
          return deck;
        })
      });
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      console.log('Favorite ajax failed!');
    });
  }

  deleteDeck = (id) => {
    var request = $.ajax({
      url: '/api/decks/' + id + '/delete' ,
      type: 'DELETE',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN}
    });

    request.done((data, textStatus, jqXHR) => {
      this.setState({
        'decks': this.state.decks.filter((deck) => {
          return deck.id != id;
        })
      });
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      console.log('Delete deck ' + id + ' failed!');
    });
  }

  componentDidMount() {
    this.loadDecks();
  }

  render() {
    return (
      <div>
        <br/>
        <br/>
        <h1>These are your decks</h1>
        <MyDeckList 
          decks={this.state.decks} 
          favoriteHandler={this.favoriteDeck}
          deleteHandler={this.deleteDeck} 
        />
      </div>
    )
  }
}

export default MyDecks;
