# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TCG (Trading Card Game) application called "Battle of Developers" built with Next.js 15. The game is designed for software engineering workshop presentations where team members are represented as character cards and daily engineering problems are represented as challenge cards.

## Core Architecture

- **Framework**: Next.js 15 with App Router (`src/app/` structure)
- **Styling**: Tailwind CSS 4 with PostCSS
- **Type System**: TypeScript with strict mode enabled
- **Font System**: Geist Sans and Geist Mono via `next/font/google`
- **Import Aliases**: `@/*` maps to `./src/*`

## Development Commands

- **Development server**: `pnpm dev` (uses Turbopack)
- **Build**: `pnpm build` (uses Turbopack) 
- **Production server**: `pnpm start`
- **Linting**: `pnpm lint` (uses Biome)
- **Formatting**: `pnpm format` (uses Biome with 2-space indentation)

## Game Components Architecture

According to the README, the game should include:

- **Character Cards**: Represent team members with specialties, skills, attack power, and focus/resistance
- **Challenge Cards**: Represent engineering problems with difficulty levels and required skills
- **Game Board**: Main game interface
- **Score Board**: Tracking and ranking system

Planned structure includes components for `CharacterCard`, `ChallengeCard`, `GameBoard`, and `ScoreBoard`.

## Code Standards

- Uses Biome for linting and formatting with React and Next.js recommended rules
- 2-space indentation
- Imports are auto-organized
- TypeScript strict mode enabled
- Modern React patterns (function components, hooks)