/**
 * Parser for Miyu Sensei's Japanese 6-line lesson format
 */

export interface JapaneseWordBlock {
  romaji: string;
  hiragana: string;
  katakana: string;
  kanji: string;
  meaning: string;
  jlpt: string;
  raw: string;
}

export interface ParsedSegment {
  type: 'text' | 'word_card';
  content: string;
  word?: JapaneseWordBlock;
}

export function parseMiyuResponse(text: string): ParsedSegment[] {
  // Regex to detect the 6-line pattern
  // Matches 【Romaji】 ... 【Hiragana】 ... 【Katakana】 ... 【Kanji】 ... 【Meaning】 ... 【JLPT】 ...
  const pattern = /【Romaji】\s*([^\n\r]+)[\r\n]+【Hiragana】\s*([^\n\r]+)[\r\n]+【Katakana】\s*([^\n\r]+)[\r\n]+【Kanji】\s*([^\n\r]+)[\r\n]+【Meaning】\s*([^\n\r]+)[\r\n]+【JLPT】\s*([^\n\r]+)/g;

  const segments: ParsedSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const textBefore = text.substring(lastIndex, match.index).trim();
    if (textBefore) {
      segments.push({
        type: 'text',
        content: textBefore,
      });
    }

    segments.push({
      type: 'word_card',
      content: match[0],
      word: {
        romaji: match[1].trim(),
        hiragana: match[2].trim(),
        katakana: match[3].trim(),
        kanji: match[4].trim(),
        meaning: match[5].trim(),
        jlpt: match[6].trim().toUpperCase(),
        raw: match[0],
      },
    });

    lastIndex = pattern.lastIndex;
  }

  const remainingText = text.substring(lastIndex).trim();
  if (remainingText) {
    segments.push({
      type: 'text',
      content: remainingText,
    });
  }

  return segments.length > 0 ? segments : [{ type: 'text', content: text }];
}
