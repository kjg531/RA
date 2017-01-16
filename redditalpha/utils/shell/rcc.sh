#!/bin/bash

# TODO: rewrite to reflect new structure needed to use flowtype
echo -n "Enter a component name > "
read text

mkdir $text
cd $text

echo "import React, {PropTypes} from 'react';
import theme from './$text.scss';

class $text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //stuff
    };
  }

  render() {
    return (
      <div>$text</div>
    );
  }
}

$text.propTypes = {
  // stuff
};

export default $text;" > $text.jsx


# SCSS INDEX
echo "@import 'theWork';
" > $text.scss
# SCSS

# index file
echo "export $text from './$text';  // eslint-disable-line  object-curly-spacing
" > index.jsx


# theWORK
echo "" > _theWork.scss
echo "$text Component Created"

cd ..
