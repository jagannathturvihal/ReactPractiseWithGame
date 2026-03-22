import React from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "../winning-combinations"; 
import GameOver from "./components/GameOver";

const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function deriveActivePlayer (gameTurns) {
  let currntPlayer = 'X';

  if(gameTurns.length> 0 && gameTurns[0].player === 'X') {
    currntPlayer = 'O';
  }
  return currntPlayer;
}



function App() {
  const [gameTurns, setGameTurns] = React.useState([]);
  // const [activePlayer, setActivePlayer] = React.useState('X');
  
  const activePlayer = deriveActivePlayer(gameTurns);
  
  // let gameBoard = initialBoard;
  let gameBoard = [...initialBoard.map(innerArray => [...innerArray])];
  for(const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;
      
      gameBoard[row][col] = player;
  }

  let winner = null;

  for(const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

      if (firstSquareSymbol
        && firstSquareSymbol === secondSquareSymbol
        && firstSquareSymbol === thirdSquareSymbol
      ) {
        winner = firstSquareSymbol;
        break;
      }
  }

  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, columnIndex) {
    // setActivePlayer((curActivePlayer)=> curActivePlayer === 'X' ? 'O' : 'X');
    
    setGameTurns((prevTurns) => {
      let currntPlayer = deriveActivePlayer(prevTurns);
      // let currntPlayer = 'X';

      // if(prevTurns.length> 0 && prevTurns[0].player === 'X') {
      //   currntPlayer = 'O';
      // }

      
      const updatedTurns = [
        {square: { row: rowIndex, col: columnIndex}, player: currntPlayer },
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
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {(winner || hasDraw )&& <GameOver winner={winner} onRestart={handleRestart}/>}
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
