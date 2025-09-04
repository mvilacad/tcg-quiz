"use client";

import { useState, useRef, useEffect } from "react";
import type { TeamMember } from "@/types/game";
import { TeamMemberCard } from "./TeamMemberCard";

interface CardCarouselProps {
  members: TeamMember[];
  selectedMembers: TeamMember[];
  onSelect: (member: TeamMember) => void;
}

export function CardCarousel({ members, selectedMembers, onSelect }: CardCarouselProps) {
  const [focusedIndex, setFocusedIndex] = useState(Math.floor(members.length / 2));
  const [touchStart, setTouchStart] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (index: number, member: TeamMember) => {
    if (index === focusedIndex) {
      onSelect(member);
    } else {
      setFocusedIndex(index);
    }
  };

  // Touch navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const touchDiff = touchStart - touchEnd;

    if (Math.abs(touchDiff) > 50) { // Minimum swipe distance
      if (touchDiff > 0 && focusedIndex < members.length - 1) {
        // Swipe left - next card
        setFocusedIndex(focusedIndex + 1);
      } else if (touchDiff < 0 && focusedIndex > 0) {
        // Swipe right - previous card
        setFocusedIndex(focusedIndex - 1);
      }
    }
    
    setTouchStart(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && focusedIndex > 0) {
        setFocusedIndex(focusedIndex - 1);
      } else if (e.key === 'ArrowRight' && focusedIndex < members.length - 1) {
        setFocusedIndex(focusedIndex + 1);
      } else if (e.key === 'Enter' || e.key === ' ') {
        onSelect(members[focusedIndex]);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [focusedIndex, members, onSelect]);

  const getCardStyle = (index: number) => {
    const distance = Math.abs(index - focusedIndex);
    const isCenter = index === focusedIndex;
    const isSelected = selectedMembers.some(m => m.id === members[index].id);
    
    let scale = 1;
    let opacity = 0.9;
    let zIndex = 1;
    let translateX = 0;
    let rotateY = 0;

    if (isCenter) {
      scale = 1.2;
      opacity = 1;
      zIndex = 10;
      translateX = 0;
      rotateY = 0;
    } else if (distance === 1) {
      scale = 1;
      opacity = 0.8;
      zIndex = 5;
      translateX = index < focusedIndex ? -40 : 40;
      rotateY = index < focusedIndex ? 8 : -8;
    } else if (distance === 2) {
      scale = 0.9;
      opacity = 0.6;
      zIndex = 3;
      translateX = index < focusedIndex ? -70 : 70;
      rotateY = index < focusedIndex ? 12 : -12;
    } else {
      scale = 0.8;
      opacity = 0.4;
      zIndex = 1;
      translateX = index < focusedIndex ? -90 : 90;
      rotateY = index < focusedIndex ? 15 : -15;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      filter: isSelected ? 'brightness(1.2) saturate(1.3) drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' : 'none',
    };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-900/40 pointer-events-none" />
      
      {/* Cards Container - Show Multiple Cards */}
      <div 
        ref={carouselRef}
        className="relative flex items-center justify-center w-full h-full touch-manipulation"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: '1000px' }}
      >
        {members.map((member, index) => {
          const isSelected = selectedMembers.some(m => m.id === member.id);
          const isCenter = index === focusedIndex;
          
          return (
            <div
              key={member.id}
              className={`absolute cursor-pointer transition-all duration-500 ease-out ${
                isSelected ? 'z-20' : ''
              }`}
              style={getCardStyle(index)}
              onClick={() => handleCardClick(index, member)}
            >
              {/* Card Glow Effect for Center Card */}
              {isCenter && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-amber-500/20 to-amber-400/30 rounded-2xl blur-xl -z-10 animate-pulse" />
              )}
              
              {/* Selected Card Glow */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/40 via-amber-500/30 to-amber-400/40 rounded-2xl blur-lg -z-10" />
              )}
              
              {/* TCG Card using the new compact variant */}
              <div className="w-36 h-52 sm:w-40 sm:h-56">
                <TeamMemberCard 
                  member={member}
                  isSelected={isSelected}
                  onSelect={onSelect}
                  variant="compact"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Simplified Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-slate-800/90 rounded-lg px-4 py-2">
        <button
          onClick={() => focusedIndex > 0 && setFocusedIndex(focusedIndex - 1)}
          disabled={focusedIndex === 0}
          className="w-8 h-8 rounded flex items-center justify-center disabled:opacity-30 hover:bg-slate-700 transition-all"
        >
          <span className="text-white text-lg">←</span>
        </button>

        <div className="text-center min-w-0 max-w-32">
          <p className="text-white font-bold text-sm truncate">
            {members[focusedIndex]?.name}
          </p>
          <p className="text-slate-400 text-xs">
            {focusedIndex + 1} de {members.length}
          </p>
        </div>

        <button
          onClick={() => focusedIndex < members.length - 1 && setFocusedIndex(focusedIndex + 1)}
          disabled={focusedIndex === members.length - 1}
          className="w-8 h-8 rounded flex items-center justify-center disabled:opacity-30 hover:bg-slate-700 transition-all"
        >
          <span className="text-white text-lg">→</span>
        </button>
      </div>
    </div>
  );
}