'use strict';

const masterPuzzle = [
  [null, null, 3, 2],
  [null, 3, 4, null],
  [null, 4, 2, null],
  [3, 2, null, null],
];
// TODO: Check array for this automatically
const boxLength = 2;


// const masterPuzzle = [
//   [null, null, null, null, 9, null, 4, null, 3],
//   [null, null, 3, null, 1, null, null, 9, 6],
//   [2, null, null, 6, 4, null, null, null, 7],
//   [4, null, null, 5, null, null, null, 6, null],
//   [null, null, 1, null, null, null, 8, null, null],
//   [null, 6, null, null, null, 1, null, null, 2],
//   [1, null, null, null, 7, 4, null, null, 5],
//   [8, 2, null, null, 6, null, 7, null, null],
//   [7, null, 4, null, 5, null, null, null, null],
// ];
// const boxLength = 3;


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

/**
* @param {array} puzzle - TODO
* @return {array} - TODO
*/
function splitQuadrants(puzzle) {
  // startx = 0 2 0 2 | 0 3 6 0 3 6 0 3 6
  // starty =  0 0 2 2 | 0 0 0 3 3 3 6 6 6

  let subArrays = [];
  for (let starty = 0; starty < puzzle[0].length; starty += boxLength) {
    for (let startx = 0; startx < puzzle.length; startx += boxLength) {
      let subArray = [];
      for (let x = startx; x < startx+boxLength; x++) {
        for (let y = starty; y < starty+boxLength; y++) {
          subArray.push(puzzle[x][y]);
        }
      }
      subArrays.push(subArray);
    }
  }
  return subArrays;
}

/**
* @param {array} arr - TODO
* @return {boolean} - TODO
*/
function checkDuplicates(arr) {
  let valueArr = [];
  for (let i = 0; i<arr.length; i++) {
    if (arr[i] != null) {
      valueArr.push(arr[i]);
    }
  }
  return valueArr.length === new Set(valueArr).size;
}

/**
* @param {array} puzzle - TODO
* @return {boolean} - TODO
*/
function validate(puzzle) {
  // Ensure puzzle is square
  if (puzzle.length != puzzle[0].length) {
    return false;
  }
  // Iterate through the puzzle to check rows and columns
  for (let i = 0; i < puzzle.length; i++) {
    // Check each row for duplicates
    if (!checkDuplicates(puzzle[i])) {
      return false;
    }

    // Generate an array for the column
    let column = [];
    for (let j = 0; j < puzzle[i].length; j++) {
      column.push(puzzle[j][i]);
    }
    // Check each column for duplicates
    if (!checkDuplicates(column)) {
      return false;
    }
  }

  // Create a 2D Array containing elements from each 'quadrant'
  let quadrants = splitQuadrants(puzzle);
  // Validate each 'quadrant'
  for (let i = 0; i < quadrants.length; i++) {
    if (!checkDuplicates(quadrants[i])) {
      return false;
    }
  }
  return true;
}

/**
* @param {array} puzzle - TODO
* @return {boolean} - TODO
*/
function checkContainsNull(puzzle) {
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === null) {
        return true;
      }
    }
  }
  return false;
}

/**
* @param {array} puzzle - TODO
* @return {boolean} - TODO
*/
function solvePuzzle(puzzle) {
  // Keep running algorithm until no empties
  while (checkContainsNull(puzzle) === true) {
    for (let row = 0; row < puzzle.length; row++) {
      for (let column = 0; column < puzzle[row].length; column++) {
        if (puzzle[row][column] == null) {
          // Try to solve the individual box
          for (let i = 1; i <= puzzle.length; i++) {
            let testPuzzle = puzzle.slice();
            testPuzzle[row][column] = i;
            if (validate(testPuzzle) == true) {
              puzzle = testPuzzle;
              break;
            }
            // TODO clean up hack; should be something with memory references
            if (i == puzzle.length) {
              puzzle[row][column] = null;
            }
          }
        }
      }
    }
    console.log(puzzle);
  }
  return puzzle;
}

console.log(solvePuzzle(masterPuzzle));
console.log(validate(masterPuzzle));
