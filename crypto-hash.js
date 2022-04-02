const crypto = require('crypto');

/**
 * '...' (spread operator), when calld in args,
 * turn all args into one single array.
 * and the sort() func make sure all args is in the same order. 
 * */
const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');
    hash.update(inputs.sort().join(' '));
    return hash.digest('hex');
}

module.exports = cryptoHash;