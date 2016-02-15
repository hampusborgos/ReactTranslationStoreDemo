require('styles/App.scss');

import React from 'react';

class FancyInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
      return nextProps.value !== this.props.value ||
             nextProps.label !== this.props.label ||
             nextState.focused !== this.state.focused;
  }

  handleFocus(e) {
    this.setState({
      focused: true,
    });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  handleBlur(e) {
    this.setState({
      focused: false
    });

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  render() {
    let {focused} = this.state;
    let {label, className, value, ...otherProps} = this.props;

    // Ought to use the classNames package, but no need in this simple a demo
    let classNames = className || '';
    classNames += ' input-group';
    if (value != '') {
      classNames += ' filled';
    }
    if (focused) {
      classNames += ' focused';
    }

    return (
      <div className={classNames}>
        <label>
          <span>{this.props.label}</span>
          <input type="text"
                 value={value}
                 onFocus={this.handleFocus.bind(this)}
                 onBlur={this.handleBlur.bind(this)}
                 {...otherProps} />
        </label>
      </div>
    );
  }
}

FancyInput.propTypes = {
  label: React.PropTypes.string,

  className: React.PropTypes.string,
  value: React.PropTypes.string,
};

export default FancyInput;
