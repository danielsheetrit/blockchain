const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
  const blockchain = new Blockchain();

  it('contains a `chain` Array instance', () => {
    expect(blockchain.chain instanceof Array).toBeTruthy();
  });

  it('starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block to the chain', () => {
    const newData = 'foo bar';
    blockchain.addBlock({ data: newData });

    expect(blockchain.chain[blockchain.chain.length - 1].data)
      .toEqual(newData);
  });

  describe('isValidChain()', () => {
    describe('returns false when the chain doesnt start with genesis', () => {
      it('returns false', () => {
        
      });
    });
  });
});
