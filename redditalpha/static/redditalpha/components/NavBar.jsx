import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}


class Logged extends Component {
  state = {
    open: false
  };

  handleClick = () => {
    console.log('Penis');
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <IconMenu
        open={this.state.open}
        iconButtonElement={<IconButton onTouchStart={this.handleClick}><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }
}

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class AppBarExampleComposition extends Component {
  state = {
    logged: true,
  };

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    return (
      <div>
        <AppBar
          title="Title"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={this.state.logged ? <Logged /> : <Login />}
        />
        <Toggle
          label="Logged"
          defaultToggled={true}
          onToggle={this.handleChange}
          labelPosition="right"
          style={{margin: 20}}
        />
      </div>
    );
  }
}

export default AppBarExampleComposition;







// import React from 'react';
// import Logo from './Logo';
// import theme from './NavBar.scss';
//
// import {Link, browserHistory} from 'react-router';
//
// import Avatar from 'react-toolbox/lib/avatar';
// import Drawer from 'react-toolbox/lib/drawer';
// import {List, ListItem} from 'react-toolbox/lib/list';
// import {Button, IconButton} from 'react-toolbox/lib/button';
//
// export default class NavBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       active: false,
//     };
//   }
//
//
//   handleToggle = () => {
//     this.setState({
//       active: !this.state.active,
//     });
//   };
//
//   redirect = (route) => {
//     browserHistory.push(route);
//     this.setState({
//       active: false,
//     });
//   }
//
//   render() {
//     if (this.props.user.authenticated) {
//       var topRightButton = (<Avatar
//                              image={ this.props.user.avatar }
//                              onClick={ this.handleToggle }
//                              theme={ theme } />);
//     } else {
//       var topRightButton = (
//         <Button
//          icon="exit_to_app"
//          href="/accounts/discord/login/?process=login"
//          label="Login"
//          flat
//        />
//      );
// }
//     return (
//     <div>
//       <AppBar
//               leftIcon={ <Link to="/"><Logo /></Link> }
//               rightIcon={ topRightButton }
//               title="Reddit Alpha Clan Family"
//               fixed
//               flat
//               theme={ theme } />
//       <Drawer
//               theme={ theme }
//               active={ this.state.active }
//               type="right"
//               onOverlayClick={ this.handleToggle }>
//         <List
//               selectable
//               ripple>
//           <ListItem
//                     caption="HomeFUCK"
//                     leftIcon="home"
//                     onClick={ this.redirect.bind(this, '/') }
//                     theme={ theme } />
//           <ListItem
//                     caption="Dashboard"
//                     leftIcon="dashboard"
//                     onClick={ this.redirect.bind(this, '/dashboard') }
//                     theme={ theme } />
//           <ListItem
//                     caption="Deckbuilder"
//                     leftIcon="build"
//                     onClick={ this.redirect.bind(this, '/deckbuilder') }
//                     theme={ theme } />
//           <ListItem
//                     caption="Browse"
//                     leftIcon="pageview"
//                     onClick={ this.redirect.bind(this, '/decks') }
//                     theme={ theme } />
//           <ListItem
//                     caption="My Decks"
//                     leftIcon="view_list"
//                     onClick={ this.redirect.bind(this, '/decklist') }
//                     theme={ theme } />
//         </List>
//       </Drawer>
//     </div>
//     );
//   }
// }
