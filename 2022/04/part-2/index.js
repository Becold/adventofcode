const Fs = require('fs')

const input = Fs.readFileSync('input.txt', { encoding: 'utf-8' });
const rows = input.split('\r\n');

let sum = 0;
for (let row of rows) {
  const parts = row.split(',');
  const elve1 = parseRange(parts[0]);
  const elve2 = parseRange(parts[1]);

  if (isOverlapping(elve1, elve2)) sum++;
}

console.log(sum);

function parseRange(part) {
  const parts = part.split('-');
  return {start: +parts[0], end: +parts[1]};
}

function isOverlapping(range1, range2) {
  return range1.end >= range2.start && range1.start <= range2.end;
}