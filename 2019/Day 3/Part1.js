const fs = require('fs');

var rawWireDiagram = Object.values(fs.readFileSync('raw.txt', 'utf-8').split("\n"));
rawWireDiagram.forEach(wire => { console.log(getWirePoints(wire.split(','))) });

function lineSegmentIntersections(x11, y11, x12, y12, x21, y21, x22, y22){
    var parallelX = (x11 - x12 == 0 && x21 - x22 == 0) ? true : false;
    var parallelY = (y11 - y12 == 0 && y21 - y22 == 0) ? true : false;
    

}

function getParallelOverlapPoints(line1point1, line1point2, line2point1, line2point2, fixedPoint){

}


function getWirePoints(wires, currentPoint = [0,0], wirePoints = []){   
    if (wires[0][0] == 'U'){ currentPoint[1] +=  +wires[0].substring(1) }
    if (wires[0][0] == 'D'){ currentPoint[1] -=  +wires[0].substring(1) }
    if (wires[0][0] == 'R'){ currentPoint[0] +=  +wires[0].substring(1) }
    if (wires[0][0] == 'L'){ currentPoint[0] -=  +wires[0].substring(1) }

    wirePoints.push(currentPoint.map(x => x));
    wires.shift();

    if (wires.length != 0){ return getWirePoints(wires, currentPoint, wirePoints) }
    return wirePoints;
}