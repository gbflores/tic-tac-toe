"use client";

import { useState, useEffect, useCallback } from "react";
import Board from "@/components/Board";
import WinnerMessage from "@/components/WinnerMessage";
import ThemeToggle from "@/components/ThemeToggle";

type Player = "x" | "circle";
type Winner = Player | "draw" | null;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Home() {
  const [board, setBoard] = useState<(Player | null)[]>(Array(9).fill(null));
  const [isCircleTurn, setIsCircleTurn] = useState(false);
  const [winner, setWinner] = useState<Winner>(null);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // States for scoreboard
  const [xWins, setXWins] = useState<number>(0);
  const [oWins, setOWins] = useState<number>(0);
  const [drawCount, setDrawCount] = useState<number>(0);

  useEffect(() => {
    const storedXWins = localStorage.getItem("xWins");
    const storedOWins = localStorage.getItem("oWins");
    const storedDraws = localStorage.getItem("drawCount");

    if (storedXWins) setXWins(parseInt(storedXWins, 10));
    if (storedOWins) setOWins(parseInt(storedOWins, 10));
    if (storedDraws) setDrawCount(parseInt(storedDraws, 10));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const checkForWin = useCallback(
    (player: Player): boolean => {
      return winningCombinations.some((combo) =>
        combo.every((index) => board[index] === player)
      );
    },
    [board]
  );

  const checkForDraw = useCallback((): boolean => {
    return board.every((cell) => cell !== null);
  }, [board]);

  const handleCellClick = (index: number) => {
    if (board[index] !== null || winner) return;

    const currentPlayer: Player = isCircleTurn ? "circle" : "x";
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setIsCircleTurn(!isCircleTurn);
  };

  useEffect(() => {
    if (winner) return;

    const currentPlayer = !isCircleTurn ? "circle" : "x";
    if (checkForWin(currentPlayer)) {
      setWinner(currentPlayer);
      if (currentPlayer === "x") {
        setXWins((prev) => {
          const newVal = prev + 1;
          localStorage.setItem("xWins", newVal.toString());
          return newVal;
        });
      } else {
        setOWins((prev) => {
          const newVal = prev + 1;
          localStorage.setItem("oWins", newVal.toString());
          return newVal;
        });
      }
    } else if (checkForDraw()) {
      setWinner("draw");
      setDrawCount((prev) => {
        const newVal = prev + 1;
        localStorage.setItem("drawCount", newVal.toString());
        return newVal;
      });
    }
  }, [board, isCircleTurn, winner, checkForWin, checkForDraw]);

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsCircleTurn(false);
    setWinner(null);
  };

  const currentPlayer: Player = isCircleTurn ? "circle" : "x";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-pink-400 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 relative cursor-none">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {!winner && (
        <h1 className="text-white text-2xl mb-4">
          {currentPlayer === "x" ? "X" : "O"} turns
        </h1>
      )}

      {/* Use bg-gray-200 in light mode for contrast */}
      <div className="rounded-lg shadow-xl bg-gray-800 dark:bg-gray-800 p-4">
        <Board board={board} onCellClick={handleCellClick} />
      </div>

      {winner && <WinnerMessage winner={winner} onRestart={restartGame} />}

      <div className="flex justify-between w-80 mt-8">
        <div className="flex flex-col items-center">
          <span className="text-white text-xl">X Winnings</span>
          <span className="text-white text-2xl font-bold">{xWins}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white text-xl">Draws</span>
          <span className="text-white text-2xl font-bold">{drawCount}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white text-xl">O Winnings</span>
          <span className="text-white text-2xl font-bold">{oWins}</span>
        </div>
      </div>

      <div
        style={{ top: mouseY, left: mouseX }}
        className="pointer-events-none fixed translate-x-[-50%] translate-y-[-50%]"
      >
        {currentPlayer === "x" ? (
          <>
            <div className="absolute h-[6px] w-[40px] bg-white rotate-45"></div>
            <div className="absolute h-[6px] w-[40px] bg-white -rotate-45"></div>
          </>
        ) : (
          <div className="h-8 w-8 border-4 border-white rounded-full"></div>
        )}
      </div>
    </div>
  );
}
