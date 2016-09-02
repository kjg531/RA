import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import App from './App';
import DeckBuilder from './components/DeckBuilder';
import About from './components/About';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={DeckBuilder} />
        <Route path="about" component={About} />
        <Route path="about" componente={About} />
        <Route path="deckbuilder" componente={DeckBuilder} />
        <Route path="tournaments" componente={About} />
        <Route path="rankings" componente={About} />
        <Route path="feed" componente={About} />
        <Route path="library" componente={About} />
    </Route>
);

