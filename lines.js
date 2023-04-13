/**
 * lines.js
 *
 * Copyright (c) 2014 Arnis Ritins
 * Released under the MIT license
 */
var Lines = (function () {
  "use strict";

  // Game variables
  var grid, forecast, score, record, selected, blocked;

  // ----------------------
  var forecastPosition1, forecastPosition2, forecastPosition3;
  // ----------------------

  // Game DOM elements
  var gridElement, forecastElement, scoreElement, recordElement;

  // added

  var forecastPositionsForThreeBalls;

  // Ball colors
  var colors = {
    1: "blue",
    2: "cyan",
    3: "red",
    4: "brown",
    5: "green",
    6: "yellow",
    7: "magenta",
    key: function (color) {
      for (var key in this) {
        if (this[key] === color) {
          return parseInt(key);
        }
      }
    },
  };

  /**
   * Initializes game
   *
   * @param string
   */
  function init() {
    // Gets game DOM elements
    gridElement = document.querySelector(".grid");
    forecastElement = document.querySelector(".forecast");
    scoreElement = document.querySelector(".score");
    recordElement = document.querySelector(".record");

    // added
    forecastPositionsForThreeBalls = document.querySelector(
      ".class__forecastPositionsForThreeBalls"
    );

    // Sets default game values
    grid = [];
    score = 0;
    blocked = false;
    selected = null;

    // Tries to get the record from the local storage
    record = localStorage.getItem("lines-record") || 0;

    // Generates forecast balls
    // forecastBalls();

    // ------------- here(upper and lower) ----------------
    appeareThreeRedBallsInRandomPosotion();
    // forecastBallsMyColors();

    // Creates grid
    createGrid();

    scoreElement.innerHTML = score;
    recordElement.innerHTML = record;
  }

  /**
   * Creates grid
   */
  function createGrid() {
    // Clears grid element
    gridElement.innerHTML = "";

    for (var i = 0; i < 9; i++) {
      grid[i] = [];
      for (var j = 0; j < 9; j++) {
        grid[i][j] = 0;

        // Creates new cell
        var cell = document.createElement("div");

        // Sets cell attributes
        cell.id = "cell-" + j + "-" + i;
        cell.className = "empty";
        cell.dataset.x = j;
        cell.dataset.y = i;
        cell.style.left = j * 50 + "px";
        cell.style.top = i * 50 + "px";

        // Adds cell to the grid
        gridElement.appendChild(cell);

        // Listens for a click event
        cell.addEventListener(
          "click",
          function (e) {
            if (blocked) {
              return;
            } else if (e.currentTarget.className === "empty") {
              onEmptyCellClick(e);
            } else {
              onBallClick(e);
            }
          },
          false
        );
      }
    }

    // ---------------- work here with addBalls2 & addBalls2 .. ---------------------------

    // Adds random balls on the grid
    addBalls2();
    addBalls3();
    addBalls4();
    addBalls5();
    // addThreeBalls();
    addBalls();
  }

  function addBalls2() {
    blocked = true;
    var cells = [];

    for (var i = 0; i < 1; i++) {
      var emptyCells = getCells("#cell-8-8");
      if (emptyCells.length > 0) {
        // Gets random empty cell
        var cell = emptyCells[0];
        grid[cell.dataset.y][cell.dataset.x] = colors.key("green");
        cells.push(cell);
        cell.className = "ball " + "green" + " fadein";
      }
    }
  }

  function addBalls3() {
    blocked = true;
    var cells = [];

    for (var i = 0; i < 1; i++) {
      var emptyCells = getCells("#cell-7-8");
      if (emptyCells.length > 0) {
        // Gets random empty cell
        var cell = emptyCells[0];
        grid[cell.dataset.y][cell.dataset.x] = colors.key("green");
        cells.push(cell);
        cell.className = "ball " + "green" + " fadein";
      }
    }
  }

  function addBalls4() {
    blocked = true;
    var cells = [];

    for (var i = 0; i < 1; i++) {
      var emptyCells = getCells("#cell-0-8");
      if (emptyCells.length > 0) {
        // Gets random empty cell
        var cell = emptyCells[0];
        grid[cell.dataset.y][cell.dataset.x] = colors.key("yellow");
        cells.push(cell);
        cell.className = "ball " + "yellow" + " fadein";
      }
    }
  }

  function addBalls5() {
    blocked = true;
    var cells = [];

    for (var i = 0; i < 1; i++) {
      var emptyCells = getCells("#cell-0-7");
      if (emptyCells.length > 0) {
        // Gets random empty cell
        var cell = emptyCells[0];
        grid[cell.dataset.y][cell.dataset.x] = colors.key("yellow");
        cells.push(cell);
        cell.className = "ball " + "yellow" + " fadein";
      }
    }
  }

  function addThreeBalls() {
    function addBallsOne() {
      blocked = true;
      var cells = [];

      for (var i = 0; i < 1; i++) {
        var emptyCells = getCells("#cell-0-0");
        if (emptyCells.length > 0) {
          // Gets random empty cell
          var cell = emptyCells[0];
          grid[cell.dataset.y][cell.dataset.x] = colors.key("red");
          cells.push(cell);
          cell.className = "ball " + "red" + " fadein";
        }
      }
    }

    function addBallsTwo() {
      blocked = true;
      var cells = [];

      for (var i = 0; i < 1; i++) {
        var emptyCells = getCells("#cell-0-1");
        if (emptyCells.length > 0) {
          // Gets random empty cell
          var cell = emptyCells[0];
          grid[cell.dataset.y][cell.dataset.x] = colors.key("red");
          cells.push(cell);
          cell.className = "ball " + "red" + " fadein";
        }
      }
    }

    function addBallsThree() {
      blocked = true;
      var cells = [];

      for (var i = 0; i < 1; i++) {
        var emptyCells = getCells("#cell-0-2");
        if (emptyCells.length > 0) {
          // Gets random empty cell
          var cell = emptyCells[0];
          grid[cell.dataset.y][cell.dataset.x] = colors.key("red");
          cells.push(cell);
          cell.className = "ball " + "red" + " fadein";
        }
      }
    }

    addBallsOne();
    addBallsTwo();
    addBallsThree();
  }

  /**
   * Gets cells by selector
   *
   * @param string
   * @return object
   */
  function getCells(selector) {
    return gridElement.querySelectorAll(selector);
  }

  /**
   * Gets specific cell by x and y coordinates
   *
   * @param integer
   * @param integer
   * @return object
   */
  function getCell(x, y) {
    return document.getElementById("cell-" + x + "-" + y);
  }

  /**
   * Event: ball clicked
   *
   * @param object
   */
  function onBallClick(e) {
    // Unselects previously selected cell
    each(getCells(".ball"), function (cell) {
      if (cell.classList.contains("selected")) {
        cell.classList.remove("selected");
        return;
      }
    });

    // Marks clicked cell as selected
    e.currentTarget.classList.add("selected");
    selected = e.currentTarget;
  }

  /**
   * Event: empty cell clicked
   *
   * @param object
   */
  function onEmptyCellClick(e) {
    // Checks if any cell is selected
    if (!selected) {
      return;
    }

    var to = e.currentTarget,
      from = selected;

    // Tries to find the path
    var astar = new Astar(grid);
    var path = astar.find(
      from.dataset.x,
      from.dataset.y,
      to.dataset.x,
      to.dataset.y
    );

    // Checks if path were found
    if (path) {
      moveBall(from, to, path, function () {
        var lines = getLines(to);

        // Checks if there are five-ball lines for destination cell
        if (lines) {
          removeLines([lines]);
        } else {
          // Adds balls and checks for five-ball lines
          addBalls(function (cells) {
            var lineSets = [];

            for (var i = 0; i < cells.length; i++) {
              var lines = getLines(cells[i]);
              if (lines) {
                lineSets.push(lines);
              }
            }

            // Checks if five-ball lines are found after adding balls
            if (lineSets.length > 0) {
              removeLines(lineSets);
            } else {
              // Checks if the grid is completely filled with balls
              if (getCells(".empty").length === 0) {
                // Ends the game
                return gameOver();
              }
            }
          });
        }
      });
    }
  }

  /**
   * Adds balls on the grid
   *
   * @param function
   */
  function addBalls(callback) {
    blocked = true;
    var cells = [];

    for (var i = 0; i < 3; i++) {
      // збирати всі порожні клітинки і обирати з них 3 рандомні клітинки(+3 кольори), на які будуть поміщені кульки під час наступної ітерації. якщо на одну з цих клітинок під час актуальної ітерації буде поміщена кулька - обрати рандомне місце серед вільних клітинок для цієї кульки(колір має зберігатися).
      var emptyCells = getCells(".empty");
      if (emptyCells.length > 0) {
        // changed -------------------
        // var cell = emptyCells[rand(0, emptyCells.length - 1)];
        const myRowOfCells = [1, 2, 3];
        // var cell = document.querySelector(`#cell-${myRowOfCells[i]}-4`);
        if (typeof forecastPosition1 === "undefined") {
          var cell = emptyCells[rand(0, emptyCells.length - 1)];
          console.log("forecastPosition1: ", forecastPosition1);
          console.log("forecastPosition2: ", forecastPosition2);
          console.log("forecastPosition3: ", forecastPosition3);
          console.log("CELL: ", cell);
          grid[cell.dataset.y][cell.dataset.x] = colors.key(forecast[i]);

          cells.push(cell);
          cell.className = "ball " + forecast[i] + " fadein";
        } else if (i === 0) {
          var cell = forecastPosition1;
          console.log("forecastPosition1: ", forecastPosition1);
          console.log("forecastPosition2: ", forecastPosition2);
          console.log("forecastPosition3: ", forecastPosition3);
          console.log("CELL: ", cell);
          grid[cell.dataset.y][cell.dataset.x] = colors.key(forecast[i]);

          cells.push(cell);
          cell.className = "ball " + forecast[i] + " fadein";
        } else if (i === 1) {
          var cell = forecastPosition2;
          console.log("forecastPosition1: ", forecastPosition1);
          console.log("forecastPosition2: ", forecastPosition2);
          console.log("forecastPosition3: ", forecastPosition3);
          console.log("CELL: ", cell);
          grid[cell.dataset.y][cell.dataset.x] = colors.key(forecast[i]);

          cells.push(cell);
          cell.className = "ball " + forecast[i] + " fadein";
        } else if (i === 2) {
          var cell = forecastPosition3;
          console.log("forecastPosition1: ", forecastPosition1);
          console.log("forecastPosition2: ", forecastPosition2);
          console.log("forecastPosition3: ", forecastPosition3);
          console.log("CELL: ", cell);
          grid[cell.dataset.y][cell.dataset.x] = colors.key(forecast[i]);

          cells.push(cell);
          cell.className = "ball " + forecast[i] + " fadein";
        }
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

  /**
   * Removes lines
   *
   * @param array
   */
  function removeLines(lineSets) {
    blocked = true;

    for (var k in lineSets) {
      var lines = lineSets[k],
        scoreAdd = 0;

      for (var i = 0; i < lines.length; i++) {
        for (var j = 0; j < lines[i].length; j++) {
          var x = lines[i][j][0],
            y = lines[i][j][1];
          var cell = getCell(x, y);

          cell.classList.add("fadeout");
          grid[y][x] = 0;
          scoreAdd += 2;
        }
      }
    }

    // Updates score
    updateScore(scoreAdd);

    // Sets timeout for animation
    setTimeout(function () {
      each(getCells(".fadeout"), function (cell) {
        cell.className = "empty";
      });
      blocked = false;
    }, 300);
  }

  /**
   * Moves ball from one cell to another
   *
   * @param object
   * @param object
   * @param array
   * @param function
   */
  function moveBall(from, to, path, callback) {
    blocked = true;
    grid[from.dataset.y][from.dataset.x] = 0;

    var color = from.classList.item(1);
    var previous;

    // Removes selected ball
    from.className = "empty";
    selected = null;

    for (var i = 0; i <= path.length; i++) {
      (function (i) {
        setTimeout(function () {
          if (path.length == i) {
            // Adds ball to destination cell
            grid[to.dataset.y][to.dataset.x] = colors.key(color);
            to.className = "ball " + color;
            blocked = false;
            return callback();
          }

          if (previous) {
            previous.className = "empty";
          }

          var cell = (previous = getCell(path[i].x, path[i].y));
          cell.className = "ball " + color;
        }, 50 * i);
      })(i);
    }
  }

  /**
   * Gets lines of 5 or more balls
   *
   * @param object
   * @return array|bool
   */
  function getLines(cell) {
    var x = parseInt(cell.dataset.x),
      y = parseInt(cell.dataset.y),
      ball = colors.key(cell.classList.item(1)),
      lines = [[[x, y]], [[x, y]], [[x, y]], [[x, y]]];

    var l, r, d, u, lu, ru, ld, rd;
    l = r = d = u = lu = ru = ld = rd = ball;

    var i = 1;
    while ([l, r, u, d, lu, ru, ld, rd].indexOf(ball) !== -1) {
      // Horizontal lines
      if (l == grid[y][x - i]) {
        lines[0].push([x - i, y]);
      } else {
        l = -1;
      }
      if (r == grid[y][x + i]) {
        lines[0].push([x + i, y]);
      } else {
        r = -1;
      }

      // Vertical lines
      if (y - i >= 0 && u == grid[y - i][x]) {
        lines[1].push([x, y - i]);
      } else {
        u = -1;
      }
      if (y + i <= 8 && d == grid[y + i][x]) {
        lines[1].push([x, y + i]);
      } else {
        d = -1;
      }

      // Diagonal lines
      if (y - i >= 0 && lu == grid[y - i][x - i]) {
        lines[2].push([x - i, y - i]);
      } else {
        lu = -1;
      }
      if (y + i <= 8 && rd == grid[y + i][x + i]) {
        lines[2].push([x + i, y + i]);
      } else {
        rd = -1;
      }
      if (y + i <= 8 && ld == grid[y + i][x - i]) {
        lines[3].push([x - i, y + i]);
      } else {
        ld = -1;
      }
      if (y - i >= 0 && ru == grid[y - i][x + i]) {
        lines[3].push([x + i, y - i]);
      } else {
        ru = -1;
      }

      i++;
    }

    for (var i = lines.length - 1; i >= 0; i--) {
      if (lines[i].length < 5) {
        lines.splice(i, 1);
      }
    }

    // Returns five-ball lines or false
    return lines.length > 0 ? lines : false;
  }

  /**
   * Generates 3 forecast balls
   */
  function forecastBalls() {
    // ------------------------
    // var emptyCells = document.querySelectorAll(".empty");
    var emptyCells = getCells(".empty");
    var threeElems = [];

    var myElements = Array.from(emptyCells);
    for (let k = 0; k < 3; k++) {
      threeElems.push(emptyCells[k]);
    }
    console.log("threeElems ", threeElems);
    console.log("threeElems one ", threeElems[0]);
    // ------------------------

    forecast = [];
    // forecastPosition = []; document.querySelector(`#cell-${myRowOfCells[i]}-4`)
    // forecastPosition1 = document.querySelector(`#cell-8-0`);
    // forecastPosition2 = document.querySelector(`#cell-8-1`);
    // forecastPosition3 = document.querySelector(`#cell-8-2`);
    // forecastPosition = getCells("#cell-0-2");
    // forecastPosition = emptyCells[rand(0, emptyCells.length - 1)];
    forecastElement.innerHTML = "";
    // added
    forecastPositionsForThreeBalls.innerHTML = "";

    for (var i = 0; i < 3; i++) {
      var ball = document.createElement("div");
      // added
      var predictPosition = document.createElement("div");
      predictPosition.className = "SergePredictedPosition";
      // emptyCells.length - just like example
      predictPosition.innerText = emptyCells.length;

      forecast[i] = colors[rand(1, 7)];
      console.log(forecast[i]);

      // ----------------
      // forecastPosition.push(emptyCells[rand(0, emptyCells.length - 1)]);
      // console.log("forecastPosition: ", forecastPosition);
      // ----------------

      ball.className = "ball " + forecast[i];
      // console.log("forecast ball: ", forecast[i]);
      // console.log("---------");
      forecastElement.appendChild(ball);
      // added
      forecastPositionsForThreeBalls.appendChild(predictPosition);
      forecastPosition1 = document.querySelector(`#cell-8-0`);
      forecastPosition2 = document.querySelector(`#cell-8-1`);
      forecastPosition3 = document.querySelector(`#cell-8-2`);
    }
  }

  // ------------------ here ---------------------

  // function forecastBallsMyColors() {}

  // My func appeareThreeRedBallsInRandomPosotion
  function appeareThreeRedBallsInRandomPosotion() {
    forecast = [];
    forecastElement.innerHTML = "";
    let myColors = ["orange", "blue", "blue"];

    for (var i = 0; i < 3; i++) {
      var ball = document.createElement("div");

      forecast[i] = myColors[i];
      ball.className = "empty";
      forecastElement.appendChild(ball);
    }
  }

  /**
   * Updates score
   *
   * @param integer
   */
  function updateScore(add) {
    score += add;

    // Checks if record is beaten
    if (score > record) {
      localStorage.setItem("lines-record", score);
      recordElement.innerHTML = record = score;
    }

    scoreElement.innerHTML = score;
  }

  /**
   * Shows game over alert
   *
   * @param integer
   */
  function gameOver() {
    blocked = true;

    // Shows score and offers to play again
    if (confirm("Game over! Your score is " + score + "!\nPlay again?")) {
      init();
    }
  }

  /**
   * Generates random number between specified interval
   *
   * @param integer
   * @param integer
   * @return integer
   */
  function rand(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

  /**
   * Goes through all objects
   *
   * @param object
   * @param function
   */
  function each(object, callback) {
    for (var i = 0; i < object.length; i++) {
      callback(object[i], i);
    }
  }

  /**
   * Returns public methods
   */
  return {
    init: init,
  };

  /**
   * Finds path by using A* method
   *
   * @param array
   */
  function Astar(grid) {
    var nodes = [];
    var openset = [];

    /**
     * Initializes all nodes
     *
     * @param integer
     * @param integer
     */
    function init(startX, startY) {
      for (var i = 0; i < 9; i++) {
        nodes[i] = [];
        for (var j = 0; j < 9; j++) {
          nodes[i][j] = {
            obstacle: grid[i][j],
            parent: 0,
            f: 0,
            g: 0,
            h: 0,
            x: j,
            y: i,
            closed: false,
          };
        }
      }

      // Adds start node to the openset
      openset.push(nodes[startY][startX]);
    }

    /**
     * Finds the path
     *
     * @param integer
     * @param integer
     * @param integer
     * @param integer
     * @return array|bool
     */
    function find(startX, startY, endX, endY) {
      init(startX, startY);

      // Goes through all open nodes
      while (openset.length) {
        var index = 0;

        // Finds the node index with the highest F value
        for (var i = 0; i < openset.length; i++) {
          if (openset[i].f < openset[index].f) {
            index = i;
          }
        }

        var currentNode = openset[index];

        // Checks if the end node is reached
        if (currentNode.x == endX && currentNode.y == endY) {
          return reconstructPath(currentNode);
        }

        // Removes current node from openlist and sets it as closed
        openset.splice(index, 1);
        currentNode.closed = true;

        // Get all adjecent nodes
        var neighbors = getNeighbors(currentNode);
        for (var i = 0; i < neighbors.length; i++) {
          var neighbor = neighbors[i];

          // Checks if adjecent node is closed or it's not walkable
          if (neighbor.closed || neighbor.obstacle != 0) {
            continue;
          }

          var g = currentNode.g + 1,
            gIsBest = false;

          // Checks if node isn't opened yet
          if (!isOpened(neighbor)) {
            gIsBest = true;
            neighbor.h =
              Math.abs(neighbor.x - endX) + Math.abs(neighbor.y - endY);
            openset.push(neighbor);
          } else if (g < neighbor.g) {
            gIsBest = true;
          }

          if (gIsBest) {
            neighbor.parent = currentNode;
            neighbor.g = g;
            neighbor.f = neighbor.g + neighbor.h;
          }
        }
      }

      // Path is not found
      return false;
    }

    /**
     * Reconstructs path
     *
     * @param object
     * @return array
     */
    function reconstructPath(node) {
      var path = [];
      while (node.parent) {
        path.push(node);
        node = node.parent;
      }

      return path.reverse();
    }

    /**
     * Gets neighbor nodes
     *
     * @param object
     * @return array
     */
    function getNeighbors(node) {
      var neighbors = [],
        x = node.x,
        y = node.y;

      if (y - 1 >= 0) {
        neighbors.push(nodes[y - 1][x]);
      }
      if (y + 1 <= 8) {
        neighbors.push(nodes[y + 1][x]);
      }
      if (x - 1 >= 0) {
        neighbors.push(nodes[y][x - 1]);
      }
      if (x + 1 <= 8) {
        neighbors.push(nodes[y][x + 1]);
      }

      return neighbors;
    }

    /**
     * Checks if node is opened
     *
     * @param object
     * @return array
     */
    function isOpened(node) {
      for (var i = 0; i < openset.length; i++) {
        if (openset[i].x == node.x && openset[i].y == node.y) {
          return true;
        }
      }

      return false;
    }

    /**
     * Returns public methods
     */
    return {
      find: find,
    };
  }
})();
