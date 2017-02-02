import React from 'react';
import {List, ListItem} from 'react-toolbox/lib/list';
import theme from './ClanList.scss';
import Logo from './Logo';

export default class ClanList extends React.Component {
  render() {
    let sevenIcon = (<svg style={{width:'2.3rem',height:'2.3rem'}} viewBox="0 0 24 24"><path fill="#e64e5f" d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M11,17L15,9V7H9V9H13L9,17H11Z" /></svg>);
    let eightIcon = (<svg style={{width:'2.3rem',height:'2.3rem'}} viewBox="0 0 24 24"><path fill="#e64e5f" d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M11,17H13A2,2 0 0,0 15,15V13.5A1.5,1.5 0 0,0 13.5,12A1.5,1.5 0 0,0 15,10.5V9C15,7.89 14.1,7 13,7H11A2,2 0 0,0 9,9V10.5A1.5,1.5 0 0,0 10.5,12A1.5,1.5 0 0,0 9,13.5V15C9,16.11 9.9,17 11,17M11,13H13V15H11V13M11,9H13V11H11V9Z" /></svg>);

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
          legend="Leader: 6John"
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
          legend="Leader: SML"
          rightIcon="looks_4"
          theme={theme}
        />
        <hr className={theme.divColor} />
        <ListItem
          avatar={<Logo className={theme.avatarFix}/>}
          caption="Reddit Echo"
          legend="Leader: BrianWasTaken"
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
          legend="Leader: FUBARded"
          rightIcon={sevenIcon}
          theme={theme}
        />
        <hr className={theme.divColor} />
        <ListItem
          avatar={<Logo className={theme.avatarFix}/>}
          caption="Reddit Hotel"
          legend="Leader: Dr Willow"
          rightIcon={eightIcon}
          theme={theme}
        />
      </List>
    );
  }
}
