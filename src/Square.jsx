import React from 'react';
import PropTypes from 'prop-types';

export default class Square extends React.Component {
  // TODO dynamically border squares based on index
  // https://stackoverflow.com/questions/38577224/focus-on-next-field-when-pressing-enter-react-js
  render() {
    const { index, handleEnter } = this.props;

    return (
      <input
        type="number"
        value={index}
        style={{ width: '50px', height: '50px', border: '1px solid black' }}
        onKeyDown={(event) => handleEnter(event, index)}
        ref={this.last}
      />
    );
  }
}
Square.propTypes = {
  handleEnter: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
