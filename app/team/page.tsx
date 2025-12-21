'use client';

import React, { useState } from 'react';
import GridBackground from '@/components/GridBackground';
import { useTheme } from '@/components/ThemeProvider';
import { TEAM_MEMBERS } from '@/lib/constants';

export default function TeamPage() {
  const { isDark } = useTheme();
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      <GridBackground isDark={isDark} />
      
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Our Team
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            The Minds Behind SegVoice
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredMember(i)}
              onMouseLeave={() => setHoveredMember(null)}
              className={`group relative overflow-hidden rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-all duration-500 ${hoveredMember === i ? 'scale-105 shadow-2xl' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className={`p-8 transition-all duration-500 ${hoveredMember === i ? 'scale-110' : ''}`}>
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    {member.image}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {member.role}
                  </p>
                </div>
                
                <div className={`transition-all duration-500 ${hoveredMember === i ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}