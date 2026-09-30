import json

raw_phrases_3 = [
    # J
    ("ja, mata ne", "じゃ、またね", "ジャ、マタネ", "じゃ、またね", "See you later! (Casual)", "Greetings & Farewells"),
    ("ja, mata ashita", "じゃ、またあした", "ジャ、マタアシタ", "じゃ、また明日", "Well then, see you tomorrow!", "Greetings & Farewells"),
    ("ja, mata raishuu", "じゃ、またらいしゅう", "ジャ、マタライシュウ", "じゃ、また来週", "See you next week!", "Greetings & Farewells"),
    ("ja, o-saki ni", "じゃ、おさきに", "ジャ、オサキニ", "じゃ、お先に", "Well, I'm heading out ahead (Casual)", "Greetings & Farewells"),
    ("jikan ga arimasen", "じかんがありません", "ジカンガアリマセン", "時間がありません", "There is no time left", "Daily Conversation"),
    ("jikan doori desu", "じかんどおりです", "ジカンドオリデス", "時間通りです", "Right on schedule", "Daily Conversation"),
    ("jiyuu ni douzo", "じゆうにどうぞ", "ジユウニドウゾ", "自由にどうぞ", "Please feel completely free", "Service & Hospitality"),
    ("joubu ni sodatte ne", "じょうぶにそだってね", "ジョウブニソダッテネ", "丈夫に育ってね", "Grow up strong and healthy!", "Family & Children"),
    ("jouzu desu ne", "じょうずですね", "ジョウズデスネ", "上手ですね", "You are so skilled at that!", "Cheering & Motivation"),
    ("juubun desu", "じゅうぶんです", "ジュウブンデス", "十分です", "That is plenty / sufficient", "Daily Conversation"),
    ("junbi ga dekimashita", "じゅんびができました", "ジュンビガデキマシタ", "準備ができました", "Preparations are complete!", "Daily Conversation"),

    # K
    ("kaerimashou", "かえりましょう", "カエリマショウ", "帰りましょう", "Let's head back home", "Daily Conversation"),
    ("kagi o shimemashita ka", "かぎをしめましたか", "カギヲシメマシタカ", "鍵を閉めましたか", "Did you lock the door?", "Daily Conversation"),
    ("kakkoii desu ne", "かっこいいですね", "カッコイイデスネ", "格好いいですね", "That's so cool / stylish!", "Daily Conversation"),
    ("kami o kudasai", "かみをください", "カミヲクダサイ", "紙をください", "Paper, please", "Classroom & Study"),
    ("kanpai", "かんぱい", "カンパイ", "乾杯", "Cheers! (Toast)", "Greetings & Celebrations"),
    ("kanzen ni doui shimasu", "かんぜんにどういします", "カンゼンニドウイシマス", "完全に同意します", "I completely agree with you", "Daily Conversation"),
    ("kasa o motte ikou", "かさをもっていこう", "カサヲモッテイコウ", "傘を持って行こう", "Let's bring an umbrella", "Weather & Daily"),
    ("kashikomarimashita", "かしこまりました", "カシコマリマシタ", "かしこまりました", "Certainly / Right away (Polite)", "Service & Hospitality"),
    ("kawaii desu ne", "かわいいですね", "カワイイデスネ", "可愛いですね", "How cute and lovely!", "Daily Conversation"),
    ("kayoubi ni aimashou", "かようびにあいましょう", "カヨウビニアイマショウ", "火曜日に会いましょう", "Let's meet on Tuesday", "Daily Conversation"),
    ("kazoku o taisetsu ni", "かぞくをたいせつに", "カゾクヲタイセツニ", "家族を大切に", "Treasure your family", "Family & Children"),
    ("keisatsu o yonde kudasai", "けいさつをよんでください", "ケイサツヲヨンデクダサイ", "警察を呼んでください", "Please call the police!", "Health & Emergency"),
    ("kekkou desu", "けっこうです", "ケッコウデス", "結構です", "That's fine / No thank you", "Daily Conversation"),
    ("kega wa arimasen ka", "けがわありませんか", "ケガワアリマセンカ", "怪我はありませんか", "Are you injured?", "Health & Emergency"),
    ("ki o tsukete kudasai", "きをつけてください", "キヲツケテクダサイ", "気をつけてください", "Please take care / Watch out!", "Greetings & Farewells"),
    ("ki ni shinaide", "きにしないで", "キニシナイデ", "気にしないで", "Don't pay it any mind / No worries", "Empathy & Comfort"),
    ("kirei desu ne", "きれいですね", "キレイデスネ", "綺麗ですね", "How pretty / lovely!", "Daily Conversation"),
    ("kitte o kudasai", "きってをください", "キッテヲクダサイ", "切手をください", "Postage stamps, please", "Shopping & Dining"),
    ("kochira e douzo", "こちらへどうぞ", "コチラヘドウゾ", "こちらへどうぞ", "Right this way, please", "Service & Hospitality"),
    ("kochira koso arigatou", "こちらこそありがとう", "コチラコソアリガトウ", "こちらこそありがとう", "Likewise, thank YOU!", "Gratitude & Thanks"),
    ("kochira koso yoroshiku", "こちらこそよろしく", "コチラコソヨロシク", "こちらこそよろしく", "Likewise, my pleasure!", "Greetings & Farewells"),
    ("koko de matte te", "ここでまってて", "ココデマッテテ", "ここで待ってて", "Wait here, please", "Daily Conversation"),
    ("koko ni kaite kudasai", "ここにかいてください", "ココニカイテクダサイ", "ここに書いてください", "Please write it down right here", "Classroom & Study"),
    ("koko wa doko desu ka", "ここわどこですか", "ココワドコデスカ", "ここはどこですか", "Where is this? (Lost)", "Travel & Directions"),
    ("kombanwa", "こんばんは", "コンバンワ", "今晩は", "Good evening!", "Greetings & Farewells"),
    ("konnichiwa", "こんにちは", "コンニチワ", "今日は", "Hello / Good day!", "Greetings & Farewells"),
    ("kore o kudasai", "これをください", "コレヲクダサイ", "これをください", "I'll take this one, please", "Shopping & Dining"),
    ("kore o misete kudasai", "これをみせてください", "コレヲミセテクダサイ", "これを見せてください", "Could you show me this one?", "Shopping & Dining"),
    ("kore wa nan desu ka", "これわなんですか", "コレワナンデスカ", "これは何ですか", "What is this?", "Shopping & Dining"),
    ("kore de ii desu ka", "これでいいですか", "コレデイイデスカ", "これでいいですか", "Is this okay?", "Daily Conversation"),
    ("kore de zenbu desu", "これでぜんぶです", "コレデゼンブデス", "これで全部です", "That's all of it", "Shopping & Dining"),
    ("kouen de asobou", "こうえんであそぼう", "コウエンデアソボウ", "公園で遊ぼう", "Let's play in the park", "Friends & Social"),
    ("kousaten o migi e", "こうさてんをみぎへ", "コウサテンヲミギヘ", "交差点を右へ", "Turn right at the crossroads", "Travel & Directions"),
    ("kudamono o tabeyou", "くだものをたべよう", "クダモノヲタベヨウ", "果物を食べよう", "Let's have some fruit", "Shopping & Dining"),
    ("kusuri o nonde ne", "くすりをのんでね", "クスリヲノンデネ", "薬を飲んでね", "Please take your medicine", "Health & Emergency"),
    ("kyuukyuusha o yonde", "きゅうきゅうしゃをよんで", "キュウキュウシャヲヨンデ", "救急車を呼んで", "Call an ambulance!", "Health & Emergency"),
    ("kyou wa tanoshikatta", "きょうわたのしかった", "キョウワタノシカッタ", "今日は楽しかった", "Today was so much fun!", "Daily Conversation"),

    # M
    ("mada mada korekara desu", "まだまだこれからです", "マダマダコレカラデス", "まだまだこれからです", "The best is yet to come!", "Cheering & Motivation"),
    ("mainichi ganbattemasu", "まいにちがんばってます", "マイニチガンバッテマス", "毎日頑張ってます", "I'm working hard every day", "Daily Conversation"),
    ("makasete kudasai", "まかせてください", "マカセテクダサイ", "任せてください", "Please leave it to me!", "Work & Business"),
    ("mamotte ageru", "まもってあげる", "マモッテアゲル", "守ってあげる", "I will protect you", "Family & Children"),
    ("manningai o-negai shimasu", "まんせきですか", "マンセキデスカ", "満席ですか", "Is it fully booked / all tables taken?", "Shopping & Dining"),
    ("mata o-ai shimashou", "またおあいしましょう", "マタオアイシマショウ", "またお会いしましょう", "Let us meet again!", "Greetings & Farewells"),
    ("mata kondo ne", "またこんどね", "マタコンドネ", "また今度ね", "Catch you next time!", "Greetings & Farewells"),
    ("mata asonde ne", "またあそんでね", "マタアソンデネ", "また遊んでね", "Let's hang out again!", "Friends & Social"),
    ("matsu koto ga dekimasu ka", "まつことができますか", "マツコトガデキマスカ", "待つことができますか", "Can you wait for me?", "Daily Conversation"),
    ("matte kudasai", "まってください", "マッテクダサイ", "待ってください", "Please wait!", "Daily Conversation"),
    ("mayowazu susumou", "まよわずすすもう", "マヨワズススモウ", "迷わず進もう", "Let's advance without hesitating!", "Cheering & Motivation"),
    ("menyuu o kudasai", "めにゅーをください", "メニューヲクダサイ", "メニューをください", "Menu, please", "Shopping & Dining"),
    ("michi ni mayoimashita", "みちにまよいましました", "ミチニマヨイマシタ", "道に迷いました", "I've lost my way / I am lost", "Travel & Directions"),
    ("michi o oshiete kudasai", "みちをおしえてください", "ミチヲオシエテクダサイ", "道を教えてください", "Could you tell me the directions?", "Travel & Directions"),
    ("mizu o ippai kudasai", "みずをいっぱいください", "ミズヲイッパイクダサイ", "水を一杯ください", "A glass of water, please", "Shopping & Dining"),
    ("mizu o nomitai desu", "みずをのみたいです", "ミズヲノミタイデス", "水を飲みたいです", "I'd like some water", "Shopping & Dining"),
    ("mochikaeri de onegai shimasu", "もちかえりでおねがいします", "モチカエリデオネガイシマス", "持ち帰りでお願します", "Take-out / To go, please", "Shopping & Dining"),
    ("mochiron desu", "もちろんです", "モチロンデス", "もちろんです", "Of course! / By all means", "Daily Conversation"),
    ("mou sukoshi yukkuri", "もうすこしゆっくり", "モウスコシユックリ", "もう少しゆっくり", "A little more slowly, please", "Classroom & Study"),
    ("mou ichido itte kudasai", "もういちどいってください", "モウイチドイッテクダサイ", "もう一度言ってください", "Please say it one more time", "Classroom & Study"),
    ("mou kekkou desu", "もうけっこうです", "モウケッコウデス", "もう結構です", "That's enough for me, thank you", "Shopping & Dining"),
    ("moushiwake arimasen", "もうしわけありません", "モウシワケアリマセン", "申し訳ありません", "I am terribly sorry / Deepest apologies", "Apologies & Regrets"),
    ("moushiwake gozaimasen", "もうしわけございません", "モウシワケゴザイマセン", "申し訳ございません", "My sincere apologies (Formal)", "Apologies & Regrets"),

    # N
    ("nani o shite iru no", "なにをしているの", "ナニヲシテイルノ", "何をしているの？", "What are you doing?", "Daily Conversation"),
    ("nani ga hoshii desu ka", "なにがほしいですか", "ナニガホシイデスカ", "何が欲しいですか", "What would you like?", "Daily Conversation"),
    ("nani ga o-susume desu ka", "なにがおおすすめですか", "ナニガオオスメデスカ", "何がおすすめですか", "What do you recommend?", "Shopping & Dining"),
    ("nani mo arimasen", "なにもありません", "ナニモアリマセン", "何もありません", "There is nothing there", "Daily Conversation"),
    ("nani mo mondai nai", "なにももんだいない", "ナニモモンダイナイ", "何も問題ない", "No problem whatsoever", "Daily Conversation"),
    ("naruhodo, sou desu ne", "なるほど、そうですね", "ナルホド、ソウデスネ", "なるほど、そうですね", "I see, that makes good sense", "Daily Conversation"),
    ("natsuyasumi wa doko iku", "なつやすみわどこいく", "ナツヤスミワドコイク", "夏休みはどこ行く？", "Where are you going for summer vacation?", "Friends & Social"),
    ("netsu ga arimasu", "ねつがあります", "ネツガアリマス", "熱があります", "I have a fever", "Health & Emergency"),
    ("nihon wa hajimete desu", "にほんわはじめてです", "ニホンワハジメテデス", "日本は初めてです", "This is my first time in Japan", "Travel & Directions"),
    ("nihon no tabemono ga suki", "にほんのたべものがすき", "ニホンノタベモノガスキ", "日本の食べ物が好き", "I love Japanese food!", "Shopping & Dining"),
    ("nihongo o benkyou chuu desu", "にほんごをべんきょうちゅうです", "ニホンゴヲベンキョウチュウデス", "日本語を勉強中です", "I am currently studying Japanese", "Classroom & Study"),
    ("nihongo ga jouzu desu ne", "にほんごがじょうずですね", "ニホンゴガジョウズデスネ", "日本語が上手ですね", "Your Japanese is so skillful!", "Cheering & Motivation"),
    ("nomimono wa nan ni shimasu ka", "のみものわなんにしますか", "ノミモノワナンニシマスカ", "飲み物は何にしますか", "What would you like to drink?", "Shopping & Dining"),

    # O
    ("o-genki de", "おげんきで", "オゲンキデ", "お元気で", "Take care of yourself! (Farewell)", "Greetings & Farewells"),
    ("o-genki desu ka", "おげんきですか", "オゲンキデスカ", "お元気ですか", "How are you doing?", "Greetings & Farewells"),
    ("o-hisa-shiburi desu", "おひさしぶりです", "オヒサシブリデス", "お久しぶりです", "Long time no see! (Polite)", "Greetings & Farewells"),
    ("o-itoma shimasu", "おいとまします", "オイトマシマス", "お暇します", "I must take my leave now", "Greetings & Farewells"),
    ("o-kaeri nasai", "おかえりなさい", "オカエリナサイ", "お帰りなさい", "Welcome home!", "Greetings & Farewells"),
    ("o-kaikei o onegai shimasu", "おかいけいをおねがいします", "オカイケイヲオネガイシマス", "お会計をお願いします", "Check / Bill, please", "Shopping & Dining"),
    ("o-kanjou o onegai shimasu", "おかんじょうをおねがいします", "オカンジョウヲオネガイシマス", "お勘定をお願いします", "The bill, please", "Shopping & Dining"),
    ("o-kawari o kudasai", "おかわりをください", "オカワリヲクダサイ", "お代わりをください", "Another serving / Refill, please", "Shopping & Dining"),
    ("o-kuni wa doko desu ka", "おくにはどこですか", "オクニワドコデスカ", "お国はどちらですか", "Which country are you from?", "Daily Conversation"),
    ("o-matase shimashita", "おまたせしました", "オマタセシマシタ", "お待たせしました", "Thank you for waiting!", "Service & Hospitality"),
    ("o-medetou gozaimasu", "おめでとうございます", "オメデトウゴザイマス", "おめでとうございます", "Congratulations! (Polite)", "Greetings & Celebrations"),
    ("o-mizu o kudasai", "おみずをください", "オミズヲクダサイ", "お水をください", "Water, please", "Shopping & Dining"),
    ("o-namae wa nan desu ka", "おなまえわなんですか", "オナマエワナンデスカ", "お名前は何ですか", "What is your name?", "Daily Conversation"),
    ("o-negai shimasu", "おねがいします", "オネガイシマス", "お願いします", "Please do this / Thank you in advance", "Daily Conversation"),
    ("o-saki ni shitsurei shimasu", "おさきにしつれいします", "オサキニシツレイシマス", "お先に失礼します", "Excuse me for leaving before you", "Work & Business"),
    ("o-sewa ni narimashita", "おせわになりました", "オセワニナリマシタ", "お世話になりました", "Thank you for all your kind care", "Gratitude & Thanks"),
    ("o-tearai wa doko desu ka", "おてあらいわどこですか", "オテアライワドコデスカ", "お手洗いはどこですか", "Where is the restroom / toilet?", "Travel & Directions"),
    ("o-tsukaresama deshita", "おつかれさまでした", "オツカレサマデシタ", "お疲れ様でした", "Great work today! / Good job!", "Work & Business"),
    ("ohayou gozaimasu", "おはようございます", "オハヨウゴザイマス", "おはようございます", "Good morning! (Polite)", "Greetings & Farewells"),
    ("ohayou", "おはよう", "オハヨウ", "おはよう", "Morning! (Casual)", "Greetings & Farewells"),
    ("okane o haraimasu", "おかねをはらいます", "オカネヲハライマス", "お金を払います", "I will pay the money", "Shopping & Dining"),
    ("onaka ga sukimashita", "おなかがすきました", "オナカガスキマシタ", "お腹が空きました", "I am hungry!", "Shopping & Dining"),
    ("onaka ga ippai desu", "おなかがいっぱいです", "オナカガイッパイデス", "お腹がいっぱいです", "I am completely full", "Shopping & Dining"),
    ("ongaku o kikou", "おんがくをきこう", "オンガクヲキコウ", "音楽を聴こう", "Let's listen to music", "Friends & Social"),
    ("onsen ni hairitai", "おんせんにはいりたい", "オンセンニハイリタイ", "温泉に入りたい", "I want to bathe in a hot spring", "Travel & Hotel"),
    ("osoreirimasu", "おそれいります", "オソレイリマス", "恐れ入ります", "I am deeply obliged / Excuse my imposition", "Service & Hospitality"),
    ("osouji shimashou", "おそうじしましょう", "オソウジシマショウ", "お掃除しましょう", "Let's clean up together", "Daily Conversation"),
    ("oyasumi nasai", "おやすみなさい", "オヤスミナサイ", "お休みなさい", "Good night! (Polite)", "Greetings & Farewells"),

    # R
    ("raamen o tabetai", "らーめんをたべたい", "ラーメンヲタベタイ", "ラーメンを食べたい", "I want to eat ramen noodles", "Shopping & Dining"),
    ("raigetsu mata aimashou", "らいげつまたあいましょう", "ライゲツマタアイマショウ", "来月また会いましょう", "Let's meet again next month", "Greetings & Farewells"),
    ("rainen mo yoroshiku", "らいねんもよろしく", "ライネンモヨロシク", "来年もよろしく", "Please treat me well next year too", "Greetings & Celebrations"),
    ("raishuu made ni yari masu", "らいしゅうまてにやります", "ライシュウマデニヤリマス", "来週までにやります", "I will get it done by next week", "Work & Business"),
    ("renshuu ga daiji desu", "れんしゅうがだいじです", "レンシュウガダイジデス", "練習が大事です", "Practice is essential", "Classroom & Study"),
    ("resutoran ni ikou", "れすとらんにいこう", "レストランニイコウ", "レストランに行こう", "Let's go to the restaurant", "Shopping & Dining"),
    ("reizouko ni irete", "れいぞうこにいれて", "レイゾウコニイレテ", "冷蔵庫に入れて", "Put it in the fridge", "Daily Conversation"),
    ("renraku shite kudasai", "れんらくしてください", "レンラクシテクダサイ", "連絡してください", "Please get in touch with me", "Daily Conversation"),
    ("ryokou wa dou deshita ka", "りょこうわどうでしたか", "リョコウワドウデシタカ", "旅行はどうでしたか", "How was your journey?", "Travel & Hotel"),
    ("ryouri ga jouzu desu ne", "りょうりがじょうずですね", "リョウリガジョウズデスネ", "料理が上手ですね", "You are such a talented cook!", "Cheering & Motivation"),

    # S
    ("saa, ikimashou", "さあ、いきましょう", "サア、イキマショウ", "さあ、行きましょう", "Come on, let's head out!", "Daily Conversation"),
    ("saigo made ganbarou", "さいごまでがんばろう", "サイゴマデガンバロウ", "最後まで頑張ろう", "Let's see it through to the very end!", "Cheering & Motivation"),
    ("saikou no ichinichi desu", "さいこうのいちにちです", "サイコウノイチニチデス", "最高の一日です", "This is the best day ever!", "Daily Conversation"),
    ("saikin dou desu ka", "さいきんどうですか", "サイキンドウデスカ", "最近どうですか", "How have things been lately?", "Greetings & Farewells"),
    ("sayounara", "さようなら", "サヨウナラ", "左様なら", "Goodbye / Farewell", "Greetings & Farewells"),
    ("seki o yuzurimashita", "せきをゆずりました", "セキヲユズリマシタ", "席を譲りました", "I gave up my seat on the train", "Daily Conversation"),
    ("senmonka ni kiki mashou", "せんもんかにききましょう", "センモンカニキキマショウ", "専門家に聞きましょう", "Let's consult an expert", "Work & Business"),
    ("sensei, arigatou gozaimashita", "せんせい、ありがとうございました", "センセイ、アリガトウゴザイマシタ", "先生、ありがとうございました", "Teacher, thank you very much for teaching me!", "Classroom & Study"),
    ("shashin o totte mo ii desu ka", "しゃしんをとってもいいですか", "シャシンヲトッテモイイデスカ", "写真を撮ってもいいですか", "May I take a picture?", "Travel & Directions"),
    ("shashin o totte kuremasu ka", "しゃしんをとってくれますか", "シャシンヲトッテクレマスカ", "写真を撮ってくれますか", "Could you take a picture for us?", "Travel & Directions"),
    ("shitsurei shimasu", "しつれいします", "シツレイシマス", "失礼します", "Pardon me / Excuse me for entering/leaving", "Service & Hospitality"),
    ("shitsurei shimashita", "しつれいしました", "シツレイシマシタ", "失礼しました", "Excuse me for what I did (Apology)", "Apologies & Regrets"),
    ("shitsumon ga arimasu", "しつもんがあります", "シツモンガアリマス", "質問があります", "I have a question", "Classroom & Study"),
    ("shou-shou o-machi kudasai", "しょうしょうおまちください", "ショウショウオマチクダサイ", "少々お待ちください", "Just a moment please (Service polite)", "Service & Hospitality"),
    ("sou da to ii desu ne", "そうだといいですね", "ソウダトイイデスネ", "そうだといいですね", "I hope so too / Wouldn't that be nice", "Daily Conversation"),
    ("sou desu ka", "そうですか", "ソウデスカ", "そうですか", "Is that so? / I see", "Daily Conversation"),
    ("sou desu ne", "そうですね", "ソウデスネ", "そうですね", "That's right / Indeed so", "Daily Conversation"),
    ("sou omoimasu", "そうおもいます", "ソウオモイマス", "そう思います", "I think so too", "Daily Conversation"),
    ("sou shiyou", "そうしよう", "ソウシヨウ", "そうしよう", "Let's do that!", "Daily Conversation"),
    ("sore wa komarimashita ne", "それわこまりましたね", "ソレワコマリマシタネ", "それは困りましたね", "That must be so tough for you", "Empathy & Comfort"),
    ("sore wa yokatta desu ne", "それわよかったですね", "ソレワヨカッタデスネ", "それは良かったですね", "That's wonderful news!", "Daily Conversation"),
    ("sore wa sugoi", "それわすごい", "ソレワスゴイ", "それは凄い！", "That is incredible!", "Daily Conversation"),
    ("sugoi desu ne", "すごいですね", "スゴイデスネ", "凄いですね", "That's amazing / wonderful!", "Cheering & Motivation"),
    ("sukoshi dake", "すこしだけ", "スコシダケ", "少しだけ", "Just a tiny bit", "Shopping & Dining"),
    ("sumimasen", "すみません", "スミマセン", "すみません", "Excuse me / I'm sorry / Thank you", "Apologies & Regrets"),
    ("sumimasen, o-kaikei", "すみません、おかいけい", "スミマセン、オカイケイ", "すみません、お会計", "Excuse me, check please", "Shopping & Dining"),
    ("sushi o tabemashou", "すしをたべましょう", "スシヲタベマショウ", "寿司を食べましょう", "Let's eat sushi!", "Shopping & Dining"),

    # T
    ("tadaima", "ただいま", "タダイマ", "ただいま", "I'm back home!", "Greetings & Farewells"),
    ("tadaima modorimashita", "ただいまもどりました", "タダイマモドリマシタ", "只今戻りました", "I have just returned (Work)", "Work & Business"),
    ("taihen desu ne", "たいへんですね", "タイヘンデスネ", "大変ですね", "That must be really tough on you", "Empathy & Comfort"),
    ("taisetsu ni shimasu", "たいせつにします", "タイセツニシマス", "大切にします", "I will cherish it always", "Gratitude & Thanks"),
    ("tanoshinde kite ne", "たのしんできてね", "タノシンデキテネ", "楽しんできてね", "Have a fantastic time!", "Greetings & Farewells"),
    ("tanoshikatta desu", "たのしかったです", "タノシカッタデス", "楽しかったです", "I had a wonderful time!", "Daily Conversation"),
    ("tanomi ga arimasu", "たのみがあります", "タノミガアリマス", "頼みがあります", "I have a favor to ask", "Daily Conversation"),
    ("tasukete kudasai", "たすけてください", "タスケテクダサイ", "助けてください", "Please help me!", "Health & Emergency"),
    ("tasukarimashita", "たすかりました", "タスカリマシタ", "助かりました", "You really saved me / Thank you!", "Gratitude & Thanks"),
    ("tetsudaimashou ka", "てつだいましょうか", "テツダイマショウカ", "手伝いましょうか", "Shall I give you a hand?", "Daily Conversation"),
    ("tetsudatte kurete arigatou", "てつだってくれてありがとう", "テツダッテクレテアリガトウ", "手伝ってくれてありがとう", "Thank you for helping me out!", "Gratitude & Thanks"),
    ("tokei o mite kudasai", "とけいをみてください", "トケイヲミテクダサイ", "時計を見てください", "Please look at the clock", "Daily Conversation"),
    ("tokidoki omoidashite", "ときどきおもいだして", "トキドキオモイダシテ", "時々思い出して", "Remember me once in a while", "Friends & Social"),
    ("tomodachi ni narou", "ともだちになろう", "トモダチニナロウ", "友達になろう", "Let's be friends!", "Friends & Social"),
    ("tsugi no eki de orimasu", "つぎのえきでおります", "ツギノエキデオリマス", "次の駅で降ります", "I'm getting off at the next station", "Travel & Directions"),

    # U
    ("ureshii desu", "うれしいです", "ウレシイデス", "嬉しいです", "I am so happy / thrilled!", "Daily Conversation"),
    ("uma-sou desu ne", "うまそうですね", "ウマソウデスネ", "旨そうですね", "Looks delicious!", "Shopping & Dining"),
    ("umaku ikimashita", "うまくいくました", "ウマクイキマシタ", "上手くいきました", "It went smoothly and well!", "Daily Conversation"),
    ("un, sou da ne", "うん、そうだね", "ウン、ソウダネ", "うん、そうだね", "Yeah, that's right (Casual)", "Daily Conversation"),
    ("unten ni ki o tsukete", "うんてんにきをつけて", "ウンテンニキヲツケテ", "運転に気をつけて", "Drive safely!", "Greetings & Farewells"),

    # W
    ("wakarimashita", "わかりました", "ワカリマシタ", "分かりました", "Understood / I got it", "Daily Conversation"),
    ("wakarimasen", "わかりません", "ワカリマセン", "分かりません", "I do not understand / I don't know", "Daily Conversation"),
    ("wai-wai tanoshimou", "わいわいたのしもう", "ワイワイタノシモウ", "わいわい楽しもう", "Let's have a lively good time!", "Friends & Social"),
    ("wasurenaide kudasai", "わすれないでください", "ワスレナイデクダサイ", "忘れないでください", "Please do not forget!", "Daily Conversation"),
    ("watashi no ogori desu", "わたしのおごりです", "ワタシノオゴリデス", "私のおごりです", "It's on me / My treat!", "Shopping & Dining"),
    ("watashi mo ikitai", "わたしもいきたい", "ワタシモイキタイ", "私も行きたい", "I want to come along too!", "Friends & Social"),

    # Y
    ("yappari sou da", "やっぱりそうだ", "ヤッパリソウダ", "やっぱりそうだ", "I knew it! Just as expected", "Daily Conversation"),
    ("yasashiku oshiete", "やさしくおしえて", "ヤサシクオシエテ", "優しく教えて", "Please teach me gently", "Classroom & Study"),
    ("yasumi wa nani suru", "やすみわなにをする", "ヤスミワナニヲスル", "休みは何をする？", "What are you doing on your days off?", "Friends & Social"),
    ("yattaze", "やったぜ", "ヤッタゼ", "やったぜ", "We did it! Woohoo!", "Cheering & Motivation"),
    ("yatta ne", "やったね", "ヤッタネ", "やったね", "You did it! Congrats!", "Cheering & Motivation"),
    ("yoi ichinichi o", "よいいちにちを", "ヨイイチニチヲ", "良い一日を", "Have a wonderful day!", "Greetings & Farewells"),
    ("yoi o-toshi o", "よいおとしを", "ヨイオトシヲ", "良いお年を", "Have a happy new year!", "Greetings & Celebrations"),
    ("yoi shuumatsu o", "よいしゅうまつを", "ヨイシュウマツヲ", "良い週末を", "Have a great weekend!", "Greetings & Farewells"),
    ("yokatta desu ne", "よかったですね", "ヨカッタデスネ", "良かったですね", "That turned out so well for you!", "Daily Conversation"),
    ("yoku dekimashita", "よくできました", "ヨクデキマシタ", "よくできました", "Well done! / Excellent job!", "Cheering & Motivation"),
    ("yoku kangaete mite", "よくかんがえてみて", "ヨクカンガエテミテ", "よく考えてみて", "Think it through carefully", "Daily Conversation"),
    ("yoku nemuremashita ka", "よくねむれましたか", "ヨクネムレマシタカ", "よく眠れましたか", "Did you sleep well?", "Daily Conversation"),
    ("yoroshiku onegai shimasu", "よろしくおねがいします", "ヨロシクオネガイシマス", "よろしくお願いします", "Please treat me kindly / Looking forward to working with you", "Greetings & Farewells"),
    ("youkoso nihon e", "ようこそにほんへ", "ヨウコソニホンヘ", "ようこそ日本へ", "Welcome to Japan!", "Greetings & Celebrations"),
    ("yukkuri hanashite kudasai", "ゆっくりはなしてください", "ユックリハナシテクダサイ", "ゆっくり話してください", "Please speak slowly", "Classroom & Study"),
    ("yume o akiramenaide", "ゆめをあきらめないで", "ユメヲアキラメナイデ", "夢を諦めないで", "Never give up on your dreams!", "Cheering & Motivation"),

    # Z
    ("zehi kite kudasai", "ぜひきてください", "ゼヒキテクダサイ", "是非来てください", "By all means, please do visit!", "Daily Conversation"),
    ("zehi tabete mite", "ぜひたべてみて", "ゼヒタベテミテ", "是非食べてみて", "You definitely must try eating this!", "Shopping & Dining"),
    ("zenryoku de ouen shimasu", "ぜんりょくでおうえんします", "ゼンリョクデオウエンシマス", "全力で応援します", "I will support you with all my heart!", "Cheering & Motivation"),
    ("zettai ni daijoubu", "ぜったいにだいじょうぶ", "ゼッタイニダイジョウブ", "絶対に大丈夫", "You'll definitely be just fine!", "Cheering & Motivation"),
    ("zutto tomodachi da yo", "ずっとともだちだよ", "ズットトモダチダヨ", "ずっと友達だよ", "Friends forever!", "Friends & Social")
]

with open('scripts/phrases_checkpoint.json', 'r', encoding='utf-8') as f:
    existing_list = json.load(f)

existing = {item['romaji'].lower(): item for item in existing_list}

for item in raw_phrases_3:
    key = item[0].lower()
    if key not in existing:
        existing[key] = {
            "alphabet": item[0][0].upper(),
            "romaji": item[0],
            "hiragana": item[1],
            "katakana": item[2],
            "kanji": item[3],
            "meaning": item[4],
            "topic": item[5]
        }

final_phrases = list(existing.values())
final_phrases.sort(key=lambda x: x['romaji'].lower())

with open('src/data/vocab/n5_vocab.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['phrases'] = final_phrases

with open('src/data/vocab/n5_vocab.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total Phrases now saved in n5_vocab.json: {len(data['phrases'])}")
