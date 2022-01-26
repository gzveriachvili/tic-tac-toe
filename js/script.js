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

// The user selects MULTIPLAYER:
// 1. Player 1 and Player 2 names get displayed on left side along with their markers and scores. Go back button on top of names.
// 2. Buttons dissapear
// 3. Gameboard gets drawn
// 4. Color the winning path
// 5. clear cells and restart game, increment score
// 6. If user clicks on go back button:
//a. delete player names, scores, go back button and the game board too
//b. display multiplayer and computer buttons

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

// Button factory
const buttonFactory = (icon) => {
  const buttonsArea = document.querySelector('.buttons');
  const createButton = (name) => {
    const button = document.createElement('button');
    button.textContent = name;
    buttonsArea.appendChild(button);
    switch (icon) {
      case 'multi':
        button.setAttribute('id', 'multi');
        const iconM = document.createElement('i');
        iconM.classList.add('fas');
        iconM.classList.add('fa-user-friends');
        button.prepend(iconM);
        break;
      case 'cpu':
        button.setAttribute('id', 'cpu');
        const iconC = document.createElement('i');
        iconC.classList.add('fas');
        iconC.classList.add('fa-microchip');
        button.prepend(iconC);
        break;
      default:
        button.setAttribute('id', icon);
        button.setAttribute(
          'style',
          'background: none; border: 2px solid #ffc833; color: #ffc833; margin-bottom: 15px; width: 10px;'
        );
    }
  };
  return { createButton };
};

const multiplayerButton = buttonFactory('multi');
const computerButton = buttonFactory('cpu');

multiplayerButton.createButton('Multiplayer');
computerButton.createButton('VS Computer');

// Player objects created with a factory function and NOT a module, since we'll need multiple of them
const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

// Game board object created with a module, since we only need of this object
const gameBoard = (() => {
  let board = [];
  const player1 = Player('Player 1', 'O');
  const player2 = Player('Player 2', 'X');

  const boardArea = document.querySelector('.board-area');

  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = '';
    }
  };

  createBoard();

  return { board, boardArea, player1, player2, createBoard };
})();

console.log(gameBoard.board);

// Module containing the DOM elements of the game
const displayController = (() => {
  const para1 = document.createElement('p');
  const multiBtn = document.querySelector('#multi');
  const cpuBtn = document.querySelector('#cpu');
  // draw board
  const drawBoard = () => {
    for (let i = 0; i <= gameBoard.board.length - 1; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute(`data-index`, `${i}`);
      gameBoard.boardArea.appendChild(cell);
      switch (i) {
        case 1:
          cell.classList.add('border-left');
          cell.classList.add('border-right');
          break;
        case 3:
          cell.classList.add('border-top');
          cell.classList.add('border-bottom');
          break;
        case 4:
          cell.classList.add('border-top');
          cell.classList.add('border-right');
          cell.classList.add('border-bottom');
          cell.classList.add('border-left');
          break;
        case 5:
          cell.classList.add('border-top');
          cell.classList.add('border-bottom');
          break;
        case 7:
          cell.classList.add('border-left');
          cell.classList.add('border-right');
          break;
      }
    }
  };
  // Multiplayer button clicked
  const multiplayerSelected = () => {
    multiBtn.addEventListener('click', () => {
      const buttonsArea = document.querySelector('.buttons');
      drawBoard();
      const turn = document.querySelector('.turn-text');
      para1.classList.add('turnover');
      para1.textContent = `${gameBoard.player1.getName()}'s turn`;
      buttonsArea.removeChild(buttonsArea.childNodes[0]);
      buttonsArea.removeChild(buttonsArea.childNodes[0]);
      turn.appendChild(para1);
      const backButton = buttonFactory('back');
      backButton.createButton('go back');
    });
    // VS AI button clicked... for now I'll work on the player vs player part first
  };

  const gameEnd = () => {
    let container = document.querySelectorAll('.board-area div');
    displayController.para1.textContent = `${gameBoard.player1.getName()} won!`;
    displayController.para1.classList.toggle('won');

    gameBoard.createBoard();
    const clearCells = () => {
      for (const cell of container) {
        cell.textContent = '';
      }
      displayController.para1.textContent = `${gameBoard.player1.getName()}'s turn`;
      displayController.para1.classList.toggle('won');
    };
    setTimeout(clearCells, 1500);
  };

  let checkForWin = () => {
    if (
      gameBoard.board[0] === 'X' &&
      gameBoard.board[1] === 'X' &&
      gameBoard.board[2] === 'X'
    ) {
      gameEnd();
    }
  };

  const computerSelected = () => {
    cpuBtn.addEventListener('click', () => {
      alert('Under construction');
    });
  };
  return { multiplayerSelected, computerSelected, para1, checkForWin };
})();

const gameController = (() => {
  displayController.multiplayerSelected();
  let counter = 2;
  console.log('Counter after declaration: ', counter);
  const clickCell = () => {
    window.addEventListener('click', (e) => {
      if (e.path[0].classList.contains('cell')) {
        let cellNumber = e.path[0].getAttribute('data-index');
        let cellContent = e.path[0];
        if (counter % 2 !== 0) {
          if (gameBoard.board[cellNumber] == '') {
            displayController.para1.textContent = `${gameBoard.player1.getName()}'s turn`;

            gameBoard.board[cellNumber] = gameBoard.player1.getMarker();
            cellContent.setAttribute('style', 'color:#842dfd');
            cellContent.textContent = gameBoard.board[cellNumber];
          } else {
            counter--;
          }
        } else {
          if (gameBoard.board[cellNumber] == '') {
            displayController.para1.textContent = `${gameBoard.player2.getName()}'s turn`;

            gameBoard.board[cellNumber] = gameBoard.player2.getMarker();
            cellContent.setAttribute('style', 'color:#ffc833');
            cellContent.textContent = gameBoard.board[cellNumber];
          } else {
            counter--;
          }
        }
        console.log(gameBoard.board);
        displayController.checkForWin();
        let textArr = displayController.para1.textContent.split('');
        let lastChar = textArr[textArr.length - 1];
        console.log(lastChar);
        if (lastChar == 'n') {
          counter++;
        }
      }
    });
  };
  clickCell();
})();
