const fs = require('fs');

var manifest = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/).map(row => Object.assign([], row));

console.log(manifest.length)
console.log(manifest[0].length)

function getSeatedNeighbors(rowIndex, seatIndex, manifest){
    let neighborsIndex = [[rowIndex - 1, seatIndex - 1], [rowIndex - 1, seatIndex], [rowIndex - 1, seatIndex + 1],[rowIndex, seatIndex - 1], 
                [rowIndex, seatIndex + 1], [rowIndex + 1, seatIndex - 1], [rowIndex + 1, seatIndex], [rowIndex + 1, seatIndex + 1]];
    
    let neighborCount = 0; 
    neighborsIndex.forEach(neighbor => {
        neighborStatus = manifest[neighbor[0]]
        if(neighborStatus){
            if (neighborStatus == '#'){ neighborCount++ }
        }
    })
}