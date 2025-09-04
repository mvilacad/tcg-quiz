"use client";

import { useGame } from "@/hooks/useGame";
import { useGameConfig } from "@/contexts/GameContext";
import { TeamMemberCard } from "./TeamMemberCard";
import { QuestionCard } from "./QuestionCard";
import { CardCarousel } from "./CardCarousel";

export function GameBoard() {
  const { config } = useGameConfig();
  const { gameState, startGame, selectMember, submitAnswer, resetGame, calculateScore } = useGame(config);

  if (!gameState.currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="text-center max-w-2xl w-full">
          {/* Title with ornamental design */}
          <div className="relative mb-8 sm:mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-xl sm:rounded-2xl blur-xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-amber-500/50 card-shadow">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-fantasy font-bold text-amber-100 text-shadow mb-4 leading-tight">
                ⚔️ Battle of Developers ⚔️
              </h1>
              <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mb-4"></div>
              <p className="text-base sm:text-xl text-amber-200 font-serif italic leading-relaxed">
                Escolha os melhores desenvolvedores para resolver os desafios épicos!
              </p>
            </div>
          </div>

          {gameState.gameCompleted ? (
            <div className="bg-gradient-to-br from-green-800/80 to-green-900/80 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-green-400/50 card-shadow mb-6 sm:mb-8">
              <div className="text-4xl sm:text-6xl mb-4">🏆</div>
              <h2 className="text-2xl sm:text-4xl font-fantasy font-bold text-green-200 mb-4 text-shadow">
                Vitória Gloriosa!
              </h2>
              <div className="bg-green-700/50 rounded-lg sm:rounded-xl p-4 mb-6 border border-green-500/50">
                <p className="text-xl sm:text-3xl font-bold text-green-100 mb-2">
                  Pontuação Final: <span className="text-amber-300">{gameState.score}</span>
                </p>
                <p className="text-sm sm:text-base text-green-200 font-serif">
                  Questões Conquistadas: {gameState.questionsAnswered}
                </p>
              </div>
              <button
                onClick={resetGame}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl font-bold text-base sm:text-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-green-400/50 btn-mobile"
              >
                🔄 Nova Batalha
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={startGame}
                className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white rounded-xl sm:rounded-2xl font-fantasy font-bold text-lg sm:text-2xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-blue-400/50 hover-glow btn-epic pulse-glow-animation btn-mobile"
              >
                <span className="relative z-10">⚡ Iniciar Batalha ⚡</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const potentialScore = calculateScore(gameState.currentQuestion, gameState.selectedMembers);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-900">
      {/* Simplified Header */}
      <div className="flex-shrink-0 px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚔️</span>
            <div>
              <span className="text-white font-bold text-sm">Questão {gameState.questionsAnswered + 1}/{config.maxQuestionsPerGame || config.questions.length}</span>
              <span className="ml-4 text-green-400 font-bold">💰 {gameState.score}</span>
              {gameState.selectedMembers.length > 0 && (
                <span className="ml-2 text-blue-400 text-sm">+{potentialScore}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Question Area - More Prominent */}
      <div className="flex-shrink-0 p-4 bg-slate-850">
        <QuestionCard question={gameState.currentQuestion} />
      </div>

      {/* Hero Selection Carousel */}
      <div className="flex-1 relative bg-slate-900">
        <div className="absolute top-4 left-4 z-20">
          <p className="text-slate-400 text-sm font-medium">Selecione seus heróis:</p>
        </div>
        
        <CardCarousel 
          members={config.teamMembers}
          selectedMembers={gameState.selectedMembers}
          onSelect={selectMember}
        />
      </div>

      {/* Bottom Action Bar - Simplified */}
      <div className="flex-shrink-0 p-4 bg-slate-800 border-t border-slate-700">
        <div className="flex gap-3">
          <button
            onClick={submitAnswer}
            disabled={gameState.selectedMembers.length === 0}
            className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all ${
              gameState.selectedMembers.length > 0
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {gameState.selectedMembers.length > 0 
              ? `Enfrentar (${gameState.selectedMembers.length})`
              : 'Selecione heróis'
            }
          </button>
          <button
            onClick={resetGame}
            className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}