import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

dotenv.config();

const app = express();
const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Shared Gemini Client with required telemetry User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are kumaGO 橋 Mobile and web app — an elite, native Japanese language tutor AI for the KUMAGO app by Lighthouse 橋.
You are MIYU Sensei (KUMAGO Sensei) — a friendly, warm, patient, encouraging, slightly playful anime-style native Japanese teacher.

═══════════════════════════════════════
CORE IDENTITY
═══════════════════════════════════════
- Name: KUMAGO Sensei (MIYU)
- Personality: Warm, patient, encouraging, slightly playful (anime-style). Uses light expressions like "Sugoi!", "Ganbatte!", "Eh?!", "Yosh!" naturally but never overdone.
- Native-level Japanese speaker AND native-level English explainer.
- You teach N5 → N1 (JLPT levels) with absolute accuracy.

═══════════════════════════════════════
LANGUAGE OUTPUT RULE (CRITICAL)
═══════════════════════════════════════
For EVERY Japanese word, phrase, or sentence you teach, you MUST output it in this exact 6-line format:

【Romaji】  ringo
【Hiragana】 りんご
【Katakana】 リンゴ
【Kanji】   林檎  (or "—" if none)
【Meaning】  apple
【JLPT】     N5

Never skip any line. Never mix them. Always in this order.

═══════════════════════════════════════
VOICE / AUDIO BEHAVIOR
═══════════════════════════════════════
- You are connected to a Text-to-Speech engine that reads Japanese natively.
- Wrap ALL spoken Japanese in special tags so the TTS system knows what to pronounce:
  <speak lang="ja">りんご</speak>
- For English explanations, do NOT wrap them in <speak> tags.
- Pronounce Japanese with correct pitch accent. Slow down by 20% for beginners (N5/N4).

═══════════════════════════════════════
TEACHING METHOD (VIDEO GAME STYLE)
═══════════════════════════════════════
Follow this loop for every lesson:
1. GREET: Short encouraging intro.
2. INTRODUCE: Give the word with the 6-line format above.
3. AUDIO: Speak it with <speak lang="ja">…</speak>.
4. QUIZ: Ask the user to type or repeat it (or challenge them with a multiple choice/kana question).
5. VALIDATE: If correct → praise + XP (+10 XP). If wrong → gentle correction + retry (+5 XP on retry).
6. REINFORCE: Use the word in a simple sentence (with the 6-line breakdown when introducing new sentences).

═══════════════════════════════════════
LESSON CATEGORIES (USER CAN CHOOSE)
═══════════════════════════════════════
- Memorizing Words: Nouns, Adjectives, Adverbs (alphabetical A-Z, JLPT N5-N1)
- Verb Study: Full conjugation tables (Ichidan, Godan, Irregular) — polite (masu), casual (dictionary), past (ta), negative (nai), te-form (te), potential, volitional
- Phrases: N5, N4, N3, N2, N1 — daily conversation, keigo, business
- Kana: Hiragana / Katakana recognition & writing drills
- Grammar: particles (wa, ga, o, ni, de, e, to, mo), sentence patterns

When the user selects a category, ask: "Which letter (A–Z) or level (N5–N1) would you like?"

═══════════════════════════════════════
ACCURACY RULES (STRICT)
═══════════════════════════════════════
- NEVER invent vocabulary. Only use standard JLPT N5–N1 lists.
- NEVER give wrong pitch accent or wrong kanji.
- For verbs, ALWAYS show conjugation type and full table when requested.
- If unsure, say: "Let me confirm that — I don't want to teach you wrong Japanese!"
- No romaji-only teaching. Always pair with kana.

═══════════════════════════════════════
GAMIFICATION
═══════════════════════════════════════
- Award XP: 10 XP for correct, 5 XP for retry-correct, 0 for wrong.
- Every 5 correct answers: trigger "LEVEL UP!" message.
- Track streak. Celebrate streaks of 3, 5, 10.
- End sessions with a score summary when asked.

═══════════════════════════════════════
FAILURE HANDLING
═══════════════════════════════════════
- If user goes off-topic: gently steer back to Japanese with a smile.
- If user is frustrated: switch to easier level, praise effort.
- If user writes in romaji only: praise effort and gently guide them to type in hiragana.

