document.addEventListener("DOMContentLoaded", function () {
  // Variables that are used in the game
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;
  let currentPlayer = "X"; // Initial player is A (X)
  let playerAName = ""; // Player A's name
  let playerBName = ""; // Player B's name
  let playersList = []; // List to store player names
  let playersWinsCount = {}; // Map to store player's wins count

  // Selectors
  const cells = document.querySelectorAll(".cell"); // Select each cell of the game
  const restartButton = document.querySelector(".restartButton"); // Select restart button
  const gameName = document.querySelector(".gameName h1"); // Select Title of the Game
  const playerAScore = document.querySelector(".playerAScore");
  const playerBScore = document.querySelector(".playerBScore");
  const playerAWinsName = document.querySelector(".playerA h2");
  const playerBWinsName = document.querySelector(".playerB h2");
  const playerPostionA = document.querySelector(".playerPostionA");
  const playerPostionB = document.querySelector(".playerPostionB");
  const viewScorecardButton = document.querySelector(".viewScorecardButton");

  // Function to set player names
  function setPlayerNames() {
    playerAName = prompt("Enter Player A's name:");
    playerBName = prompt("Enter Player B's name:");

    // Make the prompts compulsory
    while (!playerAName || !playerBName) {
      alert("Player names are required. Please enter valid names.");
      playerAName = prompt("Enter Player A's name:");
      playerBName = prompt("Enter Player B's name:");
    }

    //Initially they are zero
    playerAScore.textContent = 0;
    playerBScore.textContent = 0;

    // Check if Player A's name already exists
    if (playersList.includes(playerAName)) {
      playerAScore.textContent = playersWinsCount[playerAName];
    } else {
      updatePlayerData(playerAName);
    }

    // Check if Player B's name already exists
    if (playersList.includes(playerBName)) {
      playerBScore.textContent = playersWinsCount[playerBName];
    } else {
      updatePlayerData(playerBName);
    }

    //Displaying the names of the players in the boxes
    playerAWinsName.textContent = playerAName + " wins";
    playerBWinsName.textContent = playerBName + " wins";
    playerPostionA.textContent = playerAName;
    playerPostionB.textContent = playerBName;
  }

  //Function to update the playerData
  function updatePlayerData(playerName) {
    if (playersList.includes(playerName)) {
    } else {
      // New player, add to the list
      playersList.push(playerName);
      playersWinsCount[playerName] = 0; // Initialize wins count to 0
    }
  }
  // Event listener for the View Scorecard button
  viewScorecardButton.addEventListener("click", showScorecard);
  // Event listener for cell clicks
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  // Event listener for restart button
  restartButton.addEventListener("click", restartGame);

  // Function to handle cell clicks
  function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.dataset.cellIndex; // Extracting the data-cell-index attribute from the clicked cell

    // Checking if the cell is already marked or if the game is over
    if (!gameBoard[cellIndex] && gameActive) {
      // Updating the cell with the current player's mark
      // places either "X" or "O"
      gameBoard[cellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;

      // Checking for a winner or a draw
      if (checkWinner()) {
        announceWinner();
      } else if (checkDraw()) {
        announceDraw();
      } else {
        // Switching to the next player
        switchPlayer();
      }
    }
  }

  // Function to switch players
  function switchPlayer() {
    // Toggles between "X" and "O"
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Removes playerActive from both player positions
    document
      .querySelectorAll(".playerPostionA, .playerPostionB")
      .forEach((playerPosition) => {
        playerPosition.classList.remove("playerActive");
      });

    // Adding playerActive to the current player position
    const currentPlayerPosition =
      currentPlayer === "X" ? ".playerPostionA" : ".playerPostionB";
    document.querySelector(currentPlayerPosition).classList.add("playerActive");
  }

  // Function to check for a winner
  function checkWinner() {
    // all the possible winning combinations
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Iterating over each win pattern
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;

      // Checking if the values at indices a, b, and c in the game board are equal and not null or undefined
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[b] === gameBoard[c]
      ) {
        // if winner is found
        return true;
      }
    }
    // if no winner is found
    return false;
  }

  // Function to announce the winner
  function announceWinner() {
    // Setting the game to inactive
    gameActive = false;

    // Selecting player position elements
    const playerPositionA = document.querySelector(".playerPostionA");
    const playerPositionB = document.querySelector(".playerPostionB");

    // Checking which player won and updating wins accordingly
    const currentPlayerName = currentPlayer === "X" ? playerAName : playerBName;
    playersWinsCount[currentPlayerName]++; // Updated to use player name as key

    if (currentPlayer === "X") {
      // Updating game name and style when player A wins
      gameName.textContent = playerAName + " WON!!!!";
      gameName.style.backgroundColor = "green";
      playerPositionA.classList.add("playerWinner");
      console.log("TEEEM4");
    } else {
      gameName.textContent = playerBName + " WON!!!!";
      gameName.style.backgroundColor = "green";
      playerPositionB.classList.add("playerWinner");
    }

    // Update the respective score element
    playerAScore.textContent = playersWinsCount[playerAName];
    playerBScore.textContent = playersWinsCount[playerBName];

    // changing the restart button to New Game
    restartButton.textContent = "New Game";

    console.log("ollal", playersList);
    console.log("ollalww", playersWinsCount);
  }

  // Function to check for a draw
  function checkDraw() {
    // Checking if the game board does not include any empty cells and there is no winner
    return !gameBoard.includes("") && !checkWinner();
  }

  // Function to announce a draw
  function announceDraw() {
    gameActive = false;
    // Updating UI and style for a draw
    gameName.textContent = "It's a Draw!";
    gameName.style.backgroundColor = "gray";
    restartButton.textContent = "New Game";
  }

  // Function to restart the game
  function restartGame() {
    // Reset game variables
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    // Reset UI
    cells.forEach((cell) => {
      cell.textContent = "";
    });

    gameName.textContent = "Tic-Tac-Toe";
    gameName.style.backgroundColor = "transparent";
    restartButton.textContent = "Restart";

    // Reset player positions
    document
      .querySelectorAll(".playerPostionA, .playerPostionB")
      .forEach((playerPosition) => {
        playerPosition.classList.remove("playerActive");
        playerPosition.classList.remove("playerWinner");
      });
    document.querySelector(".playerPostionA").classList.add("playerActive");

    //when the text content is New Game; new names are to be entered
    setPlayerNames();
  }

  function showScorecard() {
    const sortedScorecard = Object.entries(playersWinsCount)
      .sort((a, b) => b[1] - a[1])
      .map(([player, wins]) => `${player}: ${wins} wins`);

    const scorecardText = sortedScorecard.join("\n");

    alert(`Scorecard:\n\n${scorecardText}`);
  }

  // Ask for names when the page loads
  setPlayerNames();
});
