const chalk = require('chalk');

const printMap = (m) => {
  return m
    .map((row) =>
      row
        .map((cell) => {
          if (cell.solved) {
            return chalk.green(cell.value);
          }
          return cell.value;
        })
        .join(' ')
    )
    .join(`\n`);
};

module.exports = { printMap };
