'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { Results } from '@/lib/types';
import SpeakerCard from './SpeakerCard';

interface ResultsViewProps {
  results: Results;
  isDark: boolean;
  audioBuffer?: AudioBuffer | null;
}

export default function ResultsView({ results, isDark, audioBuffer }: ResultsViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSpeakers, setSelectedSpeakers] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (audioBuffer && canvasRef.current) {
      drawStaticWaveform();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      stopAudio();
    };
  }, [audioBuffer, isDark]);

  // Draw real waveform from audio buffer
  const drawStaticWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas || !audioBuffer) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const data = audioBuffer.getChannelData(0);
    const step = Math.ceil(data.length / width);
    const amp = height / 2;
    
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = isDark ? '#1f2937' : '#f3f4f6';
    ctx.fillRect(0, 0, width, height);
    
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(0.5, '#8b5cf6');
    gradient.addColorStop(1, '#ec4899');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < width; i++) {
      const min = Math.min(...Array.from({ length: step }, (_, j) => data[i * step + j] || 0));
      const max = Math.max(...Array.from({ length: step }, (_, j) => data[i * step + j] || 0));
      
      if (i === 0) {
        ctx.moveTo(i, amp * (1 + min));
      }
      
      ctx.lineTo(i, amp * (1 + min));
      ctx.lineTo(i, amp * (1 + max));
    }
    
    ctx.stroke();
  };

  // Animate waveform while playing
  const animateWaveform = (startTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !audioBuffer || !isPlaying) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const currentTime = (Date.now() - startTime) / 1000;
    const progress = Math.min(currentTime / audioBuffer.duration, 1);
    
    drawStaticWaveform();
    
    // Draw progress indicator
    const x = progress * canvas.width;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
    
    if (progress < 1 && isPlaying) {
      animationRef.current = requestAnimationFrame(() => animateWaveform(startTime));
    } else {
      setIsPlaying(false);
    }
  };

  const playAudio = async () => {
    if (!audioBuffer) return;
    
    try {
      // Create audio context if not exists
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const audioContext = audioContextRef.current;
      
      // Stop current playback if any
      stopAudio();
      
      // Create and start new source
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
      sourceRef.current = source;
      
      setIsPlaying(true);
      animateWaveform(Date.now());
      
      // Auto-stop when finished
      source.onended = () => {
        setIsPlaying(false);
        drawStaticWaveform();
      };
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  const stopAudio = () => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop();
        sourceRef.current.disconnect();
      } catch (e) {
        // Already stopped
      }
      sourceRef.current = null;
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    setIsPlaying(false);
    drawStaticWaveform();
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  const toggleSpeakerSelection = (id: number) => {
    setSelectedSpeakers(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative z-10">
      {/* Waveform Display */}
      <div className={`p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Original Audio Waveform
        </h3>
        <canvas ref={canvasRef} width={1000} height={150} className="w-full rounded-xl" />
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={togglePlayback}
            disabled={!audioBuffer}
            className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <div className="text-center">
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              Duration: {results.totalDuration}
            </span>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Avg Confidence: {(results.averageConfidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Processing Performance
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.speakers.length > 0 && (
            <>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Latency</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {Object.values(results.speakers[0].metrics).reduce((sum, m) => sum + m.latency, 0).toFixed(0)}ms
                </p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Avg Score</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  {(Object.values(results.speakers[0].metrics).reduce((sum, m) => sum + m.score, 0) / 7).toFixed(1)}%
                </p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Speakers</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  {results.speakers.length}
                </p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Language</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                  {results.speakers[0].language}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Speaker Segments Header */}
      <div className="flex justify-between items-center">
        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Speaker Segments ({results.speakers.length})
        </h3>
        {selectedSpeakers.length > 0 && (
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform">
            Play Selected ({selectedSpeakers.length})
          </button>
        )}
      </div>

      {/* Speaker Cards */}
      <div className="grid gap-6">
        {results.speakers.map((speaker) => (
          <SpeakerCard
            key={speaker.id}
            speaker={speaker}
            isDark={isDark}
            isSelected={selectedSpeakers.includes(speaker.id)}
            onToggleSelect={toggleSpeakerSelection}
          />
        ))}
      </div>
    </div>
  );
}