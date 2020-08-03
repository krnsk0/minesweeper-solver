const isValid = (s) =>
  ['?', '0', '1', '2', '3', '4', '5', '6', '7', '8'].includes(s);

const parseMap = (map, n) => {
  const m = map.split(`\n`).map((row) =>
    row
      .split(` `)
      .filter(isValid)
      .map((value) => {
        const output = value === '?' ? value : parseInt(value);
        return output;
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
