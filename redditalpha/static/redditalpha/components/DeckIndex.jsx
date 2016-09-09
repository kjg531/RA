import React from "react";
import { render } from "react-dom";

import DeckList from './DeckList';


class DeckIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'decks': []
    };
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

  componentDidMount() {
    this.loadDecks();
  }
  render() {
    return (
      <div>
        <br/>
        <br/>
        <h1>This is the deck index!</h1>
        <DeckList decks={this.state.decks}/>
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