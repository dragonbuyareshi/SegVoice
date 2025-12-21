'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { Speaker } from '@/lib/types';
import { LANGUAGES, TONES } from '@/lib/constants';

interface SpeakerCardProps {
  speaker: Speaker;
  isDark: boolean;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}

export default function SpeakerCard({ speaker, isDark, isSelected, onToggleSelect }: SpeakerCardProps) {
  return (
    <div className={`p-6 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:scale-[1.02] transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Speaker {speaker.id}
          </h4>
          <div className="flex gap-4 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
              {speaker.gender}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
              {speaker.language}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-700'}`}>
              {speaker.tone}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
              {speaker.duration}
            </span>
          </div>
        </div>
        <button
          onClick={() => onToggleSelect(speaker.id)}
          className={`p-3 rounded-xl ${isSelected ? 'bg-blue-500 text-white' : (isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')} hover:scale-110 transition-transform`}
        >
          {isSelected ? '✓' : '+'}
        </button>
      </div>

      <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {speaker.transcript}
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Translate to:
          </label>
          <select className={`w-full p-3 rounded-xl ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} border`}>
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Voice Tone:
          </label>
          <select className={`w-full p-3 rounded-xl ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} border`}>
            {TONES.map(tone => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform">
          Play Original
        </button>
        <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform">
          Play Customized
        </button>
        <button className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-200'} hover:scale-110 transition-transform`}>
          <Download size={20} />
        </button>
      </div>

      <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
        <h5 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Performance Metrics
        </h5>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                <th className="text-left py-2">Method</th>
                <th className="text-right py-2">Score</th>
                <th className="text-right py-2">Latency (ms)</th>
              </tr>
            </thead>
            <tbody className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              <tr><td className="py-2">Noise Reduction</td><td className="text-right">{speaker.metrics.noiseReduction.score}%</td><td className="text-right">{speaker.metrics.noiseReduction.latency}</td></tr>
              <tr><td className="py-2">Voice Classification</td><td className="text-right">{speaker.metrics.voiceClass.score}%</td><td className="text-right">{speaker.metrics.voiceClass.latency}</td></tr>
              <tr><td className="py-2">Language ID</td><td className="text-right">{speaker.metrics.langId.score}%</td><td className="text-right">{speaker.metrics.langId.latency}</td></tr>
              <tr><td className="py-2">Speaker Diarization</td><td className="text-right">{speaker.metrics.diarization.score}%</td><td className="text-right">{speaker.metrics.diarization.latency}</td></tr>
              <tr><td className="py-2">ASR Processing</td><td className="text-right">{speaker.metrics.asr.score}%</td><td className="text-right">{speaker.metrics.asr.latency}</td></tr>
              <tr><td className="py-2">Translation (NMT)</td><td className="text-right">{speaker.metrics.nmt.score}%</td><td className="text-right">{speaker.metrics.nmt.latency}</td></tr>
              <tr><td className="py-2">TTS Generation</td><td className="text-right">{speaker.metrics.tts.score}%</td><td className="text-right">{speaker.metrics.tts.latency}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}