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

// build graph
var myGraph = new Graph();
edges.forEach(edge => {
    var source = edge.split(")")[1];
    var destination = edge.split(")")[0];

    myGraph.addEdge(source, destination);
})