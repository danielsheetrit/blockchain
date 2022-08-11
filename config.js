const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;

/**
 * GENESIS_DATA style of syntax called 'the screen case syntax'
 *  its well known that its value is global and hard coded.
 */
const GENESIS_DATA = {
  timestamp: 1,
  lastHash: 'kiki',
  hash: 'do-you-love-me',
  nonce: 0,
  difficulty: INITIAL_DIFFICULTY,
  data: [],
};

module.exports = { GENESIS_DATA, MINE_RATE };
