import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import SelectedCardsList from './SelectedCardsList';
import UnselectedCardsList from './UnselectedCardsList';


class CardPicker extends React.Component {
  constructor(props){
    super(props);
    console.log('CardPicker constructor. these are the props:');
    console.log(props);
    this.state = {
      'cards': props.cards.map((card) => {
        return {
          "id": card.id,
          "name": card.name,
          "cost": card.cost,
          "rarity": card.rarity,
          "image_url": card.image_url,
          "selected": false
        };
      }),
      'selectedCards': 0,
      'submitting': false
    };
  }

  save = () => {
    let fd = new FormData();

    this.state.cards.map(function(card, index){
      if (card.selected){
        fd.append('cards', card.id);
      }
    });

    this.setState({
      'submitting': true
    });

    var request = $.ajax({
      url: '/api/decks/',
      method: 'POST',
      headers: {'X-CSRFTOKEN': DJ.CSRFTOKEN},
      type: "POST",
      data: fd,
      processData: false,  // tell jQuery not to process the data
      contentType: false   // tell jQuery not to set contentType
    });

    let self = this;

    request.done(function(data, textStatus, jqXHR) {
      alert(data.status);
      self.setState({
        'submitting': false
      });
    });
     
    request.fail(function(jqXHR, textStatus, errorThrown) {
      alert('Error: ' + jqXHR.responseJSON.cards[0]);
      self.setState({
        'submitting': false
      });
    });
  }

  onClick = (card) => {
    // if we're trying to select a card but there are already 8 selected,
    // just return and do nothing. don't update states.
    if (card.selected == false && this.state.selectedCards == 8){
      return;
    }

    // else, carry on as usual
    this.setState({
      'cards': this.state.cards.map((item) => {
        if (item.id == card.id){
          item.selected = !item.selected;
        }
        return item;
      })
    });

    this.setState({
      'selectedCards': this.state.cards.filter((item) => {return item.selected;}).length
    })
  }

  render() {
    return (
      <div style={{paddingTop:100}}>
        <br/>
        <SelectedCardsList cards={this.state.cards} onClick={this.onClick}/>
        {this.state.selectedCards == 8 ? <button type="button" onClick={this.save}>Save</button> : ""}
        {this.state.submitting ? <h3>Submitting...</h3>:''}
        <br/>
        <UnselectedCardsList cards={this.state.cards} onClick={this.onClick}/>
      </div>
    )
  }
}

CardPicker.propTypes = {
  'cards': React.PropTypes.array.isRequired
};

export default CardPicker;
