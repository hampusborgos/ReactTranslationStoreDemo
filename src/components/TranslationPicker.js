require('styles/App.scss');

import React from 'react';
import TranslationActionCreator from '../actions/TranslationActionCreator.js';
import TranslationStore from '../stores/TranslationStore.js';

class TranslationPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.onLanguageChanged = this.handleLanguageChanged.bind(this);
  }

  componentDidMount() {
    TranslationStore.addChangeListener(this.onLanguageChanged);
  }

  componentWillUnmount() {
      TranslationStore.removeChangeListener(this.onLanguageChanged);
  }

  handleLanguageChanged() {
    this.setState({
      isLoading: false,
    });
  }

  handlePickLanguage(languageCode) {
    TranslationActionCreator.changeLanguage(languageCode);

    this.setState({
      isLoading: true,
    });
  }

  render() {
    let {isLoading} = this.state;
    let activeLanguage = TranslationStore.getCurrentLanguage().code;

    return (
      <div className="language-picker">
        {TranslationStore.getAvailableLanguages().map((language, index) =>
          <button key={index}
                  className={'btn' + (activeLanguage == language ? ' active' : '')}
                  disabled={isLoading}
                  onClick={this.handlePickLanguage.bind(this, language.code)}>
            {language.name}
          </button>
        )}
      </div>
    );
  }
}

TranslationPicker.propTypes = {
};

export default TranslationPicker;
