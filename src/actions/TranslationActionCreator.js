import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

import TranslationStore from '../stores/TranslationStore';

var TranslationActionCreator = {
  changeLanguage(newLanguageCode, callback) {
    if (!TranslationStore.getLanguage(newLanguageCode)) {
      throw 'Invalid language "' + newLanguageCode + '"';
    }

    // Where do we fetch from
    var url = Constants.LANGUAGE_API_PATH + newLanguageCode + '.json';

    // Might be outsourced to a library if you got one
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          // Send the received data to the store
          var languageData = JSON.parse(xmlhttp.responseText);
          Dispatcher.handleServerAction({
            type: Constants.ActionTypes.LANGUAGE_CHANGED,
            language: newLanguageCode,
            data: languageData,
          });

          // Might be prettier to return a promise
          callback(true);
        }
        else {
          // Failure, you might want to put your app in a global failure state here
          callback(false);
        }
      }
    };

    // Do the request
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  },
};

export default TranslationActionCreator;
