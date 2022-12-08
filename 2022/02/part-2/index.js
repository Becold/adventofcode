const Fs = require('fs')

const input = Fs.readFileSync('input.txt', { encoding: 'utf-8' });
const rows = input.split('\r\n');

const decrypt = {
  'A': {opponent: 'Rock', expectedWinning: 'Paper', expectedLoss: 'Scissors'},
  'B': {opponent: 'Paper', expectedWinning: 'Scissors', expectedLoss: 'Rock'},
  'C': {opponent: 'Scissors', expectedWinning: 'Rock', expectedLoss: 'Paper'},
};

const resultMapping = {
  'X': 'Lost',
  'Y': 'Draw',
  'Z': 'Won',
};

const scorePerMatch = rows.map((match)=> {
  let score = 0;
  const parts = match.trim().split(' ');
  const decrypted = decrypt[parts[0]];
  const expectedResult = resultMapping[parts[1]];

  let myPlay = '';
  if (expectedResult === 'Lost') myPlay = decrypted.expectedLoss;
  if (expectedResult === 'Draw') myPlay = decrypted.opponent;
  if (expectedResult === 'Won') myPlay = decrypted.expectedWinning;
  
  if (myPlay === 'Rock') score += 1;
  if (myPlay === 'Paper') score += 2;
  if (myPlay === 'Scissors') score += 3;
  
  const winner = gameResult(myPlay, decrypted.opponent);

  if (winner === 'Lost') score += 0;
  if (winner === 'Draw') score += 3;
  if (winner === 'Won') score += 6;

  return score;
});

const result = scorePerMatch.reduce((a,b)=>a+b,0);

console.log(result);

function gameResult(myPlay, opponentPlay) {
  if (myPlay === opponentPlay)
    return 'Draw';
  if (myPlay === 'Rock')
    return (opponentPlay === 'Paper') ? 'Lost' : 'Won';
  if (myPlay === 'Scissors')
    return (opponentPlay === 'Rock') ? 'Lost' : 'Won';
  if (myPlay === 'Paper')
    return (opponentPlay === 'Scissors') ? 'Lost' : 'Won';
}