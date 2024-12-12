type Player = "x" | "circle";
type Winner = Player | "draw" | null;

interface WinnerMessageProps {
  winner: Winner;
  onRestart: () => void;
}

export default function WinnerMessage({
  winner,
  onRestart,
}: WinnerMessageProps) {
  const getMessage = () => {
    if (winner === "draw") return "Draw!";
    return winner === "circle" ? "O Win!" : "X Win!";
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80">
      <p className="text-white text-5xl mb-4">{getMessage()}</p>
      <button
        onClick={onRestart}
        className="text-2xl bg-teal-600 text-white px-6 py-3 rounded hover:bg-white hover:text-teal-600 transition-colors"
      >
        Restart!
      </button>
    </div>
  );
}
