import React from "react";
import { render } from "react-dom";

import DeckList from './DeckList';
import Dialog from 'react-toolbox/lib/dialog';


class DeckIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      dialogOpen: false
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
          return deck.id == data.id ? data:deck;
        })
      });
    }

    this.sortByVotes();
    // This isn't a thing. You don't DELETE a deck. like, EVER.
    /* else if (action == 'delete'){
      console.log('Deck delete');
      this.setState({
        'events': this.state.events.filter(function(event){
          return event.id != data.id;
        })
      });
    }*/
  }

  socketClose = () => {
    this.socket.close();
  }

  loadEvents = () => {
    var request = $.ajax({
      url: '/api/events/',
      type: 'GET'
    });

    let self = this;

    request.done(function(data, textStatus, jqXHR) {
      self.setState({
        events: data.events
      });
    });

    request.fail(function(jqXHR, textStatus, errorThrown) {
      console.log('Error loading events from api');
    });
  }

  loadDecks = () => {
    var request = $.ajax({
      url: '/api/decks/',
      type: 'GET'
    });

    let self = this;

    request.done(function(data, textStatus, jqXHR) {
      self.setState({
        decks: data.decks
      });
    });

    request.fail(function(jqXHR, textStatus, errorThrown) {
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
      console.log('Favorite ' + data.action);
    });

    request.fail((jqXHR, textStatus, errorThrown) => {
      console.log('Favorite ' + data.action);
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
        <h1>This is the deck index!</h1>
        <h3>These are all the decks that have been created by other users. See anything you like? <del>STEAL</del> COPY THAT SHIT!!</h3>
        <DeckList decks={this.state.decks} copyHandler={this.copyDeck} favoriteHandler={this.favoriteDeck} upvoteHandler={this.upvoteDeck} downvoteHandler={this.downvoteDeck}/>
        <Dialog
          actions={actions}
          active={this.state.dialogOpen}
          onEscKeyDown={this.closeDialog}
          onOverlayClick={this.closeDialog}
          title='My awesome dialog'
        >
          <p>Deck copied</p>
        </Dialog>
      </div>
    )
  }
}

DeckIndex.propTypes = {
  cards: React.PropTypes.array.isRequired,
};

DeckIndex.defaultProps = { 
  cards: DJ.BACKEND_CARDS
};

export default DeckIndex;






// import React, {Component, PropTypes} from 'react';

// import EventBox from '../components/events/EventBox';

// export default class BrowseContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { events: [] };
//   }

    
//   socketOpen = () => { 
//     this.socket = new WebSocket("ws://" + window.location.host);
//     this.socket.onmessage = this.socketMessage;
//   }

//   socketMessage = (e) => {
//     let data = JSON.parse(e.data);
//     let action = data.action;
//     delete data.action;

//     if (action == 'add'){
//       data['tag'] = true;
//       console.log('Event add');
//       this.setState({
//         'events': this.state.events.slice().concat(data)
//       });
//     } else if (action == 'update'){
//       data['tag'] = true;
//       console.log('Event update');
//       this.setState({
//         'events': this.state.events.map(function(event){
//           return (event.id == data.id ? data:event);
//         })
//       });
//     } else if (action == 'delete'){
//       console.log('Event delete');
//       this.setState({
//         'events': this.state.events.filter(function(event){
//           return event.id != data.id;
//         })
//       });
//     }
//   }

//   socketClose = () => {
//     this.socket.close();
//   }

//   loadEvents = () => {
//     var request = $.ajax({
//       url: '/api/events/',
//       type: 'GET'
//     });

//     let self = this;

//     request.done(function(data, textStatus, jqXHR) {
//       self.setState({
//         events: data.events
//       });
//     });

//     request.fail(function(jqXHR, textStatus, errorThrown) {
//       console.log('Error loading events from api');
//     });
//   }

//   componentDidMount() {
//     this.loadEvents();
//     this.socketOpen();
//   }

//   componentWillUnmount() {
//     this.socketClose();
//   }

//   render() {
//     return (
//       <div>
//         <h1>This is the browse page</h1>
//         <h3>It contains a list of events, <strong>STRAIGHT OUTTA <del>COMPTON</del> THE DATABASE</strong></h3>
//         <hr/>
//         {this.state.events.map((event) => {
//           return <EventBox key={event.id} event={event} />
//         })}
//       </div>
//     );
//   }
// }