const { GENESIS_DATA, MINE_RATE } = require('./config');
const cryptoHash = require('./crypto-hash');
const hexToBinary = require('hex-to-binary');

class Block {
  /**
   * wrapping the constructor arguments with {}
   * help with that we dont no-need to rememeber
   * the arguments order
   */
  constructor({
    timestamp, lastHash, hash, data, nonce, difficulty
  }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  };

  /**
   * famous method is calling a function to returns an instance,
   * of classes, and not using the constructur directly.
   */
  static genesis() {
    return new this(GENESIS_DATA);
  };

  static mineBlock({ lastBlock, data }) {
    const { hash: lastHash } = lastBlock;

    let hash, timestamp;
    let { difficulty } = lastBlock;

    /**
     * Our goal is to try to generate a hash that meets our difficulty requirements,
     * for example a hash with first 4 leading zeros at the begining,
     * in order to do that we need to have a way to change something in the
     * createHash parameters to get the wanted result.
     * 
     * Nonce = Number that used only once,
     * Solve this problem by incrementing itself by 1 every ran,
     * It is the computer's job to generate a new hash every ran until we reach
     * the desired difficulty  
     */
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({ originalBlock: lastBlock,  timestamp });
      hash = cryptoHash(timestamp, lastHash, nonce, difficulty, data);
    } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash
    });
  };

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;

    if (difficulty < 1) return 1;

    return ((timestamp - originalBlock.timestamp) > MINE_RATE)
      ? difficulty - 1
      : difficulty + 1;
  };
}

module.exports = Block;
