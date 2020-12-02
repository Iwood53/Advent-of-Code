const fs = require('fs');

var passwordsRaw = fs.readFileSync('raw.csv', 'utf-8').split(/\r\n/);

console.time('main')

counter = 0;

passwordsRaw.forEach(element => {
    var splitData = element.split(/\s|:|-/);
    // XOR => bool != bool
    // ((bool)does first index match target) != ((bool)does second index match target)
    if ((splitData[4].charAt(splitData[0]-1) == splitData[2]) != (splitData[4].charAt(splitData[1]-1) == splitData[2]))
    {
        counter += 1;
    }
})

console.timeEnd('main');
console.log(counter);