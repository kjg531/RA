// import React from 'react';
// import AppBar from 'material-ui/AppBar';
// import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
// import Logo from './Logo'
// import FlatButton from 'material-ui/FlatButton'
//
// const style = {
//     Logo: {
//         height: 65,
//         position: 'absolute',
//         left: 0,
//         top: 0,
//         backgroundColor: 'transparent',
//     },
//     Title: {
//         position: 'absolute',
//         left: 90,
//         color: 'white',
//         fontWeight: 100,
//         marginTop: 3
//     },
//     AppBar: {
//        margin: 0,
//        position: 'fixed',
//        top: 0,
//        height: 65,
//     },
// }
//
// const NavBar = () => (
//   <AppBar
//     title="Reddit Alpha Clan System"
//     titleStyle={style.Title}
//     style={style.AppBar}
//     iconElementLeft={<FlatButton
//                             icon={<Logo />}
//                             style={style.Logo}
//                         />}
//     iconElementRight={
//       <IconMenu
//         iconButtonElement={
//           <IconButton
//             iconStyle={{color:'white'}}
//             iconClassName="material-icons"
//           >
//               menu
//           </IconButton>
//         }
//         targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
//         anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
//       >
//         <MenuItem primaryText="Refresh" />
//         <MenuItem primaryText="Help" />
//         <MenuItem primaryText="Sign out" />
//       </IconMenu>
//     }
//   />
// );
//
// export default NavBar;


import React from "react";

import SwipeableViews from 'react-swipeable-views';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';

import Logo from './Logo'
import {
    Tabs,
    Tab
} from 'material-ui/Tabs';

import {
    List,
    ListItem
} from 'material-ui/List';


var ehiColors = require('../eHIcolors');



import {Link, IndexLink} from 'react-router';



// From https://github.com/oliviertassinari/react-swipeable-views



// Things manipulated in material-ui files. If possible, find way to make changes in your own files

// AppBar.js:66 from: backgroundColor: appBar.color to: backgroundColor: 'black'
// Drawer.js:227 from: top: 0 to: top:64
// Drawer.js:230 from: backgroundColor: theme.color to: backgroundColor: 'black'


