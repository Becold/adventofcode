const Fs = require('fs')

const row = Fs.readFileSync('input.txt', { encoding: 'utf-8' });

for (var i = 0; i < row.length - 14 && isLetterDuplicated(row, i, 14); i++);

console.log(i + 14);

function isLetterDuplicated(row, index, offset) {
  const part = row.substring(index, index + offset);
  return [...new Set(part)].length !== part.length;
}