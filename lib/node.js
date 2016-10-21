'use strict';

var _ = require('lodash');

var config = require('../config');

var squareDefinitions = config.get('square.definition');

function findNodeConfigByCharacter(character) {
    return _.find(squareDefinitions, { character: character });
}

/**
 * Represents the squares of the map.
 *
 * @param {Grid} grid
 * @param {number} x - X-axis coordinate value.
 * @param {number} y - Y-axis coordinate value.
 * @param {string} character - Map character that represents this node.
 * @constructor Node
 */
function Node(grid, x, y, character) {
    this.grid = grid;
    this.x = x;
    this.y = y;

    this.parent = null;

    var metadata = findNodeConfigByCharacter(character);
    if (!metadata) {
        throw new Error('Invalid node character:', character);
    }

    this.type = metadata.type;
    this.isWalkable = metadata.walkable;
    this.speedCost = this.isWalkable ? (metadata.speedCost || config.get('square.speed.generic')) : 0;
    this.rendering = metadata.rendering;

    this.g = 0;
    this.h = 0;
    this.f = 0;

    this.visited = false;
}

/**
 * Generates a unique identifier of this node.
 *
 * @example
 * node.id(); // -> 'A5'
 * @returns {string}
 */
Node.prototype.id = function toString() {
    // 65 is the uppercase A
    return String.fromCharCode(65 + this.x) + this.y;
};

/**
 * Returns <code>true</code> when this node is the start of the path, <code>false</code> otherwise.
 *
 * @returns {boolean}
 */
Node.prototype.isStartNode = function isStartNode() {
    return this.type === 'start';
};

/**
 * Returns <code>true</code> when this node is the end of the path, <code>false</code> otherwise.
 *
 * @returns {boolean}
 */
Node.prototype.isEndNode = function isEndNode() {
    return this.type === 'end';
};

/**
 * Returns <code>true</code> when this node contains a walker, <code>false</code> otherwise.
 *
 * @returns {boolean}
 */
Node.prototype.isWalkerNode = function isWalkerNode() {
    return this.type === 'walker';
};

/**
 * Returns the neighboring nodes (north, east, south and west).
 *
 * @returns {Node[]}
 */
Node.prototype.getNeighbors = function getNeighbors() {
    var grid = this.grid;
    var x = this.x;
    var y = this.y;

    var neighbors = [];
    if (grid[y - 1] && grid[y - 1][x]) {
        neighbors.push(grid[y - 1][x]);
    }
    if (grid[y + 1] && grid[y + 1][x]) {
        neighbors.push(grid[y + 1][x]);
    }
    if (grid[y] && grid[y][x - 1]) {
        neighbors.push(grid[y][x - 1]);
    }
    if (grid[y] && grid[y][x + 1]) {
        neighbors.push(grid[y][x + 1]);
    }
    return neighbors;
};

/**
 * Returns the full path from the start until the present node.
 *
 * @returns {Node[]}
 */
Node.prototype.fullPath = function fullPath() {
    var currentNode = this;
    var path = [];
    while (currentNode.parent) {
        path.push(currentNode);
        currentNode = currentNode.parent;
    }
    return path.reverse();
};

/**
 * Marks the node as visited.
 */
Node.prototype.visit = function visit() {
    this.visited = true;
};

/**
 * Returns a visual representation of this node.
 *
 * @returns {string}
 */
Node.prototype.render = function render() {
    if (this.visited) {
        return config.get('square.visited.rendering');
    }
    return this.rendering;
};

module.exports = Node;