import React, { useState } from 'react';
import { Volume2, Bookmark, Check, Sparkles, HelpCircle } from 'lucide-react';
import { JapaneseWordBlock } from '../utils/parser';
import { tts, sfx } from '../utils/audio';

interface JapaneseCardProps {
  word: JapaneseWordBlock;
  onPracticeClick?: (word: JapaneseWordBlock) => void;
  onSaveWord?: (word: JapaneseWordBlock) => void;
  isSaved?: boolean;
}

export const JapaneseCard: React.FC<JapaneseCardProps> = ({
  word,
  onPracticeClick,
  onSaveWord,
  isSaved = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(isSaved);

  const handlePlayAudio = (rate: number = 0.85) => {
    setIsPlaying(true);
    // Prefer kanji or hiragana for TTS
    const speakText = word.kanji && word.kanji !== '—' ? word.kanji : word.hiragana;
    tts.speak(speakText, {
      rate,
      pitch: 1.15,
      lang: 'ja-JP',
      onEnd: () => setIsPlaying(false),
    });
  };

  const handleCopy = () => {
    const textToCopy = `${word.kanji !== '—' ? word.kanji + ' (' + word.hiragana + ')' : word.hiragana} - ${word.meaning}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSave = () => {
    setSaved(!saved);
    sfx.playCorrect();
    onSaveWord?.(word);
  };

  // Determine JLPT badge colors
  const jlptColors: Record<string, string> = {
    N5: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    N4: 'bg-sky-100 text-sky-800 border-sky-300',
    N3: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    N2: 'bg-purple-100 text-purple-800 border-purple-300',
    N1: 'bg-rose-100 text-rose-800 border-rose-300',
  };

  const badgeStyle = jlptColors[word.jlpt] || 'bg-amber-100 text-amber-800 border-amber-300';

  return (
    <div className="my-3 overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md border-2 border-sky-100 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Card Header with Level & Actions */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-sky-50 via-blue-50/60 to-white border-b border-sky-100">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black tracking-wide border ${badgeStyle}`}>
            {word.jlpt || 'JLPT'}
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Japanese Flashcard
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToggleSave}
            title={saved ? 'Saved in Flashcards' : 'Save to Flashcards'}
            className={`p-1.5 rounded-lg transition-colors ${
              saved
                ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-500' : ''}`} />
          </button>

          <button
            onClick={handleCopy}
            title="Copy Word"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <span className="text-xs font-medium px-1">Copy</span>}
          </button>
        </div>
      </div>

      {/* Main Showcase Section */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Main Word Typography */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              {/* Primary Visual: Kanji or Hiragana */}
              <span className="text-3xl sm:text-4xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                {word.kanji && word.kanji !== '—' ? word.kanji : word.hiragana}
              </span>

              {/* Hiragana Reading */}
              {word.kanji && word.kanji !== '—' && (
                <span className="text-lg font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                  {word.hiragana}
                </span>
              )}
            </div>

            {/* English Meaning */}
            <div className="text-base sm:text-lg font-semibold text-slate-700 flex items-center gap-1.5">
              <span>{word.meaning}</span>
            </div>
          </div>

          {/* Audio Playback Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => handlePlayAudio(0.85)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all transform active:scale-95 ${
                isPlaying
                  ? 'bg-amber-500 text-white shadow-amber-200 animate-pulse'
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sky-200'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlaying ? 'Playing...' : 'Pronounce'}</span>
            </button>

            <button
              onClick={() => handlePlayAudio(0.6)}
              title="Slow speed for beginners (0.6x)"
              className="px-2.5 py-2.5 rounded-xl text-xs font-bold text-sky-700 bg-sky-100 hover:bg-sky-200 transition-colors"
            >
              🐢 Slow
            </button>
          </div>
        </div>

        {/* 6-Line Structure Details Grid */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-slate-50/80 p-2.5 rounded-xl">
            <span className="text-slate-600 font-bold block mb-0.5">Romaji</span>
            <span className="font-mono text-slate-800 font-bold text-sm">{word.romaji}</span>
          </div>

          <div className="bg-slate-50/80 p-2.5 rounded-xl">
            <span className="text-slate-600 font-bold block mb-0.5">Hiragana</span>
            <span className="font-bold text-slate-800 text-sm">{word.hiragana}</span>
          </div>

          <div className="bg-slate-50/80 p-2.5 rounded-xl">
            <span className="text-slate-600 font-bold block mb-0.5">Katakana</span>
            <span className="font-bold text-slate-800 text-sm">{word.katakana}</span>
          </div>

          <div className="bg-slate-50/80 p-2.5 rounded-xl">
            <span className="text-slate-600 font-bold block mb-0.5">Kanji</span>
            <span className="font-bold text-slate-800 text-sm">{word.kanji || '—'}</span>
          </div>
        </div>

        {/* Action Drill Trigger */}
        {onPracticeClick && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => onPracticeClick(word)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Practice this word with Miyu</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
