import React, {PropTypes} from 'react';
import {withRouter} from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import theme from './NavMenu.scss';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //stuff
    };
  }

  render() {
    return (
      <IconMenu
        {...this.props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Home" onTouchTap={() => this.props.router.push('/')} />
        <MenuItem primaryText="Dashboard" onTouchTap={() => this.props.router.push('/dashboard')} />
        <MenuItem primaryText="Deckbuilder" onTouchTap={() => this.props.router.push('/deckbuilder')} />
        <MenuItem primaryText="Browse" onTouchTap={() => this.props.router.push('/decks')} />
        <MenuItem primaryText="My Decks" onTouchTap={() => this.props.router.push('/decklist')} />
      </IconMenu>
    );
  }
}

NavMenu.propTypes = {
  // stuff
};

export default withRouter(NavMenu);
