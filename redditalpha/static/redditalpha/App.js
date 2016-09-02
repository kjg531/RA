// import React from "react"
// import { render } from "react-dom"
// import injectTapEventPlugin from 'react-tap-event-plugin';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import NavBar from "./components/NavBar"
// import DeckBuilder from './components/DeckBuilder';
// import theme from "./theme"
// import Card from './components/Card'

// export default class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <NavBar />
//         <DeckBuilder cards={BACKEND_CARDS} />
//       </div>
//     )
//   }
// }

// injectTapEventPlugin();

import React, {PropTypes, Component} from 'react';


export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {

    return (
      <main>
        {this.props.children}
      </main>
    );
  }
}
