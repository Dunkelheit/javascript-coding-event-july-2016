'use strict';

var NodeList = require('./nodeList');

/**
 * Implementation of the A* algorithm.
 *
 * @module aStar
 */
var aStar = module.exports = {

    /**
     * Calculates the Manhattan distance between two {@link Node}.
     *
     * @param {Node} oneNode
     * @param {Node} anotherNode
     * @returns {number}
     */
    manhattan: function manhattan(oneNode, anotherNode) {
        return Math.abs(oneNode.x - anotherNode.x) + Math.abs(oneNode.y - anotherNode.y);
    },

    /**
     * Resolves a {@link Grid} using the A* algorithm.
     *
     * @param {Grid} grid
     * @returns {Node[]} Sorted array of nodes, from the start of the path until the end of the path.
     */
    resolve: function resolve(grid) {
        var openNodes = new NodeList();
        var closedNodes = new NodeList();
        var startNode = grid.findStartNode();
        var endNode = grid.findEndNode();

        startNode.g = 0;
        startNode.f = aStar.manhattan(startNode, endNode);

        openNodes.push(startNode);

        while (openNodes.length) {
            var currentNode = openNodes.findBestNode();

            if (currentNode.isEndNode()) {
                return currentNode.fullPath();
            }

            openNodes = openNodes.removeNode(currentNode);
            closedNodes.push(currentNode);

            var neighbors = currentNode.getNeighbors();
            neighbors.forEach(function (neighbor) {
                if (!neighbor.isWalkable) {
                    return;
                }
                if (closedNodes.findNode(neighbor)) {
                    return;
                }
                var gScore = currentNode.g + neighbor.speedCost;
                var gScoreIsBest = false;

                if (!openNodes.findNode(neighbor)) {
                    gScoreIsBest = true;
                    neighbor.h = aStar.manhattan(neighbor, endNode);
                    openNodes.push(neighbor);
                } else if (gScore < neighbor.g) {
                    gScoreIsBest = true;
                }
                if (gScoreIsBest) {
                    neighbor.parent = currentNode;
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
                }
            });
        }

        return [];
    }
};
