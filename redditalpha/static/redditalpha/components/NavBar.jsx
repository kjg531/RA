import React from "react";
import AppBar from 'react-toolbox/lib/app_bar';
import Logo from './Logo';
import theme from './NavBar.scss';
import Avatar from 'react-toolbox/lib/avatar';
import Drawer from 'react-toolbox/lib/drawer/Drawer.js';
import {Button, IconButton} from 'react-toolbox/lib/button';


export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      authenticated: (AUTH.user === null ? false:true),
    };
  }


  handleToggle = () => {
    this.setState({
      active: !this.state.active
    });
  };

  render() {
      if (this.state.authenticated) {
        var topRightButton = <Avatar image={AVATAR_URL} onClick={this.handleToggle} theme={theme} />
      } else {
        var topRightButton = <Button icon='add' href='/accounts/discord/login/?process=login' onClick={this.handleToggle} label='Add this' flat primary />
      }
        return (
          <div>
          <AppBar leftIcon={<Logo />} rightIcon={topRightButton} title="title" fixed flat theme={theme} />
          <Drawer active={this.state.active} type='right' onOverlayClick={this.handleToggle}>
          <h5>This is your Drawer.</h5>
          <p>You can embed any content you want, for example a Menu.</p>
          </Drawer>
          </div>
      );
  }
}
