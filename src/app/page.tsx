import { GameBoard } from "@/components/GameBoard";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-amber-900/20 pointer-events-none"></div>
      <div className="relative z-10">
        <GameBoard />
      </div>
    </div>
  );
}
