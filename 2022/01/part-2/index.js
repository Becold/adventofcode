const Fs = require('fs')

const input = Fs.readFileSync('input.txt', { encoding: 'utf-8' });
const rows = input.split('\r\n');

const elves = rows.reduce((acc, value) => {
  if (!value || value.trim() === '') {
    acc.push([]);
  }
  else {
    acc[acc.length - 1].push(+value);
  }
  return acc;
}, [[]]);

const caloriesPerElve = elves.reduce((acc, value)=>{
  acc.push(value.reduce((a,b)=>a+b,0));
  return acc;
}, []);

const sorted = caloriesPerElve.sort((a,b) => b - a);

const result = sorted[0]+sorted[1]+sorted[2];

console.log(result);