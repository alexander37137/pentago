import './App.css';

import React, { Component } from 'react';
import { assocPath, path } from 'ramda';

import GameService from './GameService';

class App extends Component {
  state = {
    player: 1,
    pentago: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  };

  handleClick = (row, cell) => {
    const { pentago, player } = this.state;

    if (GameService.canSetValue(pentago, row, cell, player)) {
      const newState = {
        pentago: GameService.setValue(pentago, row, cell, player),
        player: GameService.setNextPlayer(player),
      };

      this.setState(newState);
    }
  };

  render() {
    const { pentago } = this.state;
    return (
      <div>
        <h1 className="title">Pentago</h1>
        <div className="grid">
          {pentago.map((rowValue, rowIndex) => (
            <div className="row">
              {rowValue.map((cellValue, cellIndex) => (
                <div className="cell" onClick={() => this.handleClick(rowIndex, cellIndex)}>
                  {cellValue}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
