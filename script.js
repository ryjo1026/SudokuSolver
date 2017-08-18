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
  // Size is the number of "quadrants" within the main puzzle
  const size = puzzle.length / boxLength * (puzzle[0].length / boxLength);
  let subArrays = [];
  for (let i = 0; i < size; i++) {
        let sub = [];
        for (let j = 0; j < puzzle.length/boxLength; j++) {
          sub[j] = [];
        }
        let startx = (boxLength * (i / boxLength)) % puzzle.length;
        let starty = (boxLength * i) % puzzle[0].length;

        if (starty + boxLength > puzzle[0].length) {
            starty = 0;
        }

        for (let row = 0; row < boxLength; row++) {
            for (let col = 0; col < boxLength; col++) {
                console.log((startx + row) + ',' + (col + starty));
                sub[row][col] = puzzle[startx + row][col + starty];
            }
        }
        subArrays.push(sub);
  }
  return true;
}

console.log(validate(masterPuzzle));
