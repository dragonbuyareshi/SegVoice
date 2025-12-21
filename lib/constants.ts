import { Video, Users, MessageSquare, Mic, Phone, Monitor, Tv, Globe } from 'lucide-react';
import { Platform, TeamMember } from './types';

export const PROCESSES = [
  'Noise Reduction',
  'Voice Classification',
  'Language Identification',
  'Speaker Diarization',
  'ASR Processing',
  'Translation',
  'TTS Generation'
];

export const STREAMING_PLATFORMS: Platform[] = [
  { name: 'Zoom', icon: Video, color: 'from-blue-500 to-blue-600' },
  { name: 'Google Meet', icon: Users, color: 'from-green-500 to-green-600' },
  { name: 'Microsoft Teams', icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
  { name: 'Discord', icon: Mic, color: 'from-indigo-500 to-indigo-600' },
  { name: 'Skype', icon: Phone, color: 'from-cyan-500 to-cyan-600' },
  { name: 'WebEx', icon: Monitor, color: 'from-orange-500 to-orange-600' },
  { name: 'YouTube Live', icon: Tv, color: 'from-red-500 to-red-600' },
  { name: 'Browser Audio', icon: Globe, color: 'from-teal-500 to-teal-600' }
];

export const TEAM_MEMBERS: TeamMember[] = [
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
    name: 'Sneha Gupta',
    role: 'Full Stack Developer',
    bio: 'Building high-performance desktop applications with expertise in Tauri and modern web technologies.',
    image: '👨‍💼'
  }
];

export const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi'
];

export const TONES = [
  'Original', 'Professional', 'Casual', 'Excited',
  'Calm', 'Serious', 'Friendly', 'Authoritative'
];