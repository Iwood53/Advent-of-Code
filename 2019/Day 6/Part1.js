const fs = require('fs');
var edges = Object.values(fs.readFileSync('raw.txt', 'utf-8').split("\r\n"));

class Node{
    constructor(value){
        this.value = value;
        this.adjacents = [];
        this.stepsToHome = -1;
    }

    addAdjacent(node){
        this.adjacents.push(node);
    }
}


class Graph {
    // edgeDirection true=one-way false=two-way
    constructor(edgeDirection = true) {
        this.nodes = new Map();
        this.edgeDirection = edgeDirection;
    }
  
    addEdge(source, destination) {
        const sourceNode = this.addVertex(source);
        const destinationNode = this.addVertex(destination);

        sourceNode.addAdjacent(destinationNode);

        if(this.edgeDirection === false) {
            destinationNode.addAdjacent(sourceNode);
        }

        return [sourceNode, destinationNode];
    }

    addVertex(value) {
        if(this.nodes.has(value)) {
            return this.nodes.get(value);
        } else {
            const vertex = new Node(value);
            this.nodes.set(value, vertex);
            return vertex;
        }
    }
}

function findStepsToHome(graph, fromNode, homeNodeParam){
    if (fromNode == homeNodeParam){ // if we are the home node return 0
        fromNode.stepsToHome = 0;
        return 0;
    }
    else if(fromNode.stepsToHome != -1){ // if we already have steps to home just return it
        return fromNode.stepsToHome;
    }
    else{ // we are not the home node nor do we already have steps to home populated
        if(fromNode.adjacents[0] == homeNodeParam){ //if our neighbor is home then return 1
            fromNode.stepsToHome = 1;
            return 1;
        }

        else if (fromNode.adjacents[0].stepsToHome >= 0){ // if we dont have steps to home but out Adj does then we return 1 plus Adj.stepsToHome
            fromNode.stepsToHome = 1 + fromNode.adjacents[0].stepsToHome;
            return 1 + fromNode.adjacents[0].stepsToHome;
        }

        else{ // if neither us nor adjacent have steps to home we run findStepsToHome on adj then return that + 1
            findStepsToHome(graph, fromNode.adjacents[0], homeNode)
            fromNode.stepsToHome = 1 + fromNode.adjacents[0].stepsToHome;
            return 1 + fromNode.adjacents[0].stepsToHome;
        }
    }
}


// build graph
var myGraph = new Graph();
edges.forEach(edge => {
    var source = edge.split(")")[1];
    var destination = edge.split(")")[0];

    myGraph.addEdge(source, destination);
})

// find homeNode, center of the universe in this case
var homeNode;
myGraph.nodes.forEach(node => {
    if (node.adjacents.length == 0) {
        homeNode = node;
    }
})

// populate steps to homeNode for eachNode
myGraph.nodes.forEach(node => {
    findStepsToHome(myGraph, node, homeNode);
})

// get answer
var answer = 0;
myGraph.nodes.forEach(node => {
    answer += node.stepsToHome;
})
console.log("Answer: " + answer);