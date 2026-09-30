export interface ExampleSentence {
  ja: string;
  ro: string;
  en: string;
  note?: string;
}

export interface ParticleDetail {
  particle: string;
  romaji: string;
  title: string;
  coreRule: string;
  contrastRule: string;
  commonMistake: string;
  examples: ExampleSentence[];
  senseiTip: string;
}

export const ADDITIONAL_PARTICLES: ParticleDetail[] = [
  {
    particle: 'から',
    romaji: 'kara',
    title: 'Starting Point & Reason (起点・理由を表す「から」)',
    coreRule: 'Indicates the starting time, location, or source ("from", "since"). When placed after a clause, it marks the reason or cause ("because / so").',
    contrastRule: 'から (from) vs まで (until): Often paired together as 〜から〜まで (from X to Y). When expressing reason, から is subjective and emotional compared to the more polite, objective ので.',
    commonMistake: 'Confusing starting point (から) with destination (へ / に). From Tokyo to Kyoto is 「東京から 京都まで」.',
    senseiTip: 'Remember: から flows outwards from the origin: 9時から (from 9:00), 日本から (from Japan)!',
    examples: [
      {
        ja: 'かいぎは ごぜん９じから はじまります。',
        ro: 'Kaigi wa gozen ku-ji kara hajimarimasu.',
        en: 'The meeting starts from 9:00 AM.',
        note: 'Starting time marker.'
      },
      {
        ja: 'わたしは カナダから きました。',
        ro: 'Watashi wa Kanada kara kimashita.',
        en: 'I came from Canada.',
        note: 'Geographical origin.'
      },
      {
        ja: 'きょうは あめですから、いえに います。',
        ro: 'Kyou wa ame desu kara, ie ni imasu.',
        en: 'Because it is raining today, I am staying home.',
        note: 'Causal conjunction (clause + から).'
      },
      {
        ja: 'せんせいから てがみを もらいました。',
        ro: 'Sensei kara tegami o moraimashita.',
        en: 'I received a letter from my teacher.',
        note: 'Source of receipt.'
      }
    ]
  },
  {
    particle: 'まで',
    romaji: 'made',
    title: 'Endpoint & Limit (終点・期限を表す「まで」)',
    coreRule: 'Marks the destination, final time limit, or boundary of an action ("until", "up to", "as far as").',
    contrastRule: 'まで (until - continuous action) vs までに (by / no later than - deadline for one-time completion). E.g. 「5時まで 勉強する」(study until 5:00) vs 「5時までに 提出する」(submit by 5:00).',
    commonMistake: 'Using まで for a deadline instead of までに. If you have to finish something before a specific time, use までに!',
    senseiTip: 'まで paints a line extending continuously all the way to the finish post!',
    examples: [
      {
        ja: 'ぎんこうは ごご３じまで あいています。',
        ro: 'Ginkou wa gogo san-ji made aite imasu.',
        en: 'The bank is open until 3:00 PM.',
        note: 'Time limit of a continuous state.'
      },
      {
        ja: 'とうきょうから きょうとまで しんかんせんで いきます。',
        ro: 'Toukyou kara Kyouto made shinkansen de ikimasu.',
        en: 'I go from Tokyo to Kyoto by bullet train.',
        note: 'Destination limit paired with から.'
      },
      {
        ja: 'あしたまで にほんごを がんばりましょう！',
        ro: 'Ashita made nihongo o ganbarimashou!',
        en: 'Let’s do our best with Japanese until tomorrow!',
        note: 'Encouraging timeframe.'
      },
      {
        ja: 'えきまで あるいて １０ぷんです。',
        ro: 'Eki made aruite juppun desu.',
        en: 'It takes 10 minutes walking as far as the station.',
        note: 'Distance boundary.'
      }
    ]
  },
  {
    particle: 'より',
    romaji: 'yori',
    title: 'Comparison Standard (比較の基準を表す「より」)',
    coreRule: 'Sets the standard of comparison ("than / compared to"). In comparison sentences, the item followed by より is the baseline being compared against.',
    contrastRule: '「Aは Bより [Adjective] です」= "A is more [Adj] than B". The item WITH より is LESS than the subject. To say "A is more", attach のほうが: 「Aのほうが Bより 大きい」(A is bigger than B).',
    commonMistake: 'Flipping the order: 「猫は犬より小さい」(Cats are smaller than dogs) vs 「犬は猫より大きい」(Dogs are bigger than cats). Remember: the noun right before より is the lower benchmark.',
    senseiTip: 'Associate より with "standing behind" the benchmark: B is the measuring tape!',
    examples: [
      {
        ja: 'しんかんせんは ひこうきより やすいです。',
        ro: 'Shinkansen wa hikouki yori yasui desu.',
        en: 'The bullet train is cheaper than an airplane.',
        note: 'Standard comparison.'
      },
      {
        ja: 'りんごより みかんの ほうが すきです。',
        ro: 'Ringo yori mikan no hou ga suki desu.',
        en: 'I like mandarin oranges more than apples.',
        note: 'Preference comparison with のほうが.'
      },
      {
        ja: 'きょうは きのうより さむいですね。',
        ro: 'Kyou wa kinou yori samui desu ne.',
        en: 'Today is colder than yesterday, isn’t it?',
        note: 'Temporal comparison.'
      },
      {
        ja: 'ことばより こうどうが たいせつです。',
        ro: 'Kotoba yori koudou ga taisetsu desu.',
        en: 'Actions are more important than words.',
        note: 'Philosophical comparison.'
      }
    ]
  },
  {
    particle: 'だけ',
    romaji: 'dake',
    title: 'Inclusive Limit (限定を表す「だけ」- Only / Just)',
    coreRule: 'Specifies an exclusive limit or quantity with a neutral or positive nuance ("only", "just", "as much as"). Works with affirmative verbs.',
    contrastRule: 'だけ (dake) vs しか (shika): だけ is followed by POSITIVE verbs (「水だけ飲みました」= I only drank water). しか MUST be followed by NEGATIVE verbs (「水しか飲みませんでした」= I drank nothing but water, with a nuance of insufficiency).',
    commonMistake: 'Pairing だけ with negative verbs when you want to express insufficiency. Use しか〜ない for feeling "not enough".',
    senseiTip: 'だけ = "Just this and that is fine!" (Contented limitation).',
    examples: [
      {
        ja: '５ぷんだけ やすみましょう。',
        ro: 'Go-fun dake yasumimashou.',
        en: 'Let’s rest for just 5 minutes.',
        note: 'Limiting duration comfortably.'
      },
      {
        ja: 'わたしは ひらがなだけ よめます。',
        ro: 'Watashi wa hiragana dake yomemasu.',
        en: 'I can read only hiragana.',
        note: 'Limiting scope of ability with positive verb.'
      },
      {
        ja: 'ひとつだけ おねがいが あります。',
        ro: 'Hitotsu dake onegai ga arimasu.',
        en: 'I have just one favor to ask.',
        note: 'Singular limitation.'
      },
      {
        ja: 'すきなだけ たべて くださいね。',
        ro: 'Suki na dake tabete kudasai ne.',
        en: 'Please eat as much as you like!',
        note: 'Idiomatic: 好きなだけ = "as much as desired".'
      }
    ]
  },
  {
    particle: 'しか',
    romaji: 'shika',
    title: 'Exclusive Scarcity Limit (限定・不足を表す「しか〜ない」)',
    coreRule: 'Expresses strict exclusivity with an inherent feeling of scarcity or insufficiency ("only", "nothing but"). Crucially, it MUST ALWAYS pair with a NEGATIVE verb.',
    contrastRule: '「100円だけあります」(I have 100 yen - neutral) vs 「100円しかありません」(I only have a mere 100 yen - implies it is not enough). しか replaces は, が, and を completely.',
    commonMistake: 'Using しか with a positive verb (e.g. 「水しか飲みます」is grammatically invalid! It must be 「水しか飲みません」).',
    senseiTip: 'Think of しか as "Nothing exists except...": しか + ない is an unbreakable grammatical soulmate!',
    examples: [
      {
        ja: 'さいふの なかに １００えんしか ありません。',
        ro: 'Saifu no naka ni hyaku-en shika arimasen.',
        en: 'I have only 100 yen in my wallet (and it feels insufficient).',
        note: 'Expresses scarcity with ありません.'
      },
      {
        ja: 'あさごはんは コーヒーしか のみませんでした。',
        ro: 'Asagohan wa koohii shika nomimasen deshita.',
        en: 'I drank nothing but coffee for breakfast.',
        note: 'Exclusive consumption with negative verb.'
      },
      {
        ja: 'みゆせんせいにしか はなせません。',
        ro: 'Miyu sensei ni shika hanasemasen.',
        en: 'I can only talk to Miyu Sensei.',
        note: 'Combines with に (にしか).'
      },
      {
        ja: 'きょうしつには がくせいが ひとりしか いません。',
        ro: 'Kyoushitsu ni wa gakusei ga hitori shika imasen.',
        en: 'There is only one student in the classroom.',
        note: 'Scarcity of animate beings.'
      }
    ]
  },
  {
    particle: 'ね',
    romaji: 'ne',
    title: 'Agreement & Confirmation (共感・確認の終助詞「ね」)',
    coreRule: 'Sentence-ending particle seeking agreement, confirming shared experience, or softening statements ("right?", "isn\'t it?", "you know?"). Deeply bonds speakers.',
    contrastRule: 'ね (ne) vs よ (yo): 「ね」 is used when BOTH speaker and listener share the information; 「よ」 is used when the speaker is informing the listener of NEW knowledge the listener lacks.',
    commonMistake: 'Overusing ね when telling someone something they couldn’t possibly know (e.g., "My mother is sick, right?" feels strange; use よ instead).',
    senseiTip: 'ね is the universal handshake of polite Japanese empathy: "We agree on this together!"',
    examples: [
      {
        ja: 'きょうは とても あついですね！',
        ro: 'Kyou wa totemo atsui desu ne!',
        en: 'It is very hot today, isn’t it!',
        note: 'Shared weather observation.'
      },
      {
        ja: 'このラーメンは おいしいですね。',
        ro: 'Kono raamen wa oishii desu ne.',
        en: 'This ramen is delicious, isn’t it?',
        note: 'Mutual culinary enjoyment.'
      },
      {
        ja: 'あしたは やすみですね。',
        ro: 'Ashita wa yasumi desu ne.',
        en: 'Tomorrow is our day off, right?',
        note: 'Confirming known schedule.'
      },
      {
        ja: 'にほんごの べんきょうは たのしいですね！',
        ro: 'Nihongo no benkyou wa tanoshii desu ne!',
        en: 'Studying Japanese is so fun, right?!',
        note: 'Empathetic encouragement.'
      }
    ]
  },
  {
    particle: 'よ',
    romaji: 'yo',
    title: 'Informing & Assurance (伝達・主張の終助詞「よ」)',
    coreRule: 'Sentence-ending particle used to impart new information, give advice, give friendly warning, or emphasize conviction ("I tell you!", "you know!", "trust me!").',
    contrastRule: 'Used when the speaker possesses information that the listener does not know or might have forgotten. Can sound pushy if used with superiors; keep tone friendly!',
    commonMistake: 'Sounding overly assertive in business Japanese. Use 「ですよ」 or soften with 「と思いますよ」 (I think so, you know).',
    senseiTip: 'Imagine handing a wrapped gift of knowledge to your friend: "Here is something you will love to know: よ!"',
    examples: [
      {
        ja: 'あしたは テストが ありますよ！',
        ro: 'Ashita wa tesuto ga arimasu yo!',
        en: 'There is a test tomorrow, you know! (Friendly alert)',
        note: 'Informing about upcoming event.'
      },
      {
        ja: 'このえいがは とても おもしろいですよ。',
        ro: 'Kono eiga wa totemo omoshiroi desu yo.',
        en: 'This movie is really fascinating, I assure you!',
        note: 'Recommendation of new discovery.'
      },
      {
        ja: 'みゆせんせいは いつも おうえんしていますよ！',
        ro: 'Miyu sensei wa itsumo ouen shite imasu yo!',
        en: 'Miyu Sensei is always cheering for you, you know! ✨',
        note: 'Heartfelt reassurance.'
      },
      {
        ja: 'あぶないですから、きをつけて くださいよ。',
        ro: 'Abunai desu kara, ki o tsukete kudasai yo.',
        en: 'It is dangerous, so please be careful!',
        note: 'Protective warning.'
      }
    ]
  },
  {
    particle: 'か',
    romaji: 'ka',
    title: 'Question Marker & Alternative (疑問・選択を表す「か」)',
    coreRule: 'Turns any statement into a polite question when placed at the sentence end without requiring question mark punctuation. When placed between nouns, it means "or" (AかB).',
    contrastRule: 'Polite questions end with 「ですか」(desu ka) or 「ますか」(masu ka). In casual speech, か can sound blunt/masculine; casual questions usually use rising intonation with の or kana.',
    commonMistake: 'Adding question marks alongside か in traditional Japanese writing (though common in modern text, か alone serves as the full question mark).',
    senseiTip: 'When connecting nouns, か gives choices: 「お茶かコーヒー」(Tea or coffee)?',
    examples: [
      {
        ja: 'おなまえは なんですか？',
        ro: 'O-namae wa nan desu ka?',
        en: 'What is your name?',
        note: 'Standard polite inquiry.'
      },
      {
        ja: 'これは あなたの かばんですか？',
        ro: 'Kore wa anata no kaban desu ka?',
        en: 'Is this your bag?',
        note: 'Confirmation question.'
      },
      {
        ja: 'コーヒーか こうちゃは いかがですか？',
        ro: 'Koohii ka koucha wa ikaga desu ka?',
        en: 'Would you care for coffee or black tea?',
        note: 'Alternative marker between nouns.'
      },
      {
        ja: 'えきは どこに ありますか？',
        ro: 'Eki wa doko ni arimasu ka?',
        en: 'Where is the train station?',
        note: 'Direction inquiry.'
      }
    ]
  }
];

