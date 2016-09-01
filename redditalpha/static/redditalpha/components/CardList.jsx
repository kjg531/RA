import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Card from './Card';


class CardList extends React.Component {
  render() {
    return (
      <div>
        <GridList
          cellHeight={200}
          padding={0}
          cols={8}
          style={{marginLeft:40}}
        >
          {this.props.cards.map((card) => (
            <GridTile key={card.id}>
              <Card data={card} onClick={this.props.onClick}/>
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}

CardList.propTypes = {
  cards: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default CardList;