═══════════════════════════════════════
AVATAR MOOD TAG (MANDATORY)
═══════════════════════════════════════
At the very end of your response, ALWAYS include one mood tag on its own line:
[MOOD: praise] — when user is correct, achieves streak, or levels up!
[MOOD: talking] — when explaining, welcoming, or conversing.
[MOOD: thinking] — when asking a quiz question, analyzing an error, or checking rules.
[MOOD: idle] — for neutral calm finish.`;

function shouldTriggerSearchGrounding(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  const keywords = [
    'jlpt', 'exam date', 'test date', 'registration', 'schedule',
    'slang', 'buzzword', 'trend', 'trending', '2024', '2025', '2026', 'current',
    'news', 'today', 'latest', 'recent', 'weather', 'japan rail', 'shinkansen',
    'event', 'festival', 'matsuri', 'travel', 'tokyo now', 'kyoto now',
    'pop culture', 'anime season', 'search', 'google', 'look up', 'online'
  ];
  return keywords.some(k => lower.includes(k));
}

// API: Chat with Miyu Sensei (with Google Search Grounding via gemini-3.5-flash)
app.post('/api/chat', async (req, res) => {
  try {
    const {
      message,
      history = [],
      level = 'N5',
      category = 'general',
      useSearchGrounding,
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const shouldSearch =
      useSearchGrounding === true ||
      (useSearchGrounding !== false && shouldTriggerSearchGrounding(message));

    const contextualInstruction = `${SYSTEM_INSTRUCTION}
Current student JLPT level preference: ${level}.
Current study mode/category: ${category}.
${
  shouldSearch
    ? `═══════════════════════════════════════
GOOGLE SEARCH GROUNDING ACTIVE
═══════════════════════════════════════
You are grounded with live Google Search. Provide the most accurate, up-to-date real-world facts (e.g. current JLPT schedules, modern slang, current events, travel information). Always cite real details, but maintain your warm MIYU Sensei personality and ALWAYS output Japanese vocabulary in the mandatory 6-line format!`
    : ''
}`;

    // Format chat history into contents array
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const h of history) {
        if (h && (h.role === 'user' || h.role === 'model') && h.content) {
          contents.push({
            role: h.role,
            parts: [{ text: String(h.content) }],
          });
        }
      }
    }

    // Append latest user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    let response: any;
    let usedSearchGrounding = false;

    if (shouldSearch) {
      try {
        // Primary: gemini-3.5-flash with googleSearch tool as specified in prompt
        response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents,
          config: {
            systemInstruction: contextualInstruction,
            tools: [{ googleSearch: {} }],
          },
        });
        usedSearchGrounding = true;
      } catch (searchErr: any) {
        console.warn('gemini-3.5-flash search busy/failed, retrying with gemini-3.8-flash search:', searchErr.message);
        try {
          // Secondary fallback: gemini-3.8-flash with googleSearch tool
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction: contextualInstruction,
              tools: [{ googleSearch: {} }],
            },
          });
          usedSearchGrounding = true;
        } catch (searchErr2: any) {
          console.warn('Google Search Grounding fallback to standard chat:', searchErr2.message);
          // Standard chat fallback without tools
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction: contextualInstruction,
              temperature: 0.7,
              topP: 0.95,
            },
          });
        }
      }
    } else {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: contextualInstruction,
          temperature: 0.7,
          topP: 0.95,
        },
      });
    }

    // Extract Google Search grounding metadata if present
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];
    const webSources: Array<{ uri: string; title: string }> = [];

    if (Array.isArray(groundingChunks)) {
      for (const chunk of groundingChunks) {
        if (chunk?.web?.uri) {
          webSources.push({
            uri: chunk.web.uri,
            title: chunk.web.title || chunk.web.uri,
          });
        }
      }
    }
    const searchQueries: string[] = groundingMetadata?.webSearchQueries || [];

    const rawReply = response.text || "Konnichiwa! I am ready to practice Japanese with you!";
    
    // Extract mood tag if present
    let mood: 'idle' | 'talking' | 'praise' | 'thinking' = 'talking';
    let cleanReply = rawReply;
    const moodMatch = rawReply.match(/\[MOOD:\s*(idle|talking|praise|thinking)\]/i);
    if (moodMatch) {
      mood = moodMatch[1].toLowerCase() as 'idle' | 'talking' | 'praise' | 'thinking';
      cleanReply = rawReply.replace(/\[MOOD:\s*(idle|talking|praise|thinking)\]/gi, '').trim();
    } else {
      // Determine mood by content
      if (rawReply.includes('Sugoi') || rawReply.includes('Correct!') || rawReply.includes('LEVEL UP') || rawReply.includes('+10 XP')) {
        mood = 'praise';
      } else if (rawReply.includes('Quiz') || rawReply.includes('Which') || rawReply.includes('Let me confirm')) {
        mood = 'thinking';
      }
    }

    // Extract speak tags
    const speakMatches = cleanReply.match(/<speak lang="ja">([\s\S]*?)<\/speak>/g);
    const audioSnippets = speakMatches
      ? speakMatches.map((m: string) => m.replace(/<\/?speak(?: lang="ja")?>/g, '').trim())
      : [];

    return res.json({
      reply: cleanReply,
      mood,
      hasJapanese: audioSnippets.length > 0 || /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(cleanReply),
      audioSnippets,
      webSources,
      searchQueries,
      searchGrounded: usedSearchGrounding || webSources.length > 0,
    });
  } catch (error: any) {
    console.error('Error calling Gemini API in /api/chat:', error);
    let errMsg = error.message || 'Failed to generate response from Miyu Sensei';
    if (errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('429')) {
      errMsg = 'Miyu Sensei is receiving high practice traffic right now (API rate limit). Please wait a few seconds and send your message again! Ganbatte!';
    } else if (errMsg.includes('503') || errMsg.includes('UNAVAILABLE')) {
      errMsg = 'The Gemini studio is temporarily busy. Please try asking again in a moment!';
    }
    return res.status(500).json({ error: errMsg });
  }
});

// API: Real-time Live Google Search Grounding for Japanese Culture, News, JLPT & Slang
app.post('/api/search-grounding', async (req, res) => {
  try {
    const { query, level = 'N5' } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchPrompt = `You are MIYU Sensei, elite native Japanese teacher and Google Search research guide for kumaGO 橋.
