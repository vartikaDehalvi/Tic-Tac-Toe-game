import React, { useState } from 'react';
import './App.css';

const App = () => {
	const initialBoard = Array(9).fill('');
	const [board, setBoard] = useState(initialBoard);
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [winner, setWinner] = useState('');

	const handleClick = (index) => {
		//End of the game- draw or winner
		if (board[index] !== '' || winner !== '') {
			return;
		}

		//If game continues
		setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
		const updatedBoard = [...board];
		updatedBoard[index] = currentPlayer;
		setBoard(updatedBoard); //update state
		checkWinner(updatedBoard); //uB as parameter to cW function
	};

	const checkWinner = (updatedBoard) => {
		const winningConditions = [
			//the value of variables a, b, c from winnigConditions[] represent the indices of updatedBoard
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8], // Rows
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8], // Columns
			[0, 4, 8],
			[2, 4, 6], // Diagonals
		];

		for (let i = 0; i < winningConditions.length; i++) {
			//iteration1. winningConditions[0] a=0, b=1, c=2;
			// iteration5. winningConditions[4]  a=1, b=4, c=7
			const [a, b, c] = winningConditions[i]; //destructure the values from each sub-array

			if (
				//	(eg. uB[1]=x, uB[4]=x, uB[7]=x but not equal to " ")
				updatedBoard[a] !== '' &&
				updatedBoard[a] === updatedBoard[b] &&
				updatedBoard[a] === updatedBoard[c]
			) {
				setWinner(`${updatedBoard[a]} wins`);
				return;
			}
		}

		if (!updatedBoard.includes('')) {
			setWinner('Draw');
		}
	};

	const resetGame = () => {
		setBoard(initialBoard);
		setCurrentPlayer('X');
		setWinner('');
	};

	return (
		<div className="App">
			<h1 style={{ textAlign: 'center' }}>Tic Tac Toe</h1>
			{winner && (
				<h2 style={{ textAlign: 'center' }} className="winner-message">
					{`${winner}`}
				</h2>
			)}
			{!winner && (
				<h2 style={{ textAlign: 'center' }} className="current-player">
					Current Player: {currentPlayer}
				</h2>
			)}
			<div className="board">
				{board.map((cell, index) => (
					<div
						key={index}
						className={`cell ${cell}`}
						onClick={() => handleClick(index)}
					>
						<span className="cell">{cell}</span>
					</div>
				))}
			</div>
			{winner && (
				<button className="reset-button" onClick={resetGame}>
					Reset Game
				</button>
			)}
		</div>
	);
};

export default App;
