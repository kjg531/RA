import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './theme';
import routes from './routes';
import configureStore from './store/configureStore';


const STORE = configureStore();
const ROOT_ELEMENT = 'main';



ReactDOM.render(
  <Provider store={STORE}>
    <MuiThemeProvider muiTheme={theme}>
      <div>
        <Router history={browserHistory} routes={routes} />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById(ROOT_ELEMENT)
);
