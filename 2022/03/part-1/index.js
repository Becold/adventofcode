const Fs = require('fs')

const input = Fs.readFileSync('input.txt', { encoding: 'utf-8' });
const rows = input.split('\r\n');

function getCommonLetter(item1, item2) {
  const set1 = new Set(item1);
  const set2 = new Set(item2);
  for (const item of set1) {
    if (set2.has(item)) {
      return item;
    }
  }
  return null;
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
for (const line of rows) {
  const item1 = line.slice(0, line.length / 2);
  const item2 = line.slice(line.length / 2);

  const commonItemType = getCommonLetter(item1, item2);
  if (commonItemType) {
    sum += getPriority(commonItemType);
  }
}

console.log(sum);