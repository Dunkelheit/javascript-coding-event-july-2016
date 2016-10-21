'use strict';

var convict = require('convict');
var path = require('path');

var config = convict({
    square: {
        speed: {
            generic: {
                doc: 'The time, in milliseconds, that it takes to leave one square and go to another',
                format: Number,
                default: 200,
                env: 'SQUARE_SPEED_GENERIC'
            },
            withZombies: {
                doc: 'The time, in milliseconds, that it takes to leave one square contiguous to a zombie and go to another',
                format: Number,
                default: 400,
                env: 'SQUARE_SPEED_WITH_ZOMBIES'
            }
        },
        definition: {
            format: Array
        }
    }
});

config.loadFile(path.join(__dirname, 'default.json'));

module.exports = config;