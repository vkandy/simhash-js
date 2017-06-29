class Comparator {

    /**
     * Calculates binary hamming distance of two base 16 integers.
     */
    static hammingDistance(x, y) {
        var a1 = parseInt(x, 16);
        var a2 = parseInt(y, 16);
        var v1 = a1 ^ a2;
        var v2 = (a1 ^ a2) >> 32;

        v1 = v1 - ((v1 >> 1) & 0x55555555);
        v2 = v2 - ((v2 >> 1) & 0x55555555);
        v1 = (v1 & 0x33333333) + ((v1 >> 2) & 0x33333333);
        v2 = (v2 & 0x33333333) + ((v2 >> 2) & 0x33333333);
        var c1 = ((v1 + (v1 >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
        var c2 = ((v2 + (v2 >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;

        return c1 + c2;
    };

    /**
     * Calculates bit-wise similarity - Jaccard index.
     */
    static similarity(x, y) {
        var x16 = parseInt(x, 16);
        var y16 = parseInt(y, 16);
        var i = (x16 & y16);
        var u = (x16 | y16);
        return Comparator.hammingWeight(i) / Comparator.hammingWeight(u);
    };

    /**
     * Calculates Hamming weight (population count).
     */
    static hammingWeight(l) {
        var c;
        for (c = 0; l; c++) l &= l - 1;
        return c;
    };

}

module.exports.Comparator = Comparator;