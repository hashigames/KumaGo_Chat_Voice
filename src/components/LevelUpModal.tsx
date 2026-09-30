import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Flame } from 'lucide-react';
import { MIYU_OFFICIAL_SPRITES } from '../assets/miyu';
import { sfx, tts } from '../utils/audio';

interface LevelUpModalProps {
  level: number;
  xp: number;
  streak: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  level,
  xp,
  streak,
  onClose,
}) => {
  useEffect(() => {
    sfx.playLevelUp();
    tts.speak('限界を突破！知の最高峰へ！レベルアップ！おめでとうございます！', {
      rate: 0.9,
      pitch: 1.15,
      englishTranslation: 'Break through the limits! To the highest peak of knowledge! Level up! Congratulations!',
      romajiHint: 'Genkai o toppa! Chi no saikouhou e! Reberu appu! Omedetou gozaimasu!',
    });

    // Burst confetti!
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
    });
    const interval = setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 300);

    return () => clearTimeout(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative max-w-md w-full bg-gradient-to-b from-white via-amber-50/50 to-orange-50/30 rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-2xl text-center overflow-hidden animate-in zoom-in-95">
        {/* Sparkle bursts */}
        <div className="absolute top-2 inset-x-0 flex justify-around pointer-events-none">
          <Sparkles className="w-8 h-8 text-amber-400 animate-sparkle" />
          <Sparkles className="w-6 h-6 text-yellow-400 animate-sparkle delay-100" />
          <Sparkles className="w-8 h-8 text-orange-400 animate-sparkle delay-200" />
        </div>

        {/* Celebrating MIYU Breakthrough Jump Sprite */}
        <div className="relative mx-auto w-48 h-56 flex items-center justify-center -mt-2">
          <img
            src={MIYU_OFFICIAL_SPRITES.jump}
            alt="MIYU 限界を突破！"
            className="w-full h-full object-contain filter drop-shadow-xl animate-bounce"
          />
        </div>

        <div className="space-y-1.5 mt-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-black tracking-widest bg-amber-500 text-white shadow-xs uppercase inline-block">
            LEVEL UP! レベルアップ！
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#15254A]">
            You reached Level {level}!
          </h2>
          <p className="text-amber-800 text-xs font-bold font-['Zen_Maru_Gothic']">
            「限界を突破！知の最高峰へ！」
          </p>
          <p className="text-slate-600 text-xs font-medium">
            Sugoi! MIYU Sensei is so proud of your dedication to mastering Japanese!
          </p>
        </div>

        {/* Stats Summary Pill */}
        <div className="grid grid-cols-2 gap-3 my-4 bg-white/90 p-3 rounded-2xl border border-amber-200 shadow-2xs text-xs font-bold">
          <div className="flex items-center justify-center gap-1.5 text-amber-800">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Total XP: {xp}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-orange-800">
            <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
            <span>Streak: {streak} Days</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-3 rounded-2xl shadow-md shadow-orange-200 transition-all cursor-pointer transform active:scale-95 text-sm"
        >
          YOSH! KEEP LEARNING! (よし！頑張ろう！)
        </button>
      </div>
    </div>
  );
};
