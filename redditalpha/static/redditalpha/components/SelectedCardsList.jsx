import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import CardList from './CardList';


class SelectedCardsList extends React.Component {
  
  render() {
    return (
      <CardList
        cards={this.props.cards.filter((card) => {return card.selected})}
        clickHandler={this.props.clickHandler}
      />
    );
  }
}

SelectedCardsList.propTypes = {
  cards: React.PropTypes.array.isRequired,
  clickHandler: React.PropTypes.func.isRequired
};

export default SelectedCardsList;
