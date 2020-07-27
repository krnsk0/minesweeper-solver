let m;

const initializeOpen = (result) => {
  m = result.split(`\n`).map((row) => row.split(` `));
};

const open = (row, column) => {
  if (m[row][column] === 'x') return 'open a mine, Booom!';
  else return m[row][column];
};

module.exports = { open, initializeOpen };
