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
          if (cell.solvable) return chalk.bgBlue.black(cell.value);
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

const isCellPossibleSolvable = (m, row, col) => {
  if (m[row][col].value === '?') {
    const surroundingCellRefs = getSurroundingCellRefs(
      row,
      col,
      m.width,
      m.height
    );
    return surroundingCellRefs.some(
      ([r, c]) => !['?', '.'].includes(m[r][c].value)
    );
  }
  return false;
};

markPoentialSolvables = (m) => {
  m.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (isCellPossibleSolvable(m, rowIndex, colIndex)) {
        m[rowIndex][colIndex].solvable = true;
      }
    });
  });
};

const getAdjacentConstraints = (m, coords) => {
  const constraints = getSurroundingCellRefs(...coords, m.width, m.height);
};

getPotentialSolveableRefs = (m) => {
  return m.reduce((outerAcc, row, rowIndex) => {
    outerAcc.push(
      ...row.reduce((innerAcc, cell, colIndex) => {
        if (cell.solvable) {
          const coords = [rowIndex, colIndex];
          const constraints = getAdjacentConstraints(m, coords);
          innerAcc.push({ coords });
        }
        return innerAcc;
      }, [])
    );
    return outerAcc;
  }, []);
};

const generateBinaryStrings = (length, totalOnesAllowed) => {
  const output = [];
  const recurse = (length, str = '') => {
    if (str.length >= length) {
      let count = 0;
      for (let i = 0; i < str.length; i += 1) {
        if (str[i] === '1') count += 1;
      }
      if (count <= totalOnesAllowed) output.push(str);
      return;
    }
    recurse(length, str + '0');
    recurse(length, str + '1');
  };
  recurse(length);
  return output;
};

const binary = generateBinaryStrings(10, 8);
console.log('binary: ', binary);

const solveMine = (map, n) => {
  // initialization
  const m = parseMap(map, n);

  handleZeros(m);

  openCell(m, 0, 0);

  markPoentialSolvables(m);

  const solvables = getPotentialSolveableRefs(m);

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
