const fs = require('fs');

var rawWireDiagram = Object.values(fs.readFileSync('raw.txt', 'utf-8').split("\n"));

var wirePointsCollection = [];

rawWireDiagram.forEach(wire => {
    var wirePoints = []

    var movements = wire.split(",");
    var currentPosition = { x : 0, y : 0 };

    movements.forEach(move => {
        direction = move[0];
        distance = move.substring(1);

        if (direction == 'U'){
            for (i = currentPosition.y; i <= distance; i++)
            {
                currentPosition.y = currentPosition.y + 1
                wirePoints.push(currentPosition);
            }
            console.log(currentPosition);
        }
    })   
})

