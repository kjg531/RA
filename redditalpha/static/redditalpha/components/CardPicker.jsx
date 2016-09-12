import React from 'react';

import CardList from './CardList';
// import SelectedCardsList from './SelectedCardsList';
// import UnselectedCardsList from './UnselectedCardsList';
import Tagger from './Tagger';

import {Button, IconButton} from 'react-toolbox/lib/button';
import ProgressBar from 'react-toolbox/lib/progress_bar';

class CardPicker extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    // return (
    //   <div style={{paddingTop:100}}>
    //     <br/>
    //     <Tagger tags={this.props.tags} addTagHandler={this.props.addTagHandler} deleteTagHandler={this.props.deleteTagHandler}/>
    //     <SelectedCardsList cards={this.props.cards} clickHandler={this.props.clickHandler}/>
    //     <Button style={{position: 'fixed', bottom: 10, left: 10, zIndex: 10}}  icon='clear'onMouseUp={this.props.clearHandler} floating inverse mini />
    //     <Button style={{position: 'fixed', bottom: 10, right: 10, zIndex: 10}} icon='add'  onMouseUp={this.props.saveHandler}  floating accent  mini />
    //     {this.props.submitting ? <ProgressBar mode="indeterminate" />:''}
    //     <br/>
    //     <UnselectedCardsList cards={this.props.cards} clickHandler={this.props.clickHandler}/>
    //   </div>
    // )
    return (
      <div style={{paddingTop:100}}>
        <br/>
        <CardList cards={this.props.cards.filter((card) => {return card.selected})} placeholders={8} clickHandler={this.props.clickHandler}/>
        <Button style={{position: 'fixed', bottom: 10, left: 10, zIndex: 10}}  icon='clear'onMouseUp={this.props.clearHandler} floating inverse mini />
        <Button style={{position: 'fixed', bottom: 10, right: 10, zIndex: 10}} icon='add'  onMouseUp={this.props.saveHandler}  floating accent  mini />
        {this.props.submitting ? <ProgressBar mode="indeterminate" />:''}
        <br/>
        <CardList cards={this.props.cards.filter((card) => {return !card.selected})} clickHandler={this.props.clickHandler}/>
        <br/>
        <Tagger tags={this.props.tags} addTagHandler={this.props.addTagHandler} deleteTagHandler={this.props.deleteTagHandler}/>
      </div>
    )
  }
}

CardPicker.propTypes = {
  cards: React.PropTypes.array.isRequired,
  selectedCards: React.PropTypes.number.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  saveHandler: React.PropTypes.func.isRequired,
  clearHandler: React.PropTypes.func.isRequired,
  clickHandler: React.PropTypes.func.isRequired,
  tags: React.PropTypes.array.isRequired,
  addTagHandler: React.PropTypes.func.isRequired,
  deleteTagHandler: React.PropTypes.func.isRequired,
};

export default CardPicker;
