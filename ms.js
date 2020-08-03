// eslint-disable-next-line no-unused-vars
const generateBinaryStrings = (length, totalOnesAllowed) => {
  const output = [];
  const recurse = (length, str = '') => {
    if (str.length >= length) {
      let count = 0;
      for (let i = 0; i < str.length; i += 1) {
        if (str[i] === 'x') count += 1;
      }
      if (count <= totalOnesAllowed) output.push(str);
      return;
    }
    recurse(length, str + '-');
    recurse(length, str + 'x');
  };
  recurse(length);
  return output;
};
