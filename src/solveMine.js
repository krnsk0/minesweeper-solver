const { open } = require('./open');
const { printMap, parseMap } = require('./mapHandling');

const solveMine = (map, n) => {
  const m = parseMap(map, n);

  return printMap(m);
};

module.exports = { solveMine };
