import React from "react"
import { render } from "react-dom"
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from "./Components/NavBar"
import DeckBuilder from './Components/DeckBuilder';
import theme from "./theme"


class App extends React.Component {
  render() {
    return (
        <MuiThemeProvider muiTheme={theme}>
            <div>
                <NavBar />
                <DeckBuilder cards={BACKEND_CARDS}/>
            </div>
        </MuiThemeProvider>
    )
  }
}

injectTapEventPlugin();

render(<App />, document.getElementById('App'))