import { assocPath, path } from 'ramda';

export default {
  canSetValue(pentago, row, cell, value) {
    const val = path([row, cell], pentago);
    return val === 0;
  },

  setValue(pentago, row, cell, value) {
    const val = path([row, cell], pentago);
    return assocPath([row, cell], value, pentago);
  },

  setNextPlayer(player) {
    return player == 1 ? 2 : 1;
  },
};
