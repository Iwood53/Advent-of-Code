const fs = require('fs')
var input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);

const myArrival = input[0]
const workingBusSchedule = input[1].split(',').filter(element => element != 'x')

let bestBus = null;
workingBusSchedule.forEach(busId => {
    let myWaitTime = (Math.ceil(myArrival / busId)  * busId) - myArrival;
    if (bestBus == null){ bestBus = {bus: busId, waitTime: myWaitTime} }
    if (bestBus.waitTime > myWaitTime){ bestBus = {busId: busId, waitTime: myWaitTime} }
})

answer = Number(bestBus.busId) * bestBus.waitTime;
console.log(answer);