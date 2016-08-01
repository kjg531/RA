import React from "react"
import { render } from "react-dom"
import injectTapEventPlugin from 'react-tap-event-plugin';



import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ComponentOne from "./Component/ComponentOne"





class AppOne extends React.Component {
  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div>
                <ComponentOne />
            </div>
        </MuiThemeProvider>
    )
  }
}
injectTapEventPlugin();
render(<AppOne />, document.getElementById('appone'))
