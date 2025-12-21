'use client';

import React from 'react';
import Link from 'next/link';
import { Volume2, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navigation() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <Volume2 className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 blur-xl bg-purple-500/50 group-hover:bg-purple-500/80 transition-all" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wider">
            SegVoice
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/about"
            className={`text-lg font-semibold ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors relative group`}
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/team"
            className={`text-lg font-semibold ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors relative group`}
          >
            Team
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-xl ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'} hover:scale-110 transition-all`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}