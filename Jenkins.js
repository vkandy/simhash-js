/**
 * Jenkins hash implementation which yeilds 32-bit and 64-bit hashes.
 *
 * See https://github.com/vkandy/jenkins-hash-js
 */
class Jenkins {

    constructor() {
        /**
         * Default first initial seed.
         */
        this.pc = 0;

        /**
         * Default second initial seed.
         */
        this.pb = 0;
    }

    // --------------------------------------------------
    // Public access
    // --------------------------------------------------

    /**
     * Computes and returns 32-bit hash of given message.
     */
    hash32(msg) {
        var h = lookup3(msg, this.pc, this.pb);
        return (h.c).toString(16);
    }

    /**
     * Computes and returns 32-bit hash of given message.
     */
    hash64(msg) {
        var h = lookup3(msg, this.pc, this.pb);
        return (h.b).toString(16) + (h.c).toString(16);
    }


}


// --------------------------------------------------
// Private methods
// --------------------------------------------------

/**
 * Implementation of lookup3 algorithm.
 */
function lookup3(k, pc, pb) {
    var length = k.length;
    var a, b, c;

    a = b = c = 0xdeadbeef + length + pc;
    c += pb;

    var offset = 0;
    while (length > 12) {
        a += k.charCodeAt(offset + 0);
        a += k.charCodeAt(offset + 1) << 8;
        a += k.charCodeAt(offset + 2) << 16;
        a += k.charCodeAt(offset + 3) << 24;

        b += k.charCodeAt(offset + 4);
        b += k.charCodeAt(offset + 5) << 8;
        b += k.charCodeAt(offset + 6) << 16;
        b += k.charCodeAt(offset + 7) << 24;

        c += k.charCodeAt(offset + 8);
        c += k.charCodeAt(offset + 9) << 8;
        c += k.charCodeAt(offset + 10) << 16;
        c += k.charCodeAt(offset + 11) << 24;

        mixed = mix(a, b, c);
        a = mixed.a;
        b = mixed.b;
        c = mixed.c;

        length -= 12;
        offset += 12;
    }

    switch (length) {
        case 12:
            c += k.charCodeAt(offset + 11) << 24;
        case 11:
            c += k.charCodeAt(offset + 10) << 16;
        case 10:
            c += k.charCodeAt(offset + 9) << 8;
        case 9:
            c += k.charCodeAt(offset + 8);

        case 8:
            b += k.charCodeAt(offset + 7) << 24;
        case 7:
            b += k.charCodeAt(offset + 6) << 16;
        case 6:
            b += k.charCodeAt(offset + 5) << 8;
        case 5:
            b += k.charCodeAt(offset + 4);

        case 4:
            a += k.charCodeAt(offset + 3) << 24;
        case 3:
            a += k.charCodeAt(offset + 2) << 16;
        case 2:
            a += k.charCodeAt(offset + 1) << 8;
        case 1:
            a += k.charCodeAt(offset + 0);
            break;

        case 0:
            return { c: c >>> 0, b: b >>> 0 };
    }

    // Final mixing of three 32-bit values in to c
    mixed = finalMix(a, b, c)
    a = mixed.a;
    b = mixed.b;
    c = mixed.c;

    return { c: c >>> 0, b: b >>> 0 };
};

/**
 * Mixes 3 32-bit integers reversibly but fast.
 */
function mix(a, b, c) {
    a -= c;
    a ^= rot(c, 4);
    c += b;
    b -= a;
    b ^= rot(a, 6);
    a += c;
    c -= b;
    c ^= rot(b, 8);
    b += a;
    a -= c;
    a ^= rot(c, 16);
    c += b;
    b -= a;
    b ^= rot(a, 19);
    a += c;
    c -= b;
    c ^= rot(b, 4);
    b += a;
    return { a: a, b: b, c: c };
};

/**
 * Final mixing of 3 32-bit values (a,b,c) into c
 */
function finalMix(a, b, c) {
    c ^= b;
    c -= rot(b, 14);
    a ^= c;
    a -= rot(c, 11);
    b ^= a;
    b -= rot(a, 25);
    c ^= b;
    c -= rot(b, 16);
    a ^= c;
    a -= rot(c, 4);
    b ^= a;
    b -= rot(a, 14);
    c ^= b;
    c -= rot(b, 24);
    return { a: a, b: b, c: c };
};

/**
 * Rotate x by k distance.
 */
function rot(x, k) {
    return (((x) << (k)) | ((x) >> (32 - (k))));
};


module.exports.Jenkins = Jenkins;