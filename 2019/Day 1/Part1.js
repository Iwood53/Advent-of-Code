const fs = require('fs');

var moduleMasses = Object.values(fs.readFileSync('raw.csv', 'utf-8').split(/\r\n/));

runningFuelCount = 0;

moduleMasses.forEach(moduleMass => { runningFuelCount += Math.floor(moduleMass / 3) - 2; });

console.log(runningFuelCount);
