import React from 'react';
import Input from 'react-toolbox/lib/input';
import TextField from 'material-ui/TextField';
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
        <TextField
          floatingLabelText="Add Tag to Deck!"
          name='tags'
          value={this.state.tag}
          onChange={this.handleChange}
          theme={theme}
          onKeyPress={this.keyPress}
          underlineStyle={{borderColor: '#303030'}}
        />
      </div>
    )
  }
}
{/* <Input type='text' label='Add Tag to Deck!' name='tags' value={this.state.tag} onChange={this.handleChange} theme={theme} onKeyPress={this.keyPress}/> */}

Tagger.propTypes = {
  tags: React.PropTypes.array.isRequired,
  addTagHandler: React.PropTypes.func.isRequired,
  deleteTagHandler: React.PropTypes.func.isRequired
};

export default Tagger;
