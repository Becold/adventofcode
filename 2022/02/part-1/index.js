const Fs = require('fs')

const input = Fs.readFileSync('input.txt', { encoding: 'utf-8' });
const rows = input.split('\r\n');

const scorePerMatch = rows.map((match)=> {
  let score = 0;
  const parts = match.trim().split(' ');
  const opponentPlay = decryptPlay(parts[0]);
  const myPlay = decryptPlay(parts[1]);

  if (myPlay === 'Rock') score += 1;
  if (myPlay === 'Paper') score += 2;
  if (myPlay === 'Scissors') score += 3;

  const winner = gameResult(myPlay, opponentPlay);

  if (winner === 'Lost') score += 0;
  if (winner === 'Draw') score += 3;
  if (winner === 'Won') score += 6;

  return score;
});

const result = scorePerMatch.reduce((a,b)=>a+b,0);

console.log(result);

function decryptPlay(play) {
  return {
    'A':'Rock',
    'B':'Paper',
    'C':'Scissors',
    'X':'Rock',
    'Y':'Paper',
    'Z':'Scissors',
  }[play]
};

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