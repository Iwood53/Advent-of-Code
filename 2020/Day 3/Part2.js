const fs = require('fs');

var sledCourse = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);

var inputRouteParams = [{horizontal: 1, vertical: 1}, {horizontal: 3, vertical: 1}, {horizontal: 5, vertical: 1}, {horizontal: 7, vertical: 1}, {horizontal: 1, vertical: 2} ]

var answer = routeMultiplication(sledCourse, inputRouteParams, 0, 0)

console.log(answer);

function countCollisions(course, startHorizontalIndex, startVerticalIndex, horizontalMovement, verticalMovement)
{
    var courseWidth = course[0].length;
    var courseLength = course.length;
    var horizontalIndex = startHorizontalIndex;
    var verticalIndex = startVerticalIndex
    var treeCount = 0;

    while (true){
        if (verticalIndex > courseLength - 1) { break;}
        if (horizontalIndex > courseWidth - 1) { horizontalIndex -= courseWidth }
        if (course[verticalIndex][horizontalIndex] == '#') { treeCount += 1}
        horizontalIndex += horizontalMovement;
        verticalIndex += verticalMovement;
    }

    return treeCount;
}

function routeMultiplication(course, routeParams, startIndexHorizontal, startIndexVertical){
    runningTreeMultiplication = 1;
    routeParams.forEach(element => { runningTreeMultiplication *= countCollisions(course, startIndexHorizontal, startIndexVertical, element.horizontal, element.vertical) })
    return runningTreeMultiplication;
}

