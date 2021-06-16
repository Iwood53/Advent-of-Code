const fs = require('fs');
const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/)


let answer= getSumofMemory(input);
console.log(answer);


function getSumofMemory(input){
    var memMap = new Map();
    let mask = null;
    input.forEach(row => {
        if (row.includes("mask")){
            mask = row.split(" = ")[1];
        }
        else{
            row = parseMem(row);
            let addressList = getAllAddresses(applyMask(mask, row.address));
            addressList.forEach(xaddress => {
                memMap.set(xaddress, row.value)
            })      
        }
    })

    let sumCount = 0;
    memMap.forEach(value => {
        sumCount += value;
    })
    
    return sumCount;
}

function parseMem(memString){
    let address = memString.split(" = ")[0].slice(4).slice(0, -1);
    let value = Number(memString.split(" = ")[1]);
    return {address: address, value: value};
}

function applyMask(mask, decimalNumber){
    let binNumber = decimalToBinary(decimalNumber)
    let output = "";
    for(maskChar in mask){
        if(mask[maskChar] == 'X'){ output += 'X' }
        if(mask[maskChar] == '0'){ output += binNumber[maskChar] }
        if(mask[maskChar] == '1'){ output += '1' }
    }

    return output;
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

function getAllAddresses(address, index = 0, addresses = []){
    if(index === address.length){
        addresses.push(parseInt(address, 2))
        return;
    }

    if(address[index] === 'X'){
        getAllAddresses(replaceValue(address, index, '0'), index+1, addresses)
        getAllAddresses(replaceValue(address, index, '1'), index+1, addresses)
    }
    else { getAllAddresses(address, index+1, addresses) }

    return addresses
}

function replaceValue(string, index, replacement){
    if (index >= string.length) {
        return string.valueOf();
    }

    return string.substring(0, index) + replacement + string.substring(index + 1);
}