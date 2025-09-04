import type { TeamMember } from "@/types/game";

interface TeamMemberCardProps {
  member: TeamMember;
  isSelected?: boolean;
  onSelect?: (member: TeamMember) => void;
  disabled?: boolean;
  variant?: 'default' | 'compact';
}

export function TeamMemberCard({ member, isSelected, onSelect, disabled, variant = 'default' }: TeamMemberCardProps) {
  if (variant === 'compact') {
    return (
      <div
        className={`
          relative w-full h-full cursor-pointer transition-all duration-300
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          touch-manipulation
        `}
        onClick={() => !disabled && onSelect?.(member)}
      >
        {/* Simplified Card - UX Optimized */}
        <div className={`
          relative w-full h-full rounded-lg overflow-hidden bg-slate-800
          border-2 ${isSelected ? 'border-amber-400 bg-amber-900/20 shadow-lg shadow-amber-400/30' : 'border-slate-600'}
          transition-all duration-300 hover:border-slate-500
        `}>

          {/* Header - Name & Avatar */}
          <div className="p-3 border-b border-slate-700">
            <div className="flex items-center gap-2">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-amber-500 flex-shrink-0 flex items-center justify-center font-bold text-slate-900 text-sm">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  member.name.charAt(0)
                )}
              </div>
              {/* Name & Role */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm truncate leading-tight">
                  {member.name}
                </h3>
                <p className="text-slate-400 text-xs truncate">
                  {member.specialty}
                </p>
              </div>
              {/* Selection Check */}
              {isSelected && (
                <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-xs">✓</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats - Clear and Prominent */}
          <div className="px-3 py-2 bg-slate-750">
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <span className="text-red-400 text-sm">⚔</span>
                <span className="text-white font-bold">{member.attackPower}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-blue-400 text-sm">🛡</span>
                <span className="text-white font-bold">{member.resistance}</span>
              </div>
            </div>
          </div>

          {/* Key Skills - Max 2 for quick scanning */}
          <div className="px-3 py-2 bg-slate-700">
            <div className="flex flex-wrap gap-1">
              {member.skills.slice(0, 2).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded font-medium"
                >
                  {skill}
                </span>
              ))}
              {member.skills.length > 2 && (
                <span className="px-2 py-0.5 bg-slate-600 text-slate-300 text-xs rounded">
                  +{member.skills.length - 2}
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }
  return (
    <div
      className={`
        relative w-full max-w-sm mx-auto cursor-pointer transition-all duration-300 hover-glow card-reveal
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        touch-manipulation
      `}
      onClick={() => !disabled && onSelect?.(member)}
    >
      <div className={`
        relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 
        rounded-2xl p-1 card-shadow overflow-hidden
        ${isSelected ? "gold-border" : "border-2 border-slate-600"}
      `}>
        {/* Card Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-600"></div>
        </div>

        {/* Shimmer Effect for Selected Cards */}
        {isSelected && (
          <div className="absolute inset-0 gold-shimmer rounded-2xl"></div>
        )}

        <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
          {/* Header with Avatar and Name */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-0.5">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-lg sm:text-xl font-bold text-amber-400 font-fantasy">{member.name.charAt(0)}</span>
                  )}
                </div>
              </div>
              {/* Rarity Gem */}
              <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full border-2 border-slate-800 flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-fantasy font-bold text-amber-100 text-base sm:text-lg text-shadow truncate">{member.name}</h3>
              <p className="text-xs sm:text-sm text-amber-300 font-serif italic truncate">{member.specialty}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center border-2 border-red-300 flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm">⚔</span>
              </div>
              <span className="text-red-200 font-bold text-sm sm:text-base">{member.attackPower}</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-blue-200 font-bold text-sm sm:text-base">{member.resistance}</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center border-2 border-blue-300 flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm">🛡</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {member.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-purple-100 text-xs rounded-full font-medium border border-purple-400/50 text-shadow"
                >
                  {skill.length > 8 ? skill.substring(0, 8) + '...' : skill}
                </span>
              ))}
              {member.skills.length > 4 && (
                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gradient-to-r from-gray-600 to-gray-800 text-gray-100 text-xs rounded-full font-medium border border-gray-400/50">
                  +{member.skills.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Description - Only show on larger screens or if short */}
          {member.description && (
            <div className="pt-2 border-t border-slate-600/50 hidden sm:block">
              <p className="text-xs text-slate-300 font-serif italic leading-relaxed line-clamp-2">{member.description}</p>
            </div>
          )}

          {/* Card Type Banner */}
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold shadow-lg">
            HERO
          </div>
        </div>
      </div>
    </div>
  );
}