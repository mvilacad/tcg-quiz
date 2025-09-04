# Workshop TCG - "Battle of Developers"

**Descrição do Projeto**  
Este projeto é um jogo de cartas estilo TCG (Trading Card Game) desenvolvido em **Next.js**, criado como uma dinâmica interativa para workshops de apresentação do setor de Engenharia de Software. O jogo tem como objetivo engajar os participantes, apresentando os membros da equipe e seus conhecimentos de forma lúdica e educativa.  

---

## Mecânica do Jogo

1. **Cartas de Personagem (Developers)**  
   - Cada membro da equipe é representado por uma carta de personagem.  
   - A carta possui atributos que definem suas habilidades, como:
     - **Especialidade** (Frontend, Backend, DevOps, QA, etc.)  
     - **Habilidades Especiais** (Ex: "Resolve bugs rapidamente", "Otimizador de performance", etc.)  
     - **Poder de Ataque** (quantifica a capacidade do personagem de resolver problemas complexos)  
     - **Resistência / Foco** (quanto tempo/energia o personagem aguenta trabalhando em um problema)  

2. **Cartas de Desafio (Mobs / Problemas)**  
   - Cada problema do dia a dia de engenharia de software é representado como um **mob**.  
   - Cada mob possui:
     - **Nome / Enunciado do Problema** (Ex: “Bug crítico em produção”)  
     - **Dificuldade** (pontuação que representa a complexidade do desafio)  
     - **Habilidade Especial Necessária** (Ex: "Conhecimento em React", "Debug em backend")  

3. **Turno do Jogador**  
   - Ao receber um desafio, o jogador deve **escolher o(s) melhor(es) personagem(s)** para resolvê-lo.  
   - A combinação correta entre habilidades do personagem e requisitos do problema garante pontos de sucesso.  
   - A estratégia entra em jogo ao decidir quais personagens alocar para cada problema, equilibrando dificuldade e habilidades.

4. **Sistema de Pontuação**  
   - Cada desafio resolvido gera pontos baseados em:
     - Adequação do personagem escolhido ao problema  
     - Nível de dificuldade do desafio  
   - Pontuação final serve para ranking ou simplesmente para acompanhar o progresso do participante durante a dinâmica.

5. **Objetivo do Jogo**  
   - Resolver o máximo de desafios usando a equipe da forma mais eficiente possível.  
   - Introduzir os membros do time de forma divertida e mostrar suas especialidades e pontos fortes.

---

## Tecnologias

- **Frontend:** Next.js, React  
- **Estilização:** CSS Modules / Tailwind CSS (ou outra de preferência)  
- **Gerenciamento de Estado:** React Context ou Redux (opcional)  
- **Hospedagem:** Vercel / Netlify (opcional)

---

## Estrutura do Projeto

```bash
├─ components/
│  ├─ CharacterCard.tsx      # Carta de personagem
│  ├─ ChallengeCard.tsx      # Carta de problema
│  ├─ GameBoard.tsx          # Área principal do jogo
│  └─ ScoreBoard.tsx         # Pontuação e ranking
├─ pages/
│  ├─ index.tsx              # Tela inicial / menu
│  ├─ game.tsx               # Tela principal do jogo
│  └─ results.tsx            # Resultados da rodada
├─ public/
│  └─ images/                # Avatares, ilustrações dos personagens
├─ styles/
│  └─ globals.css
└─ README.md
