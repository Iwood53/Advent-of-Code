const fs = require('fs');

var batchTickets = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);

answer = recurveFindHighestId(batchTickets);
console.log(answer);

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

function recurveFindHighestId(batchTickets, highestId = 0){
    var newId = parseTicket(batchTickets[0]).id;
    if (newId > highestId) { highestId = newId; }
    if (batchTickets.length > 1){
        batchTickets.shift();
        return recurveFindHighestId(batchTickets, highestId)
    }
    else { return highestId; }
}