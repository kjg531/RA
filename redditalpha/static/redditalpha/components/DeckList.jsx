import React from "react";
import Deck from './Deck';
import {Button, IconButton} from 'react-toolbox/lib/button';
import theme from './DeckList.scss';
import FlipMove from 'react-flip-move';
import Card from 'react-toolbox/lib/card';

class DeckList extends React.Component {
  render() {
    return (
      <div style={{width: '100%', textAlign: 'center'}}>
        { this.props.decks.map((deck) => {
            return (
              <div>
                <FlipMove
                  duration={1000}
                  delay={0}
                  easing="ease-in-out"
                  enterAnimation="accordionVertical"
                  leaveAnimation="accordionVertical"
                  staggerDurationBy={100}
                  staggerDelayBy={0}
                  >

                      <div style={{display:'inline-flex'}} key={deck.id}>
                        <Card theme={theme}>
                          <h5 style={{fontFamily: 'SuperCell', fontSize: '1.5em', 'line-height': 10, width: 25, paddingLeft: 20, margin: 'auto'}} className="score">{deck.vote_sum}</h5>

                            <div style={{display: 'block', margin: 'auto'}}>
                              <IconButton style={{display: 'block', transform: 'rotateZ(90deg)'}}  theme={theme} icon='chevron_left'  onClick={this.props.upvoteHandler.bind(this, deck.id)} accent={deck.vote_status == 1 ? true:false} />
                              <IconButton style={{display: 'block', transform: 'rotateZ(90deg)'}}  theme={theme} icon='chevron_right' onClick={this.props.downvoteHandler.bind(this, deck.id)} accent={deck.vote_status == -1 ? true:false} />
                            </div>

                              <Deck style={{position: 'relative', top: 15, marginBottom: 15}} cards={deck.cards} />
                              <div className={theme.rightWrapper}>
                              <IconButton icon='content_copy' onClick={this.props.copyHandler.bind(this, deck.id)} disabled={deck.have_it ? true:false} floating accent mini />
                              <IconButton icon={deck.favorite ? 'favorite' : 'favorite_border'} onClick={this.props.favoriteHandler.bind(this, deck.id)} accent />
                              <h5 style={{fontFamily: 'SuperCell', fontSize: '.7em', paddingLeft: 4, marginTop: -10, marginBottom:0}}>Favorites: <br/> {deck.favorite_sum}</h5>
                            </div>
                          </Card>
                        </div>
                      </FlipMove>
                <br/>
                   </div>
            );
        })}
      </div>
    )
  }
}

DeckList.propTypes = {
  decks: React.PropTypes.array.isRequired,
  copyHandler: React.PropTypes.func.isRequired,
  upvoteHandler: React.PropTypes.func.isRequired,
  downvoteHandler: React.PropTypes.func.isRequired,
  favoriteHandler: React.PropTypes.func.isRequired,
};


export default DeckList;
