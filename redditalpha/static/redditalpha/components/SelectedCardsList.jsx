import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import CardList from './CardList';


class SelectedCardsList extends React.Component {
  render() {
    return (
      <CardList
        cards={this.props.cards.filter((card) => {return card.selected})}
        onClick={this.props.onClick}
      />
    );
  }
}

SelectedCardsList.propTypes = {
  cards: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default SelectedCardsList;
