const fs = require('fs');
var input = fs.readFileSync('raw.txt', 'utf-8').split('\r\n\r\n');


let rules = parseRules(input[0].split(/\r\n/));
let myTicket = input[1].split(/\r\n/)[1];
let validNearbyTikets = getValidTickets(rules, input[2].split(/\r\n/).slice(1));
validNearbyTikets = validNearbyTikets.map(ticket => ticket.split(','));

let solvedFields = deduceFields(getAllWorkingFields(validNearbyTikets, rules), validNearbyTikets[0].length);
let answer = getAnswer(solvedFields, myTicket);
console.log(answer);


function getAnswer(solvedFields, myTicket){
    let answer = 1;
    myTicket = myTicket.split(',');
    solvedFields.forEach(field => {
        if (field[0].includes("departure")){
            answer *= myTicket[field[1]];
        }
    })

    return answer;
}

function deduceFields(workingFields){
    let solved = [];

    while(workingFields.length > 0){
        //count occurances
        let myMap = new Map();
        workingFields.forEach(workingField =>{
            if (myMap.has(workingField[1])){
                let count = myMap.get(workingField[1]);
                myMap.set(workingField[1], count + 1)
            }
            else{
                myMap.set(workingField[1], 1)
            }
        })

        //get fields that occur once
        let tempList = [];
        myMap.forEach((value, key) => {
            if(value == 1){ tempList.push(key)}
        })
        
        // map name to index   
        tempList.forEach(isolated => {
            workingFields.forEach(x => {               
                if (x[1] == isolated){                   
                    solved.push([x[0], isolated]);                    
                }
            })
        })

        //removed solved
        solved.forEach(solvedParam => {
            let newFields = workingFields.filter(field => field[0] != solvedParam[0]);
            workingFields = [...newFields];       
        })
    }

    return solved;   
}

function getAllWorkingFields(validNearbyTikets, rules){
    let validFields = []
    let ticketFields = validNearbyTikets[0].length;
    rules.forEach(rule => {
        for(let index = 0; index < ticketFields; index++){
            let validSpot = true;
            validNearbyTikets.forEach(ticket => {
                if(!(isValidParam(ticket[index], rule))){
                    validSpot = false;
                }

            })
            if (validSpot){ validFields.push([rule.name, Number(index)]) }

        }
    })
    
    return validFields;
}

function isValidParam(param, rule){
    if(((param >= rule.range1bottom && param <= rule.range1top) || (param >= rule.range2bottom && param <= rule.range2top))){
        return true;
    }
    return false;
}

function getValidTickets(rules, tickets){
    let goodTickets = [];
    tickets.forEach(ticket => {
        let validTicket = true;
        ticket.split(',').forEach(ticketParam => {
            let validParam = false;
            rules.forEach(rule => {
                if ((ticketParam >= rule.range1bottom && ticketParam <= rule.range1top) || (ticketParam >= rule.range2bottom && ticketParam <= rule.range2top)){
                    validParam = true;
                }
            })
            if (!validParam){ validTicket = false;}
        })
        if (validTicket){goodTickets.push(ticket)}
    })

    return goodTickets;
}

function parseRules(rules){
    let returnList = []
    rules.forEach(rule => {
        rule = rule.split(": ");
        let ruleName = rule[0];
        rule = rule[1].split(" or ");
        let aRules = rule[0].split("-");
        let bRules = rule[1].split("-");
        returnList.push({ name: ruleName, range1bottom: Number(aRules[0]), range1top: Number(aRules[1]), range2bottom: Number(bRules[0]), range2top: Number(bRules[1]) })
    })

    return returnList;
}