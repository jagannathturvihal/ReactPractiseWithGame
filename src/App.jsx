import React, { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "../winning-combinations";
import GameOver from "./components/GameOver";
import { deriveActivePlayer, deriveGameBoard, deriveGameWinner, PLAYERS } from "./utils/DerivedFunctions";

function App() {
  const [gameTurns, setGameTurns] = React.useState([]);
  const [players, setPlayers] = React.useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveGameWinner(gameBoard, players);

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(
      (prevPlayers) => {
        return {
          ...prevPlayers,
          [symbol]: newName,
        }
      });
  }

  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, columnIndex) {
    setGameTurns((prevTurns) => {
      let currntPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: columnIndex }, player: currntPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
