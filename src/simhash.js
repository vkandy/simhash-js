/**
 * CRC32 Calculation.
 */
var crc32 = (function() {
    function utf8encode(str) {
        var utf8CharCodes = [];

        for (var i = 0, len = str.length, c; i < len; ++i) {
            c = str.charCodeAt(i);
            if (c < 128) {
                utf8CharCodes.push(c);
            } else if (c < 2048) {
                utf8CharCodes.push((c >> 6) | 192, (c & 63) | 128);
            } else {
                utf8CharCodes.push((c >> 12) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128);
            }
        }
        return utf8CharCodes;
    }

    var cachedCrcTable = null;

    function buildCRCTable() {
        var table = [];
        for (var i = 0, j, crc; i < 256; ++i) {
            crc = i;
            j = 8;
            while (j--) {
                if ((crc & 1) == 1) {
                    crc = (crc >>> 1) ^ 0xEDB88320;
                } else {
                    crc >>>= 1;
                }
            }
            table[i] = crc >>> 0;
        }
        return table;
    }

    function getCrcTable() {
        if (!cachedCrcTable) {
            cachedCrcTable = buildCRCTable();
        }
        return cachedCrcTable;
    }

    return function(str) {
        var utf8CharCodes = utf8encode(str), crc = -1, crcTable = getCrcTable();
        for (var i = 0, len = utf8CharCodes.length, y; i < len; ++i) {
            y = (crc ^ utf8CharCodes[i]) & 0xFF;
            crc = (crc >>> 8) ^ crcTable[y];
        }
        return (crc ^ -1) >>> 0;
    };
})();


/**
 * Simhash singleton class. Creates a 32-bit simhash.
 *
 * Usage: var hash = Simhash.of("This is a test");
 */
var Simhash = {
    /**
     * By default, we tokenize input into chunks of this size.
     */
    kshingles: 4,

    /**
     * By default, this many number of minimum shingles will 
     * be combined to create the final hash.
     */
    maxFeatures: 128,

    /**
     * Driver function.
     */
    of: function(input) {
        var features = this.tokenize(input);
        var shingles = [];
        $.each(features, function(index, feature) {
            shingles.push(crc32(feature));
        });
        return this.combineShingles(shingles);
    },

    /**
     * TODO: Make this private or take closure that implements 
     * logic to combine shingles.
     */
    combineShingles: function(shingles) {
        if(shingles.length == 0) return;

        if(shingles.length == 1) return shingles[0];

        var simhash = 0x0;
        var mask = 0x1;
        for(var pos = 0; pos < 32; pos++) {
            var weight = 0;
            $.each(shingles, function(index, shingle) {
                weight += !(~shingle & mask) == 1 ? 1 : -1;
            });
            if(weight > 0) simhash |= mask;
            mask <<= 1;
        }

        return simhash;
    },

    /**
     * Tokenizes input into 'kshingles' number of tokens.
     */
    tokenize: function(original) {
        var size = original.length;
        if(size <= this.kshingles) {
            return original.substr(0);
        }

        var shingles = [];
        for (var i = 0; i < size; i = i + 4) {
            shingles.push(i + this.kshingles < size ? original.substr(i, i + this.kshingles) : original.substr(i));
        }

        alert(shingles.toString())
        return shingles;
    }
};

