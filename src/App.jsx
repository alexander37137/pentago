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
  };

  handleClick = (row, cell) => {
    const { pentago, player } = this.state;

    if (GameService.canSetValue(pentago, row, cell, player)) {
      const newState = {
        pentago: GameService.setValue(pentago, row, cell, player),
        player: GameService.setNextPlayer(player),
      };

      const winner = GameService.findPentagoWinner(newState.pentago);

      this.setState({ ...newState, winner });
    }
  };

  handleRotate(x, y, direction) {
    const { pentago } = this.state;
    const newState = {
      pentago: GameService.rotate(pentago, x, y, direction),
    };
    this.setState(newState);
  }

  render() {
    const { pentago, winner } = this.state;
    return (
      <div className="grid">
        <h1 className="title">Pentago</h1>
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
