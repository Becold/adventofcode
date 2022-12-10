const Fs = require('fs')

const input = Fs.readFileSync('input.txt', { encoding: 'utf-8' });
const rows = input.split('\r\n');

let sum = 0;
for (let row of rows) {
  const parts = row.split(',');
  const elve1 = parseRange(parts[0]);
  const elve2 = parseRange(parts[1]);

  if (elve1.start >= elve2.start && elve1.end <= elve2.end) sum++;
  else if (elve2.start >= elve1.start && elve2.end <= elve1.end) sum++;
}

console.log(sum);

function parseRange(part) {
  const parts = part.split('-');
  return {start: +parts[0], end: +parts[1]};
}