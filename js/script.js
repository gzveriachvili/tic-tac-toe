// Does your program have an interface? What will it look like?
// The program will have a user interface. The grid-like look will be achieved by using borders on divs.

// What inputs will your program have? Will the user enter data or will you get input from somewhere else?
// First, the user will be able to select whether they want to play against another player (locally) or against a computer.
// This interaction will be achieved via buttons. Then the user or users will be able to click on individual grid cells
// in order to play the game.

// What’s the desired output?
// There will be three different possible outcomes. The user can either window, lose, or draw. The user can
// win by placing 3 X markers either horizontally, vertically, or diagonally. Once one of these occur, the
// result should be displayed, and a button should appear in order to restart the game.

// Given your inputs, what are the steps necessary to return the desired output? The algorithm in pseudo code for this problem:
// When the user clicks on one of the 9 possible cells
// Check whether or not that cell is empty. Cells are items in an array, by default they are undefined.
// If the cell is empty, update the value of the cell in the array, and change the content of the cell to the user marker.
// User2 or computer's turn: same process.
// How to check if the markers connect vertically, horizontally or diagonally?
// gameBoard = [0, 1, 2,
//             3, 4, 5,
//             6, 7, 8]
// HORIZONTALLY:
// If the first 3 items in the array are the same, game over.
// If the 4th, 5th, and 6th items are the same, game over.
// If the 7th 8th and 6th items are the same, game over.
// VERTICALLY:
// If the first, 4th, and 7th are the same, game over.
// If the 2nd, 5th, and 8th are the same, game over.
// If the 3rd, 6th, and 9th are the same, game over.
// DIAGONALLY:
// If the first, 5th, and 9th are the same, game over.

// If 3 markers connect, and the marker is X, then the user won. If 3 markers connect, and the marker is O, then user lost.
// If no empty cells are left, and there is no 3-way connection, then its a draw.

// Game board object created with a module, since we only need of this object
const gameBoard = (() => {
  let board = [];
  const boardArea = document.querySelector('.board-area');
  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = null;
    }
  };
  createBoard();
  const displayGameBoard = () => {
    for (let i = 0; i <= board.length - 1; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      boardArea.appendChild(cell);
      switch (i) {
        case 0:
          break;
        case 1:
          cell.classList.add('border-left');
          cell.classList.add('border-right');
          break;
        case 2:
          break;
        case 3:
          cell.classList.add('border-top');
          cell.classList.add('border-bottom');
          break;
        case 4:
          cell.classList.add('border-left');
          cell.classList.add('border-bottom');
          cell.classList.add('border-top');
          cell.classList.add('border-right');
          break;
        case 5:
          cell.classList.add('border-top');
          cell.classList.add('border-bottom');
          break;
        case 6:
          break;
        case 7:
          cell.classList.add('border-left');
          cell.classList.add('border-right');
          break;
        case 8:
          break;
      }
    }
  };
  return { board, displayGameBoard };
})();

console.log(gameBoard.board);
gameBoard.displayGameBoard();

// Player objects created with a factory function and NOT a module, since we'll need multiple of them
const playerFactory = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
};

// Object created in a module with the intention of controlling the flow of the game
const gameFlow = (() => {})();

const player1 = playerFactory('Bob', 'X');
console.log(player1.getName());
