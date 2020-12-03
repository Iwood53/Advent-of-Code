const fs = require('fs');

var instructionSet = Object.values(fs.readFileSync('raw.txt', 'utf-8').split(',').map(Number));

function compute(inputdata){
    entryPoint = 0;

    while (true){
        var instruction = inputdata[entryPoint];
        var num1 = inputdata[inputdata[(entryPoint + 1)]];
        var num2 = inputdata[inputdata[(entryPoint + 2)]];
        var output = inputdata[inputdata[(entryPoint + 3)]];

        console.log(instruction);
        console.log(num1);
        console.log(num2);
        console.log(output);

        //if (instruction == 1){ inputdata[output] = num1 + num2; }
        //else if (instruction == 2){ inputdata[output] = num1 * num2; }
        //else if (instruction == 99){ break; }


        entryPoint += 4;
        break;

    }
    return inputdata;
}

instructionSet[1] = 12;
instructionSet[2] = 2;
console.log(compute(instructionSet));