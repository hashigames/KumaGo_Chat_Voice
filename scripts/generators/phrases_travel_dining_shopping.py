# Japanese Travel, Dining, Hotel, and Shopping Phrases
# (romaji, hiragana, katakana, kanji, meaning, topic)
DATA = [
    # A
    ("a, kore hitotsu kudasai", "あ、これひとつください", "ア、コレヒトツクダサイ", "あ、これ一つください", "Ah, one of these please!", "Shopping & Dining"),
    ("a, kaikei wa betsu-betsu de", "あ、かいけいはべつべつで", "ア、カイケイワベツベツデ", "あ、会計は別々で", "Ah, separate bills please!", "Dining"),
    ("a, o-kaikei onegai shimasu", "あ、おかいけいおねがいします", "ア、オカイケイオネガイシマス", "あ、お会計お願いします", "Excuse me, check please!", "Dining"),
    ("a, sumimasen, eki wa doko desu ka", "あ、すみません、えきはどこですか", "ア、スミマセン、エキワドコデスカ", "あ、すみません、駅はどこですか", "Pardon me, where is the station?", "Travel & Directions"),
    ("ano, chekku-in o onegai shimasu", "あの、ちぇっくいんをおねがいします", "アノ、チェックインヲオネガイシマス", "あの、チェックインをお願いします", "Hello, I'd like to check in please.", "Travel & Hotel"),
    ("ano, chekku-auto wa nan-ji desu ka", "あの、ちぇっくあうとはなんじですか", "アノ、チェックアウトワナンジデスカ", "あの、チェックアウトは何時ですか", "Excuse me, what time is checkout?", "Travel & Hotel"),
    ("ano, kokoni gomi-bako wa arimasu ka", "あの、ここにごみばこはありますか", "アノ、ココニゴミバコワアリマスカ", "あの、ここにゴミ箱はありますか", "Excuse me, is there a trash bin here?", "Travel & Places"),
    ("ano, menzei ni dekimasu ka", "あの、めんぜいにできますか", "アノ、メンゼイニデキマスカ", "あの、免税にできますか", "Excuse me, is this eligible for tax-free?", "Shopping & Dining"),
    ("ano, nimotsu o azukatte kuremasu ka", "あの、にもつをあずかってくれますか", "アノ、ニモツヲアズカッテクレマスカ", "あの、荷物を預かってくれますか", "Could you hold my luggage for a bit?", "Travel & Hotel"),
    ("ano, osusume wa nan desu ka", "あの、おすすめはなんですか", "アノ、オススメワナンデスカ", "あの、お勧めは何ですか", "Excuse me, what do you recommend?", "Dining"),
    ("ano, shashin o totte moraemasen ka", "あの、しゃしんをとってもらえませんか", "アノ、シャシンヲトッテモラエマセンカ", "あの、写真を撮ってもらえませんか", "Could you take our picture please?", "Travel & Places"),
    ("ano, shinkansen no kippu wa doko?", "あの、しんかんせんのきっぷはどこ？", "アノ、シンカンセンノキップワドコ？", "あの、新幹線の切符はどこで買えますか？", "Where can I buy shinkansen tickets?", "Travel & Places"),
    ("ano, wi-fi no pasuwaado wa?", "あの、わいふぁいのぱすわーどは？", "アノ、ワイファイノパスワードワ？", "あの、Wi-Fiのパスワードは何ですか？", "What is the Wi-Fi password please?", "Travel & Hotel"),
    ("ano, yoyaku shita yamada desu", "あの、よやくしたやまだです", "アノ、ヨヤクシタヤマダデス", "あの、予約した山田です", "Hello, I have a reservation under Yamada.", "Travel & Hotel"),
    ("ano, yukata no saizu o kaetai", "あの、ゆかたのさいずをかえたい", "アノ、ユカタノサイズヲカエタイ", "あの、浴衣のサイズを変えたいです", "Could I swap for another yukata size?", "Travel & Hotel"),
    ("arerugii ga aru node nuki de", "あれるぎーがあるのてぬきで", "アレルギウガアルノデヌキデ", "アレルギーがあるので抜きで", "I have allergies, so without that please.", "Dining"),
    ("asa gohan no jikan wa nan-ji?", "あさごはんのじかんはなんじですか？", "アサゴハンノジカンワナンジデスカ？", "朝ご飯の時間は何時ですか？", "What time is breakfast served?", "Travel & Hotel"),

    # B
    ("betsu-betsu ni tsutsunde kudasai", "べつべつにつつんでください", "ベツベツニツツンデクダサイ", "別々に包んでください", "Please wrap them individually as gifts.", "Shopping & Dining"),
    ("biiru o mou ippai kudasai", "びーるをもういっぱいください", "ビールヲモウイッパイクダサイ", "ビールをもう一杯ください", "One more draft beer please!", "Dining"),
    ("bo-rupene o kashite kudasai", "ぼーるぺんをかしてください", "ボールペンヲカシテクダサイ", "ボールペンを貸してください", "Could I borrow a ballpoint pen?", "Travel & Hotel"),
    ("boushi wa doko ni arimasu ka", "ぼうしはどこにありますか", "ボウシワドコニアリマスカ", "帽子はどこにありますか", "Where can I find hats/caps?", "Shopping & Dining"),

    # C
    ("chekkauto ato ni nimotsu azukari", "ちぇっくあうとあとににもつをあずけたい", "チェックアウトアトニニモツヲアズケタイ", "チェックアウト後に荷物を預けたいです", "May I leave luggage after checkout?", "Travel & Hotel"),
    ("chizu o morae-masu ka", "ちずをもらえますか", "チズヲモラエマスカ", "地図をもらえますか", "Could I get a local map?", "Travel & Directions"),
    ("chotto kangaete kara modorimasu", "ちょっとかんがえてからもどります", "チョットカンガエテカラモドリマス", "一寸考えてから戻ります", "I'll think about it and come back!", "Shopping & Dining"),
    ("chotto miteru dake desu", "ちょっとみてるだけです", "チョットミテルダケデス", "一寸見てるだけです", "I'm just browsing, thank you!", "Shopping & Dining"),
    ("chotto ookikute, chiisai no wa?", "ちょっとおおきくて、ちいさいのは？", "チョットオオキクテ、チイサイノワ？", "一寸大きくて、小さいのはありますか？", "It's a bit big; is there smaller?", "Shopping & Dining"),

    # D
    ("daijoubu desu, kore ni shimasu", "だいじょうぶです、これにします", "ダイジョウブデス、コレニシマス", "大丈夫です、これにします", "No problem, I'll take this one!", "Shopping & Dining"),
    ("deguchi wa docchi desu ka", "でぐちはどっちですか", "デグチワドッチデスカ", "出口はどちらですか", "Which way to the exit?", "Travel & Directions"),
    ("densha no norikae wa doko?", "でんしゃののりかえはどこですか？", "デンシャノノリカエワドコデスカ？", "電車の乗り換えはどこですか？", "Where do I transfer for the train?", "Travel & Directions"),
    ("doko de basu ni noremasu ka", "どこでばすにのれますか", "ドコデバスニノレマスカ", "どこでバスに乗れますか", "Where can I catch the bus?", "Travel & Directions"),
    ("doko de kaimashita ka", "どこでかいましたか", "ドコデカイマシタカ", "どこで買いましたか", "Where did you purchase that?", "Shopping & Dining"),
    ("doko ga ichiban ninki desu ka", "どこがいちばんにんきですか", "ドコガイチバンニンキデスカ", "どこが一番人気ですか", "Which one is the most popular?", "Shopping & Dining"),
    ("dou yatte ikeba ii desu ka", "どうやっていけばいいですか", "ドウヤッテイケバイイデスカ", "どうやって行けばいいですか", "How do I get there from here?", "Travel & Directions"),
    ("dore kurai jikan ga kakaru?", "どれくらいじかんがかかりますか？", "ドレクライジカンガカカリマスカ？", "どれ位時間が掛かりますか？", "About how long does it take?", "Travel & Directions"),

    # E
    ("eki made aruite ikemasu ka", "えきまであるいていけますか", "エキマデアルイテイケマスカ", "駅まで歩いて行けますか", "Can I walk to the station on foot?", "Travel & Directions"),
    ("eigo no menyuu wa arimasu ka", "えいごのめにゅーはありますか", "エイゴノメニューワアリマスカ", "英語のメニューはありますか", "Do you have an English menu?", "Dining"),
    ("erebeetaa wa doko desu ka", "えれべーたーはどこですか", "エレベーターワドコデスカ", "エレベーターはどこですか", "Where is the elevator?", "Travel & Hotel"),

    # F
    ("fune no noriba wa doko desu ka", "ふねののりばはどこですか", "フネノノリバワドコデスカ", "船の乗り場はどこですか", "Where is the ferry boarding dock?", "Travel & Directions"),
    ("futa o shite kudasai", "ふたをしてください", "フタヲシテクダサイ", "蓋をしてください", "Please put the lid on.", "Dining"),

    # G
    ("ginko wa doko ni arimasu ka", "ぎんこうはどこにありますか", "ギンコウワドコニアリマスカ", "銀行はどこにありますか", "Where is an ATM / bank?", "Travel & Directions"),
    ("go-chisou-sama deshita!", "ごちそうさまでした！", "ゴチソウサマデシタ！", "ご馳走様でした！", "Thank you for the delicious feast!", "Dining"),
    ("gomi wa doko ni sutereba ii?", "ごみはどこにすてればいいですか？", "ゴミワドコニス televisionテタラ？", "ゴミはどこに捨てればいいですか？", "Where should I dispose of this trash?", "Travel & Places"),

    # H
    ("ha, o-hiya o kudasai", "あ、おひやをください", "ア、オヒヤヲクダサイ", "あ、お冷をください", "Could I have a cold water please?", "Dining"),
    ("hai, kore o onegai shimasu", "はい、これをおねがいします", "ハイ、コレヲオネガイシマス", "はい、これをお願いします", "Yes, this one please!", "Shopping & Dining"),
    ("hako ni irete kuremasu ka", "はこにいれてくれますか", "ハコニイレテクレマスカ", "箱に入れてくれますか", "Could you put this in a gift box?", "Shopping & Dining"),
    ("hashi o mou hitozen kudasai", "はしをもうひとぜんください", "ハシヲモウヒトゼンクダサイ", "箸をもう一膳ください", "Could I have an extra pair of chopsticks?", "Dining"),
    ("hayaku tsukitai no desu ga", "はやくつきたいのですが", "ハヤクツキタイノデスガ", "早く着きたいのですが", "I need to arrive as soon as possible.", "Travel & Directions"),
    ("hitotsu dake teiku-auto de", "ひとつだげていくあうとで", "ヒトツダケテイクアウトデ", "一つだけテイクアウトで", "Just one for takeout please!", "Dining"),
    ("hotto koohii o hitotsu", "ほっとこーひーをひとつ", "ホットコーヒーヲヒトツ", "ホットコーヒーを一つ", "One hot coffee please!", "Dining"),

    # I
    ("ikura desu ka", "いくらですか", "イクラデスカ", "幾らですか", "How much does this cost?", "Shopping & Dining"),
    ("irasshaimase, nan-mei-sama?", "いらっしゃいませ、なんめいさま？", "イラッシャイマセ、ナンメイサマ？", "いらっしゃいませ、何名様ですか？", "Welcome! How many guests in your party?", "Service & Hospitality"),
    ("itsumo kono jikan wa konde iru?", "いつもこのじかんはこんでいますか？", "イツモコノジカンワコンデイマスカ？", "いつもこの時間は混んでいますか？", "Is it always crowded around this time?", "Travel & Places"),

    # K
    ("kaado wa tsukaemasu ka", "かーどはつかえますか", "カードワツカエマスカ", "カードは使えますか", "Do you accept credit cards?", "Shopping & Dining"),
    ("kaikei o betsu ni dekimasu ka", "かいけいをべつにできますか", "カイケイヲベツニデキマスカ", "会計を別にできますか", "Can we split the check?", "Dining"),
    ("kankou annaijo wa doko desu ka", "かんこうあんないじょはどこですか", "カンコウアンナイジョワドコデスカ", "観光案内所はどこですか", "Where is the tourist information center?", "Travel & Directions"),
    ("kasa o kashite moraemasu ka", "かさをかしてもらえますか", "カサヲカシテモラエマスカ", "傘を貸してもらえますか", "Could I borrow an umbrella?", "Travel & Hotel"),
    ("koko de tabete ikimasu", "ここでたべていきます", "ココデタベテイキマス", "ここで食べていきます", "For here / dining in please!", "Dining"),
    ("koko kara eki made dono kurai?", "ここからえきまでどのくらい？", "ココカラエキマデドノクライ？", "ここから駅までどの位ですか？", "How far to the station from here?", "Travel & Directions"),
    ("koko ni suwatte mo ii desu ka", "ここにすわってもいいですか", "ココニスワッテモイイデスカ", "ここに座ってもいいですか", "May I take a seat right here?", "Dining"),
    ("kore o hitotsu, sore o futatsu", "これをひとつ、それをふたつ", "コレヲヒトツ、ソレヲフタツ", "これを一つ、それを二つ", "One of this, and two of that please!", "Dining"),
    ("kore wa nani de dekite imasu ka", "これはなにでできていますか", "コレワナニデデキテイマスカ", "これは何で出来ていますか", "What ingredients is this made with?", "Dining"),
    ("kore, shichaku shite mo ii?", "これ、しちゃくしてもいいですか？", "コレ、シチャクシテモイイデスカ？", "これ、試着してもいいですか？", "May I try this on in fitting room?", "Shopping & Dining"),

    # M - Z
    ("menyuumite mo ii desu ka", "めにゅーをみてもいいですか", "メニューヲミテモイイデスカ", "メニューを見てもいいですか", "May I see the menu please?", "Dining"),
    ("mizuwari de onegai shimasu", "みずわりでおねがいします", "ミズワリデオネガイシマス", "水割りでお願いします", "With water and ice please!", "Dining"),
    ("mou sukoshi yasui no wa?", "もうすこしやすいのはありますか？", "モウスコシヤスイノワアリマスカ？", "もう少し安いのはありますか？", "Do you have anything a little cheaper?", "Shopping & Dining"),
    ("ninki no menyuu wa dore?", "にんきのめにゅーはどれですか？", "ニンキノメニューワドレデスカ？", "人気のメニューはどれですか？", "Which dish is the customer favorite?", "Dining"),
    ("o-kanjou o onegai shimasu", "おかんじょうをおねがいします", "オカンジョウヲオネガイシマス", "お勘定をお願いします", "Check please!", "Dining"),
    ("o-miyage ni osusume wa?", "おみやげにお勧めはありますか？", "オミヤゲニオススメワアリマスカ？", "お土産にお勧めはありますか？", "What souvenir do you recommend?", "Shopping & Dining"),
    ("o-susume no sake o kudasai", "おすすめのさけをください", "オススメノサケヲクダサイ", "お勧めの日本酒をください", "Please bring the chef's recommended sake!", "Dining"),
    ("o-toshi wa nani desu ka", "おとおしはなんですか", "オトオシワナンデスカ", "お通しは何ですか", "What is tonight's table appetizer?", "Dining"),
    ("onsen no hairikata o oshiete", "おんせんのはいりかたをおしえて", "オンセンノハイリカタヲオシエテ", "温泉の入り方を教えてください", "Could you explain the onsen hot-spring etiquette?", "Travel & Hotel"),
    ("ryoushousho o kudasai", "りょうしゅうしょをください", "リョウシュウショヲクダサイ", "領収書をください", "Could I have an official receipt please?", "Shopping & Dining"),
    ("saigo ni dezāto o kudasai", "さいごにでざーとをください", "サイゴニデザートヲクダサイ", "最後にデザートをください", "We'd like dessert at the end please!", "Dining"),
    ("teiku-auto dekimasu ka", "ていくあうとできますか", "テイクアウトデキマスカ", "テイクアウトできますか", "Is takeout available here?", "Dining"),
    ("tochuu de orite mo ii desu ka", "とちゅうでおりてもいいですか", "トチュウデオリティモイイデスカ", "途中で降りてもいいですか", "Can I make a stopover along route?", "Travel & Directions"),
    ("toire wa doko desu ka", "といれはどこですか", "トイレワドコデスカ", "トイレはどこですか", "Where is the restroom located?", "Travel & Directions"),
    ("wasabi nuki de onegai shimasu", "わさびぬきでおねがいします", "ワサビヌキデオネガイシマス", "わさび抜きでお願いします", "Without wasabi please!", "Dining"),
    ("zenbu de ikura desu ka", "ぜんぶでいくらですか", "ゼンブデイクラデスカ", "全部で幾らですか", "How much does all of it come to?", "Shopping & Dining"),
]
