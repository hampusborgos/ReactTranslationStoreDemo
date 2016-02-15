import TranslationStore from '../stores/TranslationStore.js';

// Simulates a mixin for ES6 classes
function TranslatedComponent(component) {

  let didMount = component.prototype.componentDidMount;
  let willUnmount = component.prototype.componentWillUnmount;

  function _translatedComponent_handleLanguageChanged() {
    // We bypass shouldComponentUpdate here
    // This is part of the reason we can't use composition
    this.forceUpdate();
  }

  component.prototype.componentDidMount = function() {
    // Store reference to the listener so we can unregister
    this._translatedComponent_onLanguageChanged = _translatedComponent_handleLanguageChanged.bind(this);

    // Listen to language changes
    TranslationStore.addChangeListener(this._translatedComponent_onLanguageChanged);

    // Forward event
    if (didMount) {
      didMount.apply(this);
    }
  }

  component.prototype.componentWillUnmount = function() {
    // Unsubscribe & clean up listener
    TranslationStore.removeChangeListener(this._translatedComponent_onLanguageChanged);
    this._translatedComponent_onLanguageChanged = null;

    // Forward event
    if (willUnmount) {
      willUnmount.apply(this);
    }
  }

  // Convenience function
  component.prototype.translate = function() {
    return TranslationStore.get.apply(TranslationStore, arguments);
  }
}

export default TranslatedComponent;

