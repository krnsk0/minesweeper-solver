const chalk = require('chalk');

const openFactory = (result) => (row, column) => {
  const m = parseMap(result);
  if (m[row][column] === 'x') return 'open a mine, Booom!';
  else return m[row][column];
};
const result = `1 x 1 1 x 1
2 2 2 1 2 2
2 x 2 0 1 x
2 x 2 1 2 2
1 1 1 1 x 1
0 0 0 1 1 1`;

const open = openFactory(result);

// SOLUTION
const parseMap = (map, n) => {
  const m = map.split(`\n`).map((row) => row.split(` `));
  if (n) m.n = n;
  m.width = m[0].length;
  m.height = m.length;
  return m;
};

const openCell = (m, row, col) => {
  const result = open(row, col);
  if (result === 'open a mine, Booom!') throw 'boom';
  else {
    m[row][col] = result;
  }
};

const printMap = (m) => {
  return m.map((row) => row.join(' ')).join(`\n`);
};

const getSurroundingCellRefs = (row, col, height, width) => {
  return [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ]
    .map(([x, y]) => [row + x, col + y])
    .filter(([x, y]) => {
      return x >= 0 && y >= 0 && x < width && y < height;
    });
};

const doesBoardHaveZeros = (m) =>
  m.some((row) => row.some((cell) => cell === '0'));

const handleZeros = (m) => {
  while (doesBoardHaveZeros(m)) {
    m.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === '0') {
          m[rowIndex][colIndex] = '.';
          getSurroundingCellRefs(rowIndex, colIndex, m.height, m.width)
            // filter out cells that are alrady solved
            .filter(([row, cell]) => m[row][cell] !== '.')
            .forEach((cell) => openCell(m, ...cell));
        }
      });
    });
  }
};

const isCellPossibleSolvable = (m, row, col) => {
  if (m[row][col] === '?') {
    const surroundingCellRefs = getSurroundingCellRefs(
      row,
      col,
      m.width,
      m.height
    );
    return surroundingCellRefs.some(([r, c]) => !['?', '.'].includes(m[r][c]));
  }
  return false;
};

getSolvables = (m) => {
  const solvables = [];
  m.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (isCellPossibleSolvable(m, rowIndex, colIndex)) {
        solvables.push([rowIndex, colIndex]);
      }
    });
  });
  return solvables;
};

const solveMine = (map, n) => {
  // initialization
  const m = parseMap(map, n);

  handleZeros(m);

  solvables = getSolvables(m);
  console.log('solvables: ', solvables);

  return printMap(m);
};

// TESTS
const map = `? ? ? ? ? ?
? ? ? ? ? ?
? ? ? 0 ? ?
? ? ? ? ? ?
? ? ? ? ? ?
0 0 0 ? ? ?`;

const output = solveMine(map, 6);
console.log(`output\n${output}`);
