import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
};


class CardList extends React.Component {
  style = {
    icon: {
      height: '50px',
      width: '50px',
      margin: '10px'
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={200}
          style={styles.gridList}
        >
          <Subheader>58 Cards!!!</Subheader>
          {this.props.cards.map((card) => (
            <GridTile key={card.id}>
              <img src={card.image_url} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}

CardList.propTypes = {
  cards: React.PropTypes.array.isRequired
};

export default CardList;