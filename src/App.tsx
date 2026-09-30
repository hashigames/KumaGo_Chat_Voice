import React, { useState, useEffect } from 'react';
import { GamificationHeader, NavTab } from './components/GamificationHeader';
import { ClassroomChat, ChatMessage } from './components/ClassroomChat';
import { GrammarView } from './components/GrammarView';
import { KanaDrillsView } from './components/KanaDrillsView';
import { VocabDeckView } from './components/VocabDeckView';
import { NihongoHonView } from './components/NihongoHonView';
import { LevelUpModal } from './components/LevelUpModal';
import { SearchGroundingModal } from './components/SearchGroundingModal';
import { NihongoBook, DEFAULT_NIHONGO_BOOKS } from './data/nihongoHonBooks';
import { JapaneseWordBlock } from './utils/parser';
import { MiyuMood, AnimeStyle } from './assets/miyu';
import { tts, sfx, SubtitleState } from './utils/audio';

const INITIAL_SENSEI_MESSAGE: ChatMessage = {
  id: 'init-1',
  role: 'model',
  content: `Konnichiwa! I am MIYU Sensei — your elite native Japanese tutor for kumaGO 橋! 🌸
Whether you are starting from zero (N5) or aiming for advanced JLPT mastery (N1), I will guide you with native pronunciation, conjugation tables, real-time bilingual subtitles, and video game XP challenges!

【Romaji】  hajimemashite
【Hiragana】 はじめまして
【Katakana】 ハジメマシテ
【Kanji】   初めまして
【Meaning】  nice to meet you
【JLPT】     N5

<speak lang="ja">はじめまして！いっしょに にほんごを がんばりましょう！</speak>

Which JLPT level (N5–N1) or lesson category (Nouns, Verbs, Phrases, Kana, Grammar) would you like to master today? Yosh! Ganbatte! ✨`,
  mood: 'talking',
  timestamp: new Date(),
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('chat');
  const [selectedLevel, setSelectedLevel] = useState<string>('N5');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_SENSEI_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMood, setCurrentMood] = useState<MiyuMood>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastSpeechText, setLastSpeechText] = useState('Konnichiwa! Ready to learn Japanese together? ✨');
  const [animeStyle, setAnimeStyle] = useState<AnimeStyle>('celshade');
  const [activeSubtitle, setActiveSubtitle] = useState<SubtitleState | null>(null);

  // Subscribe to real-time Japanese subtitles
  useEffect(() => {
    const unsubscribe = tts.subscribeSubtitle((sub) => {
      setActiveSubtitle(sub);
      if (sub && sub.isSpeaking) {
        setIsSpeaking(true);
      } else {
        setIsSpeaking(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Gamification State (Loaded from localStorage if available)
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('kumago_xp');
    return saved ? parseInt(saved, 10) : 40;
  });
  const [streak] = useState<number>(() => {
    const saved = localStorage.getItem('kumago_streak');
    return saved ? parseInt(saved, 10) : 5;
  });
  const [correctAnswersInSession, setCorrectAnswersInSession] = useState(0);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

  // Audio & Settings State
  const [isMuted, setIsMuted] = useState(false);
  const [ttsSpeed, setTtsSpeed] = useState(0.85);
  const [langMode, setLangMode] = useState<'en' | 'ja'>('en');
  const [useSearchGrounding, setUseSearchGrounding] = useState<boolean>(true);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  // Saved Words Notebook
  const [savedWords, setSavedWords] = useState<JapaneseWordBlock[]>(() => {
    try {
      const saved = localStorage.getItem('kumago_saved_words');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const level = Math.floor(xp / 100) + 1;

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('kumago_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('kumago_saved_words', JSON.stringify(savedWords));
  }, [savedWords]);

  const handleAwardXP = (amount: number) => {
    setXp((prev) => {
      const oldLevel = Math.floor(prev / 100) + 1;
      const nextXp = prev + amount;
      const newLevel = Math.floor(nextXp / 100) + 1;
      if (newLevel > oldLevel) {
        setShowLevelUpModal(true);
      }
      return nextXp;
    });

    const nextCorrect = correctAnswersInSession + 1;
    setCorrectAnswersInSession(nextCorrect);
    // Every 5 correct answers trigger Level Up celebration!
    if (nextCorrect % 5 === 0) {
      setShowLevelUpModal(true);
    }
  };

  const handleToggleSaveWord = (word: JapaneseWordBlock) => {
    setSavedWords((prev) => {
      const exists = prev.some((w) => w.romaji === word.romaji);
      if (exists) {
        return prev.filter((w) => w.romaji !== word.romaji);
      }
      return [word, ...prev];
    });
  };

  const handleImportBook = (book: NihongoBook) => {
    try {
      const saved = localStorage.getItem('kumago_nihongo_hon_books');
      const existing: NihongoBook[] = saved ? JSON.parse(saved) : DEFAULT_NIHONGO_BOOKS;
      const updated = [book, ...existing.filter((b) => b.id !== book.id)];
      localStorage.setItem('kumago_nihongo_hon_books', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    handleAwardXP(25);
    setActiveTab('library');
  };

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setCurrentMood('thinking');

    try {
      // Build history for backend API
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
          level: selectedLevel,
          category: activeTab,
          useSearchGrounding,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from MIYU Sensei');
      }

      const data = await response.json();
      const senseiReply: string = data.reply || '';
      const replyMood: MiyuMood = data.mood || 'talking';

      setCurrentMood(replyMood);

      // Check if Sensei awarded praise/XP
      if (
        senseiReply.includes('Sugoi') ||
        senseiReply.includes('Correct!') ||
        senseiReply.includes('よくできました') ||
        senseiReply.includes('+10 XP')
      ) {
        sfx.playCorrect();
        handleAwardXP(10);
      }

      const senseiMessage: ChatMessage = {
        id: `m-${Date.now()}`,
        role: 'model',
        content: senseiReply,
        mood: replyMood,
        audioSnippets: data.audioSnippets,
        webSources: data.webSources,
        searchQueries: data.searchQueries,
        searchGrounded: data.searchGrounded,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, senseiMessage]);

      // Auto-speak if not muted
      if (!isMuted) {
        setIsSpeaking(true);
        setLastSpeechText(
          senseiReply.slice(0, 100).replace(/<[^>]+>/g, '').trim()
        );
        tts.speakTaggedText(senseiReply, {
          rate: ttsSpeed,
          pitch: 1.15,
          onEnd: () => {
            setIsSpeaking(false);
            setCurrentMood('idle');
          },
        });
      }
    } catch (err: any) {
      console.error(err);
      setCurrentMood('idle');
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `Gomen nasai! I had a brief hiccup connecting to the studio. Let me confirm that — I don't want to teach you wrong Japanese! Please ask me again! 🙏`,
        mood: 'idle',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAsk = (prompt: string) => {
    setActiveTab('chat');
    handleSendMessage(prompt);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#E9F3FC] via-[#F5F9FD] to-[#FCFBF7] text-slate-800 antialiased selection:bg-sky-200">
      {/* Top Gamification & Navigation Header */}
      <GamificationHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        xp={xp}
        level={level}
        streak={streak}
        isMuted={isMuted}
        onToggleMute={() => {
          if (!isMuted) tts.stop();
          setIsMuted(!isMuted);
        }}
        ttsSpeed={ttsSpeed}
        onSpeedChange={setTtsSpeed}
        langMode={langMode}
        onToggleLang={() => setLangMode((m) => (m === 'en' ? 'ja' : 'en'))}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6">
        {activeTab === 'chat' && (
          <ClassroomChat
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            currentMood={currentMood}
            isSpeaking={isSpeaking}
            lastSpeechText={lastSpeechText}
            onSaveWord={handleToggleSaveWord}
            savedWords={savedWords}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            activeSubtitle={activeSubtitle}
            animeStyle={animeStyle}
            onToggleAnimeStyle={() =>
              setAnimeStyle((s) => (s === 'celshade' ? 'classic' : 'celshade'))
            }
            useSearchGrounding={useSearchGrounding}
            onToggleSearchGrounding={() => setUseSearchGrounding(!useSearchGrounding)}
            onOpenSearchModal={() => setShowSearchModal(true)}
          />
        )}

        {activeTab === 'library' && (
          <NihongoHonView
            onSaveWord={handleToggleSaveWord}
            savedWords={savedWords}
            onAskMiyu={handleQuickAsk}
            onAwardXP={handleAwardXP}
            onOpenSearchModal={() => setShowSearchModal(true)}
            onImportBook={handleImportBook}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarView onAskMiyu={handleQuickAsk} />
        )}

        {activeTab === 'vocab' && (
          <VocabDeckView
            onTeachWord={(item, lvl) => {
              handleQuickAsk(
                `MIYU Sensei, please teach me the ${lvl.toUpperCase()} word "${item.kanji && item.kanji !== '—' ? item.kanji : item.hiragana}" (${item.meaning}) with the 6-line breakdown and a quiz!`
              );
            }}
          />
        )}

        {activeTab === 'kana' && (
          <KanaDrillsView onAskMiyu={handleQuickAsk} onAwardXP={handleAwardXP} />
        )}
      </main>

      {/* Live Japanese Culture & Web Explorer Modal (Powered by gemini-3.5-flash + Google Search) */}
      {showSearchModal && (
        <SearchGroundingModal
          isOpen={showSearchModal}
          onClose={() => setShowSearchModal(false)}
          selectedLevel={selectedLevel}
          onSaveWord={handleToggleSaveWord}
          savedWords={savedWords}
          onImportToLibrary={handleImportBook}
          onAskInChat={handleQuickAsk}
        />
      )}

      {/* Level-Up Celebration Modal */}
      {showLevelUpModal && (
        <LevelUpModal
          level={level}
          xp={xp}
          streak={streak}
          onClose={() => setShowLevelUpModal(false)}
        />
      )}

      {/* Footer Aligned to Lighthouse 橋 Design */}
      <footer className="mt-auto border-t border-sky-100/80 bg-white/60 backdrop-blur-sm py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1 font-semibold text-slate-600">
            <span>by</span>
            <span className="font-black text-[#15254A] tracking-wider">LIGHTHOUSE</span>
            <span className="text-[#15254A] font-bold">橋</span>
            <span className="text-slate-400 ml-1">× kumaGO Japanese Academy</span>
          </div>

          <div className="text-slate-500 font-medium">
            kumaGO 橋 MIYU Sensei &bull; Cel-Shaded Anime Native Japanese AI Tutor
          </div>
        </div>
      </footer>
    </div>
  );
}
