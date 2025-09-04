import type { GameConfig } from "@/types/game";

export const defaultGameConfig: GameConfig = {
  teamMembers: [
    {
      id: "dev1",
      name: "João Frontend",
      specialty: "Frontend",
      skills: ["React", "TypeScript", "CSS", "UI/UX"],
      attackPower: 85,
      resistance: 70,
      description: "Especialista em interfaces modernas e experiência do usuário"
    },
    {
      id: "dev2", 
      name: "Maria Backend",
      specialty: "Backend",
      skills: ["Node.js", "Python", "Database", "API"],
      attackPower: 90,
      resistance: 85,
      description: "Expert em arquitetura de sistemas e performance"
    },
    {
      id: "dev3",
      name: "Carlos DevOps", 
      specialty: "DevOps",
      skills: ["Docker", "AWS", "CI/CD", "Monitoring"],
      attackPower: 80,
      resistance: 90,
      description: "Mestre em infraestrutura e automação"
    },
    {
      id: "dev4",
      name: "Ana QA",
      specialty: "QA",
      skills: ["Testing", "Automation", "Bug Detection", "Quality"],
      attackPower: 75,
      resistance: 80,
      description: "Guardiã da qualidade e testes"
    }
  ],
  questions: [
    {
      id: "q1",
      title: "Bug Crítico em Produção",
      description: "Sistema principal apresentando erro 500 para todos os usuários",
      difficulty: 90,
      requiredSkills: ["Backend", "Database", "Monitoring"],
      points: 100,
      category: "Emergency"
    },
    {
      id: "q2", 
      title: "Interface Não Responsiva",
      description: "Layout quebrado em dispositivos móveis",
      difficulty: 60,
      requiredSkills: ["Frontend", "CSS", "UI/UX"],
      points: 75,
      category: "Frontend"
    },
    {
      id: "q3",
      title: "Deploy Falhando",
      description: "Pipeline de CI/CD apresentando falhas intermitentes",
      difficulty: 70,
      requiredSkills: ["DevOps", "CI/CD", "Docker"],
      points: 85,
      category: "Infrastructure"
    },
    {
      id: "q4",
      title: "Testes Automatizados Quebrando",
      description: "Suite de testes com 15 falhas após última release",
      difficulty: 50,
      requiredSkills: ["Testing", "Automation", "Quality"],
      points: 60,
      category: "Quality"
    },
    {
      id: "q5",
      title: "Performance da API Lenta",
      description: "Endpoints com tempo de resposta acima de 3 segundos",
      difficulty: 80,
      requiredSkills: ["Backend", "Database", "API"],
      points: 90,
      category: "Performance"
    }
  ],
  maxQuestionsPerGame: 5,
  scoringRules: {
    perfectMatch: 1.5,
    skillMatch: 1.2,
    difficultyMultiplier: 0.01
  }
};