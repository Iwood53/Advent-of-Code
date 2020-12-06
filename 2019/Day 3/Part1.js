const fs = require('fs');

var cleanWires = [];
var rawWireDiagram = Object.values(fs.readFileSync('raw.txt', 'utf-8').split("\n"));
rawWireDiagram.forEach(wire => { cleanWires.push(wire.split(',')) });



var m1 = getLineSlope(-5,1,5,1);
var b1 = getYIntercept(-5,1,m1);
var m2 = getLineSlope(0,-5,0,5);
var b2 = getYIntercept(0,-5,m2);

console.log(m1);
console.log(b1);
console.log(m2);
console.log(b2);



console.log(findLineXIntersection(m1,b1,m2,b2));



function getLineSlope(x1, y1, x2, y2) {
    var denom = x1 - x2;
    slope = denom == 0 ? 0 : (y1 - y2) / (x1 - x2);
    return slope 
    }

function getYIntercept(x, y, m){
    
    return -(m * x) + y;
}

//mx+b = mx+b
function findLineXIntersection(m1, b1, m2, b2){
    if (m1 - m2 == 0) { return 0;}
    else return (b1 + b2) / (m1 - m2);
}

function pair(x, y){
    var xx = x >= 0 ? x * 2 : x * -2 - 1;
    var yy = y >= 0 ? y * 2 : y * -2 - 1;
    return (xx >= yy) ? (xx * xx + xx + yy) : (yy * yy + xx);
}

function unpair(index){
    var sqrtz = Math.floor(Math.sqrt(index));
    var sqz = sqrtz * sqrtz;
    var result1 = ((index - sqz) >= sqrtz) ? [sqrtz, index - sqz - sqrtz] : [index - sqz, sqrtz];
    var xx = result1[0] % 2 === 0 ? result1[0] / 2 : (result1[0] + 1 ) / -2;
    var yy = result1[1] % 2 === 0 ? result1[1] / 2 : (result1[1] + 1 )/ -2;
    return [xx, yy];
}


