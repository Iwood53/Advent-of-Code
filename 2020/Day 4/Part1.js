const fs = require('fs');

var rawInput = fs.readFileSync('raw.txt', 'utf-8').split(/\n\s*\n/);

answer = 0;

rawInput.forEach(element => {
    if (checkValidPart1(parseDocument(element, true))){ answer += 1 }  
})

console.log(answer);

function checkValidPart1(document){
    if (document.hasOwnProperty('byr') & document.hasOwnProperty('iyr') & document.hasOwnProperty('eyr') & document.hasOwnProperty('hgt')
        & document.hasOwnProperty('hcl') & document.hasOwnProperty('ecl') & document.hasOwnProperty('pid')) { return true }
    else return false;
}

function parseDocument(rawDocument){
    rawValues = rawDocument.match(/(byr:|iyr:|eyr:|hgt:|hcl:|ecl:|pid:|cid:)[^\s]+/g);
    var jsonObj = {};
    rawValues.forEach(value => {
        placeHolder = value.split(':');
        jsonObj[placeHolder[0]] = placeHolder[1]
    })
    
    return jsonObj;
}