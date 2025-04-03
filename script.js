import knightMoves from "./knightMoves.js";

(function main() {
  function createGrid() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const square = document.createElement("div");
        square.dataset.x = j;
        square.dataset.y = i;
        grid.appendChild(square);
      }
    }
  }

  function clearGrid() {
    const squares = document.querySelectorAll(".grid div");
    squares.forEach((square) => {
      square.className = "";
      square.textContent = "";
    });
  }

  function placeKnight(square) {
    square.classList.add("knight");
  }

  function handleGridClick(event) {
    const square = event.target;
    if (start !== null && dest !== null) {
      start = null;
      dest = null;
      clearGrid();
    }

    if (start === null) {
      start = [Number(square.dataset.x), Number(square.dataset.y)];
      placeKnight(square);
      square.classList.add("start");
    } else if (dest === null) {
      dest = [Number(square.dataset.x), Number(square.dataset.y)];
      placeKnight(square);
      square.classList.add("dest");

      const path = knightMoves(start, dest);
      drawMoves(path);
    }
  }

  function drawMoves(path) {
    console.log(path);
    for (let i = 0; i < path.length; i++) {
      const square = document.querySelector(
        `[data-x="${path[i][0]}"][data-y="${path[i][1]}"]`
      );
      square.textContent = i;
    }
  }

  let start = null;
  let dest = null;
  const grid = document.querySelector(".grid");
  grid.addEventListener("click", handleGridClick);
  createGrid();
})();
