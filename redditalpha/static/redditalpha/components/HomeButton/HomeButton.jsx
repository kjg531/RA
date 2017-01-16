import React, {PropTypes} from 'react';
import {withRouter} from 'react-router';
import IconButton from 'material-ui/IconButton';
import theme from './HomeButton.scss';

const HomeButton = (props) =>  (
  <IconButton onTouchTap={() => {props.router.push('/')}}>
    <img src="/static/images/red_rocket.png" alt="red_rocket.png" width="25px"/>
  </IconButton>
);

// HomeButton.propTypes = {
//   // stuff
// };

export default withRouter(HomeButton);
