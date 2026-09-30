import json

raw_phrases_4 = [
    ("a, chotto matte kudasai", "あ、ちょっとまってください", "ア、チョットマッテクダサイ", "あ、一寸待ってください", "Ah, just one second please!", "Daily Conversation"),
    ("arigatou, tasukatta yo", "ありがとう、たすかったよ", "アリガトウ、タスカッタヨ", "ありがとう、助かったよ", "Thanks, that really saved me!", "Gratitude & Thanks"),
    ("ano sumimasen ga", "あのすみませんが", "アノスミマセンガ", "あのすみませんが", "Um, excuse me, but...", "Daily Conversation"),
    ("ano hito wa dare desu ka", "あのひとわだれですか", "アノヒトワダレデスカ", "あの人は誰ですか", "Who is that person over there?", "Daily Conversation"),
    ("ashita no yotei wa nan desu ka", "あしたのよていわなんですか", "アシタノヨテイワナンデスカ", "明日の予定は何ですか", "What are your plans for tomorrow?", "Daily Conversation"),
    ("asoko de tomatte kudasai", "あそこでとまってください", "アソコデトマッテクダサイ", "彼処で止まってください", "Please pull over right there (Taxi)", "Travel & Directions"),
    ("boushi o kabutta hou ga ii", "ぼうしをかぶったほうがいい", "ボウシヲカブッタホウガイイ", "帽子をかぶった方がいい", "You should probably wear a hat", "Weather & Daily"),
    ("chotto shitsurei shimasu", "ちょっとしつれいします", "チョットシツレイシマス", "一寸失礼します", "Excuse me for just a moment", "Service & Hospitality"),
    ("daisuki na nihonryouri", "だいすきなにほんりょうり", "ダイスキナニホンリョウリ", "大好きな日本料理", "My favorite Japanese cuisine", "Shopping & Dining"),
    ("dekiagari ga tanoshimi", "できあがりがたのしみ", "デキアガリガタノシミ", "出来上がりが楽しみ", "Looking forward to seeing how it turns out!", "Daily Conversation"),
    ("dekiru dake ganbarou", "できるだけがんばろう", "デキルダケガンバロウ", "できるだけ頑張ろう", "Let's do our very best as much as we can", "Cheering & Motivation"),
    ("denwa bango o kaite", "でんわばんごうをかいて", "デンワバンゴウヲカイテ", "電話番号を書いて", "Please write down the phone number", "Daily Conversation"),
    ("eigo ga sukoshi hanasemasu", "えいごがすこしはなせます", "エイゴガスコシハナセマス", "英語が少し話せます", "I can speak a little bit of English", "Classroom & Study"),
    ("fuan na koto wa arimasen ka", "ふあんなことわありませんか", "フアンナコトワアリマセンカ", "不安な事はありませんか", "Do you have any concerns / worries?", "Empathy & Comfort"),
    ("ganbatte kurete arigatou", "がんばってくれてありがとう", "ガンバッテクレテアリガトウ", "頑張ってくれてありがとう", "Thank you for working so hard!", "Gratitude & Thanks"),
    ("go-chuumon o douzo", "ごちゅうもんをどうぞ", "ゴチュウモンヲドウゾ", "ご注文をどうぞ", "Please go ahead with your order", "Shopping & Dining"),
    ("go-anshin kudasai", "ごあんしんください", "ゴアンシンクダサイ", "ご安心ください", "Please rest assured", "Service & Hospitality"),
    ("hachiji ni shuppatsu desu", "はちじにしゅっぱつです", "ハチジニシュッパツデス", "八時に出発です", "Departure is at eight o'clock", "Travel & Directions"),
    ("hajimete no nihon ryokou", "はじめてのにほんりょこう", "ハジメテノニホンリョコウ", "初めての日本旅行", "My very first trip to Japan", "Travel & Hotel"),
    ("hontou ni sugoi desu", "ほんとうにすごいです", "ホントウニスゴイデス", "本当に凄いです", "That is truly amazing!", "Cheering & Motivation"),
    ("ii omoide ni narimashita", "いいおもいでになりました", "イイオモイデニナリマシタ", "いい思い出になりました", "It has become a wonderful memory", "Gratitude & Thanks"),
    ("isshoni eiga o miyou", "いっしょにえいがをみよう", "イッショニエイガヲミヨウ", "一緒に映画を見よう", "Let's watch a movie together!", "Friends & Social"),
    ("jikan o oshiete kudasai", "じかんをおしえてください", "ジカンヲオシエテクダサイ", "時間を教えてください", "Could you tell me what time it is?", "Daily Conversation"),
    ("juusho o kaite kudasai", "じゅうしょをかいてください", "ジュウショヲカイテクダサイ", "住所を書いてください", "Please write your address down", "Service & Hospitality"),
    ("kaban o mochimashou ka", "かばんをもちましょうか", "カバンヲモチマショウカ", "鞄を持ちましょうか", "Shall I carry your bag for you?", "Daily Conversation"),
    ("kaigishitsu wa doko desu ka", "かいぎしつわどこですか", "カイギシツワドコデスカ", "会議室はどこですか", "Where is the conference room?", "Work & Business"),
    ("kanji ga yomemasu ka", "かんじがよめますか", "カンジガヨメマスカ", "漢字が読めますか", "Can you read kanji?", "Classroom & Study"),
    ("kasa o kashite kudasai", "かさをかしてください", "カサヲカシテクダサイ", "傘を貸してください", "Could you lend me an umbrella?", "Weather & Daily"),
    ("ki o rakuni shite", "きをらくにして", "キヲラクニシテ", "気を楽にして", "Make yourself comfortable / Relax", "Empathy & Comfort"),
    ("koko kara chikai desu", "ここからちかいです", "ココカラチカイデス", "ここから近いです", "It's near from here", "Travel & Directions"),
    ("kore o motte kudasai", "これをもってください", "コレヲモッテクダサイ", "これを持ってください", "Please hold this for me", "Daily Conversation"),
    ("kore o tabete mite", "これをたべてみて", "コレヲタベテミテ", "これを食べてみて", "Try tasting this!", "Shopping & Dining"),
    ("kudamono ga suki desu ka", "くだものがすきですか", "クダモノガスキデスカ", "果物が好きですか", "Do you like fruit?", "Shopping & Dining"),
    ("kyou mo ichinichi ganbarou", "きょうもいちにちがんばろう", "キョウモイチニチガンバロウ", "今日も一日頑張ろう", "Let's do our best today as well!", "Cheering & Motivation"),
    ("maasa gohan o tabemasu", "まいあさごはんをたべます", "マイアサゴハンヲタベマス", "毎朝ご飯を食べます", "I eat breakfast every morning", "Daily Conversation"),
    ("mado o shimete kudasai", "まどをしめてください", "マドヲシメテクダサイ", "窓を閉めてください", "Please close the window", "Daily Conversation"),
    ("mado o akete kudasai", "まどをあけてください", "マドヲアケテクダサイ", "窓を開けてください", "Please open the window", "Daily Conversation"),
    ("mou sukoshi kudasai", "もうすこしください", "モウスコシクダサイ", "もう少しください", "A little bit more, please", "Shopping & Dining"),
    ("mousugu haru desu ne", "もうすぐはるですね", "モウスグハルデスネ", "もうすぐ春ですね", "It will soon be spring, won't it?", "Weather & Daily"),
    ("netsu o hakarimashou", "ねつをはかりましょう", "ネツヲハカリマショウ", "熱を測りましょう", "Let's take your temperature", "Health & Emergency"),
    ("nihongo o oshiete kudasai", "にほんごをおしえてください", "ニホンゴヲオシエテクダサイ", "日本語を教えてください", "Please teach me Japanese!", "Classroom & Study"),
    ("o-kane o ryougae shite", "おかねをりょうがえして", "オカネヲリョウガエシテ", "お金を両替して", "Please exchange the currency", "Shopping & Dining"),
    ("o-cha o mou ippai", "おちゃをもういっぱい", "オチャヲモウイッパイ", "お茶をもう一杯", "Another cup of green tea, please", "Shopping & Dining"),
    ("o-kaeri o matte imasu", "おかえりをまっています", "オカエリヲマッテイマス", "お帰りを待っています", "I'll be waiting for you to return", "Family & Children"),
    ("o-saki ni douzo", "おさきにどうぞ", "オサキニドウゾ", "お先にどうぞ", "Please go ahead first / After you", "Service & Hospitality"),
    ("ongaku o kiki nagara", "おんがくをききながら", "オンガクヲキキナガラ", "音楽を聴きながら", "While listening to music", "Friends & Social"),
    ("resutoran o yoyaku shita", "れすとらんをよやくした", "レストランヲヨヤクシタ", "レストランを予約した", "I reserved the restaurant", "Shopping & Dining"),
    ("saigo made akiramenaide", "さいごまであきらめないで", "サイゴマデアキラメナイデ", "最後まで諦めないで", "Don't give up until the very end!", "Cheering & Motivation"),
    ("shashin o misete kudasai", "しゃしんをみせてください", "シャシンヲミセテクダサイ", "写真を見せてください", "Please show me the pictures", "Friends & Social"),
    ("shukudai ga owarimashita", "しゅくだいがおわりました", "シュクダイガオワリマシタ", "宿題が終わりました", "Homework is finished!", "Classroom & Study"),
    ("tanoshii jikan o arigatou", "たのしいじかんをありがとう", "タノシイジカンヲアリガトウ", "楽しい時間をありがとう", "Thank you for the wonderful time!", "Gratitude & Thanks"),
    ("tetsudai ga hitsuyou desu ka", "てつだいかひつようですか", "テツダイガヒツヨウデスカ", "手伝いが必要ですか", "Do you need any assistance?", "Service & Hospitality"),
    ("wakarikakete kimashita", "わかりかけてきました", "ワカリカケテキマシタ", "分かりかけてきました", "I'm starting to get the hang of it!", "Classroom & Study"),
    ("watashi ni makasete", "わたしにまかせて", "ワタシニマカセテ", "私に任せて", "Leave it to me! (Polite casual)", "Daily Conversation"),
    ("yoi ryokou o", "よいりょこうを", "ヨイリョコウヲ", "良い旅行を", "Have a pleasant journey / Bon voyage!", "Greetings & Farewells"),
    ("zenryoku de yatte miyou", "ぜんりょくでやってみよう", "ゼンリョクデヤッテミヨウ", "全力でやってみよう", "Let's give it our absolute all!", "Cheering & Motivation"),
    ("zutto zutto ouen shitemasu", "ずっとずっとおうえんしてます", "ズットズットオウエンシテマス", "ずっとずっと応援してます", "I will be rooting for you always and forever!", "Cheering & Motivation")
]

with open('src/data/vocab/n5_vocab.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

existing = {item['romaji'].lower(): item for item in data['phrases']}

for item in raw_phrases_4:
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

data['phrases'] = final_phrases

with open('src/data/vocab/n5_vocab.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total Phrases now saved in n5_vocab.json: {len(data['phrases'])}")
