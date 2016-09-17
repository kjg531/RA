import React, {PropTypes, Component} from 'react';
import NavBar from './components/NavBar'
import Card from 'react-toolbox/lib/card'
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
