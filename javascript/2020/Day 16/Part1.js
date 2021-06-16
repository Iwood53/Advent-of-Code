const fs = require('fs');
var input = fs.readFileSync('raw.txt', 'utf-8').split('\r\n\r\n');


let rules = parseRules(input[0].split(/\r\n/));
let myTicket = input[1].split(/\r\n/)[1]
let nearbyTikets = input[2].split(/\r\n/).slice(1);

console.log(countInvalidTickets(rules, nearbyTikets));

function countInvalidTickets(rules, tickets){
    let invalidCounter = 0;
    tickets.forEach(ticket => {
        ticket.split(',').forEach(ticketParam => {
            let validParam = false;
            rules.forEach(rule => {
                if ((ticketParam >= rule.range1bottom && ticketParam <= rule.range1top) || (ticketParam >= rule.range2bottom && ticketParam <= rule.range2top)){
                    validParam = true; 
                }
            })
            if (!validParam){ invalidCounter += Number(ticketParam)}
        })        
    })

    return invalidCounter;
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