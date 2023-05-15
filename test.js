function addBalls(callback) {
  blocked = true;
  var cells = [];

  for (var i = 0; i < 3; i++) {
    // збирати всі порожні клітинки і обирати з них 3 рандомні клітинки(+3 кольори), на які будуть поміщені кульки під час наступної ітерації. якщо на одну з цих клітинок під час актуальної ітерації буде поміщена кулька - обрати рандомне місце серед вільних клітинок для цієї кульки(колір має зберігатися).
    var emptyCells = getCells(".empty");
    if (emptyCells.length > 0) {
      // Gets random empty cell
      console.log("enptyCells: ", emptyCells);
      // changed -------------------
      // var cell = emptyCells[rand(0, emptyCells.length - 1)];
      const myRowOfCells = [2, 3, 4];
      var cell = document.querySelector(`#cell-${myRowOfCells[i]}-4`);
      console.log("CELL: ", cell);
      grid[cell.dataset.y][cell.dataset.x] = colors.key(forecast[i]);

      cells.push(cell);
      s;
      cell.className = "ball " + forecast[i] + " fadein";
    } else {
      break;
    }
  }

  // Sets timeout for animation
  setTimeout(function () {
    each(getCells(".fadein"), function (cell) {
      cell.classList.remove("fadein");
    });

    blocked = false;
    if (callback) {
      return callback(cells);
    }
  }, 300);

  // -------------------- here --------------------------------

  // Generates forecast balls
  forecastBalls();

  // -------------------- here --------------------------------
  console.log("ITERATION");
  console.log("Length", emptyCells.length);
}

function myFuncForOneRandomFreePositionForFirstIteration() {
  var emptyCellsONE = getCells(".empty");

  var myArrOfRandomIndexesONE = [];

  for (var i = 0; i <= emptyCellsONE.length - 1; i++) {
    myArrOfRandomIndexesONE.push(i);
  }

  // randomize nums

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  // use randomize func
  shuffle(myArrOfRandomIndexesONE);

  // console.log(myArrOfRandomIndexes);

  const randomEmptyCellsONE = [];

  const myOneUniqueCellPosition = [];

  for (let i = 0; i <= emptyCellsONE.length - 1; i++) {
    randomEmptyCellsONE.push(emptyCellsONE[myArrOfRandomIndexesONE[i]]);
  }

  for (let q = 0; q <= randomEmptyCellsONE.length - 1; q++) {
    if (
      randomEmptyCellsONE[q] === document.getElementById("cell-0-0") ||
      randomEmptyCellsONE[q] === document.getElementById("cell-1-0") ||
      randomEmptyCellsONE[q] === document.getElementById("cell-2-0")
    ) {
      console.log(
        "randomEmptyCellsONE[q] === getCells('#cell-`1,2 or 3`-0')",
        randomEmptyCellsONE[q]
      );
      continue;
    } else {
      console.log("good");
      myOneUniqueCellPosition.push(randomEmptyCellsONE[q]);
      console.log("myOneUniqueCellPosition", myOneUniqueCellPosition);
      break;
    }
  }
}

// func for finding one empty cell (cell with no ball and with background color rgb(221, 221, 221)(gray), so, its not prediction cell)

function myFuncForOneRandomFreePosition2() {
  var emptyCellsONE = getCells(".empty");
  let emptyCellsWithFFF = [];
  let notReallyEmptyCells = [];

  var myArrOfRandomIndexesONE = [];

  for (let u = 0; u <= emptyCellsONE.length - 1; u++) {
    if (emptyCellsONE[u].style.backgroundColor === "rgb(221, 221, 221)") {
      emptyCellsWithFFF.push(emptyCellsONE[u]);
    } else {
      notReallyEmptyCells.push(emptyCellsONE[u]);
    }
  }

  for (var i = 0; i <= emptyCellsONE.length - 1; i++) {
    myArrOfRandomIndexesONE.push(i);
  }

  // randomize nums

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  // use randomize func
  shuffle(myArrOfRandomIndexesONE);

  // console.log(myArrOfRandomIndexes);

  const randomEmptyCellsONE = [];

  const myOneUniqueCellPosition = [];

  for (let i = 0; i <= emptyCellsONE.length - 1; i++) {
    randomEmptyCellsONE.push(emptyCellsONE[myArrOfRandomIndexesONE[i]]);
  }

  for (let q = 0; q <= randomEmptyCellsONE.length - 1; q++) {
    if (
      randomEmptyCellsONE[q] === document.getElementById("cell-0-0") ||
      randomEmptyCellsONE[q] === document.getElementById("cell-1-0") ||
      randomEmptyCellsONE[q] === document.getElementById("cell-2-0")
    ) {
      console.log(
        "randomEmptyCellsONE[q] === getCells('#cell-`1,2 or 3`-0')",
        randomEmptyCellsONE[q]
      );
      continue;
    } else {
      console.log("good");
      myOneUniqueCellPosition.push(randomEmptyCellsONE[q]);
      console.log("myOneUniqueCellPosition", myOneUniqueCellPosition);
      break;
    }
  }
  console.log("randomEmptyCellsONE: ", randomEmptyCellsONE);
  // const firstSMTH = randomEmptyCellsONE[0];
  // const b = firstSMTH.style.backgroundColor;
  // console.log("b ", b);

  console.log("emptyCellsWithFFF: ", emptyCellsWithFFF);

  console.log("notReallyEmptyCells: ", notReallyEmptyCells);
}

// --- 21.04/2023 ---

const gridElement = document.getElementsByClassName("ball"); // add also with class .empty
const cellZero = getCells("#cell-0-0");

