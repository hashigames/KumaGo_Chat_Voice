import React, { useState } from 'react';
import { Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { tts, sfx } from '../utils/audio';

interface KanaItem {
  kana: string;
  romaji: string;
}

const HIRAGANA_GRID: Array<Array<KanaItem | null>> = [
  [{ kana: 'あ', romaji: 'a' }, { kana: 'い', romaji: 'i' }, { kana: 'う', romaji: 'u' }, { kana: 'え', romaji: 'e' }, { kana: 'お', romaji: 'o' }],
  [{ kana: 'か', romaji: 'ka' }, { kana: 'き', romaji: 'ki' }, { kana: 'く', romaji: 'ku' }, { kana: 'け', romaji: 'ke' }, { kana: 'こ', romaji: 'ko' }],
  [{ kana: 'さ', romaji: 'sa' }, { kana: 'し', romaji: 'shi' }, { kana: 'す', romaji: 'su' }, { kana: 'せ', romaji: 'se' }, { kana: 'そ', romaji: 'so' }],
  [{ kana: 'た', romaji: 'ta' }, { kana: 'ち', romaji: 'chi' }, { kana: 'つ', romaji: 'tsu' }, { kana: 'て', romaji: 'te' }, { kana: 'と', romaji: 'to' }],
  [{ kana: 'な', romaji: 'na' }, { kana: 'に', romaji: 'ni' }, { kana: 'ぬ', romaji: 'nu' }, { kana: 'ね', romaji: 'ne' }, { kana: 'の', romaji: 'no' }],
  [{ kana: 'は', romaji: 'ha' }, { kana: 'ひ', romaji: 'hi' }, { kana: 'ふ', romaji: 'fu' }, { kana: 'へ', romaji: 'he' }, { kana: 'ほ', romaji: 'ho' }],
  [{ kana: 'ま', romaji: 'ma' }, { kana: 'み', romaji: 'mi' }, { kana: 'む', romaji: 'mu' }, { kana: 'め', romaji: 'me' }, { kana: 'も', romaji: 'mo' }],
  [{ kana: 'や', romaji: 'ya' }, null, { kana: 'ゆ', romaji: 'yu' }, null, { kana: 'よ', romaji: 'yo' }],
  [{ kana: 'ら', romaji: 'ra' }, { kana: 'り', romaji: 'ri' }, { kana: 'る', romaji: 'ru' }, { kana: 'れ', romaji: 're' }, { kana: 'ろ', romaji: 'ro' }],
  [{ kana: 'わ', romaji: 'wa' }, null, null, null, { kana: 'を', romaji: 'wo' }],
  [{ kana: 'ん', romaji: 'n' }, null, null, null, null],
];

const KATAKANA_GRID: Array<Array<KanaItem | null>> = [
  [{ kana: 'ア', romaji: 'a' }, { kana: 'イ', romaji: 'i' }, { kana: 'ウ', romaji: 'u' }, { kana: 'エ', romaji: 'e' }, { kana: 'オ', romaji: 'o' }],
  [{ kana: 'カ', romaji: 'ka' }, { kana: 'キ', romaji: 'ki' }, { kana: 'ク', romaji: 'ku' }, { kana: 'ケ', romaji: 'ke' }, { kana: 'コ', romaji: 'ko' }],
  [{ kana: 'サ', romaji: 'sa' }, { kana: 'シ', romaji: 'shi' }, { kana: 'ス', romaji: 'su' }, { kana: 'セ', romaji: 'se' }, { kana: 'ソ', romaji: 'so' }],
  [{ kana: 'タ', romaji: 'ta' }, { kana: 'チ', romaji: 'chi' }, { kana: 'ツ', romaji: 'tsu' }, { kana: 'テ', romaji: 'te' }, { kana: 'ト', romaji: 'to' }],
  [{ kana: 'ナ', romaji: 'na' }, { kana: 'ニ', romaji: 'ni' }, { kana: 'ヌ', romaji: 'nu' }, { kana: 'ネ', romaji: 'ne' }, { kana: 'ノ', romaji: 'no' }],
  [{ kana: 'ハ', romaji: 'ha' }, { kana: 'ヒ', romaji: 'hi' }, { kana: 'フ', romaji: 'fu' }, { kana: 'ヘ', romaji: 'he' }, { kana: 'ホ', romaji: 'ho' }],
  [{ kana: 'マ', romaji: 'ma' }, { kana: 'ミ', romaji: 'mi' }, { kana: 'ム', romaji: 'mu' }, { kana: 'メ', romaji: 'me' }, { kana: 'モ', romaji: 'mo' }],
  [{ kana: 'ヤ', romaji: 'ya' }, null, { kana: 'ユ', romaji: 'yu' }, null, { kana: 'ヨ', romaji: 'yo' }],
  [{ kana: 'ラ', romaji: 'ra' }, { kana: 'リ', romaji: 'ri' }, { kana: 'ル', romaji: 'ru' }, { kana: 'レ', romaji: 're' }, { kana: 'ロ', romaji: 'ro' }],
  [{ kana: 'ワ', romaji: 'wa' }, null, null, null, { kana: 'ヲ', romaji: 'wo' }],
  [{ kana: 'ン', romaji: 'n' }, null, null, null, null],
];

interface KanaDrillsViewProps {
  onAskMiyu: (prompt: string) => void;
  onAwardXP: (amount: number) => void;
}

export const KanaDrillsView: React.FC<KanaDrillsViewProps> = ({ onAskMiyu, onAwardXP }) => {
  const [mode, setMode] = useState<'hiragana' | 'katakana'>('hiragana');
  const [showRomaji, setShowRomaji] = useState(true);

  // Quick Mini-Quiz State
  const [quizQuestion, setQuizQuestion] = useState<{ kana: string; romaji: string; options: string[] } | null>(null);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<'correct' | 'wrong' | null>(null);

  const startQuiz = () => {
    const grid = mode === 'hiragana' ? HIRAGANA_GRID : KATAKANA_GRID;
    const allKana = grid.flat().filter(Boolean) as KanaItem[];
    const target = allKana[Math.floor(Math.random() * allKana.length)];

    // 3 random distractors
    const distractors: string[] = [];
    while (distractors.length < 3) {
      const rand = allKana[Math.floor(Math.random() * allKana.length)];
      if (rand.romaji !== target.romaji && !distractors.includes(rand.romaji)) {
        distractors.push(rand.romaji);
      }
    }
    const options = [target.romaji, ...distractors].sort(() => Math.random() - 0.5);

    setQuizQuestion({ kana: target.kana, romaji: target.romaji, options });
    setQuizSelected(null);
    setQuizResult(null);
    tts.speak(target.kana, { rate: 0.85, pitch: 1.15 });
  };

  const handleAnswer = (opt: string) => {
    if (!quizQuestion || quizSelected) return;
    setQuizSelected(opt);
    if (opt === quizQuestion.romaji) {
      setQuizResult('correct');
      sfx.playCorrect();
      onAwardXP(10);
    } else {
      setQuizResult('wrong');
      sfx.playRetry();
    }
  };

  const grid = mode === 'hiragana' ? HIRAGANA_GRID : KATAKANA_GRID;

  const playKana = (kana: string) => {
    tts.speak(kana, { rate: 0.85, pitch: 1.15 });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-500/10 via-sky-500/10 to-indigo-500/10 border border-teal-200 p-5 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-900 font-extrabold text-xl">
            <span>Kana かな Recognition & Drills</span>
          </div>
          <p className="text-slate-600 text-sm mt-1">
            Tap any character to hear native audio. Toggle Romaji or start the interactive recognition mini-quiz!
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Mode Switcher */}
          <div className="flex bg-white/80 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => { setMode('hiragana'); setQuizQuestion(null); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                mode === 'hiragana' ? 'bg-[#15254A] text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Hiragana ひらがな
            </button>
            <button
              onClick={() => { setMode('katakana'); setQuizQuestion(null); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                mode === 'katakana' ? 'bg-[#15254A] text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Katakana カタカナ
            </button>
          </div>

          <button
            onClick={() => setShowRomaji(!showRomaji)}
            className="px-3 py-1.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            {showRomaji ? 'Hide Romaji' : 'Show Romaji'}
          </button>

          <button
            onClick={startQuiz}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3.5 py-1.5 rounded-2xl text-xs font-bold shadow-xs hover:brightness-105 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mini-Quiz (+10 XP)</span>
          </button>
        </div>
      </div>

      {/* Quiz Modal / Banner if Active */}
      {quizQuestion && (
        <div className="bg-amber-50/90 border-2 border-amber-300 p-5 rounded-3xl shadow-md text-center max-w-lg mx-auto space-y-4 animate-in zoom-in-95">
          <div className="flex justify-between items-center text-xs font-bold text-amber-800">
            <span>What is the reading for this character?</span>
            <button
              onClick={startQuiz}
              className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-900 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <span className="text-6xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
              {quizQuestion.kana}
            </span>
            <button
              onClick={() => playKana(quizQuestion.kana)}
              className="p-3 rounded-full bg-white text-sky-600 shadow-xs border border-amber-200 hover:bg-sky-50 cursor-pointer"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-2.5">
            {quizQuestion.options.map((opt) => {
              const isChosen = quizSelected === opt;
              const isCorrectAnswer = opt === quizQuestion.romaji;
              let btnClass = 'bg-white border-amber-200 text-slate-800 hover:bg-amber-100/50';

              if (quizSelected) {
                if (isCorrectAnswer) {
                  btnClass = 'bg-emerald-500 border-emerald-600 text-white font-black animate-bounce';
                } else if (isChosen) {
                  btnClass = 'bg-rose-500 border-rose-600 text-white font-black';
                } else {
                  btnClass = 'opacity-40 bg-slate-100 border-slate-200';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!quizSelected}
                  className={`py-3 rounded-xl border-2 font-mono font-bold text-lg shadow-2xs transition-all cursor-pointer ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {quizResult && (
            <div className="text-sm font-bold pt-1">
              {quizResult === 'correct' ? (
                <span className="text-emerald-700">Sugoi! Correct! +10 XP awarded! 🎉</span>
              ) : (
                <span className="text-rose-600">
                  Not quite! Correct answer is &quot;{quizQuestion.romaji}&quot;. Ganbatte!
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Grid of Characters */}
      <div className="bg-white/95 rounded-3xl border border-sky-100 p-4 sm:p-6 shadow-md overflow-x-auto">
        <div className="grid grid-cols-5 gap-2.5 sm:gap-3.5 max-w-3xl mx-auto">
          {grid.map((row, rIdx) =>
            row.map((item, cIdx) => {
              if (!item) {
                return <div key={`empty-${rIdx}-${cIdx}`} className="h-16 sm:h-20" />;
              }
              return (
                <div
                  key={item.kana}
                  onClick={() => playKana(item.kana)}
                  className="h-16 sm:h-20 bg-slate-50/90 hover:bg-sky-50 rounded-2xl border border-slate-100 hover:border-sky-300 p-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 shadow-2xs hover:shadow-xs group select-none active:scale-95"
                >
                  <span className="text-2xl sm:text-3xl font-black text-[#15254A] font-['Zen_Maru_Gothic'] group-hover:scale-110 transition-transform">
                    {item.kana}
                  </span>
                  {showRomaji && (
                    <span className="text-[11px] font-mono text-slate-500 font-bold mt-0.5">
                      {item.romaji}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
