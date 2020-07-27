const { initializeOpen } = require('./src/open');
const { solveMine } = require('./src/solveMine');
const testData = require('./src/testData');

const ACTIVE_TEST = 'test1';
const { map, result, mines, solvable } = testData[ACTIVE_TEST];
initializeOpen(result);

const output = solveMine(map, mines);

console.log('---------');
console.log(`output:\n${output}`);
console.log('Should be solvable?', solvable);
