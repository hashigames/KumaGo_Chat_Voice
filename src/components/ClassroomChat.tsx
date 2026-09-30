import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Volume2,
  Sparkles,
  MessageCircle,
  BookOpen,
  Layers,
  HelpCircle,
  CheckCircle2,
  Globe,
  ExternalLink,
  Compass
} from 'lucide-react';
import { MiyuSenseiAvatar } from './MiyuSenseiAvatar';
import { MiyuMood, AnimeStyle, MIYU_OFFICIAL_SPRITES } from '../assets/miyu';
import { parseMiyuResponse, JapaneseWordBlock } from '../utils/parser';
import { JapaneseCard } from './JapaneseCard';
import { tts, sfx, SubtitleState } from '../utils/audio';
import { JapaneseSubtitleBar } from './JapaneseSubtitleBar';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  mood?: MiyuMood;
  audioSnippets?: string[];
  timestamp: Date;
  webSources?: Array<{ uri: string; title: string }>;
  searchQueries?: string[];
  searchGrounded?: boolean;
}

interface ClassroomChatProps {
  messages: ChatMessage[];
  onSendMessage: (msg: string) => void;
  isLoading: boolean;
  currentMood: MiyuMood;
  isSpeaking: boolean;
  lastSpeechText: string;
  onSaveWord: (word: JapaneseWordBlock) => void;
  savedWords: JapaneseWordBlock[];
  selectedLevel: string;
  onSelectLevel: (lvl: string) => void;
  activeSubtitle?: SubtitleState | null;
  animeStyle?: AnimeStyle;
  onToggleAnimeStyle?: () => void;
  useSearchGrounding?: boolean;
  onToggleSearchGrounding?: () => void;
  onOpenSearchModal?: () => void;
}

