const fs = require('fs');

var moduleMasses = Object.values(fs.readFileSync('raw.csv', 'utf-8').split(/\r\n/));

console.time('main');

runningFuelCount = 0;

moduleMasses.forEach(moduleMass => { runningFuelCount += Math.floor(moduleMass / 3) - 2; });

console.timeEnd('main');
console.log(runningFuelCount);
