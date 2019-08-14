import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]],
  };

  makeMove = (row, col) => {
    if (this.state.board[row][col] || this.state.winner) return;

    let xs = 0;
    let os = 0;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (this.state.board[r][c] === 'X') xs++;
        if (this.state.board[r][c] === 'O') os++;
      }
    }

    let nextMove;
    xs === os
      ? // x's turn : o's turn
        (nextMove = 'X')
      : (nextMove = 'O');

    const nextBoard = this.state.board;
    nextBoard[row][col] = nextMove;

    this.setState({board: nextBoard}, this.checkEndGame);
  };

  checkEndGame = () => {
    const board = this.state.board;
    let winner;

    // rows
    board.map((row, i) => (
      (board[i][0] === board[i][1] && board[i][0] === board[i][2]) ?
        ((board[i][0]) ? (winner = board[i][0]) : winner) : null
    ));

    // cols
    board.map((col, j) => (
      (board[0][j] === board[1][j] && board[0][j] === board[2][j]) ?
        ((board[0][j]) ? (winner = board[0][j]) : winner) : null
    ));

    // diagonals
    if ((board[0][0] === board[1][1] && board[0][0] === board[2][2]) ?
      ((board[0][0]) ? (winner = board[0][0]) : winner) :
      (board[0][2] === board[1][1] && board[0][2] === board[2][0]) ?
      ((board[0][2]) ? (winner = board[0][2]) : winner) : null)
      this.setState({winner});
  };

  render() {
    return (
      <div className="App">
        {this.state.winner ? <h1>{this.state.winner}</h1> : null}

        <div className="board">
          {[...Array(3)].map((row, i) => (
            <div key={i} className="row">
              {[...Array(3)].map((col, j) => (
                <div key={j} className="cell" onClick={() => this.makeMove(i, j)}>
                  {this.state.board[i][j]}
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
