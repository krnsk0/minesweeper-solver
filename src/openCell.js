const { open } = require('./open');

const openCell = (m, row, col) => {
  const result = open(row, col);
  if (result === 'open a mine, Booom!') throw 'boom';
  else {
    m[row][col].value = result;
  }
};

module.exports = { openCell };
