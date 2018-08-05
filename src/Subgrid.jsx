import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';

export default function Subgrid({ index }) {
  // Generate 2D Array of Squares
  const rows = [];
  for (let row = 0; row < 3; row += 1) {
    const cols = [];
    for (let col = 0; col < 3; col += 1) {
      const squareIndex = (3 * row) + col;
      cols.push(<Square key={squareIndex} index={squareIndex} subgrid={index} />);
    }
    rows.push(
      <div className="row" key={row} style={{ display: 'flex' }}>
        {cols}
      </div>
    );
  }

  return (
    <div className="Subgrid" style={{ border: '1px solid black' }}>
      {rows}
    </div>);
}
Subgrid.propTypes = {
  index: PropTypes.number.isRequired,
};
