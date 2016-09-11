import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from './App';
import About from './components/About';
import Dashboard from './components/Dashboard';
import DeckBuilder from './components/DeckBuilder';
import DeckIndex from './components/DeckIndex';
import Home from './components/Home';
import MyDecks from './components/MyDecks';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="decks" component={DeckIndex} />
        <Route path="decklist" component={MyDecks} />
        <Route path="deckbuilder" component={DeckBuilder} />
        <Route path="tournaments" component={About} />
    </Route>
);
