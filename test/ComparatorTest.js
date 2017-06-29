var assert = require('assert');
var Comparator = require('../Comparator.js').Comparator;
var SimHash = require('../SimHash.js').SimHash;

describe('Comparator', function() {
    describe('#similarity()', function() {
        it('should find similarity', function() {
            var simHash = new SimHash();
            var h1 = simHash.hash('test message');
            var h2 = simHash.hash('test message');
            var comp = Comparator.similarity(h1,h2);
            assert.equal(1,comp);
        });
    });
});

