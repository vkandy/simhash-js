# simhash-js

A Javascript implementation of Charikar's hash for identification of similar documents. 


## What is Simhash?
Consider two documents A and B that differ in just a single byte. 

Hash functions such as SHA-2 or MD5 will hash contents of these two documents into two completely different and unrelated hash values. The Hamming distance between md5(A) and md5(B) would be large. In fact, that is one of the goals of cryptographic hash functions such as SHA-2 or MD5 - to minimize collisions in hash values they generate.

By contrast, Simhash will hash contents of A and B to similar hash values. The Hamming distance between simhash(A) and simhash(B) would be small.

# Usage
    var simhash_js = require('simhash_js');
    var SimHash = simhash_js.SimHash;
    var simhash = new SimHash();
    var x = simhash.hash("This is a test of the Emergency Blogcast System");
    var y = simhash.hash("This is a second test of the Emergency Blogcast System");

    var s = simhash_js.Comparator.similarity(x, y); //should return 0.3 

# To Do
* Implement an efficient priority queue
* Accept a list of stop words to be removed from input prior to calculating hash

# References

* Charikar: Similarity Estimation Techniques from Rounding Algorithms, in Proceedings of the thiry-fourth annual ACM symposium on Theory of computing, ACM Press, 2002
* Manku, Jain, Sarma: Detecting Near-Duplicates for Web Crawling. in Proceedings of the 16th international conference on World Wide Web, ACM Press, 2007

