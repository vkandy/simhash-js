# simhash-js

A Javascript implementation of Charikar's hash for identification of similar documents. 

NOTE: Haven't tested much.

## What is Simhash?
Consider two documents A and B that differ in just a single byte. 

Hash functions such as SHA-2 or MD5 will hash contents of these two documents into two completely different and unrelated hash values. The Hamming distance between md5(A) and md5(B) would be large. In fact, that is one of the goals of cryptographic hash functions such as SHA-2 or MD5 - to minimize collisions in hash values they generate.

By contrast, Simhash will hash contents of A and B to similar hash values. The Hamming distance between simhash(A) and simhash(B) would be small.

# Usage
>
> var x = Simhash.of("This is a test of the Emergency Blogcast System");
> var y = Simhash.of("This is NOT a test of the Emergency Blogcast System");
> var similarity = Simhash.similarity(x, y); // similarity = 0.8 x and y are 80% similar
>

# References

* Charikar: Similarity Estimation Techniques from Rounding Algorithms, in Proceedings of the thiry-fourth annual ACM symposium on Theory of computing, ACM Press, 2002
* Manku, Jain, Sarma: Detecting Near-Duplicates for Web Crawling. in Proceedings of the 16th international conference on World Wide Web, ACM Press, 2007

