import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';
import moment from 'moment';

require('moment/locale/sv');
require('moment/locale/nb');
require('moment/locale/en-gb');

// data storage
let _languageCode = null;
let _translationData = {};

function _setDateConfig(locale) {
  moment.locale(locale);
}

const TranslationStore = assign({}, BaseStore, {
  getCurrentLanguage() {
    return TranslationStore.getLanguage(_languageCode);
  },

  getLanguage(langCode) {
    var langs = TranslationStore.getAvailableLanguages();
    for (var i = 0; i < langs.length; ++i) {
      if (langs[i]['code'] == langCode) {
        return langs[i];
      }
    }

    return null;
  },

  getAvailableLanguages() {
    return [
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'de',
        name: 'Deutsch',
      },
      {
        code: 'sv',
        name: 'Svenska',
      },
      {
        code: 'no',
        name: 'Norsk bokmål',
      },
    ];
  },

  // Handles fetch a string from the current language definition ('Hello {0}') and interpolating it ('Hello Guy')
  // First argument is the key to fetch, following arguments are interpolation strings, indexed from 0
  get(translationKey) {
    var translation = _translationData[translationKey] || ('#' + translationKey + '#');
    if (arguments.length > 1) {
      let positionalArguments = Array.prototype.splice.call(arguments, 1);

      // Replaces {0} with the 0th argument etc.
      return translation.replace(/{(\d+)}/g, function(match, number) {
        return typeof positionalArguments[number] != 'undefined'
          ? positionalArguments[number]
          : match
        ;
      });
    }

    return translation;
  },

  has(translationKey) {
    return !!(_translationData[translationKey]);
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.LANGUAGE_CHANGED:
        if (typeof(action.data) !== 'object') {
          throw 'Translations are not a JSON object!';
        }

        let lang = TranslationStore.getLanguage(action.language);

        _languageCode = action.language;
        _translationData = action.data;
        _setDateConfig(_languageCode);

        // Set the language on the html root element as well, so screen readers pick it up
        document.documentElement.lang = lang.code;

        TranslationStore.emitChange();
        break;

      // add more cases for other actionTypes...
    }
  }),
});

export default TranslationStore;