export default class NavBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated: (AUTH.user === null ? false:true),
        open: false,
        slideIndex: 0,
      };
    }

    componentWillMount
    
    style = {
        Logo: {
        height: 65,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'transparent',
    },
    Title: {
        position: 'absolute',
        left: 90,
        color: 'white',
        fontWeight: 100,
        marginTop: 3
    },
    AppBar: {
       margin: 0,
       position: 'fixed',
       top: 0,
       height: 65,
    },
        IconButton: {
            padding: 0,
            color: ehiColors.white,
            height: 65,
            width: 65,

        },
        IconMenu: {
            position: 'absolute',
            top: 0,
            right: 0,
        },
        AvatarButton: {
            height: 65,
            position: 'absolute',
            right: 0,
            top: 0,
            backgroundColor: 'transparent',
        },
        Drawer: {
            backgroundColor: ehiColors.black,
            color: ehiColors.white,
            top: 64,
        },
        DrawerOverlay: {
            top: 64,
        },

        headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
        },
        slide: {
            padding: 10,
        },
        Subheader: {
            fontWeight: 400,
            color: ehiColors.white,
            fontSize: 17,
        },
        ListItem: {
            color: ehiColors.white,
            fontWeight: 100,
        },
        MenuItemLink: {
            textDecoration: 'none !important',
        },
        MenuItem: {
            color: ehiColors.white,
            cursor: 'pointer',
        },
        MenuItemLinkActive: {
            borderLeft: '2px solid',
            borderColor: ehiColors.pink,
        },
    }

    handleToggle = () => this.setState({
        open: !this.state.open
    });

    handleClose = () => this.setState({
        open: false
    });

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    render() {
        if (this.state.authenticated){
          var topLeftButton = <FlatButton style={this.style.AvatarButton} icon={<Avatar src={AVATAR_URL} />} onTouchTap={this.handleToggle}/>
        }else{
          var topLeftButton = <FlatButton style={this.style.AvatarButton} href="/accounts/discord/login/?process=login" label="Log in with discord"/>
        }

        return ( <AppBar
                title="Reddit Alpha Clan System"
                titleStyle={this.style.Title}
                style={this.style.AppBar}
                iconElementLeft = {
                    <FlatButton
                        icon={<Logo />}
                        style={this.style.Logo} />
                }
                iconElementRight = {
                <div>
        
        {topLeftButton}

        <Drawer
          docked={false}
          width={250}
          overlayStyle={this.style.DrawerOverlay}
          containerStyle={this.style.Drawer}
          style={this.style.Drawer}
          openSecondary={true}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
            <Tab
              icon={<i className="material-icons">menu</i>}
              value={0}
            />
            <Tab
              icon={<i className="material-icons">equalizer</i>}
              value={1}
            />

            <Tab
              icon={<i className="material-icons">settings</i>}
              value={2}
            />
            </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >

          <div>
                  <List style={{paddingTop: 0, paddingBottom: 0}}>
                      <MenuItem
                          linkButton
                          containerElement={<IndexLink to="/" style={this.style.MenuItemLink} activeStyle={this.style.MenuItemLinkActive} />}
                          style={this.style.MenuItem}
                          primaryText="Home"
                          leftIcon={<i className="material-icons">web</i>}
                        />
                      <MenuItem
                          linkButton
                          containerElement={<Link to="/create" style={this.style.MenuItemLink} activeStyle={this.style.MenuItemLinkActive} />}
                          style={this.style.MenuItem}
                          primaryText="About Us"
                          leftIcon={<i className="material-icons">info</i>}
                        />
                      <MenuItem
                          linkButton
                          containerElement={<Link to="/browse" style={this.style.MenuItemLink} activeStyle={this.style.MenuItemLinkActive} />}
                          style={this.style.MenuItem}
                          primaryText="Deck Builder"
                          leftIcon={<i className="material-icons">build</i>}
                        />
                      <MenuItem
                          linkButton
                          containerElement={<Link to="/dashboard" style={this.style.MenuItemLink} activeStyle={this.style.MenuItemLinkActive} />}
                          style={this.style.MenuItem}
                          primaryText="Tournaments"
                          leftIcon={<i className="material-icons">schedule</i>}
                        />
                      <MenuItem
                          linkButton
                          containerElement={<Link to="/account" style={this.style.MenuItemLink} activeStyle={this.style.MenuItemLinkActive} />}
                          style={this.style.MenuItem}
                          primaryText="Rankings"
                          leftIcon={<i className="material-icons">equalizer</i>}
                        />

                      <MenuItem
                          linkButton
                          containerElement={<Link to="/account" style={this.style.MenuItemLink} activeStyle={this.style.MenuItemLinkActive} />}
                          style={this.style.MenuItem}
                          primaryText="Live Feed"
                          leftIcon={<i className="material-icons">rss_feed</i>}
                        />
                      <MenuItem
                          linkButton
                          containerElement={<Link to="/account" style={this.style.MenuItemLink} activeStyle={this.style.MenuItemLinkActive} />}
                          style={this.style.MenuItem}
                          primaryText="Video Library"
                          leftIcon={<i className="material-icons">live_tv</i>}
                        />
                </List>
                <Divider />
                <List>
                  <ListItem primaryText="Account"
                    style={{color: 'white'}}
                    leftIcon={<i className="material-icons test">account_box</i>}/>
                  <ListItem primaryText="Logout"
                    style={{color: 'white'}}
                    leftIcon={<i style={{transform: 'rotate(180deg)'}} className="material-icons test">exit_to_app</i>}
                    href="/accounts/logout/"
                    />
                </List>
          </div>
          <div style={this.style.slide}>
            slide n°2
          </div>
          <div style={this.style.slide}>
      <List>
        <Subheader style={this.style.Subheader}>Priority Interruptions</Subheader>
        <ListItem style={this.style.ListItem} primaryText="Events and reminders" rightToggle={<Toggle />} />
        <ListItem style={this.style.ListItem} primaryText="Calls" rightToggle={<Toggle />} />
        <ListItem style={this.style.ListItem} primaryText="Messages" rightToggle={<Toggle />} />
      </List>
      <Divider />
      <List>
        <Subheader style={this.style.Subheader}>Hangout Notifications</Subheader>
        <ListItem style={this.style.ListItem} primaryText="Notifications" leftCheckbox={<Checkbox />} />
        <ListItem style={this.style.ListItem} primaryText="Sounds" leftCheckbox={<Checkbox />} />
        <ListItem style={this.style.ListItem} primaryText="Video sounds" leftCheckbox={<Checkbox />} />
      </List>
          </div>
        </SwipeableViews>
        </Drawer>
      </div>
            }
            />
        );
    }
}
