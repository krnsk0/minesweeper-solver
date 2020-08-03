const { initializeOpen } = require('./src/open');
const { parseMap } = require('./src/parseMap');
const { printMap } = require('./src/printMap');
const { propagateZeros } = require('./src/propagateZeros');
const testData = require('./testData');

const ACTIVE_TEST = 'test5';
const { map, result, mines, solvable } = testData[ACTIVE_TEST];
initializeOpen(result);

const solveMine = (map, n) => {
  const m = parseMap(map, n);

  propagateZeros(m);

  return printMap(m);
};

const output = solveMine(map, mines);

console.log('---------');
console.log(`output:\n${output}`);
console.log('Should be solvable?', solvable);
