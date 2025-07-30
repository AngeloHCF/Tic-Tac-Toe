const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const HEIGHT = 400;
const WIDTH = 600;

const BOARD_MAP =
[
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const WINNER_DISPLAY = document.querySelector('.winner-display');

let X = true; // which means X's turn, if false O's turn
let winner = null;



start();


// Check If Game Is Over
function checkGameOver(board) {
  // Check Horizontal (Rows) 
  for(let i = 0; i < BOARD_MAP.length; i++) {
    // Checks X Horizontal Win Status
    if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] != '') {
      return board[i][0];
    }
  }
  // Check Vertical (Columns)
  for(let j = 0; j < board[0].length; j++) {
    if(board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] != '') {
      return board[0][j]
    }
  }
  // Check Top Left to Bottom Right Diagonal
  if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] != '') {
    return board[0][0];
  }
  // Check Top Right to Bottom Left Diaganol
  if(board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] != '') {
    return board[0][2];
  }
  return null;
}

// Checks Mouse Location
const cellWidth = canvas.width / 3;
const cellHeight = canvas.height / 3;

canvas.addEventListener('click', function(e) {
  // is there a winner
  if(winner) return;
  const mouseX = e.offsetX
  const mouseY = e.offsetY
  
  const col = Math.floor(mouseX / cellWidth);
  const row = Math.floor(mouseY / cellHeight);

  placeMark(row, col);
});

/// Handles Interaction with Board
function placeMark(row, col) {
  if(BOARD_MAP[row][col] == '') {
    BOARD_MAP[row][col] = X === true ? 'X' : 'O';

    const centerX = col * cellWidth + cellWidth / 2;
    const centerY = row * cellHeight + cellHeight / 2;

    ctx.fillStyle = 'black';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(BOARD_MAP[row][col], centerX, centerY);

    X = !X;
    winner = checkGameOver(BOARD_MAP);
    if(winner) {
      WINNER_DISPLAY.textContent = `${winner} has won the game!`;
    } else {
      WINNER_DISPLAY.textContent = `Neither X or O won the game!`;
    }
  }
}

// Sets Up the Game Board
function start() {
  canvas.height = HEIGHT;
  canvas.width = WIDTH;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

  drawGrid(3, 3);
}

// Draws Grid (3 by 3 for tic tac toe)
function drawGrid(cols, rows) {
  const colWidth = canvas.width / cols;
  const rowHeight = canvas.height / rows;
  
  // col (vertical)
  for(let i = 1; i < cols; i++) {
    const x = i * colWidth;
    ctx.beginPath(); // need to learn these 4 things and how they work
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // row (horizontal)
  for(let j = 1; j < rows; j++) {
    const y = j * rowHeight;
    ctx.beginPath();
    ctx.moveTo(0, y); // x = 0, y = 133.333333
    ctx.lineTo(canvas.width, y); // then it moves to x = WIDTH (600) y = 133.333333
    ctx.stroke();
  }
}