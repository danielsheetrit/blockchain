const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {
  /**
   * wrapping the constructor arguments with {}
   * help with that we dont no-need to rememeber
   * the arguments order
   */
  constructor({
    timestamp, lastHash, hash, data,
  }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  /**
   * famous method is calling a function to returns an instance,
   * of classes, and not using the constructur directly.
   */
  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;

    return new this({
      timestamp,
      lastHash,
      data,
      hash: cryptoHash(timestamp, lastHash, data),
    });
  }
}

module.exports = Block;
