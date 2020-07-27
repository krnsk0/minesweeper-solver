const isClue = (s) => ['0', '1', '2', '3', '4', '5', '6', '7', '8'].includes(s);

const parseMap = (map, n) => {
  const m = map.split(`\n`).map((row) =>
    row.split(` `).map((value) => {
      const isAClue = isClue(value);
      return {
        // the original string value from map
        value,
        // is solved already? boolean
        solved: false,
        // boolean - is this a clue?
        isClue: isAClue,
        // the value as a number if it's a clue, else false
        clueValue: isAClue ? parseInt(value) : false,
      };
    })
  );
  // store the number of mines remaining
  if (n) m.n = n;
  // the width as number
  m.width = m[0].length;
  // the height as number
  m.height = m.length;
  return m;
};

module.exports = { parseMap };
