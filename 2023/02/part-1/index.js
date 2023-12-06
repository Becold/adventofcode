const Fs = require('fs')

const input = Fs.readFileSync('input.txt', { encoding: 'utf-8' });
const parsed = input.split('\r\n').map(line => {
    const parts = line.split(': ');
    const gameId = +parts[0].split(' ')[1]
    const setsMatches = parts[1].split('; ');
    return {
        line,
        gameId: gameId,
        sets: setsMatches
            .map(x => x.split(', ').map(y => y.split(' ')))
            .map(x => x.map(y => ({
                color: y[1],
                count: +y[0]
            })))
    };
});

const bag = {
    'red': 12,
    'green': 13,
    'blue': 14
};

const result = parsed
.filter(game => game.sets.every(set => set.every(cube => cube.count <= bag[cube.color])))
.reduce((acc, game) => acc + game.gameId, 0);

console.log(result);