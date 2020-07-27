const { getNeighbors } = require('./getNeighbors');
const { openCell } = require('./openCell');

const doesBoardHaveZeros = (m) =>
  m.some((row) =>
    row.some((cell) => cell.value === '0' && cell.solved === false)
  );

const handleZeros = (m) => {
  while (doesBoardHaveZeros(m)) {}
};

module.exports = { handleZeros };