for (let d = 0; d < gridElement.length; d++) {
  gridElement[d].addEventListener("click", function (something) {
    if (something.currentTarget != 1) {
      console.log("gridElement[d]: ", gridElement[d] === cellZero[0]);
    }
  });
}

function isLineWithFivePlusBalls() {
  var lineSets = [];
  var allCells = document.getElementById("grid").childNodes;

  for (var i = 0; i < allCells.length; i++) {
    var lines = getLines(allCells[i]);
    if (lines) {
      lineSets.push(lines);
    }
  }

  // Checks if five-ball lines are found after adding balls
  if (lineSets.length > 0) {
    removeLines(lineSets);
  }
}

function findEmptyCellWithPrediction() {
  const allCellsWithEmptyClass = getCells(".empty");
  let emptyCellWithPrediction = [];
  for (let j = 0; j < allCellsWithEmptyClass.length; j++) {
    if (
      allCellsWithEmptyClass[j].style.backgroundColor === "blue" ||
      allCellsWithEmptyClass[j].style.backgroundColor === "cyan" ||
      allCellsWithEmptyClass[j].style.backgroundColor === "red" ||
      allCellsWithEmptyClass[j].style.backgroundColor === "brown" ||
      allCellsWithEmptyClass[j].style.backgroundColor === "green" ||
      allCellsWithEmptyClass[j].style.backgroundColor === "yellow" ||
      allCellsWithEmptyClass[j].style.backgroundColor === "magenta"
    ) {
      emptyCellWithPrediction.push(cell4_8[j]);
    }
  }
  console.log("!!!emptyCellWithPrediction: ", emptyCellWithPrediction);
}
// -------------------------------

function checkIfLineTest() {
  const allCellsWithBall = getCells(".ball");
  const cellsWithBallForTest = [];
  // if (cell4_8[0].style.backgroundColor === "rgb(221, 221, 221)") {
  for (let j = 0; j < allCellsWithBall.length; j++) {
    if (
      allCellsWithBall[j].id === "cell-0-6" ||
      allCellsWithBall[j].id === "cell-1-6" ||
      allCellsWithBall[j].id === "cell-2-6" ||
      allCellsWithBall[j].id === "cell-3-6" ||
      allCellsWithBall[j].id === "cell-4-6" ||
      allCellsWithBall[j].id === "cell-5-6" ||
      allCellsWithBall[j].id === "cell-6-6" ||
      allCellsWithBall[j].id === "cell-7-6" ||
      allCellsWithBall[j].id === "cell-8-6" ||
      allCellsWithBall[j].id === "cell-0-7" ||
      allCellsWithBall[j].id === "cell-1-7" ||
      allCellsWithBall[j].id === "cell-2-7" ||
      allCellsWithBall[j].id === "cell-3-7" ||
      allCellsWithBall[j].id === "cell-4-7" ||
      allCellsWithBall[j].id === "cell-5-7" ||
      allCellsWithBall[j].id === "cell-6-7" ||
      allCellsWithBall[j].id === "cell-7-7" ||
      allCellsWithBall[j].id === "cell-8-7"

      // allEmptyCells[j].style.backgroundColor === "cyan" ||
    ) {
      cellsWithBallForTest.push(allCellsWithBall[j]);
    }
  }
  console.log("allCellsWithBall", allCellsWithBall);
  var lineSets = [];
  console.log("lineSets", lineSets);
  for (var i = 0; i < cellsWithBallForTest.length; i++) {
    var lines = getLines(cellsWithBallForTest[i]);
    if (lines) {
      lineSets.push(lines);
    }
  }
  console.log("lineSets", lineSets);
  // Checks if five-ball lines are found after adding balls
  if (lineSets.length > 0) {
    removeLines(lineSets);
    console.log("lineSets", lineSets);
    console.log("10 POINTS TO GRIFFINDOR(ball was added by comp)");
    // maybe here I also need to add smht like "refreshIntervalId = setInterval(timer, 250);", but not sure, need to test
  } else {
    // Checks if the grid is completely filled with balls
    if (getCells(".empty").length === 0) {
      // -----------------------------------
      // Ends the game
      console.log("returned gameOver from string 519");
      return gameOver();
    }
  }
}
checkIfLineTest();

// -------------------------------

function checkIfLineForProduction() {
  const allCellsWithBall = getCells(".ball");

  console.log("allCellsWithBall", allCellsWithBall);
  var lineSets = [];
  console.log("lineSets", lineSets);
  for (var i = 0; i < allCellsWithBall.length; i++) {
    var lines = getLines(allCellsWithBall[i]);
    if (lines) {
      lineSets.push(lines);
    }
  }
  console.log("lineSets", lineSets);
  // Checks if five-ball lines are found after adding balls
  if (lineSets.length > 0) {
    removeLines(lineSets);
    console.log("lineSets", lineSets);
    console.log("10 POINTS TO GRIFFINDOR(ball was added by comp)");
    // maybe here I also need to add smht like "refreshIntervalId = setInterval(timer, 250);", but not sure, need to test
  } else {
    // Checks if the grid is completely filled with balls
    if (getCells(".empty").length === 0) {
      // -----------------------------------
      // Ends the game
      console.log("SMTH)))");
      return gameOver();
    }
  }
}
checkIfLineForProduction();
// -------------------------------
// -
// -
// -
// -
// -
// -
// -

function shuffleTwo(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
const shaffled = shuffleTwo(emptyCellsWithFFF);
console.log("SHAFFLED: ", shaffled);
