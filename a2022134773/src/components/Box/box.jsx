import React, { useState, useEffect } from "react";
import "./box.css";
import { Board } from "../Board";
import ResetButton from "../ResetButton/ResetButton";
import { calculateWinner } from "../../utils";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Box() {
  const [status, setStatus] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [nextObligatory, setNextObligatory] = useState(null);

  const NUMBER_OF_MINUTES = 10;
  const [xTimer, setXTimer] = useState(NUMBER_OF_MINUTES * 60);
  const [oTimer, setOTimer] = useState(NUMBER_OF_MINUTES * 60);
  const [xTimerOn, setXTimerOn] = useState(xIsNext);
  const [oTimerOn, setOTimerOn] = useState(!xIsNext);

  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  useEffect(() => {
    Swal.fire({
      title: "Enter Player Names",
      html: `
        <input id="player1" class="swal2-input" placeholder="Player X" />
        <input id="player2" class="swal2-input" placeholder="Player Y" />
      `,
      confirmButtonText: "Start Game",
      preConfirm: () => {
        const input1 = document.getElementById("player1");
        const input2 = document.getElementById("player2");

        if (!input1.value || !input2.value) {
          Swal.showValidationMessage("Please enter both player names");
        } else {
          return {
            player1: input1.value,
            player2: input2.value,
          };
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { player1, player2 } = result.value;
        setPlayer1Name(player1);
        setPlayer2Name(player2);
      }
    });
  }, []);

  useEffect(() => {
    let interval = null;
    if (xTimerOn && player1Name) {
      interval = setInterval(() => {
        setXTimer((xTimer) => xTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [xTimerOn, xTimer]);

  useEffect(() => {
    let interval = null;
    if (oTimerOn && player2Name) {
      interval = setInterval(() => {
        setOTimer((oTimer) => oTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [oTimerOn, oTimer]);

  useEffect(() => {
    setXTimerOn(xIsNext);
    setOTimerOn(!xIsNext);
  }, [xIsNext]);

  useEffect(() => {
    if (xTimer <= 0 || oTimer <= 0) {
      let xBoardsWins = 0;
      let oBoardsWins = 0;
      if (status !== "finished") {
        status.forEach((board) => {
          if (board === "X") {
            xBoardsWins++;
          } else if (board === "O") {
            oBoardsWins++;
          }
        });
      }
      if (xBoardsWins > oBoardsWins) {
        setWinner(player1Name);
      } else if (oBoardsWins > xBoardsWins) {
        setWinner(player2Name);
      } else {
        setWinner("Draw");
      }
      setStatus("finished");
    }
  }, [xTimer, oTimer]);
  return (
    <>
      <div className="divGeral">
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "40px",
            marginBotton: "40px",
          }}
        >
          {!winner && xTimer > 0 && oTimer > 0
            ? "Next player: " + (xIsNext ? player1Name : player2Name)
            : "Winner: " + (winner ? winner : "")}
          {xTimer <= 0 ? `${player2Name} wins` : ""}
          {xTimer > 0 && status !== "finished" && (
            <p style={{
              marginTop: "1em ",
              marginBottom: "1em "
            
            }}>
              {player1Name} Timer:{" "}
              {xTimer / 60 >= 10
                ? Math.floor(xTimer / 60)
                : "0" + Math.floor(xTimer / 60)}
              :{xTimer % 60 >= 10 ? xTimer % 60 : "0" + (xTimer % 60)}
            </p>
          )}
          {oTimer <= 0 ? `${player1Name} wins` : ""}
          {oTimer > 0 && status !== "finished" && (
            <p>
              {player2Name} Timer:{" "}
              {oTimer / 60 >= 10
                ? Math.floor(oTimer / 60)
                : "0" + Math.floor(oTimer / 60)}
              :{oTimer % 60 >= 10 ? oTimer % 60 : "0" + (oTimer % 60)}
            </p>
          )}
        </p>
        <div className="status">
          {Array(9)
            .fill(null)
            .map((box, index) => {
              return (
                <Board
                  index={index}
                  key={index}
                  status={status}
                  setStatus={setStatus}
                  setXIsNext={setXIsNext}
                  xIsNext={xIsNext}
                  setWinner={setWinner}
                  setNextObligatory={setNextObligatory}
                  nextObligatory={nextObligatory}
                  player1Name={player1Name}
                  player2Name={player2Name}
                />
              );
            })}
        </div>
        <ResetButton
          onResetClick={() => {
            window.location.reload();
          }}
        />
      </div>
    </>
  );
}
