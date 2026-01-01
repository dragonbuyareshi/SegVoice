'use client';

import React, { useState } from 'react';
import { Upload, Radio } from 'lucide-react';
import GridBackground from '@/components/GridBackground';
import { useTheme } from '@/components/ThemeProvider';
import { STREAMING_PLATFORMS } from '@/lib/constants';
import { Results } from '@/lib/types';
import ProcessingView from '@/components/workspace/ProcessingView';
import ResultsView from '@/components/workspace/ResultsView';
import { audioProcessor } from '@/lib/audioProcessor';

export default function WorkspacePage() {
  const { isDark } = useTheme();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [currentProcess, setCurrentProcess] = useState(0);
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/flac', 'audio/x-m4a'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|ogg|m4a|flac)$/i)) {
      setError('Please upload a valid audio file (MP3, WAV, OGG, M4A, FLAC)');
      return;
    }

    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }

    setError(null);
    setUploadedFile(file);
    await processAudioFile(file);
  };

  const processAudioFile = async (file: File) => {
    setProcessing(true);
    setCurrentProcess(0);

    try {
      // Process audio with real-time progress updates
      const result = await audioProcessor.processAudio(file, (step: number) => {
        setCurrentProcess(step);
      });

      // Wait a bit to show final step
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProcessing(false);
      setResults(result);
    } catch (err) {
      console.error('Audio processing error:', err);
      setError('Failed to process audio file. Please try another file.');
      setProcessing(false);
      setUploadedFile(null);
    }
  };

  const resetWorkspace = () => {
    setSelectedCard(null);
    setUploadedFile(null);
    setResults(null);
    setError(null);
    audioProcessor.dispose();
  };

  return (
    <div className="min-h-screen p-8 relative">
      <GridBackground isDark={isDark} />
      
      {/* Error Display */}
      {error && (
        <div className="max-w-4xl mx-auto mb-8 relative z-10">
          <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300">
            <p className="font-semibold">{error}</p>
          </div>
        </div>
      )}

      {!uploadedFile && !results && (
        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          <h2 className={`text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Choose Your Input Method
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Card */}
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
                Upload your audio files for real-time AI processing
              </p>
            </div>

            {/* Streaming Card */}
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

          {/* Upload File Section */}
          {selectedCard === 'upload' && (
            <div className={`mt-8 p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} animate-fadeIn`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Upload Audio File for AI Processing
              </h3>
              <div className={`border-4 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-2xl p-12 text-center hover:border-blue-500 transition-colors`}>
                <input
                  type="file"
                  accept="audio/*,.mp3,.wav,.ogg,.m4a,.flac"
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
                    Supports: MP3, WAV, OGG, M4A, FLAC (Max 50MB)
                  </p>
                  <p className={`text-xs mt-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    Real-time AI processing with 7 advanced algorithms
                  </p>
                </label>
              </div>
            </div>
          )}

          {/* Streaming Platforms Section */}
          {selectedCard === 'stream' && (
            <div className={`mt-8 p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} animate-fadeIn`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Select Streaming Platform
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STREAMING_PLATFORMS.map((platform, i) => (
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

      {/* Processing View */}
      {processing && (
        <ProcessingView currentProcess={currentProcess} isDark={isDark} />
      )}

      {/* Results View */}
      {results && (
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto mb-8">
            <button
              onClick={resetWorkspace}
              className={`px-6 py-3 rounded-xl ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} font-semibold transition-all`}
            >
              ← Process Another File
            </button>
          </div>
          <ResultsView results={results} isDark={isDark} audioBuffer={audioProcessor.getAudioBuffer()} />
        </div>
      )}
    </div>
  );
}