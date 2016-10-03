import React from 'react';
import {List, ListItem} from 'react-toolbox/lib/list';
import theme from './ClanList.scss';
import Logo from './Logo';

export default class ClanList extends React.Component {
  render() {
    let sevenIcon = (<svg style={{width:'2.3rem',height:'2.3rem'}} viewBox="0 0 24 24"><path fill="#e64e5f" d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M11,17L15,9V7H9V9H13L9,17H11Z" /></svg>);
    
    return (
      <List theme={theme} selectable ripple>
        <hr className={theme.divColor} />
        <ListItem
          avatar={<Logo className={theme.avatarFix}/>}
          caption="Reddit Alpha"
          legend="Leader: Woody"
          rightIcon="looks_one"
          theme={theme}
        />
        <hr className={theme.divColor} />
        <ListItem
          avatar={<Logo className={theme.avatarFix}/>}
          caption="Reddit Bravo"
          legend="Leader: boredbanker"
          rightIcon="looks_two"
          theme={theme}
        />
        <hr className={theme.divColor} />
        <ListItem
          avatar={<Logo className={theme.avatarFix}/>}
          caption="Reddit Charlie"
          legend="Leader: Fun6754"
          rightIcon="looks_3"
          theme={theme}
        />
        <hr className={theme.divColor} />
         <ListItem
          avatar={<Logo className={theme.avatarFix}/>}
          caption="Reddit Delta"
          legend="Leader: Harbinger"
          rightIcon="looks_4"
          theme={theme}
        />
        <hr className={theme.divColor} />
        <ListItem
          avatar={<Logo className={theme.avatarFix}/>}
          caption="Reddit Echo"
          legend="Leader: Evan_Youtube"
          rightIcon="looks_5"
          theme={theme}
        />
        <hr className={theme.divColor} />
        <ListItem
          avatar={<Logo className={theme.avatarFix}/>}
          caption="Reddit Foxtrot"
          legend="Leader: Pondexes"
          rightIcon="looks_6"
          theme={theme}
        />
        <hr className={theme.divColor} />
        <ListItem
          avatar={<Logo className={theme.avatarFix}/>}
          caption="Reddit Golf"
          legend="Leader: John Cena"
          rightIcon={sevenIcon}
          theme={theme}
        />
      </List>
    );
  }
}