Using live Google Search, research accurate, up-to-date Japanese information on the topic:
"${query}" (Target student level: ${level}).

Respond in an engaging, comprehensive format:
1. "Real-Time Overview & Cultural Context": Summarize the latest accurate facts, dates, real-world context, or trends found on the web.
2. "Essential Japanese Vocabulary": Provide 4 to 8 high-value Japanese words related to this topic formatted strictly in the 6-line breakdown:
【Romaji】  ...
【Hiragana】 ...
【Katakana】 ...
【Kanji】   ... (or "—" if none)
【Meaning】  ...
【JLPT】     ...

3. "Modern Japanese Phrases / Grammar": 2 sentence examples showing how native speakers use these terms today.
4. "Learner Advice & Cultural Etiquette": Helpful tips for travelers or language learners.
Wrap spoken Japanese in <speak lang="ja">...</speak>.
End with [MOOD: talking|praise|thinking].`;

    let response: any;
    try {
      // Primary: gemini-3.5-flash with googleSearch tool
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [{ role: 'user', parts: [{ text: searchPrompt }] }],
        config: {
          tools: [{ googleSearch: {} }],
          temperature: 0.5,
        },
      });
    } catch (err: any) {
      console.warn('gemini-3.5-flash search fallback to gemini-3.8-flash:', err.message);
      // Secondary fallback: gemini-3.8-flash with googleSearch tool
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: searchPrompt }] }],
        config: {
          tools: [{ googleSearch: {} }],
          temperature: 0.5,
        },
      });
    }

    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];
    const webSources: Array<{ uri: string; title: string }> = [];

    if (Array.isArray(groundingChunks)) {
      for (const chunk of groundingChunks) {
        if (chunk?.web?.uri) {
          webSources.push({
            uri: chunk.web.uri,
            title: chunk.web.title || chunk.web.uri,
          });
        }
      }
    }
    const searchQueries: string[] = groundingMetadata?.webSearchQueries || [];

    const rawReply = response.text || "Here is the latest Japanese information found via Google Search!";
    let mood: 'idle' | 'talking' | 'praise' | 'thinking' = 'talking';
    let cleanReply = rawReply;
    const moodMatch = rawReply.match(/\[MOOD:\s*(idle|talking|praise|thinking)\]/i);
    if (moodMatch) {
      mood = moodMatch[1].toLowerCase() as 'idle' | 'talking' | 'praise' | 'thinking';
      cleanReply = rawReply.replace(/\[MOOD:\s*(idle|talking|praise|thinking)\]/gi, '').trim();
    }

    const speakMatches = cleanReply.match(/<speak lang="ja">([\s\S]*?)<\/speak>/g);
    const audioSnippets = speakMatches
      ? speakMatches.map((m: string) => m.replace(/<\/?speak(?: lang="ja")?>/g, '').trim())
      : [];

    return res.json({
      success: true,
      query,
      reply: cleanReply,
      mood,
      webSources,
      searchQueries,
      hasJapanese: audioSnippets.length > 0 || /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(cleanReply),
      audioSnippets,
    });
  } catch (error: any) {
    console.error('Error in search grounding endpoint:', error);
    let errMsg = error.message || 'Failed to perform search grounding';
    if (errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('429')) {
      errMsg = 'Google Search Grounding rate limit reached. Please wait a few seconds and try your search again!';
    } else if (errMsg.includes('503') || errMsg.includes('UNAVAILABLE')) {
      errMsg = 'Google Search grounding service is temporarily busy. Please retry in a few moments.';
    }
    return res.status(500).json({ error: errMsg });
  }
});

// API: Studio TTS with gemini-3.8-flash-lite-tts
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'Aoede' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Pronounce naturally in native Japanese: ${text}`,
              speechMetadata: {
                style: 'Gentle, friendly, clear Japanese anime teacher',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice }, // 'Aoede' or 'Kore'
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return res.json({ audio: base64Audio, format: 'pcm', sampleRate: 24000 });
    }

    return res.status(500).json({ error: 'No audio generated' });
  } catch (error: any) {
    console.warn('Gemini TTS fallback:', error.message);
    // Return gracefully so client falls back smoothly to SpeechSynthesis
    return res.status(500).json({ error: error.message });
  }
});

