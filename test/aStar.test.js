'use strict';

var expect = require('chai').expect;

var aStar = require('../lib/astar');
var config = require('../config');
var Grid = require('../lib/grid');

describe('A*', function () {

    var grid = new Grid('default');

    it('Finds the shortest route when there is no extra speed cost in moving next to walkers', function (done) {
        config.set('square.speed.generic', 200);
        config.set('square.speed.withZombies', 200);
        grid.setHazards();

        var path = aStar.resolve(grid);
        expect(path).to.have.length(23);
        done();
    });

    it('Finds the shortest (most optimal) route when there is extra speed cost in moving next to walkers', function (done) {
        config.set('square.speed.generic', 400);
        config.set('square.speed.withZombies', 400);
        grid.setHazards();

        var path = aStar.resolve(grid);
        expect(path).to.have.length(25);
        done();
    });

    it('Does not find a route when the map is unsolvable', function (done) {
        grid = new Grid('impossible');
        grid.setHazards();

        var path = aStar.resolve(grid);
        expect(path).to.have.length(0);
        done();
    });
});