'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var config = require('../config');
var Node = require('./node');

/**
 * Represents the map.
 *
 * @param {string} filename - Name of the map file, must be in the folder <code>assets/map</code>.
 * @constructor Grid
 * @extends Array
 */
function Grid(filename) {
    var map = fs.readFileSync(path.join(__dirname, '../assets/map/' + filename), { encoding: 'utf8'});
    var data = map.split('\n');

    for (var y = 0; y < data.length; y++) {
        this.push([]);
        data[y] = data[y].split('');
        var row = data[y];
        for (var x = 0; x < row.length; x++) {
            var type = row[x];
            this[y].push(new Node(this, x, y, type));
        }
    }
    this.flattened = _.flatten(this);
}

Grid.prototype = Array.prototype;

/**
 * Function to load hazards and shenanigans on the grid.
 */
Grid.prototype.setHazards = function setHazards() {
    // Pollute the surroundings of walkers!
    var walkerNodes = this.findWalkerNodes();
    walkerNodes.forEach(function (node) {
        node.getNeighbors().forEach(function (neighbor) {
            if (neighbor.isWalkable) {
                neighbor.speedCost = config.get('square.speed.withZombies');
            }
        });
    });
};

/**
 * Finds the start {@link Node} in the grid.
 *
 * @return {Node|null}
 */
Grid.prototype.findStartNode = function findStartNode() {
    return _.find(this.flattened, function (node) {
        return node.isStartNode();
    });
};

/**
 * Finds the end {@link Node} in the grid.
 *
 * @return {Node|null}
 */
Grid.prototype.findEndNode = function findEndNode() {
    return _.find(this.flattened, function (node) {
        return node.isEndNode();
    });
};

/**
 * Finds all the nodes containin walkers.
 *
 * @return {Node[]}
 */
Grid.prototype.findWalkerNodes = function findWalkerNodes() {
    return _.filter(this.flattened, function (node) {
        return node.isWalkerNode();
    });
};

/**
 * Marks all the {@link Node} present in <code>path</code> as visited.
 *
 * @param {Node[]} path
 */
Grid.prototype.visitPath = function visitPath(path) {
    var self = this;
    path.forEach(function (node) {
        self[node.y][node.x].visit();
    });
};

/**
 * Generates a visual representation of the map.
 *
 * @returns {string}
 * @example
 * grid.draw()
 *
 * // Prints the following:
 * //  ██a█████████
 * //  █   █w   █ █
 * //  █   █  █ █ █
 * //  █ ████ █   █
 * //  █  w   █   █
 * //  █    w █ █z█
 * //  █  w█  █ ███
 * //  █   ████ █ █
 * //  █      █ █ █
 * //  █w  █      █
 * //  ████████████
 */
Grid.prototype.draw = function draw() {
    var drawing = '';
    this.forEach(function (row) {
        row.forEach(function (node) {
            drawing += node.render();
        });
        drawing += '\n';
    });
    return drawing;
};

module.exports = Grid;
