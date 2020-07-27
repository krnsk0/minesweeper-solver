const chalk = require('chalk');

const openFactory = (result) => (row, column) => {
  const m = parseMap(result);
  if (m[row][column].value === 'x') return 'open a mine, Booom!';
  else return m[row][column].value;
};
const result = `1 x x 1 0 0 0
2 3 3 1 0 1 1
1 x 1 0 0 1 x
1 1 1 0 0 1 1
0 1 1 1 0 0 0
0 1 x 1 0 0 0
0 1 1 1 0 1 1
0 0 0 0 0 1 x
0 0 0 0 0 1 1`;

const open = openFactory(result);

// SOLUTION
const parseMap = (map, n) => {
  const m = map.split(`\n`).map((row) =>
    row.split(` `).map((value) => {
      return {
        value,
      };
    })
  );
  if (n) m.n = n;
  m.width = m[0].length;
  m.height = m.length;
  return m;
};

const openCell = (m, row, col) => {
  const result = open(row, col);
  if (result === 'open a mine, Booom!') throw 'boom';
  else {
    m[row][col].value = result;
  }
};

const printMap = (m) => {
  return m
    .map((row) =>
      row
        .map((cell) => {
          if (cell.hypothesis) return chalk.bgBlue.black(cell.hypothesis);
          return cell.value;
        })
        .join(' ')
    )
    .join(`\n`);
};

const getSurroundingCellRefs = (row, col, width, height) => {
  const cellRefs = [
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
      return x >= 0 && y >= 0 && x < height && y < width;
    });
  return cellRefs;
};

const doesBoardHaveZeros = (m) =>
  m.some((row) => row.some((cell) => cell.value === '0'));

const handleZeros = (m) => {
  while (doesBoardHaveZeros(m)) {
    m.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.value === '0') {
          m[rowIndex][colIndex].value = '.';
          getSurroundingCellRefs(rowIndex, colIndex, m.width, m.height)
            // filter out cells that are alrady solved
            .filter(([row, col]) => m[row][col].value !== '.')
            .forEach((cell) => openCell(m, ...cell));
        }
      });
    });
  }
};

// eslint-disable-next-line no-unused-vars
const generateBinaryStrings = (length, totalOnesAllowed) => {
  const output = [];
  const recurse = (length, str = '') => {
    if (str.length >= length) {
      let count = 0;
      for (let i = 0; i < str.length; i += 1) {
        if (str[i] === 'x') count += 1;
      }
      if (count <= totalOnesAllowed) output.push(str);
      return;
    }
    recurse(length, str + '-');
    recurse(length, str + 'x');
  };
  recurse(length);
  return output;
};

const solveMine = (map, n) => {
  // initialization
  const m = parseMap(map, n);

  handleZeros(m);

  return printMap(m);
};

// TESTS
const map = `? ? ? ? 0 0 0
? ? ? ? 0 ? ?
? ? ? 0 0 ? ?
? ? ? 0 0 ? ?
0 ? ? ? 0 0 0
0 ? ? ? 0 0 0
0 ? ? ? 0 ? ?
0 0 0 0 0 ? ?
0 0 0 0 0 ? ?`;

const output = solveMine(map, 6);
console.log(`output\n${output}`);
