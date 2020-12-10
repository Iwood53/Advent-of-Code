//
//
// Does not work
// RangeError: Maximum call stack size exceeded
//
//



const fs = require('fs');


// input for browser = $('pre').innerText.split('\n').filter(row => row.length)
const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);


var answer = findMatchingSumRange(input, findFirstError(input));
console.log(answer);


function findMatchingSumRange(input, target, index = 0, runningCount = 2){
    var range = input.slice(index, index + runningCount)
    var sum = range.reduce((x, y) => +x + +y);

    if (sum < +target) { findMatchingSumRange(input, target, index, runningCount + 1) }
    if (sum > +target) { findMatchingSumRange(input, target, index + 1, 2) }
    if (sum == +target) {
        range.sort((a,b) => { return a - b })
        return +range[0] + +range[range.length -1];
    }
    
    return false;

} 

function findFirstError(input, preambleSize = 25, index = 0){
    if(index + 1 > preambleSize){
        var succesfulCheck = checkSumInRange(Number(input[index]), input.slice(index - preambleSize, index))
        if (!succesfulCheck){ return input[index] }
    }    
    return findFirstError(input, preambleSize, index + 1);
}

function checkSumInRange(target, range){
    var result3 = range.flatMap( (v, i) => range.slice(i+1).map( w => +v + +w ));
    if (result3.includes(target)) { return true }
    return false
}