import React, { Component } from 'react';

import './App.css';

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
    winner: null,
    state: 'select',
  };

  handleClick(row, cell) {
    const { pentago, player, state } = this.state;

    if (state !== 'select') {
      return;
    }

    if (GameService.canSetValue(pentago, row, cell, player)) {
      const newPentago = GameService.setValue(pentago, row, cell, player);
      const winner = GameService.findPentagoWinner(newPentago);
      const newState = {
        winner,
        state: GameService.setNextState(state, winner),
        pentago: newPentago,
      };

      this.setState(newState);
    }
  }

  handleRotate(x, y, direction) {
    const { pentago, state, player } = this.state;

    if (state !== 'rotate') {
      return;
    }

    const newPentago = GameService.rotate(pentago, x, y, direction);
    const winner = GameService.findPentagoWinner(newPentago);
    const newState = {
      winner,
      pentago: newPentago,
      state: GameService.setNextState(state, winner),
      player: GameService.setNextPlayer(player),
    };
    this.setState(newState);
  }

  renderTitle() {
    const { state, player } = this.state;
    if (state === 'select') {
      return `Player ${player}, please select cell`;
    }

    if (state === 'rotate') {
      return `Player ${player}, please rotate`;
    }
    return null;
  }

  render() {
    const { pentago, winner } = this.state;
    return (
      <div className="grid">
        <div className="title">
          <h1>Pentago</h1>
          <h2>{this.renderTitle()}</h2>
        </div>
        <button className="top-left-rotate-right" onClick={() => this.handleRotate(0, 0, 1)}>
          right
        </button>
        <button className="top-right-rotate-left" onClick={() => this.handleRotate(1, 0, -1)}>
          left
        </button>
        <button className="top-left-rotate-left" onClick={() => this.handleRotate(0, 0, -1)}>
          left
        </button>
        <button className="top-right-rotate-right" onClick={() => this.handleRotate(1, 0, 1)}>
          right
        </button>
        <button className="bottom-left-rotate-right" onClick={() => this.handleRotate(0, 1, 1)}>
          right
        </button>
        <button className="bottom-right-rotate-left" onClick={() => this.handleRotate(1, 1, -1)}>
          left
        </button>
        <button className="bottom-right-rotate-right" onClick={() => this.handleRotate(1, 1, 1)}>
          right
        </button>
        <button className="bottom-left-rotate-left" onClick={() => this.handleRotate(0, 1, -1)}>
          left
        </button>
        <div className="pentago">
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
        {winner && <h1 className="winner">Winner: player {winner}</h1>}
      </div>
    );
  }
}

export default App;