export interface GrammarChapterItem {
  id: string;
  titleJa: string;
  titleEn: string;
  formula: string;
  summary: string;
  rules: string[];
  examples: ExampleSentence[];
  senseiTip: string;
  quizPrompt: string;
}

export const TE_FORM_CHAPTER: GrammarChapterItem[] = [
  {
    id: 'te_conjugation',
    titleJa: 'て形の作り方 (How to Conjugate the Te-Form)',
    titleEn: 'Te-Form Conjugation Master Rules',
    formula: 'Ichidan: [Stem] + て | Godan: って / んで / いて / いで / して | Irregular: して / きて',
    summary: 'The Te-form (〜て) is the absolute foundation of conversational Japanese. It links verbs together sequentially, forms polite requests, expresses ongoing actions, permission, and conditions.',
    rules: [
      'Ichidan Verbs (ending in -iru / -eru): Drop る and add て (食べる → 食べて, 見る → 見て, 寝る → 寝て).',
      'Godan Verbs ending in う, つ, る: Replace with って (買う → 買って, 待つ → 待って, 帰る → 帰って).',
      'Godan Verbs ending in む, ぶ, ぬ: Replace with んで (飲む → 飲んで, 遊ぶ → 遊んで, 死ぬ → 死んで).',
      'Godan Verbs ending in く: Replace with いて (書く → 書いて). CRITICAL EXCEPTION: 行く (iku) becomes 行って (itte)!',
      'Godan Verbs ending in ぐ: Replace with いで (泳ぐ → 泳いで, 急ぐ → 急いで).',
      'Godan Verbs ending in す: Replace with して (話す → 話して, 貸す → 貸して).',
      'Irregular Verbs: する (to do) → して, 来る (kuru, to come) → 来て (kite).'
    ],
    examples: [
      {
        ja: 'あさ おきて、あさごはんを たべて、がっこうへ いきます。',
        ro: 'Asa okite, asagohan o tabete, gakkou e ikimasu.',
        en: 'I wake up in the morning, eat breakfast, and go to school.',
        note: 'Sequential action chain connecting 3 verbs with 〜て.'
      },
      {
        ja: 'ほんを かって、いえで よみました。',
        ro: 'Hon o katte, ie de yomimashita.',
        en: 'I bought a book and read it at home.',
        note: 'Past narrative chain (final verb dictates past tense).'
      }
    ],
    senseiTip: 'Sing the Te-form rhythm song: "U, tsu, ru → tte! Mu, bu, nu → nde! Ku → ite (iku → itte)! Gu → ide! Su → shite! Ichidan drop ru + te!"',
    quizPrompt: 'MIYU Sensei, please quiz me on Japanese Te-form conjugations with Ichidan, Godan, and irregular verbs!'
  },
  {
    id: 'te_kudasai',
    titleJa: '〜てください (Polite Requests)',
    titleEn: 'Making Polite Requests ("Please do...")',
    formula: '[Verb in Te-form] + ください (kudasai)',
    summary: 'The standard polite way to request someone to do an action, offer instructions, or invite participation.',
    rules: [
      'Attach ください directly to the Te-form: 聞いて (listen) + ください = 聞いてください (Please listen).',
      'To say "Please do not do...", use the negative Te-form: [Verb ない-form] + でください (e.g. 忘れないでください = Please do not forget).',
      'For extra polite Japanese (Keigo), use 〜ていただけますか or 〜てくださいますか.'
    ],
    examples: [
      {
        ja: 'ゆっくり はなして ください。',
        ro: 'Yukkuri hanashite kudasai.',
        en: 'Please speak slowly.',
        note: 'Essential traveler phrase.'
      },
      {
        ja: 'ここに なまえを かいて ください。',
        ro: 'Koko ni namae o kaite kudasai.',
        en: 'Please write your name here.',
        note: 'Form filling instruction.'
      },
      {
        ja: 'しゃしんを とらないで ください。',
        ro: 'Shashin o toranaide kudasai.',
        en: 'Please do not take photographs.',
        note: 'Negative request: 〜ないでください.'
      }
    ],
    senseiTip: 'Pair with 「すみませんが」(excuse me, but...) to make your requests sound extra natural and polite!',
    quizPrompt: 'MIYU Sensei, teach me 3 practical polite request situations using 〜てください in Japanese!'
  },
  {
    id: 'te_mo_ii',
    titleJa: '〜てもいいですか (Asking Permission)',
    titleEn: 'Asking & Granting Permission ("May I...?")',
    formula: '[Verb in Te-form] + もいいですか (mo ii desu ka)',
    summary: 'Asking for permission politely to perform an action. Literally means: "Even if I do [verb], is it good?"',
    rules: [
      'Granting permission: 「はい、〜てもいいですよ」(Yes, you may).',
      'Polite refusal: Instead of blunt no, use 「すみません、ちょっと...」(I am sorry, but that is a bit...).',
      'Opposite: Prohibition is 〜てはいけません ("You must not").'
    ],
    examples: [
      {
        ja: 'ここで しゃしんを とっても いいですか？',
        ro: 'Koko de shashin o totte mo ii desu ka?',
        en: 'May I take a photo here?',
        note: 'Standard museum / temple permission.'
      },
      {
        ja: 'はい、どうぞ。はいっても いいですよ。',
        ro: 'Hai, douzo. Haitte mo ii desu yo.',
        en: 'Yes, go ahead. You may enter.',
        note: 'Granting permission warmly.'
      },
      {
        ja: 'ここで たばこを すっては いけません。',
        ro: 'Koko de tabako o sutte wa ikemasen.',
        en: 'You must not smoke here.',
        note: 'Strict prohibition: 〜てはいけません.'
      }
    ],
    senseiTip: 'The particle も means "even". So you are humbly asking: "Even if I do this, is it acceptable?"',
    quizPrompt: 'MIYU Sensei, give me permission drills with 〜てもいいですか and prohibition with 〜てはいけません!'
  },
  {
    id: 'te_iru',
    titleJa: '〜ています (Ongoing Action & Resulting State)',
    titleEn: 'Present Continuous & Resultant State',
    formula: '[Verb in Te-form] + います (imasu) / いる (iru)',
    summary: 'Has TWO crucial functions in Japanese: (1) An action actively happening right now ("is doing"), and (2) A lingering state resulting from a past change.',
    rules: [
      'Continuous action: 今勉強しています (I am studying right now).',
      'Resultant state verbs: 結婚しています (is married - state of marriage), 住んでいます (lives in), 知っています (knows / possesses knowledge).',
      'Negative of 知っています is 知りません (NEVER 知っていません!).'
    ],
    examples: [
      {
        ja: 'いま、みゆせんせいと にほんごを べんきょうしています。',
        ro: 'Ima, Miyu sensei to nihongo o benkyou shite imasu.',
        en: 'I am studying Japanese with Miyu Sensei right now.',
        note: 'Ongoing action.'
      },
      {
        ja: 'わたしは とうきょうに すんでいます。',
        ro: 'Watashi wa Toukyou ni sunde imasu.',
        en: 'I live in Tokyo (state of residency).',
        note: 'Resultant state with 住む.'
      },
      {
        ja: 'かのじょは あかい スカートを はいています。',
        ro: 'Kanojo wa akai sukaato o haite imasu.',
        en: 'She is wearing a red skirt.',
        note: 'Clothing state of wear.'
      }
    ],
    senseiTip: 'Remember the golden exception: For "I don’t know", always say 「知りません」(shirimasen), never 知っていません!',
    quizPrompt: 'MIYU Sensei, teach me the difference between ongoing actions and resultant states with 〜ています!'
  }
];

