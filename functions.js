Game.do = (function () {
  function addDiscToBoard(x_pos, y_pos) {
    Game.board[y_pos][x_pos] = Game.currentPlayer;
  }
  function printBoard() {
    var row, cell;
    for (var y = 0; y <= Game.config.boardHeight; y++) {
      for (var x = 0; x <= Game.config.boardLength; x++) {
        if (Game.check.isPositionTaken(x, y)) {
          row = document.querySelector("tr:nth-child(" + (1 + y) + ")");
          cell = row.querySelector("td:nth-child(" + (1 + x) + ")");
          cell.firstElementChild.classList.add(Game.board[y][x]);
        }
      }
    }
  }
  function changePlayer() {
    var currentPlayerNameEl = document.querySelector("#current-player");
    var otherPlayerNameEl = document.querySelector("#other-player");
    var otherPlayer = Game.currentPlayer;
    var otherPlayerName = currentPlayerNameEl.textContent;
    var currentPlayerName = otherPlayerNameEl.textContent;
    Game.currentPlayer = Game.currentPlayer === "black" ? "red" : "black";
    currentPlayerNameEl.classList.remove(otherPlayer);
    currentPlayerNameEl.classList.add(Game.currentPlayer);
    currentPlayerNameEl.textContent = currentPlayerName;
    otherPlayerNameEl.classList.remove(Game.currentPlayer);
    otherPlayerNameEl.classList.add(otherPlayer);
    otherPlayerNameEl.textContent = otherPlayerName;
  }
  function dropToBottom(x_pos, y_pos) {
    for (var y = Game.config.boardHeight; y > y_pos; y--) {
      if (!Game.check.isPositionTaken(x_pos, y)) {
        return y;
      }
    }
    return y_pos;
  }
  function handleNameChange(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.body.focus();
    }
  }
  return {
    addDiscToBoard,
    printBoard,
    changePlayer,
    dropToBottom,
    handleNameChange,
  };
})();
Game.check = (function () {
  function isPositionTaken(x_pos, y_pos) {
    return Game.board[y_pos][x_pos] !== 0;
  }
  function isGameADraw() {
    for (var y = 0; y <= Game.config.boardHeight; y++) {
      for (var x = 0; x <= Game.config.boardLength; x++) {
        if (!isPositionTaken(x, y)) {
          return false;
        }
      }
    }
    return true;
  }
  function isHorizontalWin() {
    var currentValue = null,
      previousValue = 0,
      tally = 0;
    for (var y = 0; y <= Game.config.boardHeight; y++) {
      for (var x = 0; x <= Game.config.boardLength; x++) {
        currentValue = Game.board[y][x];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          tally = 0;
        }
        if (tally === Game.config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;
      }
      tally = 0;
      previousValue = 0;
    }
    return false;
  }
  function isVerticalWin() {
    var currentValue = null,
      previousValue = 0,
      tally = 0;
    for (var x = 0; x <= Game.config.boardLength; x++) {
      for (var y = 0; y <= Game.config.boardHeight; y++) {
        currentValue = Game.board[y][x];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          tally = 0;
        }
        if (tally === Game.config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;
      }
      tally = 0;
      previousValue = 0;
    }
    return false;
  }
  function isDiagonalWin() {
    var x = null,
      y = null,
      xtemp = null,
      ytemp = null,
      currentValue = null,
      previousValue = 0,
      tally = 0;
    for (x = 0; x <= Game.config.boardLength; x++) {
      xtemp = x;
      ytemp = 0;
      while (
        xtemp <= Game.config.boardLength &&
        ytemp <= Game.config.boardHeight
      ) {
        currentValue = Game.board[ytemp][xtemp];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          tally = 0;
        }
        if (tally === Game.config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;
        xtemp++;
        ytemp++;
      }
      tally = 0;
      previousValue = 0;
    }
    for (x = 0; x <= Game.config.boardLength; x++) {
      xtemp = x;
      ytemp = 0;
      while (0 <= xtemp && ytemp <= Game.config.boardHeight) {
        currentValue = Game.board[ytemp][xtemp];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          tally = 0;
        }
        if (tally === Game.config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;
        xtemp--;
        ytemp++;
      }
      tally = 0;
      previousValue = 0;
    }
    for (y = 0; y <= Game.config.boardHeight; y++) {
      xtemp = 0;
      ytemp = y;
      while (
        xtemp <= Game.config.boardLength &&
        ytemp <= Game.config.boardHeight
      ) {
        currentValue = Game.board[ytemp][xtemp];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          tally = 0;
        }
        if (tally === Game.config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;
        xtemp++;
        ytemp++;
      }
      tally = 0;
      previousValue = 0;
    }
    for (y = 0; y <= Game.config.boardHeight; y++) {
      xtemp = Game.config.boardLength;
      ytemp = y;
      while (0 <= xtemp && ytemp <= Game.config.boardHeight) {
        currentValue = Game.board[ytemp][xtemp];
        if (currentValue === previousValue && currentValue !== 0) {
          tally += 1;
        } else {
          tally = 0;
        }
        if (tally === Game.config.countToWin - 1) {
          return true;
        }
        previousValue = currentValue;
        xtemp--;
        ytemp++;
      }
      tally = 0;
      previousValue = 0;
    }
    return false;
  }
  return {
    isPositionTaken,
    isGameADraw,
    isHorizontalWin,
    isVerticalWin,
    isDiagonalWin,
  };
})();

