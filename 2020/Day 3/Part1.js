const fs = require('fs');

var sledCourse = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);

var answer = countCollisions(sledCourse, 0, 0, 3, 1)

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

