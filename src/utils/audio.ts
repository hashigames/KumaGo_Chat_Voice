/**
 * Audio and TTS Engine for kumaGO 橋 MIYU Sensei
 * With Real-Time Native Japanese Subtitle Synchronization
 */

import { generateSubtitleFromJapanese } from './japaneseUtils';

export interface SubtitleState {
  japanese: string;
  romaji: string;
  english?: string;
  charIndex: number;
  wordIndex: number;
  isSpeaking: boolean;
  totalLength: number;
}

// Simple Web Audio API Sound Effects Synthesizer (Zero asset dependency)
class SoundFX {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Pleasant cheerful bell chime for correct answers
  playCorrect() {
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Note 1 (E5: 659.25Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Note 2 (A5: 880Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.12);
      gain2.gain.setValueAtTime(0.2, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.55);
    } catch {
      // Audio context may be restricted by autoplay policy
    }
  }

  // Triumphant game-like fanfare for Level Up!
  playLevelUp() {
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.11);
        gain.gain.setValueAtTime(0.22, now + idx * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.11 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.11);
        osc.stop(now + idx * 0.11 + 0.45);
      });
    } catch {
      // Audio context restricted
    }
  }

  // Soft gentle retry click
  playRetry() {
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(330, now + 0.25);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }
}

export const sfx = new SoundFX();

export interface SpeakOptions {
  rate?: number; // 0.5 to 1.5, default 0.85
  pitch?: number; // default 1.15 (friendly female anime sensei tone)
  onStart?: () => void;
  onEnd?: () => void;
  onSubtitle?: (sub: SubtitleState) => void;
  lang?: 'ja-JP' | 'en-US';
  englishTranslation?: string;
  romajiHint?: string;
}

type SubtitleListener = (sub: SubtitleState | null) => void;

/**
 * Native SpeechSynthesis Engine with Subtitles
 */
class JapaneseTTSEngine {
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private jaVoice: SpeechSynthesisVoice | null = null;
  private enVoice: SpeechSynthesisVoice | null = null;
  private subtitleListeners: Set<SubtitleListener> = new Set();
  private currentSubtitle: SubtitleState | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  subscribeSubtitle(listener: SubtitleListener) {
    this.subtitleListeners.add(listener);
    // Push current immediately
    listener(this.currentSubtitle);
    return () => {
      this.subtitleListeners.delete(listener);
    };
  }

  private notifySubtitle(sub: SubtitleState | null) {
    this.currentSubtitle = sub;
    this.subtitleListeners.forEach((fn) => fn(sub));
  }

  loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    this.jaVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('ja') &&
          (v.name.includes('Google') ||
            v.name.includes('Natural') ||
            v.name.includes('Kyoko') ||
            v.name.includes('Nanami') ||
            v.name.includes('Otoya'))
      ) ||
      voices.find((v) => v.lang.startsWith('ja')) ||
      null;

    this.enVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Google') ||
            v.name.includes('Natural') ||
            v.name.includes('Samantha') ||
            v.name.includes('Victoria'))
      ) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      null;
  }

  getAvailableVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
    return window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('ja'));
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.activeUtterance = null;
    }
    this.notifySubtitle(null);
  }

  speak(text: string, options: SpeakOptions = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      options.onEnd?.();
      return;
    }

    this.stop();
    this.loadVoices();

    const isJa =
      options.lang === 'ja-JP' ||
      /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isJa ? 'ja-JP' : 'en-US';

    if (isJa && this.jaVoice) {
      utterance.voice = this.jaVoice;
    } else if (!isJa && this.enVoice) {
      utterance.voice = this.enVoice;
    }

    // Default rate: 0.85 for clear Japanese learning pronunciation
    utterance.rate = options.rate ?? (isJa ? 0.85 : 1.0);
    // Slightly higher pitch for Miyu's cheerful anime voice
    utterance.pitch = options.pitch ?? (isJa ? 1.15 : 1.0);

    // Prepare Subtitle info
    const subMeta = generateSubtitleFromJapanese(text);
    const initialSubtitle: SubtitleState = {
      japanese: text,
      romaji: options.romajiHint || subMeta.romaji,
      english: options.englishTranslation || subMeta.english,
      charIndex: 0,
      wordIndex: 0,
      isSpeaking: true,
      totalLength: text.length,
    };

    utterance.onstart = () => {
      this.notifySubtitle(initialSubtitle);
      options.onStart?.();
      options.onSubtitle?.(initialSubtitle);
    };

    // Real-time boundary event as syllables/words are articulated
    utterance.onboundary = (event) => {
      if (event.name === 'word' || event.name === 'sentence') {
        const updatedSubtitle: SubtitleState = {
          ...initialSubtitle,
          charIndex: event.charIndex,
          wordIndex: Math.floor(event.charIndex / 3),
          isSpeaking: true,
        };
        this.notifySubtitle(updatedSubtitle);
        options.onSubtitle?.(updatedSubtitle);
      }
    };

    utterance.onend = () => {
      this.activeUtterance = null;
      // Keep subtitle visible for a moment then clear
      setTimeout(() => {
        if (!this.activeUtterance) {
          this.notifySubtitle(null);
        }
      }, 1500);
      options.onEnd?.();
    };

    utterance.onerror = () => {
      this.activeUtterance = null;
      this.notifySubtitle(null);
      options.onEnd?.();
    };

    this.activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  speakJapanese(text: string, options: SpeakOptions = {}) {
    return this.speak(text, { ...options, lang: 'ja-JP' });
  }

  /**
   * Speak structured text containing <speak lang="ja">...</speak> tags
   */
  speakTaggedText(
    text: string,
    options: SpeakOptions = {}
  ) {
    this.stop();

    // Parse text into segments
    const regex = /<speak lang="ja">([\s\S]*?)<\/speak>/g;
    const jaSnippets: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const snippet = match[1].trim();
      if (snippet) jaSnippets.push(snippet);
    }

    // Also look for 【Romaji】 ... 【Meaning】 context to enhance subtitles!
    let englishMeaning = options.englishTranslation;
    let romajiHint = options.romajiHint;
    const meaningMatch = text.match(/【Meaning】\s*([^\n\r]+)/);
    if (meaningMatch) englishMeaning = meaningMatch[1].trim();
    const romajiMatch = text.match(/【Romaji】\s*([^\n\r]+)/);
    if (romajiMatch) romajiHint = romajiMatch[1].trim();

    if (jaSnippets.length > 0) {
      // Speak the primary Japanese tags
      const spokenText = jaSnippets.join('、 ');
      this.speak(spokenText, {
        ...options,
        lang: 'ja-JP',
        englishTranslation: englishMeaning,
        romajiHint,
      });
    } else {
      // Look for any Japanese sentences or clean text
      const clean = text
        .replace(/【[^】]+】[^\n\r]+/g, '')
        .replace(/<[^>]+>/g, '')
        .trim();
      this.speak(clean.slice(0, 150), {
        ...options,
        englishTranslation: englishMeaning,
        romajiHint,
      });
    }
  }
}

export const tts = new JapaneseTTSEngine();
