import React from 'react';

import Square from './Square';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.last = React.createRef();

    this.squareRefs = [];
    for (let row = 0; row < 9; row += 1) {
      const cols = [];
      for (let col = 0; col < 9; col += 1) {
        cols.push(React.createRef());
      }
      this.squareRefs.push(cols);
    }
  }

  handleEnter = (event, index) => {
    // console.log(event.target, index);
    // if (event.keyCode === 13) {
    //   event.target.ref.focus();
    // }
    this.squareRefs[0][0].current.focus();
  }

  render() {
    // You can now get a ref directly to the DOM button:

    // Generate 2D Array of Subgrids
    const rows = [];
    for (let row = 0; row < 9; row += 1) {
      const cols = [];
      for (let col = 0; col < 9; col += 1) {
        const index = (3 * row) + col;
        const square = (
          <input
            key={index}
            type="number"
            value={index}
            style={{ width: '50px', height: '50px', border: '1px solid black' }}
            onKeyDown={(event) => this.handleEnter(event, index)}
            ref={this.squareRefs[row][col]}
          />);
        cols.push(square);
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
