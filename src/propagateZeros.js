const { getNeighbors } = require('./getNeighbors');
const { openCell } = require('./openCell');

const doesBoardHaveZeros = (m) =>
  m.some((row) => row.some((cell) => cell === 0));

const propagateZeros = (m) => {
  while (doesBoardHaveZeros(m)) {
    m.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) {
          m[rowIndex][colIndex] = '.';
          getNeighbors(rowIndex, colIndex, m.width, m.height)
            .filter(([row, col]) => m[row][col] !== '.')
            .forEach((cell) => openCell(m, ...cell));
        }
      });
    });
  }
};

module.exports = { propagateZeros };
