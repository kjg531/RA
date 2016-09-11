import React from "react";
import AppBar from 'react-toolbox/lib/app_bar';
import Logo from './Logo';
import theme from './NavBar.scss';
import Avatar from 'react-toolbox/lib/avatar';
import Drawer from 'react-toolbox/lib/drawer';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import {Link, IndexLink, browserHistory} from 'react-router';
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

  redirect = (route) => {
    browserHistory.push(route);
    this.setState({active: false});
  }

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
          
          <List selectable ripple>
            <ListItem
              caption='Home'
              rightIcon='star'
              onClick={this.redirect.bind(this, '/')}
            />
            <ListItem
              caption='Dashboard'
              rightIcon='star'
              onClick={this.redirect.bind(this, '/dashboard')}
            />
            <ListItem
              caption='Deck Index'
              rightIcon='star'
              onClick={this.redirect.bind(this, '/decks')}
            />
            <ListItem
              caption='My Decks'
              rightIcon='star'
              onClick={this.redirect.bind(this, '/decklist')}
            />
            <ListItem
              caption='Deckbuilder'
              rightIcon='star'
              onClick={this.redirect.bind(this, '/deckbuilder')}
            />
            
            
          </List>
          </Drawer>
          </div>
      );
  }
}
