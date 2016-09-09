import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from './App';
import Home from './components/Home';
import DeckBuilder from './components/DeckBuilder';
import DeckIndex from './components/DeckIndex';
import Decks from './components/Decks';
import About from './components/About';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="deckbuilder/(:id)" component={DeckBuilder} />
        <Route path="deckindex" component={DeckIndex} />
        <Route path="decks" component={Decks} />
        <Route path="tournaments" component={About} />
        <Route path="rankings" component={About} />
        <Route path="feed" component={About} />
        <Route path="library" component={About} />
    </Route>
);

