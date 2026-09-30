import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Layers } from 'lucide-react';
import { tts } from '../utils/audio';

interface VerbItem {
  romaji: string;
  hiragana: string;
  kanji: string;
  meaning: string;
  type: 'Ichidan' | 'Godan' | 'Irregular';
  level: 'N5' | 'N4' | 'N3';
  forms: {
    dictionary: { ja: string; ro: string };
    polite: { ja: string; ro: string };
    negative: { ja: string; ro: string };
    past: { ja: string; ro: string };
    te: { ja: string; ro: string };
    potential: { ja: string; ro: string };
    volitional: { ja: string; ro: string };
  };
}

const VERB_DATABASE: VerbItem[] = [
  {
    romaji: 'taberu',
    hiragana: 'たべる',
    kanji: '食べる',
    meaning: 'to eat',
    type: 'Ichidan',
    level: 'N5',
    forms: {
      dictionary: { ja: '食べる', ro: 'taberu' },
      polite: { ja: '食べます', ro: 'tabemasu' },
      negative: { ja: '食べない', ro: 'tabenai' },
      past: { ja: '食べた', ro: 'tabeta' },
      te: { ja: '食べて', ro: 'tabete' },
      potential: { ja: '食べられる', ro: 'taberareru' },
      volitional: { ja: '食べよう', ro: 'tabeyou' },
    },
  },
  {
    romaji: 'nomu',
    hiragana: 'のむ',
    kanji: '飲む',
    meaning: 'to drink',
    type: 'Godan',
    level: 'N5',
    forms: {
      dictionary: { ja: '飲む', ro: 'nomu' },
      polite: { ja: '飲みます', ro: 'nomimasu' },
      negative: { ja: '飲まない', ro: 'nomanai' },
      past: { ja: '飲んだ', ro: 'nonda' },
      te: { ja: '飲んで', ro: 'nonde' },
      potential: { ja: '飲める', ro: 'nomeru' },
      volitional: { ja: '飲もう', ro: 'nomou' },
    },
  },
  {
    romaji: 'iku',
    hiragana: 'いく',
    kanji: '行く',
    meaning: 'to go',
    type: 'Godan',
    level: 'N5',
    forms: {
      dictionary: { ja: '行く', ro: 'iku' },
      polite: { ja: '行きます', ro: 'ikimasu' },
      negative: { ja: '行かない', ro: 'ikanai' },
      past: { ja: '行った', ro: 'itta' },
      te: { ja: '行って', ro: 'itte' },
      potential: { ja: '行ける', ro: 'ikeru' },
      volitional: { ja: '行こう', ro: 'ikou' },
    },
  },
  {
    romaji: 'kuru',
    hiragana: 'くる',
    kanji: '来る',
    meaning: 'to come',
    type: 'Irregular',
    level: 'N5',
    forms: {
      dictionary: { ja: '来る', ro: 'kuru' },
      polite: { ja: '来ます (きます)', ro: 'kimasu' },
      negative: { ja: '来ない (こない)', ro: 'konai' },
      past: { ja: '来た (きた)', ro: 'kita' },
      te: { ja: '来て (きて)', ro: 'kite' },
      potential: { ja: '来られる (こられる)', ro: 'korareru' },
      volitional: { ja: '来よう (こよう)', ro: 'koyou' },
    },
  },
  {
    romaji: 'suru',
    hiragana: 'する',
    kanji: '為る',
    meaning: 'to do',
    type: 'Irregular',
    level: 'N5',
    forms: {
      dictionary: { ja: 'する', ro: 'suru' },
      polite: { ja: 'します', ro: 'shimasu' },
      negative: { ja: 'しない', ro: 'shinai' },
      past: { ja: 'した', ro: 'shita' },
      te: { ja: 'して', ro: 'shite' },
      potential: { ja: 'できる', ro: 'dekiru' },
      volitional: { ja: 'しよう', ro: 'shiyou' },
    },
  },
  {
    romaji: 'miru',
    hiragana: 'みる',
    kanji: '見る',
    meaning: 'to see / watch',
    type: 'Ichidan',
    level: 'N5',
    forms: {
      dictionary: { ja: '見る', ro: 'miru' },
      polite: { ja: '見ます', ro: 'mimasu' },
      negative: { ja: '見ない', ro: 'minai' },
      past: { ja: '見た', ro: 'mita' },
      te: { ja: '見て', ro: 'mite' },
      potential: { ja: '見られる', ro: 'mirareru' },
      volitional: { ja: '見よう', ro: 'miyou' },
    },
  },
  {
    romaji: 'hanasu',
    hiragana: 'はなす',
    kanji: '話す',
    meaning: 'to speak',
    type: 'Godan',
    level: 'N5',
    forms: {
      dictionary: { ja: '話す', ro: 'hanasu' },
      polite: { ja: '話します', ro: 'hanashimasu' },
      negative: { ja: '話さない', ro: 'hanasanai' },
      past: { ja: '話した', ro: 'hanashita' },
      te: { ja: '話して', ro: 'hanashite' },
      potential: { ja: '話せる', ro: 'hanaseru' },
      volitional: { ja: '話そう', ro: 'hanasou' },
    },
  },
  {
    romaji: 'aru',
    hiragana: 'ある',
    kanji: '有る',
    meaning: 'to exist (inanimate objects) / to have',
    type: 'Godan',
    level: 'N5',
    forms: {
      dictionary: { ja: 'ある', ro: 'aru' },
      polite: { ja: 'あります', ro: 'arimasu' },
      negative: { ja: 'ない (無)', ro: 'nai' },
      past: { ja: 'あった', ro: 'atta' },
      te: { ja: 'あって', ro: 'atte' },
      potential: { ja: 'あり得る', ro: 'ariuru' },
      volitional: { ja: 'あろう', ro: 'arou' },
    },
  },
  {
    romaji: 'iru',
    hiragana: 'いる',
    kanji: '居る',
    meaning: 'to exist (living beings) / to be present',
    type: 'Ichidan',
    level: 'N5',
    forms: {
      dictionary: { ja: 'いる', ro: 'iru' },
      polite: { ja: 'います', ro: 'imasu' },
      negative: { ja: 'いない', ro: 'inai' },
      past: { ja: 'いた', ro: 'ita' },
      te: { ja: 'いて', ro: 'ite' },
      potential: { ja: 'いられる', ro: 'irareru' },
      volitional: { ja: 'いよう', ro: 'iyou' },
    },
  },
  {
    romaji: 'kaku',
    hiragana: 'かく',
    kanji: '書く',
    meaning: 'to write / compose',
    type: 'Godan',
    level: 'N5',
    forms: {
      dictionary: { ja: '書く', ro: 'kaku' },
      polite: { ja: '書きます', ro: 'kakimasu' },
      negative: { ja: '書かない', ro: 'kakanai' },
      past: { ja: '書いた', ro: 'kaita' },
      te: { ja: '書いて', ro: 'kaite' },
      potential: { ja: '書ける', ro: 'kakeru' },
      volitional: { ja: '書こう', ro: 'kakou' },
    },
  },
  {
    romaji: 'kaeru',
    hiragana: 'かえる',
    kanji: '帰る',
    meaning: 'to return home',
    type: 'Godan',
    level: 'N5',
    forms: {
      dictionary: { ja: '帰る', ro: 'kaeru' },
      polite: { ja: '帰ります', ro: 'kaerimasu' },
      negative: { ja: '帰らない', ro: 'kaeranai' },
      past: { ja: '帰った', ro: 'kaetta' },
      te: { ja: '帰って', ro: 'kaette' },
      potential: { ja: '帰れる', ro: 'kaereru' },
      volitional: { ja: '帰ろう', ro: 'kaerou' },
    },
  },
];

