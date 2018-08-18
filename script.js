// const masterPuzzle = [
//   [null, null, 3, 2],
//   [null, 3, 4, null],
//   [null, 4, 2, null],
//   [3, 2, null, null],
// ];
// // TODO: Check array for this automatically
// const boxLength = 2;


const masterPuzzle = [
  [null, null, null, null, 9, null, 4, null, 3],
  [null, null, 3, null, 1, null, null, 9, 6],
  [2, null, null, 6, 4, null, null, null, 7],
  [4, null, null, 5, null, null, null, 6, null],
  [null, null, 1, null, null, null, 8, null, null],
  [null, 6, null, null, null, 1, null, null, 2],
  [1, null, null, null, 7, 4, null, null, 5],
  [8, 2, null, null, 6, null, 7, null, null],
  [7, null, 4, null, 5, null, null, null, null],
];

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
      if (puzzle[i][j] === null) {
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
      newPuzzle[row][col] = null;
    }
  }
}

function puzzleIsFull(puzzle) {
  for (let i = 0; i < puzzle.length; i += 1) {
    for (let j = 0; j < puzzle[i].length; j += 1) {
      if (puzzle[i][j] === null) {
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
    return true;
  }

  // Trigger backtrack
  return false;
}

console.log(solve(masterPuzzle), masterPuzzle);