// We'll add animation effects to some game functions

// Add a function to highlight the winning pieces
Game.do.highlightWinningPieces = function(winningPieces) {
  winningPieces.forEach(function(piece) {
    const x = piece[0];
    const y = piece[1];
    const row = document.querySelectorAll("#board tr")[y];
    const cell = row.children[x];
    const button = cell.firstElementChild;
    
    // Add highlight effect
    button.classList.add("winning-piece");
    
    // Add pulse animation
    button.style.animation = "pulse 1s infinite";
  });
};

// Enhance the functions that check for wins to return winning pieces
Game.check.isVerticalWin = function() {
  const currentColor = Game.currentPlayer;
  const winningLength = Game.config.countToWin;
  const board = Game.board;
  
  // Check for vertical win
  for (let col = 0; col < board[0].length; col++) {
    for (let row = 0; row <= board.length - winningLength; row++) {
      let consecutiveCount = 0;
      let winningPieces = [];
      
      for (let k = 0; k < winningLength; k++) {
        if (board[row + k][col] === currentColor) {
          consecutiveCount++;
          winningPieces.push([col, row + k]);
        } else {
          break;
        }
      }
      
      if (consecutiveCount === winningLength) {
        Game.do.highlightWinningPieces(winningPieces);
        return true;
      }
    }
  }
  return false;
};

Game.check.isHorizontalWin = function() {
  const currentColor = Game.currentPlayer;
  const winningLength = Game.config.countToWin;
  const board = Game.board;
  
  // Check for horizontal win
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col <= board[row].length - winningLength; col++) {
      let consecutiveCount = 0;
      let winningPieces = [];
      
      for (let k = 0; k < winningLength; k++) {
        if (board[row][col + k] === currentColor) {
          consecutiveCount++;
          winningPieces.push([col + k, row]);
        } else {
          break;
        }
      }
      
      if (consecutiveCount === winningLength) {
        Game.do.highlightWinningPieces(winningPieces);
        return true;
      }
    }
  }
  return false;
};

