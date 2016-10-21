'use strict';

var _ = require('lodash');

/**
 * Represents an array of {@link Node} entities.
 *
 * @constructor NodeList
 * @extends Array
 */
function NodeList() {
}

NodeList.prototype = Array.prototype;

/**
 * Returns a new {@link NodeList} without the given {@link Node}.
 *
 * @param {Node} node - The node to remove.
 * @returns {NodeList}
 */
NodeList.prototype.removeNode = function removeNode(node) {
    return _.without(this, node);
};

/**
 * Finds a {@link Node} in the list.
 *
 * @param {Node} searchee - The node to find.
 * @returns {Node}
 */
NodeList.prototype.findNode = function findNode(searchee) {
    return _.find(this, function (node) {
        return searchee.id() === node.id()
    });
};

/**
 * Finds the {@link Node} with the lowest <code>f(x)</code>.
 *
 * @returns {Node}
 */
NodeList.prototype.findBestNode = function findBestNode() {
    var lowestFIndex = 0;
    for (var i = 0; i < this.length; i++) {
        if (this[i].f < this[lowestFIndex].f) {
            lowestFIndex = i;
        }
    }
    return this[lowestFIndex];
};

module.exports = NodeList;