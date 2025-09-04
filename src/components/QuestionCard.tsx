import type { Question } from "@/types/game";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 80) return "from-red-600 to-red-800 border-red-400";
    if (difficulty >= 60) return "from-orange-500 to-orange-700 border-orange-400";
    return "from-green-500 to-green-700 border-green-400";
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty >= 80) return "ÉPICO";
    if (difficulty >= 60) return "RARO";
    return "COMUM";
  };

  const getDifficultyGem = (difficulty: number) => {
    if (difficulty >= 80) return "💎";
    if (difficulty >= 60) return "🔷";
    return "🔸";
  };

  return (
    <div className="relative w-full">
      {/* Main Question Card - Clean and Focused */}
      <div className="bg-slate-800 rounded-2xl border-l-4 border-amber-400 shadow-xl overflow-hidden">
        
        {/* Question Header */}
        <div className="p-4 bg-gradient-to-r from-slate-800 to-slate-700">
          <div className="flex justify-between items-start gap-4">
            {/* Title and Category */}
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white mb-2 leading-tight">
                {question.title}
              </h2>
              {question.category && (
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                  {question.category}
                </span>
              )}
            </div>
            
            {/* Difficulty & Points */}
            <div className="text-right flex-shrink-0">
              <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${getDifficultyColor(question.difficulty)} rounded-full mb-2`}>
                <span>{getDifficultyGem(question.difficulty)}</span>
                <span className="text-white font-bold text-sm">{getDifficultyLabel(question.difficulty)}</span>
              </div>
              <div className="flex items-center justify-end gap-1">
                <span className="text-green-400 font-bold text-lg">{question.points}</span>
                <span className="text-green-400 text-sm">pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 bg-slate-750">
          <p className="text-slate-200 text-base leading-relaxed">
            {question.description}
          </p>
        </div>

        {/* Required Skills - Simplified */}
        <div className="px-4 py-3 bg-slate-700 border-t border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-400 font-medium text-sm">Habilidades necessárias:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {question.requiredSkills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}