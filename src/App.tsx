import { useState } from "react";
import "./App.css";

enum State {
  Unset = "",
  X = "X",
  O = "O",
}

export default function App() {
  const [board, setBoard] = useState<State[]>(Array(9).fill(State.Unset));
  const [userTurn, setUserTurn] = useState<State>(State.X);
  const [winner, setWinner] = useState<string | null>(null);

  // Check for winner
  const checkWinner = (board: State[]) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        board[a] !== State.Unset &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a]; // Return the winner (either "X" or "O")
      }
    }

    // Check for draw
    if (!board.includes(State.Unset)) {
      return "Draw";
    }

    return null;
  };

  const handleOnClickPlay = (index: number) => {
    if (board[index] === State.Unset && !winner) {
      const boardCopy = [...board];
      boardCopy[index] = userTurn;
      setBoard(boardCopy);

      const gameWinner = checkWinner(boardCopy);
      if (gameWinner) {
        setWinner(gameWinner);
      } else {
        setUserTurn(userTurn === State.X ? State.O : State.X);
      }
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(State.Unset));
    setUserTurn(State.X);
    setWinner(null);
  };

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      {winner && (
        <h2>{winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}</h2>
      )}
      <div className="grid">
        {board.map((b, i) => (
          <div
            className="grid-item"
            key={i}
            onClick={() => handleOnClickPlay(i)}
            style={{ cursor: winner ? "not-allowed" : "pointer" }}
          >
            {b}
          </div>
        ))}
      </div>
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
}
