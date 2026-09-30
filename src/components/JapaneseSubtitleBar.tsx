import React from 'react';
import { Volume2, RotateCcw, Eye, EyeOff, Sparkles } from 'lucide-react';
import { SubtitleState, tts } from '../utils/audio';

interface JapaneseSubtitleBarProps {
  subtitle: SubtitleState | null;
  onReplay?: () => void;
  showRomaji?: boolean;
  onToggleRomaji?: () => void;
  className?: string;
}

export const JapaneseSubtitleBar: React.FC<JapaneseSubtitleBarProps> = ({
  subtitle,
  onReplay,
  showRomaji = true,
  onToggleRomaji,
  className = '',
}) => {
  if (!subtitle) return null;

  const { japanese, romaji, english, charIndex, isSpeaking } = subtitle;

  // Split text around current character index for karaoke highlight effect
  const beforeChar = japanese.slice(0, Math.max(0, charIndex));
  const activeChar = japanese.slice(charIndex, charIndex + 2) || '';
  const afterChar = japanese.slice(charIndex + 2);

  return (
    <div
      className={`w-full max-w-xl mx-auto bg-slate-900/90 backdrop-blur-md text-white rounded-2xl border-2 border-sky-400/60 shadow-xl p-3.5 sm:p-4 animate-in fade-in slide-in-from-bottom-3 duration-200 ${className}`}
    >
      {/* Top Bar with Audio Indicator and Controls */}
      <div className="flex items-center justify-between text-xs text-sky-300 font-bold mb-2 pb-1.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Animated Waveform */}
          <div className="flex items-center gap-0.5 h-3.5">
            <span className={`w-1 bg-amber-400 rounded-full transition-all ${isSpeaking ? 'h-3.5 animate-pulse' : 'h-1.5'}`} />
            <span className={`w-1 bg-sky-400 rounded-full transition-all delay-75 ${isSpeaking ? 'h-4 animate-bounce' : 'h-2'}`} />
            <span className={`w-1 bg-pink-400 rounded-full transition-all delay-150 ${isSpeaking ? 'h-3 animate-pulse' : 'h-1'}`} />
          </div>
          <span className="tracking-wider uppercase text-[10px] bg-sky-500/20 text-sky-200 px-2 py-0.5 rounded-md border border-sky-400/30">
            Native Japanese Voice
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onToggleRomaji && (
            <button
              onClick={onToggleRomaji}
              title={showRomaji ? 'Hide Romaji' : 'Show Romaji'}
              className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded-md transition-colors"
            >
              {showRomaji ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              <span>{showRomaji ? 'Romaji' : 'Kana Only'}</span>
            </button>
          )}

          {onReplay && (
            <button
              onClick={onReplay}
              title="Replay Audio"
              className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer bg-amber-400/10 hover:bg-amber-400/20 px-2 py-0.5 rounded-md transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Japanese Subtitle Line with Real-Time Karaoke Highlight */}
      <div className="text-center my-1">
        <p className="text-2xl sm:text-3xl font-black font-['Zen_Maru_Gothic'] tracking-wide leading-snug drop-shadow-sm select-text">
          <span className="text-amber-300 transition-colors duration-150">{beforeChar}</span>
          <span className="text-white bg-sky-500/40 px-1 py-0.5 rounded-sm ring-1 ring-sky-300 animate-pulse font-extrabold">
            {activeChar}
          </span>
          <span className="text-slate-200 opacity-90">{afterChar}</span>
        </p>

        {/* Romaji Pronunciation Guide */}
        {showRomaji && romaji && (
          <p className="text-xs sm:text-sm font-mono text-sky-300 font-bold mt-1 tracking-wider">
            [{romaji}]
          </p>
        )}

        {/* English Translation */}
        {english && (
          <p className="text-xs sm:text-sm text-slate-300 italic font-medium mt-1">
            &ldquo;{english}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
};
