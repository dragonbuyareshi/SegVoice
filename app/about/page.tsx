'use client';

import React from 'react';
import GridBackground from '@/components/GridBackground';
import { useTheme } from '@/components/ThemeProvider';

export default function AboutPage() {
  const { isDark } = useTheme();

  const methods = [
    {
      title: '1. Background Noise & Overlapping Sound Reduction',
      desc: 'Utilizes RNNoise-based WebAssembly noise suppression with sub-30ms latency. Our advanced algorithms employ deep learning models trained on millions of audio samples to distinguish speech from background noise, achieving 95%+ accuracy in challenging acoustic environments.',
      tech: '@shiguredo/noise-suppression, @ricky0123/vad-web, rnnoise-wasm',
      features: ['Real-time Voice Activity Detection', 'Adaptive noise profiling', 'Multi-band spectral subtraction']
    },
    {
      title: '2. Voice Classification',
      desc: 'Deep learning-powered voice analysis that identifies speaker characteristics including gender, age group, and emotional tone. Uses MFCC extraction and TensorFlow.js models for high-precision classification.',
      tech: '@tensorflow/tfjs, meyda, ml5.js',
      features: ['Gender identification', 'Age estimation', 'Emotion recognition', 'Pitch and timbre analysis']
    },
    {
      title: '3. Language Identification',
      desc: 'State-of-the-art language detection supporting 126+ languages using Facebook\'s MMS-LID model. Achieves 95%+ accuracy even with short audio segments.',
      tech: '@xenova/transformers, franc',
      features: ['126+ language support', 'Sub-second detection', 'Confidence scoring', 'Dialect recognition']
    },
    {
      title: '4. Speaker Diarization',
      desc: 'Advanced speaker segmentation using Pyannote neural models with clustering algorithms. Automatically identifies "who spoke when" with 90%+ accuracy.',
      tech: '@xenova/transformers with Pyannote',
      features: ['Unlimited speaker detection', 'Timestamp precision', 'Speaker embedding extraction', 'Overlap handling']
    },
    {
      title: '5. Automatic Speech Recognition (ASR)',
      desc: 'Powered by OpenAI\'s Whisper model running in JavaScript. Delivers near-human-level transcription accuracy (95%+) with GPU acceleration.',
      tech: '@xenova/transformers (Whisper), @deepgram/sdk, vosk-browser',
      features: ['Multi-language support', 'Punctuation and formatting', 'Timestamp alignment', 'Real-time streaming']
    },
    {
      title: '6. Neural Machine Translation (NMT)',
      desc: 'Utilizes NLLB and M2M100 transformer models for high-quality translation between 200+ language pairs with 90%+ BLEU scores.',
      tech: '@xenova/transformers (NLLB-200), @aws-sdk/client-translate',
      features: ['200+ languages', 'Context-aware translation', 'Bidirectional support', 'Domain adaptation']
    },
    {
      title: '7. Text-to-Speech (TTS)',
      desc: 'Neural voice synthesis using Microsoft Azure\'s premium neural voices and Speecht5 models. Generates natural, human-like speech with prosody control.',
      tech: '@microsoft/cognitiveservices-speech-sdk, @xenova/transformers',
      features: ['Multiple voice options', 'Emotion control', 'Speed adjustment', 'Voice cloning']
    }
  ];

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      <GridBackground isDark={isDark} />
      
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            About SegVoice
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Next-Generation AI Audio Processing Platform
          </p>
        </div>

        <div className={`p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Introduction
          </h3>
          <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            SegVoice is a revolutionary desktop application built with Tauri and Next.js that brings enterprise-grade audio processing capabilities to your fingertips. Leveraging state-of-the-art neural networks and machine learning models, SegVoice provides real-time audio analysis, multi-language transcription, speaker identification, and voice synthesis with unprecedented accuracy and speed.
          </p>
        </div>

        {methods.map((method, i) => (
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
}