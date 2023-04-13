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

  // Game DOM elements
  var gridElement, forecastElement, scoreElement, recordElement;

  // added

  var forecastPositionsForThreeBalls;
  var threeElems;
  // var myFlag = false;

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
    forecastBalls();

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
            // ---------------------------- place where I check where I clicked (modified 03.04.2023), need to work on clicking on empty square ---------------------------------------------------
            // var emptyCells2 = getCells(".empty");

            // const forecastFourth = forecast[3];
            // const FourthElem = threeElems[3];

            // console.log("ForecastFourth: ", forecastFourth);

            console.log("one, ", threeElems[0]);
            console.log("two, ", e.currentTarget);
            console.log("threeElems, ", threeElems);
            console.log("FORECAST", forecast);

            if (blocked) {
              return;
            } else if (e.currentTarget === threeElems[0]) {
              // threeElems.splice(0, 1);
              const secondElem = threeElems[1];
              const thirdElem = threeElems[2];
              const FourthElem = threeElems[3];
              threeElems = [];
              threeElems.push(secondElem);
              threeElems.push(thirdElem);
              threeElems.push(FourthElem);

              const forecastSecond = forecast[1];
              const forecastThird = forecast[2];
              const forecastFourth = forecast[0];

              forecast = [];
              forecast.push(forecastSecond);
              forecast.push(forecastThird);

              forecast.push(forecastFourth);

              console.log("SHOW ME: ", threeElems);

              // added 08.04.2023
              // if (
              //   typeof threeElems[0] === "undefined" &&
              //   typeof threeElems[1] === "undefined" &&
              //   typeof threeElems[2] === "undefined"
              // ) {
              //   addBalls(gameOver);
              //   init();
              // }

              onEmptyCellClick(e);
              console.log("Hello elem 1. threeElems : ", threeElems);
            } else if (e.currentTarget === threeElems[1]) {
              // threeElems.splice(-1);
              console.log("SHOW ME2: ", threeElems);
              const firstElem = threeElems[0];
              const thirdElem = threeElems[2];
              const FourthElem = threeElems[3];
              threeElems = [];
              threeElems.push(firstElem);
              threeElems.push(thirdElem);

              threeElems.push(FourthElem);

              const forecastFirst = forecast[0];
              const forecastThird = forecast[2];
              const forecastFourth = forecast[1];
              forecast = [];
              forecast.push(forecastFirst);
              forecast.push(forecastThird);

              forecast.push(forecastFourth);

              onEmptyCellClick(e);
              console.log("Hello elem 2. threeElems : ", threeElems);
            } else if (e.currentTarget === threeElems[2]) {
              console.log("SHOW ME2: ", threeElems);
              const firstElem = threeElems[0];
              const secondElem = threeElems[1];
              const FourthElem = threeElems[3];
              threeElems = [];
              threeElems.push(firstElem);
              threeElems.push(secondElem);

              threeElems.push(FourthElem);

              const forecastFirst = forecast[0];
              const forecastSecond = forecast[1];
              const forecastFourth = forecast[2];
              forecast = [];
              forecast.push(forecastFirst);
              forecast.push(forecastSecond);

              forecast.push(forecastFourth);

              onEmptyCellClick(e);
              console.log("Hello elem 3. threeElems : ", threeElems);
            } else if (e.currentTarget.className === "empty") {
              // myFlag = false;
              onEmptyCellClick(e);
            } else {
              onBallClick(e);
            }
          },
          false
        );
      }
    }

    // Adds random balls on the grid

    // console log for test
    // console.log("3 elems ", threeElems);

    // addBalls();

    // ------------------------- added here my specific balls on specific place, now not active(if needed - uncomment func call below) -------------------------

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

      function addBallsRed() {
        blocked = true;
        var cells = [];

        for (var i = 0; i < 50; i++) {
          var emptyCells = getCells(".empty");
          if (true) {
            // Gets random empty cell
            var cell = emptyCells[0];
            grid[cell.dataset.y][cell.dataset.x] = colors.key("red");
            cells.push(cell);
            cell.className = "ball " + "red" + " fadein";
          }
        }
      }

      function addBallsYellow() {
        blocked = true;
        var cells = [];

        for (var i = 0; i < 25; i++) {
          var emptyCells = getCells(".empty");
          if (true) {
            // Gets random empty cell
            var cell = emptyCells[0];
            grid[cell.dataset.y][cell.dataset.x] = colors.key("yellow");
            cells.push(cell);
            cell.className = "ball " + "yellow" + " fadein";
          }
        }
      }

      // addBallsOne();
      // addBallsTwo();
      // addBallsThree();
      addBallsRed();
      addBallsYellow();
    }
    addThreeBalls();

    // ------------------------------ func for very first iteration (0) ------------------------------------------------------

    function newAddBall(callback) {
      blocked = true;
      var cells = [];

      for (var i = 0; i < 3; i++) {
        var emptyCells = getCells(".empty");
        //   threeElems
        // console.log("empty cells: ", emptyCells);
        if (emptyCells.length > 0) {
          // Gets random empty cell
          var cell = emptyCells[rand(0, emptyCells.length - 1)];
          grid[cell.dataset.y][cell.dataset.x] = colors.key(forecast[i]);

          cells.push(cell);
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

      // Generates forecast balls
      forecastBalls();
    }
    newAddBall();
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

              // ----------------------------------- I changed it. Still need to improve the logic of Game Over with my forecasting -----------------------------------

              // if (getCells(".empty").length === 0) {
              if (
                getCells(".empty").length === 1
                // getCells(".empty").length > 0 &&
                // getCells(".empty").length < 3
              ) {
                // -----------------------------------
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

  //   ------------------------------------ here ---------------------------------------------------------------
  //   ------------------------------ func for second - infinity iteration (1 - ...) ------------------------------------------------------

  function addBalls(callback) {
    blocked = true;
    var cells = [];
    const howManyEmpty = getCells(".empty");
    console.log("HOW MANY EMPTY: ", howManyEmpty);

    // console.log("myFlag: ", myFlag);

    // changed from 3 to 4 iterations --------------------
    for (var i = 0; i < 3; i++) {
      var emptyCells = threeElems;
      //  -------------------------------------- added this for skiping one iteration when arr contains two elems(probably don't need it now) --------------------------------------
      if (emptyCells[i] === undefined) {
        continue;
      }
      // --------------------------------------
      //   threeElems
      //   console.log("empty cells: ", emptyCells);
      if (emptyCells.length > 0) {
        // Gets random empty cell
        // var cell = emptyCells[rand(0, emptyCells.length - 1)];
        var cell = emptyCells[i];
        grid[cell.dataset.y][cell.dataset.x] = colors.key(forecast[i]);

        cells.push(cell);
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

    // Generates forecast balls
    forecastBalls();
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
    //   ------------------------------------ here forecasting for colors and place for balls ---------------------------------------------------------------
    // var emptyCells = document.querySelectorAll(".empty");
    var emptyCells = getCells(".empty");

    // ----------------------- remove previous predicted color after every iteration  -----------------------

    var cellsWithBalls = getCells(".ball");

    cellsWithBalls.forEach((elem) => (elem.style.backgroundColor = "#ddd"));

    // ------------------------------------------------------------------------------------------------------

    threeElems = [];

    // added by menubar, not in use now
    // var myElements = Array.from(emptyCells);

    // changed from 3 to 4 iterations -------- додати перевірку щоб усі 4 елементи були унікальни(так як використовується рандом - по ідеї можливі дублікації)------------

    // ------------------ start 07.04.2023----------------------------------------
    var myArrOfRandomIndexes = [];

    for (var i = 0; i <= emptyCells.length - 1; i++) {
      myArrOfRandomIndexes.push(i);
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
    shuffle(myArrOfRandomIndexes);

    // console.log(myArrOfRandomIndexes);

    const randomEmptyCells = [];

    for (let i = 0; i <= emptyCells.length - 1; i++) {
      randomEmptyCells.push(emptyCells[myArrOfRandomIndexes[i]]);
    }

    // console.log("!!!emptyCells!!!: ", emptyCells);
    console.log("!!!randomEmptyCells!!!: ", randomEmptyCells);

    for (let k = 0; k < 4; k++) {
      // threeElems.push(emptyCells[k]);
      // added random

      // changed it 07.04.2023
      // threeElems.push(emptyCells[rand(0, emptyCells.length - 1)]);
      threeElems.push(randomEmptyCells[k]);
      // ------------------ end 07.04.2023----------------------------------------
    }
    console.log("threeElems ", threeElems);

    // ----- start 08.04.2023 ------
    // let flag;
    // console.log("FLAG ", flag);
    var howManyBalls = getCells(".ball");
    console.log("howManyBalls: ", howManyBalls);
    function addLastBall() {
      blocked = true;
      var cells = [];

      for (var i = 0; i < 1; i++) {
        var emptyCells = getCells(".empty");
        if (true) {
          // Gets random empty cell
          var cell = emptyCells[0];
          grid[cell.dataset.y][cell.dataset.x] = colors.key("red");
          cells.push(cell);
          cell.className = "ball " + "cyan" + " fadein";
        }
      }
    }
    if (
      typeof threeElems[0] != "undefined" &&
      typeof threeElems[1] === "undefined"

      // typeof threeElems[0] === "undefined" &&
      // emptyCells.length === 0
    ) {
      // look here
      // addLastBall();
      addBalls(gameOver);
    }
    // flag = true;

    // console.log("FLAG ", flag);
    // ----- end 08.04.2023 ------

    forecast = [];
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
      //   console.log(forecast[i]);

      ball.className = "ball " + forecast[i];
      // console.log("forecast ball: ", forecast[i]);
      // console.log("---------");
      forecastElement.appendChild(ball);
      // added
      forecastPositionsForThreeBalls.appendChild(predictPosition);

      // if (emptyCells.length > 0 && emptyCells.length < 3) {
      //   gameOver();
      // }
      console.log("THIS: ", emptyCells.length);
    }

    // ---------------------- !!!!!!!!!!!!!!!!! work here with forecasting colors on cells !!!!!!!!!!!!!!!!! ----------------------------------------------------

    // console.log("threeElems[0] ", threeElems[0]);
    // console.log(typeof threeElems[0] === "undefined");
    if (typeof threeElems[0] != "undefined") {
      const myFirstElemWithInlineStyle = threeElems[0];
      const mySecondElemWithInlineStyle = threeElems[1];
      const myThirdElemWithInlineStyle = threeElems[2];

      myFirstElemWithInlineStyle.style.backgroundColor = forecast[0];
      mySecondElemWithInlineStyle.style.backgroundColor = forecast[1];
      myThirdElemWithInlineStyle.style.backgroundColor = forecast[2];
    }

    // console.log("threeElems one ", threeElems[0]);
    // --------------------------------------------------------------------------
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
      console.log("GAME OVER!");
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
