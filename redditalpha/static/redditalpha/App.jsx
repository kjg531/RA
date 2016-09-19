import React, {PropTypes, Component} from 'react';
import NavBar from './components/NavBar'
import auth from './auth';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        authenticated: false
      }
    };
  }

  componentWillMount() {
    auth.update(() => {
      this.setState({user: auth.user()})
    });
  }

  render() {
    return (
      <main>
        <NavBar user={this.state.user}/>
        {this.props.children}
      </main>
    );
  }
}
