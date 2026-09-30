import React, { useState, useEffect } from 'react';
import { MIYU_OFFICIAL_SPRITES, MIYU_CELSHADE_SPRITES, MiyuMood, AnimeStyle } from '../assets/miyu';
import { Volume2, Sparkles, Heart, RefreshCw, MessageSquare, BookOpen, Rocket, Smile, Palette } from 'lucide-react';
import { tts, SubtitleState } from '../utils/audio';
import { JapaneseSubtitleBar } from './JapaneseSubtitleBar';

interface MiyuSenseiAvatarProps {
  mood?: MiyuMood;
  isSpeaking?: boolean;
  speechText?: string;
  onAvatarClick?: () => void;
  className?: string;
  size?: 'normal' | 'large' | 'compact';
  activeSubtitle?: SubtitleState | null;
  animeStyle?: AnimeStyle;
  onToggleAnimeStyle?: () => void;
}

export const MiyuSenseiAvatar: React.FC<MiyuSenseiAvatarProps> = ({
  mood = 'idle',
  isSpeaking = false,
  speechText,
  onAvatarClick,
  className = '',
  size = 'normal',
  activeSubtitle,
  animeStyle = 'celshade',
  onToggleAnimeStyle,
}) => {
  const [mouthFrame, setMouthFrame] = useState<'open' | 'closed'>('closed');
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showRomaji, setShowRomaji] = useState(true);
  const [activePoseOverride, setActivePoseOverride] = useState<'auto' | 'welcoming' | 'knowledge' | 'jump' | 'idle'>('auto');

  // Anime Lip Sync mouth flutter when speaking
  useEffect(() => {
    let interval: any;
    if (isSpeaking) {
      interval = setInterval(() => {
        setMouthFrame((prev) => (prev === 'open' ? 'closed' : 'open'));
      }, 230);
    } else {
      setMouthFrame('closed');
    }
    return () => clearInterval(interval);
  }, [isSpeaking]);

  const officialQuotes = {
    welcoming: {
      ja: 'こんにちは！何を学びたいですか？',
      ro: 'Konnichiwa! Nani o manabitai desu ka?',
      en: 'Hello! What would you like to learn today?',
    },
    knowledge: {
      ja: '知識は力！あなたをオタクの道へ導きます。',
      ro: 'Chishiki wa chikara! Anata o otaku no michi e michibikimasu.',
      en: 'Knowledge is power! I will guide you on the path of mastery.',
    },
    jump: {
      ja: '限界を突破！知の最高峰へ！',
      ro: 'Genkai o toppa! Chi no saikouhou e!',
      en: 'Break through the limits! To the highest peak of knowledge!',
    },
    idle: {
      ja: 'よし！一緒に日本語をマスターしましょう！',
      ro: 'Yoshi! Isshoni nihongo o masutaa shimashou!',
      en: 'Alright! Let\'s master Japanese together!',
    },
  };

  const handleTriggerPose = (pose: 'welcoming' | 'knowledge' | 'jump' | 'idle') => {
    setActivePoseOverride(pose);
    const quote = officialQuotes[pose];
    tts.speak(quote.ja, {
      rate: 0.88,
      pitch: 1.15,
      englishTranslation: quote.en,
      romajiHint: quote.ro,
    });
  };

  const handleDefaultClick = () => {
    if (onAvatarClick) {
      onAvatarClick();
      return;
    }
    const poses: Array<'welcoming' | 'knowledge' | 'jump' | 'idle'> = ['welcoming', 'knowledge', 'jump', 'idle'];
    const randomPose = poses[Math.floor(Math.random() * poses.length)];
    handleTriggerPose(randomPose);
  };

  // Select sprite pool based on chosen anime style
  const spritePool = animeStyle === 'celshade' ? MIYU_CELSHADE_SPRITES : MIYU_OFFICIAL_SPRITES;

  // Determine active sprite
  let activeSprite = spritePool.idle;
  if (activePoseOverride !== 'auto') {
    activeSprite = spritePool[activePoseOverride];
  } else {
    if (mood === 'praise') {
      activeSprite = spritePool.praise;
    } else if (mood === 'jump') {
      activeSprite = spritePool.jump;
    } else if (mood === 'thinking') {
      activeSprite = spritePool.thinking;
    } else if (mood === 'talking' || isSpeaking) {
      activeSprite = mouthFrame === 'open' ? spritePool.talking : spritePool.idle;
    } else if (mood === 'welcoming') {
      activeSprite = spritePool.welcoming;
    } else {
      activeSprite = spritePool.idle;
    }
  }

  const sizeClasses = {
    compact: 'h-[250px] w-auto',
    normal: 'h-[370px] sm:h-[450px] w-auto',
    large: 'h-[460px] sm:h-[560px] w-auto',
  };

  return (
    <div className={`relative flex flex-col items-center select-none transition-all duration-300 ${className}`}>
      {/* Official Japanese Pose Quick Switcher & Cel-shade Toggle */}
      <div className="mb-2 flex items-center gap-1 z-20 flex-wrap justify-center">
        {onToggleAnimeStyle && (
          <button
            onClick={onToggleAnimeStyle}
            title={`Current style: ${animeStyle === 'celshade' ? 'Cel-Shaded Anime' : 'Official Poses'}. Tap to switch!`}
            className="px-2.5 py-1 rounded-full text-[11px] font-extrabold border bg-gradient-to-r from-indigo-500 to-sky-500 text-white border-indigo-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-1 mr-1"
          >
            <Palette className="w-3 h-3 text-yellow-300" />
            <span>{animeStyle === 'celshade' ? 'Cel-Shading' : 'Classic'}</span>
          </button>
        )}

        <button
          onClick={() => handleTriggerPose('welcoming')}
          title="Pose: こんにちは！何を学びたいですか？"
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
            activePoseOverride === 'welcoming'
              ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
              : 'bg-white/90 text-slate-700 border-sky-200 hover:bg-sky-50'
          }`}
        >
          <Smile className="w-3 h-3 text-sky-400" />
          <span>こんにちは</span>
        </button>

        <button
          onClick={() => handleTriggerPose('knowledge')}
          title="Pose: 知識は力！"
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
            activePoseOverride === 'knowledge'
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-white/90 text-slate-700 border-amber-200 hover:bg-amber-50'
          }`}
        >
          <BookOpen className="w-3 h-3 text-amber-500" />
          <span>知識は力</span>
        </button>

        <button
          onClick={() => handleTriggerPose('jump')}
          title="Pose: 限界を突破！"
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
            activePoseOverride === 'jump'
              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
              : 'bg-white/90 text-slate-700 border-rose-200 hover:bg-rose-50'
          }`}
        >
          <Rocket className="w-3 h-3 text-rose-500" />
          <span>限界突破</span>
        </button>

        {activePoseOverride !== 'auto' && (
          <button
            onClick={() => setActivePoseOverride('auto')}
            className="px-2 py-1 rounded-full text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
          >
            Auto
          </button>
        )}
      </div>

      {/* Floating Anime Emotes for Special Moods */}
      {mood === 'praise' && (
        <div className="absolute -top-4 inset-x-0 flex justify-around pointer-events-none z-30">
          <span className="text-xl animate-bounce">💖</span>
          <Sparkles className="w-6 h-6 text-amber-400 animate-sparkle" />
          <span className="text-lg animate-pulse delay-100">✨</span>
          <span className="text-xl animate-bounce delay-200">💖</span>
        </div>
      )}

      {/* Speech Callout Bubble above MIYU */}
      {speechText && !activeSubtitle && (
        <div className="mb-2 max-w-[280px] bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border-2 border-sky-300 text-xs text-slate-800 relative z-20 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start gap-1.5 font-medium leading-relaxed">
            <span className="text-amber-500 font-black">MIYU:</span>
            <span>{speechText}</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
        </div>
      )}

      {/* Interactive Avatar Container */}
      <div
        onClick={handleDefaultClick}
        className="relative group cursor-pointer flex flex-col items-center"
        title="Click MIYU to hear native Japanese voice!"
      >
        {/* Cel-shaded Anime Glow Aura */}
        <div
          className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500 ${
            mood === 'praise'
              ? 'bg-amber-300/50 scale-105 opacity-100'
              : isSpeaking
              ? 'bg-sky-400/40 scale-102 opacity-95 animate-pulse'
              : 'bg-sky-200/30 opacity-50 group-hover:opacity-85'
          }`}
        />

        {/* Full-Body Cel-Shaded Sprite Image */}
        <div
          className={`relative z-10 transition-transform duration-200 ${
            isSpeaking
              ? 'animate-talk'
              : mood === 'praise'
              ? 'animate-bounce'
              : 'animate-breathe'
          }`}
        >
          <img
            src={activeSprite}
            alt="MIYU Sensei - kumaGO 橋 Japanese Tutor"
            className={`${sizeClasses[size]} object-contain drop-shadow-[0_10px_20px_rgba(21,37,74,0.22)] filter brightness-[1.02] contrast-[1.04] transition-all`}
          />
        </div>

        {/* Floating Cel-Shading Mood & Voice Tag */}
        <div className="absolute bottom-1 inset-x-0 flex justify-center z-20">
          <div
            className={`px-3.5 py-1 rounded-full text-xs font-black backdrop-blur-md shadow-md border-2 flex items-center gap-1.5 transition-all duration-300 ${
              mood === 'praise' || activePoseOverride === 'jump'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-300 shadow-amber-300/50 scale-105'
                : isSpeaking
                ? 'bg-[#15254A] text-sky-200 border-sky-400 shadow-sky-300 animate-pulse'
                : 'bg-white/95 text-slate-800 border-sky-200 group-hover:border-sky-400'
            }`}
          >
            {isSpeaking ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span className="font-['Zen_Maru_Gothic']">Speaking 日本語...</span>
              </>
            ) : mood === 'praise' ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                <span>Sugoi! すごい！</span>
              </>
            ) : (
              <>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>MIYU Sensei 橋</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Real-Time Japanese Native Voice Subtitles Bar beneath MIYU */}
      {showSubtitles && activeSubtitle && (
        <div className="w-full mt-4 z-30">
          <JapaneseSubtitleBar
            subtitle={activeSubtitle}
            showRomaji={showRomaji}
            onToggleRomaji={() => setShowRomaji(!showRomaji)}
            onReplay={() => {
              if (activeSubtitle) {
                tts.speak(activeSubtitle.japanese, {
                  rate: 0.88,
                  pitch: 1.15,
                  englishTranslation: activeSubtitle.english,
                  romajiHint: activeSubtitle.romaji,
                });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
