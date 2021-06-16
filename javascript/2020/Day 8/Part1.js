const fs = require('fs');


// input for browser = $('pre').innerText.split('\n').filter(row => row.length)
const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);

var answer = breakOnLoop(input);
console.log(answer);


function breakOnLoop(instructions, currentIndex = 0, acc = 0, instructionTracker = []){
    if (!instructionTracker.includes(currentIndex)){
        instructionTracker.push(currentIndex);
        var command = instructions[currentIndex].split(' ')[0];
        var commandNumber = instructions[currentIndex].split(' ')[1];
        if (command == 'acc'){ acc += Number(commandNumber); currentIndex += 1; }
        if (command == 'jmp'){ currentIndex += Number(commandNumber) }
        if (command == 'nop'){ currentIndex += 1 }

        return breakOnLoop(instructions, currentIndex, acc, instructionTracker)        
    }
    return acc;
}