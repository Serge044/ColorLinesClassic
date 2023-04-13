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
