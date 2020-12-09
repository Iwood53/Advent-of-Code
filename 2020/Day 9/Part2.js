const fs = require('fs');


// input for browser = $('pre').innerText.split('\n').filter(row => row.length)
const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);

var answer = false
while (!answer){
    answer = findMatchingSumRange(input, findFirstError(input));
    input.shift()
}
console.log(answer);


function findMatchingSumRange(input, target, runningCount = 0){
    var index = 0;
    var range = []
    while(true){
        runningCount += Number(input[index])
        range.push(input[index]);
        if (runningCount > target){ return false }
        if (runningCount < target){ index++ }
        if (runningCount == target){
            range.sort((a,b) => { return a - b })
            return +range[0] + +range[range.length -1];
        }
    }
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