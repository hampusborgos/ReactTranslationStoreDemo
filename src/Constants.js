import keyMirror from 'keyMirror';

export default {
  DEFAULT_LANGUAGE: 'en',

  LANGUAGE_API_PATH: 'mock_api/',

  // Each time you add an action, add it here... They should be past-tense
  ActionTypes: keyMirror({
    LANGUAGE_CHANGED: null,
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null,
  }),
};
