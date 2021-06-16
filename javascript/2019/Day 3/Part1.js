const fs = require('fs');


var rawWireDiagram = Object.values(fs.readFileSync('raw.txt', 'utf-8').split("\r\n"));

var wire1Points = getPointsWireOccupies(rawWireDiagram[0].split(","));
var wire2Points = getPointsWireOccupies(rawWireDiagram[1].split(","));

var commonPoints = wire1Points.filter(point1 => {
                        return wire2Points.some(point2 => {
                            return ((point1.x == point2.x) && (point1.y == point2.y))
                        })
                    })

var distanceArray = [];
commonPoints.forEach(point => {
    distanceArray.push(Math.abs(point.x) + Math.abs(point.y))
})

var answer = distanceArray.reduce((a, b) => Math.min(a, b))
console.log("Answer: " + answer);


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