interface VerbStudyViewProps {
  onAskMiyu: (prompt: string) => void;
}

export const VerbStudyView: React.FC<VerbStudyViewProps> = ({ onAskMiyu }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeVerb, setActiveVerb] = useState<VerbItem>(VERB_DATABASE[0]);

  const filteredVerbs = VERB_DATABASE.filter((v) =>
    selectedType === 'all' ? true : v.type === selectedType
  );

  const playVoice = (text: string) => {
    // Strip furigana parenthesis if present
    const clean = text.replace(/\s*\([^)]*\)/g, '');
    tts.speak(clean, { rate: 0.85, pitch: 1.15 });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-indigo-500/10 border border-sky-200 p-5 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-800 font-extrabold text-xl">
            <Layers className="w-5 h-5 text-sky-600" />
            <span>動詞学習 (Verb Study & Conjugation Tables)</span>
          </div>
          <p className="text-slate-600 text-sm mt-1">
            Master Japanese verb groups (Ichidan, Godan, Irregular) with native pronunciation and full conjugation charts.
          </p>
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-white/80 p-1.5 rounded-2xl border border-sky-100 shadow-2xs">
          {['all', 'Ichidan', 'Godan', 'Irregular'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                selectedType === type
                  ? 'bg-[#15254A] text-white'
                  : 'text-slate-600 hover:bg-sky-50'
              }`}
            >
              {type === 'all' ? 'All Verbs' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Verb List + Conjugation Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Verbs selector */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block px-1">
            Select a Verb ({filteredVerbs.length})
          </span>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredVerbs.map((v) => {
              const isSelected = activeVerb.kanji === v.kanji;
              return (
                <div
                  key={v.kanji}
                  onClick={() => setActiveVerb(v)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'bg-sky-50 border-sky-400 shadow-sm'
                      : 'bg-white border-slate-100 hover:border-sky-200 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                      {v.kanji}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {v.hiragana} ({v.romaji})
                      </div>
                      <div className="text-xs text-slate-500">{v.meaning}</div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      v.type === 'Ichidan'
                        ? 'bg-teal-50 text-teal-700 border-teal-200'
                        : v.type === 'Godan'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}
                  >
                    {v.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Full Conjugation Table */}
        <div className="lg:col-span-8 bg-white/95 rounded-3xl border border-sky-100 p-5 sm:p-6 shadow-md">
          {/* Active Verb Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-[#15254A] font-['Zen_Maru_Gothic']">
                  {activeVerb.kanji}
                </span>
                <span className="text-xl font-bold text-sky-700">{activeVerb.hiragana}</span>
                <span className="text-sm font-semibold text-slate-400">({activeVerb.romaji})</span>
              </div>
              <p className="text-base text-slate-700 font-medium mt-1">
                Meaning: <strong className="text-slate-900">{activeVerb.meaning}</strong> &bull; Group: <span className="font-semibold text-sky-800">{activeVerb.type} Verb</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => playVoice(activeVerb.kanji)}
                className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen Base</span>
              </button>

              <button
                onClick={() => onAskMiyu(`Teach me and quiz me on the conjugation forms of the verb ${activeVerb.kanji} (${activeVerb.hiragana})!`)}
                className="flex items-center gap-1.5 bg-[#15254A] hover:bg-[#1f3769] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Quiz with MIYU</span>
              </button>
            </div>
          </div>

          {/* Conjugation Form Cards */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(activeVerb.forms).map(([formKey, val]) => {
              const titles: Record<string, { en: string; ja: string; desc: string }> = {
                dictionary: { en: 'Dictionary / Casual', ja: '辞書形', desc: 'Informal present / future' },
                polite: { en: 'Polite Form (-masu)', ja: '丁寧形 (ます)', desc: 'Respectful everyday speech' },
                negative: { en: 'Negative Form (-nai)', ja: '否定形 (ない)', desc: 'Do not / will not' },
                past: { en: 'Past Form (-ta)', ja: '過去形 (た)', desc: 'Did / completed action' },
                te: { en: 'Te-Form (-te)', ja: 'て形', desc: 'Connecting actions / please do' },
                potential: { en: 'Potential Form', ja: '可能形', desc: 'Can do / ability' },
                volitional: { en: 'Volitional Form', ja: '意向形', desc: "Let's do / intend to do" },
              };
              const meta = titles[formKey] || { en: formKey, ja: '', desc: '' };

              return (
                <div
                  key={formKey}
                  className="p-3.5 bg-slate-50/80 hover:bg-sky-50/60 rounded-2xl border border-slate-100 transition-colors flex items-center justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                      {meta.en} <span className="text-slate-400">({meta.ja})</span>
                    </span>
                    <span className="text-xl font-bold text-slate-900 block mt-0.5">
                      {val.ja}
                    </span>
                    <span className="text-xs font-mono text-sky-700">{val.ro}</span>
                  </div>

                  <button
                    onClick={() => playVoice(val.ja)}
                    title="Pronounce this form"
                    className="p-2 rounded-xl bg-white hover:bg-sky-100 text-sky-700 shadow-2xs border border-slate-200 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
