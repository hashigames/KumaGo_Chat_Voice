import React, { useState, useEffect } from 'react';
import { Gamepad2, Trophy, Sparkles, Timer, Play, RotateCcw } from 'lucide-react';
import { sfx, tts } from '../utils/audio';

interface GameHubViewProps {
  onAwardXP: (amount: number) => void;
  onAskMiyu: (prompt: string) => void;
}

const KANJI_BLITZ_QUESTIONS = [
  { kanji: '桜', reading: 'さくら (sakura)', meaning: 'cherry blossom', options: ['cherry blossom', 'mountain', 'book', 'car'] },
  { kanji: '水', reading: 'みず (mizu)', meaning: 'water', options: ['fire', 'water', 'gold', 'earth'] },
  { kanji: '食べる', reading: 'たべる (taberu)', meaning: 'to eat', options: ['to drink', 'to sleep', 'to eat', 'to run'] },
  { kanji: '友達', reading: 'ともだち (tomodachi)', meaning: 'friend', options: ['teacher', 'friend', 'family', 'student'] },
  { kanji: '猫', reading: 'ねこ (neko)', meaning: 'cat', options: ['dog', 'bird', 'cat', 'fish'] },
  { kanji: '日本', reading: 'にほん (nihon)', meaning: 'Japan', options: ['China', 'Japan', 'America', 'Korea'] },
  { kanji: '雨', reading: 'あめ (ame)', meaning: 'rain', options: ['cloud', 'snow', 'sun', 'rain'] },
];

export const GameHubView: React.FC<GameHubViewProps> = ({ onAwardXP, onAskMiyu }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Timer countdown
  useEffect(() => {
    let timer: any;
    if (isPlaying && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      handleNext(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, gameOver, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setCurrentIndex(0);
    setTimeLeft(15);
    setSelectedAnswer(null);
    tts.speak(KANJI_BLITZ_QUESTIONS[0].kanji, { rate: 0.85, pitch: 1.15 });
  };

  const handleNext = (correct: boolean) => {
    if (currentIndex + 1 < KANJI_BLITZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(15);
      setSelectedAnswer(null);
      tts.speak(KANJI_BLITZ_QUESTIONS[currentIndex + 1].kanji, { rate: 0.85, pitch: 1.15 });
    } else {
      setGameOver(true);
      setIsPlaying(false);
      sfx.playLevelUp();
      const bonusXP = (score + (correct ? 1 : 0)) * 15;
      onAwardXP(bonusXP);
    }
  };

  const handleSelectOption = (opt: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(opt);
    const q = KANJI_BLITZ_QUESTIONS[currentIndex];
    const isCorrect = opt === q.meaning;

    if (isCorrect) {
      sfx.playCorrect();
      setScore((s) => s + 1);
      onAwardXP(10);
    } else {
      sfx.playRetry();
    }

    setTimeout(() => {
      handleNext(isCorrect);
    }, 1200);
  };

  const currentQ = KANJI_BLITZ_QUESTIONS[currentIndex];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-200 p-5 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xl">
            <Gamepad2 className="w-5 h-5 text-amber-600" />
            <span>ゲームハブ (Game Hub: Kanji Blitz Arcade)</span>
          </div>
          <p className="text-slate-600 text-sm mt-1">
            Test your quick reflexes with video-game style speed challenges! Earn massive XP streaks.
          </p>
        </div>

        <button
          onClick={() => onAskMiyu('MIYU Sensei, challenge me with a spontaneous anime & gaming Japanese quiz!')}
          className="flex items-center gap-2 bg-[#15254A] hover:bg-[#1e366b] text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-xs cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Boss Battle with MIYU</span>
        </button>
      </div>

      {/* Arcade Screen Container */}
      <div className="bg-gradient-to-b from-white via-sky-50/30 to-amber-50/20 rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 shadow-lg max-w-2xl mx-auto">
        {!isPlaying && !gameOver ? (
          <div className="text-center space-y-5 py-8">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-300/50">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#15254A]">Kanji Blitz: Speed Challenge</h2>
              <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
                Identify the English meaning of standard JLPT Kanji before the 15-second timer runs out. Hear native audio on every question!
              </p>
            </div>

            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-base px-8 py-3.5 rounded-2xl shadow-md shadow-orange-300 transition-all cursor-pointer transform active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>START GAME (7 Questions)</span>
            </button>
          </div>
        ) : gameOver ? (
          <div className="text-center space-y-5 py-8 animate-in zoom-in-95">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Game Complete</span>
              <h2 className="text-3xl font-black text-[#15254A] mt-1">Sugoi! お疲れ様でした！</h2>
              <p className="text-base text-slate-700 mt-2 font-medium">
                You scored <strong className="text-amber-600 font-black text-2xl">{score} / {KANJI_BLITZ_QUESTIONS.length}</strong> correct!
              </p>
              <p className="text-xs font-bold text-emerald-700 mt-1">
                +{(score * 15)} Bonus XP Awarded to your Profile!
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={startGame}
                className="inline-flex items-center gap-2 bg-[#15254A] hover:bg-[#1f3769] text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Game Bar: Progress and Timer */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Question {currentIndex + 1} of {KANJI_BLITZ_QUESTIONS.length}
              </span>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                <Timer className="w-3.5 h-3.5 text-amber-600" />
                <span>{timeLeft}s</span>
              </div>
            </div>

            {/* Kanji Card Target */}
            <div className="text-center py-6 bg-white rounded-2xl border border-sky-100 shadow-xs">
              <span className="text-6xl sm:text-7xl font-black text-[#15254A] font-['Zen_Maru_Gothic'] block drop-shadow-sm">
                {currentQ.kanji}
              </span>
              <span className="text-sm font-bold text-sky-700 mt-2 block">
                Reading: {currentQ.reading}
              </span>
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = opt === currentQ.meaning;
                let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50';

                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500 border-emerald-600 text-white font-black shadow-md shadow-emerald-200 animate-bounce';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500 border-rose-600 text-white font-black';
                  } else {
                    btnStyle = 'opacity-40 bg-slate-100 border-slate-200';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    disabled={selectedAnswer !== null}
                    className={`py-3.5 px-4 rounded-xl border-2 font-bold text-sm text-left shadow-2xs transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
