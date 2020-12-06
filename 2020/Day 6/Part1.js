const fs = require('fs');

var input = fs.readFileSync('raw.txt', 'utf-8').split('\r\n\r\n');

var runningSum = 0;
input.forEach(group => {
    var holdingString = "";
    for (char in group){
        if ((/[a-zA-Z]/).test(group[char])){
            if (!holdingString.includes(group[char])) { holdingString += group[char] }
        }       
    }
    runningSum += holdingString.length;
})
console.log(runningSum)