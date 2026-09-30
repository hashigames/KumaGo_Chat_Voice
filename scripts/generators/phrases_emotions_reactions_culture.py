# Japanese Emotions, Cheering, Reactions, Anime/Manga & Cultural Phrases
# (romaji, hiragana, katakana, kanji, meaning, topic)
DATA = [
    # A
    ("a, kore meccha suki!", "あ、これめっちゃすき！", "ア、コレメッチャスキ！", "あ、これめっちゃ好き！", "Oh, I totally love this so much!", "Friends & Social"),
    ("a, sorette unmei kamo!", "あ、それってうんめいかも！", "ア、ソレッテウンメイカモ！", "あ、それって運命かも！", "Oh, that might just be destiny!", "Daily Conversation"),
    ("akiramecha dame da yo!", "あきらめちゃだめだよ！", "アキラメチャダメダヨ！", "諦めちゃ駄目だよ！", "You must never give up!", "Cheering & Motivation"),
    ("akogare no senpai da!", "あこがれのせんぱいだ！", "アコガレノセンパイダ！", "憧れの先輩だ！", "It's the upperclassman I admire!", "Classroom & Study"),
    ("ama-karai aji ga tamaranai", "あからいあじがたまらない", "アマカライアジガタマラナイ", "甘辛い味がたまらない", "This sweet-savory glaze is irresistible!", "Dining"),
    ("anata nara zettai dekiru!", "あなたならぜったいできる！", "アナタナラゼッタイデキル！", "あなたなら絶対できる！", "If it's you, you can 100% do it!", "Cheering & Motivation"),
    ("anime no seichi-junrei shiyou", "あにめのせいちじゅんれいしよう", "アニメノセイチジュンレイシヨウ", "アニメの聖地巡礼しよう", "Let's do an anime pilgrimage tour!", "Friends & Social"),
    ("ano sora no you ni hiroku", "あのそらのようにひろく", "アノソラノヨウニヒロク", "あの空のように広く", "Vast and open like that blue sky!", "Empathy & Comfort"),
    ("arittake no yuuki o furishibori", "ありったけのゆうきをふりしぼり", "アリッタケノユウキヲフリシボリ", "ありったけの勇気を振り絞り", "Mustering every shred of courage!", "Cheering & Motivation"),
    ("ashita wa kitto ii hi ni naru", "あしたはきっといいひになる", "アシタワキットイイヒニナル", "明日はきっと良い日になる", "Tomorrow is sure to be a wonderful day!", "Empathy & Comfort"),
    ("atama ga masshiro ni natta", "あたまがまっしろになった", "アタマガマッシロニナッタ", "頭が真っ白になった", "My mind went completely blank with shock!", "Empathy & Comfort"),
    ("atsui batoru ga hajimaru zo", "あついばとるがはじまるぞ", "アツイバトルガハジマルゾ", "熱いバトルが始まるぞ", "The fierce showdown is about to begin!", "Cheering & Motivation"),

    # B
    ("baka baka-shikute wareru ne", "ばかばかしくてわらえるね", "バカバカシクテワラエルネ", "馬鹿馬鹿しくて笑えるね", "It's so silly you just have to laugh!", "Daily Conversation"),
    ("bannin ga kandou suru kessaku", "ばんにんがかんどうするけっさくだ", "バンニンガカンドウスルケッサクダ", "万人が感動する傑作だ", "A masterpiece that moves everyone!", "Culture"),
    ("batsu-gun no senzu da ne", "ばつぐんのせんすだね", "バツグンノセンスダネ", "抜群のセンスだね", "You've got an extraordinary sense of style!", "Communication"),
    ("bikkuri gyouten shita yo", "びっくりぎょうてんしたよ", "ビックリギョウテンシタヨ", "びっくり仰天したよ", "I was utterly flabbergasted!", "Daily Conversation"),
    ("boku-tachi no kachi da!", "ぼくたちのかちだ！", "ボクタチノカチダ！", "僕たちの勝ちだ！", "Victory is ours!", "Cheering & Motivation"),
    ("bousou o tomete kurete arigatou", "ぼうそうをとめてくれてありがとう", "ボウソウヲトメテクレテアリガトウ", "暴走を止めてくれてありがとう", "Thanks for stopping me before I went wild!", "Gratitude & Thanks"),

    # C
    ("chanto miteru kara ne", "ちゃんとみてるからね", "チャントミテルカラネ", "ちゃんと見てるからね", "I'm right here cheering you on!", "Cheering & Motivation"),
    ("chikara ga minagitte kita!", "ちからがみなぎってきた！", "チカラガミナギッテキタ！", "力が漲ってきた！", "Power is surging through my veins!", "Cheering & Motivation"),
    ("chotto dake yuuki o kashite", "ちょっとだけゆうきをかして", "チョットダケユウキヲカシテ", "一寸だけ勇気を貸して", "Lend me just a little pinch of courage!", "Friends & Social"),
    ("choushi ga dete kita zo!", "ちょうしがでてきたぞ！", "チョウシガデテキタゾ！", "調子が出てきたぞ！", "Getting right into my groove now!", "Cheering & Motivation"),

    # D
    ("daisuki na nakama to tomoni", "だいすきななかまとともに", "ダイスキナナカマトトモニ", "大好きな仲間と共に", "Together with beloved teammates!", "Friends & Social"),
    ("dakara koso ganbarerunda", "だからこそがんばれるんだ", "ダカラコソガンバレルンダ", "だからこそ頑張れるんだ", "That is the very reason I can fight on!", "Cheering & Motivation"),
    ("dame demo tomo to warai-aou", "だめでもともとわらいあおう", "ダメデモトモトワライアオウ", "駄目で元々笑い合おう", "Nothing to lose, let's laugh it off!", "Daily Conversation"),
    ("doki-doki ga tomaranai yo", "どきどきがとまらないよ", "ドキドキガトマラナイヨ", "ドキドキが止まらないよ", "My heart just won't stop pounding!", "Feelings & Mood"),
    ("donna kabe mo norikoerareru", "どんなかべものりこえられる", "ドンナカベモノリコエラレル", "どんな壁も乗り越えられる", "We can conquer any wall before us!", "Cheering & Motivation"),
    ("douka o-shiawase ni!", "どうかおしあわせに！", "ドウカオシアワセニ！", "どうかお幸せに！", "Wishing you every happiness in the world!", "Greetings & Celebrations"),

    # E
    ("egao ga ichiban no kusuri da yo", "えがおがいちばんのくすりだよ", "エガオガイチバンノクスリダヨ", "笑顔が一番の薬だよ", "A warm smile is the very best medicine!", "Empathy & Comfort"),
    ("eien no kizuna o shinjiyou", "えいえんのきずなをしんじよう", "エイエンノキズナヲシンジヨウ", "永遠の絆を信じよう", "Believing in our everlasting bond!", "Friends & Social"),
    ("enshou mo nakunatte anshin shita", "えんしょうもなくなってあんしんした", "エンショウモナクナッテアンシンシタ", "炎症も無くなって安心した", "The swelling cleared up, what a relief!", "Health & Emergency"),

    # F
    ("fuan nante fukitobasou!", "ふあんなんてふきとばそう！", "フアンナンテフキトバソウ！", "不安なんて吹き飛ばそう！", "Let's blow all our anxieties away!", "Cheering & Motivation"),
    ("fukami no aru ii koe da ne", "ふかみのあるいいこえだね", "フカミノアルイイコエダネ", "深みのある良い声だね", "You have such a deep, resonant voice!", "Communication"),
    ("furu-pawaa zenkai de ikou!", "ふるぱわーぜんかいでいこう！", "フルパワーゼンカイデイコウ！", "フルパワー全開で行こう！", "Let's go at full maximum throttle!", "Cheering & Motivation"),

    # G
    ("ganbaru sugata ga kakkoii!", "がんばるすがたがかっこいい！", "ガンバルスガタガカッコイイ！", "頑張る姿がかっこいい！", "Watching you try your hardest is so cool!", "Cheering & Motivation"),
    ("gankai ni hirogaru zekkei da", "がんかいにひろがるぜっけいだ", "ガンカイニヒロガルゼッケイダ", "眼下に広がる絶景だ", "What a breathtaking panoramic vista below!", "Travel & Places"),
    ("genki hyaku-bai da yo!", "げんきひゃくばいだお！", "ゲンキヒャクバイダヨ！", "元気百倍だよ！", "Energy multiplied one-hundred fold!", "Cheering & Motivation"),
    ("gomen kudasai to doa o tataku", "ごめんくださいとどあをたたく", "ゴメンクダサイトドアヲタタク", "ごめんくださいとドアを叩く", "Knocking on door calling 'hello!'", "Social"),

    # H
    ("hachikire-n bakari no yorokobi", "はちきれんばかりのよろこびだ", "ハチキレンバカリノヨロコビダ", "はち切れんばかりの喜びだ", "Joy bursting at the very seams!", "Feelings & Mood"),
    ("hanabi ga kirei da ne", "はなびがきれいだね", "ハナビガキレイダネ", "花火が綺麗だね", "Aren't the festival fireworks gorgeous?", "Culture"),
    ("haru ga kite sakura ga saita", "はるがきてさくらがさいた", "ハルガキテサクラガサイタ", "春が来て桜が咲いた", "Spring has arrived and sakura blossomed!", "Culture"),
    ("hikari kagayaku mirai e", "ひかりかがやくみらいへ", "ヒカリカガヤクミライヘ", "光輝く未来へ", "Stepping forward toward a radiant future!", "Cheering & Motivation"),
    ("hitori ja nai kara ne", "ひとりじゃないからね", "ヒトリジャナイカラネ", "一人じゃないからね", "Remember, you are never alone!", "Empathy & Comfort"),
    ("honmono no aji ni kandou shita", "ほんもののあじにかんどうした", "ホンモノノアジニカンドウシタ", "本物の味に感動した", "Moved to tears by the authentic flavor!", "Dining"),

    # I - Z
    ("ichi-ban no omoide ni natta", "いちばんのおもいでになった", "イチバンノオモイデニナッタ", "一番の思い出になった", "This became my most cherished memory!", "Feelings & Mood"),
    ("issho ni waraeru tte shiawase", "いっしょにわらえるってしあわせ", "イッショニワラエルッテシアワセ", "一緒に笑えるって幸せだね", "Being able to laugh together is true bliss.", "Friends & Social"),
    ("jiyuu na tsubasa de tobitato", "じゆうなつばさでとびたとう", "ジユウナツバサデトビタトウ", "自由な翼で飛び立とう", "Spread your free wings and take flight!", "Cheering & Motivation"),
    ("kiseki o shinjite susumou", "きせきをしんじてすすめよう", "キセキヲシンジテススメヨウ", "奇跡を信じて進もう", "Let's press on believing in miracles!", "Cheering & Motivation"),
    ("kokoro kara arigatou", "こころからありがとう", "ココロカラアリガトウ", "心からありがとう", "Thank you from the bottom of my heart!", "Gratitude & Thanks"),
    ("matsuri de yukata o kitai", "まつりでゆかたをきたい", "マツリデユカタヲキタイ", "祭りで浴衣を着たい", "I want to wear a cotton yukata to matsuri!", "Culture"),
    ("namida o fuite waraou", "なみだをふいてわらおう", "ナミダヲフイテワラオウ", "涙を拭いて笑おう", "Wipe away your tears and smile!", "Empathy & Comfort"),
    ("onsen de yukkuri nukukou", "おんせんでゆっくりぬくもろう", "オンセンデユックリヌクモロウ", "温泉でゆっくり温まろう", "Let's warm up leisurely in the hot springs!", "Culture"),
    ("shinjiru chikara ga seikou o yobu", "しんじるちからがせいこうをよぶ", "シンジルチカラガセイコウヲヨブ", "信じる力が成功を呼ぶ", "The power of belief summons victory!", "Cheering & Motivation"),
    ("yume o akiramenai de", "ゆめをあきらめないで", "ユメヲアキラメナイデ", "夢を諦めないで", "Never give up on your dreams!", "Cheering & Motivation"),
    ("zettai ni makenai zo!", "ぜったいにまけないぞ！", "ゼッタイニマケナイゾ！", "絶対に負けないぞ！", "I will never back down or lose!", "Cheering & Motivation"),
]
