import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import SelectedCardsList from './SelectedCardsList';
import UnselectedCardsList from './UnselectedCardsList';
import {Button, IconButton} from 'react-toolbox/lib/button';
import ProgressBar from 'react-toolbox/lib/progress_bar';

class CardPicker extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div style={{paddingTop:100}}>
        <br/>
        <SelectedCardsList cards={this.props.cards} clickHandler={this.props.clickHandler}/>
        <Button style={{position: 'fixed', bottom: 10, left: 10, zIndex: 10}}  icon='clear'onMouseUp={this.props.clearHandler} floating inverse mini />
        <Button style={{position: 'fixed', bottom: 10, right: 10, zIndex: 10}} icon='add'  onMouseUp={this.props.saveHandler}  floating accent  mini />
        {this.props.submitting ? <ProgressBar mode="indeterminate" />:''}
        <br/>
        <UnselectedCardsList cards={this.props.cards} clickHandler={this.props.clickHandler}/>
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
  clickHandler: React.PropTypes.func.isRequired 
};

export default CardPicker;
