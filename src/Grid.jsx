import React from 'react';
import PropTypes from 'prop-types';

export default function Grid({ values, handleEnter, squareRefs }) {
  // Generate 2D Array of Subgrids
  const rows = [];
  for (let row = 0; row < 9; row += 1) {
    const cols = [];
    for (let col = 0; col < 9; col += 1) {
      const index = (9 * row) + col;
      const style = {
        width: '50px',
        height: '50px',
        textAlign: 'center',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        borderLeft: '1px solid black',
        borderRight: '1px solid black',
      };
      if (col === 2 || col === 5) {
        style.borderRight = '3px solid black';
      }
      if (row === 2 || row === 5) {
        style.borderBottom = '3px solid black';
      }
      const square = (
        <input
          key={index}
          index={index}
          type="text"
          defaultValue={values[row][col]}
          style={style}
          onKeyDown={(event) => { handleEnter(event, index); }}
          ref={squareRefs[row][col]}
        />);
      cols.push(square);
    }
    rows.push(
      <div className="row" key={row}>
        {cols}
      </div>
    );
  }

  return (
    <div className="Grid">
      {rows}
    </div>
  );
}
Grid.propTypes = {
  values: PropTypes.arrayOf(PropTypes.array).isRequired,
  handleEnter: PropTypes.func.isRequired,
  squareRefs: PropTypes.arrayOf(PropTypes.array).isRequired,
};
