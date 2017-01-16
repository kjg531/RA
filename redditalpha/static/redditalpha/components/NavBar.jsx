import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import NavMenu from 'components/NavMenu';
import HomeButton from 'components/HomeButton';

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" href="/accounts/discord/login/?process=login" />
    );
  }
}

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
export default class NavBar extends Component {
  render() {
    return (
      <AppBar
        title="Title"
        iconElementLeft={<HomeButton />}
        iconElementRight={this.props.user.authenticated ? <NavMenu /> : <Login />}
      />
    );
  }
}






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