Game.check.isDiagonalWin = function() {
  const board = Game.board;
  const currentColor = Game.currentPlayer;
  const winningLength = Game.config.countToWin;
  
  // Check for diagonal wins (top-left to bottom-right)
  for (let row = 0; row <= board.length - winningLength; row++) {
    for (let col = 0; col <= board[row].length - winningLength; col++) {
      let consecutiveCount = 0;
      let winningPieces = [];
      
      for (let k = 0; k < winningLength; k++) {
        if (board[row + k][col + k] === currentColor) {
          consecutiveCount++;
          winningPieces.push([col + k, row + k]);
        } else {
          break;
        }
      }
      
      if (consecutiveCount === winningLength) {
        Game.do.highlightWinningPieces(winningPieces);
        return true;
      }
    }
  }
  
  // Check for diagonal wins (top-right to bottom-left)
  for (let row = 0; row <= board.length - winningLength; row++) {
    for (let col = winningLength - 1; col < board[row].length; col++) {
      let consecutiveCount = 0;
      let winningPieces = [];
      
      for (let k = 0; k < winningLength; k++) {
        if (board[row + k][col - k] === currentColor) {
          consecutiveCount++;
          winningPieces.push([col - k, row + k]);
        } else {
          break;
        }
      }
      
      if (consecutiveCount === winningLength) {
        Game.do.highlightWinningPieces(winningPieces);
        return true;
      }
    }
  }
  
  return false;
};

// Add column highlight effect
Game.do.highlightColumn = function(col) {
  // Remove any existing highlights
  document.querySelectorAll('.column-highlight').forEach(function(el) {
    el.classList.remove('column-highlight');
  });
  
  // Add highlight to the current column
  const rows = document.querySelectorAll('#board tr');
  for (let i = 0; i < rows.length; i++) {
    const cell = rows[i].children[col];
    cell.classList.add('column-highlight');
  }
};

// Enhance the original changePlayer function
const originalChangePlayer = Game.do.changePlayer;
Game.do.changePlayer = function() {
  originalChangePlayer();
  
  // Update UI to reflect the current player
  const currentPlayerEl = document.getElementById('current-player');
  const otherPlayerEl = document.getElementById('other-player');
  
  if (Game.currentPlayer === 'red') {
    currentPlayerEl.classList.add('red');
    currentPlayerEl.classList.remove('black');
    otherPlayerEl.classList.add('black');
    otherPlayerEl.classList.remove('red');
  } else {
    currentPlayerEl.classList.add('black');
    currentPlayerEl.classList.remove('red');
    otherPlayerEl.classList.add('red');
    otherPlayerEl.classList.remove('black');
  }
  
  // Add a subtle animation to indicate turn change
  currentPlayerEl.style.animation = 'pulse 1s';
  setTimeout(function() {
    currentPlayerEl.style.animation = '';
  }, 1000);
};

// Enhanced addDiscToBoard with animation
const originalAddDiscToBoard = Game.do.addDiscToBoard;
Game.do.addDiscToBoard = function(x, y) {
  originalAddDiscToBoard(x, y);
  
  // Add drop animation
  const row = document.querySelectorAll("#board tr")[y];
  const cell = row.children[x];
  const button = cell.firstElementChild;
  
  button.style.transform = 'translateY(-100px)';
  button.style.opacity = '0';
  
  setTimeout(function() {
    button.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s';
    button.style.transform = 'translateY(0)';
    button.style.opacity = '1';
  }, 50);
};


/* Fullscreen button */
let myDocument = document.documentElement;
let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  if (btn.textContent == "Go Fullscreen") {
    if (myDocument.requestFullscreen) {
      myDocument.requestFullscreen();
    } else if (myDocument.msRequestFullscreen) {
      myDocument.msRequestFullscreen();
    } else if (myDocument.mozRequestFullscreen) {
      myDocument.mozRequestFullscreen();
    } else if (myDocument.webkitRequestFullscreen) {
      myDocument.webkitRequestFullscreen();
    }

    btn.textContent = "Exit Fullscreen";
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msexitFullscreen) {
      document.msexitFullscreen();
    } else if (document.mozexitFullscreen) {
      document.mozexitFullscreen();
    } else if (document.webkitexitFullscreen) {
      document.webkitexitFullscreen();
    }

    btn.textContent = "Go Fullscreen";
  }
});
