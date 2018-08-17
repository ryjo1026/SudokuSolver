import React from 'react';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    // Create one array for refs and one for values
    this.squareRefs = [];
    const squareValues = [];
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

    this.state = {
      values: squareValues,
    };
  }

  handleEnter = (event, index) => {
    if (event.keyCode === 13) {
      this.focusNextSquare(index);
    }
  }

  handleChange = (event, index) => {
    console.log(event.target.value)
    if (!/^[0-9]?$/.test(event.target.value)) {
      return;
    }
    if (parseInt(event.target.value, 10) > 9 || parseInt(event.target.value, 10) < 1) {
      return;
    }

    // Determine row and col from the index by reversing operations
    const row = (index - (index % 9)) / 9;
    const col = index % 9;

    const { values } = this.state;
    values[row][col] = event.target.value;
    this.setState({ values });
    this.focusNextSquare(index);
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
        const square = (
          <input
            key={index}
            index={index}
            type="text"
            value={values[row][col]}
            style={{ width: '50px', height: '50px', border: '1px solid black' }}
            onChange={(event) => { this.handleChange(event, index); }}
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
