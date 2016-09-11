import React from "react";
import Deck from './Deck';
import {Button, IconButton} from 'react-toolbox/lib/button';
import theme from './DeckList.scss';
import FlipMove from 'react-flip-move';

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
                          <h5 style={{fontFamily: 'SuperCell', fontSize: '1.5em', 'line-height': 10, width: 25}} className="score">{deck.vote_sum}</h5>

                            <div style={{display: 'block'}}>
                              <IconButton style={{display: 'block', transform: 'rotateZ(90deg)'}}  theme={theme} icon='chevron_left'  onClick={this.props.upvoteHandler.bind(this, deck.id)} accent={deck.vote_status == 1 ? true:false} />
                              <IconButton style={{display: 'block', transform: 'rotateZ(90deg)'}}  theme={theme} icon='chevron_right' onClick={this.props.downvoteHandler.bind(this, deck.id)} accent={deck.vote_status == -1 ? true:false} />
                            </div>

                            <div>
                              <Deck cards={deck.cards} />
                            </div>
                                              <div style={{marginTop:10}}>
                              <IconButton icon='content_copy' onClick={this.props.copyHandler.bind(this, deck.id)} disabled={deck.have_it ? true:false} floating accent mini />
                              <IconButton icon={deck.favorite? 'favorite':'favorite_border'} onClick={this.props.favoriteHandler.bind(this, deck.id)} accent />
                              <h5 style={{fontFamily: 'SuperCell', fontSize: '.7em', paddingLeft: 4, marginTop: 6}}>Favorites: {deck.favorite_sum}</h5>
                            </div>
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
