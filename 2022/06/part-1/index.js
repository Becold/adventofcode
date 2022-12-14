const Fs = require('fs')

const row = Fs.readFileSync('input.txt', { encoding: 'utf-8' });

for (var i = 0; i < row.length - 4 && isLetterDuplicated(row, i, 4); i++);

console.log(i + 4);

function isLetterDuplicated(row, index, offset) {
  const part = row.substring(index, index + offset);
  return [...new Set(part)].length !== part.length;
}