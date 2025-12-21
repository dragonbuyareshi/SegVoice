'use client';

import React from 'react';
import { PROCESSES } from '@/lib/constants';

interface ProcessingViewProps {
  currentProcess: number;
  isDark: boolean;
}

export default function ProcessingView({ currentProcess, isDark }: ProcessingViewProps) {
  return (
    <div className="max-w-4xl mx-auto relative z-10">
      <div className={`p-12 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-3xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Processing Audio
        </h3>
        <div className="space-y-4">
          {PROCESSES.map((process, i) => (
            <div key={i} className="relative">
              <div className={`flex items-center justify-between p-4 rounded-xl ${
                i <= currentProcess 
                  ? (isDark ? 'bg-gray-700' : 'bg-gray-100') 
                  : (isDark ? 'bg-gray-800' : 'bg-gray-50')
              }`}>
                <span className={`text-lg ${
                  i <= currentProcess 
                    ? (isDark ? 'text-white' : 'text-gray-900') 
                    : (isDark ? 'text-gray-500' : 'text-gray-400')
                }`}>
                  {process}
                </span>
                {i < currentProcess && <span className="text-green-500 text-xl">✓</span>}
                {i === currentProcess && (
                  <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
              {i <= currentProcess && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}