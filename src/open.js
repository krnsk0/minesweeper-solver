let m;

const isValid = (s) =>
  ['?', 'x', '0', '1', '2', '3', '4', '5', '6', '7', '8'].includes(s);

const initializeOpen = (result) => {
  m = result.split(`\n`).map((row) => row.split(` `).filter(isValid));
};

const open = (row, column) => {
  if (m[row][column] === 'x') return 'open a mine, Booom!';
  else return m[row][column];
};

module.exports = { open, initializeOpen };
