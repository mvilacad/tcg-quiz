export interface TeamMember {
  id: string;
  name: string;
  specialty: string;
  skills: string[];
  attackPower: number;
  resistance: number;
  avatar?: string;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  requiredSkills: string[];
  points: number;
  category?: string;
}

export interface GameConfig {
  teamMembers: TeamMember[];
  questions: Question[];
  maxQuestionsPerGame?: number;
  scoringRules?: {
    perfectMatch: number;
    skillMatch: number;
    difficultyMultiplier: number;
  };
}

export interface GameState {
  currentQuestion: Question | null;
  selectedMembers: TeamMember[];
  score: number;
  questionsAnswered: number;
  gameCompleted: boolean;
}