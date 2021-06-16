const fs = require('fs');

var instructionSet = Object.values(fs.readFileSync('raw.txt', 'utf-8').split(',').map(Number));

instructionSet[1] = 12;
instructionSet[2] = 2;

console.log(recursiveCompute(instructionSet));

function recursiveCompute(input, startIndex = 0){
     if (input[startIndex] != 99){
        if (input[startIndex] == 1){
            input[input[startIndex + 3]] = input[input[startIndex + 1]] + input[input[startIndex + 2]];
            recursiveCompute(input, startIndex + 4);
        }
    
        if (input[startIndex] == 2){
            input[input[startIndex + 3]] = input[input[startIndex + 1]] * input[input[startIndex + 2]];
            recursiveCompute(input, startIndex + 4);
        }
    }    
    return input;   
}
