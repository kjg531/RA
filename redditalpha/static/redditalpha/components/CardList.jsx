// import React from 'react';
// import {GridList, GridTile} from 'material-ui/GridList';
// import Card from './Card';
//
// const {Grid, Row, Col} = require('react-flexbox-grid');
//
// class CardList extends React.Component {
//   render() {
//     return (
//       <Grid>
//             {this.props.cards.map((card) => (
//              <Card data={card} onClick={this.props.onClick}/>
//             ))}
//       </Grid>
//     );
//
//     /*return (
//       <div>
//         <GridList
//           cellHeight={200}
//           padding={0}
//           cols={8}
//           style={{marginLeft:40}}
//         >
//           {this.props.cards.map((card) => (
//             <GridTile key={card.id}>
//               <Card data={card} onClick={this.props.onClick}/>
//             </GridTile>
//           ))}
//         </GridList>
//       </div>
//     )*/
//   }
// }
//
// CardList.propTypes = {
//   cards: React.PropTypes.array.isRequired,
//   onClick: React.PropTypes.func.isRequired
// };
//
// export default CardList;


import React from 'react';
import Card from './Card';


class CardList extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.props.cards.map((card) => (
        <Card data={card} onClick={this.props.onClick}/>
          ))}
      </div>
    )
  }
}

CardList.propTypes = {
  cards: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default CardList;
