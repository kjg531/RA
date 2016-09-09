import React from "react";
import {Button, IconButton} from 'react-toolbox/lib/button';
import Table from 'react-toolbox/lib/table';

import Deck from './Deck';

const DeckModel = {
  id: {type: Number},
  cards: {type: String},
};

class MyDeckList extends React.Component {
  render() {
    return (
      <div>
        <div style={{display:'inline-block'}}>
          { this.props.decks.map((deck) => {
            return (
              <div key={deck.id}>
                <IconButton icon='favorite' accent />
                <Button onClick={this.props.deleteHandler.bind(this, deck.id)} icon='delete' floating mini />
                <Button type="button">Edit</Button>
                <Deck cards={deck.cards} />
              </div>
            );
          })}
        </div>
        <Table
          model={DeckModel}
          selectable
          multiSelectable
          source={this.props.decks}
        />
      </div>
    )
  }
}

MyDeckList.propTypes = {
  decks: React.PropTypes.array.isRequired,
};

MyDeckList.defaultProps = { 
  decks: []
};

export default MyDeckList;

////////////////////////////

// const DeckModel = {
//   id: {type: Number},
//   cards: {type: String},
// };

// const users = [
//   {name: 'Javi Jimenez', twitter: '@soyjavi', birthdate: new Date(1980, 3, 11), cats: 1},
//   {name: 'Javi Velasco', twitter: '@javivelasco', birthdate: new Date(1987, 1, 1), dogs: 1, active: true}
// ];

// class TableTest extends React.Component {
//   state = { selected: [], source: users };

//   handleChange = (row, key, value) => {
//     const source = this.state.source;
//     source[row][key] = value;
//     this.setState({source});
//   };

//   handleSelect = (selected) => {
//     this.setState({selected});
//   };

//   render () {
//     return (
//       <Table
//         model={UserModel}
//         onChange={this.handleChange}
//         onSelect={this.handleSelect}
//         selectable
//         multiSelectable
//         selected={this.state.selected}
//         source={this.state.source}
//       />
//     );
//   }
// }