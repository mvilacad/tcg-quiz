"use client";

import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { GameConfig } from "@/types/game";
import { defaultGameConfig } from "@/data/defaultConfig";

interface GameConfigContextType {
  config: GameConfig;
  updateConfig: (newConfig: Partial<GameConfig>) => void;
  resetConfig: () => void;
}

const GameConfigContext = createContext<GameConfigContextType | undefined>(undefined);

interface GameConfigProviderProps {
  children: ReactNode;
  initialConfig?: GameConfig;
}

export function GameConfigProvider({ children, initialConfig }: GameConfigProviderProps) {
  const [config, setConfig] = useState<GameConfig>(initialConfig || defaultGameConfig);

  const updateConfig = (newConfig: Partial<GameConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const resetConfig = () => {
    setConfig(defaultGameConfig);
  };

  return (
    <GameConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </GameConfigContext.Provider>
  );
}

export function useGameConfig() {
  const context = useContext(GameConfigContext);
  if (!context) {
    throw new Error("useGameConfig must be used within a GameConfigProvider");
  }
  return context;
}