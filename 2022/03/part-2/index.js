const Fs = require('fs')

const input = Fs.readFileSync('input.txt', { encoding: 'utf-8' });
const rows = input.split('\r\n');

function getCommonLetter(elves) {
  return elves.map(i => i.split('')).reduce((a,b) => a.filter((n) => b.includes(n)))[0];
}

function getPriority(itemType) {
  if (itemType === itemType.toLowerCase()) {
    return itemType.charCodeAt(0) - 96;
  } else if (itemType === itemType.toUpperCase()) {
    return itemType.charCodeAt(0) - 38;
  }
  return 0;
}

let sum = 0;
const threeElfGroups = rows.reduce((a, e, i) => (i % 3 !== 0 ? a[a.length - 1].push(e) : a.push([e])) && a, []);
for (const group of threeElfGroups) {
  const commonItemType = getCommonLetter(group);
  if (commonItemType) {
    sum += getPriority(commonItemType);
  }
}

console.log(sum);