require('styles/App.scss');

import React from 'react';
import TranslatedComponent from '../utils/TranslatedComponent.js';

class TranslationPicker extends React.Component {

  componentDidMount() {
    // Will execute as normal
  }

  render() {
    return (
      <div className="banner">
        <h1>{this.translate('banner.header', this.props.who)}</h1>
        <p>{this.translate('banner.paragraph', this.props.who)}</p>
      </div>
    );
  }
}

TranslationPicker.defaultProps = {
  who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(TranslationPicker);
export default TranslationPicker;
