const fs = require('fs');
const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);

var answer = getFinalDistanceFromOrgin(input);
console.log(answer);

function getFinalDistanceFromOrgin(input){
    currentPoint = {x: 0, y: 0, heading: 90, waypointRelX: 10, waypointRelY: 1};    
    input.forEach(currentInstruction => {
        currentPoint = getNextPoint(currentInstruction, currentPoint);
    });
    return Math.abs(currentPoint.x) + Math.abs(currentPoint.y);
}

function getNextPoint(instruction, currentPoint){
    let parsedInstruction = {direction: instruction[0], distance: Number(instruction.substring(1))};
    if (parsedInstruction.direction == 'N') { currentPoint.waypointRelY += parsedInstruction.distance }
    if (parsedInstruction.direction == 'S') { currentPoint.waypointRelY -= parsedInstruction.distance}
    if (parsedInstruction.direction == 'E') { currentPoint.waypointRelX += parsedInstruction.distance}
    if (parsedInstruction.direction == 'W') { currentPoint.waypointRelX -= parsedInstruction.distance}
    if (parsedInstruction.direction == 'L' || parsedInstruction.direction == 'R') { currentPoint = rotatePoint(parsedInstruction, currentPoint) }
    if (parsedInstruction.direction == 'F') {
        for(let x = 0; x < parsedInstruction.distance; x++){
            currentPoint.x += currentPoint.waypointRelX;
            currentPoint.y += currentPoint.waypointRelY;
        }
    }
    return currentPoint;
}

function rotatePoint(instruction, currentPoint){
    if (instruction.distance == 180){
        let newx = -currentPoint.waypointRelX;
        let newy = -currentPoint.waypointRelY;
        currentPoint.waypointRelX = newx;
        currentPoint.waypointRelY = newy;  
    }
    // relative 90 deg clockwise
    if ((instruction.direction == 'L' && instruction.distance == 270) || (instruction.direction == 'R' && instruction.distance == 90)){
        let newx = currentPoint.waypointRelY;
        let newy = -currentPoint.waypointRelX;
        currentPoint.waypointRelX = newx;
        currentPoint.waypointRelY = newy; 
    }
    // relative 90 deg counter-clockwise
    if ((instruction.direction == 'R' && instruction.distance == 270) || (instruction.direction == 'L' && instruction.distance == 90)){
        let newx = -currentPoint.waypointRelY;
        let newy = currentPoint.waypointRelX;
        currentPoint.waypointRelX = newx;
        currentPoint.waypointRelY = newy;
    }
    return currentPoint
}