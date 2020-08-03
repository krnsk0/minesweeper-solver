const { open } = require('./open');

const openCell = (m, row, col) => {
  const result = open(row, col);
  if (result === 'x') throw 'boom';
  else {
    m[row][col] = parseInt(result);
  }
};

module.exports = { openCell };
