const Fs = require('fs')

const input = Fs.readFileSync('input.txt', { encoding: 'utf-8' });
const rows = input.split('\r\n');

const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const result = rows
.map(row => {
    row = row.replace(
        /(one|two|three|four|five|six|seven|eight|nine)/g,
        (match, key) => match+match.substring(match.length - 1, match.length)
    );
    let matches = row.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/g)?.map(wordOrNumber => {
        if (numbers.indexOf(wordOrNumber) >= 0)
            return numbers.indexOf(wordOrNumber);
        else
            return +wordOrNumber;
    });
    if (!matches || matches.length == 0) return 0;
    const { first, last } = { first: matches[0], last: matches[matches.length - 1]};
    return first * 10 + last;
})
.reduce((a, b) => a + b, 0);

console.log(result);