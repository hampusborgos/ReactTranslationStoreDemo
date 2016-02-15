require('normalize.css');
require('styles/App.scss');

import React from 'react';
import FancyInput from './FancyInput.js';
import TranslatedComponent from '../utils/TranslatedComponent.js';
import WelcomeBanner from './WelcomeBanner.js';

class DemoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Guybrush Threepwood',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
      return nextState.name !== this.state.name;
  }

  render() {
    let {name} = this.state;

    return (
      <div className="demo">
        <WelcomeBanner who={name}/>
        <FancyInput type="text"
                    label={this.translate('nameinput.label')}
                    value={name}
                    onChange={e => this.setState({name: e.target.value})} />
      </div>
    );
  }
}

DemoApp.defaultProps = {
};

// Returns nothing because it mutates the class
TranslatedComponent(DemoApp);

export default DemoApp;
