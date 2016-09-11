import React, {PropTypes, Component} from 'react';
import NavBar from './components/NavBar'

export default class App extends Component {

  render() {

    return (

      <main>
        <NavBar/>
        {this.props.children}
      </main>
    );
  }
}
