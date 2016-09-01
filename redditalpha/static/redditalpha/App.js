import React from "react"
import { render } from "react-dom"
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from "./components/NavBar"
import DeckBuilder from './components/DeckBuilder';
import theme from "./theme"
import Card2 from './components/Card2'
// <NavBar />
//                   <DeckBuilder cards={BACKEND_CARDS}/>

export default class App extends React.Component {
    render() {
      return (
          <MuiThemeProvider muiTheme={theme}>
              <div>
                <Card2 />
              </div>
          </MuiThemeProvider>
    )
  }
}
injectTapEventPlugin();

render(<App />, document.getElementById('app'))
