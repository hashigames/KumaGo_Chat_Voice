import React, { useState } from 'react';
import { KumaGOLogo } from './Logo';
import { Flame, Zap, Volume2, VolumeX, Sparkles, BookOpen, Trophy, Download } from 'lucide-react';

export type NavTab = 'chat' | 'library' | 'grammar' | 'vocab' | 'kana';

interface GamificationHeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  xp: number;
  level: number;
  streak: number;
  isMuted: boolean;
  onToggleMute: () => void;
  ttsSpeed: number;
  onSpeedChange: (speed: number) => void;
  langMode: 'en' | 'ja';
  onToggleLang: () => void;
}

export const GamificationHeader: React.FC<GamificationHeaderProps> = ({
  activeTab,
  onTabChange,
  xp,
  level,
  streak,
  isMuted,
  onToggleMute,
  ttsSpeed,
  onSpeedChange,
  langMode,
  onToggleLang,
}) => {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // Calculate XP within current level (e.g. 100 XP per level)
  const xpCurrent = xp % 100;
  const xpTarget = 100;
  const progressPercent = Math.min(100, Math.round((xpCurrent / xpTarget) * 100));

  const navItems: Array<{ id: NavTab; labelEn: string; labelJa: string }> = [
    { id: 'chat', labelEn: 'Home', labelJa: 'ホーム' },
    { id: 'library', labelEn: 'Library (図書館)', labelJa: '図書館' },
    { id: 'grammar', labelEn: 'Grammar', labelJa: '文法' },
    { id: 'vocab', labelEn: 'Vocabulary', labelJa: '単語帳' },
    { id: 'kana', labelEn: 'Kana', labelJa: 'かな' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-sky-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
        {/* Left: Brand Logo in Rounded Pill Container */}
        <div className="flex items-center gap-2">
          <div className="bg-sky-50/90 border border-sky-200/80 px-3 py-1.5 rounded-full shadow-xs flex items-center">
            <KumaGOLogo size="sm" showSubtitle={false} />
          </div>
        </div>

        {/* Center: Navigation Pills (Aligned with kumago.lighthashi.dev) */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#15254A] text-white shadow-sm shadow-[#15254A]/30'
                    : 'text-slate-600 hover:text-[#15254A] hover:bg-sky-50'
                }`}
              >
                {langMode === 'ja' ? item.labelJa : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Right: Gamification Badges, Level, Streak, Audio & Language Pill */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Level & XP Mini Bar */}
          <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold text-amber-900 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Lv.{level}</span>
            <div className="w-16 h-2 bg-amber-200/70 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-amber-700/80">{xpCurrent}/{xpTarget}XP</span>
          </div>

          {/* Streak Counter Pill */}
          <div className="flex items-center gap-1 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/90 px-2.5 py-1 rounded-full text-xs font-black text-orange-700 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
            <span>{streak}</span>
          </div>

          {/* Audio Controls */}
          <div className="relative">
            <button
              onClick={onToggleMute}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className={`p-1.5 rounded-full border text-xs transition-colors cursor-pointer ${
                isMuted
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Speech Speed Pill */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              {ttsSpeed}x
            </button>
            {showSpeedMenu && (
              <div className="absolute right-0 mt-1 w-24 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 text-xs">
                {[0.6, 0.85, 1.0, 1.25].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onSpeedChange(s);
                      setShowSpeedMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-sky-50 font-medium ${
                      ttsSpeed === s ? 'text-sky-600 font-bold bg-sky-50/60' : 'text-slate-700'
                    }`}
                  >
                    {s}x {s === 0.85 ? '(Default)' : s === 0.6 ? '(Slow)' : ''}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Toggle Pill */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>{langMode === 'ja' ? '🇯🇵 JP' : '🇬🇧 EN'}</span>
          </button>

          {/* Download Code Button ("descargar todo el codigo") */}
          <a
            href="/api/download-project-zip"
            download="kumago-japanese-learning-app-code.zip"
            title="Descargar todo el código del proyecto (.zip) / Download full project code"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Descargar Código</span>
            <span className="sm:hidden">ZIP</span>
          </a>
        </div>
      </div>
    </header>
  );
};
