import React from "react"
import { render } from "react-dom"
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from "../Components/NavBar"
import theme from "../theme"


class NavBarEntryPoint extends React.Component {
    render() {
    return (
        <MuiThemeProvider muiTheme={theme.theme}>
            <NavBar />
        </MuiThemeProvider>
    )
  }
}

injectTapEventPlugin();
render(<NavBarEntryPoint />, document.getElementById('navbar'))
