import React, { useState } from 'react';
import { Volume2, Sparkles, BookCheck, Lightbulb, CheckCircle2, AlertTriangle, ArrowRight, Layers, HelpCircle, Image as ImageIcon, BookOpen, GitBranch, Compass, Star } from 'lucide-react';
import { tts } from '../utils/audio';
import arimasuChartImg from '../assets/images/arimasu_imasu_chart_1790613288657.jpg';
import {
  ADDITIONAL_PARTICLES,
  TE_FORM_CHAPTER,
  ADJECTIVES_CHAPTER,
  ESSENTIAL_PATTERNS_CHAPTER,
  CONDITIONALS_CHAPTER,
  GrammarChapterItem,
} from '../data/grammarChapters';

interface ExampleSentence {
  ja: string;
  ro: string;
  en: string;
  note?: string;
}

interface ParticleDetail {
  particle: string;
  romaji: string;
  title: string;
  coreRule: string;
  contrastRule: string;
  commonMistake: string;
  examples: ExampleSentence[];
  senseiTip: string;
}

const PARTICLES_DETAILED: ParticleDetail[] = [
  {
    particle: 'は',
    romaji: 'wa',
    title: 'Topic Marker (主題を表す「は」)',
    coreRule: 'Defines the main topic or context of the conversation ("As for X..."). Tells the listener what is being talked about.',
    contrastRule: 'は (wa) vs が (ga): 「は」 emphasizes what comes AFTER the particle (the comment/predicate); 「が」 emphasizes what comes BEFORE (identifying who/what specifically). Written with the hiragana character は (ha) but pronounced "wa".',
    commonMistake: 'Using は inside subordinate relative clauses where が is required (e.g. わたしが買った本, not わたしは買った本).',
    senseiTip: 'Think of は as a spotlight: "Speaking of [Topic], let me tell you about it!"',
    examples: [
      {
        ja: 'わたしは みゆせんせいです。',
        ro: 'Watashi wa Miyu sensei desu.',
        en: 'I am Miyu Sensei (Speaking of me, I am Miyu Sensei).',
        note: 'Classic self-introduction setting the topic to "I".'
      },
      {
        ja: 'きょうは とても いいてんきですね。',
        ro: 'Kyou wa totemo ii tenki desu ne.',
        en: 'As for today, the weather is very nice, isn’t it?',
        note: 'Topic is "today".'
      },
      {
        ja: 'にほんごは たのしいですが、かんじは むずかしいです。',
        ro: 'Nihongo wa tanoshii desu ga, kanji wa muzukashii desu.',
        en: 'Japanese is fun, but (in contrast) kanji is difficult.',
        note: 'Contrastive は: Compares Japanese with Kanji.'
      },
      {
        ja: 'このりんごは あまくて おいしいです。',
        ro: 'Kono ringo wa amakute oishii desu.',
        en: 'As for this apple, it is sweet and delicious.',
        note: 'Focus is on the description "sweet and delicious".'
      }
    ]
  },
  {
    particle: 'が',
    romaji: 'ga',
    title: 'Subject Marker & Identifier (主語・識別を表す「が」)',
    coreRule: 'Marks the grammatical subject doing the action, introduces brand new information into the dialogue, and marks objects of desire, ability, or existence (いる/ある, すき, わかる, ほしい).',
    contrastRule: '「だれが来ましたか？」(Who came?) → 「田中さんが来ました。」(Tanaka-san came - が emphasizes WHO). Also used when a phenomenon is perceived directly: 「あ、雨が降ってきた！」(Look, rain started falling!).',
    commonMistake: 'Using を instead of が with 好き (suki) or わかる (wakaru). In Japanese, you say 「猫が好きです」(I like cats), not 「猫を好き」.',
    senseiTip: 'When you are identifying the specific answer to "who/which", ALWAYS choose が!',
    examples: [
      {
        ja: 'ねこが 部屋に います。',
        ro: 'Neko ga heya ni imasu.',
        en: 'There is a cat in the room.',
        note: 'Subject of animate existence with います.'
      },
      {
        ja: 'わたしは にほんごが わかります。',
        ro: 'Watashi wa nihongo ga wakarimasu.',
        en: 'I understand Japanese (Japanese is understandable to me).',
        note: 'Object of ability takes が.'
      },
      {
        ja: 'だれが ケーキを たべましたか？',
        ro: 'Dare ga keeki o tabemashita ka?',
        en: 'Who ate the cake?',
        note: 'Question words (who, what, which) always take が when as subject.'
      },
      {
        ja: 'あそこに あたらしい くるまが あります。',
        ro: 'Asoko ni atarashii kuruma ga arimasu.',
        en: 'There is a new car over there.',
        note: 'Inanimate existence with あります.'
      }
    ]
  },
  {
    particle: 'を',
    romaji: 'o',
    title: 'Direct Object Marker (目的語を表す「を」)',
    coreRule: 'Marks the direct object receiving the action of a transitive verb (what is eaten, read, bought, watched). Also marks space traversed or left behind (公園を歩く, 電車を降りる).',
    contrastRule: 'Written with the kana character を (wo) in typing, but pronounced purely as "o". Never start a word with を.',
    commonMistake: 'Using を with verbs that do not take a direct object, like 行く (iku) or 住む (sumu). Destination takes に or へ.',
    senseiTip: 'Ask the verb: "Verb WHAT?" → The answer gets tagged with を! (Eat what? → りんごを)',
    examples: [
      {
        ja: 'あさごはんを たべます。',
        ro: 'Asagohan o tabemasu.',
        en: 'I eat breakfast.',
        note: 'Transitive action on "breakfast".'
      },
      {
        ja: '毎日 としょかんで ほんを よみます。',
        ro: 'Mainichi toshokan de hon o yomimasu.',
        en: 'I read books in the library every day.',
        note: 'Direct object of reading is "hon" (book).'
      },
      {
        ja: '毎朝 こうえんを さんぽします。',
        ro: 'Maiasa kouen o sanpo shimasu.',
        en: 'I take a walk through the park every morning.',
        note: 'Motion passing through a space takes を.'
      },
      {
        ja: 'えきで でんしゃを おりました。',
        ro: 'Eki de densha o orimashita.',
        en: 'I got off the train at the station.',
        note: 'Leaving/disembarking from a space takes を.'
      }
    ]
  },
  {
    particle: 'に',
    romaji: 'ni',
    title: 'Target, Time, Destination & Location of Existence (特定時・着点・存在「に」)',
    coreRule: 'Marks (1) Specific clock/calendar times, (2) Destination of motion, (3) Static location where something or someone exists (に います / に あります), and (4) Indirect object (give TO someone).',
    contrastRule: 'に (ni) vs で (de): 「に」 indicates where something IS statically located (猫は部屋にいる); 「で」 indicates where an action TAKES PLACE dynamically (部屋で勉強する).',
    commonMistake: 'Putting に after relative time words like 今日 (today), 明日 (tomorrow), 毎日 (every day). Do NOT say 「今日に」, just say 「今日」!',
    senseiTip: 'If the time has a specific number or day (7:00, Monday, April 5), use に! If it is relative (tomorrow, next week), NO に!',
    examples: [
      {
        ja: 'まいあさ ７じに おきます。',
        ro: 'Maiasa shichiji ni okimasu.',
        en: 'I wake up at 7:00 every morning.',
        note: 'Specific numerical point in time.'
      },
      {
        ja: 'らいしゅう とうきょうに いきます。',
        ro: 'Raishuu Toukyou ni ikimasu.',
        en: 'I will go to Tokyo next week.',
        note: 'Destination of movement.'
      },
      {
        ja: 'つくえの うえに ほんが あります。',
        ro: 'Tsukue no ue ni hon ga arimasu.',
        en: 'There is a book on top of the desk.',
        note: 'Static existence location of an inanimate object.'
      },
      {
        ja: 'ともだちに たんじょうびプレゼントを あげました。',
        ro: 'Tomodachi ni tanjoubi purezento o agemashita.',
        en: 'I gave a birthday present to my friend.',
        note: 'Indirect object recipient.'
      }
    ]
  },
  {
    particle: 'で',
    romaji: 'de',
    title: 'Action Location, Means & Tool (動作場所・手段・材料「で」)',
    coreRule: 'Marks (1) The physical venue where an event or activity occurs, (2) The instrument, transportation, or medium used to accomplish something, (3) Material from which something is made.',
    contrastRule: 'で marks HOW or WHERE you do things: 「電車で行く」(go BY train), 「日本語で話す」(speak IN Japanese), 「ハシで食べる」(eat WITH chopsticks).',
    commonMistake: 'Confusing に and で for places. Remember: If an active verb happens (play, study, eat, work), use で!',
    senseiTip: 'Think of で as the "Tool & Action Zone" marker!',
    examples: [
      {
        ja: 'レストランで おいしいラーメンを たべました。',
        ro: 'Resutoran de oishii raamen o tabemashita.',
        en: 'I ate delicious ramen at the restaurant.',
        note: 'Active venue where eating took place.'
      },
      {
        ja: 'バスで がっこうへ かよっています。',
        ro: 'Basu de gakkou e kayotte imasu.',
        en: 'I commute to school by bus.',
        note: 'Means of transportation.'
      },
      {
        ja: 'えんぴつで なまえを かいてください。',
        ro: 'Enpitsu de namae o kaite kudasai.',
        en: 'Please write your name with a pencil.',
        note: 'Instrument/tool used.'
      },
      {
        ja: 'これは きで つくられた テーブルです。',
        ro: 'Kore wa ki de tsukurareta teeburu desu.',
        en: 'This is a table made of wood.',
        note: 'Raw material.'
      }
    ]
  },
  {
    particle: 'へ',
    romaji: 'e',
    title: 'Direction Marker (方向を表す「へ」)',
    coreRule: 'Marks the directional orientation or vector of motion heading toward a goal ("Heading in the direction of..."). Emphasizes the journey and direction rather than the final arrival point.',
    contrastRule: 'Written with the kana character へ (he) but pronounced "e". While に emphasizes the arrival destination, へ emphasizes the direction of journey.',
    commonMistake: 'Do not use へ for time or indirect recipients (e.g. you cannot say 7時へ or 友達へあげます). Use に for those.',
    senseiTip: 'When writing welcome signs or letters: 「未来へ」(Towards the future) or 「日本へようこそ」(Welcome to Japan)!',
    examples: [
      {
        ja: 'らいねん にほんへ りゅうがくします。',
        ro: 'Rainen nihon e ryuugaku shimasu.',
        en: 'I will study abroad heading to Japan next year.',
        note: 'Direction towards Japan.'
      },
      {
        ja: 'えきの ほうへ あるきましょう。',
        ro: 'Eki no hou e arukimashou.',
        en: 'Let’s walk in the direction of the station.',
        note: 'Directional heading.'
      },
      {
        ja: 'みらいへ むかって まえに すすみます。',
        ro: 'Mirai e mukatte mae ni susumimasu.',
        en: 'We move forward toward the future.',
        note: 'Metaphorical direction.'
      }
    ]
  },
  {
    particle: 'と',
    romaji: 'to',
    title: 'Exhaustive "And", "Together With" & Quotation (並列・共同・引用「と」)',
    coreRule: 'Marks (1) Complete exhaustive lists of nouns ("A and B and C"), (2) Accomplice / companion ("Together with someone"), (3) Direct or indirect thought/quote particle (〜と思います, 〜と言いました).',
    contrastRule: 'と (to) lists ALL items exhaustively (A と B means only A and B). If you want an incomplete list ("A, B, and things like that"), use や (ya).',
    commonMistake: 'Using と to connect full sentences or verbs. In Japanese, と only connects nouns! To connect sentences, use そして (soshite) or 〜て form.',
    senseiTip: 'Whenever you quote your thoughts in Japanese, wrap it with と思います (to omoimasu)!',
    examples: [
      {
        ja: 'ともだちと いっしょに カフェで はなしました。',
        ro: 'Tomodachi to isshoni kafe de hanashimashita.',
        en: 'I talked at the cafe together with my friend.',
        note: 'Mutual companion.'
      },
      {
        ja: 'つくえの うえに ノートと ペンが あります。',
        ro: 'Tsukue no ue ni nooto to pen ga arimasu.',
        en: 'There is a notebook and a pen on the desk.',
        note: 'Exhaustive listing of exactly these two objects.'
      },
      {
        ja: 'にほんごは おもしろいと おもいます。',
        ro: 'Nihongo wa omoshiroi to omoimasu.',
        en: 'I think that Japanese is interesting.',
        note: 'Quotation marker for personal opinion.'
      },
      {
        ja: 'せんせいは「がんばって」と いいました。',
        ro: 'Sensei wa "ganbatte" to iimashita.',
        en: 'The teacher said, "Do your best!"',
        note: 'Direct speech quotation.'
      }
    ]
  },
  {
    particle: 'も',
    romaji: 'mo',
    title: 'Inclusion "Also / Too" & Complete Negation (並立・強調「も」)',
    coreRule: 'Replaces は, が, or を to mean "also" or "too". When combined with question words and negative verbs (だれも〜ない, なにも〜ない), it forms complete negation ("nobody", "nothing").',
    contrastRule: 'も completely overwrites は, が, and を! (Say 「わたしも」, never 「わたしはも」). But it stacks on top of に, で, and と (e.g. 「日本にも」, 「家でも」).',
    commonMistake: 'Trying to say はも or をも. Remember that も kicks は, が, and を out of the sentence!',
    senseiTip: 'Want to say "me too"? Just say 「わたしも！」 (Watashi mo!)',
    examples: [
      {
        ja: '田中さんは がくせいです。わたしも がくせいです。',
        ro: 'Tanaka-san wa gakusei desu. Watashi mo gakusei desu.',
        en: 'Tanaka-san is a student. I am also a student.',
        note: 'Replaces は to mean "also".'
      },
      {
        ja: 'りんごを たべました。みかんも たべました。',
        ro: 'Ringo o tabemashita. Mikan mo tabemashita.',
        en: 'I ate an apple. I also ate a mandarin orange.',
        note: 'Replaces を.'
      },
      {
        ja: 'きょうは なにも たべませんでした。',
        ro: 'Kyou wa nani mo tabemasen deshita.',
        en: 'I did not eat anything today.',
        note: 'Question word + も + negative = "nothing".'
      },
      {
        ja: 'へやには だれも いません。',
        ro: 'Heya ni wa dare mo imasen.',
        en: 'There is nobody in the room.',
        note: 'Dare + mo + imasen = "nobody".'
      }
    ]
  }
];

