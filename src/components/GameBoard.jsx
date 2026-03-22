import React from "react"

// const initialBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null]
// ]

export default function GameBoard({onSelectSquare, board}) {
    // let gameBoard = initialBoard;
    // for(const turn of turns) {
    //     const {square, player} = turn;
    //     const {row, col} = square;
        
    //     gameBoard[row][col] = player;
    // }
    // const [gameBoard, setGameBoard]  = React.useState(initialBoard);

    // function handleBoardClick(rowIndex, colIndex) {
    //     setGameBoard((prevBoard) => {
    //         const newBoard = [...prevBoard.map(innerArray => [...innerArray])]; // Deep copy of the board
    //         newBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return newBoard;
    //     });
    //     onSelectSquare();
    // }

    return (
        <ol id="game-board"> 
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => 
                            <li key={colIndex}>
                                {/* <button onClick={() => handleBoardClick(rowIndex, colIndex)}>{playerSymbol}</button> */}
                                <button 
                                    onClick={() => onSelectSquare(rowIndex, colIndex)} 
                                    disabled = {playerSymbol !== null}
                                > 
                                    {playerSymbol}
                                </button>
                            </li>
                        )}
                    </ol>
                </li>
            ))}
        </ol>
    )
}
 