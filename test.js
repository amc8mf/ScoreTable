const assert = require('assert');
const main = require('./app.js');
const data = require('./data.json');

describe('Basic Mocha String Test', function () {
 it('should return number of charachters in a string', function () {
        assert.equal("Hello".length, 4);
    });
});