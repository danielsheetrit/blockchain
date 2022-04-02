const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

describe('Block', () => {

  const timestamp = 'a-date';
  const lastHash = 'foo-hash';
  const hash = 'bar-hash';
  const data = ['blockchain', 'data'];
  
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data,
  });

  it('has a timestamp, lastHash, hash, and data property', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe('genesis()', () => {

    const genesisBlock = Block.genesis();

    it('returns a Block instance', () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it('returns the genesis data', () => {
      /**
       * genesisBlock(class instance) === GENESIS_DATA ???
       * yes, under the hood JS treat classes like an object.
       */
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe('mineBlock()', () => {

    const lastBlock = Block.genesis();
    const data = 'mined data';
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it('returns a Block instance', () => {
      expect(minedBlock instanceof Block).toBeTruthy();
    });

    it('sets the `lastHash` to be `hash` of the lastBlock', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it('sets the `data`', () => {
      expect(minedBlock.data).toEqual(data);
    });

    it('sets a timestamp', () => {
      expect(minedBlock.timestamp).toBeDefined();
    });

    it('create a SHA-265 `hash` based on the proper inputs', () => {
      expect(minedBlock.hash)
        .toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data));
    });

  });
});
