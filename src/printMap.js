const chalk = require('chalk');

const printMap = (m) => {
  return m
    .map((row) =>
      row
        .map((cell) => {
          if (cell === '.') {
            return chalk.green(cell);
          }
          if (typeof cell === 'number') {
            return chalk.bgGreen.black(cell);
          }
          return cell;
        })
        .join(' ')
    )
    .join(`\n`);
};

module.exports = { printMap };
