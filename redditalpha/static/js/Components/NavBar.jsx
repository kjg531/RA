import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Logo from './Logo'
import FlatButton from 'material-ui/FlatButton'

const style = {
    Logo: {
        height: 65,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'transparent',
    },
    Title: {
        position: 'absolute',
        left: 80,
        color: 'white',
        fontWeight: 100,
    },
    AppBar: {
       margin: 0,
       position: 'fixed',
       top: 0,
       height: 65,
    },
}

const NavBar = () => (
  <AppBar
    title="Reddit Alpha Clan System"
    titleStyle={style.Title}
    style={style.AppBar}
    iconElementLeft={<FlatButton
                            icon={<Logo />}
                            style={style.Logo}
                        />}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton
            iconStyle={{color:'white'}}
            iconClassName="material-icons"
          >
              menu
          </IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    }
  />
);

export default NavBar;
