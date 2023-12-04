const Fs = require('fs')

const input = Fs.readFileSync('input.txt', { encoding: 'utf-8' });
const rows = input.split('\r\n');

const result = rows.map(row => {
    const matches = row.match(/\d/ig);
    if (!matches || matches.length == 0) return 0;
    if (matches.length == 1) return +`${matches[0]}${matches[0]}`;
    else return matches[0] * 10 + +matches[matches.length - 1];
})
.reduce((a, b) => a + b, 0);

console.log(result);