export const ClassroomChat: React.FC<ClassroomChatProps> = ({
  messages,
  onSendMessage,
  isLoading,
  currentMood,
  isSpeaking,
  lastSpeechText,
  onSaveWord,
  savedWords,
  selectedLevel,
  onSelectLevel,
  activeSubtitle,
  animeStyle = 'celshade',
  onToggleAnimeStyle,
  useSearchGrounding = true,
  onToggleSearchGrounding,
  onOpenSearchModal,
}) => {
  const [inputText, setInputText] = useState('');
  const [characterViewMode, setCharacterViewMode] = useState<'sidebar' | 'mascot'>('sidebar');
  const [showRomajiSub, setShowRomajiSub] = useState(true);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, activeSubtitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const playMessageVoice = (msg: ChatMessage) => {
    tts.speakTaggedText(msg.content, { rate: 0.85, pitch: 1.15 });
  };

  const quickPrompts = [
    { label: '🌐 JLPT 2025-2026 Test Dates', prompt: 'MIYU Sensei, what are the upcoming JLPT exam dates, registration deadlines, and test formats for 2025-2026?' },
    { label: '🔥 Trending Japanese Slang', prompt: 'What are the most popular trending Japanese slang words and youth buzzwords used in Tokyo right now with the 6-line breakdown?' },
    { label: '🌸 Tokyo & Kyoto Events', prompt: 'What traditional festivals, seasonal cultural events, and seasonal foods are popular in Japan right now?' },
    { label: '🚄 Shinkansen Rules & Phrases', prompt: 'What are the latest rules, baggage guidelines, and essential phrases for riding the Shinkansen in Japan?' },
    { label: '📖 Nihongo Hon (Library)', prompt: 'MIYU Sensei, tell me about Nihongo Hon (日本語本) and how I can upload Japanese books and stories to extract vocabulary and grammar!' },
    { label: 'Teach me N5 Nouns (A-Z)', prompt: 'MIYU Sensei, please teach me N5 nouns starting with the letter A!' },
    { label: 'あります vs います (Existence)', prompt: 'MIYU Sensei, please teach me the difference between あります (arimasu) and います (imasu) with examples and a quiz question!' },
    { label: 'Conjugate "taberu" (食べる)', prompt: 'Conjugate the verb taberu (食べる) in all its forms with explanations!' },
    { label: 'Particles (は vs が, に vs で)', prompt: 'Can you quiz me on the difference between the particles は (wa) and が (ga), and に (ni) vs で (de)?' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
      {/* Left/Main Column: Chat Conversation Stream */}
      <div className={`${characterViewMode === 'sidebar' ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col h-[750px] bg-white/95 backdrop-blur-md rounded-3xl border border-sky-100 shadow-md overflow-hidden relative`}>
        {/* Chat Control Toolbar */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-sky-50 via-white to-blue-50/50 border-b border-sky-100 flex items-center justify-between gap-3 flex-wrap">
          {/* Level Switcher */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Target JLPT:
            </span>
            <div className="flex bg-slate-100/90 p-0.5 rounded-xl border border-slate-200">
              {['N5', 'N4', 'N3', 'N2', 'N1'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onSelectLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-[#15254A] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Live Web Grounding Toggle (Powered by gemini-3.5-flash) */}
            {onToggleSearchGrounding && (
              <button
                onClick={onToggleSearchGrounding}
                title="Toggle Google Search Grounding with gemini-3.5-flash for real-time web facts & recent events"
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border ${
                  useSearchGrounding
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-2xs'
                    : 'bg-slate-50 text-slate-500 hover:text-slate-700 border-slate-200'
                }`}
              >
                <Globe className={`w-3.5 h-3.5 ${useSearchGrounding ? 'text-cyan-200 animate-spin-slow' : 'text-slate-400'}`} />
                <span>{useSearchGrounding ? 'Google Search ON' : 'Google Search OFF'}</span>
              </button>
            )}

            {/* Live Culture & Web Explorer Modal Trigger */}
            {onOpenSearchModal && (
              <button
                onClick={onOpenSearchModal}
                title="Search real-time Japanese topics, current JLPT dates, and cultural news"
                className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              >
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Web Explorer</span>
              </button>
            )}

            {/* Toggle Cel-Shading Style */}
            {onToggleAnimeStyle && (
              <button
                onClick={onToggleAnimeStyle}
                className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{animeStyle === 'celshade' ? 'Anime Cel-Shading' : 'Classic Style'}</span>
              </button>
            )}

            {/* Toggle Character Position */}
            <button
              onClick={() => setCharacterViewMode((m) => (m === 'sidebar' ? 'mascot' : 'sidebar'))}
              className="text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              {characterViewMode === 'sidebar' ? 'Wide Chat' : 'Show Sensei'}
            </button>
          </div>
        </div>

        {/* Floating Real-Time Japanese Native Voice Subtitle Banner */}
        {activeSubtitle && (
          <div className="sticky top-0 z-30 px-4 py-2 bg-gradient-to-r from-sky-900/95 via-[#15254A]/95 to-slate-900/95 backdrop-blur-md shadow-lg border-b border-sky-400/40 animate-in slide-in-from-top-2">
            <JapaneseSubtitleBar
              subtitle={activeSubtitle}
              showRomaji={showRomajiSub}
              onToggleRomaji={() => setShowRomajiSub(!showRomajiSub)}
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

        {/* Quick Lesson Prompt Chips */}
        <div className="px-4 py-2 bg-slate-50/70 border-b border-slate-100 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex-shrink-0">
            Quick Topics:
          </span>
          {quickPrompts.map((qp) => (
            <button
              key={qp.label}
              onClick={() => onSendMessage(qp.prompt)}
              disabled={isLoading}
              className="px-3 py-1 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-full text-xs font-medium text-slate-700 hover:text-sky-800 transition-colors whitespace-nowrap cursor-pointer shadow-2xs active:scale-95 disabled:opacity-50"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isSensei = msg.role === 'model';
            const parsedSegments = isSensei ? parseMiyuResponse(msg.content) : null;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isSensei ? 'items-start' : 'items-end justify-end'}`}
              >
                {/* Sensei Avatar Thumbnail (Official Art) */}
                {isSensei && (
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 p-0.5 flex-shrink-0 shadow-xs overflow-hidden">
                    <img
                      src={MIYU_OFFICIAL_SPRITES.idle}
                      alt="MIYU"
                      className="w-full h-full object-cover object-top rounded-[14px]"
                    />
                  </div>
                )}

                {/* Message Bubble Container */}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 shadow-xs ${
                    isSensei
                      ? 'bg-gradient-to-b from-white to-sky-50/30 border border-sky-100 text-slate-800'
                      : 'bg-[#15254A] text-white shadow-sm'
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-100/50 flex-wrap gap-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${isSensei ? 'text-amber-500' : 'text-sky-200'}`}>
                        {isSensei ? 'MIYU Sensei (KUMAGO 橋)' : 'You'}
                      </span>
                      {msg.searchGrounded && (
                        <span className="text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300 px-2 py-0.2 rounded-full flex items-center gap-1">
                          <Globe className="w-2.5 h-2.5 text-sky-600" />
                          <span>Google Search Grounded</span>
                        </span>
                      )}
                    </div>

                    {/* Audio Playback for Sensei Message */}
                    {isSensei && (
                      <button
                        onClick={() => playMessageVoice(msg)}
                        title="Pronounce Japanese with Subtitles"
                        className="flex items-center gap-1.5 text-[11px] font-bold text-sky-600 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Voice + Subtitles</span>
                      </button>
                    )}
                  </div>

                  {/* Render Parsed Segments if Sensei, otherwise plain text */}
                  {isSensei && parsedSegments ? (
                    <div className="space-y-2 text-sm leading-relaxed">
                      {parsedSegments.map((seg, idx) => {
                        if (seg.type === 'word_card' && seg.word) {
                          const isAlreadySaved = savedWords.some((sw) => sw.romaji === seg.word!.romaji);
                          return (
                            <JapaneseCard
                              key={idx}
                              word={seg.word}
                              isSaved={isAlreadySaved}
                              onSaveWord={onSaveWord}
                              onPracticeClick={(w) => onSendMessage(`Let's practice the word "${w.hiragana}" in a full Japanese sentence!`)}
                            />
                          );
                        }

                        // Clean speak tags out of human display
                        const cleanText = seg.content.replace(/<\/?speak(?: lang="ja")?>/g, '');

                        return (
                          <div key={idx} className="whitespace-pre-wrap font-medium">
                            {cleanText}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed font-medium">
                      {msg.content}
                    </p>
                  )}

                  {/* Verified Google Search Sources & Citations */}
                  {isSensei && msg.webSources && msg.webSources.length > 0 && (
                    <div className="mt-3.5 p-3 rounded-2xl bg-gradient-to-r from-sky-50/90 via-blue-50/60 to-indigo-50/80 border border-sky-200/90 space-y-2 animate-in fade-in">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-black text-sky-900">
                          <Globe className="w-3.5 h-3.5 text-sky-600" />
                          <span>Verified Web Sources (Google Search Grounding)</span>
                          <span className="text-[10px] bg-sky-200/70 text-sky-900 px-1.5 py-0.2 rounded-md font-bold">gemini-3.5-flash</span>
                        </div>
                        {msg.searchQueries && msg.searchQueries.length > 0 && (
                          <div className="text-[10px] text-slate-500 italic truncate max-w-[200px]">
                            Query: "{msg.searchQueries[0]}"
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {msg.webSources.map((source, sIdx) => {
                          const domain = (() => {
                            try {
                              return new URL(source.uri).hostname.replace(/^www\./, '');
                            } catch {
                              return 'web source';
                            }
                          })();

                          return (
                            <a
                              key={sIdx}
                              href={source.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-2 rounded-xl bg-white/95 hover:bg-white border border-sky-100 hover:border-sky-300 text-xs text-sky-900 transition-all hover:shadow-2xs group cursor-pointer"
                            >
                              <div className="flex items-center gap-2 min-w-0 pr-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
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
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3 animate-in fade-in">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 p-0.5 flex-shrink-0 shadow-xs overflow-hidden">
                <img
                  src={MIYU_OFFICIAL_SPRITES.welcoming}
                  alt="MIYU Thinking"
                  className="w-full h-full object-cover object-top rounded-[14px]"
                />
              </div>

              <div className="bg-white border border-sky-100 rounded-3xl px-5 py-3.5 shadow-xs flex items-center gap-2 text-xs font-bold text-sky-700">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce delay-150" />
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce delay-300" />
                <span className="ml-1">
                  {useSearchGrounding
                    ? 'MIYU is grounding with Google Search & formulating your lesson...'
                    : 'MIYU is formulating your Japanese lesson...'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-3.5 sm:p-4 bg-white border-t border-sky-100 space-y-1.5">
          {useSearchGrounding && (
            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
              <div className="flex items-center gap-1 text-sky-700 font-semibold">
                <Globe className="w-3 h-3 text-sky-600" />
                <span>Google Search Grounding active: queries will fetch up-to-date real-world facts</span>
              </div>
              <span className="text-[10px] text-slate-400">gemini-3.5-flash</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                useSearchGrounding
                  ? 'Ask MIYU about Japanese grammar, JLPT dates, modern slang, culture or travel...'
                  : 'Ask MIYU Sensei anything or answer the quiz in Japanese/English...'
              }
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-400 focus:bg-white transition-all disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="bg-[#15254A] hover:bg-[#1f3769] text-white p-3 sm:px-5 sm:py-3 rounded-2xl font-bold text-sm shadow-xs transition-all cursor-pointer flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transform active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Full Body Animated MIYU Sensei in Cel-Shaded Studio View */}
      {characterViewMode === 'sidebar' && (
        <div className="hidden lg:flex lg:col-span-4 flex-col items-center justify-between min-h-[750px] bg-gradient-to-b from-sky-50/70 via-white to-sky-100/50 rounded-3xl border-2 border-sky-200/90 p-5 shadow-md relative overflow-hidden">
          {/* Subtle Decorative Header */}
          <div className="w-full flex items-center justify-between z-20">
            <span className="text-xs font-black text-sky-900 uppercase tracking-widest bg-white/90 px-3 py-1 rounded-full border border-sky-200 shadow-2xs">
              KUMAGO 橋 MIYU Sensei
            </span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-300">
              Cel-Shaded 2D
            </span>
          </div>

          <div className="w-full pt-4 flex flex-col items-center">
            <MiyuSenseiAvatar
              mood={currentMood}
              isSpeaking={isSpeaking}
              speechText={lastSpeechText || 'こんにちは！今日も楽しく日本語を学びましょう！'}
              size="normal"
              activeSubtitle={activeSubtitle}
              animeStyle={animeStyle}
              onToggleAnimeStyle={onToggleAnimeStyle}
            />
          </div>

          {/* Quick Voice Line Buttons with Subtitles */}
          <div className="w-full bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-sky-100 space-y-2 text-xs mt-3 z-20">
            <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">
              Sensei Encouragement Lines (Native Voice + Subtitles):
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: '🌸 Sugoi! (すごい！)', ja: 'すごい！よくできました！', ro: 'Sugoi! Yoku dekimashita!', en: 'Amazing! Very well done!' },
                { label: '💪 Ganbatte! (頑張って)', ja: '頑張って！あなたならできます！', ro: 'Ganbatte! Anata nara dekimasu!', en: 'Keep it up! You can do it!' },
                { label: '🔥 Yosh! (よし！)', ja: 'よし！次の問題に行きましょう！', ro: 'Yoshi! Tsugi no mondai ni ikimashou!', en: 'Alright! Let\'s go to the next question!' },
                { label: '✨ Daijoubu (大丈夫)', ja: '大丈夫！一歩ずつマスターしていきましょう！', ro: 'Daijoubu! Ippozutsu masutaa shite ikimashou!', en: 'No worries! Step by step we will master it!' },
              ].map((vl) => (
                <button
                  key={vl.label}
                  onClick={() =>
                    tts.speak(vl.ja, {
                      rate: 0.9,
                      pitch: 1.15,
                      englishTranslation: vl.en,
                      romajiHint: vl.ro,
                    })
                  }
                  className="px-2.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-left transition-colors cursor-pointer text-[11px]"
                >
                  {vl.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Mascot Widget when in 'mascot' mode */}
      {characterViewMode === 'mascot' && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-5">
          <div className="relative group">
            {/* Heart Badge on Avatar */}
            <div className="absolute -top-1 -right-1 z-30 w-7 h-7 rounded-full bg-[#15254A] border-2 border-white flex items-center justify-center text-rose-400 shadow-md">
              <span className="text-xs">♡</span>
            </div>

            <div
              onClick={() => setCharacterViewMode('sidebar')}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white bg-gradient-to-tr from-sky-200 to-indigo-100 shadow-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              title="Click to expand Sensei Sidebar"
            >
              <img
                src={MIYU_OFFICIAL_SPRITES.idle}
                alt="MIYU Mascot"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

