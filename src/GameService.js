import { assocPath, path } from 'ramda';

const ROW_NUMBER = 6;
const COL_NUMBER = 6;

export default {
  canSetValue(pentago, row, cell) {
    const val = path([row, cell], pentago);
    return val === 0;
  },

  setValue(pentago, row, cell, value) {
    return assocPath([row, cell], value, pentago);
  },

  setNextPlayer(player) {
    return player === 1 ? 2 : 1;
  },

  findPentagoWinner(pentago) {
    const rowIter = this.iterateRow(pentago);
    const rowWinner = this.findWinner(pentago, rowIter);
    if (rowWinner) {
      return rowWinner;
    }
    const colIter = this.iterateCol(pentago);
    const colWinner = this.findWinner(pentago, colIter);
    return colWinner;
  },

  findWinner(pentago, iterator) {
    let nextRow = iterator.next();
    while (!nextRow.done) {
      const cellIter = nextRow.value;

      let nextCell = cellIter.next();
      let currentPlayer = nextCell.value;
      let currentStack = 0;
      while (!nextCell.done) {
        if (currentPlayer === nextCell.value) {
          currentStack += 1;
        } else {
          currentPlayer = nextCell.value;
          currentStack = 1;
        }
        if (currentPlayer && currentStack === 5) {
          return currentPlayer;
        }
        nextCell = cellIter.next();
      }
      nextRow = iterator.next();
    }

    return null;
  },

  *iterateCol(pentago) {
    const iterate = function* iterate(pent, row) {
      for (let i = 0; i < COL_NUMBER; i += 1) {
        yield pent[i][row];
      }
    };

    for (let i = 0; i < ROW_NUMBER; i += 1) {
      yield iterate(pentago, i);
    }
  },

  *iterateRow(pentago) {
    const iterate = function* iterate(pent, col) {
      for (let i = 0; i < ROW_NUMBER; i += 1) {
        yield pent[col][i];
      }
    };

    for (let i = 0; i < COL_NUMBER; i += 1) {
      yield iterate(pentago, i);
    }
  },
};
