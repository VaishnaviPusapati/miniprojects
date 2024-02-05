document.body.style.color = "#6a4343";

// Get all the elements needed
const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("msg");

// Variables to track game state
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Function to check for a win
const checkWin = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return gameBoard[a];
    }
  }

  return null; // No winner yet
};

// Function to handle player's move
const handleMove = (index) => {
  if (gameBoard[index] || !gameActive) return; // Check if the box is already filled or game is not active

  gameBoard[index] = currentPlayer;
  boxes[index].textContent = currentPlayer;

  const winner = checkWin();

  if (winner) {
    message.textContent = `${winner} wins!`;
    gameActive = false;
  } else if (!gameBoard.includes("")) {
    message.textContent = "It's a tie!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `${currentPlayer}'s turn`;
  }
};

// Event listener for box clicks
boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleMove(index));
});

// Event listener for reset button
resetBtn.addEventListener("click", () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  message.textContent = " ";

  boxes.forEach((box) => {
    box.textContent = "";
  });
});
