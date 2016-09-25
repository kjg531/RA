import React from 'react';
import theme from './TagFilter.scss'

import {IconButton} from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import Chip from 'react-toolbox/lib/chip';


export default class TagFilter extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {dialogOpen: false};
    }

    handleToggle = () => {
      this.setState({dialogOpen: !this.state.dialogOpen});
    }

    render() {
      return (
          <div>
              <IconButton icon='filter_list' onClick={this.handleToggle} />
              <Dialog
                active={this.state.dialogOpen}
                onEscKeyDown={this.handleToggle}
                onOverlayClick={this.handleToggle}
                title='Tag Filters'
              >
                {this.props.tags.map((tag) => {
                  return (
                    <Chip 
                      onClick={this.props.toggleTagFilter.bind(this, tag)}
                      className={this.props.tagFilters.indexOf(tag) >= 0 ? theme.selectedChip : theme.unselectedChip }
                    >
                      {tag}
                    </Chip>
                  );
                })}
              </Dialog>
          </div>
      );
    }
}
