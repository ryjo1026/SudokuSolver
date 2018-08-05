import React from 'react';

import Subgrid from './Subgrid';

export default class Grid extends React.Component {
  render() {
    // Generate 2D Array of Subgrids
    const rows = [];
    for (let row = 0; row < 3; row += 1) {
      const cols = [];
      for (let col = 0; col < 3; col += 1) {
        const index = (3 * row) + col;
        cols.push(<Subgrid key={index} index={index} />);
      }
      rows.push(
        <div className="row" key={row} style={{ display: 'flex' }}>
          {cols}
        </div>
      );
    }

    return (
      <div className="Grid">
        {rows}
      </div>);
  }
}
