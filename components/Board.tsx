import Cell from "./Cell";

type Player = "x" | "circle";

interface BoardProps {
  board: (Player | null)[];
  onCellClick: (index: number) => void;
}

export default function Board({ board, onCellClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-0 w-[300px] h-[300px]">
      {board.map((value, index) => (
        <Cell key={index} value={value} onClick={() => onCellClick(index)} />
      ))}
    </div>
  );
}
