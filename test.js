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
