import React from 'react';
import PropTypes from 'prop-types';

export default function Square({ index, subgrid }) {
  return (
    <input
      type="number"
      value={index + (9 * subgrid)}
      style={{ width: '50px', height: '50px', border: '1px solid black' }}
    />
  );
}
Square.propTypes = {
  subgrid: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
