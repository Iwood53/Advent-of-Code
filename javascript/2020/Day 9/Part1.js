const fs = require('fs');


// input for browser = $('pre').innerText.split('\n').filter(row => row.length)
const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);

var answer = findFirstError(input);
console.log(answer);


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