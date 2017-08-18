'use strict';

const masterPuzzle = [
  [null, null, 3, 2],
  [null, 3, 4, null],
  [null, 4, 2, null],
  [3, 2, null, null],
];

// TODO: Check array for this automatically
const boxLength = 2;

/**
Algorithm:
  -Search through squares left->right and up->down
  -Begin to loop through all possible square values
  -Cross-reference square values with possibilities, first check within quad
    then row then column
  -If no match continue to next

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

console.log(validate(masterPuzzle));
