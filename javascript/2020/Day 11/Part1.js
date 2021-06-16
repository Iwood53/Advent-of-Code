const fs = require('fs');

var manifest = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/).map(row => Object.assign([], row));

var answer = getOccupiedSeats(getStableManifest(manifest));
console.log(answer)


function getNextManifest(manifest){
    var nextManifest = manifest.map(arr => arr.slice())
    for (let row = 0; row < manifest.length; row++){
        for(let column = 0; column < manifest[row].length; column++){
            nextManifest[row][column] = nextStatus(manifest[row][column], getSeatedNeighbors(row, column, manifest));
        }
    }
    return nextManifest;
}

function getStableManifest(manifest){
    while (true){        
        nextManifest = getNextManifest(manifest);
        if (compareManifests(manifest, nextManifest)){ return nextManifest; }
        manifest = nextManifest;
    }   
}

function getSeatedNeighbors(rowIndex, seatIndex, manifest){
    let neighborsIndex = [[rowIndex - 1, seatIndex - 1], [rowIndex - 1, seatIndex], [rowIndex - 1, seatIndex + 1],[rowIndex, seatIndex - 1], 
                [rowIndex, seatIndex + 1], [rowIndex + 1, seatIndex - 1], [rowIndex + 1, seatIndex], [rowIndex + 1, seatIndex + 1]];

    let cleanNeighborsIndex = neighborsIndex.filter(currentIndex => (doesPointExist(manifest, currentIndex[0], currentIndex[1])) ? true : false);

    let neighborCount = 0; 
    cleanNeighborsIndex.forEach(neighbor => {
        neighborStatus = manifest[neighbor[0]][neighbor[1]]
        if(neighborStatus == '#'){ neighborCount++ }
    })
    return neighborCount;
}

function nextStatus(currentStatus, seatedNeighborsCount){
    if (currentStatus == 'L' && seatedNeighborsCount == 0){ return '#' }
    if (currentStatus == '#' && seatedNeighborsCount >= 4){ return 'L'}
    return currentStatus;
}

function compareManifests(manifest1, manifest2){
    for (let row = 0; row < manifest.length; row++){
        for(let column = 0; column < manifest[row].length; column++){
            if (manifest1[row][column] != manifest2[row][column]) { return false}
        }
    }
    return true;
}

function getOccupiedSeats(manifest){
    let seatedCounter = 0;
    for (let row = 0; row < manifest.length; row++){
        for(let column = 0; column < manifest[row].length; column++){
            if (manifest[row][column] == '#') { seatedCounter++ }
        }
    }
    return seatedCounter;
}

function doesPointExist(manifest, row, column){
    maxRowIndex = manifest.length - 1;
    maxColumnIndex = manifest[0].length - 1;
    if (row >= 0 && row <= maxRowIndex && column >= 0 && column <= maxColumnIndex){ return true }
    return false;
}