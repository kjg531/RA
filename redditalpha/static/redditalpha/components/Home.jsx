import React from "react";

import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import {Link, IndexLink} from 'react-router';
import TwitterTimeline from './TwitterTimeline';

import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

class Home extends React.Component {
  style = {
  }

  render() {
    return (
      <div>
        <TwitterTimeline />



        <h1>Welcome to Reddit Alpha</h1>
        <h5>Links</h5>
        <List selectable ripple>
          <ListSubHeader caption='Explore characters' />
          <LinkContainer to="/decks"><ListItem legend='Decks' rightIcon='star'></ListItem></LinkContainer>
          <ListItem
            avatar='https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg'
            caption='Ozymandias'
            legend='Adrian Veidt'
            rightIcon='star'
          />
          <ListItem
            avatar='https://dl.dropboxusercontent.com/u/2247264/assets/r.jpg'
            caption='Rorschach'
            legend='Walter Joseph Kovacs'
            rightIcon='star'
          />
          <ListSubHeader caption='Configuration' />
          <ListDivider />
          <ListItem caption='Contact the publisher' leftIcon='send' />
          <ListItem caption='Remove this publication' leftIcon='delete' />
        </List>
      </div>
    )
  }
}

export default Home;
