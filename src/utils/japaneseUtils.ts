/**
 * Japanese Language Subtitle and Phonetics Utilities
 * Handles kana-to-romaji transliteration and furigana parsing
 */

const KANA_TO_ROMAJI_MAP: Record<string, string> = {
  // Hiragana
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'o', 'ん': 'n',
  // Dakuten
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  // Digraphs
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',

  // Katakana
  'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
  'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
  'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
  'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
  'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
  'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
  'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
  'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
  'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
  'ワ': 'wa', 'ヲ': 'o', 'ン': 'n',
  'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
  'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
  'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
  'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
  'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
};

// Common kanji furigana hints for instant subtitle reading
const COMMON_KANJI_FURIGANA: Record<string, { kana: string; romaji: string; meaning: string }> = {
  '日本語': { kana: 'にほんご', romaji: 'nihongo', meaning: 'Japanese language' },
  '日本': { kana: 'にほん', romaji: 'nihon', meaning: 'Japan' },
  '先生': { kana: 'せんせい', romaji: 'sensei', meaning: 'teacher / master' },
  '友達': { kana: 'ともだち', romaji: 'tomodachi', meaning: 'friend' },
  '学校': { kana: 'がっこう', romaji: 'gakkou', meaning: 'school' },
  '勉強': { kana: 'べんきょう', romaji: 'benkyou', meaning: 'study' },
  '今日': { kana: 'きょう', romaji: 'kyou', meaning: 'today' },
  '昨日': { kana: 'きのう', romaji: 'kinou', meaning: 'yesterday' },
  '明日': { kana: 'あした', romaji: 'ashita', meaning: 'tomorrow' },
  '私': { kana: 'わたし', romaji: 'watashi', meaning: 'I / me' },
  '頑張って': { kana: 'がんばって', romaji: 'ganbatte', meaning: 'do your best!' },
  '一緒に': { kana: 'いっしょに', romaji: 'isshoni', meaning: 'together' },
  '朝': { kana: 'あさ', romaji: 'asa', meaning: 'morning' },
  '雨': { kana: 'あめ', romaji: 'ame', meaning: 'rain' },
  '林檎': { kana: 'りんご', romaji: 'ringo', meaning: 'apple' },
  '食べる': { kana: 'たべる', romaji: 'taberu', meaning: 'to eat' },
  '飲む': { kana: 'のむ', romaji: 'nomu', meaning: 'to drink' },
  '行く': { kana: 'いく', romaji: 'iku', meaning: 'to go' },
  '来る': { kana: 'くる', romaji: 'kuru', meaning: 'to come' },
  '見る': { kana: 'みる', romaji: 'miru', meaning: 'to see' },
  '話す': { kana: 'はなす', romaji: 'hanasu', meaning: 'to speak' },
  '水': { kana: 'みず', romaji: 'mizu', meaning: 'water' },
  '猫': { kana: 'ねこ', romaji: 'neko', meaning: 'cat' },
  '桜': { kana: 'さくら', romaji: 'sakura', meaning: 'cherry blossom' },
  '山': { kana: 'やま', romaji: 'yama', meaning: 'mountain' },
  '車': { kana: 'くるま', romaji: 'kuruma', meaning: 'car' },
  '本': { kana: 'ほん', romaji: 'hon', meaning: 'book' },
  '駅': { kana: 'えき', romaji: 'eki', meaning: 'train station' },
  '家': { kana: 'いえ', romaji: 'ie', meaning: 'house / home' },
};

/**
 * Transliterates kana text to romaji
 */
export function kanaToRomaji(kanaText: string): string {
  let result = '';
  let i = 0;

  while (i < kanaText.length) {
    // Sokuon (っ / ッ)
    if (kanaText[i] === 'っ' || kanaText[i] === 'ッ') {
      if (i + 1 < kanaText.length) {
        const nextChar = kanaText.slice(i + 1, i + 3);
        const mappedNext = KANA_TO_ROMAJI_MAP[nextChar] || KANA_TO_ROMAJI_MAP[kanaText[i + 1]];
        if (mappedNext) {
          result += mappedNext[0]; // double consonant
          i++;
          continue;
        }
      }
    }

    // Check two-char digraphs (e.g. しゃ, きゅ)
    if (i + 1 < kanaText.length) {
      const twoChars = kanaText.slice(i, i + 2);
      if (KANA_TO_ROMAJI_MAP[twoChars]) {
        result += KANA_TO_ROMAJI_MAP[twoChars];
        i += 2;
        continue;
      }
    }

    // Check single character
    const char = kanaText[i];
    if (KANA_TO_ROMAJI_MAP[char]) {
      result += KANA_TO_ROMAJI_MAP[char];
    } else {
      result += char;
    }
    i++;
  }

  return result;
}

/**
 * Generates subtitle lines (Japanese, Romaji, English) from text
 */
export function generateSubtitleFromJapanese(text: string): {
  japanese: string;
  romaji: string;
  english?: string;
} {
  const clean = text.replace(/<[^>]+>/g, '').trim();

  // Look for exact matches in common dictionary
  for (const [kanji, meta] of Object.entries(COMMON_KANJI_FURIGANA)) {
    if (clean === kanji || clean.includes(kanji)) {
      return {
        japanese: clean,
        romaji: kanaToRomaji(clean.replace(new RegExp(kanji, 'g'), meta.kana)),
        english: meta.meaning,
      };
    }
  }

  // Fallback transliteration
  const romaji = kanaToRomaji(clean);
  return {
    japanese: clean,
    romaji,
  };
}
