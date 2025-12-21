'use client';

import React from 'react';
import Link from 'next/link';
import { Volume2, Globe, Users, ChevronRight } from 'lucide-react';
import GridBackground from '@/components/GridBackground';
import { useTheme } from '@/components/ThemeProvider';

export default function HomePage() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <GridBackground isDark={isDark} />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-20"
            style={{
              background: `radial-gradient(circle, ${['#3b82f6', '#8b5cf6', '#ec4899'][i % 3]} 0%, transparent 70%)`,
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-7xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            SegVoice
          </h1>
          <p className={`text-2xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            AI-Powered Audio Processing & Analysis
          </p>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Advanced speech recognition, translation, and voice synthesis powered by cutting-edge neural networks
          </p>
        </div>

        <Link href="/workspace">
          <button className="group relative px-12 py-6 text-xl font-bold text-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
            <span className="relative flex items-center gap-3 justify-center">
              Get Started
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </Link>

        <div className="grid grid-cols-3 gap-6 mt-16">
          {[
            { icon: Volume2, label: '7 AI Models', desc: 'Integrated processing' },
            { icon: Globe, label: '200+ Languages', desc: 'Universal support' },
            { icon: Users, label: 'Multi-Speaker', desc: 'Diarization' }
          ].map((feature, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:scale-105 transition-transform duration-300`}
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {feature.label}
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
}