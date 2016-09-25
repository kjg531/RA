import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from './App';
import About from './components/About';
import Dashboard from './components/Dashboard';
import DeckBuilder from './components/DeckBuilder';
import DeckIndex from './components/DeckIndex';
import Home from './components/Home';
import MyDecks from './components/MyDecks';
import DeckNotes from './components/DeckNotes';

import auth from './auth';

function requireAuth(nextState, replace) {
  if (!auth.user().authenticated) {
    replace({
      pathname: '/accounts/discord/login/?process=login',
      state: { nextPathname: nextState.location.pathname }
    })
    window.location = '/accounts/discord/login/?process=login'; 
  }
}

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
        <Route path="decks" component={DeckIndex} onEnter={requireAuth}/>
        <Route path="decklist" component={MyDecks} onEnter={requireAuth}/>
        <Route path="decklist/:deckId" component={DeckNotes} onEnter={requireAuth}/>
        <Route path="deckbuilder" component={DeckBuilder} onEnter={requireAuth}/>
        <Route path="tournaments" component={About} onEnter={requireAuth}/>
    </Route>
);
