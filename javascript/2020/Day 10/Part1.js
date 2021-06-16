const fs = require('fs');

const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/).sort((a,b) => a - b);
input.unshift(0);
var map1 = input.map((x,y) => input[y+1] - x);
var oneVoltDiffs = map1.reduce((acc, element) => ( element == 1 ? acc + 1 : acc), 0);
var threeVoltDiffs = map1.length - oneVoltDiffs;
var answer = oneVoltDiffs * threeVoltDiffs;
console.log(answer);