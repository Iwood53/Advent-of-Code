const fs = require('fs');


// input for browser = $('pre').innerText.split('\n').filter(row => row.length)
const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);

var answer = findError(input);
console.log(answer);


function findError(input){
    for (index in input){       
        if (!(input[index].split(' ')[0] == 'acc'))
        {
            testInput = [...input];
            testInput[index] = (input[index].split(' ')[0] == 'jmp') ? testInput[index].replace('jmp', 'nop') : testInput[index].replace('nop', 'jmp');
            testLoop = isInfiniteLoop(testInput);
            if (testLoop.status == false) { return testLoop }
        }        
    }
    return null;
}

function isInfiniteLoop(instructions, currentIndex = 0, acc = 0, instructionTracker = []){
    if (!instructionTracker.includes(currentIndex)){
        instructionTracker.push(currentIndex);
        var command = instructions[currentIndex].split(' ')[0];
        var commandNumber = instructions[currentIndex].split(' ')[1];
        if (command == 'acc'){ acc += Number(commandNumber); currentIndex += 1; }
        if (command == 'jmp'){ currentIndex += Number(commandNumber) }
        if (command == 'nop'){ currentIndex += 1 }

        if (currentIndex == instructions.length) { return {status: false, acc: acc} }

        return isInfiniteLoop(instructions, currentIndex, acc, instructionTracker)        
    }
    return {status: true, acc: acc};
}