const fs = require('fs');


var rawWireDiagram = Object.values(fs.readFileSync('raw.txt', 'utf-8').split("\r\n"));

var wire1Raw = rawWireDiagram[0].split(",")
var wire2Raw = rawWireDiagram[1].split(",")
var wire1Points = getPointsWireOccupies(rawWireDiagram[0].split(","));
var wire2Points = getPointsWireOccupies(rawWireDiagram[1].split(","));

var commonPoints = wire1Points.filter(point1 => {
                        return wire2Points.some(point2 => {
                            return ((point1.x == point2.x) && (point1.y == point2.y))
                        })
                    })

var distanceToPoints = Array.from(commonPoints, x => {
    return getStepsToPoint(x, wire1Raw) + getStepsToPoint(x, wire2Raw)
})

var answer = distanceToPoints.reduce((a, b) => Math.min(a, b))
console.log("Answer: " + answer);


function getStepsToPoint(targetPoint, instructions){
    var currentPoint = {x: 0, y: 0};
    var steps = 0;
    var done = false;

    breakLabel: for (var x = 0; x <= instructions.length; x++) {
        if (!done){
            var direction = instructions[x].substring(0, 1);
            var magnitude = parseInt(instructions[x].substring(1));

            for (i = magnitude - 1; i >= 0; i--){
                steps++;

                if (direction.toUpperCase() == 'U'){ currentPoint = {x: currentPoint.x, y: currentPoint.y + 1}; }
                if (direction.toUpperCase() == 'D'){ currentPoint = {x: currentPoint.x, y: currentPoint.y - 1}; } 
                if (direction.toUpperCase() == 'R'){ currentPoint = {x: currentPoint.x + 1, y: currentPoint.y}; }
                if (direction.toUpperCase() == 'L'){ currentPoint = {x: currentPoint.x - 1, y: currentPoint.y}; }
                
                if ((currentPoint.x == targetPoint.x) && (currentPoint.y == targetPoint.y)){
                    done = true;
                    break breakLabel;               
                }
            }
        }
        else{ break; }
    }
    return steps;
}


function getPointsWireOccupies(instructions){
    var currentPoint = {x: 0, y: 0};
    var pointsArray = [];

    instructions.forEach(command => {
        var direction = command.substring(0, 1);
        var magnitude = parseInt(command.substring(1));

        for (i = magnitude - 1; i >= 0; i--){
            if (direction.toUpperCase() == 'U'){ currentPoint = {x: currentPoint.x, y: currentPoint.y + 1}; }
            if (direction.toUpperCase() == 'D'){ currentPoint = {x: currentPoint.x, y: currentPoint.y - 1}; } 
            if (direction.toUpperCase() == 'R'){ currentPoint = {x: currentPoint.x + 1, y: currentPoint.y}; }
            if (direction.toUpperCase() == 'L'){ currentPoint = {x: currentPoint.x - 1, y: currentPoint.y}; }

            pointsArray.push(currentPoint);
        }
    })

    return pointsArray;
}