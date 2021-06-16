const fs = require('fs');

var manifest = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/).map(row => Object.assign([], row));

var answer = getOccupiedSeats(getStableManifest(manifest));
console.log(answer);

function getStableManifest(manifest){
    while (true){        
        nextManifest = getNextManifest(manifest);
        if (compareManifests(manifest, nextManifest)){ return nextManifest; }
        manifest = nextManifest;
    }   
}

function getNextVisiblePoint(vector, manifest, rowIndex, columnIndex){
    let nextRowIndex = rowIndex + vector[0];
    let nextColumnIndex = columnIndex + vector[1];
    if (doesPointExist(manifest, nextRowIndex, nextColumnIndex)){
        let nextPoint = manifest[nextRowIndex][nextColumnIndex]
        if (nextPoint == '.'){ return getNextVisiblePoint(vector, manifest, nextRowIndex, nextColumnIndex) }
        return nextPoint;
    }
    return null;
}

function getSeatedNeighbors(rowIndex, seatIndex, manifest){
    let neighborVectors = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

    let neighborCount = 0; 
    neighborVectors.forEach(vector => {
        let visible = getNextVisiblePoint(vector, manifest, rowIndex, seatIndex);
        if (visible == '#'){ neighborCount++ }
    })
    return neighborCount;
}

function doesPointExist(manifest, row, column){
    maxRowIndex = manifest.length - 1;
    maxColumnIndex = manifest[0].length - 1;
    if (row >= 0 && row <= maxRowIndex && column >= 0 && column <= maxColumnIndex){ return true }
    return false;
}

function getNextManifest(manifest){
    var nextManifest = manifest.map(arr => arr.slice())
    for (let row = 0; row < manifest.length; row++){
        for(let column = 0; column < manifest[row].length; column++){
            nextManifest[row][column] = nextStatus(manifest[row][column], getSeatedNeighbors(row, column, manifest));
        }
    }
    return nextManifest;
}

function nextStatus(currentStatus, seatedNeighborsCount){
    if (currentStatus == 'L' && seatedNeighborsCount == 0){ return '#' }
    if (currentStatus == '#' && seatedNeighborsCount >= 5){ return 'L'}
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