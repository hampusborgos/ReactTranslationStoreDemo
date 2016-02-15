require('normalize.css');
require('styles/App.scss');

import React from 'react';
import Constants from '../Constants.js';
import TranslationPicker from './TranslationPicker.js';
import TranslationActionCreator from '../actions/TranslationActionCreator.js';
import TranslationStore from '../stores/TranslationStore.js';
import DemoApp from './DemoApp.js';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Trigger loading of the language file
    TranslationActionCreator.changeLanguage(Constants.DEFAULT_LANGUAGE, success => {
      if (success) {
        this.forceUpdate();
      }
      else {
        throw "No translation available!"
      }
    });
  }

  render() {
    if (TranslationStore.getCurrentLanguage() === null) {
      return (
        <div className="app-wrapper">
          Loading ...
        </div>
      );
    }

    return (
      <div className="app-wrapper">
        <TranslationPicker />
        {/* No connection to the translation picker */}
        <DemoApp />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
