// Does your program have an interface? What will it look like?
// The program will have a user interface. The grid-like look will be achieved by using borders on divs.

// What inputs will your program have? Will the user enter data or will you get input from somewhere else?
// First, the user will be able to select whether they want to play against another player (locally) or against a computer.
// This interaction will be achieved via buttons. Then the user or users will be able to click on individual grid cells
// in order to play the game.

// What’s the desired output?
// There will be three different possible outcomes. The user can either window, lose, or draw. The user can
// win by placing 3 X markers either horizontally, vertically, or diagonally. Once one of these occur, the

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

      const backBtn = document.querySelector('#back');
      backBtn.addEventListener('click', () => {
        location.reload();
      });
    });
    // VS AI button clicked... for now I'll work on the player vs player part first
  };

  const gameEnd = (marker) => {
    let container = document.querySelectorAll('.board-area div');
    if (marker === 'X') {
      displayController.para1.textContent = `${gameBoard.player1.getName()} won!`;
    } else if (marker === 'O') {
      displayController.para1.textContent = `${gameBoard.player2.getName()} won!`;
    } else if (marker === 'D') {
      displayController.para1.textContent = 'Draw!';
    }

    displayController.para1.classList.toggle('won');
    for (const cell of container) {
      cell.classList.toggle('noclick');
    }

    gameBoard.createBoard();
    const clearCells = () => {
      for (const cell of container) {
        cell.textContent = '';
      }
      displayController.para1.textContent = `${gameBoard.player1.getName()}'s turn`;
      displayController.para1.classList.toggle('won');
      for (const cell of container) {
        cell.classList.toggle('noclick');
      }
    };
    setTimeout(clearCells, 1800);
  };

  let checkForWin = () => {
    if (
      gameBoard.board[0] === 'X' &&
      gameBoard.board[1] === 'X' &&
      gameBoard.board[2] === 'X'
    ) {
      gameEnd('X');
    } else if (
      gameBoard.board[0] === 'O' &&
      gameBoard.board[1] === 'O' &&
      gameBoard.board[2] === 'O'
    ) {
      gameEnd('O');
    }

    if (
      gameBoard.board[3] === 'X' &&
      gameBoard.board[4] === 'X' &&
      gameBoard.board[5] === 'X'
    ) {
      gameEnd('X');
    } else if (
      gameBoard.board[3] === 'O' &&
      gameBoard.board[4] === 'O' &&
      gameBoard.board[5] === 'O'
    ) {
      gameEnd('O');
    }

    if (
      gameBoard.board[6] === 'X' &&
      gameBoard.board[7] === 'X' &&
      gameBoard.board[8] === 'X'
    ) {
      gameEnd('X');
    } else if (
      gameBoard.board[6] === 'O' &&
      gameBoard.board[7] === 'O' &&
      gameBoard.board[8] === 'O'
    ) {
      gameEnd('O');
    }

    if (
      gameBoard.board[0] === 'X' &&
      gameBoard.board[3] === 'X' &&
      gameBoard.board[6] === 'X'
    ) {
      gameEnd('X');
    } else if (
      gameBoard.board[0] === 'O' &&
      gameBoard.board[3] === 'O' &&
      gameBoard.board[6] === 'O'
    ) {
      gameEnd('O');
    }

    if (
      gameBoard.board[1] === 'X' &&
      gameBoard.board[4] === 'X' &&
      gameBoard.board[7] === 'X'
    ) {
      gameEnd('X');
    } else if (
      gameBoard.board[1] === 'O' &&
      gameBoard.board[4] === 'O' &&
      gameBoard.board[7] === 'O'
    ) {
      gameEnd('O');
    }

    if (
      gameBoard.board[2] === 'X' &&
      gameBoard.board[5] === 'X' &&
      gameBoard.board[8] === 'X'
    ) {
      gameEnd('X');
    } else if (
      gameBoard.board[2] === 'O' &&
      gameBoard.board[5] === 'O' &&
      gameBoard.board[8] === 'O'
    ) {
      gameEnd('O');
    }

    if (
      gameBoard.board[0] === 'X' &&
      gameBoard.board[4] === 'X' &&
      gameBoard.board[8] === 'X'
    ) {
      gameEnd('X');
    } else if (
      gameBoard.board[0] === 'O' &&
      gameBoard.board[4] === 'O' &&
      gameBoard.board[8] === 'O'
    ) {
      gameEnd('O');
    }

    if (
      gameBoard.board[2] === 'X' &&
      gameBoard.board[4] === 'X' &&
      gameBoard.board[6] === 'X'
    ) {
      gameEnd('X');
    } else if (
      gameBoard.board[2] === 'O' &&
      gameBoard.board[4] === 'O' &&
      gameBoard.board[6] === 'O'
    ) {
      gameEnd('O');
    }

    if (!gameBoard.board.includes('')) {
      gameEnd('D');
    }
  };

  const computerSelected = () => {
    cpuBtn.addEventListener('click', () => {
      alert(
        'Under construction. Only the multiplayer mode is available for now.'
      );
    });
  };

  return {
    multiplayerSelected,
    computerSelected,
    para1,
    checkForWin,
  };
})();

const gameController = (() => {
  displayController.multiplayerSelected();
  displayController.computerSelected();

  let counter = 0;
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
        if (lastChar == 'n') {
          counter++;
        } else {
          counter = 0;
        }
      }
    });
  };
  clickCell();
})();
