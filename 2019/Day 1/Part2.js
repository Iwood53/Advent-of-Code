const fs = require('fs');

var moduleMasses = Object.values(fs.readFileSync('raw.csv', 'utf-8').split(/\r\n/));

console.time('main');

runningFuelCount = 0;

moduleMasses.forEach(moduleMass => { 
    var fuelForModule = Math.floor(moduleMass / 3) - 2;
    runningFuelCount += fuelForModule;
    var extraFuel = fuelForModule;

    while (true){
        extraFuel = Math.floor(extraFuel / 3) - 2;
        if (extraFuel > 0) { runningFuelCount += extraFuel }
        else break;
    }
});

console.timeEnd('main');
console.log(runningFuelCount);
