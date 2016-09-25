import React from 'react';
import Input from 'react-toolbox/lib/input';
import Chip from 'react-toolbox/lib/chip';
import theme from './Tagger.scss'


class Tagger extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tag: ''
    };
  }

  cut = () => {

  }

  handleChange = (value) => {
    this.setState({tag: value.toLowerCase()});
  }

  keyPress = (e) => {
    if (e.key == ',' || e.key == 'Enter' || e.key == 'Tab'){
      let newTag = this.state.tag.trim();
      let added = this.props.addTagHandler(newTag);
      if (added){
        this.setState({tag: ''});
      }
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className={theme.tagger}>
        <div>{this.props.tags.map((tag) => <Chip deletable onDeleteClick={this.props.deleteTagHandler.bind(this, tag)}>{tag}</Chip>)}</div>
        <Input type='text' label='Add Tag to Deck!' name='tags' value={this.state.tag} onChange={this.handleChange} onKeyPress={this.keyPress}/>
      </div>
    )
  }
}

Tagger.propTypes = {
  tags: React.PropTypes.array.isRequired,
  addTagHandler: React.PropTypes.func.isRequired,
  deleteTagHandler: React.PropTypes.func.isRequired
};

export default Tagger;
