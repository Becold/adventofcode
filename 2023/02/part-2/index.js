const Fs = require('fs')

const input = Fs.readFileSync('input.txt', { encoding: 'utf-8' });
const parsed = input.split('\r\n')
.map(line => {
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
})
.map(game => {
    return {
        ...game,
        setWithHighestAmountOfCubes: (game.sets.reduce((acc, cubes) => {
            for (const cube of cubes) {
                if (acc[cube.color] <= cube.count) {
                    acc[cube.color] = cube.count;
                }
            }
            return acc;
        }, {red:1,blue:1,green:1})) // 💩
    }
});

const result = parsed
.reduce((acc, game) => acc + Object.values(game.setWithHighestAmountOfCubes).reduce((a,b)=>a*b,1), 0);

console.log(result);