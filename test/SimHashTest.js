var assert = require('assert');
var SimHash = require('../SimHash.js').SimHash;

describe('SimHash', function() {
    describe('#do()', function() {
        it('generates a simhash', function() {
            var simhash = new SimHash();
            simhash.hash('test message');
        });
    });
});

