'use strict';

var aStar = require('./lib/astar');
var Grid = require('./lib/grid');

// Initialize the grid with the map data
var grid = new Grid('default');

// Enable grid hazards, like making the squares contiguous to walkers extra costly
grid.setHazards();

// Show the initial grid
console.log('This is the grid:');
console.log(grid.draw());

// Resolve the grid
var path = aStar.resolve(grid);
console.log('Found a path in ' + path.length + ' steps: ' + path.map(function (square) { return square.id() }).join(' -> '));

var totalCost = 0;
path.forEach(function (step) {
    totalCost += step.speedCost;
});
console.log('Total cost: ' + totalCost + ' ms.\n');

// Run the path and draw the solved grid
grid.visitPath(path);
console.log(grid.draw());

