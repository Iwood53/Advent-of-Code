const fs = require('fs');
const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/)


var memMap = new Map();
let mask = null;
input.forEach(row => {
    if (row.includes("mask")){
        mask = row.split(" = ")[1];
    }
    else{
        row = parseMem(row);
        value = applyMask(mask, row.value)
        memMap.set(Number(row.address), Number(value));       
    }
})

let answer = 0;
memMap.forEach((value, key, map) => {
    answer += value;
})
console.log(answer)


function parseMem(memString){
    let address = memString.split(" = ")[0].slice(4).slice(0, -1);
    let value = Number(memString.split(" = ")[1]);
    
    return {address: address, value: value};
}

function applyMask(mask, decimalNumber){
    let binNumber = decimalToBinary(decimalNumber)
    let output = "";
    for(maskChar in mask){
        if (mask[maskChar] == 'X'){
            output += binNumber[maskChar];
        }
        else{
            output += mask[maskChar]
        }
    }

    return parseInt(output, 2)
}

function decimalToBinary(decimalNumber){
    let binArray = [];
    let counter = 0;
    while(counter < 36){
        binArray[counter] = decimalNumber % 2;
        decimalNumber = Math.floor(decimalNumber / 2);
        counter++;
    }
    binArray.reverse();
    
    return binArray.join('');
}