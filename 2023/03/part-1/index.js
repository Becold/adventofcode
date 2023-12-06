const Fs = require('fs');

const input = Fs.readFileSync('input.txt', { encoding: 'utf-8' });
const grid = input.split('\r\n').map(y => y.split('').map(c => isFinite(+c) ? +c : c));
const parts = [];

const height = grid.length;
const width = grid[0].length;
for (let y = 0; y < height; y++) {
    let currentNumber = '';
    let foundSymbol = false;

    for (let x = 0; x < width; x++) {
        const cell = grid[y][x];

        // Cell is a digit
        if (isFinite(+cell)) {
            currentNumber += cell; // Concatenate digit to current number
            foundSymbol |= [[-1,-1],[-1,1],[1,1],[1,-1],[-1,0],[1,0],[0,-1],[0,1]]
                .map(([xd, yd]) => ([x+xd, y+yd]))
                .filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height)
                .map(([x, y]) => grid[y][x])
                .filter(c => !/([0-9]|\.)/.test(c)) // Is symbol (not a number and not a dot)
                .length > 0;
        }

        // End of number or end of current line
        if (!isFinite(+cell) || x === width - 1) {
            if (foundSymbol) {
                parts.push(+currentNumber);
            }
            currentNumber = '';
            foundSymbol = false;
        }
    }
}

const result = parts.reduce((a, b) => a + b, 0);
console.log(result);