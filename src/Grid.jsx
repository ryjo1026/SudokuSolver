import React from 'react';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

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
    const nextSquareIndex = index + 1;

    // Determine row and col from the index by reversing iperations
    let nextRow = (nextSquareIndex - (nextSquareIndex % 9)) / 9;
    let nextCol = nextSquareIndex % 9;

    // If the square is the last one, loop around to the beginning
    if (index === 80) {
      nextRow = 0; nextCol = 0;
    }
    this.squareRefs[nextRow][nextCol].current.focus();
  }

  render() {
    // Generate 2D Array of Subgrids
    const rows = [];
    for (let row = 0; row < 9; row += 1) {
      const cols = [];
      for (let col = 0; col < 9; col += 1) {
        const index = (9 * row) + col;
        const square = (
          <input
            key={index}
            index={index}
            type="number"
            value={index}
            style={{ width: '50px', height: '50px', border: '1px solid black' }}
            onKeyDown={(event) => { this.handleEnter(event, index); }}
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
