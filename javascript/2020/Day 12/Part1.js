const fs = require('fs');
const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/)


answer = getFinalDistanceFromOrgin(input);
console.log(answer);


function getFinalDistanceFromOrgin(input){
    currentPoint = {x: 0, y: 0, heading: 90};    
    input.forEach(currentInstruction => {
        currentPoint = getNextPoint(currentInstruction, currentPoint);
    });
    return Math.abs(currentPoint.x) + Math.abs(currentPoint.y);
}

function getNextPoint(instruction, currentPoint){
    let parsedInstruction = {direction: instruction[0], distance: Number(instruction.substring(1))};
    if (parsedInstruction.direction == 'N') { currentPoint.y += parsedInstruction.distance }
    if (parsedInstruction.direction == 'S') { currentPoint.y -= parsedInstruction.distance}
    if (parsedInstruction.direction == 'E') { currentPoint.x += parsedInstruction.distance}
    if (parsedInstruction.direction == 'W') { currentPoint.x -= parsedInstruction.distance}
    if (parsedInstruction.direction == 'L') { currentPoint.heading = rotateHeading(parsedInstruction, currentPoint) }
    if (parsedInstruction.direction == 'R') { currentPoint.heading = rotateHeading(parsedInstruction, currentPoint) }
    if (parsedInstruction.direction == 'F') {
        if (currentPoint.heading == 0){ currentPoint.y += parsedInstruction.distance }
        if (currentPoint.heading == 90){ currentPoint.x += parsedInstruction.distance }
        if (currentPoint.heading == 180){ currentPoint.y -= parsedInstruction.distance }
        if (currentPoint.heading == 270){ currentPoint.x -= parsedInstruction.distance }
    }
    return currentPoint;
}

function rotateHeading(instruction, currentPoint){
    if (instruction.direction == 'L'){ currentPoint.heading -= instruction.distance }
    if (instruction.direction == 'R'){ currentPoint.heading += instruction.distance }
    while(currentPoint.heading >= 360){ currentPoint.heading -= 360 }
    while(currentPoint.heading < 0){ currentPoint.heading += 360 }
    return currentPoint.heading;
}