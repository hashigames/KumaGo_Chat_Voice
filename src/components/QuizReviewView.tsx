import React, { useState } from 'react';
import { Bookmark, Sparkles, CheckCircle2, RotateCcw, Volume2, Trash2 } from 'lucide-react';
import { JapaneseWordBlock } from '../utils/parser';
import { JapaneseCard } from './JapaneseCard';
import { tts, sfx } from '../utils/audio';

interface QuizReviewViewProps {
  savedWords: JapaneseWordBlock[];
  onRemoveWord: (word: JapaneseWordBlock) => void;
  onAskMiyu: (prompt: string) => void;
  onAwardXP: (amount: number) => void;
}

export const QuizReviewView: React.FC<QuizReviewViewProps> = ({
  savedWords,
  onRemoveWord,
  onAskMiyu,
  onAwardXP,
}) => {
  const [practiceWord, setPracticeWord] = useState<JapaneseWordBlock | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!practiceWord) return;

    const trimmed = userAnswer.trim().toLowerCase();
    const isCorrect =
      trimmed === practiceWord.romaji.toLowerCase() ||
      trimmed === practiceWord.hiragana ||
      trimmed === practiceWord.meaning.toLowerCase();

    if (isCorrect) {
      setFeedback('correct');
      sfx.playCorrect();
      onAwardXP(10);
    } else {
      setFeedback('wrong');
      sfx.playRetry();
    }
  };

  const handleStartReview = (w: JapaneseWordBlock) => {
    setPracticeWord(w);
    setUserAnswer('');
    setFeedback(null);
    const audioText = w.kanji && w.kanji !== '—' ? w.kanji : w.hiragana;
    tts.speak(audioText, { rate: 0.85, pitch: 1.15 });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 border border-emerald-200 p-5 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xl">
            <Bookmark className="w-5 h-5 text-emerald-600" />
            <span>Spaced Repetition Flashcards & Quiz Vault</span>
          </div>
          <p className="text-slate-600 text-sm mt-1">
            Review words saved during your lessons with MIYU. Practice typing Kana or English meanings to build long-term retention.
          </p>
        </div>

        <button
          onClick={() => onAskMiyu('MIYU Sensei, please give me a 5-question comprehensive quiz covering N5 and N4 vocabulary!')}
          className="flex items-center gap-2 bg-[#15254A] hover:bg-[#1f3769] text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-xs cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Full JLPT Quiz with MIYU</span>
        </button>
      </div>

      {/* Interactive Flashcard Driller if Selected */}
      {practiceWord && (
        <div className="bg-white/95 rounded-3xl border-2 border-sky-300 p-6 shadow-lg max-w-xl mx-auto space-y-4 animate-in zoom-in-95">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>Interactive Recall Practice</span>
            <button
              onClick={() => setPracticeWord(null)}
              className="text-slate-400 hover:text-slate-700"
            >
              ✕ Close
            </button>
          </div>

          <div className="text-center py-4 bg-sky-50/60 rounded-2xl">
            <span className="text-5xl font-black text-[#15254A] font-['Zen_Maru_Gothic'] block">
              {practiceWord.kanji && practiceWord.kanji !== '—' ? practiceWord.kanji : practiceWord.hiragana}
            </span>
            <button
              onClick={() => {
                const text = practiceWord.kanji && practiceWord.kanji !== '—' ? practiceWord.kanji : practiceWord.hiragana;
                tts.speak(text, { rate: 0.85, pitch: 1.15 });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 mt-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Pronunciation</span>
            </button>
          </div>

          <form onSubmit={handleCheckAnswer} className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">
              Type the Hiragana, Romaji, or English Meaning:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="e.g. ringo / りんご / apple"
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-hidden focus:border-sky-400 focus:bg-white"
              />
              <button
                type="submit"
                className="bg-[#15254A] hover:bg-[#1f3769] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>

          {feedback && (
            <div className={`p-3 rounded-xl text-xs font-bold ${
              feedback === 'correct'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }`}>
              {feedback === 'correct' ? (
                <span>Sugoi! Correct! +10 XP awarded! 🎉</span>
              ) : (
                <span>
                  Retry! Hiragana: <strong>{practiceWord.hiragana}</strong> | Meaning: <strong>{practiceWord.meaning}</strong>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Saved Words List */}
      {savedWords.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center text-slate-500 space-y-3 max-w-lg mx-auto">
          <Bookmark className="w-12 h-12 text-sky-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">Your Vocabulary Notebook is Empty</h3>
          <p className="text-xs text-slate-500">
            Whenever MIYU Sensei introduces a word in chat, click the bookmark icon on the card to save it here for spaced repetition!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {savedWords.length} Saved Vocabulary Cards
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedWords.map((word, idx) => (
              <div key={`${word.romaji}-${idx}`} className="relative">
                <JapaneseCard
                  word={word}
                  isSaved={true}
                  onPracticeClick={() => handleStartReview(word)}
                  onSaveWord={() => onRemoveWord(word)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
