import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Upload,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Plus,
  Trash2,
  CheckCircle2,
  BookCheck,
  HelpCircle,
  MessageSquare,
  Search,
  ExternalLink,
  ChevronRight,
  Layers,
  FileText,
  BookmarkPlus,
  Headphones,
  Award,
  Lightbulb,
  Send,
  RefreshCw,
  Eye,
  EyeOff,
  Globe
} from 'lucide-react';
import {
  NihongoBook,
  DEFAULT_NIHONGO_BOOKS,
  BookVocabItem,
  BookGrammarItem
} from '../data/nihongoHonBooks';
import { JapaneseWordBlock } from '../utils/parser';
import { tts, sfx } from '../utils/audio';
import miyuKnowledgeImg from '../assets/images/miyu_knowledge_books_1790610728517.jpg';

interface NihongoHonViewProps {
  onSaveWord: (word: JapaneseWordBlock) => void;
  savedWords: JapaneseWordBlock[];
  onAskMiyu: (prompt: string) => void;
  onAwardXP: (amount: number) => void;
  onOpenSearchModal?: () => void;
  onImportBook?: (book: NihongoBook) => void;
}

type WorkspaceTab = 'reader' | 'vocab' | 'grammar' | 'study_guide' | 'quiz';

export const NihongoHonView: React.FC<NihongoHonViewProps> = ({
  onSaveWord,
  savedWords,
  onAskMiyu,
  onAwardXP,
  onOpenSearchModal,
  onImportBook,
}) => {
  // Books collection (stored in localStorage)
  const [books, setBooks] = useState<NihongoBook[]>(() => {
    try {
      const saved = localStorage.getItem('kumago_nihongo_hon_books');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_NIHONGO_BOOKS;
  });

  const [selectedBookId, setSelectedBookId] = useState<string>(() => {
    return books[0]?.id || 'momotaro';
  });

  const [activeTab, setActiveTab] = useState<WorkspaceTab>('reader');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddVocabModal, setShowAddVocabModal] = useState(false);
  const [showAddGrammarModal, setShowAddGrammarModal] = useState(false);

  // Reading Options
  const [showRomaji, setShowRomaji] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [fontSize, setFontSize] = useState<'md' | 'lg' | 'xl'>('lg');

  // Audio Playback
  const [isNarrating, setIsNarrating] = useState(false);
  const [playingItemId, setPlayingItemId] = useState<string | null>(null);

  // Grounded Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'model'; content: string }>>([
    {
      role: 'model',
      content: `Konnichiwa! Welcome to the Japanese Library (図書館 - Toshokan)! 📚
I am grounded in your selected reading material. Ask me to break down any sentence, explain particles, list vocabulary, or test your comprehension!`
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadTitleJa, setUploadTitleJa] = useState('');
  const [uploadAuthor, setUploadAuthor] = useState('');
  const [uploadAuthorJa, setUploadAuthorJa] = useState('');
  const [uploadLevel, setUploadLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>('N5');
  const [uploadGenre, setUploadGenre] = useState('Custom Reading');
  const [uploadText, setUploadText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Manual Vocab Form State
  const [newVocabKanji, setNewVocabKanji] = useState('');
  const [newVocabHiragana, setNewVocabHiragana] = useState('');
  const [newVocabKatakana, setNewVocabKatakana] = useState('');
  const [newVocabRomaji, setNewVocabRomaji] = useState('');
  const [newVocabMeaning, setNewVocabMeaning] = useState('');
  const [newVocabJlpt, setNewVocabJlpt] = useState('N5');
  const [newVocabSentence, setNewVocabSentence] = useState('');

  // Manual Grammar Form State
  const [newGrammarPoint, setNewGrammarPoint] = useState('');
  const [newGrammarPattern, setNewGrammarPattern] = useState('');
  const [newGrammarExplanation, setNewGrammarExplanation] = useState('');
  const [newGrammarExample, setNewGrammarExample] = useState('');
  const [newGrammarMeaning, setNewGrammarMeaning] = useState('');

  // Filter & Search
  const [vocabSearch, setVocabSearch] = useState('');
  const [grammarSearch, setGrammarSearch] = useState('');
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<string, number>>({});

  // Current Selected Book
  const currentBook = books.find((b) => b.id === selectedBookId) || books[0];

  // Save books to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kumago_nihongo_hon_books', JSON.stringify(books));
    } catch (e) {
      console.error('Failed to save books to storage:', e);
    }
  }, [books]);

  // Scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle Book Narration
  const handleToggleNarration = () => {
    if (isNarrating) {
      tts.stop();
      setIsNarrating(false);
    } else {
      setIsNarrating(true);
      const textToSpeak = currentBook.paragraphs.map((p) => p.ja).join(' ');
      tts.speakJapanese(textToSpeak, {
        rate: 0.82,
        onEnd: () => setIsNarrating(false),
      });
    }
  };

  const handlePlayWord = (word: BookVocabItem) => {
    setPlayingItemId(word.id);
    tts.speakJapanese(word.hiragana || word.kanji, {
      rate: 0.85,
      onEnd: () => setPlayingItemId(null),
    });
  };

  const handlePlaySentence = (sentence: string, id: string) => {
    setPlayingItemId(id);
    tts.speakJapanese(sentence, {
      rate: 0.85,
      onEnd: () => setPlayingItemId(null),
    });
  };

  // Save Book Vocab to App Saved Words
  const handleSaveBookVocab = (vocab: BookVocabItem) => {
    const wordBlock: JapaneseWordBlock = {
      romaji: vocab.romaji,
      hiragana: vocab.hiragana,
      katakana: vocab.katakana || vocab.hiragana,
      kanji: vocab.kanji,
      meaning: vocab.meaning,
      jlpt: vocab.jlpt,
      raw: `【Romaji】 ${vocab.romaji}\n【Hiragana】 ${vocab.hiragana}\n【Katakana】 ${vocab.katakana}\n【Kanji】 ${vocab.kanji}\n【Meaning】 ${vocab.meaning}\n【JLPT】 ${vocab.jlpt}`
    };
    onSaveWord(wordBlock);
    sfx.playCorrect();
    onAwardXP(5);
  };

  // Add all extracted words to saved words
  const handleSaveAllVocab = () => {
    currentBook.vocabulary.forEach((v) => {
      const exists = savedWords.some((sw) => sw.romaji.toLowerCase() === v.romaji.toLowerCase());
      if (!exists) {
        const wordBlock: JapaneseWordBlock = {
          romaji: v.romaji,
          hiragana: v.hiragana,
          katakana: v.katakana || v.hiragana,
          kanji: v.kanji,
          meaning: v.meaning,
          jlpt: v.jlpt,
          raw: `【Romaji】 ${v.romaji}\n【Hiragana】 ${v.hiragana}\n【Katakana】 ${v.katakana}\n【Kanji】 ${v.kanji}\n【Meaning】 ${v.meaning}\n【JLPT】 ${v.jlpt}`
        };
        onSaveWord(wordBlock);
      }
    });
    sfx.playLevelUp();
    onAwardXP(25);
  };

  // Grounded Chat Send
  const handleSendChatMessage = async (msgToSend?: string) => {
    const text = (msgToSend || chatInput).trim();
    if (!text || isChatLoading) return;

    const newMessages = [...chatMessages, { role: 'user' as const, content: text }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/nihongo-hon/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          bookTitle: currentBook.titleJa || currentBook.title,
          bookText: currentBook.text,
          level: currentBook.level,
          history: newMessages.slice(-6),
        }),
      });

      if (!response.ok) throw new Error('Chat failed');

      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        { role: 'model', content: data.reply || 'Hai! Let me review this part with you!' },
      ]);

      if (data.reply?.includes('Sugoi') || data.reply?.includes('Correct!')) {
        sfx.playCorrect();
        onAwardXP(10);
      }
    } catch (e: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: 'Gomen nasai! I had trouble analyzing the text notes. Let me re-read this passage for you! 🙏',
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Upload & Analyze with Gemini
  const handleUploadAndAnalyze = async () => {
    if (!uploadText.trim()) {
      alert('Please provide some Japanese text or book excerpt to analyze.');
      return;
    }

    setIsAnalyzing(true);
    const title = uploadTitle.trim() || 'My Japanese Reading';
    const author = uploadAuthor.trim() || 'Custom Source';

    try {
      const response = await fetch('/api/nihongo-hon/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          author,
          text: uploadText,
          level: uploadLevel,
        }),
      });

      let analyzedData: any = null;
      if (response.ok) {
        const json = await response.json();
        analyzedData = json.analysis;
      }

      // Break text into paragraphs
      const rawParas = uploadText
        .split(/\n\s*\n|\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      const paragraphs = rawParas.map((para) => ({
        ja: para,
        ro: '',
        en: '',
      }));

      const newBook: NihongoBook = {
        id: `book-${Date.now()}`,
        title: title,
        titleJa: uploadTitleJa.trim() || title,
        author: author,
        authorJa: uploadAuthorJa.trim() || author,
        level: uploadLevel,
        genre: uploadGenre,
        coverGradient: 'from-sky-600 to-indigo-700',
        tag: 'User Uploaded',
        readTimeMinutes: Math.max(1, Math.round(uploadText.length / 180)),
        text: uploadText,
        paragraphs: paragraphs,
        vocabulary: Array.isArray(analyzedData?.vocabulary) && analyzedData.vocabulary.length > 0
          ? analyzedData.vocabulary
          : [
              {
                id: `v-init-1`,
                alphabet: 'H',
                romaji: 'hon',
                hiragana: 'ほん',
                katakana: 'ホン',
                kanji: '本',
                meaning: 'book',
                jlpt: 'N5',
                type: 'Noun',
                contextSentence: uploadText.slice(0, 50),
                contextSentenceMeaning: 'Sample context sentence',
              }
            ],
        grammar: Array.isArray(analyzedData?.grammar) && analyzedData.grammar.length > 0
          ? analyzedData.grammar
          : [
              {
                id: `g-init-1`,
                point: 'は (wa) — Topic Marker',
                pattern: '[Noun] は',
                explanation: 'Marks the main topic of the sentence.',
                exampleInBook: uploadText.slice(0, 60),
                exampleMeaning: 'Example from uploaded source',
                particleFocus: 'は',
              }
            ],
        studyGuide: {
          summary: analyzedData?.summary || 'User uploaded reading material analyzed with Google NotebookLM AI.',
          summaryJa: analyzedData?.summaryJa || 'Google NotebookLMによって解析されたカスタム教材です。',
          podcastBriefing: analyzedData?.studyGuide?.podcastBriefing || `[MIYU Sensei Audio Overview]\n"Sugoi! You uploaded a new book! I have analyzed its core vocabulary and grammar patterns so we can study it together. Let's begin!"`,
          keyThemes: analyzedData?.studyGuide?.keyThemes || ['Custom Study Material', 'Language Immersion', 'Vocabulary Expansion'],
          culturalNotes: analyzedData?.studyGuide?.culturalNotes || 'Reading diverse native materials sharpens practical fluency.',
        },
        quizQuestions: Array.isArray(analyzedData?.quizQuestions) && analyzedData.quizQuestions.length > 0
          ? analyzedData.quizQuestions
          : [
              {
                id: `q-init-1`,
                question: 'What is the main topic of this excerpt?',
                questionJa: 'この文章の主題は何ですか？',
                options: [title, 'Grammar drill', 'Vocabulary test', 'Daily news'],
                correctIndex: 0,
                explanation: `This passage comes from the uploaded work: ${title}.`,
              }
            ],
        isCustom: true,
      };

      setBooks((prev) => [newBook, ...prev]);
      setSelectedBookId(newBook.id);
      setShowUploadModal(false);
      sfx.playLevelUp();
      onAwardXP(50);

      // Reset form
      setUploadTitle('');
      setUploadTitleJa('');
      setUploadAuthor('');
      setUploadAuthorJa('');
      setUploadText('');
    } catch (err: any) {
      console.error(err);
      alert('Analysis failed, but text was saved.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // File Upload Helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!uploadTitle) {
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setUploadText(content);
      }
    };
    reader.readAsText(file);
  };

  // Add Manual Vocab Item to Current Book
  const handleAddManualVocab = () => {
    if (!newVocabHiragana.trim() && !newVocabKanji.trim()) return;

    const alphabetChar = (newVocabRomaji.charAt(0) || 'A').toUpperCase();
    const newItem: BookVocabItem = {
      id: `custom-v-${Date.now()}`,
      alphabet: alphabetChar,
      romaji: newVocabRomaji.trim() || 'custom',
      hiragana: newVocabHiragana.trim(),
      katakana: newVocabKatakana.trim() || newVocabHiragana.trim(),
      kanji: newVocabKanji.trim() || '—',
      meaning: newVocabMeaning.trim() || 'definition',
      jlpt: newVocabJlpt,
      type: 'Vocabulary',
      contextSentence: newVocabSentence.trim() || undefined,
    };

    setBooks((prev) =>
      prev.map((b) =>
        b.id === currentBook.id
          ? { ...b, vocabulary: [newItem, ...b.vocabulary] }
          : b
      )
    );

    // Also save to app words
    handleSaveBookVocab(newItem);

    // Reset
    setNewVocabKanji('');
    setNewVocabHiragana('');
    setNewVocabKatakana('');
    setNewVocabRomaji('');
    setNewVocabMeaning('');
    setNewVocabSentence('');
    setShowAddVocabModal(false);
    sfx.playCorrect();
    onAwardXP(15);
  };

  // Add Manual Grammar Item to Current Book
  const handleAddManualGrammar = () => {
    if (!newGrammarPoint.trim()) return;

    const newItem: BookGrammarItem = {
      id: `custom-g-${Date.now()}`,
      point: newGrammarPoint.trim(),
      pattern: newGrammarPattern.trim() || '[Pattern]',
      explanation: newGrammarExplanation.trim() || 'Grammar explanation',
      exampleInBook: newGrammarExample.trim() || 'Example sentence',
      exampleMeaning: newGrammarMeaning.trim() || 'Example meaning',
      particleFocus: newGrammarPoint.slice(0, 4),
    };

    setBooks((prev) =>
      prev.map((b) =>
        b.id === currentBook.id
          ? { ...b, grammar: [newItem, ...b.grammar] }
          : b
      )
    );

    setNewGrammarPoint('');
    setNewGrammarPattern('');
    setNewGrammarExplanation('');
    setNewGrammarExample('');
    setNewGrammarMeaning('');
    setShowAddGrammarModal(false);
    sfx.playCorrect();
    onAwardXP(20);
  };

  // Delete Custom Book
  const handleDeleteBook = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this book from your library?')) {
      const remaining = books.filter((b) => b.id !== id);
      setBooks(remaining.length > 0 ? remaining : DEFAULT_NIHONGO_BOOKS);
      if (selectedBookId === id) {
        setSelectedBookId(remaining[0]?.id || 'momotaro');
      }
    }
  };

  // Filtered Vocab
  const filteredVocab = currentBook.vocabulary.filter((v) => {
    if (!vocabSearch) return true;
    const q = vocabSearch.toLowerCase();
    return (
      v.kanji.toLowerCase().includes(q) ||
      v.hiragana.toLowerCase().includes(q) ||
      v.romaji.toLowerCase().includes(q) ||
      v.meaning.toLowerCase().includes(q)
    );
  });

  // Filtered Grammar
  const filteredGrammar = currentBook.grammar.filter((g) => {
    if (!grammarSearch) return true;
    const q = grammarSearch.toLowerCase();
    return (
      g.point.toLowerCase().includes(q) ||
      g.pattern.toLowerCase().includes(q) ||
      g.explanation.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner: Google NotebookLM × Nihongo Hon */}
      <div className="bg-gradient-to-r from-[#0F1E36] via-[#1E293B] to-[#1E3A8A] rounded-2xl p-5 sm:p-7 text-white shadow-lg border border-sky-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-15 pointer-events-none w-96 flex items-center justify-end pr-6">
          <img src={miyuKnowledgeImg} alt="Miyu Knowledge" className="h-full object-cover rounded-2xl" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-200 border border-sky-400/30 flex items-center gap-1.5 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              Google NotebookLM Integration
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-200 border border-amber-300/30">
              図書館 (Toshokan) • Japanese Library
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
              Tadoku 多読 • Extensive Reading
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2 flex items-center gap-2">
            <span>図書館 (Toshokan)</span>
            <span className="text-sky-300 font-light text-lg hidden sm:inline">— Japanese Library & Notebook</span>
          </h1>

          <p className="text-sky-100/90 text-sm sm:text-base leading-relaxed mb-4">
            Upload your Japanese books, stories, articles, or notes. With Google NotebookLM intelligence, MIYU Sensei extracts rich vocabulary decks, explains particles & grammar rules, provides audio podcast briefings, and offers grounded conversational tutoring!
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-md shadow-sky-600/30 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Book / Add Text (本を追加)</span>
            </button>

            {onOpenSearchModal && (
              <button
                onClick={onOpenSearchModal}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-sm shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer transition-all active:scale-95 border border-indigo-400/40"
                title="Search live web topics with Google Search & gemini-3.5-flash"
              >
                <Globe className="w-4 h-4 text-cyan-200" />
                <span>Live Web Explorer (Google Search)</span>
              </button>
            )}

            <button
              onClick={handleSaveAllVocab}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 flex items-center gap-1.5 cursor-pointer transition-colors backdrop-blur-xs"
              title="Add all extracted vocabulary to your study notebook"
            >
              <BookmarkPlus className="w-4 h-4 text-amber-300" />
              <span>Add All Vocab to My Deck (+25 XP)</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset library to default curated Japanese books?')) {
                  setBooks(DEFAULT_NIHONGO_BOOKS);
                  setSelectedBookId('momotaro');
                }
              }}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Library</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Bookshelf / Sources (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <BookOpen className="w-4 h-4 text-sky-600" />
                <span>本棚 Bookshelf ({books.length})</span>
              </div>
              <div className="flex items-center gap-1">
                {onOpenSearchModal && (
                  <button
                    onClick={onOpenSearchModal}
                    className="p-1 rounded-lg hover:bg-blue-50 text-blue-600 cursor-pointer transition-colors"
                    title="Search Live Web for Japanese Stories"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="p-1 rounded-lg hover:bg-sky-50 text-sky-600 cursor-pointer transition-colors"
                  title="Upload New Book"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {books.map((b) => {
                const isSelected = b.id === currentBook.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => {
                      setSelectedBookId(b.id);
                      if (isNarrating) {
                        tts.stop();
                        setIsNarrating(false);
                      }
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative group ${
                      isSelected
                        ? 'bg-sky-50/90 border-sky-400 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs">
                        {b.level}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {b.readTimeMinutes} min read
                      </span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight mb-0.5 line-clamp-1">
                      {b.titleJa}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mb-2 font-medium">
                      {b.title}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-600">
                      <span className="line-clamp-1">{b.authorJa || b.author}</span>
                      <span className="text-sky-600 font-semibold">{b.vocabulary.length} words</span>
                    </div>

                    {b.isCustom && (
                      <button
                        onClick={(e) => handleDeleteBook(b.id, e)}
                        className="absolute right-2 top-2 p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete custom book"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Upload Box */}
            <div
              onClick={() => setShowUploadModal(true)}
              className="mt-4 p-3 rounded-xl border-2 border-dashed border-sky-300/80 hover:border-sky-500 bg-sky-50/40 hover:bg-sky-50/80 transition-all text-center cursor-pointer"
            >
              <Upload className="w-5 h-5 text-sky-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-sky-900">Upload or Paste Japanese Book</p>
              <p className="text-[10px] text-slate-500">Supports .txt, .md, articles, or chapters</p>
            </div>
          </div>
        </div>

        {/* Center Column: NotebookLM Workspace (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Book Header Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#15254A] text-white">
                    {currentBook.level}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {currentBook.genre}
                  </span>
                  {currentBook.isCustom && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">
                      Custom Upload
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentBook.titleJa}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {currentBook.title} &bull; {currentBook.authorJa} ({currentBook.author})
                </p>
              </div>

              {/* Narration Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleNarration}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all ${
                    isNarrating
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-sky-600 hover:bg-sky-700 text-white'
                  }`}
                >
                  {isNarrating ? <Pause className="w-3.5 h-3.5" /> : <Headphones className="w-3.5 h-3.5" />}
                  <span>{isNarrating ? 'Stop Audio' : 'Listen to Story'}</span>
                </button>
              </div>
            </div>

            {/* Studio Workspace Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-100 pt-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('reader')}
                className={`px-3 py-2 font-bold text-xs border-b-2 whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'reader'
                    ? 'border-sky-600 text-sky-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                📖 Reading Text
              </button>
              <button
                onClick={() => setActiveTab('vocab')}
                className={`px-3 py-2 font-bold text-xs border-b-2 whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'vocab'
                    ? 'border-sky-600 text-sky-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                🗂️ Vocab List ({currentBook.vocabulary.length})
              </button>
              <button
                onClick={() => setActiveTab('grammar')}
                className={`px-3 py-2 font-bold text-xs border-b-2 whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'grammar'
                    ? 'border-sky-600 text-sky-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                📐 Grammar & Particles ({currentBook.grammar.length})
              </button>
              <button
                onClick={() => setActiveTab('study_guide')}
                className={`px-3 py-2 font-bold text-xs border-b-2 whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'study_guide'
                    ? 'border-sky-600 text-sky-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                🎙️ Audio Overview & Guide
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-2 font-bold text-xs border-b-2 whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'quiz'
                    ? 'border-sky-600 text-sky-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                🎯 Book Quiz ({currentBook.quizQuestions?.length || 0})
              </button>
            </div>
          </div>

          {/* TAB 1: Reader View */}
          {activeTab === 'reader' && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              {/* Reading Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-500">Display:</span>
                  <button
                    onClick={() => setShowRomaji(!showRomaji)}
                    className={`px-2 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                      showRomaji ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    Romaji
                  </button>
                  <button
                    onClick={() => setShowEnglish(!showEnglish)}
                    className={`px-2 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                      showEnglish ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    English Translation
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-500">Text Size:</span>
                  {(['md', 'lg', 'xl'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setFontSize(s)}
                      className={`px-2 py-0.5 rounded text-xs font-bold cursor-pointer ${
                        fontSize === s ? 'bg-[#15254A] text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Story Paragraphs */}
              <div className="space-y-4">
                {currentBook.paragraphs.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-sky-50/30 transition-colors group relative"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold text-slate-400">
                        § {idx + 1}
                      </span>
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        <button
                          onClick={() => handlePlaySentence(p.ja, `p-${idx}`)}
                          className="p-1 rounded-md hover:bg-white text-sky-600 cursor-pointer"
                          title="Listen to this paragraph"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            handleSendChatMessage(`Please break down and explain the Japanese grammar, particles, and vocabulary in this sentence:\n"${p.ja}"`);
                          }}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-bold text-sky-700 hover:bg-sky-50 flex items-center gap-1 cursor-pointer"
                          title="Ask Miyu Sensei to explain this sentence"
                        >
                          <Sparkles className="w-3 h-3 text-sky-500" />
                          <span>Ask Sensei</span>
                        </button>
                      </div>
                    </div>

                    {/* Japanese Text */}
                    <p
                      className={`font-medium text-slate-900 leading-relaxed ${
                        fontSize === 'xl'
                          ? 'text-lg sm:text-xl'
                          : fontSize === 'lg'
                          ? 'text-base sm:text-lg'
                          : 'text-sm sm:text-base'
                      }`}
                    >
                      {p.ja}
                    </p>

                    {/* Romaji */}
                    {showRomaji && p.ro && (
                      <p className="text-xs text-sky-700/90 font-medium italic mt-1.5">
                        {p.ro}
                      </p>
                    )}

                    {/* English */}
                    {showEnglish && p.en && (
                      <p className="text-xs text-slate-600 mt-1 font-normal border-t border-slate-200/50 pt-1.5">
                        {p.en}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Vocabulary Extractor */}
          {activeTab === 'vocab' && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Extracted Vocabulary Deck ({currentBook.vocabulary.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sourced directly from this text with Romaji, Kana, Kanji & definitions
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddVocabModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Word to Book</span>
                  </button>
                  <button
                    onClick={handleSaveAllVocab}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>Save All to Notebook</span>
                  </button>
                </div>
              </div>

              {/* Search filter */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter vocabulary by kanji, romaji, or meaning..."
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-sky-500"
                />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
                {filteredVocab.map((item) => {
                  const isSaved = savedWords.some(
                    (w) => w.romaji.toLowerCase() === item.romaji.toLowerCase()
                  );
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-sky-300 transition-all shadow-2xs space-y-2"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                          {item.jlpt || 'N5'}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handlePlayWord(item)}
                            className="p-1 rounded-md hover:bg-sky-100 text-sky-600 cursor-pointer"
                            title="Pronounce with native Japanese audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleSaveBookVocab(item)}
                            className={`p-1 rounded-md text-xs cursor-pointer ${
                              isSaved
                                ? 'text-amber-600 bg-amber-50'
                                : 'text-slate-400 hover:text-amber-600 hover:bg-slate-100'
                            }`}
                            title={isSaved ? 'Saved in Vocab Notebook' : 'Add to Vocab Notebook'}
                          >
                            <BookmarkPlus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-slate-900">
                            {item.kanji && item.kanji !== '—' ? item.kanji : item.hiragana}
                          </span>
                          <span className="text-xs text-sky-700 font-bold">
                            {item.hiragana}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {item.romaji} &bull; {item.katakana}
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-slate-800 bg-white px-2 py-1 rounded-md border border-slate-100">
                        {item.meaning}
                      </div>

                      {item.contextSentence && (
                        <div className="text-[11px] text-slate-600 border-l-2 border-sky-400 pl-2 py-0.5 bg-sky-50/50 rounded-r-md">
                          <p className="font-medium text-slate-800">{item.contextSentence}</p>
                          {item.contextSentenceMeaning && (
                            <p className="text-[10px] text-slate-500">{item.contextSentenceMeaning}</p>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => {
                          handleSendChatMessage(
                            `MIYU Sensei, please teach me the word "${item.kanji && item.kanji !== '—' ? item.kanji : item.hiragana}" (${item.meaning}) from this book with the 6-line breakdown and quiz!`
                          );
                        }}
                        className="w-full mt-1 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Teach with MIYU</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Grammar Analysis */}
          {activeTab === 'grammar' && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Book Grammar & Particle Analysis ({currentBook.grammar.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Key sentence patterns, particles (は, が, を, に, で, へ, と), and existence verbs (あります / います)
                  </p>
                </div>

                <button
                  onClick={() => setShowAddGrammarModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Grammar Note</span>
                </button>
              </div>

              {/* Grammar Items */}
              <div className="space-y-3">
                {filteredGrammar.map((g) => (
                  <div
                    key={g.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-sky-300 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {g.particleFocus && (
                          <span className="px-2 py-0.5 rounded-md text-xs font-black bg-sky-100 text-sky-900 border border-sky-200">
                            {g.particleFocus}
                          </span>
                        )}
                        <h4 className="font-bold text-sm text-slate-900">
                          {g.point}
                        </h4>
                      </div>
                      <button
                        onClick={() => {
                          handleSendChatMessage(
                            `MIYU Sensei, please explain the grammar pattern "${g.point}" (${g.pattern}) with more examples and practice exercises from this book!`
                          );
                        }}
                        className="px-2 py-1 rounded-md bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-sky-500" />
                        <span>Practice in Chat</span>
                      </button>
                    </div>

                    <div className="p-2 rounded-lg bg-sky-50/50 border border-sky-100 font-mono text-xs text-sky-900 font-semibold">
                      Pattern: {g.pattern}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {g.explanation}
                    </p>

                    <div className="p-2.5 rounded-lg bg-white border border-slate-200/90 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Occurrence in Text:
                        </span>
                        <button
                          onClick={() => handlePlaySentence(g.exampleInBook, g.id)}
                          className="p-0.5 text-sky-600 hover:text-sky-800 cursor-pointer"
                          title="Pronounce sentence"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-bold text-slate-900">{g.exampleInBook}</p>
                      <p className="text-slate-500 italic text-[11px]">{g.exampleMeaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Study Guide & Audio Podcast Overview */}
          {activeTab === 'study_guide' && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-5">
              {/* NotebookLM Iconic Audio Briefing Box */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-violet-50 via-sky-50 to-indigo-50 border border-indigo-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h4 className="font-black text-sm text-indigo-950">
                        NotebookLM Audio Overview Script
                      </h4>
                      <p className="text-[11px] text-indigo-700">
                        Miyu Sensei’s deep-dive study briefing on this reading material
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      tts.speakJapanese(currentBook.studyGuide.podcastBriefing, {
                        rate: 0.88,
                      });
                      sfx.playCorrect();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-indigo-600/20 cursor-pointer transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Play Audio Briefing</span>
                  </button>
                </div>

                <div className="p-3 bg-white/80 rounded-xl border border-indigo-100 text-xs text-slate-800 leading-relaxed font-mono whitespace-pre-line">
                  {currentBook.studyGuide.podcastBriefing}
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <BookCheck className="w-4 h-4 text-emerald-600" />
                  <span>Pedagogical Summary</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {currentBook.studyGuide.summary}
                </p>
                {currentBook.studyGuide.summaryJa && (
                  <p className="text-xs text-slate-600 leading-relaxed bg-sky-50/40 p-3 rounded-xl border border-sky-100 font-medium">
                    {currentBook.studyGuide.summaryJa}
                  </p>
                )}
              </div>

              {/* Key Themes */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  <span>Key Literary & Grammatical Themes</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentBook.studyGuide.keyThemes.map((th, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
                    >
                      {th}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Context */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Cultural & Linguistic Note</span>
                </div>
                <p className="text-xs text-amber-950/80 leading-relaxed">
                  {currentBook.studyGuide.culturalNotes}
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: Book Comprehension Quiz */}
          {activeTab === 'quiz' && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">
                  Interactive Book Comprehension Drills
                </h3>
                <p className="text-xs text-slate-500">
                  Test your understanding of the story, kanji, and grammar patterns!
                </p>
              </div>

              <div className="space-y-4">
                {currentBook.quizQuestions?.map((q, qIndex) => {
                  const selectedOpt = userQuizAnswers[q.id];
                  const hasAnswered = selectedOpt !== undefined;
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                            Question {qIndex + 1}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 mt-1">
                            {q.question}
                          </h4>
                          <p className="text-xs text-sky-800 font-semibold">{q.questionJa}</p>
                        </div>

                        {hasAnswered && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? 'Correct! +10 XP' : 'Incorrect'}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIndex) => {
                          const isOptionSelected = selectedOpt === optIndex;
                          let btnStyle =
                            'bg-white border-slate-200 hover:border-sky-300 text-slate-800';

                          if (hasAnswered) {
                            if (optIndex === q.correctIndex) {
                              btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-50 border-rose-300 text-rose-800 line-through';
                            } else {
                              btnStyle = 'bg-white border-slate-200 opacity-60 text-slate-500';
                            }
                          }

                          return (
                            <button
                              key={optIndex}
                              disabled={hasAnswered}
                              onClick={() => {
                                setUserQuizAnswers((prev) => ({ ...prev, [q.id]: optIndex }));
                                if (optIndex === q.correctIndex) {
                                  sfx.playCorrect();
                                  onAwardXP(10);
                                }
                              }}
                              className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${btnStyle}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-slate-100 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                                  {['A', 'B', 'C', 'D'][optIndex]}
                                </span>
                                <span>{opt}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-100 text-xs text-sky-950 font-medium">
                          💡 <span className="font-bold">Explanation:</span> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: MIYU Sensei Grounded Chat (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[680px] overflow-hidden">
            {/* Chat Header */}
            <div className="p-3.5 bg-gradient-to-r from-sky-50 to-indigo-50 border-b border-sky-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={miyuKnowledgeImg}
                  alt="Miyu Sensei"
                  className="w-9 h-9 rounded-full object-cover border-2 border-sky-400 shadow-xs"
                />
                <div>
                  <h4 className="font-black text-xs text-slate-900">
                    MIYU Sensei Q&A
                  </h4>
                  <p className="text-[10px] text-sky-700 font-semibold line-clamp-1">
                    Grounded in: {currentBook.titleJa}
                  </p>
                </div>
              </div>

              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Ready to assist" />
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-1">
              <button
                onClick={() =>
                  handleSendChatMessage(
                    `Please explain the particles (は, が, を, に, で) used in this story: "${currentBook.titleJa}"`
                  )
                }
                className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700 cursor-pointer"
              >
                Particles breakdown
              </button>
              <button
                onClick={() =>
                  handleSendChatMessage(
                    `What are the existence verbs (あります vs います) appearing in this book?`
                  )
                }
                className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700 cursor-pointer"
              >
                あります vs います
              </button>
              <button
                onClick={() =>
                  handleSendChatMessage(
                    `Quiz me on 3 vocabulary words from "${currentBook.titleJa}"!`
                  )
                }
                className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700 cursor-pointer"
              >
                Quiz me on this
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((m, idx) => {
                const isModel = m.role === 'model';
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isModel ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[90%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        isModel
                          ? 'bg-slate-100 text-slate-800 rounded-tl-xs'
                          : 'bg-[#15254A] text-white rounded-tr-xs'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}

              {isChatLoading && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium italic p-2">
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-sky-500" />
                  <span>MIYU Sensei is reading the book notes...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage();
              }}
              className="p-2 border-t border-slate-100 bg-white flex items-center gap-1.5"
            >
              <input
                type="text"
                placeholder="Ask about this book's grammar or words..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-sky-500"
              />
              <button
                type="submit"
                disabled={isChatLoading || !chatInput.trim()}
                className="p-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MODAL 1: Upload Book / Text (NotebookLM Analyzer) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-sky-600" />
                  <span>Upload Book to Library (図書館 - Toshokan)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Google NotebookLM will extract vocabulary cards, grammar rules, and audio briefings
                </p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* File Drop Area */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50/50 text-center space-y-2">
              <FileText className="w-8 h-8 text-sky-600 mx-auto" />
              <div>
                <label className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold cursor-pointer inline-block shadow-xs">
                  Choose File (.txt, .md, .json)
                  <input
                    type="file"
                    accept=".txt,.md,.json,.text"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-[11px] text-slate-500">
                Or paste Japanese text, novel chapters, or lyrics into the box below
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Book Title (English) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. My Favorite Short Story"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Book Title (Japanese)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 私の好きな短編小説"
                  value={uploadTitleJa}
                  onChange={(e) => setUploadTitleJa(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Author
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kenji Miyazawa / Unknown"
                  value={uploadAuthor}
                  onChange={(e) => setUploadAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Target JLPT Level
                </label>
                <select
                  value={uploadLevel}
                  onChange={(e) => setUploadLevel(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-sky-500"
                >
                  <option value="N5">N5 (Beginner)</option>
                  <option value="N4">N4 (Elementary)</option>
                  <option value="N3">N3 (Intermediate)</option>
                  <option value="N2">N2 (Upper Intermediate)</option>
                  <option value="N1">N1 (Advanced)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Japanese Full Text to Read & Analyze *
              </label>
              <textarea
                rows={7}
                placeholder="Paste Japanese text, article, dialogue, or story here..."
                value={uploadText}
                onChange={(e) => setUploadText(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-sky-500 font-mono leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Character count: {uploadText.length} characters
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isAnalyzing || !uploadText.trim()}
                onClick={handleUploadAndAnalyze}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-sky-600/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing with Gemini & NotebookLM...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-sky-200" />
                    <span>Analyze & Add to Library (+50 XP)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Custom Vocabulary Item to Selected Book */}
      {showAddVocabModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-sky-600" />
                <span>Add Vocabulary to "{currentBook.titleJa}"</span>
              </h3>
              <button
                onClick={() => setShowAddVocabModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Kanji Form
                </label>
                <input
                  type="text"
                  placeholder="e.g. 友達"
                  value={newVocabKanji}
                  onChange={(e) => setNewVocabKanji(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Hiragana Reading *
                </label>
                <input
                  type="text"
                  placeholder="e.g. ともだち"
                  value={newVocabHiragana}
                  onChange={(e) => setNewVocabHiragana(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Katakana Reading
                </label>
                <input
                  type="text"
                  placeholder="e.g. トモダチ"
                  value={newVocabKatakana}
                  onChange={(e) => setNewVocabKatakana(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Romaji *
                </label>
                <input
                  type="text"
                  placeholder="e.g. tomodachi"
                  value={newVocabRomaji}
                  onChange={(e) => setNewVocabRomaji(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  English Meaning *
                </label>
                <input
                  type="text"
                  placeholder="e.g. friend / companion"
                  value={newVocabMeaning}
                  onChange={(e) => setNewVocabMeaning(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Context Sentence from Book
                </label>
                <input
                  type="text"
                  placeholder="e.g. 友達と公園で遊びました。"
                  value={newVocabSentence}
                  onChange={(e) => setNewVocabSentence(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddVocabModal(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-500 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddManualVocab}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs cursor-pointer"
              >
                Add Word (+15 XP)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Add Custom Grammar Item to Selected Book */}
      {showAddGrammarModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-sky-600" />
                <span>Add Grammar Point to "{currentBook.titleJa}"</span>
              </h3>
              <button
                onClick={() => setShowAddGrammarModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Grammar Rule / Particle *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 〜てみる (te miru) — Trying something out"
                  value={newGrammarPoint}
                  onChange={(e) => setNewGrammarPoint(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Pattern Formula
                </label>
                <input
                  type="text"
                  placeholder="e.g. [Verb Te-form] + みる / みます"
                  value={newGrammarPattern}
                  onChange={(e) => setNewGrammarPattern(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Explanation *
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Used when attempting an action to see what the outcome or sensation is like."
                  value={newGrammarExplanation}
                  onChange={(e) => setNewGrammarExplanation(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Example in this Book
                </label>
                <input
                  type="text"
                  placeholder="e.g. 入ってみよう！"
                  value={newGrammarExample}
                  onChange={(e) => setNewGrammarExample(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                  Example English Meaning
                </label>
                <input
                  type="text"
                  placeholder="e.g. Let's enter and see!"
                  value={newGrammarMeaning}
                  onChange={(e) => setNewGrammarMeaning(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddGrammarModal(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-500 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddManualGrammar}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs cursor-pointer"
              >
                Add Grammar (+20 XP)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
