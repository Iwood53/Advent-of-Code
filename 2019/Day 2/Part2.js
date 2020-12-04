const fs = require('fs');

var instructionSet = Object.values(fs.readFileSync('raw.txt', 'utf-8').split(',').map(Number));

console.log(findTargetVar(19690720,instructionSet));

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

function findTargetVar(target, input, nounLower = 0, nounUpper = 99, verbLower = 0, verbUpper = 99){
    for (var n = nounLower; n <= nounUpper; n++)
    {
        for (var v = verbLower; v <= verbUpper; v++){
            let currentInput = Object.assign({}, input)
            currentInput[1] = n;
            currentInput[2] = v;
            if (recursiveCompute(currentInput)[0] == target){
                return (100 * n) + v;                   
            }
        }
    }
}