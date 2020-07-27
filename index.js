const { initializeOpen } = require('./src/open');
const { parseMap } = require('./src/parseMap');
const { printMap } = require('./src/printMap');
const { handleZeros } = require('./src/handleZeros');
const testData = require('./src/testData');

const ACTIVE_TEST = 'test3';
const { map, result, mines, solvable } = testData[ACTIVE_TEST];
initializeOpen(result);

const solveMine = (map, n) => {
  const m = parseMap(map, n);
  console.log('parsed:\n', printMap(m));

  handleZeros(m);

  return printMap(m);
};

const output = solveMine(map, mines);

console.log('---------');
console.log(`output:\n${output}`);
console.log('Should be solvable?', solvable);
