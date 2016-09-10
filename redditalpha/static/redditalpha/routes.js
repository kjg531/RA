import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from './App';
import Home from './components/Home';
import DeckBuilder from './components/DeckBuilder';
import DeckIndex from './components/DeckIndex';
import MyDecks from './components/MyDecks';
import About from './components/About';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="deckbuilder" component={DeckBuilder} />
        <Route path="deckindex" component={DeckIndex} />
        <Route path="decks" component={MyDecks} />
        <Route path="tournaments" component={About} />
        <Route path="rankings" component={About} />
        <Route path="feed" component={About} />
        <Route path="library" component={About} />
    </Route>
);
