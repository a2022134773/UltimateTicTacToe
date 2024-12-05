import React, { useState } from 'react';
import { SmallBox } from '../SmallBox';
import { calculateWinner } from '../../utils';
import "./Board.css";

export function Board({ status, setStatus, setWinner = null, index, setXIsNext, xIsNext, nextObligatory, setNextObligatory, player1Name = "", player2Name = "" }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isDraw, setIsDraw] = useState(false);

  function handleClick(i) {
    if (
      calculateWinner(squares) ||
      squares[i] ||
      calculateWinner(status) ||
      status == "finished" ||
      (nextObligatory !== null && nextObligatory !== index)
    ) {
      return;
    }
  
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  
    if (isBoardFull(nextSquares)) {
      setIsDraw(true);
    }
  
    const winner = calculateWinner(nextSquares);
      if (status[i]) {
        setNextObligatory(null);
      } else {
        setNextObligatory(i);
      }
  
    if (winner) {
      setStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[index] = winner;
        return updatedStatus;
      });
      setWinner(calculateWinner(status));
    }
  }

  let winner = calculateWinner(squares);

  if (status !== "finished" && winner) {
    status[index] = winner;
  } else if (isDraw) {
    status[index] = 'Empate!';
    winner = 'Empate!';
  }

  setWinner(calculateWinner(status));
  setStatus(status);

  function isBoardFull(squares) {
    return squares.every((square) => square !== null);
  }

  return (
    <>
      <div 
      style={{
        position: 'relative',
      }}
      className={`board ${(status !== 'finished' && ((index === nextObligatory || nextObligatory == null) && status[index] == null))
        ? 'highlight' 
        : ''}`}>
        <div className="board-row" >
          <SmallBox value={squares[0]} onSquareClick={() => handleClick(0)} />
          <SmallBox value={squares[1]} onSquareClick={() => handleClick(1)} />
          <SmallBox value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>

        <div className="board-row">
          <SmallBox value={squares[3]} onSquareClick={() => handleClick(3)} />
          <SmallBox value={squares[4]} onSquareClick={() => handleClick(4)} />
          <SmallBox value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>

        <div className="board-row">
          <SmallBox value={squares[6]} onSquareClick={() => handleClick(6)} />
          <SmallBox value={squares[7]} onSquareClick={() => handleClick(7)} />
          <SmallBox value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>

      {winner && (        
        <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          opacity: 0.5,
          pointerEvents: "none",
          backgroundColor: winner === "Empate!" ? "gray" : winner === "X" ? "blue" : "red",
        }}
        />)}
      </div>
    </>
  );
}
