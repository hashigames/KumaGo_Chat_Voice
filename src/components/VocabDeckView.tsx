import React, { useState, useEffect, useMemo } from 'react';
import { Search, Volume2, Sparkles, BookOpen, Filter, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { tts } from '../utils/audio';

export interface VocabItem {
  alphabet?: string;
  romaji: string;
  hiragana: string;
  katakana: string;
  kanji: string;
  meaning: string;
  type?: string;
  topic?: string;
}

interface VocabDeckViewProps {
  onTeachWord: (word: VocabItem, level: string) => void;
}

const ALPHABET_LIST = [
  'ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Y', 'Z'
];

export const VocabDeckView: React.FC<VocabDeckViewProps> = ({ onTeachWord }) => {
  const [level, setLevel] = useState<string>('n5');
  const [category, setCategory] = useState<'nouns' | 'verbs' | 'adjectives' | 'adverbs' | 'phrases'>('nouns');
  const [activeLetter, setActiveLetter] = useState<string>('ALL');
  const [activeTopic, setActiveTopic] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [vocabData, setVocabData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 60;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/vocab/${level}`)
      .then((res) => res.json())
      .then((data) => {
        setVocabData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load vocab:', err);
        setLoading(false);
      });
  }, [level]);

  // Reset alphabet, topic filters, and page when category or level changes
  useEffect(() => {
    setActiveLetter('ALL');
    setActiveTopic('ALL');
    setCurrentPage(1);
  }, [category, level]);

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeLetter, activeTopic, searchTerm]);

  const items: VocabItem[] = useMemo(() => {
    if (!vocabData || !vocabData[category]) return [];
    return vocabData[category];
  }, [vocabData, category]);

  // Available topics in the current dataset
  const availableTopics = useMemo(() => {
    const topicMap = new Map<string, number>();
    items.forEach((item) => {
      if (item.topic) {
        topicMap.set(item.topic, (topicMap.get(item.topic) || 0) + 1);
      }
    });
    return Array.from(topicMap.entries())
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => a.topic.localeCompare(b.topic));
  }, [items]);

  // Available letters in the current dataset
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    items.forEach((item) => {
      const firstChar = (item.alphabet || item.romaji?.charAt(0) || '').toUpperCase();
      if (firstChar) letters.add(firstChar);
    });
    return letters;
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Topic filter
      if (activeTopic !== 'ALL' && item.topic !== activeTopic) {
        return false;
      }
      // Alphabet filter
      if (activeLetter !== 'ALL') {
        const itemLetter = (item.alphabet || item.romaji?.charAt(0) || '').toUpperCase();
        if (itemLetter !== activeLetter) return false;
      }
      // Search term
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        item.romaji?.toLowerCase().includes(term) ||
        item.hiragana?.includes(term) ||
        item.katakana?.includes(term) ||
        item.kanji?.includes(term) ||
        item.meaning?.toLowerCase().includes(term) ||
        (item.topic && item.topic.toLowerCase().includes(term))
      );
    });
  }, [items, activeTopic, activeLetter, searchTerm]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const playVoice = (item: VocabItem) => {
    setPlayingWord(item.romaji);
    const textToSpeak = item.kanji && item.kanji !== '—' ? item.kanji : item.hiragana;
    tts.speak(textToSpeak, {
      rate: 0.85,
      pitch: 1.15,
      englishTranslation: item.meaning,
      romajiHint: item.romaji,
      onEnd: () => setPlayingWord(null),
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner with kumaGO Theme */}
      <div className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-sky-500/10 border border-sky-200 p-5 sm:p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5 text-[#15254A] font-extrabold text-xl">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#15254A] to-sky-600 flex items-center justify-center text-white shadow-2xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span>語彙 JLPT Alphabetical Vocabulary Deck</span>
              <span className="text-xs font-bold text-sky-700 block mt-0.5">
                Nouns, Verbs, Adjectives, Adverbs &amp; Phrases (A–Z) with MIYU Voice &amp; Subtitles
              </span>
            </div>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Every entry includes the complete 4-form representation: <span className="font-semibold text-slate-800">Romaji</span>, <span className="font-semibold text-slate-800">Hiragana</span>, <span className="font-semibold text-slate-800">Katakana</span>, and <span className="font-semibold text-slate-800">Kanji</span>. Tap any card to hear native pronunciation or ask MIYU Sensei to teach it with interactive video-game quizzes!
          </p>
        </div>

        {/* Level Selector Pills */}
        <div className="flex items-center gap-1.5 bg-white/95 p-1.5 rounded-2xl border border-sky-200 shadow-2xs self-stretch md:self-auto justify-center">
          {['n5', 'n4', 'n3', 'n2', 'n1'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                level === lvl
                  ? 'bg-[#15254A] text-white shadow-xs scale-105'
                  : 'text-slate-600 hover:bg-sky-50 hover:text-[#15254A]'
              }`}
            >
              {lvl.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="bg-white/95 p-4 sm:p-5 rounded-3xl border border-sky-100 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'nouns', label: '名詞 Nouns', count: vocabData?.nouns?.length },
              { id: 'verbs', label: '動詞 Verbs', count: vocabData?.verbs?.length },
              { id: 'adjectives', label: '形容詞 Adjectives', count: vocabData?.adjectives?.length },
              { id: 'adverbs', label: '副詞 Adverbs', count: vocabData?.adverbs?.length },
              { id: 'phrases', label: 'フレーズ Phrases', count: vocabData?.phrases?.length },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as any)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  category === cat.id
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-sky-50 hover:text-sky-700 border border-slate-200/60'
                }`}
              >
                <span>{cat.label}</span>
                {cat.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      category === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search romaji, kana, kanji, english..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-400 focus:bg-white transition-all shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Alphabetical Quick-Jump Filter (A-Z) */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              A-Z:
            </span>
            {ALPHABET_LIST.map((letter) => {
              const isSelected = activeLetter === letter;
              const hasItems = letter === 'ALL' || availableLetters.has(letter);
              return (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(letter)}
                  disabled={!hasItems && letter !== 'ALL'}
                  className={`w-7 h-7 rounded-lg text-[11px] font-black transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#15254A] text-white shadow-2xs scale-105'
                      : hasItems
                      ? 'bg-slate-100 hover:bg-sky-100 text-slate-700'
                      : 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-50'
                  }`}
                  title={hasItems ? `Filter letter ${letter}` : `No words starting with ${letter}`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {/* Topic / Theme Filter Pills */}
          {availableTopics.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                Topic:
              </span>
              <button
                onClick={() => setActiveTopic('ALL')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                  activeTopic === 'ALL'
                    ? 'bg-sky-700 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-sky-50 text-slate-600'
                }`}
              >
                All Topics ({items.length})
              </button>
              {availableTopics.map(({ topic, count }) => (
                <button
                  key={topic}
                  onClick={() => setActiveTopic(topic)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
                    activeTopic === topic
                      ? 'bg-sky-700 text-white shadow-2xs font-bold'
                      : 'bg-slate-100 hover:bg-sky-50 text-slate-600'
                  }`}
                >
                  <span>{topic}</span>
                  <span className={`text-[10px] px-1 py-0.2 rounded-full ${
                    activeTopic === topic ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-3 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 font-bold text-sm">
            Loading {level.toUpperCase()} vocabulary knowledge base...
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-100 text-slate-500 text-sm space-y-2">
          <p className="font-bold text-slate-700">No vocabulary found matching your filter.</p>
          <p className="text-xs text-slate-400">
            Try switching letter &ldquo;{activeLetter}&rdquo;, topic &ldquo;{activeTopic}&rdquo;, or searching another keyword.
          </p>
          <button
            onClick={() => {
              setActiveLetter('ALL');
              setActiveTopic('ALL');
              setSearchTerm('');
            }}
            className="mt-3 px-4 py-1.5 rounded-xl bg-sky-50 text-sky-700 font-bold text-xs hover:bg-sky-100 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div>
          {/* Results count banner and Pagination bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 px-2 text-xs font-semibold text-slate-500">
            <span>
              Showing <strong className="text-slate-800">{paginatedItems.length}</strong> of{' '}
              <strong className="text-[#15254A]">{filteredItems.length}</strong> items in{' '}
              <span className="text-[#15254A] font-bold">{level.toUpperCase()} {category}</span>
              {activeTopic !== 'ALL' && <span className="text-sky-700 font-semibold"> &bull; Topic: {activeTopic}</span>}
              {activeLetter !== 'ALL' && <span> &bull; Letter {activeLetter}</span>}
            </span>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2 self-end sm:self-auto bg-white/90 border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded-full hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-slate-700"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-bold text-slate-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded-full hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-slate-700"
                  title="Next Page"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedItems.map((item, idx) => (
              <div
                key={`${item.romaji}-${idx}`}
                className="bg-white/95 rounded-3xl border border-sky-100 p-5 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Kanji + Voice Button */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-3xl font-black text-[#15254A] font-['Zen_Maru_Gothic'] tracking-tight">
                          {item.kanji && item.kanji !== '—' ? item.kanji : item.hiragana}
                        </span>
                        {item.type && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60 uppercase">
                            {item.type}
                          </span>
                        )}
                        {item.topic && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200/60">
                            {item.topic}
                          </span>
                        )}
                      </div>

                      {/* 4-Line representations displayed cleanly */}
                      <div className="mt-2.5 space-y-1">
                        {/* Hiragana & Romaji */}
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-sky-800 font-['Noto_Sans_JP'] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                            ひらがな: {item.hiragana}
                          </span>
                          <span className="font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 text-[11px]">
                            {item.romaji}
                          </span>
                        </div>

                        {/* Katakana */}
                        <div className="text-[11px] text-slate-500 font-medium">
                          カタカナ: <span className="font-semibold text-slate-700">{item.katakana}</span>
                          {item.kanji && item.kanji !== '—' && (
                            <span className="ml-2 text-slate-400">
                              &bull; 漢字: <span className="font-bold text-slate-700">{item.kanji}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Audio Play Button */}
                    <button
                      onClick={() => playVoice(item)}
                      className={`p-2.5 rounded-2xl transition-all cursor-pointer shadow-2xs ${
                        playingWord === item.romaji
                          ? 'bg-[#15254A] text-white scale-110 shadow-sky-300'
                          : 'bg-sky-50 hover:bg-sky-100 text-sky-700 hover:scale-105 border border-sky-100'
                      }`}
                      title="Listen with Native Japanese Voice & Subtitles"
                    >
                      <Volume2 className={`w-4 h-4 ${playingWord === item.romaji ? 'animate-pulse text-amber-300' : ''}`} />
                    </button>
                  </div>

                  {/* English Meaning */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 text-sm font-semibold text-slate-800 flex items-start gap-1.5">
                    <span className="text-sky-600 font-bold text-xs mt-0.5">意味:</span>
                    <span>{item.meaning}</span>
                  </div>
                </div>

                {/* Bottom Action: Teach with MIYU */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {level.toUpperCase()} &bull; {category}
                  </span>

                  <button
                    onClick={() => onTeachWord(item, level)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15254A] hover:text-white bg-sky-50 hover:bg-gradient-to-r hover:from-[#15254A] hover:to-sky-700 px-3 py-1.5 rounded-xl transition-all cursor-pointer border border-sky-100 shadow-2xs group-hover:bg-sky-100"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Teach with MIYU</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 border border-sky-100 p-4 rounded-3xl shadow-xs">
              <div className="text-xs text-slate-500 font-semibold">
                Showing page <strong className="text-slate-800">{currentPage}</strong> of{' '}
                <strong className="text-slate-800">{totalPages}</strong> ({filteredItems.length} total {category})
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-sky-50 text-slate-700 font-bold text-xs flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-[#15254A] text-white shadow-xs'
                            : 'bg-slate-50 hover:bg-sky-50 text-slate-600 border border-slate-200/60'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-sky-50 text-slate-700 font-bold text-xs flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
