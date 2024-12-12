type Player = "x" | "circle";

interface CellProps {
  value: Player | null;
  onClick: () => void;
}

export default function Cell({ value, onClick }: CellProps) {
  const cellClasses =
    "w-[100px] h-[100px] border-2 border-white flex items-center justify-center relative";

  return (
    <div className={cellClasses} onClick={onClick}>
      {value === "x" && (
        <>
          <div className="absolute h-[15%] w-[90%] bg-white rotate-45"></div>
          <div className="absolute h-[15%] w-[90%] bg-white -rotate-45"></div>
        </>
      )}
      {value === "circle" && (
        <div className="absolute h-[90%] w-[90%] border-8 border-white rounded-full"></div>
      )}
    </div>
  );
}
