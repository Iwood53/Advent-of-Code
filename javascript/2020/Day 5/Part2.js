const fs = require('fs');

var batchTickets = []
fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/).forEach(ticket => { batchTickets.push(parseTicket(ticket)) });

var answer = recurveFindMySeat(batchTickets)

console.log(answer);

function recurveFindMySeat(ticketList, searchConditions = [63,64,0]){
    if (isSeatOpen(ticketList, searchConditions[0], searchConditions[2]) && validateIdRule(ticketList, searchConditions[0], searchConditions[2])){
        return { row : searchConditions[0], column : searchConditions[2], id : (searchConditions[0] * 8) + searchConditions[2] };
    }
    if (isSeatOpen(ticketList, searchConditions[1], searchConditions[2]) && validateIdRule(ticketList, searchConditions[1], searchConditions[2])){
        return { row : searchConditions[1], column : searchConditions[2], id : (searchConditions[1] * 8) + searchConditions[2] };
    }

    if (searchConditions[2] == 7) {
        searchConditions[0] -= 1;
        searchConditions[1] += 1;
        searchConditions[2] = 0;
    }
    else searchConditions[2] += 1;

    if (searchConditions[0] < 0 || searchConditions[1] > 127) { return "error" }

    return recurveFindMySeat(ticketList, searchConditions);
}

function validateIdRule(ticketList, row, column){
    var idToCheck = (row * 8) + column;
    if (ticketList.some(ticket => ticket.id == (idToCheck - 1)) && ticketList.some(ticket => ticket.id == (idToCheck + 1))){ return true }
    else return false;
}

function isSeatOpen(ticketList, row, column){
    return !ticketList.some(ticket => ticket.id == ((row * 8) + column))
}

function recurveFindMiddle(lowerBoundry, upperBoundry, instructions){
    if (Math.abs(lowerBoundry - upperBoundry) != 1){
        if (instructions[0] == 'F' || instructions[0] == 'L'){ var newUpperBoundry = ((lowerBoundry + upperBoundry) - 1) / 2; }
        if (instructions[0] == 'B' || instructions[0] == 'R'){ var newLowerBoundry = ((lowerBoundry + upperBoundry) + 1) / 2; }
        return recurveFindMiddle((newLowerBoundry ? newLowerBoundry : lowerBoundry), (newUpperBoundry ? newUpperBoundry : upperBoundry), instructions.substring(1));
    }
    else {
        if (instructions[0] == 'F' || instructions[0] == 'L'){ return lowerBoundry; }
        if (instructions[0] == 'B' || instructions[0] == 'R'){ return upperBoundry; }
    }    
}

function parseTicket(ticketData){
    row = recurveFindMiddle(0, 127, ticketData.substring(0,7));
    column = recurveFindMiddle(0, 7, ticketData.substring(7,10));
    seatId = (row * 8) + column
    return { row : row, column : column, id : seatId };
}
