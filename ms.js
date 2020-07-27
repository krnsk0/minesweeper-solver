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

getPotentialSolveableRefs = (m) => {
  return m.reduce((outerAcc, row, rowIndex) => {
    outerAcc.push(
      ...row.reduce((innerAcc, cell, colIndex) => {
        if (cell.solvable) {
          const coords = [rowIndex, colIndex];
          innerAcc.push(coords);
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

const resetHypotheses = (m) => {
  m.forEach((row) => {
    row.forEach((col) => {
      if (col.hypothesis) delete col.hypothesis;
      if (col.solvable) delete col.solvable;
    });
  });
};

const testClue = (m, [r, c]) => {
  const mineCount = getSurroundingCellRefs(r, c, m.width, m.height).reduce(
    (count, [r, c]) => {
      if (m[r][c].hasOwnProperty('hypothesis') && m[r][c].hypothesis === 'x')
        count += 1;
      else if (m[r][c].value === 'x') count += 1;
      return count;
    },
    0
  );

  const clue = parseInt(m[r][c].value);
  if (mineCount > clue) {
    return 'greater';
  }
  if (mineCount < clue) {
    return 'less';
  }
  return 'equal';
};

const getClueRefs = (m) => {
  const clueRefs = [];
  m.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!isNaN(parseInt(cell.value))) {
        clueRefs.push([rowIndex, colIndex]);
      }
    });
  });
  return clueRefs;
};

const testHypothesis = (m) => {
  const clueRefs = getClueRefs(m);
  return clueRefs.every((clueRef) => {
    const result = testClue(m, clueRef);
    return result === 'less' || result === 'equal';
  });
};

const inferFromPermutations = (validPerms) => {
  console.log('validPerms: ', validPerms);
  const stringLength = validPerms[0].length;
  const output = Array.from({ length: stringLength });

  for (let i = 0; i < stringLength; i += 1) {
    const allX = validPerms.every((perm) => {
      return perm[i] === 'x';
    });
    const allDash = validPerms.every((perm) => {
      return perm[i] === '-';
    });
    console.log('allDash: ', allDash);
    console.log('allX: ', allX);
    if (allX || allDash) {
      output[i] = validPerms[0][i];
    }
  }

  console.log('output: ', output);
};

const permutateAllSolvables = (m) => {
  const solvables = getPotentialSolveableRefs(m);
  const permutations = generateBinaryStrings(solvables.length, m.n);
  const validPerms = permutations.filter((permutation) => {
    // plug in hypothesis
    permutation.split('').forEach((permCell, permIndex) => {
      const [row, col] = solvables[permIndex];
      m[row][col].hypothesis = permCell;
    });

    // test hypothesis
    const testResult = testHypothesis(m);
    // console.log(`testing ${permutation} ; result ${testResult}`);
    return testResult;
  });
  inferFromPermutations(validPerms);
};

const solveMine = (map, n) => {
  // initialization
  const m = parseMap(map, n);

  handleZeros(m);

  markPoentialSolvables(m);

  permutateAllSolvables(m);

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
