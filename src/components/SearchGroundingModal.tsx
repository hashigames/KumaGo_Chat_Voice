import React, { useState } from 'react';
import {
  Globe,
  Search,
  Sparkles,
  ExternalLink,
  Volume2,
  Bookmark,
  Check,
  BookOpen,
  X,
  Loader2,
  ArrowRight,
  Layers,
  Lightbulb
} from 'lucide-react';
import { JapaneseWordBlock, parseMiyuResponse } from '../utils/parser';
import { JapaneseCard } from './JapaneseCard';
import { tts, sfx } from '../utils/audio';
import { NihongoBook } from '../data/nihongoHonBooks';

interface SearchGroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLevel: string;
  onSaveWord: (word: JapaneseWordBlock) => void;
  savedWords: JapaneseWordBlock[];
  onImportToLibrary?: (book: NihongoBook) => void;
  onAskInChat?: (prompt: string) => void;
}

interface SearchGroundingResult {
  query: string;
  reply: string;
  webSources: Array<{ uri: string; title: string }>;
  searchQueries: string[];
}

export const SearchGroundingModal: React.FC<SearchGroundingModalProps> = ({
  isOpen,
  onClose,
  selectedLevel,
  onSaveWord,
  savedWords,
  onImportToLibrary,
  onAskInChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchGroundingResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [importedToHon, setImportedToHon] = useState(false);

  if (!isOpen) return null;

  const quickSearchSuggestions = [
    { label: '📅 Upcoming JLPT Exam Dates', query: 'What are the upcoming JLPT exam dates, registration deadlines, and test formats for 2025 and 2026?' },
    { label: '🔥 Trending Japanese Slang (Reiwa)', query: 'Top trending Japanese slang words, youth buzzwords, and popular conversational expressions in Tokyo right now' },
    { label: '🌸 Kyoto & Tokyo Seasonal Festivals', query: 'What traditional festivals (matsuri), seasonal cultural events, and seasonal foods are celebrated in Japan this season?' },
    { label: '🚄 Shinkansen & Japan Travel Etiquette', query: 'Latest rules, oversized baggage guidelines, and essential Japanese phrases for riding the Shinkansen bullet train in Japan' },
    { label: '♨️ Japanese Onsen Rules & Vocabulary', query: 'Traditional rules, etiquette, and essential Japanese phrases for visiting a hot spring onsen or ryokan in Japan' },
    { label: '📰 Easy Japanese News Today', query: 'Recent interesting easy Japanese news article for students with essential vocabulary' },
    { label: '📚 Haruki Murakami & Modern Literature', query: 'Haruki Murakami famous works, writing style, and key vocabulary for Japanese readers' },
  ];

  const handleExecuteSearch = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;
    setIsLoading(true);
    setErrorMessage(null);
    setImportedToHon(false);

    try {
      const response = await fetch('/api/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText.trim(),
          level: selectedLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve live Google Search grounding');
      }

      const data = await response.json();
      setResult({
        query: queryText.trim(),
        reply: data.reply || '',
        webSources: data.webSources || [],
        searchQueries: data.searchQueries || [],
      });
      sfx.playCorrect();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error executing search grounding');
    } finally {
      setIsLoading(false);
    }
  };

  const parsedSegments = result ? parseMiyuResponse(result.reply) : [];
  const extractedWords = parsedSegments
    .filter((s) => s.type === 'word_card' && s.word)
    .map((s) => s.word!);

  const handleImportToLibrary = () => {
    if (!result || !onImportToLibrary) return;

    // Create a new NihongoBook object from search result
    const title = result.query.length > 30 ? result.query.slice(0, 27) + '...' : result.query;
    const cleanParagraphs = result.reply
      .split('\n\n')
      .filter((p) => p.trim() && !p.includes('【Romaji】') && !p.includes('[MOOD:'))
      .map((p) => ({
        ja: p.replace(/<\/?speak(?: lang="ja")?>/g, '').trim(),
        ro: '',
        en: p.replace(/<\/?speak(?: lang="ja")?>/g, '').trim(),
      }));

    const newBook: NihongoBook = {
      id: `web-search-${Date.now()}`,
      title: `🌐 ${title}`,
      titleJa: `Web検索: ${title}`,
      author: 'Google Search & MIYU Sensei',
      authorJa: 'グーグル検索・MIYU先生',
      level: (selectedLevel as any) || 'N5',
      genre: 'Live Web Grounding',
      coverGradient: 'from-blue-600 via-indigo-600 to-sky-700',
      tag: 'Google Search',
      readTimeMinutes: 3,
      text: result.reply.replace(/<\/?speak(?: lang="ja")?>/g, ''),
      paragraphs: cleanParagraphs.length > 0 ? cleanParagraphs : [
        {
          ja: result.reply.slice(0, 500).replace(/<\/?speak(?: lang="ja")?>/g, ''),
          ro: '',
          en: 'Real-time search grounded content.',
        },
      ],
      vocabulary: extractedWords.map((w, idx) => ({
        id: `sw-${Date.now()}-${idx}`,
        alphabet: (w.romaji[0] || 'A').toUpperCase(),
        romaji: w.romaji,
        hiragana: w.hiragana,
        katakana: w.katakana,
        kanji: w.kanji,
        meaning: w.meaning,
        jlpt: (w.jlpt as any) || selectedLevel,
        type: 'Noun',
        contextSentence: `${w.kanji !== '—' ? w.kanji : w.hiragana}について調べました。`,
        contextSentenceMeaning: `Researched about ${w.meaning}.`,
      })),
      grammar: [
        {
          id: `sg-1`,
          point: '〜について (About / Concerning)',
          pattern: '[Noun] について',
          explanation: 'Used when speaking or researching about a particular subject.',
          exampleInBook: `${title} について べんきょうします。`,
          exampleMeaning: `I will study about ${title}.`,
          particleFocus: 'について',
        },
      ],
      studyGuide: {
        summary: `Real-time research notes grounded with Google Search on: "${result.query}".`,
        summaryJa: `Google検索と最新ウェブデータに基づく実用日本語学習ノート。`,
        podcastBriefing: `Welcome to this Google Search briefing on ${result.query}! MIYU Sensei analyzed up-to-date web information to give you authentic Japanese vocabulary and cultural context.`,
        keyThemes: ['Live Web Grounding', 'Modern Japanese Usage', 'Cultural Insights'],
        culturalNotes: `Grounded via Google Search with gemini-3.5-flash for real-world accuracy. Sources include: ${result.webSources.map((s) => s.title).slice(0, 3).join(', ')}.`,
      },
      quizQuestions: [
        {
          id: 'sq-1',
          question: `What is the main topic covered in this search briefing?`,
          questionJa: `この検索ノートの主なトピックは何ですか？`,
          options: [title, 'Ancient History', 'Cooking Only', 'Sports Rules'],
          correctIndex: 0,
          explanation: `The search is grounded in live web information regarding ${title}.`,
        },
      ],
      isCustom: true,
    };

    onImportToLibrary(newBook);
    setImportedToHon(true);
    sfx.playCorrect();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-sky-100 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden relative">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#0F1E36] via-[#1E293B] to-[#1E3A8A] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 p-0.5 flex items-center justify-center shadow-md">
              <Globe className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">
                  Live Japanese Culture & Web Explorer
                </h2>
                <span className="text-[10px] font-bold bg-sky-500/20 text-sky-200 border border-sky-400/40 px-2 py-0.5 rounded-full">
                  gemini-3.5-flash + Google Search
                </span>
              </div>
              <p className="text-xs text-sky-200/80">
                Search live Japanese web data, current JLPT dates, modern slang, travel tips & authentic cultural facts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Search Box */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleExecuteSearch(searchQuery);
                    }
                  }}
                  placeholder="Search any Japanese topic (e.g. 2025 JLPT dates, Tokyo youth slang, Kyoto festivals)..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:border-sky-400 focus:bg-white transition-all"
                  disabled={isLoading}
                />
              </div>

              <button
                onClick={() => handleExecuteSearch(searchQuery)}
                disabled={!searchQuery.trim() || isLoading}
                className="px-5 py-3 rounded-2xl bg-[#15254A] hover:bg-[#1f3769] text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Search Web</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Suggestion Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mr-1">
                Suggestions:
              </span>
              {quickSearchSuggestions.map((sug) => (
                <button
                  key={sug.label}
                  onClick={() => {
                    setSearchQuery(sug.query);
                    handleExecuteSearch(sug.query);
                  }}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 transition-colors cursor-pointer disabled:opacity-50 active:scale-95"
                >
                  {sug.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Animation State */}
          {isLoading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-sky-100 border-t-sky-500 animate-spin flex items-center justify-center" />
                <Globe className="w-7 h-7 text-sky-600 absolute inset-0 m-auto animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-sm">
                  Grounding with Google Search & gemini-3.5-flash...
                </h3>
                <p className="text-xs text-slate-500 max-w-md">
                  Fetching verified web information, Japanese vocabulary, and cultural context
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
              <span className="font-bold">Search error: </span>
              {errorMessage}
            </div>
          )}

          {/* Result Showcase */}
          {result && !isLoading && (
            <div className="space-y-6 animate-in fade-in">
              {/* Top Banner Actions & Verified Sources */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50/90 via-blue-50/50 to-indigo-50/70 border border-sky-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-sky-600" />
                        Verified Google Search Grounding
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                        Live Facts
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Grounding for: <span className="font-semibold text-slate-800">"{result.query}"</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {onImportToLibrary && (
                      <button
                        onClick={handleImportToLibrary}
                        disabled={importedToHon}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          importedToHon
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-white hover:bg-sky-50 text-sky-800 border border-sky-300 shadow-2xs'
                        }`}
                      >
                        {importedToHon ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Imported to Nihongo Hon!</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                            <span>Import to Nihongo Hon</span>
                          </>
                        )}
                      </button>
                    )}

                    {onAskInChat && (
                      <button
                        onClick={() => {
                          onAskInChat(`MIYU Sensei, tell me more about: "${result.query}"`);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#15254A] hover:bg-[#1f3769] text-white shadow-2xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Discuss with Miyu</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Sources list */}
                {result.webSources.length > 0 && (
                  <div className="pt-2 border-t border-sky-200/60 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                      Web Sources ({result.webSources.length}):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {result.webSources.map((source, sIdx) => {
                        const domain = (() => {
                          try {
                            return new URL(source.uri).hostname.replace(/^www\./, '');
                          } catch {
                            return 'source';
                          }
                        })();
                        return (
                          <a
                            key={sIdx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-sky-100 hover:border-sky-300 text-xs text-sky-900 transition-all hover:shadow-2xs group cursor-pointer"
                          >
                            <div className="flex items-center gap-2 min-w-0 pr-1">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                              <span className="font-bold truncate text-[11px] group-hover:text-blue-700" title={source.title}>
                                {source.title || domain}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 group-hover:text-sky-600 flex-shrink-0">
                              <span>{domain}</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Render Structured Content */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Sensei Grounded Breakdown</span>
                </h3>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                  {parsedSegments.map((seg, idx) => {
                    if (seg.type === 'word_card' && seg.word) {
                      const isSaved = savedWords.some((sw) => sw.romaji === seg.word!.romaji);
                      return (
                        <JapaneseCard
                          key={idx}
                          word={seg.word}
                          isSaved={isSaved}
                          onSaveWord={onSaveWord}
                          onPracticeClick={(w) => {
                            onAskInChat?.(`Let's practice the word "${w.hiragana}" (${w.meaning}) in a sentence!`);
                            onClose();
                          }}
                        />
                      );
                    }

                    const cleanText = seg.content.replace(/<\/?speak(?: lang="ja")?>/g, '');
                    return (
                      <div key={idx} className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 font-medium">
                        {cleanText}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
