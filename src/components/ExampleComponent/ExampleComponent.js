import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExampleComponent extends Component {
  static propTypes = {
    /** A string prop */
    aBoolean: PropTypes.bool,
    /** A number prop */
    aFunction: PropTypes.func,
    /** A boolean prop */
    aNumber: PropTypes.number,
    /** An array prop */
    aString: PropTypes.string,
    /** An object prop */
    anArray: PropTypes.array,
    /** A function prop */
    anObject: PropTypes.object,
    /** This prop uses a Render Pattern, so requires a function as a child */
    children: PropTypes.func.isRequired,
  };

  static defaultProps = {
    aString: 'initial string value',
    aNumber: 0,
    aBoolean: false,
    anArray: [],
    anObject: {},
    aFunction: () => {},
  };

  state = {
    name: '',
  };

  handleInputUpdate = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    const {
      aString,
      aNumber,
      aBoolean,
      aFunction,
      anArray,
      anObject,
      children,
    } = this.props;

    const { name } = this.state;

    return (
      <div className="oui-example-component">
        { children({
          handleInputUpdate: this.handleInputUpdate.bind(this),
          aString: `${aString} (with updates)`,
          aNumber: aNumber + 1,
          aBoolean: !aBoolean,
          aFunction: () => {
            aFunction('updated');
          },
          anArray: anArray.concat([ 4, 5, 6 ]),
          anObject: Object.assign({}, anObject, { newKey: true }),
          name,
        }) }
      </div>
    );
  }
}

export default ExampleComponent;
