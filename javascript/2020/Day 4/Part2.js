const fs = require('fs');

var rawInput = fs.readFileSync('raw.txt', 'utf-8').split(/\n\s*\n/);

answer = 0;

rawInput.forEach(element => {
    if (checkValid(parseDocument(element, true))){ answer += 1 }  
})

console.log(answer);

function checkValid(document){
    if (document.hasOwnProperty('byr') & document.hasOwnProperty('iyr') & document.hasOwnProperty('eyr') & document.hasOwnProperty('hgt')
        & document.hasOwnProperty('hcl') & document.hasOwnProperty('ecl') & document.hasOwnProperty('pid')) { return true }
    else return false;
}

function parseDocument(rawDocument, validRecordsOnly){
    rawValues = rawDocument.match(/(byr:|iyr:|eyr:|hgt:|hcl:|ecl:|pid:|cid:)[^\s]+/g);
    var jsonObj = {};
    rawValues.forEach(value => {
        placeHolder = value.split(':');

        if (validRecordsOnly){
            switch (placeHolder[0]){
                case 'byr':
                    if (parseInt(placeHolder[1]) != NaN & placeHolder[1].length == 4 & +placeHolder[1] >= 1920 & placeHolder[1] <= 2002) { jsonObj[placeHolder[0]] = placeHolder[1] }
                    break;
                case 'iyr':
                    if (parseInt(placeHolder[1]) != NaN & placeHolder[1].length == 4 & +placeHolder[1] >= 2010 & placeHolder[1] <= 2020) { jsonObj[placeHolder[0]] = placeHolder[1] }
                    break;
                case 'eyr':
                    if (parseInt(placeHolder[1]) != NaN & placeHolder[1].length == 4 & +placeHolder[1] >= 2020 & placeHolder[1] <= 2030) { jsonObj[placeHolder[0]] = placeHolder[1] }
                    break;
                case 'hgt':
                    if (placeHolder[1].includes("in") & +placeHolder[1].replace("in", "") >= 59 & +placeHolder[1].replace("in", "") <= 76){ jsonObj[placeHolder[0]] = placeHolder[1] }
                    if (placeHolder[1].includes("cm") & +placeHolder[1].replace("cm", "") >= 150 & +placeHolder[1].replace("cm", "") <= 193){ jsonObj[placeHolder[0]] = placeHolder[1] }                   
                    break;
                case 'hcl':
                    if (/^#[^g-z]{6}$/.test(placeHolder[1])) { jsonObj[placeHolder[0]] = placeHolder[1] }
                    break;
                case 'ecl':
                    if (["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(placeHolder[1])) { jsonObj[placeHolder[0]] = placeHolder[1] }
                    break;
                case 'pid':
                    if (parseInt(placeHolder[1]) != NaN & placeHolder[1].length == 9) { jsonObj[placeHolder[0]] = placeHolder[1] }
                    break;
                case 'cid':
                    jsonObj[placeHolder[0]] = placeHolder[1];
                    break;
                default:
                    break;
            }
        }
        else {
            jsonObj[placeHolder[0]] = placeHolder[1]
        }
    })  
    return jsonObj;
}