export const ADJECTIVES_CHAPTER: GrammarChapterItem[] = [
  {
    id: 'adj_types',
    titleJa: 'い形容詞 vs な形容詞 (Two Adjective Classes)',
    titleEn: 'The Two Families of Japanese Adjectives',
    formula: 'い-adj: ends in い directly | な-adj: requires な before nouns',
    summary: 'Japanese adjectives act like descriptive mini-verbs. Understanding the dividing line between い-adjectives and な-adjectives unlocks flawless sentence building.',
    rules: [
      'い-Adjectives (True Adjectives): Inherently end in hiragana い (高い takai, 暑い atsui, 美味しい oishii). Modify nouns directly: 高い本 (an expensive book).',
      'な-Adjectives (Adjectival Nouns): Originate mostly from Sino-Japanese words (静か shizuka, 有名 yuumei, 親切 shinsetsu). Require な when modifying nouns: 静かな部屋 (a quiet room).',
      'TRAP WORDS: 綺麗 (きれい kirei - pretty/clean) and 有名 (ゆうめい yuumei - famous) end in the sound "i" but are NA-adjectives! (きれいな花, 有名な人).'
    ],
    examples: [
      {
        ja: 'これは とても おいしい りんごです。',
        ro: 'Kore wa totemo oishii ringo desu.',
        en: 'This is a very delicious apple.',
        note: 'い-adjective modifying noun directly.'
      },
      {
        ja: 'きょうとは しずかで きれいな まちです。',
        ro: 'Kyouto wa shizuka de kirei na machi desu.',
        en: 'Kyoto is a quiet and pretty town.',
        note: 'な-adjective using な before noun.'
      }
    ],
    senseiTip: 'Remember the two famous imposters: きれい (kirei) and ゆうめい (yuumei) are な-adjectives! Say きれいな猫!',
    quizPrompt: 'MIYU Sensei, quiz me on identifying い-adjectives vs な-adjectives in Japanese!'
  },
  {
    id: 'adj_conjugations',
    titleJa: '形容詞の活用 (The 4-State Conjugation Matrix)',
    titleEn: 'Full 4-State Conjugation Matrix',
    formula: 'い: 〜い / 〜くない / 〜かった / 〜くなかった | な: 〜です / 〜じゃない / 〜でした / 〜じゃなかった',
    summary: 'Adjectives conjugate for tense (past vs present) and polarity (positive vs negative). In Japanese, the adjective itself changes its ending!',
    rules: [
      'い-Adjective Present Negative: Drop い, add くない (高い → 高くない).',
      'い-Adjective Past Affirmative: Drop い, add かった (高い → 高かった).',
      'い-Adjective Past Negative: Drop い, add くなかった (高い → 高くなかった).',
      'IRREGULAR EXCEPTION: いい (good) conjugates from its root よい: いい → よくない (not good) → よかった (was good) → よくなかった (was not good)!',
      'な-Adjective Conjugation: Present: 静かです | Negative: 静かじゃない / ではありません | Past: 静かでした | Past Negative: 静かじゃなかった.'
    ],
    examples: [
      {
        ja: 'きのうの テストは あまり むずかしくなかったです。',
        ro: 'Kinou no tesuto wa amari muzukashikunakatta desu.',
        en: 'Yesterday’s test wasn’t very difficult.',
        note: 'い-adjective past negative: むずかしくなかった.'
      },
      {
        ja: 'てんきが よかったので、うみへ いきました。',
        ro: 'Tenki ga yokatta node, umi e ikimashita.',
        en: 'Because the weather was good, I went to the beach.',
        note: 'いい past affirmative is よかった!'
      },
      {
        ja: 'きょねんの なつは あまり しずかじゃなかったです。',
        ro: 'Kyonen no natsu wa amari shizuka ja nakatta desu.',
        en: 'Last summer was not very quiet.',
        note: 'な-adjective past negative: じゃなかった.'
      }
    ],
    senseiTip: 'Never say 「いくない」! The word "good" always transforms into よ: よくない, よかった, よくなかった!',
    quizPrompt: 'MIYU Sensei, drill me on past and negative adjective conjugations with authentic Japanese sentences!'
  },
  {
    id: 'adj_modifiers',
    titleJa: '副詞化と連結 (Adverbial Form & Joining Adjectives)',
    titleEn: 'Adverbial Forms (〜く/〜に) & Joining Sentences',
    formula: 'Adverb: い-adj + く | な-adj + に || Joining: い-adj + くて | な-adj + で',
    summary: 'Turn adjectives into adverbs to modify verbs ("run quickly", "speak politely"), or chain multiple adjectives together smoothly.',
    rules: [
      'Adverb from い-adj: Drop い, add く (早い → 早く走る = run quickly; 上手になる = become skillful).',
      'Adverb from な-adj: Add に (静か → 静かに話す = speak quietly; きれいにする = make clean).',
      'Joining い-adjectives: Drop い, add くて (安くて美味しい = cheap and delicious).',
      'Joining な-adjectives: Add で (親切で元気 = kind and energetic).'
    ],
    examples: [
      {
        ja: 'あしたは はやく おきましょう。',
        ro: 'Ashita wa hayaku okimashou.',
        en: 'Let’s wake up early tomorrow.',
        note: 'い-adj adverbial form: 早く.'
      },
      {
        ja: 'しずかに ドアを しめて ください。',
        ro: 'Shizukani doa o shimete kudasai.',
        en: 'Please close the door quietly.',
        note: 'な-adj adverbial form: 静かに.'
      },
      {
        ja: 'この レストランは やすくて、とても おいしいです。',
        ro: 'Kono resutoran wa yasukute, totemo oishii desu.',
        en: 'This restaurant is cheap and very delicious.',
        note: 'Connecting adjectives with 〜くて.'
      }
    ],
    senseiTip: 'To say "become [adjective]", pair with なる: 寒くなる (become cold), 上手になる (become good at)!',
    quizPrompt: 'MIYU Sensei, show me how to turn adjectives into adverbs and join them in compound Japanese sentences!'
  }
];

