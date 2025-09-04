"use client";

import { useState, useCallback } from "react";
import type { GameState, GameConfig, TeamMember, Question } from "@/types/game";

export function useGame(config: GameConfig) {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: null,
    selectedMembers: [],
    score: 0,
    questionsAnswered: 0,
    gameCompleted: false,
  });

  const startGame = useCallback(() => {
    const shuffledQuestions = [...config.questions].sort(() => Math.random() - 0.5);
    const firstQuestion = shuffledQuestions[0];
    
    setGameState({
      currentQuestion: firstQuestion,
      selectedMembers: [],
      score: 0,
      questionsAnswered: 0,
      gameCompleted: false,
    });
  }, [config]);

  const selectMember = useCallback((member: TeamMember) => {
    setGameState(prev => ({
      ...prev,
      selectedMembers: prev.selectedMembers.find(m => m.id === member.id) 
        ? prev.selectedMembers.filter(m => m.id !== member.id)
        : [...prev.selectedMembers, member]
    }));
  }, []);

  const calculateScore = useCallback((question: Question, members: TeamMember[]) => {
    if (members.length === 0) return 0;

    let score = question.points;
    const memberSkills = members.flatMap(m => m.skills);
    const matchingSkills = question.requiredSkills.filter(skill => 
      memberSkills.some(memberSkill => 
        memberSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );

    // Apply scoring rules
    const skillMatchRatio = matchingSkills.length / question.requiredSkills.length;
    if (skillMatchRatio === 1) {
      score *= config.scoringRules?.perfectMatch || 1.5;
    } else if (skillMatchRatio > 0) {
      score *= config.scoringRules?.skillMatch || 1.2;
    }

    // Difficulty bonus
    score += question.difficulty * (config.scoringRules?.difficultyMultiplier || 0.01);

    return Math.round(score);
  }, [config]);

  const submitAnswer = useCallback(() => {
    if (!gameState.currentQuestion) return;

    const earnedScore = calculateScore(gameState.currentQuestion, gameState.selectedMembers);
    const nextQuestionIndex = gameState.questionsAnswered + 1;
    const hasMoreQuestions = nextQuestionIndex < (config.maxQuestionsPerGame || config.questions.length);
    
    setGameState(prev => ({
      ...prev,
      score: prev.score + earnedScore,
      questionsAnswered: prev.questionsAnswered + 1,
      currentQuestion: hasMoreQuestions ? config.questions[nextQuestionIndex] : null,
      selectedMembers: [],
      gameCompleted: !hasMoreQuestions,
    }));
  }, [gameState, config, calculateScore]);

  const resetGame = useCallback(() => {
    setGameState({
      currentQuestion: null,
      selectedMembers: [],
      score: 0,
      questionsAnswered: 0,
      gameCompleted: false,
    });
  }, []);

  return {
    gameState,
    startGame,
    selectMember,
    submitAnswer,
    resetGame,
    calculateScore: (question: Question, members: TeamMember[]) => 
      calculateScore(question, members),
  };
}