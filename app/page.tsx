'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Upload, Radio, Moon, Sun, Play, Pause, Download, ChevronRight, Mic, Video, Users, MessageSquare, Monitor, Tv, Phone, Globe } from 'lucide-react';

const SegVoiceApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [currentProcess, setCurrentProcess] = useState(0);
  const [results, setResults] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const processes = [
    'Noise Reduction',
    'Voice Classification',
    'Language Identification',
    'Speaker Diarization',
    'ASR Processing',
    'Translation',
    'TTS Generation'
  ];

  const streamingPlatforms = [
    { name: 'Zoom', icon: Video, color: 'from-blue-500 to-blue-600' },
    { name: 'Google Meet', icon: Users, color: 'from-green-500 to-green-600' },
    { name: 'Microsoft Teams', icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
    { name: 'Discord', icon: Mic, color: 'from-indigo-500 to-indigo-600' },
    { name: 'Skype', icon: Phone, color: 'from-cyan-500 to-cyan-600' },
    { name: 'WebEx', icon: Monitor, color: 'from-orange-500 to-orange-600' },
    { name: 'YouTube Live', icon: Tv, color: 'from-red-500 to-red-600' },
    { name: 'Browser Audio', icon: Globe, color: 'from-teal-500 to-teal-600' }
  ];

  const teamMembers = [
    { 
      name: 'Adarsh Bilgar', 
      role: 'Lead AI Engineer',
      bio: 'Specializing in speech recognition and neural networks with 5+ years of experience in audio processing systems.',
      image: '👨‍💻'
    },
    { 
      name: 'Shruti Patil', 
      role: 'ML Research Scientist',
      bio: 'Expert in natural language processing and translation models, focusing on multilingual audio systems.',
      image: '👩‍🔬'
    },
    { 
      name: 'Sneha C', 
      role: 'Audio DSP Engineer',
      bio: 'Pioneering work in noise reduction and voice enhancement algorithms for real-time processing.',
      image: '👩‍💼'
    },
    { 
      name: 'Snahe Gupta', 
      role: 'Full Stack Developer',
      bio: 'Building high-performance desktop applications with expertise in Tauri and modern web technologies.',
      image: '👨‍💼'
    }
  ];

  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi'];
  const tones = ['Original', 'Professional', 'Casual', 'Excited', 'Calm', 'Serious', 'Friendly', 'Authoritative'];

  useEffect(() => {
    if (results && canvasRef.current) {
      drawWaveform();
    }
  }, [results, isPlaying]);

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
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
      const progress = i / width;
      const amplitude = Math.sin(progress * Math.PI * 10 + Date.now() / 200) * 0.3 + 
                       Math.sin(progress * Math.PI * 3 + Date.now() / 500) * 0.2;
      const y = height / 2 + amplitude * height / 2;
      
      if (i === 0) ctx.moveTo(i, y);
      else ctx.lineTo(i, y);
    }
    
    ctx.stroke();
  };

  const simulateProcessing = () => {
    setProcessing(true);
    setCurrentProcess(0);
    
    const interval = setInterval(() => {
      setCurrentProcess(prev => {
        if (prev >= processes.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setProcessing(false);
            generateResults();
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const generateResults = () => {
    const mockResults = {
      speakers: [
        {
          id: 1,
          gender: 'Male',
          language: 'English',
          tone: 'Professional',
          transcript: 'Hello everyone, welcome to today\'s meeting. Let\'s discuss the quarterly results.',
          duration: '0:00 - 0:15',
          confidence: 0.95,
          metrics: {
            noiseReduction: { score: 94, latency: 28 },
            voiceClass: { score: 92, latency: 45 },
            langId: { score: 98, latency: 120 },
            diarization: { score: 89, latency: 2100 },
            asr: { score: 96, latency: 850 },
            nmt: { score: 91, latency: 450 },
            tts: { score: 93, latency: 680 }
          }
        },
        {
          id: 2,
          gender: 'Female',
          language: 'English',
          tone: 'Casual',
          transcript: 'Thanks for the introduction! I have some exciting updates to share about our recent achievements.',
          duration: '0:15 - 0:28',
          confidence: 0.93,
          metrics: {
            noiseReduction: { score: 96, latency: 25 },
            voiceClass: { score: 94, latency: 42 },
            langId: { score: 97, latency: 115 },
            diarization: { score: 91, latency: 2050 },
            asr: { score: 95, latency: 820 },
            nmt: { score: 92, latency: 430 },
            tts: { score: 94, latency: 650 }
          }
        },
        {
          id: 3,
          gender: 'Male',
          language: 'English',
          tone: 'Excited',
          transcript: 'This is fantastic news! The numbers are beyond our expectations for this quarter.',
          duration: '0:28 - 0:38',
          confidence: 0.91,
          metrics: {
            noiseReduction: { score: 93, latency: 30 },
            voiceClass: { score: 90, latency: 48 },
            langId: { score: 96, latency: 125 },
            diarization: { score: 88, latency: 2200 },
            asr: { score: 94, latency: 880 },
            nmt: { score: 90, latency: 470 },
            tts: { score: 92, latency: 700 }
          }
        }
      ],
      totalDuration: '0:38',
      averageConfidence: 0.93
    };
    
    setResults(mockResults);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      simulateProcessing();
    }
  };

  const toggleSpeakerSelection = (id) => {
    setSelectedSpeakers(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const GridBackground = () => (
    <div className="fixed inset-0 pointer-events-none opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${isDark ? '#374151' : '#e5e7eb'} 1px, transparent 1px),
                         linear-gradient(90deg, ${isDark ? '#374151' : '#e5e7eb'} 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <GridBackground />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
            style={{
              background: `radial-gradient(circle, ${['#3b82f6', '#8b5cf6', '#ec4899'][i % 3]} 0%, transparent 70%)`,
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-7xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            SegVoice
          </h1>
          <p className={`text-2xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            AI-Powered Audio Processing & Analysis
          </p>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Advanced speech recognition, translation, and voice synthesis powered by cutting-edge neural networks
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('workspace')}
          className="group relative px-12 py-6 text-xl font-bold text-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
          <span className="relative flex items-center gap-3">
            Get Started
            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
          </span>
        </button>

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
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.label}</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const WorkspacePage = () => (
    <div className="min-h-screen p-8 relative">
      <GridBackground />
      
      {!uploadedFile && !results && (
        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          <h2 className={`text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Choose Your Input Method
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`group relative p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
              onClick={() => setSelectedCard('upload')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Upload className="w-16 h-16 mb-4 text-blue-500 mx-auto" />
              <h3 className={`text-2xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Upload Audio
              </h3>
              <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Upload your audio files for processing and analysis
              </p>
            </div>

            <div
              className={`group relative p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
              onClick={() => setSelectedCard('stream')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Radio className="w-16 h-16 mb-4 text-purple-500 mx-auto" />
              <h3 className={`text-2xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Live Streaming
              </h3>
              <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Stream audio from meetings, videos, and platforms
              </p>
            </div>
          </div>

          {selectedCard === 'upload' && (
            <div className={`mt-8 p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} animate-fadeIn`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Upload Audio File
              </h3>
              <div className={`border-4 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-2xl p-12 text-center hover:border-blue-500 transition-colors`}>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="audioUpload"
                />
                <label htmlFor="audioUpload" className="cursor-pointer block">
                  <Upload className="w-20 h-20 mx-auto mb-4 text-blue-500" />
                  <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Click to upload or drag and drop
                  </p>
                  <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    Supports: MP3, WAV, OGG, M4A, FLAC
                  </p>
                </label>
              </div>
            </div>
          )}

          {selectedCard === 'stream' && (
            <div className={`mt-8 p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} animate-fadeIn`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Select Streaming Platform
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {streamingPlatforms.map((platform, i) => (
                  <div
                    key={i}
                    className={`group relative p-6 rounded-2xl ${isDark ? 'bg-gray-700/50' : 'bg-white'} border ${isDark ? 'border-gray-600' : 'border-gray-200'} hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <platform.icon className="w-12 h-12 mx-auto mb-3 text-gray-400 group-hover:text-white transition-colors" />
                    <p className={`text-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {platform.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {processing && (
        <div className="max-w-4xl mx-auto relative z-10">
          <div className={`p-12 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-3xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Processing Audio
            </h3>
            <div className="space-y-4">
              {processes.map((process, i) => (
                <div key={i} className="relative">
                  <div className={`flex items-center justify-between p-4 rounded-xl ${i <= currentProcess ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : (isDark ? 'bg-gray-800' : 'bg-gray-50')}`}>
                    <span className={`text-lg ${i <= currentProcess ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-gray-500' : 'text-gray-400')}`}>
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
      )}

      {results && (
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <div className={`p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Original Audio Waveform
            </h3>
            <canvas
              ref={canvasRef}
              width={1000}
              height={150}
              className="w-full rounded-xl"
            />
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-110 transition-transform"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Duration: {results.totalDuration}
              </span>
            </div>
          </div>

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

          <div className="grid gap-6">
            {results.speakers.map((speaker) => (
              <div
                key={speaker.id}
                className={`p-6 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:scale-[1.02] transition-all duration-300`}
              >
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
                    onClick={() => toggleSpeakerSelection(speaker.id)}
                    className={`p-3 rounded-xl ${selectedSpeakers.includes(speaker.id) ? 'bg-blue-500 text-white' : (isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')} hover:scale-110 transition-transform`}
                  >
                    {selectedSpeakers.includes(speaker.id) ? '✓' : '+'}
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
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Voice Tone:
                    </label>
                    <select className={`w-full p-3 rounded-xl ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} border`}>
                      {tones.map(tone => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen p-8 relative overflow-hidden">
      <GridBackground />
      
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h2 className={`text-5xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent`}>
            About SegVoice
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Next-Generation AI Audio Processing Platform
          </p>
        </div>

        <div className={`p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Introduction</h3>
          <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            SegVoice is a revolutionary desktop application built with Tauri and Next.js that brings enterprise-grade audio processing capabilities to your fingertips. Leveraging state-of-the-art neural networks and machine learning models, SegVoice provides real-time audio analysis, multi-language transcription, speaker identification, and voice synthesis with unprecedented accuracy and speed.
          </p>
        </div>

        {[
          {
            title: '1. Background Noise & Overlapping Sound Reduction',
            desc: 'Utilizes RNNoise-based WebAssembly noise suppression with sub-30ms latency. Our advanced algorithms employ deep learning models trained on millions of audio samples to distinguish speech from background noise, achieving 95%+ accuracy in challenging acoustic environments.',
            tech: '@shiguredo/noise-suppression, @ricky0123/vad-web, rnnoise-wasm',
            features: ['Real-time Voice Activity Detection', 'Adaptive noise profiling', 'Multi-band spectral subtraction']
          },
          {
            title: '2. Voice Classification',
            desc: 'Deep learning-powered voice analysis that identifies speaker characteristics including gender, age group, and emotional tone. Uses MFCC (Mel-frequency cepstral coefficients) extraction and TensorFlow.js models for high-precision classification.',
            tech: '@tensorflow/tfjs, meyda, ml5.js',
            features: ['Gender identification (Male/Female)', 'Age estimation (Child/Adult/Elderly)', 'Emotion recognition (Happy/Sad/Angry/Neutral)', 'Pitch and timbre analysis']
          },
          {
            title: '3. Language Identification',
            desc: 'State-of-the-art language detection supporting 126+ languages using Facebook\'s MMS-LID model through Hugging Face Transformers. Achieves 95%+ accuracy even with short audio segments and mixed-language scenarios.',
            tech: '@xenova/transformers, franc',
            features: ['126+ language support', 'Sub-second detection time', 'Confidence scoring', 'Dialect recognition']
          },
          {
            title: '4. Speaker Diarization',
            desc: 'Advanced speaker segmentation using Pyannote neural models with clustering algorithms. Automatically identifies "who spoke when" in multi-speaker conversations with 90%+ accuracy, perfect for meetings and interviews.',
            tech: '@xenova/transformers with Pyannote, Custom clustering',
            features: ['Unlimited speaker detection', 'Timestamp precision', 'Speaker embedding extraction', 'Overlap handling']
          },
          {
            title: '5. Automatic Speech Recognition (ASR)',
            desc: 'Powered by OpenAI\'s Whisper model running entirely in JavaScript. Delivers near-human-level transcription accuracy (95%+) with support for multiple languages and accents. GPU-accelerated for maximum performance on Windows 11.',
            tech: '@xenova/transformers (Whisper), @deepgram/sdk, vosk-browser',
            features: ['Multi-language support', 'Punctuation and formatting', 'Timestamp alignment', 'Real-time streaming', 'Offline capability']
          },
          {
            title: '6. Neural Machine Translation (NMT)',
            desc: 'Utilizes NLLB (No Language Left Behind) and M2M100 transformer models for high-quality translation between 200+ language pairs. Preserves context and nuance with 90%+ BLEU scores.',
            tech: '@xenova/transformers (NLLB-200), @aws-sdk/client-translate',
            features: ['200+ languages', 'Context-aware translation', 'Bidirectional support', 'Domain adaptation']
          },
          {
            title: '7. Text-to-Speech (TTS)',
            desc: 'Neural voice synthesis using Microsoft Azure\'s premium neural voices and open-source Speecht5 models. Generates natural, human-like speech with prosody control and voice cloning capabilities.',
            tech: '@microsoft/cognitiveservices-speech-sdk, @xenova/transformers',
            features: ['Multiple voice options', 'Emotion and tone control', 'Speed and pitch adjustment', 'SSML support', 'Voice cloning']
          }
        ].map((method, i) => (
          <div
            key={i}
            className={`p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:scale-[1.02] transition-transform duration-300`}
          >
            <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {method.title}
            </h3>
            <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {method.desc}
            </p>
            <div className="mb-4">
              <span className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Technologies: 
              </span>
              <span className={`text-sm ml-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {method.tech}
              </span>
            </div>
            <div className="space-y-2">
              {method.features.map((feature, j) => (
                <div key={j} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className={`p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Requirements & Tools
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className={`text-lg font-bold mb-3 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                System Requirements
              </h4>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>• Windows 11 Home or higher</li>
                <li>• 8GB RAM minimum (16GB recommended)</li>
                <li>• GPU with WebGL 2.0 support</li>
                <li>• 2GB free disk space</li>
                <li>• Internet connection (for cloud features)</li>
              </ul>
            </div>
            <div>
              <h4 className={`text-lg font-bold mb-3 ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                Core Technologies
              </h4>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>• Tauri 1.5+ (Rust backend)</li>
                <li>• Next.js 14+ (React framework)</li>
                <li>• TypeScript 5.0+</li>
                <li>• TensorFlow.js & ONNX Runtime</li>
                <li>• Web Audio API & WebAssembly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TeamPage = () => (
    <div className="min-h-screen p-8 relative overflow-hidden">
      <GridBackground />
      
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h2 className={`text-5xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent`}>
            Our Team
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            The Minds Behind SegVoice
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredMember(i)}
              onMouseLeave={() => setHoveredMember(null)}
              className={`group relative overflow-hidden rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-all duration-500 ${hoveredMember === i ? 'scale-105 shadow-2xl' : ''}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className={`p-8 transition-all duration-500 ${hoveredMember === i ? 'scale-110' : ''}`}>
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    {member.image}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className={`text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}>
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

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="relative">
              <Volume2 className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 blur-xl bg-purple-500/50 group-hover:bg-purple-500/80 transition-all" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wider">
              SegVoice
            </span>
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={() => setCurrentPage('about')}
              className={`text-lg font-semibold ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors relative group`}
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => setCurrentPage('team')}
              className={`text-lg font-semibold ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors relative group`}
            >
              Team
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-3 rounded-xl ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'} hover:scale-110 transition-all`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'workspace' && <WorkspacePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'team' && <TeamPage />}
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: ${isDark ? '#4b5563 #1f2937' : '#d1d5db #f3f4f6'};
        }
        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        *::-webkit-scrollbar-track {
          background: ${isDark ? '#1f2937' : '#f3f4f6'};
        }
        *::-webkit-scrollbar-thumb {
          background: ${isDark ? '#4b5563' : '#d1d5db'};
          border-radius: 4px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? '#6b7280' : '#9ca3af'};
        }
      `}</style>
    </div>
  );
};

export default SegVoiceApp;