export const ESSENTIAL_PATTERNS_CHAPTER: GrammarChapterItem[] = [
  {
    id: 'tai_hoshii',
    titleJa: '〜たい & 〜がほしい (Expressing Desires)',
    titleEn: 'Desire: Wanting to Do vs Wanting an Object',
    formula: 'Verb stem + たい (tai) | Noun + が ほしい (hoshii)',
    summary: 'In Japanese, wanting to DO an action and wanting to POSSESS an object use two distinct grammatical structures.',
    rules: [
      'Wanting to DO something: Take verb ます-stem and attach たい: 食べる → 食べたい (want to eat), 行く → 行きたい (want to go).',
      'Conjugates like an い-adjective: 食べたくない (don’t want to eat), 食べたかった (wanted to eat).',
      'Wanting an OBJECT: Use [Noun] が ほしいです (e.g. 新しい車がほしいです = I want a new car).',
      'CRITICAL SOCIAL RULE: Never ask a teacher or superior directly 「何がほしいですか？」— it sounds intrusive! Use 「いかがですか？」.'
    ],
    examples: [
      {
        ja: 'にほんへ いって、ほんものの ラーメンを たべたいです！',
        ro: 'Nihon e itte, honmono no raamen o tabetai desu!',
        en: 'I want to go to Japan and eat authentic ramen!',
        note: 'Action desire with 〜たい.'
      },
      {
        ja: 'あたらしい パソコンが ほしいです。',
        ro: 'Atarashii pasokon ga hoshii desu.',
        en: 'I want a new computer.',
        note: 'Object desire with がほしい.'
      },
      {
        ja: 'きょうは つかれたので、どこへも いきたくないです。',
        ro: 'Kyou wa tsukareta node, doko e mo ikitakunai desu.',
        en: 'Because I am tired today, I don’t want to go anywhere.',
        note: 'Negative desire: 〜たくない.'
      }
    ],
    senseiTip: 'The object of 〜たい can take either を or が: 水を飲みたい or 水が飲みたい (が emphasizes the specific craving)!',
    quizPrompt: 'MIYU Sensei, teach me how to express all forms of desire with 〜たい and 〜がほしい!'
  },
  {
    id: 'giving_receiving',
    titleJa: 'あげる・くれる・もらう (Giving & Receiving Favors)',
    titleEn: 'The Giving & Receiving Triangle',
    formula: '〜てあげる (give) | 〜てくれる (give to me) | 〜てもらう (receive favor)',
    summary: 'Japanese culture places immense value on beneficiary direction. Japanese verbs change based on who bestows kindness upon whom.',
    rules: [
      'あげる (Ageru): Speaker gives to someone else, or person A gives to person B (友達にプレゼントをあげました).',
      'くれる (Kureru): Someone gives to ME (or someone in my inner circle). Emphasizes gratitude (友達が私にプレゼントをくれました).',
      'もらう (Morau): Speaker receives from someone else (友達に/からプレゼントをもらいました).',
      'Pairing with Te-form: 〜てあげる (do favor for others), 〜てくれる (someone kindly does for me), 〜てもらう (get someone to do favor).'
    ],
    examples: [
      {
        ja: 'みゆせんせいが にほんごを おしえて くれました。',
        ro: 'Miyu sensei ga nihongo o oshiete kuremashita.',
        en: 'Miyu Sensei kindly taught me Japanese (giving kindness to me).',
        note: '〜てくれる expresses warmth toward recipient.'
      },
      {
        ja: 'ともだちに えいごの えほんを よんで あげました。',
        ro: 'Tomodachi ni eigo no ehon o yonde agemashita.',
        en: 'I read an English picture book to my friend.',
        note: '〜てあげる: Bestowing favor upon friend.'
      },
      {
        ja: 'たなかさんに しゅくだいを てつだって もらいました。',
        ro: 'Tanaka-san ni shukudai o tetsudatte moraimashita.',
        en: 'I had Tanaka-san help me with homework (received assistance).',
        note: '〜てもらう: Beneficiary perspective.'
      }
    ],
    senseiTip: 'Whenever someone does something nice for you, always use 〜てくれる or 〜てもらう — it shows immense Japanese politeness!',
    quizPrompt: 'MIYU Sensei, explain the direction of kindness between あげる, くれる, and もらう with practice dialogues!'
  },
  {
    id: 'n_desu_explanatory',
    titleJa: '〜んです / 〜のです (The Explanatory Mode)',
    titleEn: 'The Explanatory & Empathetic "〜んです"',
    formula: 'Plain Form + んです (n desu) / のです (formal)',
    summary: 'One of the most authentic conversational patterns in Japanese. Used to provide background explanations, ask for elaboration, or emphasize shared curiosity.',
    rules: [
      'Verbs/い-adj: Attach んです directly to plain form (行くんです, 痛いんです).',
      'Noun / な-adj: Attach なんです (休みなんです, 好きなんです).',
      'Asking "Why?": 「どうしたんですか？」(What happened?) or 「どうして遅れたんですか？」.',
      'Answering: 「頭が痛いんです」(It’s that I have a headache — explaining the underlying reason).'
    ],
    examples: [
      {
        ja: 'どうして きのう がっこうを やすんだんですか？',
        ro: 'Doushite kinou gakkou o yasunda n desu ka?',
        en: 'Why did you take off from school yesterday? (Seeking background)',
        note: 'Explanatory inquiry.'
      },
      {
        ja: 'ねつが あったんです。',
        ro: 'Netsu ga atta n desu.',
        en: 'It’s because I had a fever (explaining context).',
        note: 'Giving heartfelt explanation.'
      },
      {
        ja: 'この かばんは にほんで かったんです。',
        ro: 'Kono kaban wa Nihon de katta n desu.',
        en: 'It’s that I bought this bag in Japan (sharing context).',
        note: 'Providing conversational background.'
      }
    ],
    senseiTip: 'When you want to explain why you are late or why you like something, add 〜んです for instant native nuance!',
    quizPrompt: 'MIYU Sensei, teach me when and how to naturally use the explanatory 〜んです in conversations!'
  }
];

