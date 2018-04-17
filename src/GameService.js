import { assocPath, path } from 'ramda';

const ROW_NUMBER = 6;
const COL_NUMBER = 6;

export default {
  canSetValue(pentago, row, cell, value) {
    const val = path([row, cell], pentago);
    return val === 0;
  },

  setValue(pentago, row, cell, value) {
    return assocPath([row, cell], value, pentago);
  },

  setNextPlayer(player) {
    return player === 1 ? 2 : 1;
  },

  findWinner(pentago) {
    for (var i = 0; i < ROW_NUMBER; i++) {
      let currentPlayer = pentago[i][0];
      let currentStack = 0;
      for (var j = 0; j < COL_NUMBER; j++) {
        if (currentPlayer === pentago[i][j]) {
          currentStack += 1;
        } else {
          currentPlayer = pentago[i][j];
          currentStack = 1;
        }
        if (currentPlayer && currentStack == 5) {
          return currentPlayer;
        }
      }
    }
  },
};
