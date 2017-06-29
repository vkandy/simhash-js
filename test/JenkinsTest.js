var assert = require('assert');
var Jenkins = require('../Jenkins.js').Jenkins;

describe('Jenkins', function() {
    describe('#hash32()', function() {
        it('generates a hash32', function() {
            var jenkins = new Jenkins();
            jenkins.hash32('test message');
        });
    });

    describe('#hash64()', function() {
        it('generates a hash64', function() {
            var jenkins = new Jenkins();
            jenkins.hash64('test message');
            
        });
    });
});

