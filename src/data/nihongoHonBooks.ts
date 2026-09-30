export interface BookVocabItem {
  id: string;
  alphabet: string;
  romaji: string;
  hiragana: string;
  katakana: string;
  kanji: string;
  meaning: string;
  jlpt: string;
  type?: string;
  contextSentence?: string;
  contextSentenceMeaning?: string;
}

export interface BookGrammarItem {
  id: string;
  point: string;
  pattern: string;
  explanation: string;
  exampleInBook: string;
  exampleMeaning: string;
  particleFocus?: string;
}

export interface BookQuizQuestion {
  id: string;
  question: string;
  questionJa: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BookStudyGuide {
  summary: string;
  summaryJa?: string;
  podcastBriefing: string;
  keyThemes: string[];
  culturalNotes: string;
}

export interface NihongoBook {
  id: string;
  title: string;
  titleJa: string;
  author: string;
  authorJa: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  genre: string;
  coverGradient: string;
  tag: string;
  readTimeMinutes: number;
  text: string;
  paragraphs: Array<{
    ja: string;
    ro: string;
    en: string;
  }>;
  vocabulary: BookVocabItem[];
  grammar: BookGrammarItem[];
  studyGuide: BookStudyGuide;
  quizQuestions: BookQuizQuestion[];
  isCustom?: boolean;
}

export const DEFAULT_NIHONGO_BOOKS: NihongoBook[] = [
  {
    id: 'momotaro',
    title: 'Momotarō: The Peach Boy',
    titleJa: '桃太郎（ももたろう）',
    author: 'Traditional Japanese Folk Tale',
    authorJa: '日本昔話',
    level: 'N5',
    genre: 'Folk Tale / 昔話',
    coverGradient: 'from-pink-500 to-rose-600',
    tag: 'Classic N5-N4',
    readTimeMinutes: 4,
    text: `むかし、むかし、あるところに、おじいさんと おばあさんが いました。
おじいさんは 山へ 柴刈りに、おばあさんは 川へ 洗濯に 行きました。
おばあさんが 川で 洗濯をしていると、川上から 大きな 桃が どんぶらこ、どんぶらこと 流れてきました。
「おやおや、これは 大きな 桃だこと。家に 持って帰りましょう。」
おばあさんは 桃を 拾って、家に 持ち帰りました。
おじいさんと おばあさんが 桃を 切ろうとすると、中から 元気な 男の子が 生まれました。
桃から 生まれたので、「桃太郎」と 名付けました。
桃太郎は きびだんごを 食べて、ぐんぐん 大きくなりました。
ある日、桃太郎は「鬼ヶ島へ行って、悪い鬼を 退治してきます！」と 言いました。
おばあさんは 日本一の きびだんごを 作ってあげました。
道で 犬、猿、雉に 出会いました。「きびだんごを ひとつ くだされば、お供しましょう。」
桃太郎は なかまたちと いっしょに 鬼ヶ島へ 渡り、鬼を 見事に こらしめました。
宝物を 車に つんで、おじいさんと おばあさんの 家へ 無事に 帰りました。`,
    paragraphs: [
      {
        ja: 'むかし、むかし、あるところに、おじいさんと おばあさんが いました。おじいさんは 山へ 柴刈りに、おばあさんは 川へ 洗濯に 行きました。',
        ro: 'Mukashi, mukashi, aru tokoro ni, ojiisan to obaasan ga imashita. Ojiisan wa yama e shibakari ni, obaasan wa kawa e sentaku ni ikimashita.',
        en: 'Long, long ago, in a certain place, there lived an old man and an old woman. The old man went to the mountain to gather firewood, and the old woman went to the river to wash clothes.'
      },
      {
        ja: 'おばあさんが 川で 洗濯をしていると、川上から 大きな 桃が どんぶらこ、どんぶらこと 流れてきました。「おやおや、これは 大きな 桃だこと。家に 持って帰りましょう。」',
        ro: 'Obaasan ga kawa de sentaku o shite iru to, kawakami kara ookina momo ga donburako, donburako to nagarete kimashita. "Oyaoya, kore wa ookina momo da koto. Ie ni motte kaerimashou."',
        en: 'While the old woman was washing at the river, a huge peach came tumbling and floating down from upstream. "My, my, what a huge peach! Let me take it back home."'
      },
      {
        ja: 'おじいさんと おばあさんが 桃を 切ろうとすると、中から 元気な 男の子が 生まれました。桃から 生まれたので、「桃太郎」と 名付けました。',
        ro: 'Ojiisan to obaasan ga momo o kirou to suru to, naka kara genki na otokonoko ga umaremashita. Momo kara umareta node, "Momotarou" to nadzukemashita.',
        en: 'When the old man and woman tried to cut open the peach, a energetic baby boy was born from inside. Because he was born from a peach, they named him "Momotaro".'
      },
      {
        ja: '桃太郎は きびだんごを 食べて、ぐんぐん 大きくなりました。道で 犬、猿、雉と いっしょに 鬼ヶ島へ 行き、悪い鬼を 退治して、宝物を持って 帰りました。',
        ro: 'Momotarou wa kibi dango o tabete, gungun ookiku narimashita. Michi de inu, saru, kiji to issho ni Onigashima e iki, warui oni o taiji shite, takaramono o motte kaerimashita.',
        en: 'Momotaro ate millet dumplings and grew swiftly. Along the way, together with a dog, monkey, and pheasant, he went to Ogre Island, defeated the wicked ogres, and returned home with treasures.'
      }
    ],
    vocabulary: [
      {
        id: 'momo-1',
        alphabet: 'M',
        romaji: 'momo',
        hiragana: 'もも',
        katakana: 'モモ',
        kanji: '桃',
        meaning: 'peach',
        jlpt: 'N5',
        type: 'Noun',
        contextSentence: '川上から 大きな 桃が 流れてきました。',
        contextSentenceMeaning: 'A huge peach came floating down from upstream.'
      },
      {
        id: 'momo-2',
        alphabet: 'K',
        romaji: 'kawa',
        hiragana: 'かわ',
        katakana: 'カワ',
        kanji: '川',
        meaning: 'river',
        jlpt: 'N5',
        type: 'Noun',
        contextSentence: 'おばあさんは 川へ 洗濯に 行きました。',
        contextSentenceMeaning: 'The old woman went to the river to do laundry.'
      },
      {
        id: 'momo-3',
        alphabet: 'M',
        romaji: 'mukashi',
        hiragana: 'むかし',
        katakana: 'ムカシ',
        kanji: '昔',
        meaning: 'ancient times / long ago',
        jlpt: 'N5',
        type: 'Noun',
        contextSentence: 'むかし、むかし、あるところに...',
        contextSentenceMeaning: 'Long, long ago, in a certain place...'
      },
      {
        id: 'momo-4',
        alphabet: 'N',
        romaji: 'nagareru',
        hiragana: 'ながれる',
        katakana: 'ナガレル',
        kanji: '流れる',
        meaning: 'to flow / drift along',
        jlpt: 'N4',
        type: 'Ichidan Verb',
        contextSentence: '桃が どんぶらこと 流れてきました。',
        contextSentenceMeaning: 'The peach came floating bobbing along.'
      },
      {
        id: 'momo-5',
        alphabet: 'O',
        romaji: 'oni',
        hiragana: 'おに',
        katakana: 'オニ',
        kanji: '鬼',
        meaning: 'demon / ogre / oni',
        jlpt: 'N4',
        type: 'Noun',
        contextSentence: '鬼ヶ島へ行って、悪い鬼を 退治してきます！',
        contextSentenceMeaning: 'I will go to Ogre Island and defeat the wicked demons!'
      },
      {
        id: 'momo-6',
        alphabet: 'T',
        romaji: 'takaramono',
        hiragana: 'たからもの',
        katakana: 'タカラモノ',
        kanji: '宝物',
        meaning: 'treasure',
        jlpt: 'N4',
        type: 'Noun',
        contextSentence: '宝物を 車に つんで 帰りました。',
        contextSentenceMeaning: 'They loaded treasures onto a cart and returned home.'
      },
      {
        id: 'momo-7',
        alphabet: 'K',
        romaji: 'kibidango',
        hiragana: 'きびだんご',
        katakana: 'キビダンゴ',
        kanji: '黍団子',
        meaning: 'millet dumpling (famed power food)',
        jlpt: 'N3',
        type: 'Noun',
        contextSentence: '日本一の きびだんごを 作ってあげました。',
        contextSentenceMeaning: 'She made him the finest millet dumplings in Japan.'
      },
      {
        id: 'momo-8',
        alphabet: 'I',
        romaji: 'issho ni',
        hiragana: 'いっしょに',
        katakana: 'イッショニ',
        kanji: '一緒に',
        meaning: 'together (with)',
        jlpt: 'N5',
        type: 'Adverb / Particle phrase',
        contextSentence: 'なかまたちと いっしょに 鬼ヶ島へ 渡りました。',
        contextSentenceMeaning: 'Together with his companions, he crossed to Ogre Island.'
      }
    ],
    grammar: [
      {
        id: 'mg-1',
        point: 'いました (imasu) — Living existence',
        pattern: '[Place] に [Person/Living Creature] が いました',
        explanation: 'Used for living beings (humans, animals). Contrasts with あります (arimasu) used for inanimate objects like 桃 (peach) or 家 (house).',
        exampleInBook: 'あるところに、おじいさんと おばあさんが いました。',
        exampleMeaning: 'In a certain place, there lived (existed) an old man and an old woman.',
        particleFocus: 'に + が'
      },
      {
        id: 'mg-2',
        point: 'へ (e) — Directional particle',
        pattern: '[Place] へ [Movement Verb: 行く/帰る/渡る]',
        explanation: 'Written as hiragana "へ" but pronounced "e". Indicates movement toward a specific destination.',
        exampleInBook: 'おじいさんは 山へ 柴刈りに、おばあさんは 川へ 洗濯に 行きました。',
        exampleMeaning: 'The old man went to the mountain, and the old woman went to the river.',
        particleFocus: 'へ'
      },
      {
        id: 'mg-3',
        point: 'で (de) vs に (ni) — Action location',
        pattern: '[Place] で [Action Verb: 洗濯をする]',
        explanation: 'Marks the location where an active physical action occurs (川で洗濯をする = doing laundry at the river). Compare with に for existence.',
        exampleInBook: 'おばあさんが 川で 洗濯をしていると...',
        exampleMeaning: 'While the old woman was doing laundry at the river...',
        particleFocus: 'で'
      },
      {
        id: 'mg-4',
        point: '〜てくる (te kuru) — Movement toward the speaker',
        pattern: '[Verb Te-form] + くる / きました',
        explanation: 'Expresses an action coming toward the observer or speaker in time or space.',
        exampleInBook: '川上から 大きな桃が 流れてきました。',
        exampleMeaning: 'From upstream, a huge peach came floating toward her.',
        particleFocus: '〜てくる'
      },
      {
        id: 'mg-5',
        point: '〜と いっしょに (to issho ni) — Accompaniment',
        pattern: '[Partner] と いっしょに [Action]',
        explanation: 'Particle と means "with / and", followed by いっしょに (together).',
        exampleInBook: 'なかまたちと いっしょに 鬼ヶ島へ 行きました。',
        exampleMeaning: 'Together with his companions, he went to Ogre Island.',
        particleFocus: 'と'
      }
    ],
    studyGuide: {
      summary: 'Momotaro is Japan’s most famous folklore hero, celebrating filial love, bravery, teamwork, and virtue. It provides ideal introductory Japanese with high-frequency N5 particles (は, が, を, に, へ, で, と) and clear distinction of animate existence (いました).',
      summaryJa: '桃太郎は日本を代表するおとぎ話です。N5レベルの重要助詞（は・が・を・に・へ・で・と）や、有生物の存在動詞「いました」の生きた用例が豊富に詰まっています。',
      podcastBriefing: `[MIYU Sensei Audio Overview]
"Konnichiwa! Welcome to our Nihongo Hon deep-dive on Momotaro! Notice how the opening sentence introduces our characters with 'いました' instead of 'ありました' because the grandfather and grandmother are living people. Also listen closely to the onomatopoeia 'どんぶらこ、どんぶらこ' — this captures the buoyant tumbling motion of the giant peach bobbing down the mountain stream! When you read Japanese stories, pay attention to particles: 山へ uses 'e' for destination, while 川で uses 'de' because laundry is an active deed! Ganbatte!"`,
      keyThemes: ['Teamwork (協力)', 'Bravery & Virtue (勇気と徳)', 'Natural Elements in Japanese Lore'],
      culturalNotes: 'Kibi dango (millet cakes) are still a famous local specialty of Okayama Prefecture, which claims to be the birthplace of the Momotaro legend.'
    },
    quizQuestions: [
      {
        id: 'mq-1',
        question: 'What came floating down the river toward the grandmother?',
        questionJa: '川上から何が流れてきましたか？',
        options: ['大きな魚 (Big fish)', '大きな桃 (Huge peach)', '木の舟 (Wooden boat)', '宝箱 (Treasure box)'],
        correctIndex: 1,
        explanation: '大きな桃（もも）が「どんぶらこ」と流れてきました。'
      },
      {
        id: 'mq-2',
        question: 'Which existence verb was used for the grandfather and grandmother?',
        questionJa: 'おじいさんとおばあさんにはどの存在動詞が使われましたか？',
        options: ['ありました (arimashita)', 'いました (imashita)', 'なりました (narimashita)', 'きました (kimashita)'],
        correctIndex: 1,
        explanation: 'Living people take いました (imasu), while inanimate objects take ありました (arimasu).'
      },
      {
        id: 'mq-3',
        question: 'Which three animal companions accompanied Momotaro?',
        questionJa: '桃太郎のお供になった三匹の動物は何ですか？',
        options: ['猫、虎、熊 (Cat, Tiger, Bear)', '犬、猿、雉 (Dog, Monkey, Pheasant)', '狐、狸、兎 (Fox, Tanuki, Rabbit)', '馬、鹿、鳥 (Horse, Deer, Bird)'],
        correctIndex: 1,
        explanation: '犬（いぬ）、猿（さる）、雉（きじ）が黍団子をもらってお供になりました。'
      }
    ]
  },
  {
    id: 'chuumon',
    title: 'The Restaurant of Many Orders',
    titleJa: '注文の多い料理店（ちゅうもんのおおいりょうりてん）',
    author: 'Kenji Miyazawa',
    authorJa: '宮沢賢治（みやざわけんじ）',
    level: 'N3',
    genre: 'Classic Literature / 童話・名作',
    coverGradient: 'from-amber-600 to-emerald-700',
    tag: 'Miyazawa Kenji Masterpiece',
    readTimeMinutes: 6,
    text: `二人の若い紳士が、ぴかぴか光る鉄砲をかついで、山奥を歩いていました。
ずいぶん山奥で、鉄砲を撃つ獲物も一匹もいません。二人は腹がすいて、困ってしまいました。
その時、ふと見ると、立派な西洋料理店がありました。
看板には「西洋料理店 山猫軒（やまねこけん）」と 書いてあります。
「おや、こんな山奥に 西洋料理店が あるぞ。入ってみよう！」
ガラスの扉を開けると、金の文字で こう書いてありました。
『どなたもどうか お入りください。決して ご遠慮は ありません。』
二人は 大喜びで 扉を開けました。中に入ると、また 次の扉が ありました。
『当軒は 注文の多い料理店ですから、どうか ご承知ください。』
『髪をとかして、履物の泥を 落としてください。』
『鉄砲と 弾丸を ここに 置いてください。』
奥へ進むほど、奇妙な注文が 次々と 現れました。
『壺のクリームを 顔と手足に よく 塗り込んでください。』
二人は顔を見合わせました。「おい、これは ぼくたちを 食べるための 注文じゃないか？！」
その瞬間、二人は 震え上がりました。`,
    paragraphs: [
      {
        ja: '二人の若い紳士が、ぴかぴか光る鉄砲をかついで、山奥を歩いていました。ずいぶん山奥で、鉄砲を撃つ獲物も一匹もいません。二人は腹がすいて、困ってしまいました。',
        ro: 'Futari no wakai shinshi ga, pikapika hikaru teppou o katsuide, yamaoku o aruite imashita. Zuibun yamaoku de, teppou o utsu emono mo ippiki mo imasen. Futari wa hara ga suite, komatte shimaimashita.',
        en: 'Two young gentlemen, carrying sparkling guns on their shoulders, were walking deep in the mountains. It was so deep that there was not a single game animal to shoot. Hungry and exhausted, they were in trouble.'
      },
      {
        ja: 'その時、ふと見ると、立派な西洋料理店がありました。看板には「西洋料理店 山猫軒」と 書いてあります。「おや、こんな山奥に 西洋料理店が あるぞ。入ってみよう！」',
        ro: 'Sono toki, futo miru to, rippa na seiyou ryouriten ga arimashita. Kanban ni wa "Seiyou Ryouriten Yamanekoken" to kaite arimasu. "Oya, konna yamaoku ni seiyou ryouriten ga aru zo. Haitte miyou!"',
        en: 'Just then, looking up, they saw a splendid Western restaurant. The signboard read: "Western Restaurant Yamanekoken (Wildcat House)". "Oh, there is a Western restaurant in deep mountains! Let us go in!"'
      },
      {
        ja: 'ガラスの扉を開けると、金の文字で『どなたもどうか お入りください。決して ご遠慮は ありません。当軒は 注文の多い料理店ですから、どうか ご承知ください。』と ありました。',
        ro: 'Garasu no tobira o akeru to, kin no moji de "Donata mo douka ohairi kudasai. Kesshite go-enryo wa arimasen. Touken wa chuumon no ooi ryouriten desu kara, douka goshouchi kudasai." to arimashita.',
        en: 'Opening the glass door, they saw gold lettering: "Please feel free to enter, whoever you are. Do not hesitate at all. Please understand that this establishment is a restaurant with many orders."'
      },
      {
        ja: '奥へ進むと『壺のクリームを 顔と手足に よく 塗り込んでください。』と 書いてありました。「おい、これは ぼくたちを 料理して 食べるための 注文じゃないか？！」',
        ro: 'Oku e susumu to "Tsubo no kuriimu o kao to teashi ni yoku nurikonde kudasai." to kaite arimashita. "Oi, kore wa bokutachi o ryouri shite taberu tame no chuumon ja nai ka?!"',
        en: 'Advancing further inside, it read: "Please rub the cream from the jar thoroughly into your face, hands, and feet." "Hey... could these orders be instructions to prepare US as food?!"'
      }
    ],
    vocabulary: [
      {
        id: 'ch-1',
        alphabet: 'S',
        romaji: 'shinshi',
        hiragana: 'しんし',
        katakana: 'シンシ',
        kanji: '紳士',
        meaning: 'gentleman',
        jlpt: 'N3',
        type: 'Noun',
        contextSentence: '二人の若い紳士が 山奥を歩いていました。',
        contextSentenceMeaning: 'Two young gentlemen were walking deep in the mountains.'
      },
      {
        id: 'ch-2',
        alphabet: 'C',
        romaji: 'chuumon',
        hiragana: 'ちゅうもん',
        katakana: 'チュウモン',
        kanji: '注文',
        meaning: 'order / request / instruction',
        jlpt: 'N4',
        type: 'Noun / Suru Verb',
        contextSentence: '当軒は 注文の多い料理店です。',
        contextSentenceMeaning: 'This establishment is a restaurant with many orders/instructions.'
      },
      {
        id: 'ch-3',
        alphabet: 'T',
        romaji: 'tobira',
        hiragana: 'とびら',
        katakana: 'トビラ',
        kanji: '扉',
        meaning: 'door / portal',
        jlpt: 'N3',
        type: 'Noun',
        contextSentence: 'ガラスの扉を開けると、金の文字がありました。',
        contextSentenceMeaning: 'Opening the glass door, there were golden letters.'
      },
      {
        id: 'ch-4',
        alphabet: 'K',
        romaji: 'kanban',
        hiragana: 'かんばん',
        katakana: 'カンバン',
        kanji: '看板',
        meaning: 'signboard / billboard',
        jlpt: 'N3',
        type: 'Noun',
        contextSentence: '看板には「西洋料理店 山猫軒」と書いてあります。',
        contextSentenceMeaning: 'On the signboard was written "Western Restaurant Yamanekoken".'
      },
      {
        id: 'ch-5',
        alphabet: 'N',
        romaji: 'nurikomu',
        hiragana: 'ぬりこむ',
        katakana: 'ヌリコム',
        kanji: '塗り込む',
        meaning: 'to rub in thoroughly / smear on',
        jlpt: 'N2',
        type: 'Godan Verb',
        contextSentence: 'クリームを 顔と手足に よく塗り込んでください。',
        contextSentenceMeaning: 'Please rub the cream thoroughly into your face and limbs.'
      },
      {
        id: 'ch-6',
        alphabet: 'R',
        romaji: 'rippa',
        hiragana: 'りっぱ',
        katakana: 'リッパ',
        kanji: '立派',
        meaning: 'splendid / fine / grand',
        jlpt: 'N4',
        type: 'Na-adjective',
        contextSentence: '立派な西洋料理店がありました。',
        contextSentenceMeaning: 'There was a splendid Western restaurant.'
      }
    ],
    grammar: [
      {
        id: 'cg-1',
        point: '〜てあります (te arimasu) — State resulting from intentional action',
        pattern: '[Verb Te-form] + あります',
        explanation: 'Describes a state brought about purposefully by someone (someone wrote the sign: 書いてあります). Notice the subject takes が/は.',
        exampleInBook: '看板に「山猫軒」と 書いてあります。',
        exampleMeaning: 'On the signboard, "Yamanekoken" is written.',
        particleFocus: '〜てあります'
      },
      {
        id: 'cg-2',
        point: 'ありました vs いません — Contrasting Inanimate vs Animate',
        pattern: '料理店が ありました / 獲物が いません',
        explanation: 'A building (西洋料理店) exists with ありました, while forest prey animals (獲物) take いません.',
        exampleInBook: '西洋料理店が ありました。獲物も 一匹も いません。',
        exampleMeaning: 'There was a restaurant. There was not a single animal.',
        particleFocus: 'あります / います'
      },
      {
        id: 'cg-3',
        point: 'お〜ください (o... kudasai) — Keigo Polite Request',
        pattern: 'お + [Verb stem] + ください',
        explanation: 'Humble polite imperative used on public signs, hospitality, and customer service.',
        exampleInBook: 'どなたもどうか お入りください。',
        exampleMeaning: 'Whoever you are, please enter.',
        particleFocus: 'お〜ください'
      },
      {
        id: 'cg-4',
        point: '〜ための (tame no) — Purpose',
        pattern: '[Verb Dictionary Form / Noun の] + ための + [Noun]',
        explanation: 'Indicates purpose or intention ("for the purpose of doing X").',
        exampleInBook: 'ぼくたちを 料理して 食べるための 注文じゃないか？！',
        exampleMeaning: 'Aren’t these instructions for cooking and eating us?!',
        particleFocus: 'ための'
      }
    ],
    studyGuide: {
      summary: 'Kenji Miyazawa’s masterwork turns the concept of "restaurant customer orders" upside-down with eerie irony. The Japanese uses deceptive keigo (honorific hospitality) that masks the mountain wildcats’ culinary predator intentions.',
      summaryJa: '宮沢賢治の不朽の名作。丁寧な敬語（お入りください、ご遠慮ありません）と「〜てあります」の表現が、読者を不気味なサスペンスへと引き込みます。',
      podcastBriefing: `[MIYU Sensei Audio Overview]
"Sugoi choice! 'Chuumon no Ooi Ryouriten' is beloved across Japanese classrooms! Notice the wordplay on 'chuumon' (注文) — usually it means customer food orders, but here it means the house's strict demands on the guests! Also study the grammar '書いてあります' — this is JLPT N4 grammar meaning 'it has been written and remains in that state'. When you study Japanese literature, the tone of keigo can completely change the suspense! Ganbatte!"`,
      keyThemes: ['Nature vs Human hubris', 'Eerie Irony & Keigo subversion', 'Miyazawa Kenji’s poetic rhythm'],
      culturalNotes: 'Miyazawa Kenji lived in Iwate Prefecture. Many of his stories reflect the atmospheric, mist-shrouded northern mountains of Tohoku.'
    },
    quizQuestions: [
      {
        id: 'cq-1',
        question: 'What was written on the signboard of the mountain restaurant?',
        questionJa: '山奥の料理店の看板には何と書いてありましたか？',
        options: ['熊の宿 (Bear Inn)', '山猫軒 (Wildcat House)', '白樺堂 (White Birch House)', '富士亭 (Fuji Pavilion)'],
        correctIndex: 1,
        explanation: '「西洋料理店 山猫軒（やまねこけん）」と書いてありました。'
      },
      {
        id: 'cq-2',
        question: 'What did the cream from the jar turn out to be for?',
        questionJa: '壺のクリームを体に塗る注文は何のためでしたか？',
        options: ['乾燥を防ぐため (Prevent dryness)', '紳士たちを料理して食べるため (To cook & eat the gentlemen)', 'マッサージのため (For massage)', '香水代わり (Perfume substitute)'],
        correctIndex: 1,
        explanation: '山猫たちが人間を美味しく味付けして食べるための下ごしらえでした！'
      }
    ]
  },
  {
    id: 'kasajizo',
    title: 'Kasa Jizō: The Straw Hats for the Statues',
    titleJa: '笠地蔵（かさじぞう）',
    author: 'Traditional Winter Folk Tale',
    authorJa: '日本昔話（雪国の伝説）',
    level: 'N4',
    genre: 'Winter Folk Legend / 雪国の昔話',
    coverGradient: 'from-blue-600 to-indigo-800',
    tag: 'Heartwarming Folk Classic',
    readTimeMinutes: 5,
    text: `むかし、ある貧しい村に、心優しいおじいさんと おばあさんが 住んでいました。
明日は お正月だというのに、家には お米も お金も ありませんでした。
「お正月のお餅を買うために、菅笠（すげがさ）を 作って 町へ 売りに行きましょう。」
おじいさんは 笠を 五つ 作って、雪の中を 町へ 出かけました。
しかし、大雪のせいで 町には 人が ほとんど いませんでした。
笠は 一つも 売れませんでした。
おじいさんが がっかりして 村へ 帰る途中、道端に 六体の お地蔵様が 雪をかぶって 立っていました。
「ああ、冷たい雪が 降って、お地蔵様も 寒かろう。」
おじいさんは 売れ残った 五つの 笠を、一体ずつ お地蔵様の 頭に かぶせました。
でも、お地蔵様は 六体あります。笠が 一つ 足りません。
おじいさんは 自分の 手ぬぐいを とって、最後のお地蔵様の 頭に 優しく 巻いてあげました。
家に帰ると、おばあさんは 怒るどころか、「それは 良いことを しましたね」と 喜びました。
その夜、外から「ずっしり、ずっしり」と 重い足音が 聞こえてきました。
「笠をくれた じいさんの家は どこだ？ 手ぬぐいをくれた じいさんの家は どこだ？」
戸を開けると、庭に 山のような お米と お餅、そして 豪華な 宝物が 届いていました。
遠くを見ると、笠をかぶった 六体の お地蔵様の後ろ姿が、雪の中に 消えていきました。`,
    paragraphs: [
      {
        ja: 'むかし、ある貧しい村に、心優しいおじいさんと おばあさんが 住んでいました。明日は お正月だというのに、家には お米も お金も ありませんでした。',
        ro: 'Mukashi, aru mazushii mura ni, kokoroyasashii ojiisan to obaasan ga sunde imashita. Ashita wa oshougatsu da to iu no ni, ie ni wa okome mo okane mo arimasen deshita.',
        en: 'Long ago, in a poor village, there lived a kind-hearted old man and woman. Even though tomorrow was New Year’s Day, there was neither rice nor money in the house.'
      },
      {
        ja: 'おじいさんが 町から 帰る途中、道端に 六体の お地蔵様が 雪をかぶって 立っていました。「冷たい雪が 降って、お地蔵様も 寒かろう。」',
        ro: 'Ojiisan ga machi kara kaeru tochuu, michibata ni rokutai no ojizou-sama ga yuki o kabutte tatte imashita. "Tsumetai yuki ga futte, ojizou-sama mo samukarou."',
        en: 'On his way home from town, six Jizo statues were standing by the roadside covered in snow. "Cold snow is falling; the Jizo statues must be shivering cold."'
      },
      {
        ja: 'おじいさんは 五つの笠を かぶせ、足りない一体には 自分の手ぬぐいを 巻いてあげました。「それは 良いことを しましたね」と おばあさんも 喜びました。',
        ro: 'Ojiisan wa itsutsu no kasa o kabuse, tarinai ittai ni wa jibun no tenugui o maite agemashita. "Sore wa yoi koto o shimashita ne" to obaasan mo yorokobimashita.',
        en: 'The old man placed the five hats on them, and on the one remaining statue, he gently wrapped his own head towel. "You did a wonderful deed," the old woman rejoiced.'
      },
      {
        ja: 'その夜、雪の中から 六体の お地蔵様が お米や お餅、たくさんの宝物を 運んできてくれました。',
        ro: 'Sono yoru, yuki no naka kara rokutai no ojizou-sama ga okome ya omochi, takusan no takaramono o hakonde kite kuremashita.',
        en: 'That night, out of the snow, the six Jizo statues came carrying rice, rice cakes, and abundant treasures to thank them.'
      }
    ],
    vocabulary: [
      {
        id: 'kj-1',
        alphabet: 'K',
        romaji: 'kasa',
        hiragana: 'かさ',
        katakana: 'カサ',
        kanji: '笠',
        meaning: 'woven straw hat (kasa)',
        jlpt: 'N4',
        type: 'Noun',
        contextSentence: '笠を 五つ 作って 町へ 売りに行きました。',
        contextSentenceMeaning: 'He made five straw hats and went to town to sell them.'
      },
      {
        id: 'kj-2',
        alphabet: 'J',
        romaji: 'jizou',
        hiragana: 'じぞう',
        katakana: 'ジゾウ',
        kanji: '地蔵',
        meaning: 'Jizo (protective stone Buddhist bodhisattva)',
        jlpt: 'N3',
        type: 'Noun',
        contextSentence: '道端に 六体の お地蔵様が 立っていました。',
        contextSentenceMeaning: 'By the roadside, six Jizo statues were standing.'
      },
      {
        id: 'kj-3',
        alphabet: 'Y',
        romaji: 'yuki',
        hiragana: 'ゆき',
        katakana: 'ユキ',
        kanji: '雪',
        meaning: 'snow',
        jlpt: 'N5',
        type: 'Noun',
        contextSentence: '冷たい雪が 降って、お地蔵様も 寒かろう。',
        contextSentenceMeaning: 'Cold snow is falling, the Jizo statues must be cold.'
      },
      {
        id: 'kj-4',
        alphabet: 'M',
        romaji: 'mochi',
        hiragana: 'もち',
        katakana: 'モチ',
        kanji: '餅',
        meaning: 'pounded rice cake (traditional New Year food)',
        jlpt: 'N4',
        type: 'Noun',
        contextSentence: 'お正月のお餅を買うために 町へ行きました。',
        contextSentenceMeaning: 'He went to town to buy New Year rice cakes.'
      },
      {
        id: 'kj-5',
        alphabet: 'T',
        romaji: 'tenugui',
        hiragana: 'てぬぐい',
        katakana: 'テヌグイ',
        kanji: '手ぬぐい',
        meaning: 'traditional Japanese cotton hand towel',
        jlpt: 'N3',
        type: 'Noun',
        contextSentence: '自分の手ぬぐいを とって、頭に 巻いてあげました。',
        contextSentenceMeaning: 'He took off his own hand towel and wrapped it around its head.'
      }
    ],
    grammar: [
      {
        id: 'kg-1',
        point: 'ありませんでした — Inanimate Non-existence (Past Negative)',
        pattern: '[Inanimate Thing: お米/お金] は/も ありませんでした',
        explanation: 'Past negative form of あります (arimasu). Used for things without biological will.',
        exampleInBook: '家には お米も お金も ありませんでした。',
        exampleMeaning: 'In the house, there was neither rice nor money.',
        particleFocus: 'ありませんでした'
      },
      {
        id: 'kg-2',
        point: '〜てあげる (te ageru) — Performing a kindness for someone',
        pattern: '[Verb Te-form] + あげる / あげました',
        explanation: 'Indicates giving an action as a favor or act of goodwill to another.',
        exampleInBook: '頭に 優しく 巻いてあげました。',
        exampleMeaning: 'He gently wrapped it around its head for it.',
        particleFocus: '〜てあげる'
      },
      {
        id: 'kg-3',
        point: '〜てくれる (te kureru) — Someone doing a favor for the speaker',
        pattern: '[Verb Te-form] + くれる / くれました',
        explanation: 'Opposite of あげる: marks when someone else graciously does an action benefiting me/us.',
        exampleInBook: 'たくさんの宝物を 運んできてくれました。',
        exampleMeaning: 'They kindly carried many treasures over for them.',
        particleFocus: '〜てくれる'
      }
    ],
    studyGuide: {
      summary: 'Kasa Jizo is a touching winter story showcasing selfless compassion. It illustrates pair-counter grammar (体 - tai for statues, つ - tsu for hats) and the benefactive verbs pair: 〜てあげる (giving a favor) and 〜てくれる (receiving a favor).',
      summaryJa: '日本の代表的な冬の民話。無私の優しさと恩返しを描いており、「〜てあげる」と「〜てくれる」の授受表現（benefactive verbs）を学ぶのに最高のテキストです。',
      podcastBriefing: `[MIYU Sensei Audio Overview]
"Konnichiwa! Kasa Jizo touches every Japanese person's heart! Notice how the grandfather uses '〜てあげました' when tying his own towel onto the cold stone statue, and then the Jizo statues use '〜てくれました' when delivering gifts! Mastering 〜てあげる and 〜てくれる is one of the biggest milestones in JLPT N4 grammar! Also notice the existence expression: 'お米もお金もありませんでした' — inanimate past negative! Let us review the vocabulary together!"`,
      keyThemes: ['Compassion & Generosity', 'Karma & Gratitude (恩返し)', 'New Year Customs in Japan'],
      culturalNotes: 'Jizo statues are beloved protectors of travelers and children in Japan, often dressed with red bibs and caps by villagers.'
    },
    quizQuestions: [
      {
        id: 'kq-1',
        question: 'Why did the old man put his own towel on the 6th Jizo statue?',
        questionJa: 'おじいさんはなぜ6体目の地蔵様に手ぬぐいを巻いたのですか？',
        options: ['笠が一つ足りなかったから (Because one hat was missing)', '手ぬぐいの方が暖かかったから (Because towel was warmer)', '間違えたから (By mistake)', '売り物ではなかったから (Not for sale)'],
        correctIndex: 0,
        explanation: '笠は5つしかなく、お地蔵様は6体あったため、自分の手ぬぐいを巻いてあげました。'
      },
      {
        id: 'kq-2',
        question: 'Which grammar expresses someone graciously doing an action FOR you?',
        questionJa: '「相手が自分のために親切をしてくれる」ことを表す文法はどれですか？',
        options: ['〜てあげる', '〜てくれる', '〜てもらう', '〜ていく'],
        correctIndex: 1,
        explanation: 'お地蔵様が宝物を「運んできてくれました」のように、〜てくれるを使います。'
      }
    ]
  },
  {
    id: 'bocchan',
    title: 'Bocchan: Chapter 1 Excerpt',
    titleJa: '坊っちゃん（ぼっちゃん - 冒頭）',
    author: 'Natsume Sōseki',
    authorJa: '夏目漱石（なつめそうせき）',
    level: 'N2',
    genre: 'Modern Classic / 近代文学の金字塔',
    coverGradient: 'from-slate-700 to-cyan-900',
    tag: 'Soseki Masterpiece',
    readTimeMinutes: 4,
    text: `親譲りの無鉄砲で小供の時から損ばかりしている。
小学校に居る時分、学校の二階から飛び降りて、一週間ほど腰を抜かした事がある。
なぜそんな無闇をしたと聞く人があるかも知れぬ。
別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に「いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい」と 囃したからである。
小使に負ぶさって帰って来た時、おやじが大きな眼をして「二階ぐらいから飛び降りて腰を抜かす奴があるか」と 言ったから、
この次は抜かさずに飛んで見せますと答えた。`,
    paragraphs: [
      {
        ja: '親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分、学校の二階から飛び降りて、一週間ほど腰を抜かした事がある。',
        ro: 'Oyayuzuri no muteppou de kodomo no toki kara son bakari shite iru. Shou gakkou ni iru jibun, gakkou no nikai kara tobiorite, isshuukan hodo koshi o nukashita koto ga aru.',
        en: 'Inheriting recklessness from my parents, I have done nothing but lose out since childhood. When I was in primary school, I once jumped from the second floor of the schoolhouse and was paralyzed in the waist for about a week.'
      },
      {
        ja: 'なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。同級生が「飛び降りる事は出来まい。弱虫やーい」と 囃したからである。',
        ro: 'Naze sonna muyami o shita to kiku hito ga aru kamo shirenu. Betsudan fukai riyuu demo nai. Doukyuusei ga "Tobioriru koto wa dekimai. Yowamushi yaai" to hayashita kara de aru.',
        en: 'People might ask why I did such a reckless thing. There was no particularly deep reason. A classmate teased me, shouting: "No matter how you boast, you could never jump from there! Coward!"'
      },
      {
        ja: 'おやじが「二階ぐらいから飛び降りて腰を抜かす奴があるか」と言ったから、「この次は抜かさずに飛んで見せます」と答えた。',
        ro: 'Oyaji ga "Nikai gurai kara tobiorite koshi o nukasu yatsu ga aru ka" to itta kara, "Kono tsugi wa nukasazu ni tonde misemasu" to kotaeta.',
        en: 'My father gave me a glare and said, "What kind of fellow dislocates his back jumping from merely the second floor?!" So I retorted, "Next time I will jump without pulling my back and show you!"'
      }
    ],
    vocabulary: [
      {
        id: 'bc-1',
        alphabet: 'O',
        romaji: 'oyayuzuri',
        hiragana: 'おやゆずり',
        katakana: 'オヤユズリ',
        kanji: '親譲り',
        meaning: 'inherited from one’s parents',
        jlpt: 'N1',
        type: 'Noun',
        contextSentence: '親譲りの無鉄砲で小供の時から損ばかりしている。',
        contextSentenceMeaning: 'Inheriting recklessness from my parents, I have done nothing but lose out.'
      },
      {
        id: 'bc-2',
        alphabet: 'M',
        romaji: 'muteppou',
        hiragana: 'むてっぽう',
        katakana: 'ムテッポウ',
        kanji: '無鉄砲',
        meaning: 'reckless / daredevil / rash',
        jlpt: 'N2',
        type: 'Na-adjective / Noun',
        contextSentence: '親譲りの無鉄砲で損ばかりしている。',
        contextSentenceMeaning: 'Because of reckless impetuousness, I have lost out constantly.'
      },
      {
        id: 'bc-3',
        alphabet: 'S',
        romaji: 'son',
        hiragana: 'そん',
        katakana: 'ソン',
        kanji: '損',
        meaning: 'loss / disadvantage',
        jlpt: 'N3',
        type: 'Noun / Suru Verb',
        contextSentence: '小供の時から損ばかりしている。',
        contextSentenceMeaning: 'Since childhood I have done nothing but lose out.'
      },
      {
        id: 'bc-4',
        alphabet: 'T',
        romaji: 'tobioriru',
        hiragana: 'とびおりる',
        katakana: 'トビオリル',
        kanji: '飛び降りる',
        meaning: 'to jump down / leap off',
        jlpt: 'N3',
        type: 'Ichidan Verb',
        contextSentence: '学校の二階から飛び降りました。',
        contextSentenceMeaning: 'He jumped down from the second floor of the school.'
      },
      {
        id: 'bc-5',
        alphabet: 'Y',
        romaji: 'yowamushi',
        hiragana: 'よわむし',
        katakana: 'ヨワムシ',
        kanji: '弱虫',
        meaning: 'coward / weakling',
        jlpt: 'N3',
        type: 'Noun',
        contextSentence: '弱虫やーいと囃したからである。',
        contextSentenceMeaning: 'Because he taunted me shouting "Coward!"'
      }
    ],
    grammar: [
      {
        id: 'bg-1',
        point: '〜ばかりしている (bakari shite iru) — Doing nothing but X',
        pattern: '[Noun / Verb Te-form] + ばかり いる',
        explanation: 'Expresses exclusive or excessive repetition of a state or action ("doing nothing except...").',
        exampleInBook: '小供の時から 損ばかりしている。',
        exampleMeaning: 'Ever since childhood I have been suffering nothing but losses.',
        particleFocus: 'ばかり'
      },
      {
        id: 'bg-2',
        point: '〜た事がある (ta koto ga aru) — Past Experience',
        pattern: '[Verb Ta-form] + ことがある',
        explanation: 'Indicates historical personal experience ("have done before").',
        exampleInBook: '一週間ほど 腰を抜かした事がある。',
        exampleMeaning: 'I once had the experience of dislocating my back for about a week.',
        particleFocus: '〜たことがある'
      },
      {
        id: 'bg-3',
        point: '〜て見せる (te miseru) — Resolution to show by doing',
        pattern: '[Verb Te-form] + みせる',
        explanation: 'Expresses stubborn determination to prove something to another person through action.',
        exampleInBook: 'この次は 抜かさずに 飛んで見せます。',
        exampleMeaning: 'Next time, I will jump and show you without pulling my back!',
        particleFocus: '〜てみせる'
      }
    ],
    studyGuide: {
      summary: 'Natsume Soseki’s Bocchan features one of the most famous opening lines in modern Japanese literature. The protagonist’s fiery Tokyo Edo-style candor makes it a treasure trove for expressive N2 sentence patterns.',
      summaryJa: '夏目漱石の代表作『坊っちゃん』の有名な書き出し。「〜ばかりしている」「〜てみせる」など、江戸っ子の小気味よい語り口と生きた実用表現が凝縮されています。',
      podcastBriefing: `[MIYU Sensei Audio Overview]
"Bocchan's first line is legendary in Japan! '親譲りの無鉄砲で小供の時から損ばかりしている' — look at '〜ばかりしている'! That is N3/N2 grammar indicating doing nothing but one thing! Also notice '飛んで見せます' — here '〜てみせる' does not mean showing a movie; it means 'I will stubbornly prove it to you by action!' Soseki captures the proud, impulsive spirit of Tokyo! Let's examine the kanji!"`,
      keyThemes: ['Edo-temperament (江戸っ子気質)', 'Honesty vs Compromise', 'Soseki’s crisp prose'],
      culturalNotes: 'Bocchan is set in Matsuyama, Ehime Prefecture on Shikoku island, where the historic Dogo Onsen is visited by travelers celebrating the novel.'
    },
    quizQuestions: [
      {
        id: 'bq-1',
        question: 'Why did the protagonist jump from the second floor of the school?',
        questionJa: '主人公はなぜ学校の二階から飛び降りたのですか？',
        options: ['火事があったから (Because of fire)', '同級生に弱虫とはやされたから (Because classmate taunted him as coward)', '先生に言われたから (Told by teacher)', '鳥を捕まえるため (To catch a bird)'],
        correctIndex: 1,
        explanation: '同級生から「弱虫やーい」とはやされ、挑発に乗って飛び降りました。'
      }
    ]
  },
  {
    id: 'notebooklm_guide',
    title: 'Google NotebookLM: Japanese Study Companion',
    titleJa: 'Google NotebookLM：日本語学習の最強パートナー',
    author: 'kumaGO 橋 Academic Lab',
    authorJa: 'くまGO研究室',
    level: 'N5',
    genre: 'Practical Study Guide / ガイド',
    coverGradient: 'from-violet-600 to-indigo-700',
    tag: 'NotebookLM Integration',
    readTimeMinutes: 3,
    text: `Googleの NotebookLMと kumaGOが 連携しました。
ここでは、あなたの好きな 本や 日本語の記事を 自由に アップロードできます。
アップロードした文章から、MIYU先生が 重要な 単語リストと 文法解説を 自動で 抽出します。
辞書を 引かなくても、ワンクリックで 単語帳に 追加できます。
「この文の 文法を 教えて」「JLPT N5の 動詞を まとめて」と MIYU先生に 質問してください。
あなたの 本を 教科書にして、いっしょに 楽しく 日本語を 学びましょう！`,
    paragraphs: [
      {
        ja: 'Googleの NotebookLMと kumaGOが 連携しました。ここでは、あなたの好きな 本や 日本語の記事を 自由に アップロードできます。',
        ro: 'Google no NotebookLM to kumaGO ga renkei shimashita. Koko de wa, anata no sukina hon ya nihongo no kiji o jiyuu ni appuroodo dekimasu.',
        en: 'Google NotebookLM and kumaGO have integrated. Here, you can freely upload your favorite books and Japanese articles.'
      },
      {
        ja: 'アップロードした文章から、MIYU先生が 重要な 単語リストと 文法解説を 自動で 抽出します。ワンクリックで 単語帳に 追加できます。',
        ro: 'Appuroodo shita bunshou kara, MIYU sensei ga juuyou na tango risuto to bunpou kaisetsu o jidou de chuushutsu shimasu. Wan kuri-kku de tangochou ni tsuika dekimasu.',
        en: 'From the uploaded text, Miyu Sensei automatically extracts key vocabulary lists and grammar notes. With one click, you can add them to your vocab notebook.'
      },
      {
        ja: '「この文の 文法を 教えて」と MIYU先生に 質問してください。あなたの 本を 教科書にして、いっしょに 日本語を 学びましょう！',
        ro: '"Kono bun no bunpou o oshiete" to MIYU sensei ni shitsumon shite kudasai. Anata no hon o kyoukasho ni shite, issho ni nihongo o manabimashou!',
        en: 'Please ask Miyu Sensei questions like "Explain the grammar of this sentence." Turn your books into textbooks and let us enjoy learning Japanese together!'
      }
    ],
    vocabulary: [
      {
        id: 'nb-1',
        alphabet: 'H',
        romaji: 'hon',
        hiragana: 'ほん',
        katakana: 'ホン',
        kanji: '本',
        meaning: 'book',
        jlpt: 'N5',
        type: 'Noun',
        contextSentence: '好きな 本を 自由に アップロードできます。',
        contextSentenceMeaning: 'You can freely upload books you like.'
      },
      {
        id: 'nb-2',
        alphabet: 'T',
        romaji: 'tango',
        hiragana: 'たんご',
        katakana: 'タンゴ',
        kanji: '単語',
        meaning: 'word / vocabulary',
        jlpt: 'N5',
        type: 'Noun',
        contextSentence: '重要な 単語リストを 自動で 抽出します。',
        contextSentenceMeaning: 'Automatically extracts essential vocabulary lists.'
      },
      {
        id: 'nb-3',
        alphabet: 'B',
        romaji: 'bunpou',
        hiragana: 'ぶんぽう',
        katakana: 'ブンポウ',
        kanji: '文法',
        meaning: 'grammar',
        jlpt: 'N5',
        type: 'Noun',
        contextSentence: '文法解説を 自動で 抽出します。',
        contextSentenceMeaning: 'Automatically extracts grammar explanations.'
      },
      {
        id: 'nb-4',
        alphabet: 'M',
        romaji: 'manabu',
        hiragana: 'まなぶ',
        katakana: 'マナブ',
        kanji: '学ぶ',
        meaning: 'to learn / to study',
        jlpt: 'N4',
        type: 'Godan Verb',
        contextSentence: 'いっしょに 楽しく 日本語を 学びましょう！',
        contextSentenceMeaning: 'Let’s enjoy studying Japanese together!'
      }
    ],
    grammar: [
      {
        id: 'nbg-1',
        point: '〜が できます (ga dekimasu) — Potential / Capability',
        pattern: '[Noun] が できます / [Verb Dict form + こと] が できます',
        explanation: 'Indicates ability or possibility ("can do X").',
        exampleInBook: 'ワンクリックで 単語帳に 追加できます。',
        exampleMeaning: 'You can add to your vocabulary notebook with one click.',
        particleFocus: 'が できます'
      },
      {
        id: 'nbg-2',
        point: '〜を 教科書にして (o kyoukasho ni shite) — Using X as Y',
        pattern: '[Noun A] を [Noun B] に して',
        explanation: 'Indicates taking A and turning or adopting it into B.',
        exampleInBook: 'あなたの 本を 教科書にして...',
        exampleMeaning: 'Making your book into a textbook...',
        particleFocus: 'を〜にして'
      }
    ],
    studyGuide: {
      summary: 'Overview of how Google NotebookLM technology transforms custom Japanese reading material into interactive vocabulary cards, grammar breakdowns, audio overviews, and grounded conversation with MIYU Sensei.',
      summaryJa: 'Google NotebookLMの独自技術とkumaGOの融合。読みたい本やテキストを即座に教材化し、単語・文法・音声まとめをワンストップで習得できます。',
      podcastBriefing: `[MIYU Sensei Audio Overview]
"Sugoi! You are using the new Nihongo Hon panel powered by Google NotebookLM concepts! You can click the '+ Upload Book' button at any time to drop in your own Japanese essays, fairy tales, lyrics, or web articles. I will analyze the text, extract every JLPT vocabulary word with kanji, hiragana, katakana, and romaji, break down the particles and sentence patterns, and even quiz you! Let's get started!"`,
      keyThemes: ['Personalized Immersion', 'Source Grounding', 'Contextual Japanese Acquisition'],
      culturalNotes: 'Reading native-sourced texts (多読 - Tadoku, extensive reading) has been proven by linguists to accelerate Japanese fluency faster than isolated flashcard drills.'
    },
    quizQuestions: [
      {
        id: 'nbq-1',
        question: 'What does the Nihongo Hon panel allow you to upload?',
        questionJa: '日本語本パネルでは何を自由にアップロードできますか？',
        options: ['好きな本や日本語の記事 (Favorite books and Japanese articles)', '音楽ファイルのみ (Only audio files)', '動画のみ (Only video files)', '写真のみ (Only photos)'],
        correctIndex: 0,
        explanation: '好きな本やテキストをアップロードして、単語リストや文法を自動抽出できます。'
      }
    ]
  }
];