const ALL_PARTICLES: ParticleDetail[] = [...PARTICLES_DETAILED, ...ADDITIONAL_PARTICLES];

interface GrammarViewProps {
  onAskMiyu: (prompt: string) => void;
}

type GrammarTab = 'particles' | 'arimasu_imasu' | 'te_form' | 'adjectives' | 'essential_patterns' | 'conditionals';

export const GrammarView: React.FC<GrammarViewProps> = ({ onAskMiyu }) => {
  const [activeTab, setActiveTab] = useState<GrammarTab>('particles');
  const [activeParticle, setActiveParticle] = useState<ParticleDetail>(ALL_PARTICLES[0]);

  const playVoice = (text: string, en?: string, ro?: string) => {
    tts.speak(text, {
      rate: 0.85,
      pitch: 1.15,
      englishTranslation: en,
      romajiHint: ro,
    });
  };

  const navChapters: Array<{ id: GrammarTab; labelJa: string; labelEn: string; icon: React.ReactNode }> = [
    { id: 'particles', labelJa: '助詞', labelEn: 'Particles (16)', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'arimasu_imasu', labelJa: '存在動詞', labelEn: 'あります / います', icon: <ImageIcon className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'te_form', labelJa: 'て形活用', labelEn: 'Te-Form Mastery', icon: <GitBranch className="w-3.5 h-3.5 text-emerald-500" /> },
    { id: 'adjectives', labelJa: '形容詞活用', labelEn: 'Adjective Matrix', icon: <Sparkles className="w-3.5 h-3.5 text-purple-500" /> },
    { id: 'essential_patterns', labelJa: '必須構文', labelEn: 'Essential Patterns', icon: <Compass className="w-3.5 h-3.5 text-sky-500" /> },
    { id: 'conditionals', labelJa: '条件形', labelEn: 'Conditionals (4大)', icon: <BookOpen className="w-3.5 h-3.5 text-rose-500" /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner with Navigation */}
      <div className="bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-sky-500/10 border border-purple-200 p-5 sm:p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5 text-purple-950 font-extrabold text-xl">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-600 flex items-center justify-center text-white shadow-2xs">
              <BookCheck className="w-5 h-5" />
            </div>
            <div>
              <span>文法 Japanese Grammar &amp; Particles Masterclass</span>
              <span className="text-xs font-bold text-purple-700 block mt-0.5">
                WA, GA, O, NI, DE, E, TO &amp; あります / います with Visual Educational Guide
              </span>
            </div>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Deep dive into particle mechanics, common pitfalls, and contrast comparisons with huge authentic Japanese example sentences and native audio pronunciation.
          </p>
        </div>

        {/* Section Switcher Tabs */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-white/95 p-1.5 rounded-2xl border border-purple-200 shadow-2xs self-stretch md:self-auto overflow-x-auto scrollbar-none flex-wrap">
          {navChapters.map((ch) => {
            const isActive = activeTab === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveTab(ch.id)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-900'
                }`}
              >
                {ch.icon}
                <span>{ch.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: PARTICLES MASTERCLASS */}
      {activeTab === 'particles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Particle Selector Pills */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Particle to Study
              </span>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                {ALL_PARTICLES.length} Core Particles
              </span>
            </div>

            <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
              {ALL_PARTICLES.map((p) => {
                const isSelected = activeParticle.particle === p.particle;
                return (
                  <div
                    key={p.particle}
                    onClick={() => setActiveParticle(p)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-50/90 border-purple-400 shadow-sm scale-[1.01]'
                        : 'bg-white border-slate-100 hover:border-purple-200 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-black text-purple-800 font-['Zen_Maru_Gothic'] w-10 text-center">
                        {p.particle}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-[#15254A]">
                            Particle &ldquo;{p.romaji}&rdquo;
                          </span>
                          <span className="text-[10px] font-mono text-purple-700 bg-purple-100/60 px-1.5 py-0.2 rounded font-bold">
                            [{p.romaji}]
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {p.title}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-colors ${isSelected ? 'text-purple-600' : 'text-slate-300'}`} />
                  </div>
                );
              })}
            </div>

            {/* Quick Quiz Card with MIYU */}
            <div className="bg-gradient-to-br from-[#15254A] to-indigo-900 rounded-3xl p-5 text-white shadow-md space-y-3 mt-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-sky-200">Interactive Drill</span>
              </div>
              <p className="text-xs text-sky-100 leading-relaxed">
                Test your mastery! MIYU Sensei will ask you 3 tailored multiple-choice particle questions with instant XP rewards.
              </p>
              <button
                onClick={() => onAskMiyu('MIYU Sensei, please give me a 3-question Japanese particle quiz with は, が, を, に, で, へ, and と! Award XP for each!')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-black text-xs shadow-xs transition-all cursor-pointer"
              >
                Start Particle Quiz with MIYU
              </button>
            </div>
          </div>

          {/* Right Column: Deep Particle Breakdown */}
          <div className="lg:col-span-8 bg-white/95 rounded-3xl border border-purple-100 p-6 sm:p-7 shadow-md space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-black text-purple-900 font-['Zen_Maru_Gothic']">
                    {activeParticle.particle}
                  </span>
                  <div>
                    <span className="text-2xl font-mono font-bold text-purple-700 block">
                      [{activeParticle.romaji}]
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {activeParticle.title}
                    </h3>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onAskMiyu(`MIYU Sensei, please teach me how to master the particle "${activeParticle.particle}" (${activeParticle.romaji}) with comprehensive examples, nuance explanations, and a challenge question!`)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Practice with MIYU</span>
              </button>
            </div>

            {/* Core Rule & Nuance Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 space-y-1.5">
                <span className="text-xs font-extrabold text-purple-900 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  Core Function &amp; Meaning
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {activeParticle.coreRule}
                </p>
              </div>

              <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 space-y-1.5">
                <span className="text-xs font-extrabold text-indigo-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  Contrast &amp; Nuance
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {activeParticle.contrastRule}
                </p>
              </div>
            </div>

            {/* Common Pitfall Alert */}
            <div className="flex items-start gap-3 bg-rose-50/80 border border-rose-200 rounded-2xl p-4 text-xs text-rose-950">
              <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5 text-rose-900">Common Student Mistake to Avoid:</strong>
                <span className="leading-relaxed">{activeParticle.commonMistake}</span>
              </div>
            </div>

            {/* Huge Examples Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <BookCheck className="w-4 h-4 text-purple-600" />
                  Comprehensive Examples (例文)
                </span>
                <span className="text-[11px] text-slate-400">
                  Tap speaker to hear native pitch accent
                </span>
              </div>

              <div className="space-y-3">
                {activeParticle.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 hover:bg-purple-50/40 border border-slate-200 hover:border-purple-200 rounded-2xl p-4 transition-all duration-200 flex items-start justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <p className="text-xl sm:text-2xl font-bold text-[#15254A] font-['Zen_Maru_Gothic']">
                        {ex.ja}
                      </p>
                      <p className="text-xs font-mono text-purple-700 font-semibold">
                        {ex.ro}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700">
                        &ldquo;{ex.en}&rdquo;
                      </p>
                      {ex.note && (
                        <p className="text-[11px] text-slate-500 italic mt-1">
                          &bull; {ex.note}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => playVoice(ex.ja, ex.en, ex.ro)}
                      className="p-2.5 rounded-xl bg-white group-hover:bg-purple-100 text-purple-700 shadow-2xs border border-purple-200 transition-colors cursor-pointer flex-shrink-0 mt-1"
                      title="Pronounce with Native Voice"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* MIYU Sensei's Pro Tip */}
            <div className="flex items-start gap-3 bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950">
              <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5 text-amber-900">MIYU Sensei&apos;s Secret Memorization Tip:</strong>
                <span className="leading-relaxed">{activeParticle.senseiTip}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARIMASU VS IMASU (EXISTENCE GUIDE WITH ILLUSTRATION) */}
      {activeTab === 'arimasu_imasu' && (
        <div className="bg-white/95 rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-md space-y-8 animate-in fade-in duration-300">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                  あります vs います
                </span>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wide">
                  Existence Verbs
                </span>
              </div>
              <p className="text-slate-600 text-sm mt-1">
                The golden rule of Japanese existence: Inanimate objects vs Living, animate beings.
              </p>
            </div>

            <button
              onClick={() => onAskMiyu('MIYU Sensei, please teach me あります (arimasu) vs います (imasu) with 4 example sentences, location rules, and a quiz question!')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Practice with MIYU</span>
            </button>
          </div>

          {/* Educational Chart Illustration Embed */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-sky-600" />
              Visual Guide: あります (Inanimate) vs います (Animate)
            </span>
            <div className="rounded-3xl overflow-hidden border-2 border-sky-200 shadow-md bg-slate-900 group relative">
              <img
                src={arimasuChartImg}
                alt="Japanese Grammar Chart: あります (Arimasu) vs います (Imasu)"
                className="w-full h-auto object-cover max-h-[480px] hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                kumaGO 橋 Grammar Chart
              </div>
            </div>
          </div>

          {/* Core Rule Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* あります Card */}
            <div className="bg-sky-50/70 border-2 border-sky-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                    あります (Arimasu)
                  </h4>
                  <span className="text-xs font-bold text-sky-700">
                    Dictionary form: ある (aru) &bull; Godan Verb
                  </span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-sky-200/60 text-sky-900 font-extrabold text-xs">
                  Inanimate Objects
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium space-y-2">
                <p>
                  Used exclusively for <strong>non-living things</strong>, plants, buildings, books, vehicles, and abstract concepts like time or appointments.
                </p>
                <div className="bg-white/80 p-3 rounded-xl border border-sky-100 text-xs space-y-1">
                  <div className="font-bold text-sky-900">What uses あります:</div>
                  <div className="text-slate-600 flex flex-wrap gap-1.5 mt-1">
                    <span className="bg-sky-100/70 px-2 py-0.5 rounded text-sky-800">本 (books)</span>
                    <span className="bg-sky-100/70 px-2 py-0.5 rounded text-sky-800">車 (cars)</span>
                    <span className="bg-sky-100/70 px-2 py-0.5 rounded text-sky-800">お金 (money)</span>
                    <span className="bg-sky-100/70 px-2 py-0.5 rounded text-sky-800">時間 (time)</span>
                    <span className="bg-sky-100/70 px-2 py-0.5 rounded text-sky-800">木 (trees/plants)</span>
                  </div>
                </div>
              </div>

              {/* あります Examples */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold text-sky-900 uppercase">Examples:</span>
                {[
                  {
                    ja: 'つくえの うえに ほんが あります。',
                    ro: 'Tsukue no ue ni hon ga arimasu.',
                    en: 'There is a book on top of the desk.'
                  },
                  {
                    ja: 'きょうは じかんが ありません。',
                    ro: 'Kyou wa jikan ga arimasen.',
                    en: 'I do not have time today.'
                  }
                ].map((ex, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-2xl border border-sky-100 flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-sm font-['Zen_Maru_Gothic']">{ex.ja}</div>
                      <div className="text-[11px] font-mono text-sky-700">{ex.ro}</div>
                      <div className="text-xs text-slate-600">&ldquo;{ex.en}&rdquo;</div>
                    </div>
                    <button
                      onClick={() => playVoice(ex.ja, ex.en, ex.ro)}
                      className="p-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* います Card */}
            <div className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-black text-amber-950 font-['Zen_Maru_Gothic']">
                    います (Imasu)
                  </h4>
                  <span className="text-xs font-bold text-amber-700">
                    Dictionary form: いる (iru) &bull; Ichidan Verb
                  </span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-amber-200/60 text-amber-900 font-extrabold text-xs">
                  Animate Beings
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium space-y-2">
                <p>
                  Used exclusively for <strong>living creatures</strong> that move of their own volition: people, animals, insects, and fish.
                </p>
                <div className="bg-white/80 p-3 rounded-xl border border-amber-100 text-xs space-y-1">
                  <div className="font-bold text-amber-900">What uses います:</div>
                  <div className="text-slate-600 flex flex-wrap gap-1.5 mt-1">
                    <span className="bg-amber-100/70 px-2 py-0.5 rounded text-amber-800">みゆ先生 (Miyu Sensei)</span>
                    <span className="bg-amber-100/70 px-2 py-0.5 rounded text-amber-800">猫 (cats)</span>
                    <span className="bg-amber-100/70 px-2 py-0.5 rounded text-amber-800">犬 (dogs)</span>
                    <span className="bg-amber-100/70 px-2 py-0.5 rounded text-amber-800">友達 (friends)</span>
                    <span className="bg-amber-100/70 px-2 py-0.5 rounded text-amber-800">鳥 (birds)</span>
                  </div>
                </div>
              </div>

              {/* います Examples */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold text-amber-900 uppercase">Examples:</span>
                {[
                  {
                    ja: 'へやの なかに くろねこが います。',
                    ro: 'Heya no naka ni kuroneko ga imasu.',
                    en: 'There is a black cat inside the room.'
                  },
                  {
                    ja: 'きょうしつに みゆせんせいが います。',
                    ro: 'Kyoushitsu ni Miyu sensei ga imasu.',
                    en: 'Miyu Sensei is in the classroom.'
                  }
                ].map((ex, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-2xl border border-amber-100 flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-sm font-['Zen_Maru_Gothic']">{ex.ja}</div>
                      <div className="text-[11px] font-mono text-amber-700">{ex.ro}</div>
                      <div className="text-xs text-slate-600">&ldquo;{ex.en}&rdquo;</div>
                    </div>
                    <button
                      onClick={() => playVoice(ex.ja, ex.en, ex.ro)}
                      className="p-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Golden Sentence Formulas */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
            <h4 className="text-base font-extrabold text-[#15254A] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-sky-600" />
              <span>The 2 Essential Sentence Formulas</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-sky-700 uppercase">
                  Pattern 1: There is X at [Place]
                </span>
                <div className="font-mono text-xs font-bold text-[#15254A] bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                  [Place] に [Thing/Person] が あります / います。
                </div>
                <p className="text-xs text-slate-600">
                  Example: こうえんに こどもが います。(There are children in the park.)
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-purple-700 uppercase">
                  Pattern 2: [Subject] is located at [Place]
                </span>
                <div className="font-mono text-xs font-bold text-[#15254A] bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                  [Thing/Person] は [Place] に あります / います。
                </div>
                <p className="text-xs text-slate-600">
                  Example: くるまは ちゅうしゃじょうに あります。(The car is in the parking lot.)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 3: TE-FORM MASTERY */}
      {activeTab === 'te_form' && (
        <div className="bg-white/95 rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-md space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                  て形 Te-Form Mastery &amp; Connections
                </span>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                  Chapter 3
                </span>
              </div>
              <p className="text-slate-600 text-sm mt-1">
                The most versatile verb form: Connect actions, request favors, seek permission, and describe continuous actions!
              </p>
            </div>

            <button
              onClick={() => onAskMiyu('MIYU Sensei, please give me a comprehensive Te-form workout! Quiz me on conjugating Ichidan, Godan, and irregular verbs into Te-form, and using 〜てください!')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Practice Te-Form with MIYU</span>
            </button>
          </div>

          <div className="space-y-6">
            {TE_FORM_CHAPTER.map((item) => (
              <div key={item.id} className="bg-slate-50/70 border border-emerald-100 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-100/70">
                  <div>
                    <h4 className="text-xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                      {item.titleJa}
                    </h4>
                    <span className="text-xs font-bold text-emerald-700">{item.titleEn}</span>
                  </div>
                  <div className="font-mono text-xs font-bold bg-white text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
                    {item.formula}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {item.summary}
                </p>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Conjugation Rules &amp; Usage:</span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {item.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-700 uppercase">Native Examples (Tap speaker to listen):</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.examples.map((ex, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900 text-sm sm:text-base font-['Zen_Maru_Gothic']">{ex.ja}</p>
                          <p className="text-xs font-mono text-emerald-700 font-semibold">{ex.ro}</p>
                          <p className="text-xs text-slate-600">&ldquo;{ex.en}&rdquo;</p>
                          {ex.note && <p className="text-[10px] text-slate-400 italic">&bull; {ex.note}</p>}
                        </div>
                        <button
                          onClick={() => playVoice(ex.ja, ex.en, ex.ro)}
                          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 cursor-pointer flex-shrink-0"
                          title="Listen with Native Accent"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs">
                  <div className="flex items-start gap-2 text-amber-950">
                    <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-900 font-bold mb-0.5">MIYU Sensei’s Tip:</strong>
                      <span>{item.senseiTip}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onAskMiyu(item.quizPrompt)}
                    className="self-end sm:self-center px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    Drill This Pattern →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHAPTER 4: ADJECTIVE MATRIX */}
      {activeTab === 'adjectives' && (
        <div className="bg-white/95 rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-md space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                  形容詞 Adjective Masterclass &amp; Matrix
                </span>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wide">
                  Chapter 4
                </span>
              </div>
              <p className="text-slate-600 text-sm mt-1">
                Master い-adjectives vs な-adjectives, the 4-state conjugation matrix, adverbial forms, and compound joining rules!
              </p>
            </div>

            <button
              onClick={() => onAskMiyu('MIYU Sensei, please test my mastery of Japanese い-adjectives and な-adjectives, especially past and negative conjugations (and the irregular いい)!')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Practice Adjectives with MIYU</span>
            </button>
          </div>

          <div className="space-y-6">
            {ADJECTIVES_CHAPTER.map((item) => (
              <div key={item.id} className="bg-slate-50/70 border border-purple-100 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-100/70">
                  <div>
                    <h4 className="text-xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                      {item.titleJa}
                    </h4>
                    <span className="text-xs font-bold text-purple-700">{item.titleEn}</span>
                  </div>
                  <div className="font-mono text-xs font-bold bg-white text-purple-800 px-3 py-1.5 rounded-xl border border-purple-200">
                    {item.formula}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {item.summary}
                </p>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Key Grammatical Points:</span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {item.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-700 uppercase">Native Examples:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.examples.map((ex, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900 text-sm sm:text-base font-['Zen_Maru_Gothic']">{ex.ja}</p>
                          <p className="text-xs font-mono text-purple-700 font-semibold">{ex.ro}</p>
                          <p className="text-xs text-slate-600">&ldquo;{ex.en}&rdquo;</p>
                          {ex.note && <p className="text-[10px] text-slate-400 italic">&bull; {ex.note}</p>}
                        </div>
                        <button
                          onClick={() => playVoice(ex.ja, ex.en, ex.ro)}
                          className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 cursor-pointer flex-shrink-0"
                          title="Listen with Native Accent"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs">
                  <div className="flex items-start gap-2 text-amber-950">
                    <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-900 font-bold mb-0.5">MIYU Sensei’s Tip:</strong>
                      <span>{item.senseiTip}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onAskMiyu(item.quizPrompt)}
                    className="self-end sm:self-center px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    Drill This Pattern →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHAPTER 5: ESSENTIAL SENTENCE PATTERNS */}
      {activeTab === 'essential_patterns' && (
        <div className="bg-white/95 rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-md space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                  必須構文 Essential Sentence Structures
                </span>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-sky-100 text-sky-800 uppercase tracking-wide">
                  Chapter 5
                </span>
              </div>
              <p className="text-slate-600 text-sm mt-1">
                Express desires (〜たい / ほしい), give and receive favors (あげる / くれる / もらう), and explain nuances with 〜んです!
              </p>
            </div>

            <button
              onClick={() => onAskMiyu('MIYU Sensei, please give me practice on the giving & receiving verbs (あげる, くれる, もらう) and expressing desires with 〜たい and 〜がほしい!')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Practice Patterns with MIYU</span>
            </button>
          </div>

          <div className="space-y-6">
            {ESSENTIAL_PATTERNS_CHAPTER.map((item) => (
              <div key={item.id} className="bg-slate-50/70 border border-sky-100 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-sky-100/70">
                  <div>
                    <h4 className="text-xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                      {item.titleJa}
                    </h4>
                    <span className="text-xs font-bold text-sky-700">{item.titleEn}</span>
                  </div>
                  <div className="font-mono text-xs font-bold bg-white text-sky-800 px-3 py-1.5 rounded-xl border border-sky-200">
                    {item.formula}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {item.summary}
                </p>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Formulation &amp; Nuance:</span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {item.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-700 uppercase">Native Examples:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.examples.map((ex, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900 text-sm sm:text-base font-['Zen_Maru_Gothic']">{ex.ja}</p>
                          <p className="text-xs font-mono text-sky-700 font-semibold">{ex.ro}</p>
                          <p className="text-xs text-slate-600">&ldquo;{ex.en}&rdquo;</p>
                          {ex.note && <p className="text-[10px] text-slate-400 italic">&bull; {ex.note}</p>}
                        </div>
                        <button
                          onClick={() => playVoice(ex.ja, ex.en, ex.ro)}
                          className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 cursor-pointer flex-shrink-0"
                          title="Listen with Native Accent"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs">
                  <div className="flex items-start gap-2 text-amber-950">
                    <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-900 font-bold mb-0.5">MIYU Sensei’s Tip:</strong>
                      <span>{item.senseiTip}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onAskMiyu(item.quizPrompt)}
                    className="self-end sm:self-center px-3.5 py-1.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    Drill This Pattern →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHAPTER 6: CONDITIONALS & CONJUNCTIONS */}
      {activeTab === 'conditionals' && (
        <div className="bg-white/95 rounded-3xl border border-rose-100 p-6 sm:p-8 shadow-md space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                  接続詞 &amp; 条件形 Conjunctions &amp; Conditionals
                </span>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-rose-100 text-rose-800 uppercase tracking-wide">
                  Chapter 6
                </span>
              </div>
              <p className="text-slate-600 text-sm mt-1">
                Express cause and reason (から vs ので) and master the 4 legendary Japanese &ldquo;If / When&rdquo; conditionals (と・たら・ば・なら)!
              </p>
            </div>

            <button
              onClick={() => onAskMiyu('MIYU Sensei, please quiz me on the 4 Japanese conditionals: と (natural consequence), たら (general if), ば (hypothetical), and なら (contextual)!')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Practice Conditionals with MIYU</span>
            </button>
          </div>

          <div className="space-y-6">
            {CONDITIONALS_CHAPTER.map((item) => (
              <div key={item.id} className="bg-slate-50/70 border border-rose-100 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-rose-100/70">
                  <div>
                    <h4 className="text-xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                      {item.titleJa}
                    </h4>
                    <span className="text-xs font-bold text-rose-700">{item.titleEn}</span>
                  </div>
                  <div className="font-mono text-xs font-bold bg-white text-rose-800 px-3 py-1.5 rounded-xl border border-rose-200">
                    {item.formula}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {item.summary}
                </p>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Usage Distinction:</span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {item.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-700 uppercase">Native Examples:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.examples.map((ex, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900 text-sm sm:text-base font-['Zen_Maru_Gothic']">{ex.ja}</p>
                          <p className="text-xs font-mono text-rose-700 font-semibold">{ex.ro}</p>
                          <p className="text-xs text-slate-600">&ldquo;{ex.en}&rdquo;</p>
                          {ex.note && <p className="text-[10px] text-slate-400 italic">&bull; {ex.note}</p>}
                        </div>
                        <button
                          onClick={() => playVoice(ex.ja, ex.en, ex.ro)}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 cursor-pointer flex-shrink-0"
                          title="Listen with Native Accent"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs">
                  <div className="flex items-start gap-2 text-amber-950">
                    <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-900 font-bold mb-0.5">MIYU Sensei’s Tip:</strong>
                      <span>{item.senseiTip}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onAskMiyu(item.quizPrompt)}
                    className="self-end sm:self-center px-3.5 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs whitespace-nowrap cursor-pointer shadow-2xs"
                  >
                    Drill This Pattern →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
