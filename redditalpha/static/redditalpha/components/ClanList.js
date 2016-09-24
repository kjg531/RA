import React from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';
import theme from './ClanList.scss'


export default class ClanList extends React.Component {
  render () {
    return (
      <List selectable ripple>
        <ListItem
          avatar='http://ra.aaj.webfactional.com/static/images/icon.png'
          caption='Reddit Alpha'
          legend="Leader: Woody"
          rightIcon='looks_one'
        />
        <ListItem
          avatar='http://ra.aaj.webfactional.com/static/images/icon.png'
          caption='Reddit Bravo'
          legend='Leader: boredbanker'
          rightIcon='looks_two'
        />
        <ListItem
          avatar='http://ra.aaj.webfactional.com/static/images/icon.png'
          caption='Reddit Charlie'
          legend='Leader: Fun'
          rightIcon='looks_3'
        />
         <ListItem
          avatar='http://ra.aaj.webfactional.com/static/images/icon.png'
          caption='Reddit Delta'
          legend='Leader: Harbringer'
          rightIcon='looks_4'
        />
        <ListItem
          avatar='http://ra.aaj.webfactional.com/static/images/icon.png'
          caption='Reddit Echo'
          legend='Leader: EvanYoutube'
          rightIcon='looks_5'
        />
        <ListItem
          avatar='http://ra.aaj.webfactional.com/static/images/icon.png'
          caption='Reddit Foxtrot'
          legend='Leader: John Cena'
          rightIcon='looks_6'
        />
      </List>
    );
  }
}
