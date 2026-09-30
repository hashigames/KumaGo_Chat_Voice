# Japanese Business, Workplace, Classroom, and Study Phrases
# (romaji, hiragana, katakana, kanji, meaning, topic)
DATA = [
    # A
    ("a, chotto shitsumon ga arimasu", "あ、ちょっとしつもんがあります", "ア、チョットシツモンガアリマス", "あ、一寸質問があります", "Ah, I have a quick question!", "Classroom & Study"),
    ("a, kore de gasshou de yoroshii?", "あ、これでがっしょうでよろしいですか？", "ア、コレデガッショウデヨロシイデスカ？", "あ、これで合意で宜しいですか？", "Are we in full alignment on this?", "Work & Business"),
    ("ano, meiru o souxin shimashita", "あの、めーるをそうしんしました", "アノ、メールヲソウシンシマシタ", "あの、メールを送信しました", "Hello, I have just dispatched the email.", "Work & Business"),
    ("ano, shiryou o haifu shimasu", "あの、しりょうをはいふします", "アノ、シリョウヲハイフシマス", "あの、資料を配布します", "I will distribute the meeting handouts now.", "Work & Business"),
    ("ano, teisyutsu-kigen wa itsu?", "あの、ていしゅつきげんはいつですか？", "アノ、テイシュツキゲンワイツデスカ？", "あの、提出期限は何時ですか？", "When is the submission deadline?", "Classroom & Study"),
    ("arakajime gorenraku itashimasu", "あらかじめごれんらくいたします", "アラカジメゴレンラクイタシマス", "予めご連絡いたします", "I am contacting you in advance.", "Work & Business"),
    ("arigatou gozaimasu, tasukari-masu", "ありがとうございます、たすかります", "アリガトウゴザイマス、タスカリマス", "ありがとうございます、助かります", "Thank you so much, that helps immensely!", "Work & Business"),

    # B
    ("betsu-shi o goran kudasai", "べっしをごらんください", "ベッシヲゴランクダサイ", "別紙をご覧ください", "Please refer to the attached appendix sheet.", "Work & Business"),
    ("bijinesu-maanaa o manabou", "びじねすまなーをまなぼう", "ビジネスマナーヲマナボウ", "ビジネスマナーを学ぼう", "Let's master Japanese business etiquette!", "Classroom & Study"),
    ("boushi-saku o kangaemashou", "ぼうしさくをかんがえましょう", "ボウシサクヲカンガエマショウ", "防止策を考えましょう", "Let's devise preventive countermeasures.", "Work & Business"),

    # C
    ("chakujitsu ni susunde imasu", "ちゃくじつにすすんでいます", "チャクジツニススンデイマス", "着実に進んでいます", "Everything is progressing steadily.", "Work & Business"),
    ("chanto fukushuu shimashou", "ちゃんとふくしゅうしましょう", "チャントフクシュウシマショウ", "ちゃんと復習しましょう", "Let's do a thorough review of the material!", "Classroom & Study"),
    ("choutatsu no meido ga tachimashita", "ちょうたつのめどがたちました", "チョウタツノメドガタチマシタ", "調達の目処が立ちました", "Procurement outlook is now cleared.", "Work & Business"),

    # D
    ("dai-ichi dankai ga kanryou shita", "だいいちだんかいがかんりょうしました", "ダイイチダンカイガカンリョウシマシタ", "第一段階が完了しました", "Phase one has been successfully finalized.", "Work & Business"),
    ("daitan na teian desu ga", "だいたんなていあんですが", "ダイタンナテイアンデスガ", "大胆な提案ですが", "This may be a bold proposal, but...", "Work & Business"),
    ("denshi-ketsujou o onegai shimasu", "でんしけつじょうをおねがいします", "デンシケツジョウヲオネガイシマス", "電子決裁をお願いします", "Please grant electronic managerial approval.", "Work & Business"),
    ("douzo goran kudasai", "どうぞごらんください", "ドウゾゴランクダサイ", "どうぞご覧ください", "Please take a look at the slides.", "Work & Business"),

    # E
    ("eikyou-han'i o kenshou shimasu", "えいきょうはんいをつきとめます", "エイキョウハンイヲツキトメマス", "影響範囲を特定します", "We will determine the scope of impact.", "Work & Business"),
    ("enman na koushou o mezashimasu", "えんまんなこうしょうをめざします", "エンマンナコウショウヲメザシマス", "円満な交渉を目指します", "We aim for an amicable, win-win negotiation.", "Work & Business"),

    # G
    ("gaiyou o go-setsumei shimasu", "がいようをごせつめいします", "ガイヨウヲゴセツメイシマス", "概要をご説明します", "I will outline the executive summary.", "Work & Business"),
    ("gakkai de happyou shimasu", "がっかいではっぴょうします", "ガッカイデハッピョウシマス", "学会で発表します", "Presenting findings at academic symposium.", "Classroom & Study"),
    ("genjou no kadai o seiri shiyou", "げんじょうのかだいをせいりしよう", "ゲンジョウノカダイヲセイリシヨウ", "現状の課題を整理しよう", "Let's synthesize current core challenges.", "Work & Business"),
    ("go-kentou no hodo onegai shimasu", "ごけんとうのほどおねがいします", "ゴケントウノホドオネガイシマス", "ご検討の程お願いします", "We humbly appreciate your kind consideration.", "Work & Business"),
    ("go-kyouryoku arigatou gozaimasu", "ごきょうりょくありがとうございます", "ゴキョウリョクアリガトウゴザイマス", "ご協力ありがとうございます", "Thank you very much for your cooperation!", "Work & Business"),
    ("go-renraku kudasari kansha shimasu", "ごれんらくくださりかんしゃします", "ゴレンラククダサリカンシャシマス", "ご連絡くださり感謝します", "We are grateful for your prompt contact.", "Work & Business"),
    ("gomen kudasai, o-denwa kawarimashita", "ごめんください、おでんわかわりました", "ゴメンクダサイ、オデンワカワリマシタ", "お電話代わりました", "Hello, I have taken over the line.", "Work & Business"),

    # H
    ("haikei, masu-masu go-seiei no koto", "はいけい、ますますごせいえいのこと", "ハイケイ、マスマすごセイエイノコト", "拝啓、ますますご清栄のこととお慶び申し上げます", "Dear Sirs, wishing you continued great prosperity", "Work & Business"),
    ("hajimeni mokuteki o kakunin shiyou", "はじめにもくてきをかくにんしよう", "ハジメニモクテキヲカクニンシヨウ", "初めに目的を確認しよう", "First, let's verify our objective.", "Work & Business"),
    ("han-i o kakutei shimashou", "はんいをかくていしましょう", "ハンイヲカクテイシマショウ", "範囲を確定しましょう", "Let's establish project scope boundaries.", "Work & Business"),
    ("happyou o hajimete kudasai", "はっぴょうをはじめてください", "ハッピョウヲハジメテクダサイ", "発表を始めてください", "Please begin your presentation.", "Classroom & Study"),
    ("hikkuri-kaesu you na kousou", "ひっくりかえすようなこうそうだ", "ヒックリカエスヨウナコウソウダ", "常識を覆す構想だ", "This is an industry-disrupting concept!", "Work & Business"),
    ("hisshou no saku o tateru", "ひっしょうのさくをたてる", "ヒッショウノサクヲタテル", "必勝の策を立てる", "Devising a surefire blueprint for victory.", "Work & Business"),
    ("hitori-de kakaekoma-naide", "ひとりでかかえこまないで", "ヒトリデカカエコラナイデ", "一人で抱え込まないで", "Don't shoulder the workload entirely alone!", "Work & Business"),
    ("houkoku-sho o teishutsu shimasu", "ほうこくしょをていしゅつします", "ホウコクショヲテイシュツシマス", "報告書を提出します", "Submitting the formal written report.", "Work & Business"),

    # I
    ("i-ken ga areba oshiete kudasai", "いけんがあればおしえてください", "イケンガアレバオシエテクダサイ", "意見があれば教えてください", "If anyone has opinions, please chime in!", "Classroom & Study"),
    ("ichi-mon-ittou de susumemasu", "いちもんいっとうですすめます", "イチモンイットウデススメマス", "一問一答で進めます", "We will proceed question by question.", "Classroom & Study"),
    ("ii shitsumon desu ne!", "いいしつもんですね！", "イイシツモンデスネ！", "良い質問ですね！", "That is an insightful, excellent question!", "Classroom & Study"),
    ("issho ni kadai o tokimashou", "いっしょにかだいをときましょう", "イッショニカダイヲトキマショウ", "一緒に課題を解きましょう", "Let's solve these exercises together!", "Classroom & Study"),
    ("itsumo no ruuru o mamorou", "いつものるーるをまもろう", "イツモノルールヲマモロウ", "いつものルールを守ろう", "Let's adhere to our team standards.", "Classroom & Study"),

    # J - Z
    ("jikan-douri ni hajimemasu", "じかんどおりにはじめます", "ジカンドオリニハジメマス", "時間通りに始めます", "We will start promptly on the dot.", "Work & Business"),
    ("jitsumu de yakudatsu nihongo", "じつむでやくだつにほんご", "ジツムデヤクダツニホンゴ", "実務で役立つ日本語", "Practical Japanese for real workplace usage.", "Classroom & Study"),
    ("kakunin no tame fukushou shimasu", "かくにんのためふくしょうします", "カクニンノタメフクショウシマス", "確認のため復唱します", "Let me repeat that back to confirm.", "Work & Business"),
    ("keikaku o maedaoshi de susumeru", "けいかくをまえだおしですすめる", "ケイカクヲマエダオシデススメル", "計画を前倒しで進める", "Moving the schedule ahead of timeline.", "Work & Business"),
    ("kyou no jugyou wa koko made", "きょうのじゅぎょうはここまで", "キョウノジュギョウワココマデ", "今日の授業はここまでです", "That concludes today's lesson!", "Classroom & Study"),
    ("meishi o koukan sasete kudasai", "めいしをこうかんさせてください", "メイシヲコウカンサセテクダサイ", "名刺を交換させてください", "May we exchange business cards?", "Work & Business"),
    ("motto renshuu ga hitsuyou desu", "もっとれんしゅうがひつようです", "モットレンシュウガヒツヨウデス", "もっと練習が必要です", "A little more practice is recommended!", "Classroom & Study"),
    ("o-saki ni shitsurei shimasu", "おさきにしつれいします", "オサキニシツレイシマス", "お先に失礼します", "Excuse me for departing ahead of you.", "Work & Business"),
    ("sensei, mou ichido onegai shimasu", "せんせい、もういちどおねがいします", "センセイ、モウイチドオネガイシマス", "先生、もう一度お願いします", "Sensei, could you repeat that once more?", "Classroom & Study"),
    ("shiryou o tenpu shimashita", "しりょうをてんぷしました", "シリョウヲテンプシマシタ", "資料を添付しました", "I have attached the document file.", "Work & Business"),
    ("subarashii seiseki desu yo!", "すばらしいせいせきですよ！", "スバラシイセイセキデスヨ！", "素晴らしい成績ですよ！", "Those are truly splendid exam results!", "Classroom & Study"),
    ("yoku dekimashita, hanamaru desu!", "よくできました、はなまるです！", "ヨクデキマシタ、ハナマルデス！", "よく出来ました、花丸です！", "Masterfully done, you get a flower circle!", "Classroom & Study"),
]