export const CONDITIONALS_CHAPTER: GrammarChapterItem[] = [
  {
    id: 'reasons_kara_node',
    titleJa: 'から vs ので (Expressing Cause & Reason)',
    titleEn: 'Because & Since: Subjective "から" vs Objective "ので"',
    formula: 'Clause A + から / ので, Clause B',
    summary: 'Both express "because" or "since", but they carry completely different social tones and communicative intentions.',
    rules: [
      'から (Kara): Subjective, personal conviction, emotional reason. Can be followed by suggestions, requests, or commands (暑いから、窓を開けてください).',
      'ので (Node): Objective, polite, factual, social circumstance. Softens statements to avoid sounding pushy or demanding. Preferred in business (電車が遅れたので、遅刻しました).',
      'Connection with nouns/な-adj: [Noun/な-adj] + だから vs [Noun/な-adj] + なので (e.g. 雨なので, 好きなので).'
    ],
    examples: [
      {
        ja: 'じかんが ありませんから、いそぎましょう！',
        ro: 'Jikan ga arimasen kara, isogimashou!',
        en: 'Because we don’t have time, let’s hurry! (Personal push)',
        note: 'Subjective urge with から.'
      },
      {
        ja: 'バスが こなかったので、タクシーに のりました。',
        ro: 'Basu ga konakatta node, takushii ni norimashita.',
        en: 'Since the bus did not come, I took a taxi (neutral fact).',
        note: 'Objective circumstance with ので.'
      },
      {
        ja: 'きょうは やすみなので、いえで ゆっくりします。',
        ro: 'Kyou wa yasumi na node, ie de yukkuri shimasu.',
        en: 'Since today is my day off, I will relax at home.',
        note: 'Noun + なので.'
      }
    ],
    senseiTip: 'When apologizing or asking a favor in business or polite society, always prefer ので — it sounds gentle and respectful!',
    quizPrompt: 'MIYU Sensei, quiz me on choosing between から and ので for different Japanese social situations!'
  },
  {
    id: 'conditionals_four',
    titleJa: '４大条件形：と・たら・ば・なら (The 4 Conditionals)',
    titleEn: 'The 4 Japanese "If / When" Conditionals',
    formula: 'と (Natural/Inevitable) | たら (General/Temporal) | ば (Hypothetical) | なら (Contextual)',
    summary: 'Japanese has 4 distinct conditional forms ("if" and "when"). Choosing the right one depends on natural consequence vs chronological order vs advice.',
    rules: [
      '1. 〜と (To): Natural, automatic, or scientific consequence ("Whenever A happens, B inevitably follows"). E.g. ボタンを押すと、水が出る (Press the button and water comes out). Cannot follow with commands or requests.',
      '2. 〜たら (Tara): General "if/after". Most versatile conditional in spoken Japanese! Forms with past tense + ら: 食べたら (if/when you eat), 雨が降ったら (if it rains). Allows requests and future actions.',
      '3. 〜ば (Ba): Pure hypothetical conditional ("Provided that A occurs"). E.g. 安ければ買います (If it is cheap, I will buy it).',
      '4. 〜なら (Nara): Contextual / topical ("If that is what you are talking about / If it is true"). E.g. 日本へ行くなら、京都がおすすめです (If you are going to Japan, I recommend Kyoto).'
    ],
    examples: [
      {
        ja: 'はるに なると、さくらが さきます。',
        ro: 'Haru ni naru to, sakura ga sakimasu.',
        en: 'When spring comes, cherry blossoms bloom (natural law).',
        note: 'Inevitable natural consequence with と.'
      },
      {
        ja: 'うちに かえったら、おふろに はいります。',
        ro: 'Uchi ni kaettara, ofuro ni hairimasu.',
        en: 'When I return home, I will take a bath.',
        note: 'Temporal chronological conditional with 〜たら.'
      },
      {
        ja: 'やすければ、ふたつ かいたいです。',
        ro: 'Yasukereba, futatsu kaitai desu.',
        en: 'If it is cheap, I want to buy two.',
        note: 'Hypothetical with 〜ば.'
      },
      {
        ja: 'にほんごを ならいたいなら、みゆせんせいが いちばんですよ！',
        ro: 'Nihongo o naraitai nara, Miyu sensei ga ichiban desu yo!',
        en: 'If you want to learn Japanese, Miyu Sensei is the best!',
        note: 'Topical advice with 〜なら.'
      }
    ],
    senseiTip: 'When in doubt in daily conversation, 〜たら is your safest and friendliest all-purpose conditional!',
    quizPrompt: 'MIYU Sensei, help me master the difference between と, たら, ば, and なら with practical examples!'
  }
];