// API: Vocab database
app.get('/api/vocab/:level', (req, res) => {
  try {
    const level = req.params.level.toLowerCase();
    const filePath = path.resolve(process.cwd(), `src/data/vocab/${level}_vocab.json`);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return res.json(data);
    }
    return res.status(404).json({ error: `Vocab for level ${level} not found` });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
});

// API: Download full project source code as a ZIP file ("descargar todo el codigo")
app.get('/api/download-project-zip', (req, res) => {
  try {
    const zipPath = path.resolve(process.cwd(), 'kumago-project-code.zip');
    execSync(`python3 scripts/create_project_zip.py "${zipPath}"`, { cwd: process.cwd() });

    if (fs.existsSync(zipPath)) {
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="kumago-japanese-learning-app-code.zip"');
      const fileStream = fs.createReadStream(zipPath);
      fileStream.pipe(res);
      fileStream.on('close', () => {
        try { fs.unlinkSync(zipPath); } catch {}
      });
      return;
    }
    return res.status(500).json({ error: 'Failed to create code archive' });
  } catch (error: any) {
    console.error('Download code error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// API: Nihongo Hon (Japanese Library & NotebookLM) - Book Analyzer
app.post('/api/nihongo-hon/analyze', async (req, res) => {
  try {
    const { title, author = 'Unknown', text, level = 'N5' } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text content is required for book analysis' });
    }

    const truncatedText = text.slice(0, 6000); // Analyze up to 6000 chars

    const prompt = `You are MIYU Sensei, expert Japanese linguist and Google NotebookLM analyzer for kumaGO 橋.
Analyze the following Japanese text from the book/source "${title}" (Author: ${author}, target level: ${level}).

Perform a comprehensive pedagogical analysis and return a JSON object with:
1. "summary": A clear 2-3 sentence overview of the text in English.
2. "summaryJa": The same summary in polite natural Japanese.
3. "studyGuide": An object with:
   - "podcastBriefing": An enthusiastic NotebookLM-style 2-speaker or Sensei podcast audio overview script (around 100-150 words) introducing the text, its key nuances, grammar, and pronunciation highlights.
   - "keyThemes": An array of 3 strings (e.g. ["Theme 1", "Theme 2", "Theme 3"]).
   - "culturalNotes": Cultural or literary context note.
4. "vocabulary": An array of 6 to 12 key vocabulary items extracted from the text. Each item MUST have:
   - "id": unique string
   - "alphabet": first letter of romaji uppercase (e.g. "M")
   - "romaji": Romanized Japanese
   - "hiragana": Hiragana reading
   - "katakana": Katakana reading
   - "kanji": Kanji form (or "—" if kana-only)
   - "meaning": English definition
   - "jlpt": "N5", "N4", "N3", "N2", or "N1"
   - "type": "Noun", "Ichidan Verb", "Godan Verb", "I-adjective", "Na-adjective", or "Adverb"
   - "contextSentence": The sentence from the book where this word appears (or clean sample)
   - "contextSentenceMeaning": English translation of the context sentence
5. "grammar": An array of 3 to 6 key grammar points or particles (like は, が, を, に, で, へ, と, あります/います, 〜てくる, etc.) appearing in this text. Each item MUST have:
   - "id": unique string
   - "point": Title of grammar rule (e.g. "〜に 行く (Destination particle)")
   - "pattern": Formula pattern (e.g. "[Place] に [Verb]")
   - "explanation": Concise, clear grammatical explanation
   - "exampleInBook": Sentence from the text
   - "exampleMeaning": Translation
   - "particleFocus": The particle or conjugation highlighted
6. "quizQuestions": An array of 2 to 4 comprehension or vocabulary multiple-choice questions based on this text. Each with:
   - "id": unique string
   - "question": English question
   - "questionJa": Japanese question
   - "options": Array of 4 options
   - "correctIndex": Integer 0 to 3
   - "explanation": Why it is correct

BOOK TEXT TO ANALYZE:
"""
${truncatedText}
"""

Return ONLY a valid JSON object. Do not wrap in markdown quotes if possible, or use standard json formatting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const rawJson = response.text || '{}';
    let parsedData: any = {};
    try {
      parsedData = JSON.parse(rawJson);
    } catch {
      // Fallback cleanup if response has markdown
      const cleaned = rawJson.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json({
      success: true,
      analysis: parsedData,
    });
  } catch (error: any) {
    console.error('Error analyzing book with Gemini:', error);
    return res.status(500).json({ error: error.message || 'Failed to analyze book' });
  }
});

// API: Nihongo Hon Grounded Chat (NotebookLM Source Grounded Q&A with MIYU Sensei)
app.post('/api/nihongo-hon/chat', async (req, res) => {
  try {
    const { message, bookTitle, bookText, history = [], level = 'N5' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const groundInstruction = `${SYSTEM_INSTRUCTION}

═══════════════════════════════════════
NIHONGO HON (GOOGLE NOTEBOOKLM) MODE
═══════════════════════════════════════
You are conducting a source-grounded Japanese literature & language study session.
The student is currently reading the book: "${bookTitle || 'Japanese Library Text'}".
Here is the book's full source text:
"""
${(bookText || '').slice(0, 5000)}
"""

SOURCE GROUNDING INSTRUCTIONS:
- Ground your answers in the vocabulary, grammar, and storyline of this specific book.
- When explaining words or phrases from the book, ALWAYS format them in the 6-line breakdown:
  【Romaji】 ...
  【Hiragana】 ...
  【Katakana】 ...
  【Kanji】 ...
  【Meaning】 ...
  【JLPT】 ...
- Point out particles (は, が, を, に, で, へ, と) and existence verbs (あります / います) whenever relevant.
- Cite specific lines or phrases from the book so the student learns in context.
- Wrap spoken Japanese in <speak lang="ja">...</speak>.
- End your response with one mood tag on its own line: [MOOD: talking|praise|thinking|idle].`;

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const h of history) {
        if (h && (h.role === 'user' || h.role === 'model') && h.content) {
          contents.push({
            role: h.role,
            parts: [{ text: String(h.content) }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: groundInstruction,
        temperature: 0.6,
      },
    });

    const rawReply = response.text || "Hai! Let's explore this Japanese book together!";
    let mood: 'idle' | 'talking' | 'praise' | 'thinking' = 'talking';
    let cleanReply = rawReply;
    const moodMatch = rawReply.match(/\[MOOD:\s*(idle|talking|praise|thinking)\]/i);
    if (moodMatch) {
      mood = moodMatch[1].toLowerCase() as 'idle' | 'talking' | 'praise' | 'thinking';
      cleanReply = rawReply.replace(/\[MOOD:\s*(idle|talking|praise|thinking)\]/gi, '').trim();
    }

    const speakMatches = cleanReply.match(/<speak lang="ja">([\s\S]*?)<\/speak>/g);
    const audioSnippets = speakMatches
      ? speakMatches.map((m) => m.replace(/<\/?speak(?: lang="ja")?>/g, '').trim())
      : [];

    return res.json({
      reply: cleanReply,
      mood,
      hasJapanese: audioSnippets.length > 0 || /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(cleanReply),
      audioSnippets,
    });
  } catch (error: any) {
    console.error('Error in Nihongo Hon grounded chat:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate grounded response' });
  }
});

// Frontend Vite setup
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`kumaGO 橋 Miyu Sensei running at http://localhost:${PORT}`);
  });
}

startServer();
