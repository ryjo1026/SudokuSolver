import React from 'react';

import Grid from './Grid';
import Controls from './Controls';

import './main.css';

/**
Algorithm:
  -Search through squares left->right and up->down
  -Begin to loop through all possible square values
  -Cross-reference square values with possibilities, first check within quad
    then row then column
  -If no match continue to next
  -Revisit squares if stuck (not always first number possibility)

  What about squares that depend on each other?
  -Will need to begin to fill in a possibility for a square and then check
*/

function valueIsInRow(puzzle, row, val) {
  if (puzzle[row].indexOf(val) > -1) {
    return true;
  }
  return false;
}

function valueIsInCol(puzzle, col, val) {
  for (let i = 0; i < puzzle.length; i += 1) {
    if (puzzle[i][col] === val) {
      return true;
    }
  }
  return false;
}

function valueIsInBox(puzzle, row, col, val) {
  // Get top coordinates for top left corner of the box
  const boxCol = Math.floor(col / 3) * 3;
  const boxRow = Math.floor(row / 3) * 3;

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (puzzle[boxRow + i][boxCol + j] === val) {
        return true;
      }
    }
  }

  return false;
}

function solveNextSquare(puzzle) {
  const newPuzzle = puzzle;
  let row = 0; let col = 0;
  for (let i = 0; i < puzzle.length; i += 1) {
    for (let j = 0; j < puzzle[i].length; j += 1) {
      if (puzzle[i][j] === '') {
        row = i; col = j;
      }
    }
  }

  // Iterate possible values
  for (let i = 1; i <= 9; i += 1) {
    // Check for no same value in row
    if (!valueIsInRow(puzzle, row, i)
      && !valueIsInCol(puzzle, col, i)
      && !valueIsInBox(puzzle, row, col, i)) {
      // Assign and solve the rest of the puzzle
      newPuzzle[row][col] = i;
      if (solve(newPuzzle)) {
        return true;
      }
      // Backtrack if a mistake was made
      newPuzzle[row][col] = '';
    }
  }
  return false;
}

function puzzleIsFull(puzzle) {
  for (let i = 0; i < puzzle.length; i += 1) {
    for (let j = 0; j < puzzle[i].length; j += 1) {
      if (puzzle[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

function solve(puzzle) {
  if (puzzleIsFull(puzzle)) {
    return puzzle;
  }

  if (solveNextSquare(puzzle)) {
    return puzzle;
  }

  // Trigger backtrack
  return false;
}


export default class App extends React.Component {
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
      animate: false,
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

  handleAnimateChange= () => {
    const { animate } = this.state;
    this.setState({ animate: !animate });
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
    const { animate, values } = this.state;

    return (
      <div className="App">
        <Grid handleEnter={this.handleEnter} squareRefs={this.squareRefs} values={values} />
        <Controls
          animate={animate}
          handleSubmit={this.handleSubmit}
          handleAnimateChange={this.handleAnimateChange}
        />
      </div>
    );
  }
}
