const fs = require('fs');
var input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);
var input = input[1].split(',')


var workingBusses = parseBusses(input);

let answer = getValidTimeStamp(workingBusses);
console.log(answer);

function getValidTimeStamp(workingBusses){
    let step = Number(workingBusses[0].id);
    let x = 0;

    workingBusses.shift();
    workingBusses.forEach(bus => {
        while(true){
            if((x + Number(bus.index)) % Number(bus.id) === 0){
                step *= Number(bus.id);
                break;
            }
            x += step;
        }
    })

    return x;
}

function parseBusses(input){
    let workingBusses = [];
    for (bus in input){
        if (input[bus] != 'x'){ workingBusses.push({ id: input[bus], index: bus })}
    }
    return workingBusses;
}