import React from "react";
import { render } from "react-dom";

import DeckList from './DeckList';
import Dialog from 'react-toolbox/lib/dialog';


class DeckIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      dialogOpen: false,
      ordering: 'votes'
    };
  }

  sortByVotes = () => {
    this.setState({
      'decks': this.state.decks.sort((a, b) => {
        return b.vote_sum - a.vote_sum;
      })
    });
  }

  socketOpen = () => {
    this.socket = new WebSocket("ws://" + window.location.host);
    this.socket.onmessage = this.socketMessage;
  }

  socketMessage = (e) => {
    console.log('Message received');
    let data = JSON.parse(e.data);
    let action = data.action;
    delete data.action;

    if (action == 'add'){
      data['tag'] = true;
      console.log('Deck add');
      this.setState({
        'decks': this.state.decks.slice().concat(data)
      });
    } else if (action == 'update'){
      data['tag'] = true;
      console.log('Deck update');
      this.setState({
        'decks': this.state.decks.map((deck) => {
          if (deck.id == data.id){
            deck.vote_sum = data.vote_sum;
            deck.favorite_sum = data.favorite_sum;
          }

          return deck;
        })
      });
    }

    this.sortByVotes();
  }

  socketClose = () => {
    this.socket.close();
  }

  loadDecks = () => {
    var request = $.ajax({
      url: '/api/decks/',
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

  upvoteDeck = (id) => {
    var request = $.ajax({
      url: '/api/decks/' + id + '/upvote',
      type: 'POST',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN}
    });

    request.done((data, textStatus, jqXHR) => {
      this.setState({
        decks: this.state.decks.map((deck) => {
          if (deck.id == id){
            deck.vote_status = data.value;
          }
          return deck;
        })
      });
    });
  }

  downvoteDeck = (id) => {
    var request = $.ajax({
      url: '/api/decks/' + id + '/downvote',
      type: 'POST',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN}
    });

    request.done((data, textStatus, jqXHR) => {
      this.setState({
        decks: this.state.decks.map((deck) => {
          if (deck.id == id){
            deck.vote_status = data.value;
          }
          return deck;
        })
      });
    });
  }

  copyDeck = (id) => {
    var request = $.ajax({
      url: '/api/decks/' + id + '/copy',
      type: 'POST',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN}
    });

    request.done((data, textStatus, jqXHR) => {
      this.setState({dialogOpen: true});
      this.setState({
        decks: this.state.decks.map((deck) => {
          if (deck.id == id){
            deck.have_it = true;
          }
          return deck;
        })
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
      // console.log('Favorite ' + data.action);
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      console.log('Favorite ajax failed!');
    });
  }

  closeDialog = () => {
    this.setState({dialogOpen: false});
  }

  componentDidMount() {
    this.loadDecks();
    this.socketOpen();
  }

  componentWillUnmount() {
    this.socketClose();
  }


  render() {
    let actions = [{ label: "Ok", onClick: this.closeDialog }];

    return (
      <div>
        <br/>
        <br/>

        <h1 style={{textAlign: 'center'}}>Decks</h1>

        <DeckList
          decks={this.state.decks}
          copyHandler={this.copyDeck}
          favoriteHandler={this.favoriteDeck}
          upvoteHandler={this.upvoteDeck}
          downvoteHandler={this.downvoteDeck}
        />

        <Dialog
          actions={actions}
          active={this.state.dialogOpen}
          onEscKeyDown={this.closeDialog}
          onOverlayClick={this.closeDialog}
          title='Deck copied'>
        </Dialog>
      </div>
    )
  }
}

export default DeckIndex;
