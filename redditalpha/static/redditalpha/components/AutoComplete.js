/**
 * Created by KG on 9/10/16.
 */
import React from "react";
import Autocomplete from 'react-toolbox/lib/autocomplete';
const countriesObject = {'ES-es': 'Spain', 'TH-th': 'Thailand', 'EN-gb': 'England', 'EN-en': 'USA'};

export default class AutocompleteTest extends React.Component {
  state = {
    multiple: ['']
  };

  handleMultipleChange = (value) => {
    this.setState({multiple: value});
  };

  render () {
    return (
      <div>
        <Autocomplete
          direction="down"
          onChange={this.handleMultipleChange}
          label="Choose countries"
          source={countriesObject}
          value={this.state.multiple}
        />
      </div>
    );
  }
}

