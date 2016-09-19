import React from "react";
import { render } from "react-dom";

import Checkbox from 'react-toolbox/lib/checkbox';
import Chip from 'react-toolbox/lib/chip';

import MyDeckList from './MyDeckList';


class MyDecks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      tags: [],
      tagFilters: []
    };
  }

  loadDecks = () => {
    var request = $.ajax({
      url: '/api/decks/mine',
      type: 'GET'
    });

    request.done((data, textStatus, jqXHR) => {
      this.setState({
        decks: data.decks,
        tags: data.tags.concat('untagged'),
        tagFilters: data.tags.concat('untagged')
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

  toggleTagFilter = (tag) => {
    if (this.state.tagFilters.indexOf(tag) >= 0){
      this.setState({
        tagFilters: this.state.tagFilters.filter((item) => {return item != tag})
      });
    } else {
      this.setState({
        tagFilters: this.state.tagFilters.concat(tag)
      });
    }
  }

  render() {
    return (
      <div>
        <h1>These are your decks</h1>

        <div>
          <p>Here you can filter your decks by the tags you assigned to them</p>
          {this.state.tags.map((tag) => {
            return (
              <Checkbox
                checked={this.state.tagFilters.indexOf(tag) >= 0}
                label={<Chip>{tag}</Chip>}
                onChange={this.toggleTagFilter.bind(this, tag)}
            />);
          })}
        </div>

        <MyDeckList 
          decks={this.state.decks}
          tagFilters={this.state.tagFilters}
          favoriteHandler={this.favoriteDeck}
          deleteHandler={this.deleteDeck} 
        />
      </div>
    )
  }
}

export default MyDecks;
