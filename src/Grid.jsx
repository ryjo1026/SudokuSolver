import React from 'react';

import solve from './solver';


export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    // Create one array for refs and one for values
    this.squareRefs = [];
    let squareValues = [];
    for (let row = 0; row < 9; row += 1) {
      const refCols = [];
      const valCols = [];
      for (let col = 0; col < 9; col += 1) {
        refCols.push(React.createRef());
        valCols.push('');
      }
      this.squareRefs.push(refCols);
      squareValues.push(valCols);
    }

    // Load in sample puzzle
    squareValues = [
      ['', '', '', '', 9, '', 4, '', 3],
      ['', '', 3, '', 1, '', '', 9, 6],
      [2, '', '', 6, 4, '', '', '', 7],
      [4, '', '', 5, '', '', '', 6, ''],
      ['', '', 1, '', '', '', 8, '', ''],
      ['', 6, '', '', '', 1, '', '', 2],
      [1, '', '', '', 7, 4, '', '', 5],
      [8, 2, '', '', 6, '', 7, '', ''],
      [7, '', 4, '', 5, '', '', '', ''],
    ];

    this.state = {
      values: squareValues,
    };
  }

  getRowColFromIndex(index) {
    // Determine row and col from the index by reversing operations
    const row = (index - (index % 9)) / 9;
    const col = index % 9;
    return { row, col };
  }

  handleEnter = (event, index) => {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      const val = String.fromCharCode(event.keyCode);

      const { row, col } = this.getRowColFromIndex(index);

      const { values } = this.state;
      values[row][col] = val;
      this.setState({ values });
      this.focusNextSquare(index);
    }

    if (event.keyCode === 8 || event.keyCode === 46) {
      const { row, col } = this.getRowColFromIndex(index);

      const { values } = this.state;
      values[row][col] = '';
      this.setState({ values });
    }

    if (event.keyCode === 13 || event.keyCode === 32) {
      this.focusNextSquare(index);
    }
    // TODO Add arrow key handling
  }

  handleSubmit = () => {
    const { values } = this.state;

    const solution = solve(values);
    if (solution) {
      this.setState({ values: solution });
    }
  }

  focusNextSquare(index) {
    const nextSquareIndex = index + 1;

    // Determine row and col from the index by reversing operations
    let nextRow = (nextSquareIndex - (nextSquareIndex % 9)) / 9;
    let nextCol = nextSquareIndex % 9;

    // If the square is the last one, loop around to the beginning
    if (index === 80) {
      nextRow = 0; nextCol = 0;
    }
    this.squareRefs[nextRow][nextCol].current.focus();
  }

  render() {
    const { values } = this.state;

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
            value={values[row][col]}
            style={style}
            onKeyDown={(event) => { this.handleEnter(event, index); }}
            ref={this.squareRefs[row][col]}
          />);
        cols.push(square);
      }
      rows.push(
        <div className="row" key={row} >
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
}
