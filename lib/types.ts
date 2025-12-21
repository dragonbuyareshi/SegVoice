import { LucideIcon } from 'lucide-react';

export interface Metrics {
  score: number;
  latency: number;
}

export interface Speaker {
  id: number;
  gender: string;
  language: string;
  tone: string;
  transcript: string;
  duration: string;
  confidence: number;
  metrics: {
    noiseReduction: Metrics;
    voiceClass: Metrics;
    langId: Metrics;
    diarization: Metrics;
    asr: Metrics;
    nmt: Metrics;
    tts: Metrics;
  };
}

export interface Results {
  speakers: Speaker[];
  totalDuration: string;
  averageConfidence: number;
}

export interface Platform {
  name: string;
  icon: LucideIcon;
  color: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}