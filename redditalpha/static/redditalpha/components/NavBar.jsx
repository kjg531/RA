import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Logo from './Logo';
import theme from './NavBar.scss';
import Avatar from 'react-toolbox/lib/avatar';
import Drawer from 'react-toolbox/lib/drawer';
import {List, ListItem} from 'react-toolbox/lib/list';
import {Link, browserHistory} from 'react-router';
import {Button, IconButton} from 'react-toolbox/lib/button';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }


  handleToggle = () => {
    this.setState({
      active: !this.state.active,
    });
  };

  redirect = (route) => {
    browserHistory.push(route);
    this.setState({
      active: false,
    });
  }

  render() {
    if (this.props.user.authenticated) {
      var topRightButton = (<Avatar
                             image={ this.props.user.avatar }
                             onClick={ this.handleToggle }
                             theme={ theme } />);
    } else {
      var topRightButton = (
        <Button
         icon="exit_to_app"
         href="/accounts/discord/login/?process=login"
         label="Login"
         flat
       />
     );
}
    return (
    <div>
      <AppBar
              leftIcon={ <Link to="/"><Logo /></Link> }
              rightIcon={ topRightButton }
              title="Reddit Alpha Clan Family"
              fixed
              flat
              theme={ theme } />
      <Drawer
              theme={ theme }
              active={ this.state.active }
              type="right"
              onOverlayClick={ this.handleToggle }>
        <List
              selectable
              ripple>
          <ListItem
                    caption="HomeFUCK"
                    leftIcon="home"
                    onClick={ this.redirect.bind(this, '/') }
                    theme={ theme } />
          <ListItem
                    caption="Dashboard"
                    leftIcon="dashboard"
                    onClick={ this.redirect.bind(this, '/dashboard') }
                    theme={ theme } />
          <ListItem
                    caption="Deckbuilder"
                    leftIcon="build"
                    onClick={ this.redirect.bind(this, '/deckbuilder') }
                    theme={ theme } />
          <ListItem
                    caption="Browse"
                    leftIcon="pageview"
                    onClick={ this.redirect.bind(this, '/decks') }
                    theme={ theme } />
          <ListItem
                    caption="My Decks"
                    leftIcon="view_list"
                    onClick={ this.redirect.bind(this, '/decklist') }
                    theme={ theme } />
        </List>
      </Drawer>
    </div>
    );
  }
}
